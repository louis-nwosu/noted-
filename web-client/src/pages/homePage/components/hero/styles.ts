import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "15px 0",
      margin: "80px 0 0 0",
    },
    heroTxt: {
      textAlign: "center",
      fontWeight: "bolder",
      fontSize: "36px",
      color: "purple",
    },
    heroDesc: {
      textAlign: "center",
      width: "50%",
      margin: "0 auto",
      color: "#222",
    },
    heroContainer: {
      position: "relative",
    },
    wave: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: -1,
    },
    link: {
      textDecoration: "none",
      color: "inherit",
    },
  })
);
