import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    images: {
      width: "20%",
      height: "10%",
    },
  })
);
