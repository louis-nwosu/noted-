import React from "react";
//import material UI components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
//import local components
import NavBar from "./navBar";
import SideNav from "./drawer";

const useStyles = makeStyles({
  appbar: {
    position: "fixed",
    width: '100%'
  },
  sideNav: {
    width: '100%',
    height: '90vh',
    marginTop: '10vh',
  }
});

export default function NoteApp() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container>
        <Grid item md={12} xs={12} className={classes.appbar} >
          <NavBar />
        </Grid>
        <Grid item md={2} className={classes.sideNav} >
          <SideNav />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
