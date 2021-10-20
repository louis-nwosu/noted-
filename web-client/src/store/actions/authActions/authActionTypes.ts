import { Auth } from "./types";

export const authActions: Auth = {
  loginIn: {
    signInInit: "noted/signin-init",
    signInSuccess: "noted/signin-success",
    signInFailure: "noted/signin-failure",
  },
  signUp: {
    signUpInit: "noted/signUp-init",
    signUpSuccess: "noted/signUp-success",
    signUpFailure: "noted/signUp-failure",
  },
};
