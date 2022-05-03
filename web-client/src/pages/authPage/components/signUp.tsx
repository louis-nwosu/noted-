import { FC, Fragment, useState, ChangeEvent } from "react";

import { Button, Box, Typography, Grid, TextField } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BeatLoader from "react-spinners/BeatLoader";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

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

type Inputs = {
  example: string;
  exampleRequired: string;
};

interface SignInProps {
  switchComp: () => void;
}

export const SignUp: FC<SignInProps> = ({ switchComp }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading } = useSelector((state: StateTypes) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const handleSnackbarOpen = (text: string) => {
    enqueueSnackbar(text, {
      variant: "error",
    });
  };

  const [formFields, setFormField] = useState<FormFields>({
    fullName: "",
    email: "",
    password: "",
  });
  const handleFormFields = (e: ChangeEvent<HTMLInputElement>) =>
    setFormField((prevState: FormFields) => ({
      ...prevState,
      [e.target?.name]: e.target?.value,
    }));

  const signUpDispatcher = () => {
    dispatch(signUp(formFields, handleSnackbarOpen, navigate));
    setFormField({ fullName: "", email: "", password: "" });
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
                value={formFields.email}
                name={"email"}
                onChange={handleFormFields}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                placeholder="Fullname"
                color="secondary"
                value={formFields.fullName}
                name={"fullName"}
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
                  <BeatLoader color={"purple"} loading={isLoading} size={35} />
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
