import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBody: {
      height: "100vh",
      padding: "60px 25px 10px 25px",
    },
    mainSec: {
      marginLeft: "auto",
    },
    sideNav: {
      // position: "fixed",
      height: "88vh",
    },
    footer: {
      position: "fixed",
      bottom: 0,
      right: 0,
      left: 0,
    },
  })
);
