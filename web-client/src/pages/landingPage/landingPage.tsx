import { FC } from "react";

import { LandingPageLayout } from "../../layouts/landingPageLayout";
import {
  HeroSection,
  FeaturesOverview,
  AppOverview,
  TryNoted,
} from "./components";

export const LandingPage: FC = () => (
  <LandingPageLayout hasFooter>
    <HeroSection />
    <FeaturesOverview />
    <AppOverview />
    <TryNoted />
  </LandingPageLayout>
);

export { LandingPage as default };
