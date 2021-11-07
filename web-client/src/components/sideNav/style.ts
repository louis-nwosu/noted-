import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navItemsContainer: {
      margin: "50px 20px",
    },
    navItem: {
      cursor: "pointer",
    },
    navtext: {
      transform: "scale(0.9)",
      transition: "all ease-in 0.2s",
      "&:hover": {
        transform: "scale(1)",
      },
    },
    linkItem: {
      textDecoration: "none",
    },
  })
);
