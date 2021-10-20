import { User } from "../actions/authActions/types";
import { authActions } from "../actions/authActions/authActionTypes";

const initUserState: User = {
  createdAt: "",
  firstname: "",
  id: "",
  lastname: "",
  isLaoding: false,
  hasError: false,
};

export const userReducer = (state = initUserState, action: any): User => {
  switch (action.type) {
    case authActions.loginIn.signInInit: {
      return {
        ...state,
        isLaoding: true,
        hasError: false,
      };
    }

    case authActions.loginIn.signInSuccess: {
      const { createdAt, firstname, id, lastname } = action.payload;
      return {
        ...state,
        isLaoding: false,
        hasError: false,
        createdAt,
        firstname,
        lastname,
        id,
      };
    }

    case authActions.loginIn.signInFailure: {
      return {
        ...state,
        isLaoding: false,
        hasError: true,
      };
    }

    case authActions.signUp.signUpInit: {
      return {
        ...state,
        isLaoding: true,
        hasError: false,
      };
    }

    case authActions.signUp.signUpSuccess: {
      const { createdAt, firstname, id, lastname } = action.payload;
      return {
        ...state,
        isLaoding: false,
        hasError: false,
        createdAt,
        firstname,
        lastname,
        id,
      };
    }

    case authActions.signUp.signUpFailure: {
      return {
        ...state,
        isLaoding: true,
        hasError: false,
      };
    }

    default: {
      return state;
    }
  }
};
