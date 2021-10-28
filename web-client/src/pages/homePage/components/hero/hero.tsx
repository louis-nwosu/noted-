import React, { FC } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import { Button } from "../../../../components/button/button";
import HeroImage from "../../../../assets/heroImage.png";
import { useStyles } from "./styles";

export const Hero: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.heroContainer}>
        <Grid container>
          <Grid item md={5} xs={12}>
            <Box my={10} zIndex={1000}>
              <p className={classes.heroTxt}>The All-In-One workspace</p>
              <p className={classes.heroDesc}>
                One tool for the whole team to take notes, jot down and share
                ideas.
              </p>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Link to="/sign-in" className={classes.link}>
                <Button
                  text="get started"
                  variant="outlined"
                  color="secondary"
                />
              </Link>
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <img src={HeroImage} alt="macbook with noted app open." />
          </Grid>
        </Grid>
        <div className={classes.wave}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="purple"
              fillOpacity="1"
              d="M0,288L15,240C30,192,60,96,90,96C120,96,150,192,180,208C210,224,240,160,270,117.3C300,75,330,53,360,58.7C390,64,420,96,450,117.3C480,139,510,149,540,144C570,139,600,117,630,144C660,171,690,245,720,250.7C750,256,780,192,810,170.7C840,149,870,171,900,181.3C930,192,960,192,990,202.7C1020,213,1050,235,1080,202.7C1110,171,1140,85,1170,64C1200,43,1230,85,1260,101.3C1290,117,1320,107,1350,90.7C1380,75,1410,53,1425,42.7L1440,32L1440,320L1425,320C1410,320,1380,320,1350,320C1320,320,1290,320,1260,320C1230,320,1200,320,1170,320C1140,320,1110,320,1080,320C1050,320,1020,320,990,320C960,320,930,320,900,320C870,320,840,320,810,320C780,320,750,320,720,320C690,320,660,320,630,320C600,320,570,320,540,320C510,320,480,320,450,320C420,320,390,320,360,320C330,320,300,320,270,320C240,320,210,320,180,320C150,320,120,320,90,320C60,320,30,320,15,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
