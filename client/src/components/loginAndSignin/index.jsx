import React from "react";
//import material UI components
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
//import function from react-redux;
import { connect } from "react-redux";
//import the history object from react-router-dom;
import { useHistory } from "react-router-dom";
//import the actions to dispatch
import { createAccount, logIn } from "../../store/actions";

//import Local components
import Navbar from "../landingPage/navbar";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="nonsolouise.github.io">
        louis.dev
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  addMarg: {
    marginTop: "9%",
  },
}));

function Log({ isLoading, hasError, dispatch }) {
  //initialize the history hook
  const history = useHistory();
  //hold state to check which form is showing
  const [toggleForm, setToggleForm] = React.useState(true);
  //toggle the state to switch the form
  const handleToggler = () => setToggleForm(!toggleForm);
  //handle the dispatch requests
  const handleDispatch = (userData, logFunc) =>
    dispatch(logFunc(userData, history));
  //return either of the two components
  return toggleForm ? (
    <Signin toggle={handleToggler} dispatchHandler={handleDispatch} />
  ) : (
    <Signup toggle={handleToggler} dispatchHandler={handleDispatch} />
  );
}

function Signin({ toggle, dispatchHandler }) {
  const classes = useStyles();

  //initialize state to hold form state
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  //set the form fields according to the form data entered
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  //clear the form;
  const clearForm = () => {
    setPassword("");
    setEmail("");
  };

  return (
    <React.Fragment>
      <Navbar />
      <Container component="main" maxWidth="xs" className={classes?.addMarg}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleEmail}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                dispatchHandler({ email, password }, logIn);
                clearForm();
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={toggle}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}

function Signup({ toggle, dispatchHandler }) {
  const classes = useStyles();

  //initialize state to hold form state
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUserName] = React.useState("");
  //set the form fields according to the form data entered
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUserName(e.target.value);
  //dispatch the sign up event
  const handleSignup = () =>
    dispatchHandler({ username, email, password }, createAccount);
  //clear form
  const clearForm = () => {
    setUserName("");
    setPassword("");
    setEmail("");
  };

  return (
    <React.Fragment>
      <Navbar />
      <Container component="main" maxWidth="xs" className={classes?.addMarg}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="email"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={handleUsername}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleEmail}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                handleSignup();
                clearForm();
              }}
            >
              Sign up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={toggle}>
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  isLaoding: state?.isLoading,
  hasError: state?.hasError,
});

export default connect(mapStateToProps)(Log);
