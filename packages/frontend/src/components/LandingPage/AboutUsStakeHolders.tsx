import { Grid, Avatar, Typography } from "@mui/material";
import React from "react";

const avatarStyle = {
  width: 200,
  height: 200,
  marginBottom: 8,
};

const detailsContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: "8px",
};

export default function AboutUsStakeHolders() {
  return (
    <div>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item container justifyContent="center">
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid sx={detailsContainerStyles} item>
              <Avatar
                src="/Elina_Karna.png"
                alt="Elina Karna"
                style={avatarStyle}
              />
              <Typography
                color={"text.secondary"}
                variant="subtitle1"
                align="center"
              >
                Elina Karna
              </Typography>
              <Typography variant="subtitle1" align="center">
                Founder/End Users Representative
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid sx={detailsContainerStyles} item>
              <Avatar src="/lassi_vuorinen.jpeg" style={avatarStyle} />
              <Typography
                color={"text.secondary"}
                variant="subtitle1"
                align="center"
              >
                Lassi Vuorinen
              </Typography>
              <Typography variant="subtitle1" align="center">
                Founder/Project Lead
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={12}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid sx={detailsContainerStyles} item>
            <Avatar src="/jussi_Rasku.jpeg" style={avatarStyle} />
            <Typography
              color={"text.secondary"}
              variant="subtitle1"
              align="center"
            >
              Jussi Rasku
            </Typography>
            <Typography variant="subtitle1" align="center">
              Founder/Technical Personnel
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
