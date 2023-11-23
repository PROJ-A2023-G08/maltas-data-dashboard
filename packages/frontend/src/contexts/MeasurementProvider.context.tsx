import React, { createContext, useEffect, useState } from 'react';
import DataMeasurement from "@maltas-dashboard/frontend/public/csvjson.json";
import { Measurement } from "@maltas-dashboard/common/types/Types";

interface Props {
    children: React.ReactNode;
}

type MaxEachMeasurement = {
    [key: string]: {
        total_time_spent: number;
        start_time_iso: string;
        role_id: number;
    };
}

type RoleCount = {
    [key: number]: number;
}

type EachMonthData = {
    [key: string]: RoleCount;
}

export interface MeasurementState {
    maxValues?: MaxEachMeasurement;
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

    // using useEffect to calculate the maxValues and monthData when the API ready
    useEffect(() => {
        const maxValues: MaxEachMeasurement = {};
        const monthData: EachMonthData = {}
        const minDate = new Date(data[0].start_time_iso);
        const maxDate = new Date(data[0].start_time_iso);
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
            const month = new Date(measurement.end_time_iso).getMonth().toString();
            if (month && measurement.status === "COMPLETE") {
                monthData[month] = {
                    ...monthData[month],
                    [measurement.role_id]: (monthData[month]?.[measurement.role_id] || 0) + 1
                }
            }

            // calculate the maxValues
            const { measurement_id, total_time_spent, start_time_iso, role_id } = measurement;

            if (measurement_id in maxValues) {
                maxValues[measurement_id].total_time_spent = Math.max(maxValues[measurement_id].total_time_spent, total_time_spent);
            } else {
                maxValues[measurement_id] = {
                    total_time_spent, start_time_iso, role_id
                };
            }
        });
        setState({ maxValues, monthData, minDate, maxDate });
    }, []);

    // Return the provider with the state and any necessary functions
    return (
        <MeasurementContext.Provider value={state}>
            {children}
        </MeasurementContext.Provider>
    );
};
