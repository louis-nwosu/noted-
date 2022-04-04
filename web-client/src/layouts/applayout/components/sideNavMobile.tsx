import { FC, useContext } from "react";

import { Box } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import CancelIcon from "@mui/icons-material/Cancel";

import { SideNavContext } from "../appLayout";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      height: "100vh",
      position: "relative",
    },
    backdrop: {
      position: "absolute",
      padding: "10px",
      backgroundColor: "#555",
      width: "100%",
      height: "100%",
      opacity: "0.6",
      backdropFilter: "blur(2px)",
    },
    content: {
      position: "absolute",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      zIndex: "1000",
    },
    sideNav: {
      width: "70%",
      backgroundColor: "purple",
      height: "100vh",
    },
  })
);

export const SideNavMobile: FC = () => {
  const classes = useStyles();
  const removeSideNav = useContext(SideNavContext);

  return (
    <div className={classes.container}>
      <div className={classes.backdrop}></div>
      <div className={classes.content}>
        <div className={classes.sideNav}>
          <p style={{ color: "white" }}>hello</p>
        </div>
        <Box mr={0.5} mt={0.7}>
          <CancelIcon
            style={{ color: "purple", fontSize: "40px" }}
            onClick={() => {
              removeSideNav.func(false);
            }}
          />
        </Box>
      </div>
    </div>
  );
};

export { SideNavMobile as default };
