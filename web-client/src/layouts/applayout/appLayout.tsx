import { FC, useState, Fragment } from "react";

import { Grid } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";

import { SideNav } from "./components/sideNav";

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
      position: 'absolute',
      width: '100%',
      height: '100vh',
      top: '0',
      // display: 'none'
    },
    backDrop: {
      opacity: '0.7',
      backgroundColor: '#000',
      width: '100%',
      height: '100%',
    },
    dialogItem: {
      position: 'absolute',
      width: '20%',
      backgroundColor: '#fff',
      padding: '20px 5px',
      top: '40vh',
      left: '45%'
    },
    container: {
      position: "relative",
    },
    dialogIns: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    }
  })
);

export const AppLayout: FC = ({ children }) => {
  const classes = useStyles();
  const [modalState, setModalState] = useState<boolean>(false);
  const handleModalState = () => setModalState(true);
  return (
    <Fragment>
      <Grid container className={classes.container}>
        <Grid item md={2} xs={12} className={classes.sideNav}>
          <SideNav setModalState={handleModalState} />
        </Grid>
        <Grid item md={10} xs={12} style={{ marginLeft: "auto" }}>
          {children}
        </Grid>
        <div className={classes.dialogContainer}>
          <div className={classes.dialogIns}>
            <div className={classes.backDrop}></div>
            <div className={classes.dialogItem}></div>
          </div>
        </div>
      </Grid>
    </Fragment>
  );
};

export { AppLayout as default };
