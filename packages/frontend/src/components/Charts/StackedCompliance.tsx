import React, { useContext } from 'react';
import dynamic from "next/dynamic";
import DataMeasurement from "@maltas-dashboard/frontend/public/csvjson.json";
import { Measurement } from "@maltas-dashboard/common/types/Types";
import { MeasurementContext, MeasurementState } from '@/contexts/MeasurementProvider.context';

const ResponsiveBar = dynamic(
    () => import("@nivo/bar").then((m) => m.ResponsiveBar),
    { ssr: false },
);

type StackedComplianceChart = {
    month: string;
} & RoleCount;

type RoleCount = {
    [key: number]: number;

}

export const StackedCompliance = () => {
    const { monthData } = useContext(MeasurementContext);
    const mappedData: StackedComplianceChart[] | undefined = monthData && Object.keys(monthData).map((key) => {
        const eachMonthData: StackedComplianceChart = {
            month: key,
            ...monthData[key]
        }
        return eachMonthData
    }
    )
    if(!mappedData) return null;
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
