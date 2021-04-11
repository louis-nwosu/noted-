import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

//materialUI imports
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

//import local components
import LandingPage from "./components/landingPage";

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
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

App.propTypes = {};

export default App;
