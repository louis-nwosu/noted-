import React from "react";
//import material UI components
import Grid from "@material-ui/core/Grid";
import { makeStyles, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import Zoom from "@material-ui/core/Zoom";
//import local components
import NavBar from "./navBar";
import { SideNav, TemporaryDrawer } from "./drawer";
import DocPad from "./docPad";
//import Link component from react-router-dom
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appbar: {
    position: "fixed",
    width: "100%",
  },
  sideNav: {
    width: "100%",
    height: "90vh",
    marginTop: "10vh",
    position: "fixed",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  FABroot: {
    "& > *": {
      margin: theme.spacing(1),
      position: "fixed",
      bottom: 30,
      right: 20,
      backgroundColor: "#aa00ff",
    },
  },
  FAB1: {
    "& > *": {
      margin: theme.spacing(1),
      position: "fixed",
      bottom: 110,
      right: 20,
      display: "none",
    },
  },
  FAB1Show: {
    "& > *": {
      margin: theme.spacing(1),
      position: "fixed",
      bottom: 110,
      right: 20,
    },
  },
  FAB2: {
    "& > *": {
      margin: theme.spacing(1),
      position: "fixed",
      bottom: 30,
      right: 110,
      display: "none",
    },
  },
  DocDisps: {
    marginTop: theme.spacing(2),
  },
  FAB2Show: {
    "& > *": {
      margin: theme.spacing(1),
      position: "fixed",
      bottom: 30,
      right: 110,
    },
  },
  GridSec: {
    marginBottom: 25
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  dispContainer: {
    marginLeft: "auto",
    marginTop: 10,
  },
}));

export default function NoteApp({ handleSetIsDarkMode }) {
  const classes = useStyles();

  const [navState, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...navState, [anchor]: open });
  };
  const [isIconHidden, setIsIconHidden] = React.useState(true);
  const showHiddenIcons = () => setIsIconHidden(!isIconHidden);
  return (
    <React.Fragment>
      <Grid
        container
        onClick={() => {
          if (isIconHidden === true) return;
          setIsIconHidden(true);
        }}
      >
        <Grid item md={12} xs={12} className={classes.appbar}>
          <NavBar toggleDrawer={toggleDrawer} anchor="left" />
        </Grid>
        <Grid item md={2} className={classes.sideNav}>
          <SideNav handleSetIsDarkMode={handleSetIsDarkMode} />
          <TemporaryDrawer toggleDrawer={toggleDrawer} state={navState} />
        </Grid>
        <Grid item md={10} xs={12} className={classes.dispContainer}>
          <Box mt={8} mb={3} marginX={1}>
            <Grid container>
              <Grid item md={12} xs={12}>
                <Box px={1} py={1} pb={2}>
                  <Typography variant="h4" color="#fff" align="right">
                    all docs
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container className={classes.DocDisps}>
              <Grid item md={12} xs={12} className={classes.GridSec}>
                <Grid container>
                  <Grid item>
                    <Box mx={1}>
                      <Typography variant="body1" color="TextSecondary">
                        Today
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container>
                  {[2, 2, 2, 2, 2, 2].map((item) => {
                    return (
                      <Grid item md={3} xs={12}>
                        <DocPad />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item md={12} xs={12} className={classes.GridSec}>
                <Grid container>
                  <Grid item>
                    <Box mx={1}>
                      <Typography variant="body1" color="TextSecondary">
                        11-06-2021
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container>
                  {[2, 2, 2, 2, 2, 2,2,3,4].map((item) => {
                    return (
                      <Grid item md={3} xs={12}>
                        <DocPad />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
            <div className={classes.FABroot}>
              <Fab color="primary" aria-label="add" onClick={showHiddenIcons}>
                <AddIcon />
              </Fab>
            </div>
            <div className={isIconHidden ? classes.FAB1 : classes.FAB1Show}>
              <Zoom in={!isIconHidden}>
                <Link to="/noted/new-note">
                  <Fab color="primary" aria-label="edit">
                    <EditIcon />
                  </Fab>
                </Link>
              </Zoom>
            </div>
            <div className={isIconHidden ? classes.FAB2 : classes.FAB2Show}>
              <Zoom
                in={!isIconHidden}
                style={{ transitionDelay: !isIconHidden ? "100ms" : "0ms" }}
              >
                <Fab color="primary" aria-label="edit">
                  <CollectionsBookmarkIcon />
                </Fab>
              </Zoom>
            </div>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
