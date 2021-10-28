import React, { FC } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/system";
import Marquee from "react-fast-marquee";

import { regularTheme } from "../../../../themes/regular";
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
                <div className={classes.marqueeSection}>
                  <div className={classes.marqItem}>
                    <p>
                      <span style={{ color: "red" }}>G</span>OOGLE
                    </p>
                  </div>
                  <div className={classes.marqItem}>
                    <p>FACEBOOK</p>
                  </div>
                  <div className={classes.marqItem}>
                    <p>FUTO</p>
                  </div>
                  <div className={classes.marqItem}>
                    <p>TWITTER</p>
                  </div>{" "}
                  <div className={classes.marqItem}>
                    <p>INSTAGRAM</p>
                  </div>
                </div>
              </Marquee>
            </section>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export { Userbase as default };
