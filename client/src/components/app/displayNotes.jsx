import React from "react";
import { Grid, Box, Typography, makeStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

//import dummy variable
import { dummyNotes } from "../../dummyData";

//utility variable
const testish = true;

const useStyle = makeStyles({
  FAB: {
    position: "fixed",
    bottom: 30,
    right: 30,
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
      <Fab
        style={{ backgroundColor: "#9a4cba", color: "#fff" }}
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

const DisplayNotes = ({ notes }) => {
  const classes = useStyle();
  return (
    <React.Fragment>
      <Grid container style={{ padding: 10 }}>
        {dummyNotes.map((note) => {
          return (
            <Grid item md={3} xs={6} style={{ marginTop: 5 }}>
              <Box
                marginY={5}
                p={2}
                style={{
                  backgroundColor: "red",
                  margin: 10,
                  height: testish ? 130 : 180,
                  borderRadius: 7,
                }}
              >
                {note.body}
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Grid container>
        <Grid item={1} xs={6} className={classes.FAB}>
          <FABIcon />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default DisplayNotes;
