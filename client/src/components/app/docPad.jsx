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
    top: 0,
    left: 0,
    width: "100%",
    height: "87%",
    transition: `transform .2s ease-in-out`,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    // opacity: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    justifyContent: "space-between",
    transform: `translateY(15px)`,
    "&:hover": {
      top: 10,
      transform: `translateY(10px)`,
      opacity: 1,
    },
  },
  previewHeader: {
    color: "#fff",
    transition: "transform .2s ease-in-out",
  },
  hidePreviewHeader: {
    transition: "transform .2s ease-in-out",
    transform: `translateX(80px)`,
  },
}));

const DocPad = () => {
  const classes = useStyles();
  const [isPreviewHidden, setIsPreviewHidden] = React.useState(false);
  const handleSetPreview = () => {
    setIsPreviewHidden(!isPreviewHidden);
    console.log("clicked");
  };
  return (
    <React.Fragment>
      <Box px={1} marginY={1} position="relative" zIndex={-1000}>
        <div className={classes.docPad}>
          <Box boxShadow={3} px={2} py={1}>
            <h1
              className={
                isPreviewHidden
                  ? classes.hidePreviewHeader
                  : classes.previewHeader
              }
            >
              Think, louis
            </h1>
            <p
              style={
                isPreviewHidden
                  ? { opacity: 0 }
                  : { marginTop: 7, color: "#fff" }
              }
            >
              The mind is a dangerous place, but i love it there...
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
          <div
            onClick={handleSetPreview}
            style={{
              display: "inline-block",
              width: "10%",
              textAlign: "center",
            }}
          >
            <RemoveRedEyeOutlinedIcon />
          </div>
        </div>
      </Box>
    </React.Fragment>
  );
};

export default DocPad;
