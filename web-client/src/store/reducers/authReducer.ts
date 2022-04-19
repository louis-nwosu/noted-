import { NotedAction } from "../actions/actionTypes";
import { AuthTypes } from "../types";

const initialAuth: AuthTypes = {
  user: {
    name: "",
    email: "",
    password: "",
  },
  isLoading: false,
  hasError: false,
};

export function authReducer(state = initialAuth, action: any): AuthTypes {
  switch (action.type) {
    case NotedAction.auth.init: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    }
    case NotedAction.auth.fail: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    case NotedAction.auth.success: {
      return {
        ...state,
        user: action.payload.savedUser,
        isLoading: false,
        hasError: false,
      };
    }

    default: {
      return state;
    }
  }
}
