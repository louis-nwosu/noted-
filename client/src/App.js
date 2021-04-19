import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

//materialUI imports
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import {darkBlack, White, indigo700, redA200} from "@material-ui/core/colors";

//import local components
import LandingPage from "./components/landingPage";
import Log from "./components/loginAndSignin";
import NoteApp from "./components/app";

const theme = createMuiTheme({
   palette: {
    textColor: darkBlack,
    primary1Color: white,
    primary2Color: indigo700,
    accent1Color: redA200,
    pickerHeaderColor: darkBlack,
  },
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/sign-up" component={Log} />
            <Route exact path="/noted" component={NoteApp} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

App.propTypes = {};

export default App;
