import { produce } from "immer";
import { initialReducerState, VerifyEmailPayload } from "../models";
import { StoreActions } from "../actions/index";
import {
  EMAIL_VERIFICATION_REQUEST,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_FAILURE,
  EMAIL_VERIFICATION_CLEAR,
  EMAIL_VERIFICATION_CODE_REQUEST,
  EMAIL_VERIFICATION_CODE_SUCCESS,
  EMAIL_VERIFICATION_CODE_FAILURE,
  EMAIL_VERIFICATION_CODE_CLEAR,
  RESEND_EMAIL_VERIFICATION_CODE_REQUEST,
  RESEND_EMAIL_VERIFICATION_CODE_SUCCESS,
  RESEND_EMAIL_VERIFICATION_CODE_FAILURE,
  RESEND_EMAIL_VERIFICATION_CODE_CLEAR,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_CLEAR,
  REVERT_EMAIL_VERIFICATION,
} from "../constants";

const initialCheckInState: initialReducerState = {
  // API Loading states
  verifyEmailLoading: false,
  verifyEmailSuccess: false,
  verifyEmailFailure: false,

  verifyEmailCodeLoading: false,
  verifyEmailCodeSuccess: false,
  verifyEmailCodeFailure: false,

  resendEmailCodeLoading: false,
  resendEmailCodeSuccess: false,
  resendEmailCodeFailure: false,

  signupLoading: false,
  signupSuccess: false,
  signupFailure: false,

  // Data
  isLogin: null,
  email: null,
  wrongEmailTokenCount: 0,
  resendEmailTokenCount: 0,
  emailVerifiedStatus: false,
  emailTokenVerifiedStatus: false,
};

export default function defaultReducer(
  state: initialReducerState = initialCheckInState,
  action: StoreActions
) {
  return produce(state, (current) => {
    switch (action.type) {
      // Get Offers
      case EMAIL_VERIFICATION_REQUEST:
        current.verifyEmailLoading = true;
        const data = action.payload as VerifyEmailPayload;
        current.email = data.email;
        break;
      case EMAIL_VERIFICATION_SUCCESS:
        current.verifyEmailSuccess = true;
        current.verifyEmailLoading = false;
        current.emailVerifiedStatus = true;
        current.isLogin = action.payload as boolean;
        break;
      case EMAIL_VERIFICATION_FAILURE:
        current.verifyEmailFailure = true;
        current.verifyEmailLoading = false;
        break;
      case EMAIL_VERIFICATION_CLEAR:
        current.verifyEmailSuccess = false;
        current.verifyEmailFailure = false;
        break;
      case EMAIL_VERIFICATION_CODE_REQUEST:
        current.verifyEmailCodeLoading = true;
        break;
      case EMAIL_VERIFICATION_CODE_SUCCESS:
        current.verifyEmailCodeSuccess = true;
        current.verifyEmailCodeLoading = false;
        current.emailTokenVerifiedStatus = true;
        current.isLogin = action.payload as boolean;
        break;
      case EMAIL_VERIFICATION_CODE_FAILURE:
        current.verifyEmailCodeFailure = true;
        current.wrongEmailTokenCount = action.payload as number;
        current.verifyEmailCodeLoading = false;
        break;
      case EMAIL_VERIFICATION_CODE_CLEAR:
        current.verifyEmailCodeSuccess = false;
        current.verifyEmailCodeFailure = false;
        break;
      case RESEND_EMAIL_VERIFICATION_CODE_REQUEST:
        current.resendEmailCodeLoading = true;
        break;
      case RESEND_EMAIL_VERIFICATION_CODE_SUCCESS:
        current.resendEmailCodeSuccess = true;
        current.resendEmailCodeLoading = false;
        current.resendEmailTokenCount = action.payload as number;
        break;
      case RESEND_EMAIL_VERIFICATION_CODE_FAILURE:
        current.resendEmailCodeFailure = true;
        current.resendEmailCodeLoading = false;
        break;
      case RESEND_EMAIL_VERIFICATION_CODE_CLEAR:
        current.resendEmailCodeSuccess = false;
        current.resendEmailCodeFailure = false;
        break;
      case SIGN_UP_REQUEST:
        current.signupLoading = true;
        break;
      case SIGN_UP_SUCCESS:
        current.signupSuccess = true;
        current.signupLoading = false;
        break;
      case SIGN_UP_FAILURE:
        current.signupFailure = true;
        current.signupLoading = false;
        break;
      case SIGN_UP_FAILURE:
        current.signupSuccess = false;
        current.signupFailure = false;
        break;
      case REVERT_EMAIL_VERIFICATION:
        current.isLogin = null;
        current.email = null;
        current.wrongEmailTokenCount = 0;
        current.resendEmailTokenCount = 0;
        current.emailVerifiedStatus = false;
        current.emailTokenVerifiedStatus = false;
        break;
    }
  });
}
