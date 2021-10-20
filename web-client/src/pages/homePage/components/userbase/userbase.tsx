import React, { FC } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/system";
import Marquee from "react-fast-marquee";

import { regularTheme } from "../../../../themes/regular";
// import google from "../../../../assets/google.png";
import { useStyles } from "./styles";

export const Userbase: FC = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={regularTheme}>
      <Grid container>
        <Grid item md={12} xs={12}>
          <Box mx={6} my={3}>
            <Typography variant="h4" align="right" color="primary">
              Trusted by teams at
            </Typography>
            <section>
              <Marquee>
                {/* <img src={google} alt="google" className={classes.images} /> */}
                <h1>hello</h1>
                <h1>there</h1>
              </Marquee>
            </section>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export { Userbase as default };
