import React, { useContext, useMemo, useState } from "react";
import { Measurement } from "@maltas-dashboard/common/types/Types";
import { MeasurementContext } from "../../contexts/MeasurementProvider.context";
import LineChart from "./LineChart";
import { getWeek } from "date-fns";
import Box from "@mui/material/Box";
import { FilterTypes } from "../../types/filterTypes";
import { ChartData } from "@/types/chartData";
import { calculateAverage } from "../../utils/calculateAverage";
import { Button, Typography } from "@mui/material";
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
  if (!timeSpent || !maxDate || !minDate || !minimumDate || !maximumDate)
    return null;

  // filter the data based on the minimumDate and maximumDate
  const { role0, role1, role2 } = useMemo(() => {
    const role0: OmittedMeasurement[] = [],
      role1: OmittedMeasurement[] = [],
      role2: OmittedMeasurement[] = [];
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
  const [filter, setFilter] = useState(FilterTypes.DAILY);

  const averageRole0 = calculateAverage(role0, filter);
  const averageRole1 = calculateAverage(role1, filter);
  const averageRole2 = calculateAverage(role2, filter);

  const averageValues: LineAverageChart[] = [
    {
      id: "role0",
      data: averageRole0,
    },
    {
      id: "role1",
      data: averageRole1,
    },
    {
      id: "role2",
      data: averageRole2,
    },
  ];
  const chartProps =
    filter !== FilterTypes.DAILY
      ? {
          xFormat: undefined,
          xScale: undefined,
          axisBottom: undefined,
        }
      : {};

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: (theme) => theme.spacing(2),
        }}
      >
        <Button
          sx={{
            paddingLeft: (theme) => theme.spacing(3),
            paddingRight: (theme) => theme.spacing(3),
            marginRight: (theme) => theme.spacing(3),
          }}
          variant="outlined"
          onClick={() => setFilter(FilterTypes.DAILY)}
        >
          Daily
        </Button>
        <Button
          sx={{
            paddingLeft: (theme) => theme.spacing(3),
            paddingRight: (theme) => theme.spacing(3),
            marginRight: (theme) => theme.spacing(3),
          }}
          variant="outlined"
          onClick={() => setFilter(FilterTypes.WEEKLY)}
        >
          Weekly
        </Button>
        <Button
          sx={{
            paddingLeft: (theme) => theme.spacing(3),
            paddingRight: (theme) => theme.spacing(3),
            marginRight: (theme) => theme.spacing(3),
          }}
          variant="outlined"
          onClick={() => setFilter(FilterTypes.MONTHLY)}
        >
          Monthly
        </Button>
      </Box>
      <Typography className="w-full">Avg.Max Time/Measurement</Typography>
      <LineChart
        data={averageValues}
        chartProps={{
          yScale: { max: 200, min: "auto", type: "linear", stacked: false },
          markers: [
            {
              axis: "y",
              value: 180,
              lineStyle: {
                stroke: "#9ACEFE",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              },
              legend: "",
              legendOrientation: "horizontal",
            },
          ],
          ...chartProps,
        }}
      />
      <Typography className="w-full text-center">
        Day of End Time Iso
      </Typography>
    </>
  );
};

export default LineAverage;
