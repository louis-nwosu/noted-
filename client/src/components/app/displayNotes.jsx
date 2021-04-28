import React from "react";
import { Grid, Box, Typography, makeStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyle = makeStyles({
  FAB: {
    position: "fixed",
    bottom: 30,
    right: 40,
  },
});

const fabStyle = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const FABIcon = () => {
  const classes = fabStyle();

  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
};

const DisplayNotes = ({ notes }) => {
  const classes = useStyle();
  return (
    <React.Fragment>
      <Grid container>
        <Grid item md={3} xs={12}>
          <Typography variant="body1" color="initial">
            tesing 1 2
          </Typography>
        </Grid>
        <Grid item md={3} xs={12}>
          <Typography variant="body1" color="initial">
            tesing 1 2
          </Typography>
        </Grid>
        <Grid item md={3} xs={12}>
          <Typography variant="body1" color="initial">
            tesing 1 2
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item={1} xs={1} className={classes.FAB}>
          <FABIcon />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default DisplayNotes;
