import { FC, useContext } from "react";
import { Outlet } from "react-router-dom";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";

import { AppLayout } from "../../layouts/applayout/appLayout";
import { TopBar } from "./components/topbar/TopBar";
import { AppMode } from "../../App";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topNav: {
      boxShadow: "2px 10px 50px -1px rgba(0,0,0,0.28)",
      position: "fixed",
      width: "86%",
      backgroundColor: "#fff",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    topNavDark: {
      boxShadow: "1px 3px 12px 0px rgba(200,200,200,0.28)",
      position: "fixed",
      width: "86%",
      backgroundColor: "#fff",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
  })
);

export const AppDashboard: FC = () => {
  const classes = useStyles();
  const { mode } = useContext(AppMode);
  return (
    <AppLayout>
      <div className={mode === 'light' ? classes.topNav : classes.topNavDark}>
        <TopBar />
      </div>
      <Outlet />
    </AppLayout>
  );
};

export { AppDashboard as default };
