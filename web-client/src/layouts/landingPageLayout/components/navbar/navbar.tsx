import { FC } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Theme } from "@mui/system";
import { makeStyles, createStyles, ThemeProvider } from "@mui/styles";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { logoTheme } from "../../../../themes/fontThemes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    links: {
      cursor: "pointer",
      textDecoration: "none",
    },
  })
);

const staggerContainer = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const staggerItem = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: 30,
  },
};

export const Navbar: FC = () => {
  const classes = useStyles();
  return (
    <Grid container justifyContent="space-between" alignItems="center" p={1}>
      <Grid item md={2}>
        <ThemeProvider theme={logoTheme}>
          <Link to="/" className={classes.links}>
            <Typography
              variant="h4"
              color="secondary"
              fontFamily="Neonderthaw"
              className={classes.links}
            >
              noted
            </Typography>
          </Link>
        </ThemeProvider>
      </Grid>
      <Grid item md={3} xs={8} sm={6}>
        <motion.div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <motion.div className={classes.links} variants={staggerItem}>
            <Typography variant="body1" color="#555">
              Home
            </Typography>
          </motion.div>
          <motion.div className={classes.links} variants={staggerItem}>
            <Typography variant="body1" color="#555">
              About
            </Typography>
          </motion.div>
          <motion.div
            className={classes.links}
            style={{ paddingRight: "10px" }}
            variants={staggerItem}
          >
            <Typography variant="body1" color="#555">
              Developer
            </Typography>
          </motion.div>
        </motion.div>
      </Grid>
    </Grid>
  );
};
