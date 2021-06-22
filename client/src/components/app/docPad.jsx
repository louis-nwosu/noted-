import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  docPad: {
    background: "#444",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#aa00ff",
    },
  },
  docPadHoverSec: {
    position: 'absolute',
    top: 0,
    right: 15,
  }
}));

const DocPad = () => {
    const classes = useStyles();
  return (
    <React.Fragment>
      <Box px={1} marginY={1} position='relative' zIndex={-1000}>
        <div className={classes.docPad}>
          <Box boxShadow={3} px={2} py={1}>
            <h1 style={{ color: "#fff" }}>testing</h1>
            <p style={{ marginTop: 7, color: "#fff" }}>
              lorem lorem lorem lorem lorem lorem lorem lorem lorem...
            </p>
            <Typography variant="body2" color="textSecondary" align="right">
              Last modified: 21-03-21
            </Typography>
          </Box>
        </div>
        <div className={classes.docPadHoverSec}>
          <p>testing</p>
        </div>
      </Box>
    </React.Fragment>
  );
};

export default DocPad;
