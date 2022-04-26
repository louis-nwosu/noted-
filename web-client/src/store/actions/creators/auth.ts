import { VariantType } from "notistack";
import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";

import { UnauthenticatedNotedAPI } from "../../../api/instance";
import { ActionTypes, authPayload } from "../../types";
import { NotedAction } from "../actionTypes";

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

export function signUp(
  payload: authPayload,
  snackbar: (text: string, snackType: VariantType) => void,
  navigate: NavigateFunction
) {
  return async (dispatch: Dispatch) => {
    dispatch(init());
    try {
      const data = await UnauthenticatedNotedAPI.post("/sign-up", payload);
      if (data.data.error) {
        snackbar(data.data.error, "error");
        dispatch(fail());
        return;
      }
      localStorage.setItem("noted/v2-token", data.data.token);
      dispatch(success(data.data));
      navigate("/app/");
    } catch (error) {
      dispatch(fail());
      snackbar("an unexpected error ocurred!!", "error");
    }
  };
}

export function signIn(
  payload: authPayload,
  snackbar: (text: string, snackType: VariantType) => void,
  navigate: NavigateFunction
) {
  return async (dispatch: Dispatch) => {
    dispatch(init());
    console.log(payload)
    try {
      const data = await UnauthenticatedNotedAPI.post("log-in", payload);
      console.log(data);
      if (data.data.error) {
        snackbar(data.data.error, "error");
        dispatch(fail());
        return;
      }
      localStorage.setItem("noted/v2-token", data.data.token);
      dispatch(success(data.data.user));
      navigate("/app/");
    } catch (error) {
      dispatch(fail());
      snackbar("an unexpected error ocurred!!", "error");
    }
  };
}
