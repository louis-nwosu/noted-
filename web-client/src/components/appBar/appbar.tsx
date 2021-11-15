import React, { FC } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from '@mui/icons-material/Search';

import { regularTheme } from "../../themes/regular";
import { ThemeProvider } from "@mui/material/styles";
import { useStyles } from "./style";

export const Appbar: FC = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={regularTheme}>
      <Grid container justifyContent="space-between" alignItems="center" py={2}>
        <Grid item md={2} xs={2}>
          <Box mx={3}>
            <Typography variant="h6" color="primary">
              noted.
            </Typography>
          </Box>
        </Grid>
        <Grid item md={5} xs={8}>
          <div className={classes.inputFieldContainer}>
            <input
              type="text"
              placeholder="Search notes.."
              className={classes.inputField}
            />
            <SearchIcon />
          </div>
        </Grid>
        <Grid item md={2} xs={2} display="flex">
          <Typography variant="body1">Hey, Louis</Typography>
          <Box
            mx={1.5}
            width="45%"
            display="flex"
            justifyContent="space-around"
          >
            <Badge badgeContent={4} color="primary">
              <NotificationsNoneIcon />
            </Badge>
            <PersonIcon color="primary" />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export { Appbar as default };
