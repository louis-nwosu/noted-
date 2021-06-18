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
//import Link component from react-router-dom
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appbar: {
    position: "fixed",
    width: "100%",
  },
  docPad: {
    background: "#aa00ff",
    "&:hover": {
      backgroundColor: "#7200ca",
    },
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
          <Box marginY={8} marginX={1}>
            <Grid container>
              <Grid item md={12} xs={12}>
                <Box px={1}>
                  <Typography variant="h4" color="#fff" align="right">
                    All not3s.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container className={classes.DocDisps}>
              <Grid item md={3} xs={12}>
                <Box px={1} marginY={1}>
                  <div className={classes.docPad}>
                    <Box boxShadow={3} px={2} py={1}>
                      <h1 style={{ color: "#fff" }}>testing</h1>
                      <p style={{ marginTop: 7, color: "#fff" }}>
                        lorem lorem lorem lorem lorem lorem lorem lorem lorem
                        lorem lorem lorem lorem lorem lorem lorem lorem lorem
                        lorem ...
                      </p>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        align="right"
                      >
                        Last modified: 21-03-21
                      </Typography>
                    </Box>
                  </div>
                </Box>
              </Grid>
              <Grid item md={3} xs={12}>
                <Box px={1} marginY={1}>
                  <div className={classes.docPad}>
                    <Box boxShadow={3} px={2} py={1}>
                      <h1 style={{ color: "#fff" }}>testing</h1>
                      <p style={{ marginTop: 7, color: "#fff" }}>
                        lorem lorem lorem lorem lorem lorem lorem lorem lorem
                        lorem lorem lorem lorem lorem lorem lorem lorem lorem
                        lorem ...
                      </p>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        align="right"
                      >
                        Last modified: 21-03-21
                      </Typography>
                    </Box>
                  </div>
                </Box>
              </Grid>
              <Grid item md={3} xs={12}>
                <Box px={1} marginY={1}>
                  <div className={classes.docPad}>
                    <Box boxShadow={3} px={2} py={1}>
                      <h1 style={{ color: "#fff" }}>testing</h1>
                      <p style={{ marginTop: 7, color: "#fff" }}>
                        lorem lorem lorem lorem lorem lorem lorem lorem lorem
                        lorem lorem lorem lorem lorem lorem lorem lorem lorem
                        lorem ...
                      </p>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        align="right"
                      >
                        Last modified: 21-03-21
                      </Typography>
                    </Box>
                  </div>
                </Box>
              </Grid>
              <Grid item md={3} xs={12}>
                <Box px={1} marginY={1}>
                  <div className={classes.docPad}>
                    <Box boxShadow={3} px={2} py={1}>
                      <h1 style={{ color: "#fff" }}>testing</h1>
                      <p style={{ marginTop: 7, color: "#fff" }}>
                        lorem lorem lorem lorem lorem lorem lorem lorem lorem
                        lorem lorem lorem lorem lorem lorem lorem lorem lorem
                        lorem ...
                      </p>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        align="right"
                      >
                        Last modified: 21-03-21
                      </Typography>
                    </Box>
                  </div>
                </Box>
              </Grid>
              <Grid item md={3} xs={12}>
                <Box px={1} marginY={1}>
                  <div className={classes.docPad}>
                    <Box boxShadow={3} px={2} py={1}>
                      <h1 style={{ color: "#fff" }}>testing</h1>
                      <p style={{ marginTop: 7, color: "#fff" }}>
                        lorem lorem lorem lorem lorem lorem lorem lorem lorem
                        lorem lorem lorem lorem lorem lorem lorem lorem lorem
                        lorem ...
                      </p>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        align="right"
                      >
                        Last modified: 21-03-21
                      </Typography>
                    </Box>
                  </div>
                </Box>
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
                  <Fab color="secondary" aria-label="edit">
                    <EditIcon />
                  </Fab>
                </Link>
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
