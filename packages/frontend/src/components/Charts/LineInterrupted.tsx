import React, { useContext, useMemo, useState } from 'react';
import dynamic from "next/dynamic";
import { Measurement } from "@maltas-dashboard/common/types/Types";
import { MeasurementContext } from '@/contexts/MeasurementProvider.context';
import LineChart from './LineChart';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';

// @ts-ignore giving out error for some reason idk why
const ResponsiveLine = dynamic(() => import("@nivo/line").then(m => m.ResponsiveLine), { ssr: false });


type OmittedMeasurement = Omit<Measurement, "end_time_iso" | "role_id" | "device_id" | "measurement_id">;
type Data = {
    x: string; //date start_time_iso
    y: number; //avg total_time_spent
}
type LineInterruptedChart = {
    id: string; //role_id
    data: Data[];
}

type Props = {
    minimumDate?: Date | null;
    maximumDate?: Date | null;
}

export const LineInterrupted = ({ minimumDate, maximumDate }: Props) => {
    const { timeSpent, maxDate, minDate } = useContext(MeasurementContext);

    if (!timeSpent || !maxDate || !minDate || !minimumDate || !maximumDate) return null;
    const filterInterrupted = Object.values(timeSpent).filter((item) => item.status === "INTERRUPTED");
    const { role0, role1, role2 } = useMemo(() => {
        const role0: OmittedMeasurement[] = [], role1: OmittedMeasurement[] = [], role2: OmittedMeasurement[] = [];
        const minimumDateX = minimumDate ? minimumDate : minDate;
        const maxDateX = maximumDate ? maximumDate : maxDate;
        Object.values(filterInterrupted).forEach((item) => {
            const date = new Date(item.start_time_iso);
            if (date > minimumDateX && date < maxDateX) {
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
    }, [timeSpent, maxDate, minDate, minimumDate, maximumDate]);

    const calculateAverage = (role: OmittedMeasurement[]): Data[] => {
        const averageRole: Data[] = [];

        role.forEach((item) => {
            const date = format(parseISO(item.start_time_iso), 'MM/dd/yyyy');
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

    const averageValues: LineInterruptedChart[] = [
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
        <LineChart
            data={averageValues}

        />
    )
};

export default LineInterrupted;
