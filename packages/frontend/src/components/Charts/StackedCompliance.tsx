import React from 'react';
import dynamic from "next/dynamic";
import DataMeasurement from "../../../public/csvjson.json";
const ResponsiveBar = dynamic(
    () => import("@nivo/bar").then((m) => m.ResponsiveBar),
    { ssr: false },
);

type MeasurementTypes = {
    measurement_id: number;
    device_id: number;
    role_id: number;
    start_time_iso: string; // ISO 8601
    end_time_iso: string; // ISO 8601
    total_time_spent: number;
    status: 'COMPLETE' | 'CONTINUED' | 'INTERRUPTED' | 'STARTED' | 'PAUSED';
}

type ChartData = {
    month: string;
} & StatusCount;

type StatusCount = {
    COMPLETE: number;
    INTERRUPTED: number;
    PAUSED: number;
}

type monthData = {
    [key: string]: StatusCount;
}

interface Props {
    // Define props here
}

export const StackedCompliance = () => {
    const data: MeasurementTypes[] = DataMeasurement as MeasurementTypes[];


    const monthData: monthData = {}
    data.forEach((item) => {
        const month = new Date(item.end_time_iso).getMonth().toString();
        if (month) {
            switch (item.status) {
                case "COMPLETE":
                    monthData[month] = {
                        ...monthData[month],
                        COMPLETE: monthData[month]?.COMPLETE ? monthData[month].COMPLETE + 1 : 1
                    }
                    break;
                case "INTERRUPTED":
                    monthData[month] = {
                        ...monthData[month],
                        INTERRUPTED: monthData[month]?.INTERRUPTED ? monthData[month].INTERRUPTED + 1 : 1
                    }
                    break;
                case "PAUSED":
                    monthData[month] = {
                        ...monthData[month],
                        PAUSED: monthData[month]?.PAUSED ? monthData[month].PAUSED + 1 : 1
                    }
                    break;
                default:
                    break;
            }
        }
    }
    )

    const mappedData: ChartData[] = Object.keys(monthData).map((key) => {
        const eachMonthData: ChartData = {
            month: key,
            ...monthData[key]
        }
        return eachMonthData
    }
    )

    return (
        <ResponsiveBar
            data={mappedData}
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            indexBy="month"
            keys={["COMPLETE", "PAUSED", "INTERRUPTED"]} />
    )


    // const filterCompleteSeptember = data.filter(
    //     measurement => {
    //         const time = new Date(measurement.start_time_iso);
    //         return measurement.status === "COMPLETE" && time.getMonth() === 9;
    //     }
    // );

    // filterComplete.forEach(measurement => {
    //     const { role_id, total_time_spent } = measurement;
    //     if (!roleData[role_id]) {
    //         roleData[role_id] = { total_time_spent: 0, count: 0 };
    //     }
    //     roleData[role_id].total_time_spent += total_time_spent;
    //     roleData[role_id].count++;
    // });


};

export default StackedCompliance;
