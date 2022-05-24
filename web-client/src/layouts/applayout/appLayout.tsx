import { FC, useState, createContext, useContext, Fragment } from "react";

import {
  Grid,
  Box,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import QueueIcon from "@mui/icons-material/Queue";
import { makeStyles, createStyles, ThemeProvider } from "@mui/styles";
import { Theme } from "@mui/system";
import { useLocation, Navigate, Link } from "react-router-dom";

import {
  SideNav,
  SideNavMobile,
  Dialog as DialogComp,
  TopBar,
} from "./components";
import { AppMode } from "../../App";
import { appTheme } from "../../themes";

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
    speedDial: {
      backgroundColor: "pink",
      color: "pink",
    },
    linkItem: {},
  })
);

export const SideNavContext = createContext({
  func: (val: boolean) => {},
  val: false,
});

const actions = [
  {
    icon: (
      <Link
        to={"/app/new"}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AddIcon />
      </Link>
    ),
    name: "single",
  },
  { icon: <QueueIcon />, name: "collection" },
];

export const AppLayout: FC = ({ children }) => {
  const classes = useStyles();
  const { mode } = useContext(AppMode);
  const location = useLocation();

  const token = localStorage.getItem("noted/v2-token");

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [sideNavMob, setSideNavMob] = useState<boolean>(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleSideNavMob = (val: boolean) => setSideNavMob(val);

  return (
    <Fragment>
      {token ? (
        <Grid
          container
          className={
            openDialog
              ? classes.containerDialogOpen
              : classes.containerDialogClose
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
                className={
                  mode === "light" ? classes.topNav : classes.topNavDark
                }
              >
                <TopBar />
              </div>
              <Box pr={4}>{children}</Box>
            </SideNavContext.Provider>
          </Grid>
          <div
            className={sideNavMob ? classes.sideNavMobShow : classes.sideNavMob}
          >
            <SideNavContext.Provider
              value={{ func: handleSideNavMob, val: sideNavMob }}
            >
              <SideNavMobile />
            </SideNavContext.Provider>
          </div>
          <DialogComp
            dialogState={openDialog}
            handleDialogState={setOpenDialog}
          />
          <ThemeProvider theme={appTheme}>
            <Box
              sx={{
                height: "100%",
                width: "100%",
                transform: "translateZ(0px)",
                flexGrow: 1,
              }}
            >
              <SpeedDial
                ariaLabel="SpeedDial add doc action"
                sx={{ position: "absolute", bottom: 28, right: 24 }}
                icon={<SpeedDialIcon />}
                classes={{ fab: classes.speedDial }}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                  />
                ))}
              </SpeedDial>
            </Box>
          </ThemeProvider>
        </Grid>
      ) : (
        <Navigate to={"/authentication"} replace state={{ from: location }} />
      )}
    </Fragment>
  );
};

export { AppLayout as default };
