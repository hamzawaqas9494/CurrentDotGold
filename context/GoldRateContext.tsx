"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Context to provide the gold rate data
const GoldRateContext = createContext<{
  todayRateusd: number;
  todayRatepkr: number;
  todayRateInr: number;
  todayRateSar: number;
  todayRateAed: number;
  yesterdayRate: number;
  isLoading: boolean;
  error: string | null;
}>({
  todayRateusd: 0,
  todayRatepkr: 0,
  todayRateInr: 0,
  todayRateSar: 0,
  todayRateAed: 0,
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
    // Fetch the latest rate on component mount
    fetchLatestRate();

    // Set up polling to fetch the latest rate every 5 minutes (300000 ms)
    const intervalId = setInterval(fetchLatestRate, 300000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <GoldRateContext.Provider
      value={{
        todayRateusd,
        todayRatepkr,
        todayRateSar,
        todayRateAed,
        todayRateInr,
        yesterdayRate,
        isLoading,
        error,
      }}
    >
      {children}
    </GoldRateContext.Provider>
  );
};
