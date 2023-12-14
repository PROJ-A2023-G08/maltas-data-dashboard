import React from "react";
import Data1 from "../../public/data1.json";
import StackedCompliance from "./Charts/StackedCompliance";
import LineAverage from "./Charts/LineAverage";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
//import { MeasurementContext } from "@/contexts/MeasurementProvider.context";
import { MeasurementContext } from "../contexts/MeasurementProvider.context";
import { useContext, useEffect, useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LineCompliance from "./Charts/LineCompliance";
import LineInterrupted from "./Charts/LineInterrupted";
import { PieCompliance } from "./Charts/PieCompliance";
const Dashboard = () => {
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
      <h1>Dashboard</h1>
      <div className="flex justify-end mb-4">
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
        <Grid container item xs={12} md={4} spacing={3}>
          <Grid item xs={12}>
            <Card >
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{
                    marginBottom: 2,
                  }}
                  component="div"
                  className="text-darkblueG8"
                >
                  Count of Status
                </Typography>
                <Box sx={{ height: '200px' }}>
                  <PieCompliance />
                </Box>

              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{
                    marginBottom: (theme) => theme.spacing(2),
                  }}
                  className="text-darkblueG8"
                  component="div"
                >
                  Compliance By Role / Month
                </Typography>

                <Box
                  sx={{ height: '200px' }}
                  paddingX={1}
                  paddingY={1}
                >
                  <div className="h-full">
                    <StackedCompliance />
                  </div>
                </Box>

              </CardContent>
            </Card>
          </Grid>

        </Grid>
        <Grid item xs={12} md={8} >
          <Card sx={{ height: '600px' }}>
            <CardContent>
              <Box>
                <Typography
                  variant="h4"
                  className="text-darkblueG8"
                >
                  Average Time Spent / Day for Each Role
                </Typography>
                <Typography>
                  Each day is counted by the average time spent of each role
                </Typography>
              </Box>

              <Box sx={{ height: '450px' }}>
                <div className="w-full h-full">
                  <LineAverage
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                  />

                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} >
          <Card sx={{ height: '500px' }}>
            <CardContent>
              <Box mb={1}>
                <Typography
                  variant="h4"
                  mb={1}
                  className="text-darkblueG8"
                >
                  Non Compliance Over Time
                </Typography>
                <Typography mb={1}>
                  Non Compliance of each role each day counted by the number of measurement spent less than 180 seconds
                </Typography>
              </Box>
              <Box
                sx={{ height: '400px' }} >
                <div className="h-full">
                  <LineInterrupted minimumDate={minimumDate} maximumDate={maximumDate} />
                </div>
              </Box>

            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} >
          <Card sx={{ height: '500px' }}>
            <CardContent>
              <Box mb={1}>
                <Typography
                  variant="h4"
                  mb={1}
                  className="text-darkblueG8"
                >
                  Compliance Over Time
                </Typography>
                <Typography mb={1}>
                  Compliance of each role each day counted by the number of measurement that reach 180 seconds
                </Typography>
              </Box>
              <Box
                sx={{ height: '400px' }}>
                <LineCompliance
                  minimumDate={minimumDate}
                  maximumDate={maximumDate}
                />
              </Box>

            </CardContent>
          </Card>
        </Grid>






      </Grid>
    </>
  );
};

export default Dashboard;
