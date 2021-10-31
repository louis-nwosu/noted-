import React, { FC, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { useSnackbar, VariantType } from "notistack";

import { LandingPageLayout } from "../../../layout/landingPageLayout";
import { AuthActionCreator } from "../../../store/actions/authActions/authActions";
import { useStyles } from "./styles";

interface AuthProps {
  changeView: () => void;
}

export const SignInPage: FC<AuthProps> = ({ changeView }) => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const handleSnackAction = (text: string, variant: VariantType) => {
    enqueueSnackbar(text, { variant });
  };

  const [formFields, setFormFields] = useState({
    eMail: "",
    password: "",
  });
  const handleFormFields = (e: any) =>
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  const clearFormFields = () =>
    setFormFields({
      eMail: "",
      password: "",
    });

  return (
    <LandingPageLayout>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item md={6} className={classes.formCard}>
          <div>
            <Typography variant="body1" align="center">
              hello, kindly sign in to access your notes.
            </Typography>
            <Box mt={3}>
              <TextField
                label="e-mail"
                color="secondary"
                fullWidth
                name="eMail"
                onChange={handleFormFields}
                value={formFields.eMail}
              />
            </Box>
            <Box my={1}>
              <TextField
                label="password"
                color="secondary"
                type="password"
                fullWidth
                name="password"
                onChange={handleFormFields}
                value={formFields.password}
              />
            </Box>
            <Box my={1}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => {
                  formFields.eMail !== "" && formFields.password !== ""
                    ? dispatch(
                        AuthActionCreator(
                          formFields,
                          "sign-in",
                          history,
                          handleSnackAction
                        )
                      )
                    : handleSnackAction(
                        "e-mail and password cannot be empty",
                        "error"
                      );
                  clearFormFields();
                }}
              >
                sign in
              </Button>
            </Box>
            <Box display="flex" justifyContent="center">
              <Typography variant="body2">Don't have an account?</Typography>
              <Box mx={0.5} className={classes.signUp} onClick={changeView}>
                <Typography variant="body2" color="secondary">
                  sign up
                </Typography>
              </Box>
            </Box>
          </div>
        </Grid>
      </Grid>
    </LandingPageLayout>
  );
};

export { SignInPage as default };
