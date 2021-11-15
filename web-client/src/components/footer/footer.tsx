import React, { FC } from "react";

import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";

import { useStyles } from "./styles";

export const Footer: FC = () => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      width="100%"
      bgcolor="#800080"
      alignItems="center"
      px={5}
    >
      <p></p>
      <Box fontSize={12} color="white">
        <p>copyright louis.inc</p>
      </Box>
      <p></p>
    </Box>
  );
};

export { Footer as default };
