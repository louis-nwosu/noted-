import React, { FC } from "react";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";

import { regularTheme } from "../../themes/regular";
import { ThemeProvider } from "@mui/material/styles";

export const Appbar: FC = () => {
  return (
    <ThemeProvider theme={regularTheme}>
      <Grid container>
        <Grid item md={2} xs={2}>
          <Typography variant="body1" color="primary">
            noted.
          </Typography>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export { Appbar as default };
