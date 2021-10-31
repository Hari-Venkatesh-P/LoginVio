import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { AxiosRequestHeaders } from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";

import Dashboardcard from "../../components/dashboardcard";
import Userlabel from "../../components/labelcomponent";
import { User } from "../../store/models";
import { logoutUserAPI } from "../../store/api";
import { logOutUser } from "../../store/actions";
import { APP_NAME } from "../../utils/constants";
import {
  clearLocalStorage,
  getItemFromLocalStorage,
} from "../../utils/storage";

const Dashboard = () => {
  const userDetails = useSelector((state: any) => state.userDetails) as User;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = (e: any) => {
    e.preventDefault();
    const message =
      "On Refresh , you will be logged out. Are you sure you want to reload ?";
    e.returnValue = message;
    return message;
  };

  const getUrl = (referralMessage: string) => {
    const len = referralMessage.split(" ").length;
    return referralMessage.split(" ")[len - 1];
  };

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
    }
  };

  return (
    <Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          elevation={30}
          sx={{
            background: "linear-gradient(90deg, #37297e 10%, #ac42c2 90%)",
            display: "flex",
            flexDirection: "column",
            height: isDesktopOrLaptop ? "67vh" : "90vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box m={2}>
              <Typography
                variant="h6"
                component="div"
                style={{ color: "#FFFFFF" }}
              >
                {APP_NAME.toString().toUpperCase()}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
              <Box
                m={2}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Toolbar sx={{ padding: "unset !important" }}>
                  <div>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle style={{ color: "#FFFFFF" }} />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem>My account</MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleLogout();
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>
                </Toolbar>
                <Typography
                  variant="body1"
                  component="div"
                  style={{ color: "#FFFFFF" }}
                >
                  {userDetails.firstName}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Grid
            container
            spacing={2}
            sx={{
              p: 2,
              width: isDesktopOrLaptop ? "90vw" : "100vw",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginLeft: isDesktopOrLaptop ? "4vh" : "",
            }}
          >
            <Grid item xs={12} md={4}>
              <Dashboardcard
                label={"Rewards"}
                value={userDetails.rewards.toString()}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Dashboardcard
                label={"Next Goal"}
                value={userDetails.nextGoal.toString()}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Dashboardcard
                label={"Referral Code"}
                value={userDetails.referralToken}
                referralLink={getUrl(userDetails.referralMessage)}
              />
            </Grid>
          </Grid>
          <Grid item style={{ display: "flex", justifyContent: "center" }}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: isDesktopOrLaptop ? 400 : 600,
                width: isDesktopOrLaptop ? "90vw" : "80vw",
              }}
            >
              <Box mt={2} mb={2} sx={{ display: "flex", flexDirection: "row" }}>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ color: "#000000" }}
                >
                  {"Profile Details"}
                </Typography>
              </Box>
              <Divider />
              <Grid
                container
                spacing={2}
                sx={{
                  p: 2,
                }}
              >
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: isDesktopOrLaptop
                      ? "space-between"
                      : "center",
                  }}
                >
                  <img
                    src={userDetails.avatar}
                    width={"250rem"}
                    height={"250rem"}
                  ></img>
                  {isDesktopOrLaptop && <Divider orientation={"vertical"} />}
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      p: 2,
                    }}
                  >
                    <Userlabel label={"Name"} value={userDetails.firstName} />
                    <Userlabel
                      label={"Mobile"}
                      value={userDetails.phoneNumber}
                    />
                    <Userlabel label={"Email"} value={userDetails.email} />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
