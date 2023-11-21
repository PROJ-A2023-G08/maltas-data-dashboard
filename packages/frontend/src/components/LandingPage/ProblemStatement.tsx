import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function ProblemStatement() {
  const router = useRouter();
  return (
    <div className="p-20 pt-16 pb-6 bg-slate-50">
      <Grid container>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
            MALTAS TECHNOLOGY OY
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
            Monitoring Surgical Hand Hygiene Compliance{" "}
            <span className="text-primary">in Operating Theaters</span>
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
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
          <div className="w-full flex justify-start mb-4">
            <Button
              sx={{
                fontWeight: 900,
                width: (theme) => theme.spacing(20),
                height: (theme) => theme.spacing(7),
              }}
              size="large"
              variant="contained"
              onClick={()=>{
                router.push("/about");
              }}
            >
              Learn More
            </Button>
          </div>
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
          <img
            className={"px-8 w-full"}
            src="/washing_hand_landing.png"
            alt="Maltas Logo"
          />
        </Grid>
      </Grid>
    </div>
  );
}
