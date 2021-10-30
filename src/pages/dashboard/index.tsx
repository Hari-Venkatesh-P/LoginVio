import { useMemo } from "react";
import { useSelector } from "react-redux";
import CustomAppBar from "../../components/appbar";
import { APP_NAME } from "../../utils/constants";

import {  createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { User } from "../../store/models";
import CustomCard from "../../components/customcard";

const Dashboard = () => {
  const isLogin = useSelector((state: any) => state.isLogin);

  const userDetails = useSelector((state: any) => state.userDetails) as User;

  const showLogout = useMemo(() => {
    return isLogin != null && isLogin == true && userDetails != null;
  }, [userDetails, isLogin]);

  const mdTheme = createTheme();

  return (
    <Grid>
      <CustomAppBar title={APP_NAME} showLogOut={showLogout} />
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "90vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 240,
                      borderRadius: 10,
                    }}
                  >
                    <img
                      src={userDetails.avatar}
                      style={{ height: "30vh", width: "30vh" }}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                      borderRadius: 10,
                    }}
                  >
                    <CustomCard
                      title={"HELLO"}
                      keys={["First Name", "Last Name", "Mobile", "Email"]}
                      values={[
                        userDetails.firstName,
                        userDetails.lastName,
                        userDetails.phoneNumber,
                        userDetails.email,
                      ]}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                      borderRadius: 10,
                    }}
                  >
                    <CustomCard
                      title={"HELLO"}
                      keys={["Rewards", "Next Goals", "Referral"]}
                      values={[
                        userDetails.rewards.toString(),
                        userDetails.nextGoal.toString(),
                        userDetails.referralToken,
                      ]}
                    />
                  </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  ></Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Grid>
  );
};

export default Dashboard;
