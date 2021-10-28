import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    images: {
      width: "20%",
      height: "10%",
    },
    marqueeSection: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "centre",
      width: "100%",
      margin: "15px 0",
    },
    marqItem: {
      fontWeight: "bolder",
      fontSize: "1.5rem",
    },
  })
);
