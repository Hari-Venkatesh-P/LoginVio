import React, {  useMemo } from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import CustomAppBar from "../../components/appbar";
import { APP_NAME } from "../../utils/constants";
const Dashboard = () => {
  const isLogin = useSelector((state: any) => state.isLogin);

  const userDetails = useSelector((state: any) => state.userDetails);

  const showLogout = useMemo(() => {
    return isLogin != null && isLogin == true && userDetails != null;
  }, [userDetails, isLogin]);

  return (
    <Grid>
      <CustomAppBar title={APP_NAME} showLogOut={showLogout} />
      <h1>HELLO FROM DASHBOARD</h1>
    </Grid>
  );
};

export default Dashboard;
