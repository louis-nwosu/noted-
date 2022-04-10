import { FC, useEffect, useState, useContext } from "react";

import { Box } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";

import { AppMode } from "../../../../App";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "200px",
      height: "100vh",
      backgroundColor: "#fff",
      padding: theme.spacing(0, 2),
    },
    containerDark: {
      width: "200px",
      height: "100vh",
      backgroundColor: "#252525",
      padding: theme.spacing(0, 2),
    },
    header: {
      textAlign: "center",
      fontWeight: "bold",
      color: "purple",
    },
    headerContainer: {
      width: "100%",
      height: "6.5vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    sectionHeaders: {
      color: "#777",
    },
    sectionHeadersDark: {
      color: "#999",
    },
    themePickerContainer: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      border: "1.5px solid #DDA0DD",
      borderRadius: "50px",
      height: "30px",
    },
    themePicker: {
      width: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      color: "#555",
    },
    themePickerActiveDark: {
      width: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      color: "#fff",
      backgroundColor: "#999",
      height: "100%",
      borderRadius: "0 50px 50px 0",
    },
    themePickerActiveLight: {
      width: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      color: "#fff",
      backgroundColor: "#333",
      height: "100%",
      borderRadius: "50px 0 0 50px",
    },
    animContInit: {
      transform: "translateY(20px)",
      transition: "all .5s ease-in-out",
      opacity: 0,
    },
    animCont: {
      transform: "translateY(0)",
      transition: "all .4s ease-in-out",
      opacity: 1,
    },
  })
);

export const Settings: FC = () => {
  const classes = useStyles();
  const { mode, setMode } = useContext(AppMode);

  const [animLaunched, setAnimLaunched] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setAnimLaunched(true);
    }, 100);
  }, []);
  return (
    <div
      className={mode === "dark" ? classes.containerDark : classes.container}
    >
      <div className={animLaunched ? classes.animCont : classes.animContInit}>
        <Box className={classes.headerContainer}>
          <p className={classes.header}>Settings</p>
        </Box>
        <Box>
          <p
            className={
              mode === "dark"
                ? classes.sectionHeadersDark
                : classes.sectionHeaders
            }
          >
            Theme
          </p>
          <span className={classes.themePickerContainer}>
            <span
              className={
                mode === "light"
                  ? classes.themePickerActiveLight
                  : classes.themePicker
              }
              onClick={() => setMode("light")}
            >
              Light
            </span>
            <span
              className={
                mode === "dark"
                  ? classes.themePickerActiveDark
                  : classes.themePicker
              }
              onClick={() => setMode("dark")}
            >
              Dark
            </span>
          </span>
        </Box>
      </div>
    </div>
  );
};

export { Settings as default };
