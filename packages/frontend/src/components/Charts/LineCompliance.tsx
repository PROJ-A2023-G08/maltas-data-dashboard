import React, { useContext, useMemo, useState } from 'react';
import dynamic from "next/dynamic";
import { Measurement } from "@maltas-dashboard/common/types/Types";
import { MeasurementContext } from '@/contexts/MeasurementProvider.context';
import LineChart from './LineChart';

// @ts-ignore giving out error for some reason idk why
const ResponsiveLine = dynamic(() => import("@nivo/line").then(m => m.ResponsiveLine), { ssr: false });


type OmittedMeasurement = Omit<Measurement, "end_time_iso" | "role_id" | "device_id" | "measurement_id">;
type Data = {
    x: string; //date start_time_iso
    y: number; //avg total_time_spent
}
type LineComplianceChart = {
    id: string; //role_id
    data: Data[];
}

type Props = {
    minimumDate?: Date | null;
    maximumDate?: Date | null;
}

export const LineCompliance = ({ minimumDate, maximumDate }: Props) => {
    const { timeSpent, maxDate, minDate } = useContext(MeasurementContext);

    if (!timeSpent || !maxDate || !minDate || !minimumDate || !maximumDate) return null;
    const { role0, role1, role2 } = useMemo(() => {
        const role0: OmittedMeasurement[] = [], role1: OmittedMeasurement[] = [], role2: OmittedMeasurement[] = [];
        const minimumDateX = minimumDate ? minimumDate : minDate;
        const maxDateX = maximumDate ? maximumDate : maxDate;
        Object.values(timeSpent).forEach((item) => {
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

    const complianceCount = (role: OmittedMeasurement[]): Data[] => {
        const complianceCountRole: Data[] = [];
        const filterCompleted = role.filter((item) => item.status === "COMPLETE");
        // count each date compliance that is completed and map to Data
        filterCompleted.forEach((item) => {
            const date = new Date(item.start_time_iso).toLocaleDateString();
            const index = complianceCountRole.findIndex((item) => item.x === date);
            if (index !== -1) {
                complianceCountRole[index].y = complianceCountRole[index].y + 1;
            } else {
                complianceCountRole.push({
                    x: date,
                    y: 1
                })
            }
        });
       

        return complianceCountRole;
    };

    const complianceCountRole0 = complianceCount(role0);
    const complianceCountRole1 = complianceCount(role1);
    const complianceCountRole2 = complianceCount(role2);

    const complianceCountValues: LineComplianceChart[] = [
        {
            id: "role0",
            data: complianceCountRole0
        },
        {
            id: "role1",
            data: complianceCountRole1
        },
        {
            id: "role2",
            data: complianceCountRole2
        }
    ];

    return (
        <LineChart
            data={complianceCountValues}

        />
    )
};

export default LineCompliance;
