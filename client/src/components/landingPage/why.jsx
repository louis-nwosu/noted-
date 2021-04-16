import React from "react";

//import material UI components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";

//create the style hoook
const useStyles = makeStyles({
  card: {
    borderRadius: "2%",
    "&:hover": {},
  },
  image: {
    width: "20%",
    height: "40%",
  },
  container: {
    borderRadius: ".5em",
  },
});

const Why = () => {
  //use the style hook;
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={5}>
        <Grid item md={12}>
          <Typography variant="h3" color="initial" component="p">
            Features.
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={7}>
        <Grid item md={3} className={classes.card}>
          <img
            src="https://evernote.com/c/assets/why-evernote-refresh-2021/capture_anything.svg?a9fefd3526d47e97"
            alt=""
            className={classes.image}
          />
          <Typography variant="h5" color="initial" component="p">
            Capture anything
          </Typography>
          <Box pt={1}>
            <Typography variant="p" color="initial">
              Add more than text to your notes, including photos, files and
              to-do lists.
            </Typography>
          </Box>
        </Grid>
        <Grid item md={3} className={classes.card}>
          <img
            src="https://evernote.com/c/assets/why-evernote-refresh-2021/keep_it_together.svg?d2d49864fbf07bd7"
            alt=""
            className={classes.image}
          />
          <Typography variant="h5" color="initial" component="p">
            Keep it together
          </Typography>
          <Box pt={1}>
            <Typography variant="p" color="initial">
              Create a personal space for all your most important ideas and
              information.
            </Typography>
          </Box>
        </Grid>
        <Grid item md={3} className={classes.card}>
          <img
            src="https://evernote.com/c/assets/why-evernote-refresh-2021/find_it_fast.svg?6e0545ae215f18d7"
            alt=""
            className={classes.image}
          />
          <Typography variant="h5" color="initial" component="p">
            Find it fast
          </Typography>
          <Box pt={1}>
            <Typography variant="p" color="initial">
              Get the right note, right away with powerful search and keyword
              tags.
            </Typography>
          </Box>
        </Grid>
        <Grid item md={3} className={classes.card}>
          <img
            src="https://evernote.com/c/assets/why-evernote-refresh-2021/take_it_anywhere.svg?69c60385acb684f1"
            alt=""
            className={classes.image}
          />
          <Typography variant="h5" color="initial" component="p">
            Take it anywhere
          </Typography>
          <Box pt={1}>
            <Typography variant="p" color="initial">
              Sync your notes to all your devices so they stay with you, even if
              you’re offline.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Why;
