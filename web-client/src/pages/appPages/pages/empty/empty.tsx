import { FC, useContext } from "react";

import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import { makeStyles, createStyles, ThemeProvider } from "@mui/styles";
import { Theme } from "@mui/system";
import { Link } from "react-router-dom";

import { appTheme } from "../../../../themes";
import { AppMode } from "../../../../App";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      height: "100vh",
      backgroundColor: "#fff",
    },
    containerDark: {
      width: "100%",
      height: "100vh",
      backgroundColor: "#252525",
    },
    text: {
      width: "60%",
      textAlign: "center",
      margin: "0 auto",
      color: "#777",
      [theme.breakpoints.down("sm")]: {
        width: "90%",
      },
      fontFamily: "Inter, sans-serif",
    },
    textDark: {
      width: "60%",
      textAlign: "center",
      margin: "0 auto",
      color: "#999",
      [theme.breakpoints.down("sm")]: {
        width: "90%",
      },
      fontFamily: "Inter, sans-serif",
    },
    btnContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

export const EmptyPage: FC<{ text: string }> = ({ text }) => {
  const classes = useStyles();
  const { mode } = useContext(AppMode);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={mode === "light" ? classes.container : classes.containerDark}
    >
      <div>
        <p className={mode === "light" ? classes.text : classes.textDark}>
          You don't have any {text}, hit the button below to add a new document
        </p>
        <Box my={2} className={classes.btnContainer}>
          <ThemeProvider theme={appTheme}>
            {/* <Link to="/app/new" style={{ textDecoration: "none" }}></Link> */}
          </ThemeProvider>
        </Box>
      </div>
    </Box>
  );
};

export { EmptyPage as default };
