import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";
import FolderIcon from "@material-ui/icons/Folder";
import AssignmentIcon from '@material-ui/icons/Assignment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  color: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  iconFolderBg: {
    backgroundColor: "",
  },
}));

export default function SideNav() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container className={classes.root}>
        <Grid item md={12} xs={12}>
          <Box marginY={2} marginX={2}>
            <Box marginY={1}>
              <Grid container>
                <Grid item md={2}>
                  <Box marginY={1}>
                    <FolderIcon color="primary" fontSize='small' />
                  </Box>
                </Grid>
                <Grid item md={8}>
                  <Box marginY={0.7}>
                    <Typography variant="body1" color="initial">
                      Collection
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box marginY={1}>
              <Grid container>
                <Grid item md={2}>
                  <Box marginY={1}>
                    <AssignmentIcon color="primary" fontSize='small' />
                  </Box>
                </Grid>
                <Grid item md={8}>
                  <Box marginY={0.7}>
                    <Typography variant="body1" color="initial">
                      Current
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box marginY={1}>
              <Grid container>
                <Grid item md={2}>
                  <Box marginY={1}>
                    <FolderIcon color="primary" fontSize='small' />
                  </Box>
                </Grid>
                <Grid item md={8}>
                  <Box marginY={0.7}>
                    <Typography variant="body1" color="initial">
                      Collection
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box marginY={1}>
              <Grid container>
                <Grid item md={2}>
                  <Box marginY={1}>
                    <FolderIcon color="primary" fontSize='small' />
                  </Box>
                </Grid>
                <Grid item md={8}>
                  <Box marginY={0.7}>
                    <Typography variant="body1" color="initial">
                      Collection
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
