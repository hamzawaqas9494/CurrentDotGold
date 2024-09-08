// "use client";
// import React, { createContext, useContext, useState, useEffect } from "react";

// // Context to provide the gold rate data
// const GoldRateContext = createContext<{
//   todayRateusd: number;
//   todayRatepkr: number;
//   todayRateInr: number;
//   todayRateGbp: number;
//   todayRateAed: number;
//   yesterdayRate: number;
//   isLoading: boolean;
//   error: string | null;
// }>({
//   todayRateusd: 0,
//   todayRatepkr: 0,
//   todayRateInr: 0,
//   todayRateGbp: 0,
//   todayRateAed: 0,
//   yesterdayRate: 0,
//   isLoading: true,
//   error: null,
// });

// export const useGoldRate = () => useContext(GoldRateContext);

// type GoldRateProviderProps = {
//   children: React.ReactNode;
// };

// export const GoldRateProvider: React.FC<GoldRateProviderProps> = ({
//   children,
// }) => {
//   const [todayRateusd, setTodayRateusd] = useState<number>(0);
//   const [todayRatepkr, setTodayRatepkr] = useState<number>(0);
//   const [todayRateInr, setTodayRateInr] = useState<number>(0);
//   const [todayRateGbp, setTodayRateGbp] = useState<number>(0);
//   const [todayRateAed, setTodayRateAed] = useState<number>(0);

//   const [yesterdayRate, setYesterdayRate] = useState<number>(0);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const fetchLatestRate = async () => {
//     try {
//       const response = await fetch("/api/live-gold-rate/latest-live-goldrate");
//       const data = await response.json();
//       if (response.ok) {
//         setTodayRateusd(data.latestRate.gold_rate_usd);
//         setTodayRatepkr(data.latestRate.gold_rate_pkr);
//         setYesterdayRate(data.secondLatestRate.gold_rate_pkr);
//         setIsLoading(false);
//         setError(null);
//       }
//     } catch (error) {
//       setError("Failed to fetch latest rate.");
//     }
//   };

//   useEffect(() => {
//     fetchLatestRate();
//   }, []);

//   return (
//     <GoldRateContext.Provider
//       value={{
//         todayRateusd,
//         todayRatepkr,
//         todayRateInr,
//         todayRateGbp,
//         todayRateAed,
//         yesterdayRate,
//         isLoading,
//         error,
//       }}
//     >
//       {children}
//     </GoldRateContext.Provider>
//   );
// };
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Context to provide the gold rate data
const GoldRateContext = createContext<{
  todayRateusd: number;
  todayRatepkr: number;
  todayRateInr: number;
  todayRateGbp: number;
  todayRateAed: number;
  yesterdayRate: number;
  isLoading: boolean;
  error: string | null;
}>({
  todayRateusd: 0,
  todayRatepkr: 0,
  todayRateInr: 0,
  todayRateGbp: 0,
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
  const [todayRateusd, setTodayRateusd] = useState<number>(0);
  const [todayRatepkr, setTodayRatepkr] = useState<number>(0);
  const [todayRateInr, setTodayRateInr] = useState<number>(0);
  const [todayRateGbp, setTodayRateGbp] = useState<number>(0);
  const [todayRateAed, setTodayRateAed] = useState<number>(0);
  const [yesterdayRate, setYesterdayRate] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestRate = async () => {
    try {
      const response = await fetch("/api/live-gold-rate/latest-live-goldrate");
      const data = await response.json();
      if (response.ok) {
        setTodayRateusd(data.latestRate.gold_rate_usd);
        setTodayRatepkr(data.latestRate.gold_rate_pkr);
        setTodayRateInr(data.latestRate.gold_rate_inr); // Update with actual data from API
        setTodayRateGbp(data.latestRate.gold_rate_gbp); // Update with actual data from API
        setTodayRateAed(data.latestRate.gold_rate_aed); // Update with actual data from API
        setYesterdayRate(data.secondLatestRate.gold_rate_pkr);
        setIsLoading(false);
        setError(null);
      } else {
        setError("Failed to fetch latest rate.");
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
        todayRateInr,
        todayRateGbp,
        todayRateAed,
        yesterdayRate,
        isLoading,
        error,
      }}
    >
      {children}
    </GoldRateContext.Provider>
  );
};
