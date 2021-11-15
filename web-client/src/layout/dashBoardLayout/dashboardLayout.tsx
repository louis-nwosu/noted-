import React, { FC, Fragment } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Appbar } from "../../components/appBar/appbar";
import { SideNav } from "../../components/sideNav/sideNav";
import Footer from "../../components/footer/footer";

import { useStyles } from "./styles";

interface DashboardLayoutProp {}

export const DashboardLayout: FC<DashboardLayoutProp> = ({ children }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Box mx={3} position="fixed" width="100%">
        <Appbar />
      </Box>
      <Grid container className={classes.appBody}>
        <Grid item md={2} className={classes.sideNav}>
          <SideNav />
        </Grid>
        <Grid item md={10} xs={12} className={classes.mainSec}>
          {children}
        </Grid>
        <Grid md={12} className={classes.footer}>
          <Footer />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export { DashboardLayout as default };
