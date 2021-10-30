import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export interface CustomAppBarProps {
  title: string;
  showLogOut: boolean;
}
export default function CustomAppBar(props: CustomAppBarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Box
          sx={{
            minHeight: "4rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box p={2}>
            <Typography variant="h6" component="div">
              {props.title}
            </Typography>
          </Box>
          <Box p={2}>
            {props.showLogOut && <Button color="inherit">Logout</Button>}
          </Box>
        </Box>
      </AppBar>
    </Box>
  );
}
