import React, { FC } from "react";

import Grid from "@mui/material/Grid";

import { NoNotes } from "../noNotes/noNotes";
import { useStyles } from "./styles";

export const AllNotes: FC = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item md={12}>
        <NoNotes />
      </Grid>
    </Grid>
  );
};

export { AllNotes as default };
