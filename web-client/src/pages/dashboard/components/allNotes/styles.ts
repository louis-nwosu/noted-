import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loaderTextStyle: {
      textAlign: "center",
      marginLeft: "-50px",
      fontWeight: "bolder",
    },
  })
);
