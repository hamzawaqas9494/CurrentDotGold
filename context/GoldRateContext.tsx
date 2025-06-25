// // "use client";
// // import React, { createContext, useContext, useState, useEffect } from "react";

// // // Context to provide the gold rate data
// // const GoldRateContext = createContext<{
// //   todayRateusd: number;
// //   todayRatepkr: number;

// //   live: number;
// //   yesterdayRate: number;
// //   isLoading: boolean;
// //   error: string | null;
// //   currencyLive: number;
// // }>({
// //   live: 0,
// //   currencyLive: 0,
// //   todayRateusd: 0,
// //   todayRatepkr: 0,
// //   yesterdayRate: 0,
// //   isLoading: true,
// //   error: null,
// // });

// // export const useGoldRate = () => useContext(GoldRateContext);

// // type GoldRateProviderProps = {
// //   children: React.ReactNode;
// // };

// // export const GoldRateProvider: React.FC<GoldRateProviderProps> = ({
// //   children,
// // }) => {
// //   const [todayRatepkr, setTodayRatepkr] = useState<number>(0);
// //   const [todayRateusd, setTodayRateusd] = useState<number>(0);

// //   const [live, setLive] = useState<number>(0);
// //   const [currencyLive, setCurrencyLive] = useState<number>(0);


// //   const [yesterdayRate, setYesterdayRate] = useState<number>(0);
// //   const [isLoading, setIsLoading] = useState<boolean>(false);
// //   const [error, setError] = useState<string | null>(null);
 

 
// //   useEffect(() => {
// //     const fetchRates = async () => {
// //       try {
// //         const response = await fetch(
// //           "https://openexchangerates.org/api/latest.json?app_id=1bf504ba44da4e1eb440ca08143eda50"
// //         );
// //         const dataLive = await response.json();
        
// //         if (response.ok) {
// //           setCurrencyLive(dataLive.rates);
// //           setTodayRatepkr(dataLive.rates.PKR);
// //           setTodayRateusd(dataLive.rates.USD);
// //           setYesterdayRate(50000)
// //           throw new Error(`Error: ${response.status}`);
// //         }
// //       } catch (err) {}
// //     };

// //     fetchRates();
// //   }, []);




// //   const fetchLatestRateliveSecond = async () => {
// //     try {
// //       const response = await fetch("/api/gold-silver-currency");
// //       const dataLive1 = await response.json();
// //       console.log(dataLive1,"dataLive1")
// //       // setLive(dataLive1.spreadProfilePrices);
// //     } catch (error) {
// //       console.error("Failed to fetch latest rate.");
// //     }
// //   };
// //   useEffect(() => {
// //     fetchLatestRateliveSecond();
// //     const intervalId = setInterval(fetchLatestRateliveSecond, 1000);
// //     return () => clearInterval(intervalId);
// //   }, []);




  
// //   return (
// //     <GoldRateContext.Provider
// //       value={{
// //         live,
// //         todayRateusd:live * todayRateusd,
// //         todayRatepkr: live * todayRatepkr,
// //         currencyLive,
// //         yesterdayRate,
// //         isLoading,
// //         error,
// //       }}
// //     >
// //       {children}
// //     </GoldRateContext.Provider>
// //   );
// // };





















// // // "use client";
// // // import React, { createContext, useContext, useState, useEffect } from "react";

// // // // Context to provide the gold rate data
// // // const GoldRateContext = createContext<{
// // //   todayRateusd: number;
// // //   todayRatepkr: number;

// // //   live: number;
// // //   yesterdayRate: number;
// // //   isLoading: boolean;
// // //   error: string | null;
// // //   currencyLive: number;
// // // }>({
// // //   live: 0,
// // //   currencyLive: 0,
// // //   todayRateusd: 0,
// // //   todayRatepkr: 0,
// // //   yesterdayRate: 0,
// // //   isLoading: true,
// // //   error: null,
// // // });

// // // export const useGoldRate = () => useContext(GoldRateContext);

// // // type GoldRateProviderProps = {
// // //   children: React.ReactNode;
// // // };

// // // export const GoldRateProvider: React.FC<GoldRateProviderProps> = ({children}) => {



// // // const [live, setLive] = useState<number>(0);
// // // const [todayRatepkr, setTodayRatepkr] = useState<number>(0);
// // // const [todayRateusd, setTodayRateusd] = useState<number>(0);

  
 
// // // const [currencyLive, setCurrencyLive] = useState<number>(0);
// // // const [yesterdayRate, setYesterdayRate] = useState<number>(0);


// // // const [isLoading, setIsLoading] = useState<boolean>(false);
// // // const [error, setError] = useState<string | null>(null);
 

 




// // //   const fetchLatestRateliveSecond = async () => {
// // //     try {
// // //       const response = await fetch("/api/gold-silver-currency");
// // //       const dataLive1 = await response.json();
// // //       console.log(dataLive1,"dataLive1")
// // //       // setLive(dataLive1);
// // //     } catch (error) {
// // //       console.error("Failed to fetch latest rate.");
// // //     }
// // //   };
// // //   useEffect(() => {
// // //     fetchLatestRateliveSecond();
// // //     const intervalId = setInterval(fetchLatestRateliveSecond, 1000);
// // //     return () => clearInterval(intervalId);
// // //   }, []);





