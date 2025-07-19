
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Types
type SpreadPrice = {
  spreadProfile: string;
  bidSpread: number;
  askSpread: number;
  bid: number;
  ask: number;
};

// Context type
const GoldRateContext = createContext<{
  todayRateusd: number;
  todayRatepkr: number;
  silverRateUsd: number;
  silverRatePkr: number;
  live: number;
  silverLive: number;
  yesterdayRate: number;
  isLoading: boolean;
  error: string | null;
  currencyLiveUsd: number;
  currencyLivePkr: number;
  currencyLive: number;
}>({
  currencyLive: 0,
  live: 0,
  silverLive: 0,
  todayRateusd: 0,
  todayRatepkr: 0,
  silverRateUsd: 0,
  silverRatePkr: 0,
  yesterdayRate: 0,
  isLoading: true,
  error: null,
  currencyLiveUsd: 1,
  currencyLivePkr: 0,
});

export const useGoldRate = () => useContext(GoldRateContext);

type GoldRateProviderProps = {
  children: React.ReactNode;
};

export const GoldRateProvider: React.FC<GoldRateProviderProps> = ({ children }) => {
  const [live, setLive] = useState<number>(0);
  const [silverLive, setSilverLive] = useState<number>(0);
  const [currencyLive, setCurrencyLive] = useState<number>(0);
  const [currencyLiveUsd, setCurrencyLiveUsd] = useState<number>(1);
  const [currencyLivePkr, setCurrencyLivePkr] = useState<number>(0);
  const [yesterdayRate, setYesterdayRate] = useState<number>(50000);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoldRate = async () => {
    try { 
      const res = await fetch("/api/gold-silver-currency");
      const data = await res.json();
      if (!res.ok) throw new Error(`API failed: ${res.status}`);

      // GOLD data
      const goldData = data.data.find((item: any) => item.type === "gold");
      if (!goldData) throw new Error("Gold data missing");

      const goldprime = goldData.prices.find((p: SpreadPrice) => p.spreadProfile === "prime");
      if (!goldprime) throw new Error("Gold prime spread not found");

      setLive(goldprime.bid);

      // SILVER data
      const silverData = data.data.find((item: any) => item.type === "silver");
      if (!silverData) throw new Error("Silver data missing");

      const silverprime = silverData.prices.find((p: SpreadPrice) => p.spreadProfile === "prime");
      if (!silverprime) throw new Error("Silver prime spread not found");

      setSilverLive(silverprime.bid);

      // CURRENCY data
      const currencyData = data.data.find((item: any) => item.type === "currency");
      if (currencyData && currencyData.rates) {
        setCurrencyLive(currencyData.rates);
        setCurrencyLiveUsd(currencyData.rates.usd || 1);
        setCurrencyLivePkr(currencyData.rates.pkr || 0);
      } else {
        console.warn("Currency data missing or invalid");
      }

    } catch (err: any) {
      console.error("Fetch error:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoldRate();
    const interval = setInterval(fetchGoldRate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GoldRateContext.Provider
      value={{
        currencyLive,
        live,
        silverLive,
        todayRateusd: live * currencyLiveUsd,
        todayRatepkr: live * currencyLivePkr,
        silverRateUsd: silverLive * currencyLiveUsd,
        silverRatePkr: silverLive * currencyLivePkr,
        currencyLiveUsd,
        currencyLivePkr,
        yesterdayRate,
        isLoading,
        error,
      }}
    >
      {children}
    </GoldRateContext.Provider>
  );
};
