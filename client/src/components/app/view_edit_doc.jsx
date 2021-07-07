import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { convertFromRaw, converToRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../../App.css";

const useStyles = makeStyles((theme) => ({
  editIconSec: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container: {
    padding: theme.spacing(2.5),
  },
}));

const ViewEditComp = ({ match }) => {
  const classes = useStyles();
  const [document, setDocument] = React.useState(null);
  const [readOnly, setReadOnly] = React.useState(true);

  const handleReadOnly = () => setReadOnly(!readOnly);

  React.useEffect(async () => {
    //async function to fetch all the docs!
    const data = await fetch(
      `http://localhost:8080/noted/get-single-doc/${
        match.params.date
      }/${localStorage.getItem("docs_collection_id")}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ID: match.params.id }),
      }
    );
    const singleDoc = await data.json();
    setDocument(singleDoc);
  }, []);

  console.log(document);

  const docContent = () => {
    if (document === null) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <CircularProgress color="inherit" />
        </div>
      );
    } else {
      return (
        <div className={classes.container}>
          <Grid container>
            <Grid item md={2} xs={2}>
              <ArrowBackIcon />
            </Grid>
            <Grid item md={8} xs={8}>
              <Typography variant="body1" color="inherit" align="center" noWrap>
                {document.docFile[0].doc_title}
              </Typography>
            </Grid>
            <Grid item xs={2} md={2} className={classes.editIconSec}>
             <div onClick={handleReadOnly}>
             <EditIcon/>
             </div>
            </Grid>
          </Grid>
        </div>
      );
    }
  };
  return (
    <React.Fragment>
      <div>{docContent()}</div>
      <div>
        {document !== null && (
          <Editor
          //  editorState={document.docFile[0].doc_body.body}
            onContentStateChange={document.docFile[0].doc_body.body}
            wrapperClassName=""
            editorClassName="editorClassName"
            toolbarClassName="toolbarClassName"
            spellCheck
            readOnly={readOnly}
            toolbarHidden={readOnly}
            toolbar={{
              options: ["inline", "textAlign", "list"],
              inline: {
                inDropdown: false,
                className: "test",
                component: undefined,
                dropdownClassName: undefined,
                options: ["bold", "italic", "underline"],
                bold: { className: "test", style: { color: "red" } },
                italic: { className: undefined },
                underline: { className: undefined },
              },
            }}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default ViewEditComp;
