import { FC } from "react";

// import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material";

import { EmptyPage } from "../empty/empty";
import { DocPreview } from "../../components";

const dummyDoc: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexWrap: "wrap",
      display: "flex",
      width: "100%",
    },
  })
);

export const AllDocs: FC = () => {
  const classes = useStyles();

  // const state = useSelector((state: any) => state)
  return (
    <Box p={2}>
      {dummyDoc.length !== 0 ? (
        
        <Box my={7} className={classes.container}>
          {dummyDoc.map((item: any) => (
            <DocPreview />
          ))}
        </Box>
      ) : (
        <EmptyPage text="document" />
      )}
    </Box>
  );
};

export { AllDocs as default };
