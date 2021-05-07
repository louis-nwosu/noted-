import React from "react";
import { Grid, Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    padding: 10,
  },
  cardContent: {
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 4,
  },
}));

const NoteCard = ({ title, body, createdAt }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid item md={3} xs={12} className={classes.cardContainer}>
        <Box padding={1} className={classes.cardContent}>
          <Box paddingX={1}>
            <Typography variant="h6">{title}</Typography>
          </Box>
          <Box paddingX={1}>
            <Typography variant="body2">{body}</Typography>
            <Typography variant="body1">{createdAt}</Typography>
          </Box>
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default NoteCard;
