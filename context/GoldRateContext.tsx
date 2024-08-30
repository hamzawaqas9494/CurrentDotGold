"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Context to provide the gold rate data
const GoldRateContext = createContext<{
  todayRate: number;
  yesterdayRate: number;
  isLoading: boolean;
  error: string | null;
}>({
  todayRate: 0,
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
  const [todayRate, setTodayRate] = useState<number>(0);
  const [yesterdayRate, setYesterdayRate] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchLatestRate = async () => {
    try {
      const response = await fetch("/api/live-gold-rate/latest-live-goldrate");
      const data = await response.json();
      console.log(data, "db gold rate");
      if (response.ok) {
        setTodayRate(data.latestRate.gold_rate);
        setYesterdayRate(data.secondLatestRate.gold_rate);
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      setError("Failed to fetch latest rate.");
    }
  };

  useEffect(() => {
    fetchLatestRate();
  }, []);

  return (
    <GoldRateContext.Provider
      value={{ todayRate, yesterdayRate, isLoading, error }}
    >
      {children}
    </GoldRateContext.Provider>
  );
};
