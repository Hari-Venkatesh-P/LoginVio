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
import { useLocation, useHistory } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const history = useHistory();

  const paperStyle = {
    padding: 20,
    // height: "25rem",
    width: 280,
    margin: "20px auto",
  };

  const [inviteReferralCode, seInviteReferralCode] = React.useState<
    string | null
  >(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.has("invite")) {
      seInviteReferralCode(queryParams.get("invite"));
      queryParams.delete("invite");
      history.replace({
        search: queryParams.toString(),
      });
    }
  }, []);

  const avatarStyle = { backgroundColor: "#1565c0" };

  const useStyle = makeStyles({
    indicator: {
      top: "0px",
    },
  });

  const classes = useStyle();

  const emailVerifiedStatus = useSelector(
    (state: any) => state.emailVerifiedStatus
  );

  const emailTokenVerifiedStatus = useSelector(
    (state: any) => state.emailTokenVerifiedStatus
  );

  const isLogin = useSelector((state: any) => state.isLogin);

  const userDetails = useSelector((state: any) => state.userDetails);

  const showSignUpCard = useMemo(() => {
    return (
      isLogin != null &&
      isLogin == false &&
      emailVerifiedStatus &&
      emailTokenVerifiedStatus
    );
  }, [isLogin, emailVerifiedStatus, emailTokenVerifiedStatus]);

  const showLogout = useMemo(() => {
    return isLogin != null && isLogin == true && userDetails != null;
  }, [userDetails, isLogin]);

  return (
    <React.Fragment>
      <CustomAppBar title={APP_NAME} showLogOut={showLogout} />
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar style={avatarStyle}>
              <LockClockIcon />
            </Avatar>
            <h2>{APP_NAME}</h2>
          </Box>
          {!showSignUpCard ? <VerifyEmailCard /> : <SignUpCard inviteReferralCode={inviteReferralCode}/>}

          {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            classes={{
              indicator: classes.indicator,
            }}
            value={value}
            onChange={handleChange}
            variant="fullWidth"
          >
            <Tab label="VERIFY" value={0} />
            <Tab label="SIGN UP" value={1} />
          </Tabs>
        </Box> */}
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
