import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

//materialUI imports
import {createMuiTheme, ThemeProvider} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

//import local components
import LandingPage from './components/landingPage';
import Log from './components/loginAndSignin';
import NoteApp from './components/app';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#6200EE',
    },
  },
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
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
