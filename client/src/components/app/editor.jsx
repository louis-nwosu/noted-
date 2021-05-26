import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertToRaw } from "draft-js";
//import styling
import "../../App.css";
//import materialUI components
import { Grid, Typography, Button } from "@material-ui/core";

const TextEditor = ({ getDoc }) => {
  let _contentState = ContentState.createFromText("");
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw);
  const [docContent, setDocContent] = React.useState("");
  const getNote = () => setDocContent(contentState.blocks[0].text);
  return (
    <div className="App">
      <Grid container justify="space-between" align="center">
        <grid item xs={8} md={8}>
          <Typography variant="body1" color="initial">
            Enter your text here
          </Typography>
        </grid>
        <grid item xs={4} md={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              getDoc({
                title: "omooo",
                description: docContent,
                category: "mint",
              });
            }}
          >
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
        onChange={getNote}
      />
    </div>
  );
};
export default TextEditor;
