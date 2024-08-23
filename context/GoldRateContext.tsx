"use client";
import { apiBaseUrl } from "./constants";
import React, { createContext, useContext, useState, useEffect } from "react";

// Context to provide the gold rate data
const GoldRateContext = createContext<{
  todayRate: number;
  isLoading: boolean;
  error: string | null;
}>({
  todayRate: 0,
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log(todayRate, "todayRatetodayRate ckkfvsd;vlm;flke");
  const fetchGoldRate = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const jsonData = await response.json();
      const formData = new FormData();
      formData.append("gold_rate", jsonData.rates.PKRXAU.toString());
      formData.append("silver_rate", jsonData.rates.PKRXAG.toString());
      formData.append("custom_rate", jsonData.rates.PKRXCU.toString());
      await fetch("/api/live-gold-rate/add-live-goldrate", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      setError("Error fetching or sending gold rate.");
    }
  };

  const fetchLatestRate = async () => {
    try {
      const response = await fetch("/api/live-gold-rate/latest-live-goldrate");
      const data = await response.json();

      if (response.ok) {
        setTodayRate(data.rate.gold_rate);
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      setError("Failed to fetch latest rate.");
    }
  };

  useEffect(() => {
    fetchLatestRate();

    // const intervalId = setInterval(() => {
    //   fetchGoldRate();
    // }, 86400000);

    // return () => clearInterval(intervalId);
  }, []);

  return (
    <GoldRateContext.Provider value={{ todayRate, isLoading, error }}>
      {children}
    </GoldRateContext.Provider>
  );
};
