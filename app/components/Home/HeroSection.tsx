"use client";
import React, { useEffect, useState, useMemo, FC } from "react";
import { Units } from "@/common.types";
import { Navebar, Loader } from "@/app/ui";
import { useGoldRate } from "@/context/GoldRateContext";
import { Polygon } from "@/icons";

interface UnitPrices {
  tola?: number;
  masha?: number;
  ratti?: number;
}

const HeroSection: FC = () => {
  const { todayRate, isLoading, error } = useGoldRate();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  console.log(todayRate, "todayRate hamza ");
  const goldRates = useMemo(() => {
    return [
      // Gold rates in Tola
      { units: Units.Tola, purity: 24, rate: todayRate * 0.375 },
      {
        units: Units.Tola,
        purity: 22,
        rate: (0.916 * 11.663 * todayRate) / 31.1,
      },
      {
        units: Units.Tola,
        purity: 21,
        rate: (0.875 * 11.663 * todayRate) / 31.1,
      },
    ];
  }, [todayRate]);

  return (
    <header className="hero-sec relative h-[calc(100vh_-_50vh)] md:h-[calc(100vh_-_20vh)] bg-[url('/assets/hero.png')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 flex  flex-col items-center justify-between bg-black/70">
        {/* main navigatoin */}
        <Navebar className="text-white" />
        <div className="space-y-5 px-2 pb-3 md:pb-16 text-center text-white">
          {/* title */}
          <h1 className="text-xl font-semibold md:text-4xl">
            BUY GOLD, SILVER, AT THESE{" "}
            <span className="text-3xl md:text-5xl">LIVE PRICES</span>
          </h1>
          {/* live prices */}
          <div className="justify-center gap-4 md:gap-16 flex">
            {isLoading ? (
              <Loader />
            ) : (
              goldRates.map((rate, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-1 md:space-y-4 text-white"
                >
                  <p className="text-xs md:text-4xl font-bold">
                    {rate.rate.toFixed(2)} <span className="text-sm">PKR</span>
                  </p>
                  <Polygon />
                  Purity: {rate.purity}
                </div>
              ))
            )}
          </div>

          <button className="rounded-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400  py-2  px-7 text-sm md:text-base font-semibold tracking-wide text-white">
            GET STARTED
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
