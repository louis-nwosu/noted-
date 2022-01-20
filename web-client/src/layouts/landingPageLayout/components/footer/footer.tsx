import { FC } from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import { purple } from "@mui/material/colors";
import { ThemeProvider } from "@mui/styles";

import { logoTheme } from "../../../../themes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(10, 5),
      backgroundColor: purple[600],
    },
  })
);

export const Foooter: FC = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid item md={3}>
        <ThemeProvider theme={logoTheme}>
          <Typography variant="h5" color="#fff" fontFamily="Neonderthaw">
            Noted
          </Typography>
        </ThemeProvider>
      </Grid>
      <Grid item md={3}>
        <Typography variant="body1" fontWeight="bold" color="#fff">
          Product
        </Typography>
        <Typography variant="body2" color="#fff" fontSize={12}>
          Overview
        </Typography>
        <Typography variant="body2" color="#fff" fontSize={12}>
          Pricing
        </Typography>
        <Typography variant="body2" color="#fff" fontSize={12}>
          Web App
        </Typography>
        <Typography variant="body2" color="#fff" fontSize={12}>
          Customer Stories
        </Typography>
      </Grid>
      <Grid item md={3}>
        <Typography variant="body1" fontWeight="bold" color="#fff">
          Noted for
        </Typography>
        <Typography variant="body2" color="#fff" fontSize={12}>
          Enterprice
        </Typography>
        <Typography variant="body2" color="#fff" fontSize={12}>
          Personal
        </Typography>
        <Typography variant="body2" color="#fff" fontSize={12}>
          Small business
        </Typography>
        <Typography variant="body2" color="#fff" fontSize={12}>
          Product design
        </Typography>
      </Grid>
      <Grid item md={3}>
        <Typography variant="body1" fontWeight="bold" color="#fff">
          Company
        </Typography>
        <Typography variant="body2" color="#fff" fontSize={12}>
          Developer
        </Typography>
        <Typography variant="body2" color="#fff" fontSize={12}>
          About us
        </Typography>
        <Typography variant="body2" color="#fff" fontSize={12}>
          Hire
        </Typography>
        <Typography variant="body2" color="#fff" fontSize={12}>
          Contact me
        </Typography>
      </Grid>
    </Grid>
  );
};

export { Foooter as default };
