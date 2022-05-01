import { FC } from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material";

import { Editor } from "./components/editor";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(5, 1),
    },
  })
);

export const NewDoc: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Editor />
    </div>
  );
};

export { NewDoc as default };
