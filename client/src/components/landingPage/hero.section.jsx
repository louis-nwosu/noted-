import React from "react";
//import material Ui components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Button } from "@material-ui/core";
//import the Link component
import { Link } from "react-router-dom";

//define the style hook
const useStyle = makeStyles({
  container: {
    marginTop: "9%",
    marginBottom: "3%",
  },
  image: {
    width: "100%",
    height: "auto",
  },
  heroText: {
    marginTop: "10%",
    marginBottom: "3%",
  },
  heroTextDesc: {
    marginTop: "3%",
  },
  span: {
    color: "#3f51b5",
  },
});

export default function HeroSection() {
  //initialize the style hook
  const classes = useStyle();
  return (
    <Container fluid>
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" color="primary" className={classes.heroText}>
            Take your note taking experience to the next level.
          </Typography>
          <Typography variant="p" color="initial">
            Accomplish more with <span className={classes.span}>not3d</span>. It
            helps you capture ideas and find them fast. keep inportant info
            handy by syncing your notes to all you devices and capture what
            matters on the go.
          </Typography>
          <Grid container fluid className={classes.heroTextDesc}>
            <Grid item>
              <Link to="sign-up">
                <Button variant="outlined" color="primary">
                  get started
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src="https://evernote.com/c/assets/homepage/hp_hero_note@2x__en.png?398ba029650c0e06"
            className={classes.image}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
