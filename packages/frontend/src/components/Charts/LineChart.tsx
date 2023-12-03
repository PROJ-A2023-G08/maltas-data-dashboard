import dynamic from "next/dynamic";
import React from 'react';
import { LineSvgProps } from "@nivo/line";
// @ts-ignore giving out error for some reason idk why
const ResponsiveLine = dynamic(() => import("@nivo/line").then(m => m.ResponsiveLine), { ssr: false });

type Data = {
    x: string; //date start_time_iso
    y: number; //avg total_time_spent
}

type LineChartProps = {
    data: {
        id: string; //role_id
        data: Data[];
    }[];
    chartProps?: Omit<LineSvgProps, "data">;

}

const LineChart = ({ data, chartProps }: LineChartProps) => {
    // Implement your LineChart component logic here

    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            colors={{ scheme: 'nivo' }}
            xScale={{
                type: 'time',
                format: '%m/%d/%Y',
                useUTC: false,
                precision: 'day',
            }}
            xFormat="time:%d/%m/%Y"
            axisBottom={{
                format: '%d/%m',
                tickValues: 'every 1 days',
            }}
            curve="monotoneX"
            pointSize={16}
            pointBorderWidth={1}
            pointBorderColor={{
                from: 'color',
                modifiers: [['darker', 0.3]],
            }}
            useMesh={true}
            enableSlices={false}
            
            {...chartProps}

        />
    );
};

export default LineChart;
