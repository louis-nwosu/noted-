import { NotedAction } from "../actions/actionTypes";

interface AuthTypes {
  user: any;
  isLoading: boolean;
  hasError: boolean;
}

const initialAuth: AuthTypes = {
  user: {
    name: "",
    email: "",
  },
  isLoading: false,
  hasError: false,
};

export function authReducer(state = initialAuth, action: any): AuthTypes {
  switch (action.type) {
    //auth actions
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
        user: action.payload.data,
        isLoading: false,
        hasError: false,
      };
    }

    default: {
      return state;
    }
  }
}
