import { all, fork } from "redux-saga/effects";

import defaultSaga from "./defaultSaga";

export default function* rootSaga() {
  yield all([
    fork(defaultSaga)
  ]);
}
