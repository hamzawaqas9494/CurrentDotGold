"use client";
import React, { useEffect, useState, useMemo, FC } from "react";
import { Loader } from "@/app/ui";
import { useGoldRate } from "@/context/GoldRateContext";
import { Units } from "@/common.types";
import formatDate from "@/helpers/dateFormatter";

const GoldCalculator: FC = () => {
  const { isLoading, error, live, currencyLive } = useGoldRate();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [weight, setWeight] = useState<number>(1);
  const [units, setUnits] = useState<Units>(Units.Grams);
  const [purity, setPurity] = useState<number>(24);
  const [country, setCountry] = useState<string>("Pakistan");
  const [priceLocked, setPriceLocked] = useState<boolean>(false);

  const countryMap: Record<string, string> = {
    usd: "USA",
    aed: "United Arab Emirates",
    inr: "India",
    pkr: "Pakistan",
    sar: "Saudi Arabia",
    krw: "Korea",
  };

  const countries1: Record<string, { rate: number; currency: string }> = {};
  for (const [code, rate] of Object.entries(currencyLive)) {
    const countryName = countryMap[code];
    if (countryName) {
      countries1[countryName] = {
        rate,
        currency: code,
      };
    }
  }
  const { rate: todayRate, currency } = countries1[country] || {
    rate: live,
    currency: "USD",
  };
  const goldRatesByCountry = useMemo(() => {
    if (!todayRate) return [];

    return [
      {
        country,
        units: Units.Ounces,
        purity: 24,
        rate: todayRate * live,
        currency,
      },
      {
        country,
        units: Units.Ounces,
        purity: 22,
        rate: ((todayRate * live) / 24) * 22,
        currency,
      },
      {
        country,
        units: Units.Ounces,
        purity: 21,
        rate: ((todayRate * live) / 24) * 21,
        currency,
      },
      {
        country,
        units: Units.Grams,
        purity: 24,
        rate: (todayRate * live) / 31.1,
        currency,
      },
      {
        country,
        units: Units.Grams,
        purity: 22,
        rate: (0.9166 * 11.6638 * (todayRate * live)) / 31.1 / 11.663,
        currency,
      },
      {
        country,
        units: Units.Grams,
        purity: 21,
        rate: (0.875 * 11.6638 * (todayRate * live)) / 31.1 / 11.6638,
        currency,
      },
      {
        country,
        units: Units.Tola,
        purity: 24,
        rate: ((todayRate * live) / 31.1) * 11.6638,
        currency,
      },
      {
        country,
        units: Units.Tola,
        purity: 22,
        rate: (0.9166 * 11.6638 * (todayRate * live)) / 31.1,
        currency,
      },
      {
        country,
        units: Units.Tola,
        purity: 21,
        rate: (0.875 * 11.6638 * (todayRate * live)) / 31.1,
        currency,
      },
    ];
  }, [country, todayRate, live]);

  useEffect(() => {
    if (!priceLocked) {
      setTotalPrice(
        calculateTotalPrice(weight, goldRatesByCountry, units, purity, country)
      );
    }
  }, [weight, units, purity, country, goldRatesByCountry, priceLocked]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value, "event");
    setCountry(event.target.value);
    setPriceLocked(false);
  };

  const handleUnitsChange = (newUnits: Units) => {
    setUnits(newUnits);
    setPriceLocked(false);
  };

  const handlePurityChange = (newPurity: number) => {
    setPurity(newPurity);
    setPriceLocked(false);
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(event.target.value)); // Prevent negative values
    setWeight(value);
    setPriceLocked(false);
  };

  const calculateTotalPrice = (
    weight: number,
    goldRates: {
      country: string;
      units: Units;
      purity: number;
      rate: number;
      currency: string;
    }[],
    units: Units,
    purity: number,
    country: string
  ) => {
    const selectedRate = goldRates.find(
      (r) => r.units === units && r.purity === purity && r.country === country
    );
    return selectedRate ? selectedRate.rate * weight : 0;
  };

  return (
    <section
      id="gold-exhibition"
      data-testid="gold-calculator"
      className="relative h-[calc(100vh_-_40vh)] bg-[url('/assets/gold-exibition.png')] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-black/70 px-1">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
          Today's Gold Price{" "}
          <span className="text-yellow-500">{formatDate(new Date())}</span>
        </h2>
        <div>
          <select
            value={country}
            onChange={handleCountryChange}
            className="mb-4 px-2 py-1 rounded-full"
          >
            {Object.keys(countries1).map((countryName) => (
              <option key={countryName} value={countryName}>
                {countryName}
              </option>
            ))}
          </select>
        </div>
        <div className="space-x-2 space-y-2 md:space-x-5">
          <button
            className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
              units === Units.Grams
                ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
                : ""
            }`}
            onClick={() => handleUnitsChange(Units.Grams)}
          >
            Gram
          </button>
          <button
            className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
              units === Units.Tola
                ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
                : ""
            }`}
            onClick={() => handleUnitsChange(Units.Tola)}
          >
            Tola
          </button>
          <button
            className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
              units === Units.Ounces
                ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
                : ""
            }`}
            onClick={() => handleUnitsChange(Units.Ounces)}
          >
            Ounce
          </button>
        </div>
        <div className="space-x-2 md:space-x-5">
          <button
            className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
              purity === 24
                ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
                : ""
            }`}
            onClick={() => handlePurityChange(24)}
          >
            24k
          </button>
          <button
            className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
              purity === 22
                ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
                : ""
            }`}
            onClick={() => handlePurityChange(22)}
          >
            22k
          </button>
          <button
            className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
              purity === 21
                ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
                : ""
            }`}
            onClick={() => handlePurityChange(21)}
          >
            21k
          </button>
        </div>
        <input
          type="number"
          value={weight}
          onChange={handleWeightChange}
          className="mt-4 w-full max-w-xs rounded-lg p-2 text-center"
          placeholder="Enter weight"
          min="0"
        />
        <p className="mt-2 text-2xl font-bold text-white">
          Total Price: {totalPrice.toFixed(2)} {currency}
        </p>
        {isLoading && <Loader />}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </section>
  );
};

export default GoldCalculator;
