import { MeasurementContext, Status } from "@maltas-dashboard/frontend/src/contexts/MeasurementProvider.context";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
const ResponsivePie = dynamic(
    () => import("@nivo/pie").then((m) => m.ResponsivePie),
    { ssr: false },
);


type Data = {
    id: string; //date start_time_iso
    value: number; //avg total_time_spent
    label: string;
}


type PieChartProps = {
    chartProps?: typeof ResponsivePie;

}
export const PieCompliance = ({ chartProps }: PieChartProps) => {
    const { statisticsNumbers } = useContext(MeasurementContext);
    const data: Data[] = [
        {
            id: "COMPLIANCE",
            value: statisticsNumbers?.compliance || 0,
            label: "COMPLIANCE",
        },
        {
            id: "NON-COMPLIANCE",
            value: statisticsNumbers?.interrupted || 0,
            label: "NON-COMPLIANCE",

        }
    ]
    return <ResponsivePie data={data}
        margin={{ top: 5, right: 20, bottom: 70, left: 30 }}
        enableArcLinkLabels={false}
        innerRadius={0.5}
        cornerRadius={4}
        padAngle={0.7}
        legends={[{
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 60,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 120,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 20,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1
                    }
                }
            ]
        }]} />
}