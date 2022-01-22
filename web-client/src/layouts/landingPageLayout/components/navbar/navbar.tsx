import { FC } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Theme } from "@mui/system";
import { makeStyles, createStyles, ThemeProvider } from "@mui/styles";
import { Link } from "react-router-dom";

import { logoTheme } from "../../../../themes/fontThemes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    links: {
      cursor: "pointer",
      textDecoration: "none",
    },
  })
);

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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <div className={classes.links}>
            <Typography variant="body1" color="#555">
              Home
            </Typography>
          </div>
          <div className={classes.links}>
            <Typography variant="body1" color="#555">
              About
            </Typography>
          </div>
          <div className={classes.links} style={{ paddingRight: "10px" }}>
            <Typography variant="body1" color="#555">
              Developer
            </Typography>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
};
