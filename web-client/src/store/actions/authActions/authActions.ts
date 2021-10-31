import { Dispatch } from "redux";

import { authActions } from "./authActionTypes";
import { AuthAction } from "./types";
import { unauthenticatedApi } from "../../../api";
import { Payload } from "./types";
import { VariantType } from "notistack";

const authInit = (): AuthAction => ({
  type: authActions.authInit,
});

const authFailure = (): AuthAction => ({
  type: authActions.authfailure,
});

// TODO: define a type for the data payload
const authSuccess = (data: any): AuthAction => ({
  type: authActions.authSuccess,
  payload: {
    data,
  },
});

// TODO: define a type for the data payload
export const AuthActionCreator = (
  payload: Payload,
  authType: string,
  nav: any,
  notification?: (msg: string, variant: VariantType) => void
) => {
  return async (dispatch: Dispatch) => {
    let data: any;
    dispatch(authInit());
    try {
      switch (authType) {
        case "sign-in": {
          data = await unauthenticatedApi.post("/log-in", payload);
          if (!data.data.error) {
            dispatch(authSuccess(data));
            localStorage.setItem("noted-l300-key", data.data.token);
            nav.push("/dashboard");
            console.log(data);
            return;
          }
          if (notification) notification(data.data.error, "error");
          break;
        }
        case "sign-up": {
          data = await unauthenticatedApi.post("/sign-up", payload);
          if (!data.data.error) {
            dispatch(authSuccess(data));
            nav.push("/dashboard");
            return;
          }
          if (notification) notification(data.data.error, "error");
          break;
        }
        default: {
          return;
        }
      }
    } catch (err: unknown) {
      dispatch(authFailure());
      if (notification) notification("oops, something went wrong", "error");
      console.log(err, data);
    }
  };
};
