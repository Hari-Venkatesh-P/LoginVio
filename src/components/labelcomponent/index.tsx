// Common component which represents the key value diplayed in dashboard

import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export interface userlabelprops {
  label: string;
  value: string;
}

export default function Userlabel(props: userlabelprops) {
  return (
    <React.Fragment>
      <Grid item xs={5} md={3}>
        <Typography variant="subtitle1" component="div" style={{ color: "grey" }}>
          {props.label}
        </Typography>
      </Grid>
      <Grid item xs={1} md={1}>
        <Typography variant="subtitle1" component="div" style={{ color: "grey" }}>
          {":"}
        </Typography>
      </Grid>
      <Grid item xs={6} md={8}>
        <Typography variant="subtitle1" component="div" style={{ color: "#000000" }}>
          {props.value}
        </Typography>
      </Grid>
    </React.Fragment>
  );
}
