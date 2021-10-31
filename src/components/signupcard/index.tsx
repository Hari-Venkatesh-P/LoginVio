import * as React from "react";
import { useHistory } from "react-router";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Link from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { signupRequest, signupClear } from "../../store/actions/index";
import { SignUpPayLoad } from "../../store/models";
import ReferralCodeDialog from "../referralcodedialog/index";
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
export interface SignUpCardProps {
  inviteReferralCode: string | null;
}
export default function SignUpCard(props: SignUpCardProps) {
  const classes = useStyles();

  const history = useHistory();

  const dispatch = useDispatch();

  const signupFailure = useSelector((state: any) => state.signupFailure);

  const signupSuccess = useSelector((state: any) => state.signupSuccess);

  const signupLoading = useSelector((state: any) => state.signupLoading);

  const email = useSelector((state: any) => state.email);

  const isLogin = useSelector((state: any) => state.isLogin);

  const [policyAgree, setPolicyAgree] = React.useState<boolean>(false);

  const [referralCode, setReferralCode] = React.useState<string | null>(null);

  const [isReferralCodeModalOpen, setReferralCodeModalOpen] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (email.length > 0) {
      setValue("email", email);
    }
  }, [email]);

  // Callbacks for Signup User.
  React.useEffect(() => {
    if (!signupLoading && signupSuccess && isLogin != null && isLogin == true) {
      console.log("success");
      dispatch(signupClear());
      history.push("/dashboard");
      createNotification("Signup sucess", " ", "success");
    } else if (!signupLoading && signupFailure) {
      createNotification("Signup failed.", " ", "danger");
      dispatch(signupClear());
    }
  }, [signupLoading, signupSuccess, signupFailure, isLogin]);

  const { handleSubmit, control,  setValue } = useForm();

  const onSubmit = async (data: any) => {
    let payload: SignUpPayLoad = {
      firstName: data.firstName,
      email: data.email,
      agreeToPrivacyPolicy: true,
      token: getItemFromLocalStorage("token"),
      source: "WEB_APP",
    };
    if (referralCode && referralCode.length > 0) {
      payload["referredCodeKey"] = referralCode;
    }
    signupUser(payload);
  };

  const signupUser = (data: SignUpPayLoad) => {
    dispatch(signupRequest(data));
  };

  const btnstyle = { margin: "8px 0", color: "#FFFFFF" };

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
    <Box sx={{ backgroundColor: "transparent" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mt={2} mb={2}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <CustomizedTextField
                  label="First name"
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
                message: "First name required",
              },
              minLength: {
                value: "3",
                message: "First name invalid",
              },
            }}
          />
        </Box>
        <Box mt={2} mb={2}>
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
                  disabled={value.length > 0}
                  fullWidth
                />
              );
            }}
            rules={{
              required: {
                value: true,
                message: "Email required",
              },

              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Email invalid",
              },
            }}
          />
        </Box>
        {referralCode && referralCode.length > 0 ? (
          <React.Fragment>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" component="div">
                {"Referral Code -"}
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                style={{
                  marginLeft: "0.5em",
                  marginRight: "0.5em",
                  color: "#37297e",
                }}
              >
                {referralCode}
              </Typography>
              <Link
                underline="always"
                onClick={() => {
                  setReferralCodeModalOpen(true);
                }}
                style={{
                  cursor: "pointer",
                  color: "#37297e",
                  marginBottom: "0.25rem",
                }}
              >
                {"Change ?"}
              </Link>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography variant="body1" component="div">
                {"Having a Referral Code ?  "}
              </Typography>
              <Link
                underline="always"
                onClick={() => {
                  setReferralCodeModalOpen(true);
                }}
                style={{
                  cursor: "pointer",
                  color: "#37297e",
                  marginLeft: "1em",
                  marginBottom: "0.25rem",
                }}
              >
                {"Enter"}
              </Link>
            </Box>
          </React.Fragment>
        )}
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={policyAgree}
                onChange={(e: any) => {
                  setPolicyAgree(e.target.checked);
                }}
                size="small"
                style={{ color: "#ac42c2" }}
              />
            }
            label="Agree to privacy policy"
          />
        </Box>
        <div>
          <Button
            className={classes.root}
            type="submit"
            color="primary"
            variant="contained"
            size="medium"
            style={btnstyle}
            fullWidth
            disabled={!policyAgree}
          >
            {"Sign Up"}
          </Button>
        </div>
      </form>
      <ReferralCodeDialog
        setReferralCode={(value: string) => {
          setReferralCode(value);
        }}
        open={isReferralCodeModalOpen}
        closeModal={() => {
          setReferralCodeModalOpen(false);
        }}
        inviteReferralCode={
          props.inviteReferralCode
            ? props.inviteReferralCode
            : referralCode
            ? referralCode
            : ""
        }
      />
    </Box>
  );
}
