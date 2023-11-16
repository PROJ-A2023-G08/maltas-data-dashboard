import React from 'react';
import dynamic from "next/dynamic";
import DataMeasurement from "@maltas-dashboard/frontend/public/csvjson.json";
import { Measurement, StackedComplianceChart, RoleCount } from "@maltas-dashboard/common/types/ChartTypes";

const ResponsiveBar = dynamic(
    () => import("@nivo/bar").then((m) => m.ResponsiveBar),
    { ssr: false },
);


interface Props {
    // Define props here
}

export const StackedCompliance = () => {
    const data: Measurement[] = DataMeasurement as Measurement[];

    type EachMonthData = {
        [key: string]: RoleCount;
    }
    const monthData: EachMonthData = {}
    // this should be in the backend in the future
    data.forEach((item) => {
        const month = new Date(item.end_time_iso).getMonth().toString();
        if (month && item.status === "COMPLETE") {
            switch (item.role_id) {
                case 0:
                    monthData[month] = {
                        ...monthData[month],
                        0: monthData[month]?.[0] ? monthData[month][0] + 1 : 1
                    }
                    break;
                case 1:
                    monthData[month] = {
                        ...monthData[month],
                        1: monthData[month]?.[1] ? monthData[month][1] + 1 : 1
                    }
                    break;
                case 2:
                    monthData[month] = {
                        ...monthData[month],
                        2: monthData[month]?.[2]? monthData[month][2]+ 1 : 1
                    }
                    break;
                default:
                    break;
            }
        }
    }
    )
    const mappedData: StackedComplianceChart[] = Object.keys(monthData).map((key) => {
        const eachMonthData: StackedComplianceChart = {
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
            keys={["0", "1", "2"]} />
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
