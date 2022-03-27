import { FC } from "react";
import { Outlet } from "react-router-dom";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";

import { AppLayout } from "../../layouts/applayout/appLayout";
import { TopBar } from "./components/topbar/TopBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topNav: {
      boxShadow: "2px 10px 50px -1px rgba(0,0,0,0.28)",
      position: "fixed",
      width: "84%",
      backgroundColor: '#fff',
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
  })
);

export const AppDashboard: FC = () => {
  const classes = useStyles();
  return (
    <AppLayout>
      <div className={classes.topNav}>
        <TopBar />
      </div>
      <Outlet />
    </AppLayout>
  );
};

export { AppDashboard as default };
