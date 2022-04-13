import { FC } from "react";

import { Box } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { purple } from "@mui/material/colors";

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
    },
    backdrop: {
      position: "absolute",
      width: "100%",
      backgroundColor: purple[800],
      height: "100%",
      borderRadius: theme.spacing(0.5)
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
      fontSize: "17px",
      color: "#fff",
      borderRadius: theme.spacing(0.5)
    },
  })
);

export const DocPreview: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Box className={classes.previewBox}>
        <div className={classes.backdrop}></div>
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
                style={{ fontSize: "14.5px" }}
              >
                item
              </span>
              <DeleteIcon style={{ fontSize: "inherit", color: "inherit" }} />
            </Box>
            <Box flex={1} onClick={() => console.log("i was clicked")}></Box>
            <Box p={0.5} style={{ fontSize: "12.5px" }}>
              Last modified: 12-05-22
            </Box>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export { DocPreview as default };
