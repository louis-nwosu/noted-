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
