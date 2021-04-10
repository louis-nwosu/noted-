import React from "react";
import PropTypes from "prop-types";
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

const useStyles = makeStyles({});
const theme = createMuiTheme({
  palette: {
    secondary: purple,
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      
    </ThemeProvider>
  );
};

App.propTypes = {};

export default App;
