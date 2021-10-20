import React, { FC } from "react";

import { NavBar } from "./components/navbar";
import { useStyles } from "./style";

export const LandingPageLayout: FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.navContainer}>
        <NavBar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export { LandingPageLayout as default };
