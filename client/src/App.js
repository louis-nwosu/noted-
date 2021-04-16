import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

//materialUI imports
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

//import local components
import LandingPage from "./components/landingPage";
import Log from "./components/loginAndSignin";

const theme = createMuiTheme({
  palette: {
    secondary: purple,
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
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

App.propTypes = {};

export default App;
