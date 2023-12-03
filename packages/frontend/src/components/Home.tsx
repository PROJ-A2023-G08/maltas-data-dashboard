import dynamic from "next/dynamic";

const ResponsivePie = dynamic(
  () => import("@nivo/pie").then((m) => m.ResponsivePie),
  { ssr: false },
);

import Data1 from "../../public/data1.json";
import StackedCompliance from "./Charts/StackedCompliance";
import LineAverage from "./Charts/LineAverage";
import { Box, Grid } from "@mui/material";
import { MeasurementContext } from "@/contexts/MeasurementProvider.context";
import { useContext, useEffect, useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LineCompliance from "./Charts/LineCompliance";
const Home = () => {
  const { maxDate, minDate } = useContext(MeasurementContext);
  // state for the date range of line average chart
  const [minimumDate, setMinimumDate] = useState<Date | undefined | null>(minDate);
  const [maximumDate, setMaximumDate] = useState<Date | undefined | null>(maxDate);

  useEffect(() => {
    setMinimumDate(minDate);
    setMaximumDate(maxDate);
  }, [minDate, maxDate]);

  return (
    <>
      <h1>Home</h1>
      <Grid container>
        <Grid item container sx={{ height: "400px" }} md={4}>
          <Grid item sx={{ height: "400px" }} sm={12}>
            <ResponsivePie data={Data1} />
          </Grid>
          <Grid item sx={{ height: "400px" }} sm={12}>
            <StackedCompliance />
          </Grid>
        </Grid>

        <Grid item container sx={{ height: "400px" }} md={8}>
          <Grid sm={12}>
            <DatePicker
              minDate={minDate}
              maxDate={maximumDate}
              defaultValue={minDate}
              value={minimumDate}
              onChange={(minimumDate) => setMinimumDate(minimumDate)}
            />
            <DatePicker
              minDate={minimumDate}
              maxDate={maxDate}
              defaultValue={maxDate}
              value={maximumDate}
              onChange={(maximumDate) => setMaximumDate(maximumDate)}
            />
          </Grid>
          <Grid item sx={{ height: "400px" }} sm={12}>
            <LineAverage minimumDate={minimumDate} maximumDate={maximumDate} />
          </Grid>
          <Grid item sx={{ height: "400px" }} sm={12}>
            <LineCompliance minimumDate={minimumDate} maximumDate={maximumDate} />
          </Grid>
        </Grid>

      </Grid>
    </>
  );
};

export default Home;
