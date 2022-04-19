export interface ActionTypes {
  type: string;
  payload?: any;
}

export interface Actions {
  init: string;
  success: string;
  fail: string;
}

export interface authPayload {
  email?: string;
  username: string;
  password: string;
}

export interface AuthTypes {
  user: any;
  isLoading: boolean;
  hasError: boolean;
}

export interface StateTypes {
  auth: AuthTypes;
}
