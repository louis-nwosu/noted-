import { FC } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";

import { Navbar } from "./components/navbar/navbar";
import { Foooter } from "./components/footer/footer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nav: {
      position: "fixed",
      width: "95%",
      backgroundColor: "#fff",
      top: 0,
    },
  })
);

interface LandingPageProps {
  hasFooter: boolean;
}

export const LandingPageLayout: FC<LandingPageProps> = ({
  children,
  hasFooter,
}) => {
  const classes = useStyles();
  return (
    <div>
      <Container>
        <Box p={1}>
          <div className={classes.nav}>
            <Navbar />
          </div>
          {children}
        </Box>
      </Container>
      {hasFooter && <Foooter />}
    </div>
  );
};

export { LandingPageLayout as default };
