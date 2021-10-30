import apiCall from "../../utils/api";
import {
  ResendEmailCodePayload,
  SignUpPayLoad,
  VerifyEmailCodePayload,
  VerifyEmailPayload,
} from "../models";

export function verifyEmailAPI(data: VerifyEmailPayload) {
  return apiCall("/users/email", "POST", null, data, null);
}

export function verifyEmailCode(data: VerifyEmailCodePayload) {
  return apiCall("/users/email/verify", "PUT", null, data, null);
}

export function resendEmailCode(data: ResendEmailCodePayload) {
  return apiCall("/users/token/resendtoken", "PUT", null, data, null);
}

export function signUp(data: SignUpPayLoad) {
  return apiCall("/users", "POST", null, data, null);
}
