import { FC, Fragment } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formTop: {
      width: "55%",
      margin: "0 auto",
    },
    formCard: {
      width: "75%",
      margin: "0 auto",
    },
  })
);

interface SignInProps {
  switchComp: () => void;
}

export const SignUp: FC<SignInProps> = ({ switchComp }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container py={5}>
        <Grid item md={12} xs={10}>
          <Box display="flex" className={classes.formTop} mb={5}>
            <AssignmentIndIcon color="secondary" fontSize="large" />
            <Typography variant="h5">Hello, Kindly sign up</Typography>
          </Box>
          <Box className={classes.formCard}>
            <Box mb={2}>
              <TextField
                fullWidth
                placeholder="E-mail"
                color="secondary"
                autoFocus
              />
            </Box>
            <Box mb={2}>
              <TextField fullWidth placeholder="Username" color="secondary" />
            </Box>
            <Box mb={2}>
              <TextField fullWidth placeholder="Password" color="secondary" />
            </Box>
            <Box mb={2}>
              <Button variant="contained" color="secondary" fullWidth>
                Sign Up
              </Button>
            </Box>
            <Box
              my={2}
              display="flex"
              justifyContent="space-around"
              className={classes.formTop}
            >
              <Typography variant="body2">Already have an account?</Typography>
              <Box onClick={switchComp}>
                <Typography
                  variant="body2"
                  color="secondary"
                  style={{ cursor: "pointer" }}
                >
                  Sign In
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export { SignUp as default };
