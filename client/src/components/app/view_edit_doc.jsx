import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { convertFromRaw, converToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ViewEditComp = () => {
  return (
    <div>
      <Box>
        <Typography variant="body2" color="inherit" align="center">
          dummy_doc_3439894
        </Typography>
      </Box>
    </div>
  );
};

export default ViewEditComp;
