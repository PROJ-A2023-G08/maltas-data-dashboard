import React, { useContext, useMemo, useState } from 'react';
import dynamic from "next/dynamic";
import { Measurement } from "@maltas-dashboard/common/types/Types";
import { MeasurementContext } from '@/contexts/MeasurementProvider.context';

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

type Props = {
    minimumDate?: Date | null;
    maximumDate?: Date | null;
}

export const LineAverage = ({ minimumDate, maximumDate }: Props) => {
    const { maxValues, maxDate, minDate } = useContext(MeasurementContext);

    if (!maxValues || !maxDate || !minDate) return null;
    const { role0, role1, role2 } = useMemo(() => {
        const role0: OmittedMeasurement[] = [], role1: OmittedMeasurement[] = [], role2: OmittedMeasurement[] = [];
        Object.values(maxValues).forEach((item) => {
            const date = new Date(item.start_time_iso);
            if (date > minDate && date < maxDate) {
                switch (item.role_id) {
                    case 0:
                        role0.push(item);
                        break;
                    case 1:
                        role1.push(item);
                        break;
                    case 2:
                        role2.push(item);
                        break;
                }
            }
        });
        return { role0, role1, role2 };
    }, [maxValues, maxDate, minDate]);

    const calculateAverage = (role: OmittedMeasurement[]): Data[] => {
        const averageRole: Data[] = [];

        role.forEach((item) => {
            const date = new Date(item.start_time_iso).toLocaleDateString();
            const index = averageRole.findIndex((item) => item.x === date);
            if (index !== -1) {
                averageRole[index].y = Math.floor((averageRole[index].y + item.total_time_spent) / 2);
            } else {
                averageRole.push({ x: date, y: item.total_time_spent });
            }
        });

        return averageRole;
    };

    const averageRole0 = calculateAverage(role0);
    const averageRole1 = calculateAverage(role1);
    const averageRole2 = calculateAverage(role2);

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
