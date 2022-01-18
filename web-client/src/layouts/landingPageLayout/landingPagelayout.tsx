import { FC } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { Navbar } from "./components/navbar/navbar";

export const LandingPageLayout: FC = ({ children }) => {
  return (
    <Container>
      <Box p={1}>
        <Navbar />
        {children}
      </Box>
    </Container>
  );
};

export { LandingPageLayout as default };
