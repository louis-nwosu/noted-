import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputFieldContainer: {
      width: "100%",
      padding: "4px",
      borderRadius: "10px",
      border: `1.9px solid #800080`,
      color: "#800080",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    inputField: {
      border: "none",
      outline: "none",
      width: "80%",
    },
  })
);
