import React from "react";

import Data1 from "../../public/data1.json";
import StackedCompliance from "./Charts/StackedCompliance";
import LineAverage from "./Charts/LineAverage";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { MeasurementContext } from "@/contexts/MeasurementProvider.context";
import { useContext, useEffect, useState } from "react";
import { subDays } from 'date-fns'
import { PieCompliance } from "./Charts/PieCompliance";

const Home = () => {
  const { maxDate, statisticsNumbers } = useContext(MeasurementContext);
  const minimumDate = maxDate && subDays(maxDate, 60);
  const percentage = statisticsNumbers && Math.round(statisticsNumbers.compliance / statisticsNumbers.total * 100);
  return (
    <>
      <h1>Hi, Welcome</h1>
      <Grid container spacing={3}>
        <Grid item xs={2} md={2} >
          <Card sx={{ height: '400px' }}>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item sx={{ textAlign: 'center' }} xs={12}>
                  <Typography variant="h1">{percentage} %</Typography>
                  <Typography>Compliance Percentage</Typography>
                </Grid>
                <Grid item sx={{ textAlign: 'center' }} xs={12}>
                  <Typography variant="h1">{statisticsNumbers?.compliance}</Typography>
                  <Typography>Compliance Count</Typography>
                </Grid>
                <Grid item sx={{ textAlign: 'center' }} xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems:'baseline', gap: 1}}>
                    <Typography variant="h1">{Math.round(statisticsNumbers?.averageTimeSpent || 0)}</Typography>
                    <Typography variant="h2">s</Typography>
                  </Box>
                  <Typography>Average Time Spent</Typography>
                </Grid>
                <Grid item sx={{ textAlign: 'center' }} xs={12}>
                  <Typography variant="h1">{statisticsNumbers?.total}</Typography>
                  <Typography>Total Measurement</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid container item xs={10} spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '400px' }}>
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{
                    marginBottom: 2,
                  }}
                  component="div"
                >
                  Count of Status
                </Typography>
                <Box sx={{ height: '250px' }}>
                  <PieCompliance />
                </Box>

              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: '400px' }}>
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{
                    marginBottom: (theme) => theme.spacing(2),
                  }}
                  component="div"
                >
                  Compliance By Role / Month
                </Typography>

                <Box
                  sx={{ height: '300px' }}>
                  <div className="h-full">
                    <StackedCompliance />
                  </div>
                </Box>

              </CardContent>
            </Card>
          </Grid>

        </Grid>
        <Grid item xs={12} md={12} >
          <Card sx={{ height: '600px' }}>
            <CardContent>
              <Box>
                <Typography variant="h4">
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
                    maximumDate={maxDate}
                  />

                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>



      </Grid>
    </>
  );
};

export default Home;
