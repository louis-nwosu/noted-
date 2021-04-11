import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  navBar: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginRight: "auto",
    marginLeft: "2%",
    fontamily: "Train One",
  },
  links: {
    marginLeft: 5,
    marginRight: 20,
    paaddingLeft: 3,
    paddingRight: 3,
    cursor: "pointer",
  },
  container: {
    padding: 15,
    backgroundColor: "#3f51b5",
    color: "#fff",
    position: "fixed",
    width: "100%",
    top: 0
  },
});

export default function Navbar() {
  const classes = useStyle();
  return (
    <>
      <div className={classes.container}>
        <Grid container>
          <Grid item className={classes.navBar} md={12}>
            <Typography
              variant="h6"
              color="initial"
              compnent="h1"
              className={classes.logo}
            >
              not3d
            </Typography>
            <Typography variant="p" color="initial" className={classes.links}>
              Home
            </Typography>
            <Typography variant="p" color="initial" className={classes.links}>
              App
            </Typography>
            <Typography variant="p" color="initial" className={classes.links}>
              Developer
            </Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
