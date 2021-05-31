import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Grid} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText('#6200EE'),
    backgroundColor: '#6200EE',
  },
}));

export default function ProfileCard() {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item>
        <Box className={classes.root} margin={1}>
          <Avatar alt="user profile picture" className={classes.orange}>
            LN
          </Avatar>
          <Typography variant="body1" color="initial">
            hey, louis.
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box marginX={2}>
          {/* <Typography variant="body1" color="primary">
            Louisnwosu94@gmail.com
          </Typography> */}
        </Box>
      </Grid>
    </Grid>
  );
}
