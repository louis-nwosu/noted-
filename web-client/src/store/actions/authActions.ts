import { Dispatch } from "redux";

import { ActionTypes, authPayload } from "./types";
import { NotedAction } from "./actionTypes";

const init = (): ActionTypes => ({
  type: NotedAction.auth.init,
});

const fail = (): ActionTypes => ({
  type: NotedAction.auth.fail,
});

const success = (data: any): ActionTypes => ({
  type: NotedAction.auth.success,
  payload: data,
});

export function signUp(payload: authPayload) {
  return async (dispatch: Dispatch) => {
    dispatch(init());
    try {
      //do your thing
    } catch (error) {
      dispatch(fail());
    }
  };
}

export function signIn(payload: authPayload) {
  return async (dispatch: Dispatch) => {
    dispatch(init());
    try {
      //do your thing
    } catch (error) {
      dispatch(fail());
    }
  };
}
