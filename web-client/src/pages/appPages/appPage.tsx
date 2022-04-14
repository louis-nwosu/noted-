import { FC, useContext } from "react";
import { Outlet } from "react-router-dom";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";

import { AppLayout } from "../../layouts/applayout/appLayout";
import { TopBar } from "./pages/topbar/TopBar";
import { AppMode } from "../../App";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

export const AppDashboard: FC = () => {
  const classes = useStyles();
  const { mode } = useContext(AppMode);
  return (
    <AppLayout>
      <div className={mode === "light" ? classes.topNav : classes.topNavDark}>
        <TopBar />
      </div>
      <Outlet />
    </AppLayout>
  );
};

export { AppDashboard as default };
