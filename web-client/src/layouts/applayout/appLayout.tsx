import { FC, useState, Fragment, createContext } from "react";

import { Grid, Typography, TextField, Box, Button } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";

import { SideNav } from "./components/sideNav";
import { SideNavMobile } from "./components/sideNavMobile";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sideNav: {
      width: "100%",
      height: "100vh",
      position: "fixed",
      [theme.breakpoints.down("sm")]: {
        // transition: 'all 2s ease-in-out',
        transform: "translateX(100px)",
        width: "100%",
        height: "100vh",
        display: "none",
      },
    },
    dialogContainer: {
      position: "absolute",
      width: "100%",
      height: "100vh",
      top: "0",
    },
    hideDialog: {
      display: "none",
    },
    backDrop: {
      opacity: "0.7",
      backgroundColor: "#000",
      width: "100%",
      height: "100%",
    },
    dialogItem: {
      position: "absolute",
      width: "30%",
      backgroundColor: "#fff",
      padding: "20px 5px",
      top: "35vh",
      left: "40%",
      borderRadius: "4px",
    },
    container: {
      position: "relative",
      overflow: "hidden",
    },
    dialogIns: {
      width: "100%",
      height: "100%",
      position: "absolute",
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
  })
);

export const SideNavContext = createContext({
  func: (val: boolean) => {},
  val: false,
});

export const AppLayout: FC = ({ children }) => {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [sideNavMob, setSideNavMob] = useState<boolean>(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleSideNavMob = (val: boolean) => setSideNavMob(val);

  return (
    <Fragment>
      <Grid container className={classes.container}>
        <Grid item md={2} xs={12} className={classes.sideNav}>
          <SideNav handleOpenDialog={handleOpenDialog} />
        </Grid>
        <Grid item md={10} xs={12} style={{ marginLeft: "auto" }}>
          <SideNavContext.Provider
            value={{ func: handleSideNavMob, val: sideNavMob }}
          >
            {children}
          </SideNavContext.Provider>
        </Grid>
        <div
          className={openDialog ? classes.dialogContainer : classes.hideDialog}
        >
          <div className={classes.dialogIns}>
            <div
              className={classes.backDrop}
              onClick={() => setOpenDialog(false)}
            ></div>
            <div className={classes.dialogItem}>
              <Typography color="secondary" variant="body2" align="center">
                Enter pasword to view private documents
              </Typography>
              <Box
                my={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <TextField variant="outlined" size="small" color="secondary">
                  Enter password
                </TextField>
              </Box>
              <Box
                mt={2}
                px={5}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button variant="contained" color="secondary">
                  Ok
                </Button>
              </Box>
            </div>
          </div>
        </div>
        <div
          className={sideNavMob ? classes.sideNavMobShow : classes.sideNavMob}
        >
          <SideNavContext.Provider
            value={{ func: handleSideNavMob, val: sideNavMob }}
          >
            <SideNavMobile />
          </SideNavContext.Provider>
        </div>
      </Grid>
    </Fragment>
  );
};

export { AppLayout as default };
