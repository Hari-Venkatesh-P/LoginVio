import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export interface CustomCardprops {
  title: string;
  keys: Array<string>;
  values: Array<string>;
}

export default function CustomCard(props: CustomCardprops) {
  const renderCardLabels = React.useCallback(() => {
    return props.keys.map((key: string) => {
      return (
        <Box p={1}>
          <Typography variant="subtitle1" style={labelStyle}>
            {key}
          </Typography>
        </Box>
      );
    });
  }, [props]);

  const renderCardValues = React.useCallback(() => {
    return props.values.map((value: string) => {
      return (
        <Box p={1}>
          <Typography variant="subtitle1">{value}</Typography>
        </Box>
      );
    });
  }, [props]);

  const labelStyle = { color: "#1565c0" };
  return (
    <React.Fragment>
      <Grid container>
        <Grid
          item
          xs={4}
          style={{
            height: 220,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {renderCardLabels()}
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            height: 220,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {renderCardValues()}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
