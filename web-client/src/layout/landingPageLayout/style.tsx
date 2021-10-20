import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "10px 0",
    },
    navContainer: {
      position: "fixed",
      width: "100%",
      zIndex: 1000,
    },
  })
);
