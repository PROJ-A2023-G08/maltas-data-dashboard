import React, { useContext, useMemo, useState } from "react";
import { Measurement } from "@maltas-dashboard/common/types/Types";
import { MeasurementContext } from '@maltas-dashboard/frontend/src/contexts/MeasurementProvider.context';
import LineChart from './LineChart';
import Box from '@mui/material/Box';
import { FilterTypes } from '@maltas-dashboard/frontend/src/types/filterTypes';
import { ChartData } from '@maltas-dashboard/frontend/src/types/chartData';
import { calculateAverage } from '@maltas-dashboard/frontend/src/utils/calculateAverage';
import { Button } from '@mui/material';
// @ts-ignore giving out error for some reason idk why

type OmittedMeasurement = Omit<
  Measurement,
  "end_time_iso" | "status" | "role_id" | "device_id" | "measurement_id"
>;
type LineAverageChart = {
  id: string; //role_id
  data: ChartData[];
};

type Props = {
  minimumDate?: Date | null;
  maximumDate?: Date | null;
};

export const LineAverage = ({ minimumDate, maximumDate }: Props) => {
    // call context
    const { timeSpent, maxDate, minDate } = useContext(MeasurementContext);

    // filter the data based on the minimumDate and maximumDate
    const { role0, role1, role2 } = useMemo(() => {
        const role0: OmittedMeasurement[] = [], role1: OmittedMeasurement[] = [], role2: OmittedMeasurement[] = [];
        const minimumDateX = minimumDate ? minimumDate : minDate;
        const maxDateX = maximumDate ? maximumDate : maxDate;
        if (!timeSpent ||  !minimumDateX || !maxDateX) return {};
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
    const [filter, setFilter] = useState(FilterTypes.DAILY);
    if(!role0 || !role1 || !role2) return null;
    const averageRole0 = calculateAverage(role0, filter);
    const averageRole1 = calculateAverage(role1, filter);
    const averageRole2 = calculateAverage(role2, filter);

    const averageValues: LineAverageChart[] = [
        {
            id: "Doctor",
            data: averageRole0
        },
        {
            id: "Nurse",
            data: averageRole1
        },
        {
            id: "N/A",
            data: averageRole2
        }
    ];
    const chartProps = filter !== FilterTypes.DAILY ? {
        xFormat: undefined,
        xScale: undefined,
        axisBottom: undefined,
    } : {};

    return (
        <>
            <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: (theme) => theme.spacing(2)
            }}>
                <Button sx={{
                    paddingLeft: (theme) => theme.spacing(3),
                    paddingRight: (theme) => theme.spacing(3),
                    marginRight: (theme) => theme.spacing(3),
                }} variant='outlined' onClick={() => setFilter(FilterTypes.DAILY)}>Daily</Button>
                <Button sx={{
                    paddingLeft: (theme) => theme.spacing(3),
                    paddingRight: (theme) => theme.spacing(3),
                    marginRight: (theme) => theme.spacing(3),
                }} variant='outlined' onClick={() => setFilter(FilterTypes.WEEKLY)}>Weekly</Button>
                <Button sx={{
                    paddingLeft: (theme) => theme.spacing(3),
                    paddingRight: (theme) => theme.spacing(3),
                    marginRight: (theme) => theme.spacing(3),
                }} variant='outlined' onClick={() => setFilter(FilterTypes.MONTHLY)}>Monthly</Button>
            </Box>
            <LineChart
                data={averageValues}
                chartProps={{
                    yScale: { max: 200, min: 'auto', type: 'linear', stacked: false },
                    markers:
                        [
                            {
                                axis: 'y',
                                value: 180,
                                lineStyle: { stroke: '#000', strokeWidth: 1, strokeDasharray: '4 4' },
                                legend: 'compliance level',
                                legendOrientation: 'horizontal',
                            }
                        ],
                    ...chartProps
                }}
            />
        </>
    )
};

export default LineAverage;
