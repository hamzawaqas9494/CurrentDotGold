"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Context to provide the gold rate data
const GoldRateContext = createContext<{
  todayRateusd: number;
  todayRatepkr: number;
  todayRateInr: number;
  todayRateSar: number;
  todayRateAed: number;
  todayRateusdLive: number;
  todayRatepkrLive: number;
  live: number;
  yesterdayRate: number;
  isLoading: boolean;
  error: string | null;
  currencyLive: number;
}>({
  live: 0,
  currencyLive: 0,
  todayRateusd: 0,
  todayRatepkr: 0,
  todayRateInr: 0,
  todayRateSar: 0,
  todayRateAed: 0,
  todayRateusdLive: 0,
  todayRatepkrLive: 0,
  yesterdayRate: 0,
  isLoading: true,
  error: null,
});

export const useGoldRate = () => useContext(GoldRateContext);

type GoldRateProviderProps = {
  children: React.ReactNode;
};

export const GoldRateProvider: React.FC<GoldRateProviderProps> = ({
  children,
}) => {
  const [todayRatepkr, setTodayRatepkr] = useState<number>(0);
  const [todayRateusd, setTodayRateusd] = useState<number>(0);
  const [todayRateSar, setTodayRateSar] = useState<number>(0);
  const [todayRateAed, setTodayRateAed] = useState<number>(0);
  const [todayRateInr, setTodayRateInr] = useState<number>(0);
  const [live, setLive] = useState<number>(0);
  const [currencyLive, setCurrencyLive] = useState<number>(0);
  // for live rate imedately update
  const [todayRatepkrLive, setTodayRatepkrLive] = useState<number>(0);
  const [todayRateusdLive, setTodayRateusdLive] = useState<number>(0);

  const [yesterdayRate, setYesterdayRate] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchLatestRate = async () => {
    try {
      const response = await fetch("/api/live-gold-rate/latest-live-goldrate");
      const data = await response.json();
      if (response.ok) {
        setTodayRatepkr(data.latestRate.gold_rate_pkr);
        setTodayRateusd(data.latestRate.gold_rate_usd);
        setTodayRateSar(data.latestRate.gold_rate_sar);
        setTodayRateAed(data.latestRate.gold_rate_uae);
        setTodayRateInr(data.latestRate.gold_rate_inr);

        setYesterdayRate(data.secondLatestRate.gold_rate_pkr);
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      setError("Failed to fetch latest rate.");
    }
  };
  useEffect(() => {
    fetchLatestRate();
    // const intervalId = setInterval(fetchLatestRate, 300000);
    // return () => clearInterval(intervalId);
  }, []);

  // take rate from another api
  const fetchLatestRatelive = async () => {
    try {
      const response = await fetch(
        "https://data-asg.goldprice.org/dbXRates/PKR,USD"
      );
      const dataLive = await response.json();
      if (response.ok) {
        setTodayRatepkrLive(dataLive.items[0].xauPrice);
        setTodayRateusdLive(dataLive.items[1].xauPrice);
      }
    } catch (error) {
      setError("Failed to fetch latest rate.");
    }
  };

  // for live update rate that change imedatly
  useEffect(() => {
    fetchLatestRatelive();
    const intervalId = setInterval(fetchLatestRatelive, 1000);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          "https://openexchangerates.org/api/latest.json?app_id=1bf504ba44da4e1eb440ca08143eda50"
        );
        const dataLive = await response.json();
        if (response.ok) {
          setCurrencyLive(dataLive.rates);
          throw new Error(`Error: ${response.status}`);
        }
      } catch (err) {}
    };

    fetchRates();
  }, []);
  // take rate from another api
  const fetchLatestRateliveSecond = async () => {
    try {
      const response = await fetch("/api/new-live-rate");
      const dataLive1 = await response.json();
      setLive(dataLive1.spreadProfilePrices[0].bid);
      // console.log(
      //   dataLive1.spreadProfilePrices,
      //   "dataLive1.spreadProfilePrices"
      // );
      // console.log(dataLive1.spreadProfilePrices[0].bid, "dataLive");
    } catch (error) {
      console.error("Failed to fetch latest rate.");
    }
  };

  // for live update rate that change imedatly
  useEffect(() => {
    fetchLatestRateliveSecond();
    const intervalId = setInterval(fetchLatestRateliveSecond, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <GoldRateContext.Provider
      value={{
        live,
        todayRateusd,
        todayRatepkr,
        todayRateSar,
        todayRateAed,
        todayRateInr,
        todayRateusdLive,
        todayRatepkrLive,
        currencyLive,
        yesterdayRate,
        isLoading,
        error,
      }}
    >
      {children}
    </GoldRateContext.Provider>
  );
};
