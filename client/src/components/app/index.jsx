import React from "react";
//import material Ui components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

//import local components
import PrimarySearchAppBar from "./appbar";

//create the style hook
const useStyles = makeStyles({});

const NoteApp = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container style={{ backgroundColor: "pink" }}>
        <Grid item xs={12} md={12}>
          <PrimarySearchAppBar />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default NoteApp;
