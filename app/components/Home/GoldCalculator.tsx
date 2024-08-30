"use client";
import React, { useEffect, useState, useMemo, FC } from "react";
import { Loader } from "@/app/ui";
import { useGoldRate } from "@/context/GoldRateContext";
import { Units } from "@/common.types";
import formatDate from "@/helpers/dateFormatter";

interface GoldRate {
  units: Units;
  purity: number;
  rate: number;
}

const calculateTotalPrice = (
  weight: number,
  goldRates: GoldRate[],
  units: Units,
  purity: number
) => {
  const selectedRate = goldRates.find(
    (r) => r.units === units && r.purity === purity
  );
  if (selectedRate) {
    // console.log(selectedRate,"selected rate")
    return selectedRate.rate * weight;
  }
  return 0;
};

const GoldCalculator: FC = ({}) => {
  const { todayRate, isLoading, error } = useGoldRate();

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [units, setUnits] = useState<Units>(Units.Grams);
  const [purity, setPurity] = useState<number>(24);

  const goldRates = useMemo(() => {
    return [
      // Gold rates in ounce
      { units: Units.Ounces, purity: 24, rate: todayRate },
      { units: Units.Ounces, purity: 22, rate: (todayRate / 24) * 22 },
      { units: Units.Ounces, purity: 21, rate: (todayRate / 24) * 21 },

      // Gold rates in gram
      { units: Units.Grams, purity: 24, rate: todayRate / 31.1 },
      {
        units: Units.Grams,
        purity: 22,
        rate: (0.9166 * 11.6638 * todayRate) / 31.1 / 11.663,
      },
      {
        units: Units.Grams,
        purity: 21,
        rate: (0.875 * 11.6638 * todayRate) / 31.1 / 11.6638,
      },

      // Gold rates in Tola
      { units: Units.Tola, purity: 24, rate: (todayRate / 31.1) * 11.6638 },
      {
        units: Units.Tola,
        purity: 22,
        rate: (0.9166 * 11.6638 * todayRate) / 31.1,
      },
      {
        units: Units.Tola,
        purity: 21,
        rate: (0.875 * 11.6638 * todayRate) / 31.1,
      },
    ];
  }, [todayRate]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(weight, goldRates, units, purity));
  }, [todayRate, weight, units, purity]);

  const handleUnitsChange = (newUnits: Units) => {
    setUnits(newUnits);
    setTotalPrice(calculateTotalPrice(weight, goldRates, newUnits, purity));
  };

  const handlePurityChange = (newPurity: number) => {
    setPurity(newPurity);
    setTotalPrice(calculateTotalPrice(weight, goldRates, units, newPurity));
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(event.target.value));
    setTotalPrice(calculateTotalPrice(weight, goldRates, units, purity));
  };

  return (
    <section
      id="gold-exhibition"
      data-testid="gold-calculator"
      className="relative h-[calc(100vh_-_40vh)] bg-[url('/assets/gold-exibition.png')] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-black/70 md:space-y-5 px-1">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
          Today's Gold Price{" "}
          <span className="text-yellow-500">{formatDate(new Date())}</span>
        </h2>
        <div className="space-x-2 space-y-2 md:space-x-5">
          <button
            className={`w-24 rounded-full py-1 sm:py-2  text-xl font-bold text-white md:w-28 ${
              units === "grams"
                ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
                : "bg-none"
            }  `}
            onClick={() => handleUnitsChange(Units.Grams)}
          >
            Gram
          </button>
          <button
            className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
              units === "tola"
                ? "bg-gradient-to-r from-yellow-600  via-yellow-500 to-yellow-400"
                : "bg-none"
            }  `}
            onClick={() => handleUnitsChange(Units.Tola)}
          >
            Tola
          </button>
          <button
            className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
              units === "ounces"
                ? "bg-gradient-to-r from-yellow-600  via-yellow-500 to-yellow-400"
                : "bg-none"
            }  `}
            onClick={() => handleUnitsChange(Units.Ounces)}
          >
            Ounce
          </button>
        </div>
        <div className="space-x-2 md:space-x-5">
          <button
            className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
              purity === 24
                ? "bg-gradient-to-r from-yellow-600  via-yellow-500 to-yellow-400"
                : "bg-none"
            }  `}
            onClick={() => handlePurityChange(24)}
          >
            24k
          </button>
          <button
            className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
              purity === 22
                ? "bg-gradient-to-r from-yellow-600  via-yellow-500 to-yellow-400"
                : "bg-none"
            }  `}
            onClick={() => handlePurityChange(22)}
          >
            22k
          </button>
          <button
            className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
              purity === 21
                ? "bg-gradient-to-r from-yellow-600  via-yellow-500 to-yellow-400"
                : "bg-none"
            }  `}
            onClick={() => handlePurityChange(21)}
          >
            21k
          </button>
        </div>
        <div>
          <input
            id="weight"
            type="number"
            value={weight}
            onChange={handleWeightChange}
            className="w-full rounded-full border border-gray-300 bg-gray-50 px-24 py-2 text-center text-sm text-gray-900 placeholder:font-semibold placeholder:text-slate-400 focus:outline-none"
            placeholder="Enter Weight"
          />
        </div>
        {error ? (
          <h2 className="text-center text-lg text-red-500">
            Error: Something bad happened. Please try again later!
          </h2>
        ) : (
          <React.Fragment>
            {isLoading ? (
              <Loader />
            ) : (
              <h2 className="text-4xl font-semibold text-white">
                {totalPrice.toFixed(3)} {""}
                <span className="text-lg">PKR</span>
              </h2>
            )}
          </React.Fragment>
        )}
      </div>
    </section>
  );
};

export default GoldCalculator;
