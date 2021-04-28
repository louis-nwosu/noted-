import React from "react";
//import material Ui components
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

//import local components
import PrimarySearchAppBar from "./appbar";
import SideNav from "./sidenav";
import DisplayNotes from "./displayNotes";

//create the style hook
const useStyles = makeStyles((theme) => ({
  sidenav: {
    height: "90vh",
    marginTop: 63,
    width: "90%",
    backgroundColor: "#333",
    position: "fixed",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mainCont: {
    marginLeft: "auto",
    height: "100vh",
    width: "100%",
    overflowY: "scroll",
    backgroundColor: "#444",
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
        <Grid item md={2} xs={12} className={classes.sidenav}>
          <SideNav />
        </Grid>
        <Grid item md={10} xs={12} className={classes.mainCont}>
          <Box marginTop={7}>
            <DisplayNotes />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default NoteApp;
