import React, { FC } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Loader from "react-loader-spinner";

import { useStyles } from "./styles";

export const NoNotes: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div>
        <Loader type="MutatingDots" width={100} height={100} color="#800080" />
        <p className={classes.loaderTextStyle}>You don't have any notes yet</p>
        <Box ml={5}>
          <Button variant="contained" color="secondary">
            Add
          </Button>
        </Box>
      </div>
    </div>
  );
};
