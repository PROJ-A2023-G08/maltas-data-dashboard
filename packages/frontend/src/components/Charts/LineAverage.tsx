import React from 'react';
import dynamic from "next/dynamic";
import DataMeasurement from "@maltas-dashboard/frontend/public/csvjson.json";
import { Measurement } from "@maltas-dashboard/common/types/Types";

// @ts-ignore giving out error for some reason idk why
const ResponsiveLine = dynamic(() => import("@nivo/line").then(m => m.ResponsiveLine), { ssr: false });


type OmittedMeasurement = Omit<Measurement, "end_time_iso" | "status" | "role_id" | "device_id" | "measurement_id">;
type Data = {
    x: string; //date start_time_iso
    y: number; //avg total_time_spent
}
type LineAverageChart = {
    id: string; //role_id
    data: Data[];
}

type MaxEachMeasurement = {
    [key: string]: {
        total_time_spent: number;
        start_time_iso: string;
        role_id: number;
    };
}


export const LineAverage = () => {

    const data: Measurement[] = DataMeasurement as Measurement[];

    const maxValues: MaxEachMeasurement = {};

    data.forEach((measurement) => {
        const { measurement_id, total_time_spent, start_time_iso, role_id } = measurement;

        if (measurement_id in maxValues) {
            maxValues[measurement_id].total_time_spent = Math.max(maxValues[measurement_id].total_time_spent, total_time_spent);
        } else {
            maxValues[measurement_id] = {
                total_time_spent, start_time_iso, role_id
            };
        }
    });

    // filter each role
    const role0 = Object.values(maxValues).filter((item) => item.role_id === 0);
    const role1 = Object.values(maxValues).filter((item) => item.role_id === 1);
    const role2 = Object.values(maxValues).filter((item) => item.role_id === 2);
    // calculate average each date of total_time_spent
    const averageRole0: Data[] = [];
    const averageRole1: Data[] = [];
    const averageRole2: Data[] = [];

    role0.forEach((item) => {
        const date = new Date(item.start_time_iso).toLocaleDateString();
        const index = averageRole0.findIndex((item) => item.x === date);
        if (index !== -1) {
            averageRole0[index].y = Math.floor((averageRole0[index].y + item.total_time_spent) / 2);
        } else {
            averageRole0.push({ x: date, y: item.total_time_spent });
        }
    });
    role1.forEach((item) => {
        const date = new Date(item.start_time_iso).toLocaleDateString();
        const index = averageRole1.findIndex((item) => item.x === date);
        if (index !== -1) {
            averageRole1[index].y = Math.floor((averageRole1[index].y + item.total_time_spent) / 2);
        } else {
            averageRole1.push({ x: date, y: item.total_time_spent });
        }
    });
    role2.forEach((item) => {
        const date = new Date(item.start_time_iso).toLocaleDateString();
        const index = averageRole2.findIndex((item) => item.x === date);
        if (index !== -1) {
            averageRole2[index].y = Math.floor((averageRole2[index].y + item.total_time_spent) / 2);
        } else {
            averageRole2.push({ x: date, y: item.total_time_spent });
        }
    });

    const averageValues: LineAverageChart[] = [
        {
            id: "role0",
            data: averageRole0
        },
        {
            id: "role1",
            data: averageRole1
        },
        {
            id: "role2",
            data: averageRole2
        }
    ];

    return (
        <ResponsiveLine
            data={averageValues}
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
            />
    )
};

export default LineAverage;
