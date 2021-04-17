//ACTIONS AVAILABLE
export const actions = {
  actionCreateActions: {
    submitForm: "SUBMIT_FORM",
    submitFormSuccess: "SUBMIT_FORM_SUCCESS",
    submitFormFailure: "SUBMIT_FORM_FAILURE",
  },
  actionLoginActions: {
    submitForm: "SUBMIT_FORM",
    submitFormSuccess: "SUBMIT_FORM_SUCCES",
    submitFormFailure: "SUBMIT_FORM_FAILURE",
  },
};

//-------------------ACTIONS TO CREATE ACCOUNT------------------------------
const submitForm = () => ({
  type: actions?.actionCreateActions?.submitForm,
});
const submitFormSuccess = (payload) => ({
  type: actions?.actionCreateActions?.submitFormSuccess,
  payload,
});
const submitFormFailure = () => ({
  type: actions?.actionCreateActions?.submitFormFailure,
});
//an async function to handle the submition of user details to the backend
export function createAccount(userData, history) {
  return async (dispatch) => {
    //change the state of the applciation to notifybthe user about the delay
    dispatch(submitForm());
    try {
      //make a post request to send the user entered data
      const user = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log(user);
      //send the return user to the redux store
      dispatch(submitFormSuccess(user));
      //collect the token and save in localStorage
      localStorage.setItem("token", user?.data?.token);
      //send the user to the notes app
      history.push("/notes");
    } catch (error) {
      console.log(error);
      dispatch(submitFormFailure());
    }
  };
}

//----------ACTIONS TO LOG INTO ACCOUNT---------------------
const submitLogInForm = () => ({
  type: actions?.actionLoginActions?.submitForm,
});
const submitLogInFormSucces = (payload) => ({
  type: actions?.actionLoginActions?.submitFormSuccess,
  payload,
});
const submitLogInFormfailure = () => ({
  type: actions?.actionLoginActions?.submitFormFailure,
});
export function logIn(userData, history) {
  return async (dispatch) => {
    //change the state of the applciation to notifybthe user about the delay
    dispatch(submitLogInForm());
    try {
      //make a post request to send the user entered data
      const user = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log(user);
      //send the return user to the redux store
      dispatch(submitLogInFormSucces(user));
      //collect the token and save in localStorage
      localStorage.setItem("token", user?.data?.token);
      //send the user to the notes app
      history.push("/notes");
    } catch (error) {
      console.log(error);
      dispatch(submitLogInFormfailure());
    }
  };
}
