import React, { FC } from "react";

import { LandingPageLayout } from "../../layout/landingPageLayout";
import { Userbase } from "./components/userbase";
import { Hero } from "./components/hero";
// import { useStyles } from "./styles";

export const HomePage: FC = () => {
  return (
    <LandingPageLayout>
      <Hero />
      <Userbase />
    </LandingPageLayout>
  );
};
