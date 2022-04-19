import { FC, Fragment, useState, ChangeEvent } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useDispatch } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import { signUp } from "../../../store/actions/creators/auth";
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

interface SignInProps {
  switchComp: () => void;
}

export const SignUp: FC<SignInProps> = ({ switchComp }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading } = useSelector((state: StateTypes) => state.auth);

  const handleSnackbarOpen = (text: string) => {
    enqueueSnackbar(text, {
      variant: "error",
    });
  };

  const [formFields, setFormField] = useState<FormFields>({
    username: "",
    eMail: "",
    password: "",
  });
  const handleFormFields = (e: ChangeEvent<HTMLInputElement>) =>
    setFormField((prevState: FormFields) => ({
      ...prevState,
      [e.target?.name]: e.target?.value,
    }));

  const signUpDispatcher = () => {
    dispatch(signUp(formFields, handleSnackbarOpen));
    setFormField({ username: "", eMail: "", password: "" });
  };

  return (
    <Fragment>
      <Grid container py={5} display="flex" justifyContent={"center"}>
        <Grid item md={12} xs={10}>
          <Box
            display="flex"
            justifyContent={"center"}
            className={classes.formTop}
            mb={5}
          >
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
                value={formFields.eMail}
                name={"eMail"}
                onChange={handleFormFields}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                placeholder="Username"
                color="secondary"
                value={formFields.username}
                name={"username"}
                onChange={handleFormFields}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                placeholder="Password"
                color="secondary"
                value={formFields.password}
                name={"password"}
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
                  onClick={signUpDispatcher}
                >
                  Sign Up
                </Button>
              )}
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
