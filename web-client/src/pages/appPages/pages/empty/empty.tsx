import { FC, useContext } from "react";

import { Box } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import { motion } from "framer-motion";

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
  })
);

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
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className={mode === "light" ? classes.text : classes.textDark}
        >
          You don't have any {text}, hit the button below to add a new document
        </motion.p>
      </div>
    </Box>
  );
};

export { EmptyPage as default };
