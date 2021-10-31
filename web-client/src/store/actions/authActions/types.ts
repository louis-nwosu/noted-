export interface Auth {
  authInit: string;
  authSuccess: string;
  authfailure: string;
}

export interface AuthAction {
  type: string;
  payload?: {
    data: any;
  };
}

export interface User {
  fullName: string;
  createdAt: string;
  id: string;
  isLaoding: boolean;
  hasError: boolean;
}

export interface Payload {
  fullName?: string;
  eMail: string;
  password: string;
}
