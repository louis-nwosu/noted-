import { LandingNav } from "../../components/landing/LandingNav";
import { HeroSection } from "../../components/landing/HeroSection";
import { TickerBar } from "../../components/landing/TickerBar";
import { FeatureCards } from "../../components/landing/FeatureCards";
import { EditorCallout } from "../../components/landing/EditorCallout";
import { PrivacySection } from "../../components/landing/PrivacySection";
import { IntegrationsSection } from "../../components/landing/IntegrationsSection";
import { PullQuote } from "../../components/landing/PullQuote";
import { FaqSection } from "../../components/landing/FaqSection";
import { CtaSection } from "../../components/landing/CtaSection";
import { LandingFooter } from "../../components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      <TickerBar />
      <LandingNav />
      <HeroSection />
      <FeatureCards />
      <EditorCallout />
      <PrivacySection />
      <IntegrationsSection />
      <PullQuote />
      <FaqSection />
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
