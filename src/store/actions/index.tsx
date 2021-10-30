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
  REVERT_EMAIL_VERIFICATION,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_CLEAR,
} from "../constants";
import {
  ResendEmailCodePayload,
  SignUpPayLoad,
  SignupSuccessResponse,
  VerifyEmailCodePayload,
  VerifyEmailPayload,
} from "../models";
import { typedAction } from "../utils";

export function emailVerificationRequest(details: VerifyEmailPayload) {
  return typedAction(EMAIL_VERIFICATION_REQUEST, details);
}

export function emailVerificationSuccess(isLogin: boolean) {
  return typedAction(EMAIL_VERIFICATION_SUCCESS, isLogin);
}

export function emailVerificationFailure() {
  return typedAction(EMAIL_VERIFICATION_FAILURE, "");
}

export function emailVerificationClear() {
  return typedAction(EMAIL_VERIFICATION_CLEAR, "");
}

export function emailVerificationCodeRequest(details: VerifyEmailCodePayload) {
  return typedAction(EMAIL_VERIFICATION_CODE_REQUEST, details);
}

export function emailVerificationCodeSuccess(isLogin: boolean) {
  return typedAction(EMAIL_VERIFICATION_CODE_SUCCESS, isLogin);
}

export function emailVerificationCodeFailure(wrongEmailTokenCount: number) {
  return typedAction(EMAIL_VERIFICATION_CODE_FAILURE, wrongEmailTokenCount);
}

export function emailVerificationCodeClear() {
  return typedAction(EMAIL_VERIFICATION_CODE_CLEAR, "");
}

export function resendEmailVerificationCodeRequest(
  details: ResendEmailCodePayload
) {
  return typedAction(RESEND_EMAIL_VERIFICATION_CODE_REQUEST, details);
}

export function resendEmailVerificationCodeSuccess(
  resendEmailTokenCount: number
) {
  return typedAction(
    RESEND_EMAIL_VERIFICATION_CODE_SUCCESS,
    resendEmailTokenCount
  );
}

export function resendEmailVerificationCodeFailure() {
  return typedAction(RESEND_EMAIL_VERIFICATION_CODE_FAILURE, "");
}

export function resendEmailVerificationCodeClear() {
  return typedAction(RESEND_EMAIL_VERIFICATION_CODE_CLEAR, "");
}

export function signupRequest(details: SignUpPayLoad) {
  return typedAction(SIGN_UP_REQUEST, details);
}

export function signupSuccess(details : SignupSuccessResponse) {
  return typedAction(SIGN_UP_SUCCESS, details);
}

export function signupFailure() {
  return typedAction(SIGN_UP_FAILURE, "");
}

export function signupClear() {
  return typedAction(SIGN_UP_CLEAR, "");
}

export function revertEmailVerifications() {
  return typedAction(REVERT_EMAIL_VERIFICATION, "");
}

export type StoreActions = ReturnType<
  | typeof emailVerificationRequest
  | typeof emailVerificationSuccess
  | typeof emailVerificationFailure
  | typeof emailVerificationClear
  | typeof emailVerificationCodeRequest
  | typeof emailVerificationCodeSuccess
  | typeof emailVerificationCodeFailure
  | typeof emailVerificationCodeClear
  | typeof resendEmailVerificationCodeRequest
  | typeof resendEmailVerificationCodeSuccess
  | typeof resendEmailVerificationCodeFailure
  | typeof resendEmailVerificationCodeClear
  | typeof signupRequest
  | typeof signupSuccess
  | typeof signupFailure
  | typeof signupClear
  | typeof revertEmailVerifications
>;
