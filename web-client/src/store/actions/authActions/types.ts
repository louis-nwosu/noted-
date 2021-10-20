export interface Auth {
  loginIn: {
    signInInit: string;
    signInSuccess: string;
    signInFailure: string;
  };
  signUp: {
    signUpInit: string;
    signUpSuccess: string;
    signUpFailure: string;
  };
}

export interface AuthAction {
  type: string;
  payload?: {
    data: any;
  };
}

export interface User {
  firstname: string;
  lastname: string;
  createdAt: string;
  id: string;
  isLaoding: boolean;
  hasError: boolean;
}
