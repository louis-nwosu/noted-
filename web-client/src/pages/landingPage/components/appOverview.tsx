import { FC } from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";

import noteApp from "../../../assets/note-app.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      width: "100%",
      height: "100%",
    },
  })
);

export const AppOverview: FC = () => {
  const classes = useStyles();
  return (
    <Grid container py={10}>
      <Grid item md={12}>
        <Typography
          variant="h4"
          component="p"
          color="secondary"
          fontWeight="bold"
          align="center"
        >
          Easy and austhetic design.
        </Typography>
      </Grid>
      <Grid item md={12} py={3}>
        <img src={noteApp} alt="note app overview" className={classes.img} />
      </Grid>
    </Grid>
  );
};

export { AppOverview as default };
