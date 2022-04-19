import { env } from "process";
import { Dispatch } from "redux";

import { UnauthenticatedNotedAPI } from "../../../api/instance";
import { ActionTypes, authPayload } from "../../types";
import { NotedAction } from "../actionTypes";

interface ResSuccessType {
  username: string;
  eMail: string;
  password: string;
}

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

export function signUp(payload: authPayload, snackbar: (text: string) => void) {
  return async (dispatch: Dispatch) => {
    dispatch(init());
    try {
      const data = await UnauthenticatedNotedAPI.post<any>("/sign-up", payload);
      console.log(data)
      if (data.data.error) {
        snackbar(data.data.error);
        dispatch(fail());
        console.log(data.data.error);
        return;
      }
      localStorage.setItem("noted/v2-token", data.data.token);
      dispatch(success(data.data));
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
