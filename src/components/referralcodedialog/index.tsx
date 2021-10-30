import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { AxiosResponse } from "axios";
import { validateReferalToken } from "../../store/api";

export interface ReferralCodeDialogProps {
  open: boolean;
  referralCode: string | null;
  inviteReferralCode: string;
  setReferralCode: any;
  closeModal: any;
}

export default function ReferralCodeDialog(props: ReferralCodeDialogProps) {
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
    } else {
      setInvalidReferralCode(true);
    }
  };

  const btnstyle = { margin: "8px 0" };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => {
          props.closeModal();
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
                    <TextField
                      label="Referred code"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error || invalidReferralCode}
                      helperText={
                        error || invalidReferralCode
                          ? "Referred code invalid"
                          : null
                      }
                      size="small"
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
            <div>
              <Button
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
