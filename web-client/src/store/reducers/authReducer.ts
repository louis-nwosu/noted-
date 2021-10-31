import { User } from "../actions/authActions/types";
import { authActions } from "../actions/authActions/authActionTypes";

const initUserState: User = {
  createdAt: "",
  fullName: "",
  id: "",
  isLaoding: false,
  hasError: false,
};

export const authReducer = (state = initUserState, action: any): User => {
  switch (action.type) {
    case authActions.authInit: {
      return {
        ...state,
        isLaoding: true,
        hasError: false,
      };
    }

    case authActions.authSuccess: {
      const { createdAt, fullName, id } = action.payload;
      return {
        ...state,
        isLaoding: false,
        hasError: false,
        createdAt,
        fullName,
        id,
      };
    }

    case authActions.authfailure: {
      return {
        ...state,
        isLaoding: false,
        hasError: true,
      };
    }

    default: {
      return state;
    }
  }
};
