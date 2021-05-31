import React from 'react';
//import material UI components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core';
//import local components
import {SideNav} from './sidenav';
import NavBar from './navBar';

const useStyles = makeStyles({
  sideNavContainer: {
    position: 'fixed',
    height: '100vh',
    background: '#e3ded1',
    width: '100%',
    borderRight: '1px',
    borderColor: '#555'
  },
  appSection: {
    marginLeft: 'auto',
  },
  navBar: {
    width: '100%',
  },
});

export default function NoteApp() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container>
        <Grid item md={2} className={classes.sideNavContainer}>
          <SideNav />
        </Grid>
        <Grid item md={10} className={classes.appSection}>
          <Grid container>
            <Grid item col={12} className={classes.navBar}>
              <NavBar className={classes.navBar} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
