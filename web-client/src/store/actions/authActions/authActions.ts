import { Dispatch } from "redux";

import { authActions } from "./authActionTypes";
import { AuthAction } from "./types";
import { unauthenticatedApi } from "../../../api";
import { Payload } from "./types";

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
  notification?: (msg: string) => void
) => {
  return async (dispatch: Dispatch) => {
    let data: any;
    dispatch(authInit());
    try {
      switch (authType) {
        case "sign-in": {
          //TODO: change 'fetch' to axios package
          data = await unauthenticatedApi.post("/log-in", payload);
          if (!data.error) {
            dispatch(authSuccess(data));
            nav.push("/dashboard");
            console.log(data);
          }
          // notification(data.error);
          break;
        }
        case "sign-up": {
          //TODO: change 'fetch' to axios package
          data = await unauthenticatedApi.post("/sign-up", payload);
          if (!data.error) {
            dispatch(authSuccess(data));
            nav.push("/dashboard");
            console.log(data);
          }
          // notification(data.error);
          break;
        }
        default: {
          return;
        }
      }
    } catch (err) {
      dispatch(authFailure());
      // notification("oops, something wen't wrong!");
    }
  };
};
