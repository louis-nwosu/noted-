import React from "react";
import { Grid, Box, Typography, makeStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
//import the actions
import { FetchDocs, PostNote } from "../../store/actions";

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

const DisplayNotes = ({ state, dispatch }) => {
  const classes = useStyle();
  console.log(state);
  //fetch the documents
  React.useEffect(() => {
    dispatch(FetchDocs(state.user._id));
  }, [state.user.notes]);
  //toggle what to display
  const docDisplay = () =>
    state?.notes !== null ? (
      state.notes.notes.map((note) => {
        return <NoteCard title={note.title} body={note.body} />;
      })
    ) : (
      <p> no notes yet boss!</p>
    );
  //dispatch function to send a document to the backend
  const sendDocs = (doc) => dispatch(PostNote(doc, state.user._id));
  //render function to display UI
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
        {docDisplay()}
      </Grid>
      <Grid container>
        <Grid item={1} xs={6} className={classes.FAB}>
          <SimpleModal render={<FABIcon />} getDoc={sendDocs} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(DisplayNotes);
