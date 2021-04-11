import React from "react";

//import components
import Navbar from "./navbar";
import HeroSection from "./hero.section";
import BrandSection from "./brand.section";
import Features from "./features";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BrandSection />
      <Features />
    </>
  );
};

export default LandingPage;
