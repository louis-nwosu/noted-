import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";

const useStyles = makeStyles((theme) => ({
  docPad: {
    backgroundColor: "#444",
    cursor: "pointer",
    // "&:hover": {
    //   backgroundColor: "#aa00ff",
    // },
  },
  docPadHoverSec: {
    position: "absolute",
    top: -10,
    left: 0,
    width: "100%",
    height: "87%",
    transition: `transform .2s ease-in-out`,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    opacity: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    justifyContent: "space-between",
    "&:hover": {
      top: 10,
      transform: `translateY(10px)`,
      opacity: 1,
    },
  },
}));

const DocPad = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box px={1} marginY={1} position="relative">
        <div className={classes.docPad}>
          <Box boxShadow={3} px={2} py={1}>
            <h1 style={{ color: "#fff" }}>testing</h1>
            <p style={{ marginTop: 7, color: "#fff" }}>
              lorem lorem lorem lorem lorem lorem lorem lorem lorem...
            </p>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <Typography variant="caption" color="textSecondary" align="right">
                Last modified: 21-03-21
              </Typography>
            </div>
          </Box>
        </div>
        <div className={classes.docPadHoverSec}>
          <Box align="right">
            <MoreIcon />
          </Box>
          <div style={{}}>
            <RemoveRedEyeOutlinedIcon />
          </div>
        </div>
      </Box>
    </React.Fragment>
  );
};

export default DocPad;
