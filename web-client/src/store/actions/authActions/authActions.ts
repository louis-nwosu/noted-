import { Dispatch } from "redux";

import { authActions } from "./authActionTypes";
import { AuthAction } from "./types";

const loginInit = (): AuthAction => ({
  type: authActions.loginIn.signInInit,
});

const loginFailure = (): AuthAction => ({
  type: authActions.loginIn.signInFailure,
});

// TODO: define a type for the data payload
const loginSuccess = (data: any): AuthAction => ({
  type: authActions.loginIn.signInSuccess,
  payload: {
    data,
  },
});

export const signIn = (payload: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(loginInit());
    try {
      //TODO: axios client to make the API call
    } catch (err) {
      console.log(err);
      dispatch(loginFailure());
    }
  };
};

const signUpInit = (): AuthAction => ({
  type: authActions.signUp.signUpInit,
});

const signUpSuccess = (data: any): AuthAction => ({
  type: authActions.signUp.signUpSuccess,
  payload: {
    data,
  },
});

const signUpFailure = (): AuthAction => ({
  type: authActions.signUp.signUpFailure,
});

export const signUp = (payload: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(signUpInit());
    try {
      // TODO: async call to server
    } catch (error) {
      console.log(error);
      dispatch(signUpFailure());
    }
  };
};
