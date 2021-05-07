import React from "react";
import { Grid, Box, Typography, makeStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

//import dummy variable
import { dummyNotes } from "../../dummyData";

//import custom components
import NoteCard from "./noteCard";
import SimpleModal from "./modal";


const useStyle = makeStyles({
  FAB: {
    position: "fixed",
    bottom: 30,
    right: 30,
  },
  textLight: {
    color: "#fff",
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
      <Grid container>
        <Grid item md={12} xs={12}>
          <Box paddingX={4} paddingY={2}>
            <Typography variant="h5" className={classes.textLight}>
              All notes.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container style={{ paddingLeft: 20, paddingRight: 20 }}>
        {dummyNotes.map((note) => {
          return <NoteCard title={note.title} body={note.body} />;
        })}
      </Grid>
      <Grid container>
        <Grid item={1} xs={6} className={classes.FAB}>
          <SimpleModal render={<FABIcon />} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default DisplayNotes;
