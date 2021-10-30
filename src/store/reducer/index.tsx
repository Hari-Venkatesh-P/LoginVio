import { combineReducers } from "redux";

import defaultReducer from "./defaultReducer";

const reducers = {
  data: defaultReducer,
};

export const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;
