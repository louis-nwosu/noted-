import { combineReducers } from "redux";

import { authReducer } from "./authReducer";

const combineducerObj = { auth: authReducer };
export const rootReducer = combineReducers(combineducerObj);
