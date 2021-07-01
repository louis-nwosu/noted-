import React from "react";

//import the router
import { Route, Switch, BrowserRouter } from "react-router-dom";

//materialUI imports
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

//import local components
import LandingPage from "./components/landingPage";
import Log from "./components/loginAndSignin";
import NoteApp from "./components/app";
import TextEditor from "./components/app/textEditor";

//import snackbar provider
import { SnackbarProvider } from "notistack";

const themeLight = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#aa00ff",
      light: "#e254ff",
      dark: "#7200ca",
    },
    secondary: {
      main: "#424242",
      light: "#6d6d6d",
      dark: "#1b1b1b",
    },
  },
  typography: {
    fontFamily: ["'Cabin'", "sans-serif", "Open Sans"].join(","),
  },
});

const themeDark = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#410f61",
      light: "#e254ff",
      dark: "#7200ca",
    },
    secondary: {
      main: "#424242",
      light: "#6d6d6d",
      dark: "#1b1b1b",
    },
  },
});

const App = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const handleSetIsDarkMode = (mode) => setIsDarkMode(mode);
  return (
    <>
      <ThemeProvider theme={isDarkMode ? themeLight : themeDark}>
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter>
            <CssBaseline />
            <Switch>
              <Route exact path="/">
                <LandingPage />
              </Route>
              <Route exact path="/sign-up" component={Log} />
              <Route exact path="/noted">
                <NoteApp handleSetIsDarkMode={handleSetIsDarkMode} />
              </Route>
              <Route exact path="/noted/new-note">
                <TextEditor />
              </Route>
            </Switch>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
