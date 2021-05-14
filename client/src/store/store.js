import { actions } from "./actions";

const defaultState = {
  user: {},
  notes: [],
  isLoading: false,
  hasError: false,
};

const Store = (state = defaultState, action) => {
  switch (action.type) {
    case actions.actionLoginActions.submitForm:
      return {
        isloading: true,
        ...state,
      };
    case actions.actionLoginActions?.submitFormSuccess:
      return {
        user: action.payload,
        isloading: false,
        ...state,
      };
    case actions.actionLoginActions?.submitFormFailure:
      return {
        isLoading: false,
        hasError: true,
        ...state,
      };
    default:
      return state;
  }
};

export default Store;
