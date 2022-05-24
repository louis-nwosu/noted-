import { FC, useState, createContext } from "react";

import { Box, Grid } from "@mui/material";

import { TopBar } from "./components";

export const EditorStateContext = createContext({
  SetEditorBody: (body: string) => {},
});

export const NewDocLayout: FC = ({ children }) => {
  const [docTitle, setDocTitle] = useState<string>("");
  const [docBody, setDocBody] = useState<string>("");

  const handleDocTitle = (title: string) => setDocTitle(title);
  const handleDocBody = (body: string) => setDocBody(body);
  return (
    <Grid container>
      <Grid item md={12}>
        <EditorStateContext.Provider
          value={{
            SetEditorBody: handleDocBody,
          }}
        >
          <TopBar handleDocTitle={handleDocTitle} />
          <Box>{children}</Box>
        </EditorStateContext.Provider>
      </Grid>
    </Grid>
  );
};

export { NewDocLayout as default };
