import React, { FC, Fragment } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Appbar } from "../../components/appBar/appbar";
import { SideNav } from "../../components/sideNav/sideNav";

import { useStyles } from "./styles";

export const DashboardLayout: FC = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Box mx={3} position="fixed" width="100%">
        <Appbar />
      </Box>
      <Grid container className={classes.appBody}>
        <Grid item md={3} position="fixed">
          <SideNav />
        </Grid>
        <Grid item md={9} className={classes.mainSec}>
          {/* <Box>nonso</Box> */}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export { DashboardLayout as default };
