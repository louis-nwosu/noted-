import { combineReducers } from "redux";

import { userReducer } from "./userReducer";

const combineducerObj = { user: userReducer };
export const rootReducer = combineReducers(combineducerObj);
