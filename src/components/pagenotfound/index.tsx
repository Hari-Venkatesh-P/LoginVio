import React from "react";
import Grid from "@mui/material/Grid";
import CustomAppBar from "../appbar";
import { APP_NAME } from "../../utils/constants";

export default function PageNotFound() {
  return (
    <div>
      <CustomAppBar title={APP_NAME} showLogOut={false} />
      <Grid
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "90vh",
        }}
        container
        spacing={0}
      >
        <h2 style={{ color: "red" }}> 404 Page Not Found</h2>
        <Grid item xs={5}></Grid>
      </Grid>
    </div>
  );
}
