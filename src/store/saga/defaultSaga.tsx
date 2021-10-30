import { AxiosResponse } from "axios";
import { put, call, throttle } from "redux-saga/effects";
import { setItemToLocalStorage } from "../../utils/storage";
import {
  emailVerificationSuccess,
  StoreActions,
  emailVerificationFailure,
  emailVerificationCodeSuccess,
  emailVerificationCodeFailure,
  resendEmailVerificationCodeSuccess,
  resendEmailVerificationCodeFailure,
  signupSuccess,
  signupFailure,
} from "../actions";
import {
  resendEmailCode,
  signUp,
  verifyEmailAPI,
  verifyEmailCode,
} from "../api";
import {
  EMAIL_VERIFICATION_CODE_REQUEST,
  EMAIL_VERIFICATION_REQUEST,
  RESEND_EMAIL_VERIFICATION_CODE_REQUEST,
  SIGN_UP_REQUEST,
} from "../constants";
import {
  ResendEmailCodePayload,
  Results,
  SignUpPayLoad,
  VerifyEmailCodePayload,
  VerifyEmailPayload,
  ApiResponse,
  SignupSuccessResponse,
} from "../models";

function* verifyEmailSaga(action: StoreActions) {
  try {
    const response: AxiosResponse = yield call(
      verifyEmailAPI,
      action.payload as VerifyEmailPayload
    );

    if (response.status === 200) {
      let data = response.data as ApiResponse;
      let responseData: Results = data.results ? data.results : data.messageObj;
      if (data.success) {
        setItemToLocalStorage("token", responseData.token.toString());
        yield put(emailVerificationSuccess(responseData.isLogin));
      } else {
        yield put(emailVerificationFailure());
      }
    } else {
      yield put(emailVerificationFailure());
    }
  } catch (err) {
    yield put(emailVerificationFailure());
    console.log(err);
  }
}

function* verifyEmailCodeSaga(action: StoreActions) {
  try {
    const response: AxiosResponse = yield call(
      verifyEmailCode,
      action.payload as VerifyEmailCodePayload
    );
    if (response.status === 200) {
      let data = response.data as ApiResponse;
      let responseData: Results = data.results ? data.results : data.messageObj;
      if (data.success) {
        const data: SignupSuccessResponse = {
          isLogin: responseData.isLogin,
          userDetails: responseData.user ? responseData.user : null,
        };
        yield put(emailVerificationCodeSuccess(data));
      } else {
        yield put(
          emailVerificationCodeFailure(responseData.wrongEmailTokenCount)
        );
      }
    } else {
      yield put(emailVerificationCodeFailure(0));
    }
  } catch (err) {
    yield put(emailVerificationCodeFailure(0));
    console.log(err);
  }
}

function* resendEmailCodeSaga(action: StoreActions) {
  try {
    const response: AxiosResponse = yield call(
      resendEmailCode,
      action.payload as ResendEmailCodePayload
    );
    if (response.status === 200) {
      let data = response.data as ApiResponse;
      let responseData: Results = data.results ? data.results : data.messageObj;
      if (data.success) {
        yield put(
          resendEmailVerificationCodeSuccess(responseData.resendEmailTokenCount)
        );
      } else {
        yield put(resendEmailVerificationCodeFailure());
      }
    } else {
      yield put(resendEmailVerificationCodeFailure());
    }
  } catch (err) {
    yield put(resendEmailVerificationCodeFailure());
    console.log(err);
  }
}

function* signupSaga(action: StoreActions) {
  try {
    const response: AxiosResponse = yield call(
      signUp,
      action.payload as SignUpPayLoad
    );
    if (response.status === 200) {
      let data = response.data as ApiResponse;
      let responseData: Results = data.results ? data.results : data.messageObj;
      if (data.success) {
        const data: SignupSuccessResponse = {
          isLogin: responseData.user ? true : false,
          userDetails: responseData.user ? responseData.user : null,
        };
        yield put(signupSuccess(data));
      } else {
        yield put(signupFailure());
      }
    } else {
      yield put(signupFailure());
    }
  } catch (err) {
    yield put(signupFailure());
    console.log(err);
  }
}

export default function* defaultSaga() {
  yield throttle(5000, EMAIL_VERIFICATION_REQUEST, verifyEmailSaga);
  yield throttle(5000, EMAIL_VERIFICATION_CODE_REQUEST, verifyEmailCodeSaga);
  yield throttle(
    5000,
    RESEND_EMAIL_VERIFICATION_CODE_REQUEST,
    resendEmailCodeSaga
  );
  yield throttle(5000, SIGN_UP_REQUEST, signupSaga);
}
