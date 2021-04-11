import React from "react";

//import material UI components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";

//create the style hook
const useStyle = makeStyles({
  image: {
    width: "50%",
    height: "60%",
    opacity: "0.4",
  },
  container: {
    paddingTop: "1%",
  },
});

const BrandSection = () => {
  const classes = useStyle();
  return (
    <>
      <Container fluid className={classes.container}>
        <Grid container spacing={7}>
          <Grid item>
            <img
              src="https://evernote.com/c/assets/homepage/forbes-active.png?3bffacb93d68b1fe"
              alt="forbes"
              className={classes.image}
            />
          </Grid>
          <Grid item>
            <img
              src="https://evernote.com/c/assets/homepage/logo-inc-active.png?e993cb33e525ac88"
              alt="forbes"
              className={classes.image}
            />
          </Grid>
          <Grid item>
            <img
              src="https://evernote.com/c/assets/homepage/the-verge_active.png?5312a2b3e103696e"
              alt="forbes"
              className={classes.image}
            />
          </Grid>
          <Grid item>
            <img
              src="https://evernote.com/c/assets/homepage/entrepreneur-magazine_active.png?b72e18e9aff09af"
              alt="forbes"
              className={classes.image}
            />
          </Grid>
          <Grid item>
            <img
              src="https://evernote.com/c/assets/homepage/business-active.png?8d71276da14c21a8"
              alt="forbes"
              className={classes.image}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BrandSection;
