import {actions} from './actions';

const defaultState = {
  user: null,
  notes: null,
  isLoading: false,
  hasError: false,
};

const Store = (state = defaultState, action) => {
  switch (action.type) {
    //handle cases for log in
    case actions.actionLoginActions.submitForm:
      return {
        ...state,
        isLoading: true,
      };
    case actions.actionLoginActions?.submitFormSuccess:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case actions.actionLoginActions?.submitFormFailure:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };

    //handle fdetching all docs
    case actions.fetchDoc?.getDocs:
      return {
        ...state,
        isLoading: true,
      };
    case actions.fetchDoc?.getDocsSuccess:
      return {
        ...state,
        notes: action.payload,
        isLoading: false,
      };
    case actions.fetchDoc?.getDocsFailure:
      return {
        ...state,
        hasError: true,
        isLoading: false,
      };

    //handle posting and retrieving new documents
    case actions.postDoc?.postDocs:
      return {
        ...state,
        isLoading: true,
      };
    case actions.postDoc?.postDocsSuccess:
      return {
        ...state,
        notes: action.payload,
        isLoading: false,
        hasError: false,
      };
    case actions.postDoc?.postDocsFailure:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };

    //handle actions for creating new account
    case actions.createAccount?.submitForm:
      return {
        ...state,
        isLoading: true,
      };
    case actions.createAccount?.submitFormSuccess:
      return {
        ...state,
        user: action.payload,
        isLaoding: false,
        hasError: false,
      };
    case actions.createAccount?.submitFormFailure:
      return {
        ...state,
        isLAoding: false,
        hasError: true,
      };

    //case for default state
    default:
      return state;
  }
};

export default Store;
