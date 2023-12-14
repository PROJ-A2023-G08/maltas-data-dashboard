import React, { useContext } from "react";
import dynamic from "next/dynamic";
import { MeasurementContext } from "../../contexts/MeasurementProvider.context";

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
const labelMap = {
    "0": "Doctor",
    "1": "Nurse",
    "2": "N/A",
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
    if (!mappedData) return null;
    return (
        <ResponsiveBar
            data={mappedData}
            margin={{ bottom: 20, left: 40 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            indexBy="month"
            keys={["0", "1", "2"]}
        />
    )
};

export default StackedCompliance;
