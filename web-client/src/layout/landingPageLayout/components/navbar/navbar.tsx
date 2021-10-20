import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

import { useStyles } from "./styles";

export const NavBar: FC = () => {
  const classes = useStyles();
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, transform: "translate(0, 0)" },
    show: { opacity: 1, transform: "translate(0, 5px)" },
  };
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item md={6} xs={8}>
          <span className={classes.cursor}>
            <div className={classes.navHero}>
              <Typography variant="h6" component="p">
                Noted
              </Typography>
            </div>
          </span>
        </Grid>
        <Grid item md={4} xs={12}>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className={classes.linkSection}
          >
            <motion.div variants={item} className={classes.cursor}>
              <Typography variant="body2" className={classes.navItem}>
                Home
              </Typography>
            </motion.div>
            <motion.div variants={item} className={classes.cursor}>
              <Typography variant="body2" className={classes.navItem}>
                Features
              </Typography>
            </motion.div>
            <motion.div variants={item} className={classes.cursor}>
              <Typography variant="body2" className={classes.navItem}>
                Download
              </Typography>
            </motion.div>
            <motion.div variants={item} className={classes.cursor}>
              <Typography variant="body2" className={classes.navItem}>
                About
              </Typography>
            </motion.div>
          </motion.div>
        </Grid>
      </Grid>
    </>
  );
};

export { NavBar as default };
