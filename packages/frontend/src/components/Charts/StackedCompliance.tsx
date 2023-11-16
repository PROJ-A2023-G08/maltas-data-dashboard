import React from 'react';
import dynamic from "next/dynamic";
import DataMeasurement from "@maltas-dashboard/frontend/public/csvjson.json";
import { Measurement } from "@maltas-dashboard/common/types/Types";

const ResponsiveBar = dynamic(
    () => import("@nivo/bar").then((m) => m.ResponsiveBar),
    { ssr: false },
);

type StackedComplianceChart = {
    month: string;
} & RoleCount;

type RoleCount = {
    0: number;
    1: number;
    2: number;
}

type EachMonthData = {
    [key: string]: RoleCount;
}

export const StackedCompliance = () => {
    const data: Measurement[] = DataMeasurement as Measurement[];

    // TODO:interactivity
    // month can be exchange to date or week
    // status can be exchange to any other status
    // role can be selected for interactivitiy
    const monthData: EachMonthData = {}
    // this should be in the backend in the future
    // or at least in a helper function to calculate it once and call it using context
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
                        2: monthData[month]?.[2] ? monthData[month][2] + 1 : 1
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
};

export default StackedCompliance;
