import { actions } from "./actions";

const defaultState = {
  user: {},
  notes: [],
  isLoading: false,
  hasError: false,
};

const Store = (state = defaultState, action) => {
  switch (action) {
    case actions.actionCreateActions.submitForm:
      return {
        ...state,
        isloading: true,
        hasError: false,
      };
      break;
    case actions.actionCreateActions.submitFormSuccess:
      return {
        ...state,
        user: action.payload,
      };
      break;
    case actions.actionCreateActions.submitFormFailure:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    default:
      break;
  }
};
