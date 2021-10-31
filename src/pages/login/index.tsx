import React, { useEffect, useMemo } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Box from "@mui/material/Box";
import LockClockIcon from "@mui/icons-material/LockClock";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import VerifyEmailCard from "../../components/verifyemailcard/index";
import SignUpCard from "../../components/signupcard/index";
import { APP_NAME } from "../../utils/constants";

import 'react-notifications-component/dist/theme.css';
import 'animate.css';

const Login = () => {
  const location = useLocation();
  const history = useHistory();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const paperStyle = {
    padding: 20,
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

  const avatarStyle = { backgroundColor: "#ac42c2" };

  const emailVerifiedStatus = useSelector(
    (state: any) => state.emailVerifiedStatus
  );

  const emailTokenVerifiedStatus = useSelector(
    (state: any) => state.emailTokenVerifiedStatus
  );

  const isLogin = useSelector((state: any) => state.isLogin);

  const showSignUpCard = useMemo(() => {
    return (
      isLogin != null &&
      isLogin == false &&
      emailVerifiedStatus &&
      emailTokenVerifiedStatus
    );
  }, [isLogin, emailVerifiedStatus, emailTokenVerifiedStatus]);

  return (
    <React.Fragment>
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
