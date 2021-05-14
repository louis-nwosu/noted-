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
  actionsObj: {
    action: "PLAIN_ACTION",
    actionSuccess: "PLAIN_ACTION_SUCCESS",
    actionFailure: "PLAIN_ACTION_FAILURE",
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
      const data = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //TODO----send along jwt as well!!
        },
        body: JSON.stringify(userData),
      });
      const user = await data.json();
      console.log(user);
      //send the return user to the redux store
      dispatch(submitFormSuccess(user));
      //collect the token and save in localStorage
      // localStorage.setItem("token", user?.data?.token);
      //send the user to the notes app
      history.push("/noted");
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
    console.log(userData);
    dispatch(submitLogInForm());
    try {
      //make a post request to send the user entered data
      const user = await fetch("http://localhost:8080/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      //send the return user to the redux store
      const user_json = await user.json();
      dispatch(submitLogInFormSucces(user_json.thisUser));
      //collect the token and save in localStorage
      //TODO_------------
      // localStorage.setItem("token", user?.data?.token);
      //send the user to the notes app
      history.push("/noted");
    } catch (error) {
      console.log(error);
      dispatch(submitLogInFormfailure());
    }
  };
}

//--------POST NEW NOTE---------
const postNewNote = () => ({
  type: actions?.actionsObj.action,
});

const postNewNoteSuccess = (payload) => ({
  type: actions?.actionsObj.actionSuccess,
  payload,
});

const postNoteFailure = () => ({
  type: actions?.actionsObj.actionFailure,
});

export function PostNote(document) {
  return async (dispatch) => {
    //change the state to display loading spinner
    dispatch(postNewNote());
    try {
      //make a network request to post a new note
      const docs = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(document),
      });
      dispatch(postNewNoteSuccess(docs));
    } catch (error) {
      console.log(error);
      dispatch(postNoteFailure());
    }
  };
}

//GET ALL NOTES------------------------------------------
const fetchDocs = () => ({
  type: actions.actionsObj?.action,
});

const getDocsSuccess = (payload) => ({
  type: actions?.actionsObj?.actionSuccess,
  payload,
});

const getDocsFailure = () => ({
  type: actions?.actionsObj?.actionFailure,
});

export function FetchDocs(id) {
  return async (dispatch) => {
    //change the state of the application to display the loading spinner
    dispatch(fetchDocs());
    try {
      //fetch the documents with users ID
      const data = await fetch(`http://localhost:8080/notes/get-notes/${id}`);
      const docs = await data.json();
      console.log(docs);
    } catch (error) {
      //display an error message if anything goes wrong
      console.log(error);
      dispatch(getDocsFailure());
    }
  };
}
