import { FC, useState } from "react";

import { Box, Typography, TextField, Button } from "@mui/material";
import { purple } from "@mui/material/colors";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface TopBarType {
  handleDocTitle: (title: string) => void;
}

export const TopBar: FC<TopBarType> = ({ handleDocTitle }) => {
  const [docTitle, setDocTitle] = useState<string>("");
  const handleSetDocTitle = (e: any) => {
    setDocTitle(e.target.value);
  };
  return (
    <Box pt={1} pb={2.5}>
      <Typography variant="h6" color={purple[800]} align={"center"}>
        Noted
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        pt={0.5}
        px={2}
        alignItems={"center"}
      >
        <Box display={"flex"} alignItems={"center"}>
          <ArrowBackIosIcon style={{ color: purple[800] }} />
          <Typography variant="body2" color={purple[800]}>
            Back
          </Typography>
        </Box>
        <Box>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Document title"
            value={docTitle}
            onChange={handleSetDocTitle}
          />
        </Box>
        <Button variant="outlined">Save</Button>
      </Box>
    </Box>
  );
};

export { TopBar as default };
