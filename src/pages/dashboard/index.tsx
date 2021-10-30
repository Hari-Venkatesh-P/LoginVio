import React, { useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LockClockIcon from "@mui/icons-material/LockClock";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { makeStyles } from "@mui/styles";

import VerifyEmailCard from "../../components/verifyemailcard/index";
import SignUpCard from "../../components/signupcard/index";
import { EMAIL_VERIFICATION_REQUEST } from "../../store/constants";
import { VerifyEmailPayload } from "../../store/models";
import {
  emailVerificationClear,
  emailVerificationRequest,
} from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducer";
import CustomAppBar from "../../components/appbar";
import { APP_NAME } from "../../utils/constants";
const Dashboard = () => {
  const isLogin = useSelector((state: any) => state.isLogin);

  const userDetails = useSelector((state: any) => state.userDetails);

  const showLogout = useMemo(() => {
    return isLogin != null && isLogin == true && userDetails != null;
  }, [userDetails, isLogin]);

  console.log(showLogout , "showLogout")

  return (
    <Grid>
      <CustomAppBar title={APP_NAME} showLogOut={showLogout} />
      <h1>HELLO FROM DASHBOARD</h1>
    </Grid>
  );
};

export default Dashboard;
