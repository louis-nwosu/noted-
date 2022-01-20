import { FC } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export const TryNoted: FC = () => {
  return (
    <Grid container py={5}>
      <Grid item md={12}>
        <Typography variant="h4" color="secondary" align="center">
          Try noted for free now.
        </Typography>
        <Typography variant="h6" color="#555" align="center">
          Get started for free.
          <br />
          Add your whole team as your needs grow.
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" py={3}>
          <Button variant="outlined" color="secondary">
            Get Started
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export { TryNoted as default };
