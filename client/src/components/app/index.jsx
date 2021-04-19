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
const useStyles = makeStyles((theme) => ({
  sidenav: {
    height: "90vh",
    marginTop: 63,
    backgroundColor: "#333",
    position: "fixed",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const NoteApp = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Grid item md={12} xs={12}>
          <PrimarySearchAppBar />
        </Grid>
      </Grid>
      <Grid container>
        <Grid container md={2} xs={12} className={classes.sidenav}>
          <SideNav />
        </Grid>
        <Grid
          container
          md={10}
          xs={12}
          style={{ backgroundColor: "red", marginLeft: "auto", marginTop: 100 }}
        >
          <h1>test</h1>
        </Grid>
        <Grid
          container
          md={10}
          xs={12}
          style={{ backgroundColor: "red", marginLeft: "auto", marginTop: 100 }}
        >
          <h1>test</h1>
        </Grid>
        <Grid
          container
          md={10}
          xs={12}
          style={{ backgroundColor: "red", marginLeft: "auto", marginTop: 100 }}
        >
          <h1>test</h1>
        </Grid>
        <Grid
          container
          md={10}
          xs={12}
          style={{ backgroundColor: "red", marginLeft: "auto", marginTop: 100 }}
        >
          <h1>test</h1>
        </Grid>
      </Grid>
    </div>
  );
};

export default NoteApp;
