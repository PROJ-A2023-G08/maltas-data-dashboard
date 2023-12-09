import React, { createContext, useEffect, useState } from 'react';
import DataMeasurement from "@maltas-dashboard/frontend/public/csvjson.json";
import { Measurement } from "@maltas-dashboard/common/types/Types";


export enum Status {
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

// compliance, percentage, interrupted, average, total
type StatisticsNumbers = {
    compliance: number;
    interrupted: number;
    averageTimeSpent: number; // seconds
    total: number; // count
}

export interface MeasurementState {
    statisticsNumbers?: StatisticsNumbers;
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
        const statisticsNumbers: StatisticsNumbers = {
            compliance: 0,
            interrupted: 0,
            averageTimeSpent: 0,
            total: 0,
        };
        let totalSeconds = 0;
        data.forEach((measurement) => {
            // calculate statisticsNumbers
            // count compliance total
            statisticsNumbers.compliance = measurement.status === "COMPLETE" ? statisticsNumbers.compliance + 1 : statisticsNumbers.compliance;
            // count interrupted total
            statisticsNumbers.interrupted = measurement.status === "INTERRUPTED" ? statisticsNumbers.interrupted + 1 : statisticsNumbers.interrupted;
            // count total
            statisticsNumbers.total = measurement.status === "COMPLETE" || measurement.status === "INTERRUPTED" ? statisticsNumbers.total + 1 : statisticsNumbers.total;
            // calculate totalSeconds
            totalSeconds = measurement.status === "COMPLETE" ||
                measurement.status === "INTERRUPTED" ?
                totalSeconds + measurement.total_time_spent : totalSeconds;


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
        statisticsNumbers.averageTimeSpent = totalSeconds / statisticsNumbers.total;
        setState({ statisticsNumbers, timeSpent, monthData, minDate, maxDate });
    }, []);

    // Return the provider with the state and any necessary functions
    return (
        <MeasurementContext.Provider value={state}>
            {children}
        </MeasurementContext.Provider>
    );
};
