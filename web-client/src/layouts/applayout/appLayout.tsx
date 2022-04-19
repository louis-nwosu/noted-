import { FC, useState, createContext, useContext } from "react";

import { Grid, Box } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";

import {
  SideNav,
  SideNavMobile,
  Dialog as DialogComp,
  TopBar,
} from "./components";
import { AppMode } from "../../App";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sideNav: {
      width: "100%",
      height: "100vh",
      position: "fixed",
      [theme.breakpoints.down("sm")]: {
        transform: "translateX(100px)",
        width: "100%",
        height: "100vh",
        display: "none",
      },
    },
    containerDialogOpen: {
      position: "relative",
      overflow: "hidden",
      width: "100%",
      height: "100vh",
    },
    containerDialogClose: {
      position: "relative",
      overflow: "hidden",
      width: "100%",
      minHeight: "100vh",
    },
    sideNavMob: {
      width: "100%",
      position: "absolute",
      transform: "translateX(-3000px)",
      transition: "all 0.2s ease-in",
    },
    sideNavMobShow: {
      width: "100%",
      position: "absolute",
      transform: "translateX(0)",
      transition: "all 0.2s ease-in",
    },
    topNav: {
      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      position: "fixed",
      width: "86%",
      backgroundColor: "#fff",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      zIndex: 100,
    },
    topNavDark: {
      boxShadow:
        "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
      position: "fixed",
      width: "86%",
      backgroundColor: "#fff",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
  })
);

export const SideNavContext = createContext({
  func: (val: boolean) => {},
  val: false,
});

export const AppLayout: FC = ({ children }) => {
  const classes = useStyles();

  const { mode } = useContext(AppMode);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [sideNavMob, setSideNavMob] = useState<boolean>(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleSideNavMob = (val: boolean) => setSideNavMob(val);

  return (
    <Grid
      container
      className={
        openDialog ? classes.containerDialogOpen : classes.containerDialogClose
      }
    >
      <Grid item md={1.8} xs={12} className={classes.sideNav}>
        <SideNav handleOpenDialog={handleOpenDialog} />
      </Grid>
      <Grid item md={10.2} xs={12} style={{ marginLeft: "auto" }}>
        <SideNavContext.Provider
          value={{ func: handleSideNavMob, val: sideNavMob }}
        >
          <div
            className={mode === "light" ? classes.topNav : classes.topNavDark}
          >
            <TopBar />
          </div>
          <Box pr={4}>{children}</Box>
        </SideNavContext.Provider>
      </Grid>
      <div className={sideNavMob ? classes.sideNavMobShow : classes.sideNavMob}>
        <SideNavContext.Provider
          value={{ func: handleSideNavMob, val: sideNavMob }}
        >
          <SideNavMobile />
        </SideNavContext.Provider>
      </div>
      <DialogComp dialogState={openDialog} handleDialogState={setOpenDialog} />
    </Grid>
  );
};

export { AppLayout as default };
