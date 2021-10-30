import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import defaultReducer from "./reducer/defaultReducer";
import defaultSaga from "./saga/defaultSaga";


const sagaMiddleware = createSagaMiddleware();

const Store = createStore(
  defaultReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(defaultSaga);

export default Store;
