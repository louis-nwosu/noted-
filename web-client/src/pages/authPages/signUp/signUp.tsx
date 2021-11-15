import React, { FC, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { useSnackbar, VariantType } from "notistack";

import { LandingPageLayout } from "../../../layout/landingPageLayout";
import { AuthActionCreator } from "../../../store/actions/authActions/authActions";
import { useStyles } from "./styles";

interface AuthProps {
  changeView: () => void;
}

export const SignUpPage: FC<AuthProps> = ({ changeView }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();
  const handleSnackAction = (text: string, variant: VariantType) => {
    enqueueSnackbar(text, { variant });
  };

  const [formFields, setFormFields] = useState({
    eMail: "",
    password: "",
    fullName: "",
  });
  const handleFormFields = (e: any) =>
    setFormFields({ ...formFields, [e.target.name]: e.target.value });

  return (
    <LandingPageLayout>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item md={6} className={classes.formCard}>
          <div>
            <Box display="flex" justifyContent="center" alignItems="center">
              <AssignmentIndIcon color="secondary" />
            </Box>
            <Typography variant="body1" align="center">
              hello, sign up and join the best jotter community.
            </Typography>
            <Box mt={3}>
              <TextField
                label="full name"
                color="secondary"
                fullWidth
                name="fullName"
                onChange={handleFormFields}
                value={formFields.fullName}
              />
            </Box>
            <Box mt={3}>
              <TextField
                label="e-mail"
                color="secondary"
                fullWidth
                name="eMail"
                onChange={handleFormFields}
                value={formFields.eMail}
                autoComplete="false"
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
                  formFields.eMail !== "" &&
                  formFields.password !== "" &&
                  formFields.fullName !== ""
                    ? dispatch(
                        AuthActionCreator(
                          formFields,
                          "sign-up",
                          history,
                          handleSnackAction
                        )
                      )
                    : handleSnackAction(
                        "e-mail, fullname and password cannot be empty",
                        "error"
                      );
                  setFormFields({ fullName: "", eMail: "", password: "" });
                }}
              >
                sign up
              </Button>
            </Box>
            <Box display="flex" justifyContent="center">
              <Typography variant="body2">Already have an account?</Typography>
              <Box mx={0.5} className={classes.signUp} onClick={changeView}>
                <Typography variant="body2" color="secondary">
                  sign in
                </Typography>
              </Box>
            </Box>
          </div>
        </Grid>
      </Grid>
    </LandingPageLayout>
  );
};

export { SignUpPage as default };
