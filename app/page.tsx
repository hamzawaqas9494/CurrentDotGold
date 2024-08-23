import React from "react";
import type { NextPage } from "next";
import {
  GoldCalculator,
  GoldInvestment,
  GoldRateComparison,
  GoldRatesGeneral,
  GoldRatesPak,
  HeroSection,
  MobileApp,
  Subscribe,
  WhoWeAre,
} from "./components/Home";
import { Footer } from "@/app/ui/Footer";

const HomePage: NextPage = () => {
  return (
    <React.Fragment>
      <HeroSection />
      <WhoWeAre />
      <GoldCalculator />
      <GoldRatesGeneral />
      <GoldRatesPak />
      <GoldRateComparison />
      <GoldInvestment />
      <Subscribe />
      <MobileApp />
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;
