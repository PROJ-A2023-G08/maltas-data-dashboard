import dynamic from "next/dynamic";
import React from "react";
const ResponsivePie = dynamic(
  () => import("@nivo/pie").then((m) => m.ResponsivePie),
  { ssr: false },
);

import Data1 from "../../public/data1.json";
import StackedCompliance from "./Charts/StackedCompliance";
import LineAverage from "./Charts/LineAverage";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { MeasurementContext } from "../contexts/MeasurementProvider.context";
import { useContext, useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dot from "./Dot";
import LineCompliance from "./Charts/LineCompliance";
import LineInterrupted from "./Charts/LineInterrupted";
const Home = () => {
  const { maxDate, minDate } = useContext(MeasurementContext);
  // state for the date range of line average chart
  const [minimumDate, setMinimumDate] = useState<Date | undefined | null>(
    minDate,
  );
  const [maximumDate, setMaximumDate] = useState<Date | undefined | null>(
    maxDate,
  );

  useEffect(() => {
    setMinimumDate(minDate);
    setMaximumDate(maxDate);
  }, [minDate, maxDate]);

  return (
    <>
      <h1>Hi, Welcome</h1>
      <div className="flex justify-end mb-4" data-testid="home-div">
        <span className="m-3">
          {/*  
          <DatePicker
            minDate={minDate}
            maxDate={maximumDate}
            defaultValue={minDate}
            value={minimumDate}
            onChange={(minimumDate) => setMinimumDate(minimumDate)}
          />
        </span>
        <span className="m-3">
          <DatePicker
            minDate={minimumDate}
            maxDate={maxDate}
            defaultValue={maxDate}
            value={maximumDate}
            onChange={(maximumDate) => setMaximumDate(maximumDate)}
          />
          */}
        </span>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Card
            sx={{
              padding: (theme) => theme.spacing(2),
            }}
          >
            <CardContent
              sx={{
                height: (theme) => theme.spacing(75),
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  marginBottom: (theme) => theme.spacing(2),
                }}
                component="div"
              >
                Complete & Interupted Role
              </Typography>
              <div className="flex justify-between pt-4">
                <span>COMPLETE</span>
                <span>INTERRUPTED</span>
              </div>
              <Box
                sx={{ height: (theme) => theme.spacing(50) }}
                paddingX={1}
                paddingY={1}
              >
                <div className="h-full">
                  <StackedCompliance />
                </div>
              </Box>
              <div className="flex flex-wrap pt-4">
                <div>
                  <Dot color="rgb(241, 225, 91)" />
                  <span className="p-2">Doctors</span>
                </div>
                <div>
                  <Dot color="rgb(244, 117, 96)" />
                  <span className="p-2">Nurses</span>
                </div>
                <div>
                  <Dot color="rgb(232, 193, 160)" />
                  <span className="p-2">Student Doctors</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Card
            sx={{
              padding: (theme) => theme.spacing(2),
            }}
          >
            <CardContent
              sx={{
                height: (theme) => theme.spacing(75),
                paddingBottom: (theme) => theme.spacing(3),
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  marginBottom: (theme) => theme.spacing(2),
                }}
                component="div"
              >
                Compliance Level
              </Typography>
              <Box
                sx={{ height: (theme) => theme.spacing(45) }}
                paddingX={1}
                paddingY={1}
              >
                <div className="w-full h-full">
                  <LineAverage
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                  />
                  <div className="flex flex-wrap pt-3">
                    <div>
                      <Dot color="rgb(241, 225, 91)" />
                      <span className="p-2">Interupted hand washing</span>
                    </div>
                    <div>
                      <Dot color="rgb(244, 117, 96)" />
                      <span className="p-2">Completed Washing</span>
                    </div>
                    <div>
                      <Dot color="rgb(232, 193, 160)" />
                      <span className="p-2">Currently Washing hand</span>
                    </div>
                  </div>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Card
            sx={{
              padding: (theme) => theme.spacing(2),
            }}
          >
            <CardContent
              sx={{
                height: (theme) => theme.spacing(75),
                paddingBottom: (theme) => theme.spacing(3),
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  marginBottom: (theme) => theme.spacing(2),
                }}
                component="div"
              >
                Count of Status
              </Typography>
              <Box
                sx={{ height: (theme) => theme.spacing(55) }}
                paddingX={1}
                paddingY={1}
              >
                <ResponsivePie data={Data1} />
              </Box>
              <div className="flex flex-wrap pt-4">
                <div>
                  <Dot color="rgb(244, 117, 96)" />
                  <span className="p-2">Interupted</span>
                </div>
                <div>
                  <Dot color="rgb(232, 193, 160)" />
                  <span className="p-2">Completed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Card
            sx={{
              padding: (theme) => theme.spacing(2),
            }}
          >
            <CardContent
              sx={{
                height: (theme) => theme.spacing(75),
                paddingBottom: (theme) => theme.spacing(3),
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  marginBottom: (theme) => theme.spacing(2),
                }}
                component="div"
              >
                All each role avg for each day
              </Typography>
              <Box
                sx={{ height: (theme) => theme.spacing(50) }}
                paddingX={1}
                paddingY={1}
              >
                <LineCompliance
                  minimumDate={minimumDate}
                  maximumDate={maximumDate}
                />
              </Box>
              <div className="flex flex-wrap pt-3">
                <div>
                  <Dot color="rgb(241, 225, 91)" />
                  <span className="p-2">Interupted hand washing</span>
                </div>
                <div>
                  <Dot color="rgb(244, 117, 96)" />
                  <span className="p-2">Completed Washing</span>
                </div>
                <div>
                  <Dot color="rgb(232, 193, 160)" />
                  <span className="p-2">Currently Washing hand</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
