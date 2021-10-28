import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formCard: {
      width: "100%",
      height: "90vh",
      marginTop: "50vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    signUp: {
      cursor: "pointer",
    },
  })
);
