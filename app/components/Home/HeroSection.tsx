
"use client";
import React, { useMemo, FC } from "react";
import { Units } from "@/common.types";
import { Navebar, Loader } from "@/app/ui";
import { useGoldRate } from "@/context/GoldRateContext";
import { Polygon } from "@/icons";

const HeroSection: FC = () => {
  const {
    todayRateusd,
    todayRatepkr,
    isLoading,
    live,
  } = useGoldRate();
  const goldRates = useMemo(() => {
    return [
      // TOla Rates
      {
        live,
        units: Units.Tola,
        purity: 24,
        rateUSD: todayRateusd * 0.375,
        ratePKR: todayRatepkr * 0.375,
      },
      {
        live,
        units: Units.Tola,
        purity: 22,
        rateUSD: (0.916 * 11.663 * todayRateusd) / 31.1,
        ratePKR: (0.916 * 11.663 * todayRatepkr) / 31.1,
      },
      {
        live,
        units: Units.Tola,
        purity: 21,
        rateUSD: (0.875 * 11.663 * todayRateusd) / 31.1,
        ratePKR: (0.875 * 11.663 * todayRatepkr) / 31.1,
      },
      // Ounce Rates
      {
        live,
        units: Units.Ounces ,
        purity: 24,
        rateUSD: todayRateusd,
        ratePKR: todayRatepkr,
      },
      {
        live,
          units: Units.Ounces,
        purity: 22,
        rateUSD: todayRateusd * 0.916,
        ratePKR: todayRatepkr * 0.916,
      },
      {
        live,
           units: Units.Ounces,
        purity: 21,
        rateUSD: todayRateusd * 0.875,
        ratePKR: todayRatepkr * 0.875,
      },
    ];
  }, [todayRateusd, todayRatepkr, live]);

  return (
    <header className="hero-sec relative h-[calc(100vh_-_50vh)] md:h-[calc(100vh_-_20vh)] bg-[url('/assets/hero.png')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 flex flex-col items-center justify-between bg-black/70">
        {/* Navbar */}
        <Navebar className="text-white" />

        <div className="space-y-5 px-2 pb-3 md:pb-16 text-center text-white text-lg font-bold">
          <h1 className="text-xl font-semibold md:text-4xl">
            BUY GOLD, SILVER, AT THESE{" "}
            <span className="text-3xl md:text-5xl">LIVE PRICES</span>
          </h1>

          <div className="justify-center gap-4 md:gap-16 flex flex-wrap">
            {isLoading ? (
              <Loader />
            ) : (
              goldRates.map((rate) => (
                <div
                  key={`${rate.units}-${rate.purity}`}
                  className="flex flex-col items-center space-y-1 md:space-y-4 text-white"
                >
                  <p className="text-xs md:text-xl font-bold">
                    {(rate.rateUSD || 0).toFixed(2)}{" "}
                    <span className="text-sm">USD</span>
                  </p>
                  <p className="text-xs md:text-xl font-bold">
                    {(rate.ratePKR || 0).toFixed(2)}{" "}
                    <span className="text-sm">PKR</span>
                  </p>
                  <Polygon />
                  <p className="text-sm">
                    {rate.units} | Purity: {rate.purity}
                  </p>
                </div>
              ))
            )}
          </div>

          <button className="rounded-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 py-2 px-7 text-sm md:text-base font-semibold tracking-wide text-white">
            GET STARTED
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
