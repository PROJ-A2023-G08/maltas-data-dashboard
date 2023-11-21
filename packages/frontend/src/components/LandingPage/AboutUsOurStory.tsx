import React from "react";
import { Grid, Typography } from "@mui/material";

export default function AboutUsOurStory() {
  return (
    <div className="mb-36">
      <Grid
        container
        sx={{
          backgroundColor: "primary.dark",
          padding: (theme) => theme.spacing(8),
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            padding: (theme) => theme.spacing(8),
          }}
        >
            <OurStoryImage />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            padding: (theme) => theme.spacing(8),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "primary.dark"
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "#fff",
              fontWeight: 900,
              mb: 2,
              fontFamily: "'Work sans',sans-serif",
              fontSize: "50px",
              lineHeight: "56px",
            }}
          >
            Our Story
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              fontSize: (theme) => theme.spacing(3),
              mb: 3,
            }}
          >
            The hand hygiene compliance of surgeons and nurses before surgical
            operations is a shared concern within hospitals. The hands are
            sanitized using a recommended 3-minute procedure. To track this
            compliance, we have developed a device that measures adherence to
            this procedure. Traditional observational methods have proven costly
            and time-consuming, and, furthermore, converting these measurements
            into meaningful insights remains a challenge.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}


export const OurStoryImage = () => {
    const backgroundImageUrl = '/our_story.png';
  
    const divStyle = {
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover', 
      width: '100%', 
      minHeight: '420px',
    };
  
    return (
      <div style={divStyle}>
      </div>
    );
  };
