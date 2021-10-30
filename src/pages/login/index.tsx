import React, { useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import LockClockIcon from "@mui/icons-material/LockClock";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";

import VerifyEmailCard from "../../components/verifyemailcard/index";
import SignUpCard from "../../components/signupcard/index";

import { useSelector } from "react-redux";
import CustomAppBar from "../../components/appbar";
import { APP_NAME } from "../../utils/constants";
import { useLocation, useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Login = () => {
  const location = useLocation();
  const history = useHistory();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const paperStyle = {
    // backgroundColor: "transparent",
    padding: 20,
    // height: "25rem",
    width: isDesktopOrLaptop ? 370 : 280,
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

  const avatarStyle = { backgroundColor: "#ac42c2" }; //"linear-gradient(90deg, #37297e 10%, #ac42c2 50%)" };

  const useStyle = makeStyles({
    indicator: {
      top: "0px",
    },
  });

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
      {/* <CustomAppBar title={APP_NAME} showLogOut={showLogout} /> */}
      <Grid
        container
        style={{
          height: "100vh",
          backgroundImage: `url("https://consumerhelpline.gov.in/directsell/assets/img/backgrounds/1.jpg")`,
        }}
      >
        {isDesktopOrLaptop && <Grid item xs={4}></Grid>}
        <Grid
          item
          xs={isDesktopOrLaptop ? 8 : 12}
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
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
              <h2
                style={{
                  color: "#ac42c2",
                }}
              >
                {APP_NAME}
              </h2>
            </Box>
            {!showSignUpCard ? (
              <VerifyEmailCard />
            ) : (
              <SignUpCard inviteReferralCode={inviteReferralCode} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
