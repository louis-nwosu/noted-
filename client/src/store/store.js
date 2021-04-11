import { actions } from "./actions";

const defaultState = {
  user: {},
  notes: [],
  isLoading: false,
  hasError: false,
};

const Store = (state = defaultState, action) => {
  switch (action.type) {
    case actions.actionCreateActions.submitForm:
      return {
        ...state,
        isloading: true,
        hasError: false,
      };
    case actions.actionCreateActions.submitFormSuccess:
      return {
        ...state,
        user: action.payload,
      };
    case actions.actionCreateActions.submitFormFailure:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    default:
      return state;
  }
};

export default Store;
