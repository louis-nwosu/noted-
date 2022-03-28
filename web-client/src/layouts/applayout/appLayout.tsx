import { FC, useState } from "react";

import Grid from "@mui/material/Grid";
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
  })
);

export const AppLayout: FC = ({ children }) => {
  const classes = useStyles();
  const [modalState, setModalState] = useState<boolean>(false);
  const handleModalState = () => setModalState(true);
  return (
    <Grid container>
      <Grid item md={2} xs={12} className={classes.sideNav}>
        <SideNav setModalState={handleModalState} />
      </Grid>
      <Grid item md={10} xs={12} style={{ marginLeft: "auto" }}>
        {children}
      </Grid>
    </Grid>
  );
};

export { AppLayout as default };
