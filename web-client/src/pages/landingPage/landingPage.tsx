import { FC } from "react";

import { LandingPageLayout } from "../../layouts/landingPageLayout";
import { HeroSection } from "./components/heroSection";

export const LandingPage: FC = () => (
  <LandingPageLayout>
    <HeroSection />
  </LandingPageLayout>
);

export { LandingPage as default };
