import * as React from "react";
import { useMemo } from "react";
import { useHistory } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import { makeStyles } from "@mui/styles";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  emailVerificationRequest,
  emailVerificationCodeRequest,
  resendEmailVerificationCodeRequest,
  emailVerificationClear,
  emailVerificationCodeClear,
  resendEmailVerificationCodeClear,
  revertEmailVerifications,
} from "../../store/actions/index";
import {
  VerifyEmailPayload,
  VerifyEmailCodePayload,
  ResendEmailCodePayload,
} from "../../store/models";
import { getItemFromLocalStorage } from "../../utils/storage";
import { createNotification } from "../../utils/notification";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(90deg, #37297e 10%, #ac42c2 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 40,
    padding: "0 30px",
  },
});

export default function VerifyEmailCard() {

  const classes = useStyles();

  const history = useHistory();

  const dispatch = useDispatch();

  const verifyEmailFailure = useSelector(
    (state: any) => state.verifyEmailFailure
  );

  const verifyEmailSuccess = useSelector(
    (state: any) => state.verifyEmailSuccess
  );

  const verifyEmailLoading = useSelector(
    (state: any) => state.verifyEmailLoading
  );

  const verifyEmailCodeFailure = useSelector(
    (state: any) => state.verifyEmailCodeFailure
  );

  const verifyEmailCodeSuccess = useSelector(
    (state: any) => state.verifyEmailCodeSuccess
  );

  const verifyEmailCodeLoading = useSelector(
    (state: any) => state.verifyEmailCodeLoading
  );

  const resendEmailCodeFailure = useSelector(
    (state: any) => state.resendEmailCodeFailure
  );

  const resendEmailCodeSuccess = useSelector(
    (state: any) => state.resendEmailCodeSuccess
  );

  const resendEmailCodeLoading = useSelector(
    (state: any) => state.resendEmailCodeLoading
  );

  const wrongEmailTokenCount = useSelector(
    (state: any) => state.wrongEmailTokenCount
  );

  const resendEmailTokenCount = useSelector(
    (state: any) => state.resendEmailTokenCount
  );

  const isLogin = useSelector((state: any) => state.isLogin);

  const emailVerifiedStatus = useSelector(
    (state: any) => state.emailVerifiedStatus
  );

  const isVerifyCode = useMemo(() => {
    return (
      isLogin != null && emailVerifiedStatus == true && wrongEmailTokenCount < 3
    );
  }, [isLogin, emailVerifiedStatus, wrongEmailTokenCount]);

  // Callbacks for Verify Email.
  React.useEffect(() => {
    if (
      (!verifyEmailLoading && verifyEmailSuccess && isLogin != null) ||
      (!verifyEmailLoading && verifyEmailFailure)
    ) {
      if (verifyEmailFailure) {
        createNotification(
          "Verification failed",
          "Email verification failed.",
          "danger"
        );
      }
      // Email verfication api done
      dispatch(emailVerificationClear());
    }
  }, [verifyEmailLoading, verifyEmailSuccess, verifyEmailFailure, isLogin]);

  // Callbacks for Verify Email Code.
  React.useEffect(() => {
    if (
      !verifyEmailCodeLoading &&
      verifyEmailCodeSuccess &&
      isLogin != null &&
      isLogin == true
    ) {
      // Email code verfication done success case
      // Route to dashboard page
      dispatch(emailVerificationCodeClear());
      history.push("/dashboard");
    } else if (!verifyEmailCodeLoading && verifyEmailCodeFailure) {
      const pendingCount: number = 3 - parseInt(wrongEmailTokenCount);
      var pendingCountmessage: string = "";
      if (pendingCount > 0) {
        pendingCountmessage = "You have " + pendingCount + " more attempts";
      }
      createNotification(
        "Verification failed",
        "Verfication code is invalid or expired." + pendingCountmessage,
        "danger"
      );
      // Email code verfication done failed case
      dispatch(emailVerificationCodeClear());
    }
  }, [
    verifyEmailCodeLoading,
    verifyEmailCodeSuccess,
    verifyEmailCodeFailure,
    isLogin,
    wrongEmailTokenCount,
  ]);

  // Callbacks for Resend email code.
  React.useEffect(() => {
    if (
      (!resendEmailCodeLoading && resendEmailCodeSuccess) ||
      (!resendEmailCodeLoading && resendEmailCodeFailure)
    ) {
      if (resendEmailCodeSuccess) {
        createNotification("Verification code resent.", " ", "success");
      }
      dispatch(resendEmailVerificationCodeClear());
    }
  }, [resendEmailCodeLoading, resendEmailCodeSuccess, resendEmailCodeFailure]);

  // Watcher for wrong email token count
  React.useEffect(() => {
    if (emailVerifiedStatus && wrongEmailTokenCount > 2) {
      // Resetting the verification status , since user has expired the max count
      setValue("email", "");
      dispatch(revertEmailVerifications());
    }
  }, [wrongEmailTokenCount, emailVerifiedStatus]);

  const { handleSubmit, control, getValues, setValue } = useForm();

  const onSubmit = (data: any) => {
    if (isVerifyCode) {
      const payload: VerifyEmailCodePayload = {
        email: data.email,
        token: getItemFromLocalStorage("token"),
        verificationCode: data.verificationCode,
      };
      verifyEmailCode(payload);
    } else {
      verifyEmail(data);
    }
  };

  const verifyEmail = (data: VerifyEmailPayload) => {
    dispatch(emailVerificationRequest(data));
  };

  const verifyEmailCode = (data: VerifyEmailCodePayload) => {
    dispatch(emailVerificationCodeRequest(data));
  };

  const resendEmailCode = () => {
    if (getValues("email").length > 0) {
      const data: ResendEmailCodePayload = {
        email: getValues("email"),
        token: getItemFromLocalStorage("token"),
      };
      dispatch(resendEmailVerificationCodeRequest(data));
    }
  };

  const btnstyle = {
    margin: "8px 0",
    color: "#FFFFFF",
  };

  const CustomizedTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#ac42c2",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#ac42c2",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#ac42c2",
      },
    },
  });

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mt={4} mb={2}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <CustomizedTextField
                  label="Email"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  size="small"
                  fullWidth
                />
              );
            }}
            rules={{
              required: "Email required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Email invalid",
              },
            }}
          />
        </Box>
        {isVerifyCode && (
          <React.Fragment>
            <Box mt={2} mb={1}>
              <Controller
                name="verificationCode"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <CustomizedTextField
                      label="Verification Code"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      size="small"
                      fullWidth
                    />
                  );
                }}
                rules={{
                  required: {
                    value: true,
                    message: "Verification code required",
                  },
                }}
              />
            </Box>
            {resendEmailTokenCount < 3 && (
              <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                <Link
                  underline="always"
                  onClick={(e: any) => {
                    resendEmailCode();
                  }}
                  style={{
                    cursor: "pointer",
                    color: "#37297e",
                  }}
                >
                  {"Resend code"}
                </Link>
              </Box>
            )}
          </React.Fragment>
        )}
        <div>
          <Button
            className={classes.root}
            type="submit"
            color="primary"
            variant="contained"
            size="medium"
            style={btnstyle}
            fullWidth
          >
            {isVerifyCode ? "Verify code" : "Submit"}
          </Button>
        </div>
      </form>
    </Box>
  );
}
