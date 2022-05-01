import { FC, Fragment, useState, ChangeEvent } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar, VariantType } from "notistack";
import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate } from "react-router-dom";

import { signIn } from "../../../store/actions/creators/auth";
import { FormFields } from "../types";
import { StateTypes } from "../../../store/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formTop: {
      width: "55%",
      margin: "0 auto",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    formCard: {
      width: "75%",
      margin: "0 auto",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
  })
);

interface SingInProps {
  switchComp: () => void;
}

export const SignIn: FC<SingInProps> = ({ switchComp }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading, user, hasError } = useSelector(
    (rootState: StateTypes) => rootState.auth
  );

  const handleSnackbarOpen = (text: string, snackType: VariantType) => {
    enqueueSnackbar(text, {
      variant: snackType,
    });
  };

  const [formFields, setFormField] = useState<FormFields>({
    email: "",
    password: "",
  });
  const handleFormFields = (e: ChangeEvent<HTMLInputElement>) =>
    setFormField((prevState: FormFields) => ({
      ...prevState,
      [e.target?.name]: e.target?.value,
    }));
  const signInHandler = () => {
    dispatch(signIn(formFields, handleSnackbarOpen, navigate));
    // TODO: clear form field
  };
  return (
    <Fragment>
      <Grid container py={5} display="flex" justifyContent={"center"}>
        <Grid item md={12} xs={10}>
          <Box display="flex" className={classes.formTop} mb={5}>
            <AssignmentIndIcon color="secondary" fontSize="large" />
            <Typography variant="h5">Hello, Kindly sign in</Typography>
          </Box>
          <Box className={classes.formCard}>
            <Box mb={2}>
              <TextField
                fullWidth
                placeholder="email"
                color="secondary"
                autoFocus
                name={"email"}
                value={formFields.email}
                onChange={handleFormFields}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                placeholder="Password"
                color="secondary"
                name={"password"}
                value={formFields.password}
                onChange={handleFormFields}
              />
            </Box>
            <Box mb={2}>
              {isLoading ? (
                <Box display={"flex"} justifyContent={"center"}>
                  <BeatLoader
                    color={"purple"}
                    loading={isLoading}
                    // css={override}
                    size={35}
                  />
                </Box>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={signInHandler}
                >
                  Sign In
                </Button>
              )}
            </Box>
            <Box
              my={2}
              display="flex"
              justifyContent="space-around"
              className={classes.formTop}
            >
              <Typography variant="body2">Don't have an account?</Typography>
              <Box onClick={switchComp}>
                <Typography
                  variant="body2"
                  color="secondary"
                  style={{ cursor: "pointer" }}
                >
                  Sign Up
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export { SignIn as default };
