import React from "react";
//import materialUI components
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
//import material UI icons
import Note from "@material-ui/icons/Note";

const useStyles = makeStyles((theme) => ({
  textColor: {
    color: "#fff",
    cursor: "pointer",
  },
}));

const SideNav = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Grid item md={12} xs={12}>
          <Grid container>
            <Box marginY={3}>
              <Box
                display="flex"
                flexDirection="row"
                bgcolor="#333"
                marginX={3}
                marginY={1}
                className={classes.textColor}
              >
                <Box bgcolor="#333" px={1}>
                  <Note />
                </Box>
                <Box bgcolor="#333">projects</Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                bgcolor="#333"
                marginX={3}
                marginY={1}
                className={classes.textColor}
              >
                <Box bgcolor="#333" px={1}>
                  <Note />
                </Box>
                <Box bgcolor="#333">Notebook</Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                bgcolor="#333"
                marginX={3}
                marginY={1}
                className={classes.textColor}
              >
                <Box bgcolor="#333" px={1}>
                  <Note />
                </Box>
                <Box bgcolor="#333">Favorites</Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                bgcolor="#333"
                marginX={3}
                marginY={1}
                className={classes.textColor}
              >
                <Box bgcolor="#333" px={1}>
                  <Note />
                </Box>
                <Box bgcolor="#333">Deleted</Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SideNav;
