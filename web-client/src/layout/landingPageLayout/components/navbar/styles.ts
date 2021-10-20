import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 40px",
      // [theme.breakpoints.down("sm")]: {
      //   padding: "5px",
      // },
    },
    linkSection: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cursor: {
      cursor: "pointer",
    },
    navItem: {
      color: "#444",
      fontWeight: "bold",
    },
    navHero: {
      color: "purple",
    },
  })
);