// // //   return (
// // //     <GoldRateContext.Provider
// // //       value={{
// // //         live,
// // //         todayRateusd:live * todayRateusd,
// // //         todayRatepkr: live * todayRatepkr,
// // //         currencyLive,
// // //         yesterdayRate,
// // //         isLoading,
// // //         error,
// // //       }}
// // //     >
// // //       {children}
// // //     </GoldRateContext.Provider>
// // //   );
// // // };





















// //   // useEffect(() => {
// //   //   const fetchRates = async () => {
// //   //     try {
// //   //       const response = await fetch(
// //   //         "https://openexchangerates.org/api/latest.json?app_id=1bf504ba44da4e1eb440ca08143eda50"
// //   //       );
// //   //       const dataLive = await response.json();
        
// //   //       if (response.ok) {
// //   //         setCurrencyLive(dataLive.rates);
// //   //         setTodayRatepkr(dataLive.rates.PKR);
// //   //         setTodayRateusd(dataLive.rates.USD);
// //   //         setYesterdayRate(50000)
// //   //         throw new Error(`Error: ${response.status}`);
// //   //       }
// //   //     } catch (err) {}
// //   //   };

// //   //   fetchRates();
// //   // }, []);


// "use client";

// import React, { createContext, useContext, useState, useEffect } from "react";

// // Types
// type SpreadPrice = {
//   spreadProfile: string;
//   bidSpread: number;
//   askSpread: number;
//   bid: number;
//   ask: number;
// };

// // Context type
// const GoldRateContext = createContext<{
//   todayRateusd: number;
//   todayRatepkr: number;
//   live: number;
//   yesterdayRate: number;
//   isLoading: boolean;
//   error: string | null;
//   currencyLiveUsd: number;
//   currencyLivePkr: number;
//   currencyLive: number;
// }>({
//   currencyLive: 0,
//   live: 0,
//   todayRateusd: 0,
//   todayRatepkr: 0,
//   yesterdayRate: 0,
//   isLoading: true,
//   error: null,
//   currencyLiveUsd: 1,
//   currencyLivePkr: 0,
// });

// export const useGoldRate = () => useContext(GoldRateContext);

// type GoldRateProviderProps = {
//   children: React.ReactNode;
// };

// export const GoldRateProvider: React.FC<GoldRateProviderProps> = ({ children }) => {
//   const [live, setLive] = useState<number>(0);
//   const [currencyLive, setCurrencyLive] = useState<number>(0);
//   const [currencyLiveUsd, setCurrencyLiveUsd] = useState<number>(1); // USD default 1
//   const [currencyLivePkr, setCurrencyLivePkr] = useState<number>(0);
//   const [yesterdayRate, setYesterdayRate] = useState<number>(50000);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

  

//   // Fetch gold rate
//   const fetchGoldRate = async () => {
//     try {
//       const res = await fetch("/api/gold-silver-currency");
//       const data = await res.json();

  
//        console.log(data,"data");



//       if (!res.ok) throw new Error(`Gold API failed: ${res.status}`);

//       // Assume gold data is in data.data.find(x => x.type === 'gold')
//       const goldData = data.data.find((item: any) => item.type === "gold");
//       if (!goldData) throw new Error("Gold data missing");

//       const standard = goldData.prices.find((p: SpreadPrice) => p.spreadProfile === "standard");
//       if (!standard) throw new Error("Standard spread not found");

//       setLive(standard.bid); 


//   // CURRENCY data
//     const currencyData = data.data.find((item: any) => item.type === "currency");
//     if (currencyData && currencyData.rates) {
//       console.log(currencyData.rates,"currencyData.rates");
//           setCurrencyLive(currencyData.rates);
//       setCurrencyLiveUsd(currencyData.rates.usd || 1);  // fallback 1 if not found
//       setCurrencyLivePkr(currencyData.rates.pkr || 0);
//     } else {
//       console.warn("Currency data missing or invalid");
//     }











//     } catch (err: any) {
//       console.error("Gold fetch error:", err.message);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };



//   // Run every second
//   useEffect(() => {
//     fetchGoldRate();
//     const interval = setInterval(fetchGoldRate, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <GoldRateContext.Provider
//       value={{
//         currencyLive,
//         live,
//         todayRateusd: live * currencyLiveUsd,
//         todayRatepkr: live * currencyLivePkr,
//         currencyLiveUsd,
//         currencyLivePkr,
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
  const [live, setLive] = useState<number>(0); // gold
  const [silverLive, setSilverLive] = useState<number>(0); // silver
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

      console.log(data, "data");

      if (!res.ok) throw new Error(`API failed: ${res.status}`);

      // GOLD data
      const goldData = data.data.find((item: any) => item.type === "gold");
      if (!goldData) throw new Error("Gold data missing");

      const goldStandard = goldData.prices.find((p: SpreadPrice) => p.spreadProfile === "standard");
      if (!goldStandard) throw new Error("Gold standard spread not found");

      setLive(goldStandard.bid);

      // SILVER data
      const silverData = data.data.find((item: any) => item.type === "silver");
      if (!silverData) throw new Error("Silver data missing");

      const silverStandard = silverData.prices.find((p: SpreadPrice) => p.spreadProfile === "standard");
      if (!silverStandard) throw new Error("Silver standard spread not found");

      setSilverLive(silverStandard.bid);

      // CURRENCY data
      const currencyData = data.data.find((item: any) => item.type === "currency");
      if (currencyData && currencyData.rates) {
        console.log(currencyData.rates, "currencyData.rates");
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
