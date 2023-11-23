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
import { useContext, useState } from "react";
const Home = () => {
  const { maxDate, minDate } = useContext(MeasurementContext);
  // state for the date range of line average chart
  const [minimumDate, setMinimumDate] = useState<Date | undefined>(minDate);
  const [maximumDate, setMaximumDate] = useState<Date | undefined>(maxDate);

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
          </Grid>
          <Grid item sx={{ height: "400px" }} sm={12}>
            <LineAverage minimumDate={minimumDate} maximumDate={maximumDate} />
          </Grid>
          <Grid item sx={{ height: "400px" }} sm={12}>
            <LineAverage />
          </Grid>
        </Grid>

      </Grid>
    </>
  );
};

export default Home;
