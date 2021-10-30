import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signupRequest, signupClear } from "../../store/actions/index";
import { SignUpPayLoad } from "../../store/models";
import { useMemo } from "react";
import { getItemFromLocalStorage } from "../../utils/storage";
import { useHistory } from "react-router";
import { validateReferalToken } from "../../store/api";
import { AxiosResponse } from "axios";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function SignUpCard() {
  const history = useHistory();

  const dispatch = useDispatch();

  const signupFailure = useSelector((state: any) => state.signupFailure);

  const signupSuccess = useSelector((state: any) => state.signupSuccess);

  const signupLoading = useSelector((state: any) => state.signupLoading);

  const email = useSelector((state: any) => state.email);

  const isLogin = useSelector((state: any) => state.isLogin);

  const [policyAgree, setPolicyAgree] = React.useState<boolean>(false);

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
    if (data.referredCodeKey.length > 0) {
      let res: AxiosResponse = await validateReferalToken(data.referredCodeKey);
      if (res.status == 200 && res.data && res.data.success) {
        payload["referredCodeKey"] = data.referredCodeKey;
      } else {
        return;
      }
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
        <Box mt={2} mb={1}>
          <Controller
            name="referredCodeKey"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <TextField
                  label="Referred code"
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
              pattern: {
                value: /^[A-Z0-9]{6}$/i,
                message: "Referred code invalid",
              },
              maxLength: {
                value: "6",
                message: "Referred code invalid",
              },
              minLength: {
                value: "6",
                message: "Referred code invalid",
              },
            }}
          />
        </Box>
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
    </Box>
  );
}
