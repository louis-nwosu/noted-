import React from 'react';
//materilUI components
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core';
import {
  InsertDriveFileRounded,
  FavoriteRounded,
  BookmarkRounded,
  DeleteRounded,
} from '@material-ui/icons/';
//import local components
import ProfileCard from './profileCard';

const navItems = [
  {
    icons: <InsertDriveFileRounded color="primary" />,
    title: 'All docs',
  },
  {
    icons: <FavoriteRounded color="primary" />,
    title: 'Favorites',
  },
  {
    icons: <BookmarkRounded color="primary" />,
    title: 'Bookmarks',
  },
  {
    icons: <DeleteRounded color="primary" />,
    title: 'Trash',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#e3ded1',
    width: '100%',
  },
  navLinkSec: {
    marginTop: theme.spacing(8),
  },
  navItem: {
    marginBottom: theme.spacing(1),
    cursor: 'pointer',
  },
}));

export const SideNav = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid fluid className={classes.root}>
        <Grid item>
          <ProfileCard />
        </Grid>
        <Grid item className={classes.navLinkSec}>
          {navItems.map((item) => (
            <React.Fragment>
              <Grid container justify="center" className={classes.navItem}>
                <Grid item xs={2}>
                  <Box>{item.icons}</Box>
                </Grid>
                <Grid item xs={8}>
                  <Box>
                    <Typography variant="body1" color="initial">
                      {item.title}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
