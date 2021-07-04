//ACTIONS AVAILABLE
export const actions = {
  createAccount: {
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
  fetchDoc: {
    getDocs: "GET_DOCS",
    getDocsSuccess: "GET_DOCS_SUCCESS",
    getDocsFailure: "GET_DOCS_FAILURE",
  },
  postDoc: {
    postDocs: "POST_DOC",
    postDocsSuccess: "POST_DOCS_SUCCESS",
    postDocsFailure: "POST_DOCS_FAILURE",
  },
  fetchSingleDoc: {
    getSingleDoc: "GET_SINGLE_DOC",
    getSingleDocSuccess: "GET_SINGLE_DOC_SUCCESS",
    getSingleDocFailure: "GET_SINGLE_DOC_FAILURE",
  },
};

//-------------------ACTIONS TO CREATE ACCOUNT------------------------------
const submitForm = () => ({
  type: actions?.createAccount?.submitForm,
});

const submitFormSuccess = (payload) => ({
  type: actions?.createAccount?.submitFormSuccess,
  payload,
});

const submitFormFailure = () => ({
  type: actions?.createAccount?.submitFormFailure,
});

//an async function to handle the submition of user details to the backend
export function createAccount(userData, history) {
  return async (dispatch) => {
    //change the state of the applciation to notifybthe user about the delay
    dispatch(submitForm());
    try {
      //make a post request to send the user entered data
      const data = await fetch("http://localhost:8080/noted/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const user = await data.json();
      //send the return user to the redux store
      dispatch(submitFormSuccess(user.user));
      //collect the token and save in localStorage
      localStorage.setItem("token", user?.token);
      localStorage.setItem("user_id", user.use._id);
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
  type: actions.actionLoginActions.submitFormSuccess,
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
      const user = await fetch("http://localhost:8080/noted/login-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      //send the return user to the redux store
      const user_json = await user.json();
      dispatch(submitLogInFormSucces(user_json.user));
      //collect the token and save in localStorage
      localStorage.clear();
      localStorage.setItem("token", user_json.token);
      localStorage.setItem("user_id", user_json.user._id);
      //send the user to the notes app
      if (user_json.token) {
        history.push("/noted");
      }
    } catch (error) {
      console.log(error);
      dispatch(submitLogInFormfailure());
    }
  };
}

//--------POST NEW NOTE---------
const postNewNote = () => ({
  type: actions?.postDoc?.postDocs,
});

const postNewNoteSuccess = (payload) => ({
  type: actions?.postDoc?.postDocsSuccess,
  payload,
});

const postNoteFailure = () => ({
  type: actions?.postDoc?.postDocsFailure,
});

export function PostNoteSingle(document, id) {
  return async (dispatch) => {
    //change the state to display loading spinner
    dispatch(postNewNote());
    try {
      // make a network request to post a new note
      const docs = await fetch(`http://localhost:8080/noted/postdoc/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: document,
      });
      // const docs_json = await docs.json();
      // update the store to reflect the new note!
      // dispatch(postNewNoteSuccess(docs_json));
    } catch (error) {
      //handle error if any
      dispatch(postNoteFailure());
    }
  };
}

//GET ALL NOTES------------------------------------------
const fetchDocs = () => ({
  type: actions.fetchDoc?.getDocs,
});

const getDocsSuccess = (payload) => ({
  type: actions.fetchDoc?.getDocsSuccess,
  payload,
});

const getDocsFailure = () => ({
  type: actions.fetchDoc?.getDocsFailure,
});

export function FetchDocs(id) {
  return async (dispatch) => {
    //change the state of the application to display the loading spinner
    dispatch(fetchDocs());
    try {
      //fetch the documents with users ID
      const data = await fetch(`http://localhost:8080/noted/${id}`);
      const docs = await data.json();
      dispatch(getDocsSuccess(docs.user_Docs));
      console.log(docs)
      localStorage.setItem("docs_collection_id", docs._id);
    } catch (error) {
      //display an error message if anything goes wrong
      dispatch(getDocsFailure());
    }
  };
}

//action to get single note--------------------------------
const getSingleDoc = () => ({
  type: actions.fetchSingleDoc.getSingleDoc,
});

const getSingleDocSuccess = (payload) => ({
  type: actions.fetchSingleDoc.getSingleDocSuccess,
  payload,
});

const getSingleDocFailure = () => ({
  type: actions.fetchSingleDoc.getSingleDocFailure,
});

export function asyncGetSingleDoc(payload, id) {
  return async (dispatch) => {
    dispatch(getSingleDoc());
    try {
      const data = await fetch(
        `http://localhost:8080/noted/get-single-doc/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const singleDoc = await data.json();
      console.log(singleDoc);
    } catch (error) {
      dispatch(getSingleDocFailure());
    }
  };
}
