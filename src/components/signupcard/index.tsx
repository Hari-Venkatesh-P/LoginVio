import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signupRequest, signupClear } from "../../store/actions/index";
import { SignUpPayLoad } from "../../store/models";
import { getItemFromLocalStorage } from "../../utils/storage";
import { useHistory } from "react-router";
import Link from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import ReferralCodeDialog from "../referralcodedialog/index";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
export interface SignUpCardProps {
  inviteReferralCode: string | null;
}
export default function SignUpCard(props: SignUpCardProps) {
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
    } else if (!signupLoading && signupFailure) {
      console.log("failed");
      dispatch(signupClear());
    }
  }, [signupLoading, signupSuccess, signupFailure, isLogin]);

  const { handleSubmit, control, getValues, setValue } = useForm();

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

  const btnstyle = { margin: "8px 0" };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mt={2} mb={2}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <TextField
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
                <TextField
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
                  color: "#1565c0",
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
                  color: "#1565c0",
                  marginBottom : "0.25rem"
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
                  color: "#1565c0",
                  marginLeft: "1em",
                  marginBottom : "0.25rem"
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
              />
            }
            label="Agree to privacy policy"
          />
        </Box>
        <div>
          <Button
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
