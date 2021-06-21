import React, { Component } from "react";
import { convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import "../../App.css";

const EditorTop = () => {
  return (
    <div>
      <Container fluid>
        <Grid container justify="space-between">
          <Grid item md={2} xs={2}>
            <Typography variant="body2" color="inherit">
              back
            </Typography>
          </Grid>
          <Grid item md={2} xs={2}>
            <Typography variant="body2" color="inherit" align="right">
              done
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const content = {
  entityMap: {},
  blocks: [
    {
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
    return (
      <Box marginY={2}>
        <Grid container justify="center">
          <Grid item md={10} xs={12}>
            <Box marginBottom={2}>
              <EditorTop />
            </Box>
          </Grid>
          <Hidden xsDown>
            <Grid item md={10} xs={12}>
              <Editor
                wrapperClassName=""
                editorClassName="editorClassName"
                toolbarClassName="toolbarClassName"
                onContentStateChange={this.onContentStateChange}
                spellCheck
                readOnly={false}
                placeholder="enter you document content here.."
                toolbar
              />
            </Grid>
          </Hidden>
          <Hidden smUp>
            <Container fluid>
              <Editor
                // editorState={contentState}
                onEditorStateChange={this.onContentStateChange}
                wrapperClassName=""
                editorClassName="editorClassName"
                toolbarClassName="toolbarClassName"
                placeholder="enter you document content here.."
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
            </Container>
          </Hidden>
        </Grid>
      </Box>
    );
  }
}

export default TextEditor;
