import * as React from "react";
import { AxiosResponse } from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { validateReferalToken } from "../../store/api";
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

export interface ReferralCodeDialogProps {
  open: boolean;
  inviteReferralCode: string;
  setReferralCode: any;
  closeModal: any;
}

export default function ReferralCodeDialog(props: ReferralCodeDialogProps) {
  const classes = useStyles();

  const { handleSubmit, control, getValues, setValue } = useForm();

  React.useEffect(() => {
    if (props.inviteReferralCode && props.inviteReferralCode.length > 0) {
      setValue("referredCodeKey", props.inviteReferralCode);
    }
  }, []);
  const [invalidReferralCode, setInvalidReferralCode] =
    React.useState<boolean>(false);

  const onSubmit = async (data: any) => {
    let res: AxiosResponse = await validateReferalToken(data.referredCodeKey);
    if (res.status == 200 && res.data && res.data.success) {
      setInvalidReferralCode(false);
      props.setReferralCode(data.referredCodeKey);
      props.closeModal();
      createNotification("Referral code applied", " ", "success");
    } else {
      setInvalidReferralCode(true);
    }
  };

  const btnstyle = { margin: "8px 0" };

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
    <div>
      <Dialog
        open={props.open}
        onClose={() => {
          props.closeModal();
          setValue("referredCodeKey", "");
          setInvalidReferralCode(false);
        }}
      >
        <DialogContent>
          <DialogContentText>Enter Referral Code</DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mt={2} mb={1}>
              <Controller
                name="referredCodeKey"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <CustomizedTextField
                      label="Referral code"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error || invalidReferralCode}
                      helperText={
                        error || invalidReferralCode
                          ? "Referral code invalid"
                          : null
                      }
                      size="small"
                    />
                  );
                }}
                rules={{
                  pattern: {
                    value: /^[A-Z0-9]{6}$/i,
                    message: "Referral code invalid",
                  },
                  maxLength: {
                    value: "6",
                    message: "Referral code invalid",
                  },
                  minLength: {
                    value: "6",
                    message: "Referral code invalid",
                  },
                }}
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
              >
                {"Submit"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
