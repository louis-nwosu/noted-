import { FC } from "react";

import { Box } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "25%",
    },
    previewBox: {
      border: "1px solid pink",
      height: "20vh",
      margin: theme.spacing(1.5, 2),
      borderRadius: theme.spacing(0.5)
    },
  })
);

export const DocPreview: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Box className={classes.previewBox}></Box>
    </div>
  );
};

export { DocPreview as default };
