export const actions = {
  actionCreateActions: {
    submitForm: "SUBMIT_FORM",
    submitFormSuccess: "SUBMIT_FORM_SUCCESS",
    submitFormFailure: "SUBMIT_FORM_FAILURE",
  },
};

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

//an async functio to handle the submition of user details to the backend
export function Register(userData, history) {
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
      //send the return user to the redux store
      dispatch(submitFormSuccess(user));
      //collect the token and save in localStorage
      localStorage.setItem("token", user.data.token);
      //send the user to the notes app
      history.push("/notes");
    } catch (error) {
      console.log(error);
      dispatch(submitFormFailure);
    }
  };
}
