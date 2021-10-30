import apiCall from "../../utils/api";
import { API_END_POINTS } from "../../utils/constants";
import {
  ResendEmailCodePayload,
  SignUpPayLoad,
  VerifyEmailCodePayload,
  VerifyEmailPayload,
} from "../models";

export function verifyEmailAPI(data: VerifyEmailPayload) {
  return apiCall(API_END_POINTS.VERIFY_EMAIL, "POST", null, data, null);
}

export function verifyEmailCode(data: VerifyEmailCodePayload) {
  return apiCall(API_END_POINTS.VERIFY_EMAIL_CODE, "PUT", null, data, null);
}

export function resendEmailCode(data: ResendEmailCodePayload) {
  return apiCall(API_END_POINTS.RESEND_EMAIL_CODE, "PUT", null, data, null);
}

export function signUp(data: SignUpPayLoad) {
  return apiCall(API_END_POINTS.SIGN_UP_USER, "POST", null, data, null);
}

export function validateReferalToken(token: string) {
  return apiCall(
    `${API_END_POINTS.VERIFY_REFERRAL_CODE}${token}`,
    "GET",
    null,
    null,
    null
  );
}

export function logoutUserAPI(authCode: string | null, headersMap: any) {
  return apiCall(
    `${API_END_POINTS.LOGOUT_USER}${authCode}`,
    "DELETE",
    null,
    null,
    headersMap
  );
}
