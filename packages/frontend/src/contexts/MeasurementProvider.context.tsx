import React, { createContext, useEffect, useState } from 'react';
import DataMeasurement from "@maltas-dashboard/frontend/public/csvjson.json";
import { Measurement } from "@maltas-dashboard/common/types/Types";


enum Status {
    COMPLETE = "COMPLETE",
    CONTINUED = "CONTINUED",
    INTERRUPTED = "INTERRUPTED",
    STARTED = "STARTED",
    PAUSED = "PAUSED",
}
interface Props {
    children: React.ReactNode;
}

type MaxEachMeasurement = {
    [key: string]: {
        total_time_spent: number;
        start_time_iso: string;
        role_id: number;
        status: Status;
    };
}

type RoleCount = {
    [key: number]: number;
}

type EachMonthData = {
    [key: string]: RoleCount;
}

export interface MeasurementState {
    timeSpent?: MaxEachMeasurement;
    monthData?: EachMonthData;
    minDate?: Date;
    maxDate?: Date;
}

// Define the initial state

// Create the context
export const MeasurementContext = createContext<MeasurementState>({});

// Create the provider component
export const MeasurementProvider = ({ children }: Props) => {
    const data: Measurement[] = DataMeasurement as Measurement[];
    const [state, setState] = useState<MeasurementState>({});

    // using useEffect to calculate the timeSpent and monthData when the API ready
    useEffect(() => {
        const timeSpent: MaxEachMeasurement = {};
        const monthData: EachMonthData = {}
        const minDate = new Date(data[0].start_time_iso);
        const maxDate = new Date(data[data.length - 1].start_time_iso);
        data.forEach((measurement) => {

            // calculate the minDate and maxDate
            const date = new Date(measurement.start_time_iso);
            if (date < minDate) {
                minDate.setTime(date.getTime());
            }
            if (date > maxDate) {
                maxDate.setTime(date.getTime());
            }

            // calculate the monthData
            const month = (new Date(measurement.start_time_iso).getMonth() + 1).toString();
            if (month && measurement.status === "COMPLETE") {
                monthData[month] = {
                    ...monthData[month],
                    [measurement.role_id]: (monthData[month]?.[measurement.role_id] || 0) + 1
                }
            }

            // calculate the timeSpent
            const filterOnlyLatestMeasurement = (item: Measurement) => {
                return item.status === Status.COMPLETE || item.status === Status.INTERRUPTED;
            }
            if (!filterOnlyLatestMeasurement(measurement)) return;
            
            const { measurement_id, total_time_spent, status, start_time_iso, role_id } = measurement;
            timeSpent[measurement_id] = {
                total_time_spent, start_time_iso, role_id, status
            }
        });
        setState({ timeSpent, monthData, minDate, maxDate });
    }, []);

    // Return the provider with the state and any necessary functions
    return (
        <MeasurementContext.Provider value={state}>
            {children}
        </MeasurementContext.Provider>
    );
};
