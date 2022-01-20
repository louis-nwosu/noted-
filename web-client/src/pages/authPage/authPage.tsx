import { FC, Fragment, useState } from "react";

import Container from "@mui/material/Container";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";

import { LandingPageLayout } from "../../layouts/landingPageLayout";
import { SignUp, SignIn } from "./components/";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: theme.spacing(6, 0),
    },
    formTop: {
      width: "50%",
      margin: "0 auto",
    },
  })
);

export const AuthPage: FC = () => {
  const classes = useStyles();
  const [signInShow, setSignInShow] = useState(true);
  const handleSignInShow = () => setSignInShow(!signInShow);
  return (
    <Fragment>
      <LandingPageLayout hasFooter={false} />
      <Container maxWidth="sm" className={classes.container}>
        {signInShow ? (
          <SignIn switchComp={handleSignInShow} />
        ) : (
          <SignUp switchComp={handleSignInShow} />
        )}
      </Container>
    </Fragment>
  );
};

export { AuthPage as default };
