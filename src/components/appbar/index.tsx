import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { logoutUserAPI } from "../../store/api";
import { AxiosRequestHeaders } from "axios";
import {
  clearLocalStorage,
  getItemFromLocalStorage,
} from "../../utils/storage";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../../store/actions";
import { useHistory } from "react-router";

export interface CustomAppBarProps {
  title: string;
  showLogOut: boolean;
}
export default function CustomAppBar(props: CustomAppBarProps) {
  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogout = async () => {
    const headersMap: AxiosRequestHeaders = {
      Authorization: `Bearer ${getItemFromLocalStorage(
        "userId"
      )},${getItemFromLocalStorage("authToken")}`,
    };
    const res = await logoutUserAPI(
      getItemFromLocalStorage("userId"),
      headersMap
    );
    if (res.status == 200 && res.data && res.data.success) {
      clearLocalStorage();
      dispatch(logOutUser());
      history.push("/");
    } else {
      // Logout Err
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #37297e 10%, #ac42c2 90%)",
        }}
      >
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
            {props.showLogOut && (
              <Button
                color="inherit"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Box>
      </AppBar>
    </Box>
  );
}
