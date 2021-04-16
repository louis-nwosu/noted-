import React from "react";

//import components
import Navbar from "./navbar";
import HeroSection from "./hero.section";
import BrandSection from "./brand.section";
import Features from "./features";
import Why from "./why";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BrandSection />
      <Features />
      <Why />
    </>
  );
};

export default LandingPage;
