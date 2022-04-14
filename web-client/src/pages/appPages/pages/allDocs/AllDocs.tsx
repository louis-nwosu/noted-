import { FC } from "react";

// import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material";

import { EmptyPage } from "../empty/empty";
import { DocPreview } from "../../components";

const dummyDoc: Array<{
  date: string;
  docArr: Array<{
    content: number;
    type: "single" | "collection";
    preview: string;
  }>;
}> = [
  {
    date: "14-apr-2022",
    docArr: [
      {
        content: 1234567,
        type: "single",
        preview: "once upon a very very blue moon...",
      },
      {
        content: 1234567,
        type: "single",
        preview: "once upon a very very blue moon...",
      },
      // { content: 1234567, type: "single" },
      // { content: 1234567, type: "collection" },
      // { content: 1234567, type: "collection" },
      // { content: 1234567, type: "single" },
      // { content: 1234567, type: "collection" },
    ],
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexWrap: "wrap",
      display: "flex",
      width: "100%",
    },
    dateDisplay: {
      color: "#666",
      fontSize: "14px",
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
          {dummyDoc.map(
            (item: {
              date: string;
              docArr: Array<{
                content: number;
                type: "single" | "collection";
                preview: string;
              }>;
            }) => {
              return (
                <Box width={"100%"}>
                  <Box mx={1.5}>
                    <p className={classes.dateDisplay}>{item.date}</p>
                  </Box>
                  <div className={classes.container}>
                    {item.docArr.map(
                      (docs: {
                        content: number;
                        type: "single" | "collection";
                        preview: string;
                      }) => (
                        <DocPreview
                          PreviewType={docs.type}
                          content={docs.content}
                          preview={docs.preview} 
                        />
                      )
                    )}
                  </div>
                </Box>
              );
            }
          )}
        </Box>
      ) : (
        <EmptyPage text="document" />
      )}
    </Box>
  );
};

export { AllDocs as default };
