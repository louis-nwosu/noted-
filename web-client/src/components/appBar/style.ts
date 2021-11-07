import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputField: {
      width: "100%",
      padding: "10px 6px",
      borderRadius: "6px",
      border: `1.9px solid #800080`,
      color: "#800080",
    },
  })
);
