import React, { FC, useState, Fragment } from "react";

import { SignInPage } from "./signIn";
import { SignUpPage } from "./signUp";

export const AuthPage: FC = () => {
  const [signInShow, setSignInShow] = useState<boolean>(true);
  const handleChangePage = () => setSignInShow(!signInShow);

  return (
    <Fragment>
      {signInShow ? (
        <SignInPage changeView={handleChangePage} />
      ) : (
        <SignUpPage  changeView={handleChangePage} />
      )}
    </Fragment>
  );
};

export { AuthPage as default };
