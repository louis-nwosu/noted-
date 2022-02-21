import { FC } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles, createStyles } from "@mui/styles";

import { SideNav } from "./components/sideNav";
import { Theme } from "@mui/system";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sideNav: {
      width: "100%",
      height: "100vh",
      position: "fixed",
      [theme.breakpoints.down('sm')]: {
        // transition: 'all 2s ease-in-out',
        transform: 'translateX(100px)',
        width: "100%",
        height: "100vh",
      }
    },
  })
);

export const AppLayout: FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item md={2} xs={12} className={classes.sideNav}>
        <SideNav />
      </Grid>
      <Grid item md={10} xs={12} style={{ marginLeft: "auto" }}>
        {children}
      </Grid>
    </Grid>
  );
};

export { AppLayout as default };
