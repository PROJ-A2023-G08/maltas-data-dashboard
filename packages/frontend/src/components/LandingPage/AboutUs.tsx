import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import AboutUsStakeHolders from "./AboutUsStakeHolders";
import AboutUsOurStory from "./AboutUsOurStory";

export default function AboutUs() {
  const router = useRouter();
  return (
    <>
    <div className="p-20 pt-16 pb-6 bg-slate-50">
      <Grid container>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            px: 2,
          }}
          xs={12}
          sm={12}
          md={6}
          item
        >
          <Typography
            sx={{
              width: "100%",
              fontWeight: 600,
              mb: 2,
            }}
            color={"primary"}
            variant="h5"
          >
            About us
          </Typography>
          <Typography
            color="text.primary"
            sx={{
              fontWeight: 900,
              mb: 2,
              fontFamily: "'Work sans',sans-serif",
              fontSize: "50px",
              lineHeight: "56px",
            }}
            variant="h1"
          >
            Mission
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: (theme) => theme.spacing(3),
              mb: 3,
            }}
          >
            Many hospitals have an infection control unit that plays a pivotal
            role in ensuring patient and staff safety by offering expertise,
            training, and monitoring related to infection prevention. A
            specialized dashboard, focused on the reporting and interpretation
            of the device measurements, could drastically enhance the capability
            of the infection control unit to track the hand hygienie compliance
            in operating theaters of the hospital. The dashboard would not only
            present data but also act as a tool that can actively be used to
            target interventions to maintain good level of hand hygiene
            compliance.
          </Typography>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          xs={12}
          sm={12}
          md={6}
          item
        >
          <AboutUsStakeHolders />
        </Grid>
      </Grid>
      
    </div>
    <AboutUsOurStory />
    </>
  );
}
