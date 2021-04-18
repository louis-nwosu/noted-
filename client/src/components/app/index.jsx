import React from "react";
//import material Ui components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

//import local components
import PrimarySearchAppBar from "./appbar";
import SideNav from "./sidenav";

//create the style hook
const useStyles = makeStyles({
  sidebar: {
    backgroundColor: "pink",
    height: "90vh",
    display: "fixed",
  },
});

const NoteApp = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} md={12}>
          <PrimarySearchAppBar />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={2} className={classes.sidebar}>
          <SideNav />
        </Grid>
        <Grid item md={10} style={{ backgroundColor: "green" }}>
          <SideNav />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default NoteApp;
