import { FC, useState } from "react";

import { Box, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { purple } from "@mui/material/colors";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "25%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    previewBox: {
      border: `1px solid ${purple[800]}`,
      height: "20vh",
      margin: theme.spacing(1.5, 2),
      borderRadius: theme.spacing(0.5),
      position: "relative",
      boxShadow:
        "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    },
    previewBoxCollection: {
      border: `1px solid ${purple[800]}`,
      height: "20vh",
      margin: theme.spacing(1.5, 2),
      borderRadius: theme.spacing(0.5),
      position: "relative",
      boxShadow:
        "rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.2) 10px 15px",
    },
    backdrop: {
      position: "absolute",
      width: "100%",
      backgroundColor: purple[800],
      height: "100%",
      borderRadius: theme.spacing(0.5),
    },
    previewContent: {
      position: "absolute",
      width: "100%",
      height: "100%",
      overflow: "hidden",
    },
    overlayActionArea: {
      transform: "scale(2)",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        transform: "scale(1)",
      },
      fontSize: "14.5px",
      color: "#fff",
      borderRadius: theme.spacing(0.5),
    },
    contentPreviewHide: {
      transition: "all .5s ease-in-out",
      transform: "translateY(10px)",
      opacity: 0,
    },
    contentHeaderHide: {
      transition: "all .5s ease-in-out",
      transform: "translateX(150px) translateY(25px)  scale(2)",
      color: "#fff",
    },
    contentPreviewShow: {
      transition: "all .5s ease-in-out",
      transform: "translateY(0)",
      opacity: 1,
    },
    contentHeaderShow: {
      transition: "all .5s ease-in-out",
      transform: "translateX(0) translateY(0)  scale(1)",
      color: "#fff",
      margin: theme.spacing(4, 0.5),
    },
  })
);

export const DocPreview: FC<{
  PreviewType: "single" | "collection";
  content: number;
  preview: string;
}> = ({ PreviewType, content, preview }) => {
  const classes = useStyles();
  const [hidePreview, setHidePreview] = useState<boolean>(false);
  const handleSetPreview = () => setHidePreview(!hidePreview);
  return (
    <div className={classes.container}>
      <Box
        className={
          PreviewType === "single"
            ? classes.previewBox
            : classes.previewBoxCollection
        }
      >
        <div className={classes.backdrop}>
          <p
            className={
              hidePreview
                ? classes.contentHeaderHide
                : classes.contentHeaderShow
            }
          >
            {content}
          </p>
          <Box
            marginTop={-3.8}
            mx={0.5}
            className={
              hidePreview
                ? classes.contentPreviewHide
                : classes.contentPreviewShow
            }
          >
            <Typography fontSize={"14px"} color={"#fff"}>
              {preview}
            </Typography>
          </Box>
        </div>
        <div className={classes.previewContent}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"100%"}
            height={"100%"}
            className={classes.overlayActionArea}
            borderRadius={1}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              p={0.5}
            >
              <span
                onClick={() => console.log("clicked")}
                style={{ fontSize: "12.5px" }}
              >
                {PreviewType}
              </span>
              {hidePreview ? (
                <VisibilityOffIcon
                  style={{ fontSize: "inherit", color: "inherit" }}
                  onClick={handleSetPreview}
                />
              ) : (
                <RemoveRedEyeIcon
                  style={{ fontSize: "inherit", color: "inherit" }}
                  onClick={handleSetPreview}
                />
              )}
            </Box>
            <Box flex={1}></Box>
            <Box
              p={0.5}
              style={{ fontSize: "12.5px" }}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <span>Last modified: 12-05-22</span>
              <DeleteIcon style={{ fontSize: "16px", color: "inherit" }} />
            </Box>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export { DocPreview as default };
