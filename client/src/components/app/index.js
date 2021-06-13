import React from "react";
//import material UI components
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import Zoom from "@material-ui/core/Zoom";
//import local components
import NavBar from "./navBar";
import { SideNav, TemporaryDrawer } from "./drawer";

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
      right: 25,
    },
  },
  FAB1: {
    "& > *": {
      margin: theme.spacing(1),
      position: "fixed",
      bottom: 110,
      right: 25,
      display: "none",
    },
  },
  FAB1Show: {
    "& > *": {
      margin: theme.spacing(1),
      position: "fixed",
      bottom: 110,
      right: 25,
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
  FAB2Show: {
    "& > *": {
      margin: theme.spacing(1),
      position: "fixed",
      bottom: 30,
      right: 110,
    },
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
          if (isIconHidden == true) return;
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
          <Box marginY={10} marginX={1}>
            <h1 style={{ padding: 20, background: "teal" }}>testing</h1>
            <div className={classes.FABroot}>
              <Fab color="primary" aria-label="add" onClick={showHiddenIcons}>
                <AddIcon />
              </Fab>
            </div>
            <div className={isIconHidden ? classes.FAB1 : classes.FAB1Show}>
              <Zoom in={!isIconHidden}>
                <Fab color="secondary" aria-label="edit">
                  <EditIcon />
                </Fab>
              </Zoom>
            </div>
            <div className={isIconHidden ? classes.FAB2 : classes.FAB2Show}>
              <Zoom
                in={!isIconHidden}
                style={{ transitionDelay: !isIconHidden ? "500ms" : "0ms" }}
              >
                <Fab color="secondary" aria-label="edit">
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
