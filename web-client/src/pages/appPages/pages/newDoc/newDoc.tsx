import { FC, useContext } from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material";

import { NewDocLayout } from "../../../../layouts/newDocLayout";
import { Editor } from "./components/editor";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(1, 1),
      width: "75%",
      margin: "0 auto",
    },
  })
);

export const NewDoc: FC = () => {
  const classes = useStyles();
 

  return (
    <NewDocLayout>
      <div className={classes.container}>
        <Editor />
      </div>
    </NewDocLayout>
  );
};

export { NewDoc as default };
