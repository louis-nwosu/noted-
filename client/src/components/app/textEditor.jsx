import React, { Component } from "react";
import { convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";  //here
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const content = {
  entityMap: {},
  blocks: [
    {  //here
      key: "637gr",
      text: "",  
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};

class TextEditor extends Component {
  constructor(props) {
    super(props);
    const contentState = convertFromRaw(content);
    this.state = {
      contentState,
    };
  }

  onContentStateChange = (contentState) => {
    this.setState({
      contentState,
    });
  };

  render() {
    const { contentState } = this.state;
    console.log(contentState)
    return (
      <div>
        <Container fluid>
          <Grid container justify='center'>
            <Grid item md={10} xs={11}>
              <Editor
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                onContentStateChange={this.onContentStateChange}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default TextEditor;
