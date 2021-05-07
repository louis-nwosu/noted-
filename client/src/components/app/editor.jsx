import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertToRaw } from "draft-js";
//import styling
import "../../App.css";
//import materialUI components
import { Grid, Typography, Button } from "@material-ui/core";

const TextEditor = () => {
  let _contentState = ContentState.createFromText("");
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw); // ContentState JSON
  const getNote = () => console.log(contentState);
  return (
    <div className="App">
      <Grid container justify="space-between" align="center">
        <grid item xs={8} md={8}>
          <Typography variant="body1" color="initial">
            Enter your text here
          </Typography>
        </grid>
        <grid item xs={4} md={4}>
          <Button variant="contained" color="primary" onClick={getNote}>
            save
          </Button>
        </grid>
      </Grid>
      <Editor
        defaultContentState={contentState}
        onContentStateChange={setContentState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  );
};
export default TextEditor;
