import { LandingNav } from '../../components/landing/LandingNav';
import { HeroSection } from '../../components/landing/HeroSection';
import { TickerBar } from '../../components/landing/TickerBar';
import { FeatureCards } from '../../components/landing/FeatureCards';
import { EditorCallout } from '../../components/landing/EditorCallout';
import { PrivacySection } from '../../components/landing/PrivacySection';
import { PullQuote } from '../../components/landing/PullQuote';
import { CtaSection } from '../../components/landing/CtaSection';
import { LandingFooter } from '../../components/landing/LandingFooter';

export default function LandingPage() {
  return (
    <>
      <LandingNav />
      <HeroSection />
      <TickerBar />
      <FeatureCards />
      <EditorCallout />
      <PrivacySection />
      <PullQuote />
      <CtaSection />
      <LandingFooter />
    </>
  );
}
