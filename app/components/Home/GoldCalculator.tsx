// // // // // // // "use client";
// // // // // // // import React, { useEffect, useState, useMemo, FC } from "react";
// // // // // // // import { Loader } from "@/app/ui";
// // // // // // // import { useGoldRate } from "@/context/GoldRateContext";
// // // // // // // import { Units } from "@/common.types";
// // // // // // // import formatDate from "@/helpers/dateFormatter";

// // // // // // // interface GoldRate {
// // // // // // //   units: Units;
// // // // // // //   purity: number;
// // // // // // //   rate: number;
// // // // // // // }

// // // // // // // const calculateTotalPrice = (
// // // // // // //   weight: number,
// // // // // // //   goldRates: GoldRate[],
// // // // // // //   units: Units,
// // // // // // //   purity: number
// // // // // // // ) => {
// // // // // // //   const selectedRate = goldRates.find(
// // // // // // //     (r) => r.units === units && r.purity === purity
// // // // // // //   );
// // // // // // //   if (selectedRate) {
// // // // // // //     return selectedRate.rate * weight;
// // // // // // //   }
// // // // // // //   return 0;
// // // // // // // };

// // // // // // // const GoldCalculator: FC = ({}) => {
// // // // // // //   const { todayRateusd, todayRatepkr, yesterdayRate, isLoading, error } =
// // // // // // //     useGoldRate();

// // // // // // //   const [totalPrice, setTotalPrice] = useState<number>(0);
// // // // // // //   const [weight, setWeight] = useState<number>(0);
// // // // // // //   const [units, setUnits] = useState<Units>(Units.Grams);
// // // // // // //   const [purity, setPurity] = useState<number>(24);

// // // // // // //   const goldRates = useMemo(() => {
// // // // // // //     return [
// // // // // // //       // Gold rates in ounce
// // // // // // //       { units: Units.Ounces, purity: 24, rate: todayRatepkr },
// // // // // // //       { units: Units.Ounces, purity: 22, rate: (todayRatepkr / 24) * 22 },
// // // // // // //       { units: Units.Ounces, purity: 21, rate: (todayRatepkr / 24) * 21 },

// // // // // // //       // Gold rates in gram
// // // // // // //       { units: Units.Grams, purity: 24, rate: todayRatepkr / 31.1 },
// // // // // // //       {
// // // // // // //         units: Units.Grams,
// // // // // // //         purity: 22,
// // // // // // //         rate: (0.9166 * 11.6638 * todayRatepkr) / 31.1 / 11.663,
// // // // // // //       },
// // // // // // //       {
// // // // // // //         units: Units.Grams,
// // // // // // //         purity: 21,
// // // // // // //         rate: (0.875 * 11.6638 * todayRatepkr) / 31.1 / 11.6638,
// // // // // // //       },

// // // // // // //       // Gold rates in Tola
// // // // // // //       { units: Units.Tola, purity: 24, rate: (todayRatepkr / 31.1) * 11.6638 },
// // // // // // //       {
// // // // // // //         units: Units.Tola,
// // // // // // //         purity: 22,
// // // // // // //         rate: (0.9166 * 11.6638 * todayRatepkr) / 31.1,
// // // // // // //       },
// // // // // // //       {
// // // // // // //         units: Units.Tola,
// // // // // // //         purity: 21,
// // // // // // //         rate: (0.875 * 11.6638 * todayRatepkr) / 31.1,
// // // // // // //       },
// // // // // // //     ];
// // // // // // //   }, [todayRatepkr]);

// // // // // // //   useEffect(() => {
// // // // // // //     setTotalPrice(calculateTotalPrice(weight, goldRates, units, purity));
// // // // // // //   }, [todayRatepkr, weight, units, purity]);

// // // // // // //   const handleUnitsChange = (newUnits: Units) => {
// // // // // // //     setUnits(newUnits);
// // // // // // //     setTotalPrice(calculateTotalPrice(weight, goldRates, newUnits, purity));
// // // // // // //   };

// // // // // // //   const handlePurityChange = (newPurity: number) => {
// // // // // // //     setPurity(newPurity);
// // // // // // //     setTotalPrice(calculateTotalPrice(weight, goldRates, units, newPurity));
// // // // // // //   };

// // // // // // //   const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //     setWeight(Number(event.target.value));
// // // // // // //     setTotalPrice(calculateTotalPrice(weight, goldRates, units, purity));
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <section
// // // // // // //       id="gold-exhibition"
// // // // // // //       data-testid="gold-calculator"
// // // // // // //       className="relative h-[calc(100vh_-_40vh)] bg-[url('/assets/gold-exibition.png')] bg-cover bg-center bg-no-repeat"
// // // // // // //     >
// // // // // // //       <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-black/70 md:space-y-5 px-1">
// // // // // // //         <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
// // // // // // //           Today's Gold Price{" "}
// // // // // // //           <span className="text-yellow-500">{formatDate(new Date())}</span>
// // // // // // //         </h2>
// // // // // // //         <div className="space-x-2 space-y-2 md:space-x-5">
// // // // // // //           <button
// // // // // // //             className={`w-24 rounded-full py-1 sm:py-2  text-xl font-bold text-white md:w-28 ${
// // // // // // //               units === "grams"
// // // // // // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // // // // // //                 : "bg-none"
// // // // // // //             }  `}
// // // // // // //             onClick={() => handleUnitsChange(Units.Grams)}
// // // // // // //           >
// // // // // // //             Gram
// // // // // // //           </button>
// // // // // // //           <button
// // // // // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // // // // //               units === "tola"
// // // // // // //                 ? "bg-gradient-to-r from-yellow-600  via-yellow-500 to-yellow-400"
// // // // // // //                 : "bg-none"
// // // // // // //             }  `}
// // // // // // //             onClick={() => handleUnitsChange(Units.Tola)}
// // // // // // //           >
// // // // // // //             Tola
// // // // // // //           </button>
// // // // // // //           <button
// // // // // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // // // // //               units === "ounces"
// // // // // // //                 ? "bg-gradient-to-r from-yellow-600  via-yellow-500 to-yellow-400"
// // // // // // //                 : "bg-none"
// // // // // // //             }  `}
// // // // // // //             onClick={() => handleUnitsChange(Units.Ounces)}
// // // // // // //           >
// // // // // // //             Ounce
// // // // // // //           </button>
// // // // // // //         </div>
// // // // // // //         <div className="space-x-2 md:space-x-5">
// // // // // // //           <button
// // // // // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // // // // //               purity === 24
// // // // // // //                 ? "bg-gradient-to-r from-yellow-600  via-yellow-500 to-yellow-400"
// // // // // // //                 : "bg-none"
// // // // // // //             }  `}
// // // // // // //             onClick={() => handlePurityChange(24)}
// // // // // // //           >
// // // // // // //             24k
// // // // // // //           </button>
// // // // // // //           <button
// // // // // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // // // // //               purity === 22
// // // // // // //                 ? "bg-gradient-to-r from-yellow-600  via-yellow-500 to-yellow-400"
// // // // // // //                 : "bg-none"
// // // // // // //             }  `}
// // // // // // //             onClick={() => handlePurityChange(22)}
// // // // // // //           >
// // // // // // //             22k
// // // // // // //           </button>
// // // // // // //           <button
// // // // // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // // // // //               purity === 21
// // // // // // //                 ? "bg-gradient-to-r from-yellow-600  via-yellow-500 to-yellow-400"
// // // // // // //                 : "bg-none"
// // // // // // //             }  `}
// // // // // // //             onClick={() => handlePurityChange(21)}
// // // // // // //           >
// // // // // // //             21k
// // // // // // //           </button>
// // // // // // //         </div>
// // // // // // //         <div>
// // // // // // //           <input
// // // // // // //             id="weight"
// // // // // // //             type="number"
// // // // // // //             value={weight}
// // // // // // //             onChange={handleWeightChange}
// // // // // // //             className="w-full rounded-full border border-gray-300 bg-gray-50 px-24 py-2 text-center text-sm text-gray-900 placeholder:font-semibold placeholder:text-slate-400 focus:outline-none"
// // // // // // //             placeholder="Enter Weight"
// // // // // // //           />
// // // // // // //         </div>
// // // // // // //         {error ? (
// // // // // // //           <h2 className="text-center text-lg text-red-500">
// // // // // // //             Error: Something bad happened. Please try again later!
// // // // // // //           </h2>
// // // // // // //         ) : (
// // // // // // //           <React.Fragment>
// // // // // // //             {isLoading ? (
// // // // // // //               <Loader />
// // // // // // //             ) : (
// // // // // // //               <h2 className="text-4xl font-semibold text-white">
// // // // // // //                 {totalPrice.toFixed(3)} {""}
// // // // // // //                 <span className="text-lg">PKR</span>
// // // // // // //               </h2>
// // // // // // //             )}
// // // // // // //           </React.Fragment>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     </section>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default GoldCalculator;

// // // // // // "use client";
// // // // // // import React, { useEffect, useState, useMemo, FC } from "react";
// // // // // // import { Loader } from "@/app/ui";
// // // // // // import { useGoldRate } from "@/context/GoldRateContext";
// // // // // // import { Units } from "@/common.types";
// // // // // // import formatDate from "@/helpers/dateFormatter";

// // // // // // interface GoldRate {
// // // // // //   units: Units;
// // // // // //   purity: number;
// // // // // //   rate: number;
// // // // // //   country: string;
// // // // // //   currency: string;
// // // // // // }

// // // // // // const calculateTotalPrice = (
// // // // // //   weight: number,
// // // // // //   goldRates: GoldRate[],
// // // // // //   units: Units,
// // // // // //   purity: number,
// // // // // //   country: string
// // // // // // ) => {
// // // // // //   const selectedRate = goldRates.find(
// // // // // //     (r) => r.units === units && r.purity === purity && r.country === country
// // // // // //   );
// // // // // //   if (selectedRate) {
// // // // // //     return selectedRate.rate * weight;
// // // // // //   }
// // // // // //   return 0;
// // // // // // };

// // // // // // const GoldCalculator: FC = () => {
// // // // // //   const { todayRateusd, todayRatepkr, isLoading, error } = useGoldRate();

// // // // // //   const [totalPrice, setTotalPrice] = useState<number>(0);
// // // // // //   const [weight, setWeight] = useState<number>(0);
// // // // // //   const [units, setUnits] = useState<Units>(Units.Grams);
// // // // // //   const [purity, setPurity] = useState<number>(24);
// // // // // //   const [country, setCountry] = useState<string>("Pakistan");

// // // // // //   const goldRates = useMemo(() => {
// // // // // //     return [
// // // // // //       // Pakistan Rates
// // // // // //       {
// // // // // //         country: "Pakistan",
// // // // // //         units: Units.Ounces,
// // // // // //         purity: 24,
// // // // // //         rate: todayRatepkr,
// // // // // //         currency: "PKR",
// // // // // //       },
// // // // // //       {
// // // // // //         country: "Pakistan",
// // // // // //         units: Units.Ounces,
// // // // // //         purity: 22,
// // // // // //         rate: (todayRatepkr / 24) * 22,
// // // // // //         currency: "PKR",
// // // // // //       },
// // // // // //       {
// // // // // //         country: "Pakistan",
// // // // // //         units: Units.Grams,
// // // // // //         purity: 24,
// // // // // //         rate: todayRatepkr / 31.1,
// // // // // //         currency: "PKR",
// // // // // //       },
// // // // // //       {
// // // // // //         country: "Pakistan",
// // // // // //         units: Units.Grams,
// // // // // //         purity: 22,
// // // // // //         rate: (0.9166 * todayRatepkr) / 31.1,
// // // // // //         currency: "PKR",
// // // // // //       },

// // // // // //       // USA Rates
// // // // // //       {
// // // // // //         country: "USA",
// // // // // //         units: Units.Ounces,
// // // // // //         purity: 24,
// // // // // //         rate: todayRateusd,
// // // // // //         currency: "USD",
// // // // // //       },
// // // // // //       {
// // // // // //         country: "USA",
// // // // // //         units: Units.Grams,
// // // // // //         purity: 24,
// // // // // //         rate: todayRateusd / 31.1,
// // // // // //         currency: "USD",
// // // // // //       },

// // // // // //       // Add more countries similarly
// // // // // //       // India Rates
// // // // // //       {
// // // // // //         country: "India",
// // // // // //         units: Units.Ounces,
// // // // // //         purity: 24,
// // // // // //         rate: todayRatepkr * 0.012,
// // // // // //         currency: "INR",
// // // // // //       }, // Sample conversion
// // // // // //       {
// // // // // //         country: "India",
// // // // // //         units: Units.Grams,
// // // // // //         purity: 24,
// // // // // //         rate: (todayRatepkr * 0.012) / 31.1,
// // // // // //         currency: "INR",
// // // // // //       },

// // // // // //       // Bangladesh Rates
// // // // // //       {
// // // // // //         country: "Bangladesh",
// // // // // //         units: Units.Ounces,
// // // // // //         purity: 24,
// // // // // //         rate: todayRatepkr * 0.0085,
// // // // // //         currency: "BDT",
// // // // // //       }, // Sample conversion
// // // // // //       {
// // // // // //         country: "Bangladesh",
// // // // // //         units: Units.Grams,
// // // // // //         purity: 24,
// // // // // //         rate: (todayRatepkr * 0.0085) / 31.1,
// // // // // //         currency: "BDT",
// // // // // //       },

// // // // // //       // Add for Sri Lanka, Afghanistan, etc.
// // // // // //     ];
// // // // // //   }, [todayRatepkr, todayRateusd]);

// // // // // //   useEffect(() => {
// // // // // //     setTotalPrice(
// // // // // //       calculateTotalPrice(weight, goldRates, units, purity, country)
// // // // // //     );
// // // // // //   }, [todayRatepkr, todayRateusd, weight, units, purity, country]);

// // // // // //   const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
// // // // // //     setCountry(event.target.value);
// // // // // //     setTotalPrice(
// // // // // //       calculateTotalPrice(weight, goldRates, units, purity, event.target.value)
// // // // // //     );
// // // // // //   };

// // // // // //   const handleUnitsChange = (newUnits: Units) => {
// // // // // //     setUnits(newUnits);
// // // // // //     setTotalPrice(
// // // // // //       calculateTotalPrice(weight, goldRates, newUnits, purity, country)
// // // // // //     );
// // // // // //   };

// // // // // //   const handlePurityChange = (newPurity: number) => {
// // // // // //     setPurity(newPurity);
// // // // // //     setTotalPrice(
// // // // // //       calculateTotalPrice(weight, goldRates, units, newPurity, country)
// // // // // //     );
// // // // // //   };

// // // // // //   const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //     setWeight(Number(event.target.value));
// // // // // //     setTotalPrice(
// // // // // //       calculateTotalPrice(weight, goldRates, units, purity, country)
// // // // // //     );
// // // // // //   };

// // // // // //   return (
// // // // // //     <section
// // // // // //       id="gold-exhibition"
// // // // // //       data-testid="gold-calculator"
// // // // // //       className="relative h-[calc(100vh_-_40vh)] bg-[url('/assets/gold-exibition.png')] bg-cover bg-center bg-no-repeat"
// // // // // //     >
// // // // // //       <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-black/70 md:space-y-5 px-1">
// // // // // //         <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
// // // // // //           Today's Gold Price{" "}
// // // // // //           <span className="text-yellow-500">{formatDate(new Date())}</span>
// // // // // //         </h2>
// // // // // //         <div>
// // // // // //           <select
// // // // // //             value={country}
// // // // // //             onChange={handleCountryChange}
// // // // // //             className="mb-4 px-2 py-1 rounded-full"
// // // // // //           >
// // // // // //             <option value="Pakistan">Pakistan (PKR)</option>
// // // // // //             <option value="USA">USA (USD)</option>
// // // // // //             <option value="India">India (INR)</option>
// // // // // //             <option value="Bangladesh">Bangladesh (BDT)</option>
// // // // // //             <option value="Sri Lanka">Sri Lanka (LKR)</option>
// // // // // //             <option value="Afghanistan">Afghanistan (AFN)</option>
// // // // // //           </select>
// // // // // //         </div>
// // // // // //         <div className="space-x-2 space-y-2 md:space-x-5">
// // // // // //           <button
// // // // // //             className={`w-24 rounded-full py-1 sm:py-2  text-xl font-bold text-white md:w-28 ${
// // // // // //               units === "grams"
// // // // // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // // // // //                 : "bg-none"
// // // // // //             }  `}
// // // // // //             onClick={() => handleUnitsChange(Units.Grams)}
// // // // // //           >
// // // // // //             Gram
// // // // // //           </button>
// // // // // //           <button
// // // // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // // // //               units === "tola"
// // // // // //                 ? "bg-gradient-to-r from-yellow-600  via-yellow-500 to-yellow-400"
// // // // // //                 : "bg-none"
// // // // // //             }  `}
// // // // // //             onClick={() => handleUnitsChange(Units.Tola)}
// // // // // //           >
// // // // // //             Tola
// // // // // //           </button>
// // // // // //           <button
// // // // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // // // //               units === "ounces"
// // // // // //                 ? "bg-gradient-to-r from-yellow-600  via-yellow-500 to-yellow-400"
// // // // // //                 : "bg-none"
// // // // // //             }  `}
// // // // // //             onClick={() => handleUnitsChange(Units.Ounces)}
// // // // // //           >
// // // // // //             Ounce
// // // // // //           </button>
// // // // // //         </div>
// // // // // //         <div className="space-x-2 md:space-x-5">
// // // // // //           <button
// // // // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // // // //               purity === 24
// // // // // //                 ? "bg-gradient-to-r from-yellow-600  via-yellow-500 to-yellow-400"
// // // // // //                 : "bg-none"
// // // // // //             }  `}
// // // // // //             onClick={() => handlePurityChange(24)}
// // // // // //           >
// // // // // //             24k
// // // // // //           </button>
// // // // // //           <button
// // // // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // // // //               purity === 22
// // // // // //                 ? "bg-gradient-to-r from-yellow-600  via-yellow-500 to-yellow-400"
// // // // // //                 : "bg-none"
// // // // // //             }  `}
// // // // // //             onClick={() => handlePurityChange(22)}
// // // // // //           >
// // // // // //             22k
// // // // // //           </button>
// // // // // //           <button
// // // // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // // // //               purity === 21
// // // // // //                 ? "bg-gradient-to-r from-yellow-600  via-yellow-500 to-yellow-400"
// // // // // //                 : "bg-none"
// // // // // //             }  `}
// // // // // //             onClick={() => handlePurityChange(21)}
// // // // // //           >
// // // // // //             21k
// // // // // //           </button>
// // // // // //         </div>
// // // // // //         <div>
// // // // // //           <input
// // // // // //             id="weight"
// // // // // //             type="number"
// // // // // //             value={weight}
// // // // // //             onChange={handleWeightChange}
// // // // // //             className="w-full rounded-full border-0 bg-[#313131] py-2 px-4 text-white focus:ring-2 focus:ring-yellow-500"
// // // // // //             placeholder="Enter Weight"
// // // // // //           />
// // // // // //         </div>

// // // // // //         <div className="flex items-center justify-center space-x-5 text-lg md:space-x-10 md:text-2xl">
// // // // // //           <p className="font-semibold text-yellow-500">Total Price:</p>
// // // // // //           <p className="font-semibold text-white">
// // // // // //             {totalPrice.toLocaleString("en-US", {
// // // // // //               style: "currency",
// // // // // //               currency:
// // // // // //                 goldRates.find((r) => r.country === country)?.currency || "USD",
// // // // // //             })}
// // // // // //           </p>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </section>
// // // // // //   );
// // // // // // };

// // // // // // export default GoldCalculator;
// // // // // "use client";
// // // // // import React, { useEffect, useState, useMemo, FC } from "react";
// // // // // import { Loader } from "@/app/ui";
// // // // // import { useGoldRate } from "@/context/GoldRateContext";
// // // // // import { Units } from "@/common.types";
// // // // // import formatDate from "@/helpers/dateFormatter";

// // // // // interface GoldRate {
// // // // //   units: Units;
// // // // //   purity: number;
// // // // //   rate: number;
// // // // //   country: string;
// // // // //   currency: string;
// // // // // }

// // // // // const GoldCalculator: FC = () => {
// // // // //   const {
// // // // //     todayRatepkr,
// // // // //     // todayRateInr,
// // // // //     todayRateusd,
// // // // //     // todayRateGbp,
// // // // //     // todayRateAed,
// // // // //     isLoading,
// // // // //     error,
// // // // //   } = useGoldRate();

// // // // //   const [totalPrice, setTotalPrice] = useState<number>(0);
// // // // //   const [weight, setWeight] = useState<number>(0);
// // // // //   const [units, setUnits] = useState<Units>(Units.Grams);
// // // // //   const [purity, setPurity] = useState<number>(24);
// // // // //   const [country, setCountry] = useState<string>("Pakistan");

// // // // //   const countries = {
// // // // //     Pakistan: todayRatepkr,
// // // // //     // India: todayRateInr,
// // // // //     USA: todayRateusd,
// // // // //     // UK: todayRateGbp,
// // // // //     // UAE: todayRateAed,
// // // // //   };

// // // // //   const todayRate = countries[country] || 0;

// // // // //   const goldRatesByCountry = useMemo(() => {
// // // // //     if (!todayRate) return [];

// // // // //     return [
// // // // //       // Gold rates in Ounce
// // // // //       { country, units: Units.Ounces, purity: 24, rate: todayRate },
// // // // //       { country, units: Units.Ounces, purity: 22, rate: (todayRate / 24) * 22 },
// // // // //       { country, units: Units.Ounces, purity: 21, rate: (todayRate / 24) * 21 },

// // // // //       // Gold rates in Gram
// // // // //       { country, units: Units.Grams, purity: 24, rate: todayRate / 31.1 },
// // // // //       {
// // // // //         country,
// // // // //         units: Units.Grams,
// // // // //         purity: 22,
// // // // //         rate: (0.9166 * 11.6638 * todayRate) / 31.1 / 11.663,
// // // // //       },
// // // // //       {
// // // // //         country,
// // // // //         units: Units.Grams,
// // // // //         purity: 21,
// // // // //         rate: (0.875 * 11.6638 * todayRate) / 31.1 / 11.6638,
// // // // //       },

// // // // //       // Gold rates in Tola
// // // // //       {
// // // // //         country,
// // // // //         units: Units.Tola,
// // // // //         purity: 24,
// // // // //         rate: (todayRate / 31.1) * 11.6638,
// // // // //       },
// // // // //       {
// // // // //         country,
// // // // //         units: Units.Tola,
// // // // //         purity: 22,
// // // // //         rate: (0.9166 * 11.6638 * todayRate) / 31.1,
// // // // //       },
// // // // //       {
// // // // //         country,
// // // // //         units: Units.Tola,
// // // // //         purity: 21,
// // // // //         rate: (0.875 * 11.6638 * todayRate) / 31.1,
// // // // //       },
// // // // //     ];
// // // // //   }, [country, todayRate]);

// // // // //   useEffect(() => {
// // // // //     setTotalPrice(
// // // // //       calculateTotalPrice(weight, goldRatesByCountry, units, purity, country)
// // // // //     );
// // // // //   }, [weight, units, purity, country, goldRatesByCountry]);

// // // // //   const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
// // // // //     setCountry(event.target.value);
// // // // //   };

// // // // //   const handleUnitsChange = (newUnits: Units) => {
// // // // //     setUnits(newUnits);
// // // // //   };

// // // // //   const handlePurityChange = (newPurity: number) => {
// // // // //     setPurity(newPurity);
// // // // //   };

// // // // //   const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // // //     setWeight(Number(event.target.value));
// // // // //   };

// // // // //   const calculateTotalPrice = (
// // // // //     weight: number,
// // // // //     goldRates: GoldRate[],
// // // // //     units: Units,
// // // // //     purity: number,
// // // // //     country: string
// // // // //   ) => {
// // // // //     const selectedRate = goldRates.find(
// // // // //       (r) => r.units === units && r.purity === purity && r.country === country
// // // // //     );
// // // // //     if (selectedRate) {
// // // // //       return selectedRate.rate * weight;
// // // // //     }
// // // // //     return 0;
// // // // //   };

// // // // //   return (
// // // // //     <section
// // // // //       id="gold-exhibition"
// // // // //       data-testid="gold-calculator"
// // // // //       className="relative h-[calc(100vh_-_40vh)] bg-[url('/assets/gold-exibition.png')] bg-cover bg-center bg-no-repeat"
// // // // //     >
// // // // //       <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-black/70 md:space-y-5 px-1">
// // // // //         <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
// // // // //           Today's Gold Price{" "}
// // // // //           <span className="text-yellow-500">{formatDate(new Date())}</span>
// // // // //         </h2>
// // // // //         <div>
// // // // //           <select
// // // // //             value={country}
// // // // //             onChange={handleCountryChange}
// // // // //             className="mb-4 px-2 py-1 rounded-full"
// // // // //           >
// // // // //             {Object.keys(countries).map((countryName) => (
// // // // //               <option key={countryName} value={countryName}>
// // // // //                 {countryName}
// // // // //               </option>
// // // // //             ))}
// // // // //           </select>
// // // // //         </div>
// // // // //         <div className="space-x-2 space-y-2 md:space-x-5">
// // // // //           <button
// // // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // // //               units === Units.Grams
// // // // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // // // //                 : "bg-none"
// // // // //             }  `}
// // // // //             onClick={() => handleUnitsChange(Units.Grams)}
// // // // //           >
// // // // //             Gram
// // // // //           </button>
// // // // //           <button
// // // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // // //               units === Units.Tola
// // // // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // // // //                 : "bg-none"
// // // // //             }  `}
// // // // //             onClick={() => handleUnitsChange(Units.Tola)}
// // // // //           >
// // // // //             Tola
// // // // //           </button>
// // // // //           <button
// // // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // // //               units === Units.Ounces
// // // // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // // // //                 : "bg-none"
// // // // //             }  `}
// // // // //             onClick={() => handleUnitsChange(Units.Ounces)}
// // // // //           >
// // // // //             Ounce
// // // // //           </button>
// // // // //         </div>
// // // // //         <div className="space-x-2 md:space-x-5">
// // // // //           <button
// // // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // // //               purity === 24
// // // // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // // // //                 : "bg-none"
// // // // //             }  `}
// // // // //             onClick={() => handlePurityChange(24)}
// // // // //           >
// // // // //             24k
// // // // //           </button>
// // // // //           <button
// // // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // // //               purity === 22
// // // // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // // // //                 : "bg-none"
// // // // //             }  `}
// // // // //             onClick={() => handlePurityChange(22)}
// // // // //           >
// // // // //             22k
// // // // //           </button>
// // // // //           <button
// // // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // // //               purity === 21
// // // // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // // // //                 : "bg-none"
// // // // //             }  `}
// // // // //             onClick={() => handlePurityChange(21)}
// // // // //           >
// // // // //             21k
// // // // //           </button>
// // // // //         </div>
// // // // //         <div>
// // // // //           <input
// // // // //             id="weight"
// // // // //             type="number"
// // // // //             value={weight}
// // // // //             onChange={handleWeightChange}
// // // // //             className="w-full rounded-full border-0 bg-[#313131] py-2 px-4 text-white focus:ring-2 focus:ring-yellow-500"
// // // // //             placeholder="Enter Weight"
// // // // //           />
// // // // //         </div>

// // // // //         <div className="flex items-center justify-center space-x-5 text-lg md:space-x-10 md:text-2xl">
// // // // //           <p className="font-semibold text-yellow-500">Total Price:</p>
// // // // //           <p className="font-semibold text-white">
// // // // //             {totalPrice.toLocaleString("en-US", {
// // // // //               style: "currency",
// // // // //               currency:
// // // // //                 goldRatesByCountry.find((r) => r.country === country)
// // // // //                   ?.currency || "USD",
// // // // //             })}
// // // // //           </p>
// // // // //         </div>
// // // // //       </div>
// // // // //     </section>
// // // // //   );
// // // // // };

// // // // // export default GoldCalculator;
// // // // "use client";
// // // // import React, { useEffect, useState, useMemo, FC } from "react";
// // // // import { Loader } from "@/app/ui";
// // // // import { useGoldRate } from "@/context/GoldRateContext";
// // // // import { Units } from "@/common.types";
// // // // import formatDate from "@/helpers/dateFormatter";

// // // // interface GoldRate {
// // // //   units: Units;
// // // //   purity: number;
// // // //   rate: number;
// // // //   country: string;
// // // //   // currency: string; // Added currency property
// // // // }

// // // // // Define the type for the countries object keys
// // // // type Country = "Pakistan" | "India" | "USA" | "UK" | "UAE";

// // // // const GoldCalculator: FC = () => {
// // // //   const {
// // // //     todayRateusd,
// // // //     todayRateInr,
// // // //     todayRatepkr,
// // // //     todayRateGbp,
// // // //     todayRateAed,
// // // //     isLoading,
// // // //     error,
// // // //   } = useGoldRate();

// // // //   const [totalPrice, setTotalPrice] = useState<number>(0);
// // // //   const [weight, setWeight] = useState<number>(0);
// // // //   const [units, setUnits] = useState<Units>(Units.Grams);
// // // //   const [purity, setPurity] = useState<number>(24);
// // // //   const [country, setCountry] = useState<Country>("Pakistan");

// // // //   const countries: Record<Country, number> = {
// // // //     Pakistan: todayRatepkr,
// // // //     USA: todayRateusd,
// // // //     India: todayRateInr,
// // // //     UK: todayRateGbp,
// // // //     UAE: todayRateAed,
// // // //   };

// // // //   // Ensure TypeScript knows that `country` is a valid key for `countries`
// // // //   const todayRate = countries[country] || 0;

// // // //   const goldRatesByCountry = useMemo(() => {
// // // //     if (!todayRate) return [];

// // // //     return [
// // // //       // Gold rates in Ounce
// // // //       { country, units: Units.Ounces, purity: 24, rate: todayRate },
// // // //       { country, units: Units.Ounces, purity: 22, rate: (todayRate / 24) * 22 },
// // // //       { country, units: Units.Ounces, purity: 21, rate: (todayRate / 24) * 21 },

// // // //       // Gold rates in Gram
// // // //       { country, units: Units.Grams, purity: 24, rate: todayRate / 31.1 },
// // // //       {
// // // //         country,
// // // //         units: Units.Grams,
// // // //         purity: 22,
// // // //         rate: (0.9166 * 11.6638 * todayRate) / 31.1 / 11.663,
// // // //       },
// // // //       {
// // // //         country,
// // // //         units: Units.Grams,
// // // //         purity: 21,
// // // //         rate: (0.875 * 11.6638 * todayRate) / 31.1 / 11.6638,
// // // //       },

// // // //       // Gold rates in Tola
// // // //       {
// // // //         country,
// // // //         units: Units.Tola,
// // // //         purity: 24,
// // // //         rate: (todayRate / 31.1) * 11.6638,
// // // //       },
// // // //       {
// // // //         country,
// // // //         units: Units.Tola,
// // // //         purity: 22,
// // // //         rate: (0.9166 * 11.6638 * todayRate) / 31.1,
// // // //       },
// // // //       {
// // // //         country,
// // // //         units: Units.Tola,
// // // //         purity: 21,
// // // //         rate: (0.875 * 11.6638 * todayRate) / 31.1,
// // // //       },
// // // //     ];
// // // //   }, [country, todayRate]);

// // // //   useEffect(() => {
// // // //     setTotalPrice(
// // // //       calculateTotalPrice(weight, goldRatesByCountry, units, purity, country)
// // // //     );
// // // //   }, [weight, units, purity, country, goldRatesByCountry]);

// // // //   const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
// // // //     setCountry(event.target.value as Country); // Type assertion
// // // //   };

// // // //   const handleUnitsChange = (newUnits: Units) => {
// // // //     setUnits(newUnits);
// // // //   };

// // // //   const handlePurityChange = (newPurity: number) => {
// // // //     setPurity(newPurity);
// // // //   };

// // // //   const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // //     setWeight(Number(event.target.value));
// // // //   };

// // // //   const calculateTotalPrice = (
// // // //     weight: number,
// // // //     goldRates: GoldRate[],
// // // //     units: Units,
// // // //     purity: number,
// // // //     country: string
// // // //   ) => {
// // // //     const selectedRate = goldRates.find(
// // // //       (r) => r.units === units && r.purity === purity && r.country === country
// // // //     );
// // // //     if (selectedRate) {
// // // //       return selectedRate.rate * weight;
// // // //     }
// // // //     return 0;
// // // //   };

// // // //   return (
// // // //     <section
// // // //       id="gold-exhibition"
// // // //       data-testid="gold-calculator"
// // // //       className="relative h-[calc(100vh_-_40vh)] bg-[url('/assets/gold-exibition.png')] bg-cover bg-center bg-no-repeat"
// // // //     >
// // // //       <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-black/70 md:space-y-5 px-1">
// // // //         <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
// // // //           Today's Gold Price{" "}
// // // //           <span className="text-yellow-500">{formatDate(new Date())}</span>
// // // //         </h2>
// // // //         <div>
// // // //           <select
// // // //             value={country}
// // // //             onChange={handleCountryChange}
// // // //             className="mb-4 px-2 py-1 rounded-full"
// // // //           >
// // // //             {Object.keys(countries).map((countryName) => (
// // // //               <option key={countryName} value={countryName}>
// // // //                 {countryName}
// // // //               </option>
// // // //             ))}
// // // //           </select>
// // // //         </div>
// // // //         <div className="space-x-2 space-y-2 md:space-x-5">
// // // //           <button
// // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // //               units === Units.Grams
// // // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // // //                 : "bg-none"
// // // //             }  `}
// // // //             onClick={() => handleUnitsChange(Units.Grams)}
// // // //           >
// // // //             Gram
// // // //           </button>
// // // //           <button
// // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // //               units === Units.Tola
// // // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // // //                 : "bg-none"
// // // //             }  `}
// // // //             onClick={() => handleUnitsChange(Units.Tola)}
// // // //           >
// // // //             Tola
// // // //           </button>
// // // //           <button
// // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // //               units === Units.Ounces
// // // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // // //                 : "bg-none"
// // // //             }  `}
// // // //             onClick={() => handleUnitsChange(Units.Ounces)}
// // // //           >
// // // //             Ounce
// // // //           </button>
// // // //         </div>
// // // //         <div className="space-x-2 md:space-x-5">
// // // //           <button
// // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // //               purity === 24
// // // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // // //                 : "bg-none"
// // // //             }  `}
// // // //             onClick={() => handlePurityChange(24)}
// // // //           >
// // // //             24k
// // // //           </button>
// // // //           <button
// // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // //               purity === 22
// // // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // // //                 : "bg-none"
// // // //             }  `}
// // // //             onClick={() => handlePurityChange(22)}
// // // //           >
// // // //             22k
// // // //           </button>
// // // //           <button
// // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // //               purity === 21
// // // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // // //                 : "bg-none"
// // // //             }  `}
// // // //             onClick={() => handlePurityChange(21)}
// // // //           >
// // // //             21k
// // // //           </button>
// // // //         </div>
// // // //         <div>
// // // //           <input
// // // //             id="weight"
// // // //             type="number"
// // // //             value={weight}
// // // //             onChange={handleWeightChange}
// // // //             className="w-full rounded-full border-0 bg-[#313131] py-2 px-4 text-white focus:ring-2 focus:ring-yellow-500"
// // // //             placeholder="Enter Weight"
// // // //           />
// // // //         </div>

// // // //         <div className="flex flex-col items-center justify-center space-y-4">
// // // //           <p className="text-xl font-semibold text-yellow-400">Total Price</p>
// // // //           <p className="text-2xl font-bold text-white">
// // // //             {totalPrice.toLocaleString("en-US", {
// // // //               style: "currency",
// // // //               currency: "USD",
// // // //             })}
// // // //           </p>
// // // //         </div>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // };

// // // // export default GoldCalculator;

// // // // "use client";
// // // // import React, { useEffect, useState, useMemo, FC } from "react";
// // // // import { Loader } from "@/app/ui";
// // // // import { useGoldRate } from "@/context/GoldRateContext";
// // // // import { Units } from "@/common.types";
// // // // import formatDate from "@/helpers/dateFormatter";

// // // // interface GoldRate {
// // // //   units: Units;
// // // //   purity: number;
// // // //   rate: number;
// // // //   country: string;
// // // //   currency: string;
// // // //   // rates: string; // Added currency property
// // // // }

// // // // // Define the type for the countries object keys
// // // // type Country = "Pakistan" | "India" | "USA" | "SR" | "UAE";

// // // // const GoldCalculator: FC = () => {
// // // //   const {
// // // //     todayRatepkr,
// // // //     todayRateusd,
// // // //     todayRateSar,
// // // //     todayRateInr,
// // // //     todayRateAed,
// // // //     yesterdayRate,
// // // //     isLoading,
// // // //     error,
// // // //     live,
// // // //   } = useGoldRate();
// // // //   // console.log(todayRateusd), "todayRateusd";
// // // //   const [totalPrice, setTotalPrice] = useState<number>(0);
// // // //   const [weight, setWeight] = useState<number>(0);
// // // //   const [units, setUnits] = useState<Units>(Units.Grams);
// // // //   const [purity, setPurity] = useState<number>(24);
// // // //   const [country, setCountry] = useState<Country>("Pakistan");
// // // //   const rates = {
// // // //     AED: 3.673,
// // // //     AFN: 69.499999,
// // // //     ALL: 89.390441,
// // // //     AMD: 387.175786,
// // // //     ANG: 1.803175,
// // // //     AOA: 927.390667,
// // // //     ARS: 960.4914,
// // // //     AUD: 1.482572,
// // // //     AWG: 1.8,
// // // //     AZN: 1.7,
// // // //     BAM: 1.759367,
// // // //     BBD: 2,
// // // //     BDT: 119.561012,
// // // //     BGN: 1.75778,
// // // //     BHD: 0.376754,
// // // //     BIF: 2897,
// // // //     BMD: 1,
// // // //     BND: 1.295642,
// // // //     BOB: 6.938335,
// // // //     BRL: 5.5087,
// // // //     BSD: 1,
// // // //     BTC: 0.000017195841,
// // // //     BTN: 83.804808,
// // // //   };
// // // //   // Country names and currency codes mapping
// // // //   const countryMap: Record<string, string> = {
// // // //     AED: "United Arab Emirates Dirham",
// // // //     AFN: "Afghan Afghani",
// // // //     ALL: "Albanian Lek",
// // // //     AMD: "Armenian Dram",
// // // //     ANG: "Netherlands Antillean Guilder",
// // // //     AOA: "Angolan Kwanza",
// // // //     ARS: "Argentine Peso",
// // // //     AUD: "Australian Dollar",
// // // //     AWG: "Aruban Florin",
// // // //     AZN: "Azerbaijani Manat",
// // // //     BAM: "Bosnia-Herzegovina Convertible Mark",
// // // //     BBD: "Barbadian Dollar",
// // // //     BDT: "Bangladeshi Taka",
// // // //     BGN: "Bulgarian Lev",
// // // //     BHD: "Bahraini Dinar",
// // // //     BIF: "Burundian Franc",
// // // //     BMD: "Bermudian Dollar",
// // // //     BND: "Brunei Dollar",
// // // //     BOB: "Bolivian Boliviano",
// // // //     BRL: "Brazilian Real",
// // // //     BSD: "Bahamian Dollar",
// // // //     BTC: "Bitcoin",
// // // //     BTN: "Bhutanese Ngultrum",
// // // //   };

// // // //   const countries1: Record<string, { rate: number; currency: string }> = {};
// // // //   for (const [code, rate] of Object.entries(rates)) {
// // // //     const countryName = countryMap[code];
// // // //     console.log(countryName);
// // // //     if (countryName) {
// // // //       countries1[countryName] = {
// // // //         rate,
// // // //         currency: code,
// // // //       };
// // // //     }
// // // //   }
// // // //   // Extract the current country's rate and currency
// // // //   const { rate: todayRate, currency } = countries1[country] || {
// // // //     rate: 0,
// // // //     currency: "USD",
// // // //   };

// // // //   const goldRatesByCountry = useMemo(() => {
// // // //     if (!todayRate) return [];

// // // //     return [
// // // //       // Gold rates in Ounce
// // // //       { country, units: Units.Ounces, purity: 24, rate: todayRate, currency },
// // // //       {
// // // //         country,
// // // //         units: Units.Ounces,
// // // //         purity: 22,
// // // //         rate: ((todayRate * todayRateusd) / 24) * 22,
// // // //         currency,
// // // //       },
// // // //       {
// // // //         country,
// // // //         units: Units.Ounces,
// // // //         purity: 21,
// // // //         rate: ((todayRate * todayRateusd) / 24) * 21,
// // // //         currency,
// // // //       },zzz

// // // //       // Gold rates in Gram
// // // //       {
// // // //         country,
// // // //         units: Units.Grams,
// // // //         purity: 24,
// // // //         rate: (todayRate * live) / 31.1,
// // // //         currency,
// // // //       },
// // // //       {
// // // //         country,
// // // //         units: Units.Grams,
// // // //         purity: 22,
// // // //         rate: (0.9166 * 11.6638 * (todayRate * todayRateusd)) / 31.1 / 11.663,
// // // //         currency,
// // // //       },
// // // //       {
// // // //         country,
// // // //         units: Units.Grams,
// // // //         purity: 21,
// // // //         rate: (0.875 * 11.6638 * (todayRate * todayRateusd)) / 31.1 / 11.6638,
// // // //         currency,
// // // //       },

// // // //       // Gold rates in Tola
// // // //       {
// // // //         country,
// // // //         units: Units.Tola,
// // // //         purity: 24,
// // // //         rate: ((todayRate * todayRateusd) / 31.1) * 11.6638,
// // // //         currency,
// // // //       },
// // // //       {
// // // //         country,
// // // //         units: Units.Tola,
// // // //         purity: 22,
// // // //         rate: (0.9166 * 11.6638 * (todayRate * todayRateusd)) / 31.1,
// // // //         currency,
// // // //       },
// // // //       {
// // // //         country,
// // // //         units: Units.Tola,
// // // //         purity: 21,
// // // //         rate: (0.875 * 11.6638 * (todayRate * todayRateusd)) / 31.1,
// // // //         currency,
// // // //       },
// // // //     ];
// // // //   }, [country, todayRate]);

// // // //   useEffect(() => {
// // // //     setTotalPrice(
// // // //       calculateTotalPrice(weight, goldRatesByCountry, units, purity, country)
// // // //     );
// // // //   }, [weight, units, purity, country, goldRatesByCountry]);

// // // //   const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
// // // //     setCountry(event.target.value as Country);
// // // //   };

// // // //   const handleUnitsChange = (newUnits: Units) => {
// // // //     setUnits(newUnits);
// // // //   };

// // // //   const handlePurityChange = (newPurity: number) => {
// // // //     setPurity(newPurity);
// // // //   };

// // // //   const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // //     setWeight(Number(event.target.value));
// // // //   };

// // // //   const calculateTotalPrice = (
// // // //     weight: number,
// // // //     goldRates: GoldRate[],
// // // //     units: Units,
// // // //     purity: number,
// // // //     country: string
// // // //   ) => {
// // // //     const selectedRate = goldRates.find(
// // // //       (r) => r.units === units && r.purity === purity && r.country === country
// // // //     );
// // // //     if (selectedRate) {
// // // //       return selectedRate.rate * weight;
// // // //     }
// // // //     return 0;
// // // //   };

// // // //   return (
// // // //     <section
// // // //       id="gold-exhibition"
// // // //       data-testid="gold-calculator"
// // // //       className="relative h-[calc(100vh_-_40vh)] bg-[url('/assets/gold-exibition.png')] bg-cover bg-center bg-no-repeat"
// // // //     >
// // // //       <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-black/70 md:space-y-5 px-1">
// // // //         <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
// // // //           Today's Gold Price{" "}
// // // //           <span className="text-yellow-500">{formatDate(new Date())}</span>
// // // //         </h2>
// // // //         <div>
// // // //           <select
// // // //             value={country}
// // // //             onChange={handleCountryChange}
// // // //             className="mb-4 px-2 py-1 rounded-full"
// // // //           >
// // // //             {Object.keys(countries1).map((countryName) => (
// // // //               <option key={countryName} value={countryName}>
// // // //                 {countryName}
// // // //               </option>
// // // //             ))}
// // // //           </select>
// // // //         </div>
// // // //         <div className="space-x-2 space-y-2 md:space-x-5">
// // // //           <button
// // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // //               units === Units.Grams
// // // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // // //                 : "bg-none"
// // // //             }  `}
// // // //             onClick={() => handleUnitsChange(Units.Grams)}
// // // //           >
// // // //             Gram
// // // //           </button>
// // // //           <button
// // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // //               units === Units.Tola
// // // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // // //                 : "bg-none"
// // // //             }  `}
// // // //             onClick={() => handleUnitsChange(Units.Tola)}
// // // //           >
// // // //             Tola
// // // //           </button>
// // // //           <button
// // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // //               units === Units.Ounces
// // // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // // //                 : "bg-none"
// // // //             }  `}
// // // //             onClick={() => handleUnitsChange(Units.Ounces)}
// // // //           >
// // // //             Ounce
// // // //           </button>
// // // //         </div>
// // // //         <div className="space-x-2 md:space-x-5">
// // // //           <button
// // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // //               purity === 24
// // // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // // //                 : "bg-none"
// // // //             }  `}
// // // //             onClick={() => handlePurityChange(24)}
// // // //           >
// // // //             24k
// // // //           </button>
// // // //           <button
// // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // //               purity === 22
// // // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // // //                 : "bg-none"
// // // //             }  `}
// // // //             onClick={() => handlePurityChange(22)}
// // // //           >
// // // //             22k
// // // //           </button>
// // // //           <button
// // // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // // //               purity === 21
// // // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // // //                 : "bg-none"
// // // //             }  `}
// // // //             onClick={() => handlePurityChange(21)}
// // // //           >
// // // //             21k
// // // //           </button>
// // // //         </div>
// // // //         <div>
// // // //           <input
// // // //             id="weight"
// // // //             type="number"
// // // //             placeholder="Weight"
// // // //             className="rounded-lg border border-gray-300 px-2 py-1 text-black"
// // // //             value={weight}
// // // //             onChange={handleWeightChange}
// // // //           />
// // // //         </div>
// // // //         <div className="flex flex-col items-center justify-center space-y-4">
// // // //           <p className="text-xl font-semibold text-yellow-400">Total Price</p>
// // // //           <p className="text-2xl font-bold text-white">{totalPrice}</p>
// // // //         </div>
// // // //         {isLoading && <Loader />}
// // // //         {error && <p className="text-red-500">{error}</p>}
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // };

// // // // export default GoldCalculator;

// // // "use client";
// // // import React, { useEffect, useState, useMemo, FC } from "react";
// // // import { Loader } from "@/app/ui";
// // // import { useGoldRate } from "@/context/GoldRateContext";
// // // import { Units } from "@/common.types";
// // // import formatDate from "@/helpers/dateFormatter";

// // // const GoldCalculator: FC = () => {
// // //   const { todayRateusd, isLoading, error, live, currencyLive } = useGoldRate();
// // //   console.log(currencyLive, "currencyLive");
// // //   const [totalPrice, setTotalPrice] = useState<number>(0);
// // //   const [weight, setWeight] = useState<number>(0);
// // //   const [units, setUnits] = useState<Units>(Units.Grams);
// // //   const [purity, setPurity] = useState<number>(24);
// // //   const [country, setCountry] = useState<string>("Pakistan");

// // //   // // Gold rates by currency and countries
// // //   // const rates: Record<string, number> = {
// // //   //   USD: 1,
// // //   //   AED: 3.673,
// // //   //   INR: 83.804808,
// // //   //   PKR: 305.3,
// // //   //   SAR: 3.75,
// // //   // };

// // //   const countryMap: Record<string, string> = {
// // //     USD: "USA",
// // //     AED: "United Arab Emirates",
// // //     INR: "India",
// // //     PKR: "Pakistan",
// // //     SAR: "Saudi Arabia",
// // //   };

// // //   const countries1: Record<string, { rate: number; currency: string }> = {};
// // //   for (const [code, rate] of Object.entries(currencyLive)) {
// // //     const countryName = countryMap[code];
// // //     if (countryName) {
// // //       countries1[countryName] = {
// // //         rate,
// // //         currency: code,
// // //       };
// // //     }
// // //   }

// // //   const { rate: todayRate, currency } = countries1[country] || {
// // //     rate: live,
// // //     currency: "USD",
// // //   };

// // //   const goldRatesByCountry = useMemo(() => {
// // //     if (!todayRate) return [];

// // //     return [
// // //       // Gold rates in Ounce
// // //       {
// // //         country,
// // //         units: Units.Ounces,
// // //         purity: 24,
// // //         rate: todayRate * live,
// // //         currency,
// // //       },
// // //       {
// // //         country,
// // //         units: Units.Ounces,
// // //         purity: 22,
// // //         rate: ((todayRate * live) / 24) * 22,
// // //         currency,
// // //       },
// // //       {
// // //         country,
// // //         units: Units.Ounces,
// // //         purity: 21,
// // //         rate: ((todayRate * live) / 24) * 21,
// // //         currency,
// // //       },

// // //       // Gold rates in Gram
// // //       {
// // //         country,
// // //         units: Units.Grams,
// // //         purity: 24,
// // //         rate: (todayRate * live) / 31.1,
// // //         currency,
// // //       },
// // //       {
// // //         country,
// // //         units: Units.Grams,
// // //         purity: 22,
// // //         rate: (0.9166 * 11.6638 * (todayRate * live)) / 31.1 / 11.663,
// // //         currency,
// // //       },
// // //       {
// // //         country,
// // //         units: Units.Grams,
// // //         purity: 21,
// // //         rate: (0.875 * 11.6638 * (todayRate * live)) / 31.1 / 11.6638,
// // //         currency,
// // //       },

// // //       // Gold rates in Tola
// // //       {
// // //         country,
// // //         units: Units.Tola,
// // //         purity: 24,
// // //         rate: ((todayRate * live) / 31.1) * 11.6638,
// // //         currency,
// // //       },
// // //       {
// // //         country,
// // //         units: Units.Tola,
// // //         purity: 22,
// // //         rate: (0.9166 * 11.6638 * (todayRate * live)) / 31.1,
// // //         currency,
// // //       },
// // //       {
// // //         country,
// // //         units: Units.Tola,
// // //         purity: 21,
// // //         rate: (0.875 * 11.6638 * (todayRate * live)) / 31.1,
// // //         currency,
// // //       },
// // //     ];
// // //   }, [country, todayRate]);
// // //   console.log(todayRate, "todayRate");
// // //   console.log(country, "country");
// // //   useEffect(() => {
// // //     setTotalPrice(
// // //       calculateTotalPrice(weight, goldRatesByCountry, units, purity, country)
// // //     );
// // //   }, [weight, units, purity, country, goldRatesByCountry]);

// // //   const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
// // //     setCountry(event.target.value);
// // //   };

// // //   const handleUnitsChange = (newUnits: Units) => {
// // //     setUnits(newUnits);
// // //   };

// // //   const handlePurityChange = (newPurity: number) => {
// // //     setPurity(newPurity);
// // //   };

// // //   const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // //     setWeight(Number(event.target.value));
// // //   };

// // //   const calculateTotalPrice = (
// // //     weight: number,
// // //     goldRates: {
// // //       country: string;
// // //       units: Units;
// // //       purity: number;
// // //       rate: number;
// // //       currency: string;
// // //     }[],
// // //     units: Units,
// // //     purity: number,
// // //     country: string
// // //   ) => {
// // //     const selectedRate = goldRates.find(
// // //       (r) => r.units === units && r.purity === purity && r.country === country
// // //     );
// // //     return selectedRate ? selectedRate.rate * weight : 0;
// // //   };

// // //   return (
// // //     <section
// // //       id="gold-exhibition"
// // //       data-testid="gold-calculator"
// // //       className="relative h-[calc(100vh_-_40vh)] bg-[url('/assets/gold-exibition.png')] bg-cover bg-center bg-no-repeat"
// // //     >
// // //       <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-black/70 px-1">
// // //         <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
// // //           Today's Gold Price{" "}
// // //           <span className="text-yellow-500">{formatDate(new Date())}</span>
// // //         </h2>
// // //         <div>
// // //           <select
// // //             value={country}
// // //             onChange={handleCountryChange}
// // //             className="mb-4 px-2 py-1 rounded-full"
// // //           >
// // //             {Object.keys(countries1).map((countryName) => (
// // //               <option key={countryName} value={countryName}>
// // //                 {countryName}
// // //               </option>
// // //             ))}
// // //           </select>
// // //         </div>
// // //         <div className="space-x-2 space-y-2 md:space-x-5">
// // //           <button
// // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // //               units === Units.Grams
// // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // //                 : ""
// // //             }`}
// // //             onClick={() => handleUnitsChange(Units.Grams)}
// // //           >
// // //             Gram
// // //           </button>
// // //           <button
// // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // //               units === Units.Tola
// // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // //                 : ""
// // //             }`}
// // //             onClick={() => handleUnitsChange(Units.Tola)}
// // //           >
// // //             Tola
// // //           </button>
// // //           <button
// // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // //               units === Units.Ounces
// // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // //                 : ""
// // //             }`}
// // //             onClick={() => handleUnitsChange(Units.Ounces)}
// // //           >
// // //             Ounce
// // //           </button>
// // //         </div>
// // //         <div className="space-x-2 md:space-x-5">
// // //           <button
// // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // //               purity === 24
// // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // //                 : ""
// // //             }`}
// // //             onClick={() => handlePurityChange(24)}
// // //           >
// // //             24k
// // //           </button>
// // //           <button
// // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // //               purity === 22
// // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // //                 : ""
// // //             }`}
// // //             onClick={() => handlePurityChange(22)}
// // //           >
// // //             22k
// // //           </button>
// // //           <button
// // //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// // //               purity === 21
// // //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// // //                 : ""
// // //             }`}
// // //             onClick={() => handlePurityChange(21)}
// // //           >
// // //             21k
// // //           </button>
// // //         </div>
// // //         <div>
// // //           <input
// // //             id="weight"
// // //             type="number"
// // //             placeholder="Weight"
// // //             className="rounded-lg border border-gray-300 px-2 py-1 text-black"
// // //             value={weight}
// // //             onChange={handleWeightChange}
// // //           />
// // //         </div>
// // //         <div className="flex flex-col items-center justify-center space-y-4">
// // //           <p className="text-xl font-semibold text-yellow-400">Total Price</p>
// // //           <p className="text-2xl font-bold text-white">{totalPrice}</p>
// // //         </div>
// // //         {isLoading && <Loader />}
// // //         {error && <p className="text-red-500">{error}</p>}
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default GoldCalculator;

// // "use client";
// // import React, { useEffect, useState, useMemo, FC } from "react";
// // import { Loader } from "@/app/ui";
// // import { useGoldRate } from "@/context/GoldRateContext";
// // import { Units } from "@/common.types";
// // import formatDate from "@/helpers/dateFormatter";

// // const GoldCalculator: FC = () => {
// //   const { todayRateusd, isLoading, error, live, currencyLive } = useGoldRate();
// //   console.log(currencyLive, "currencyLive");

// //   const [totalPrice, setTotalPrice] = useState<number>(0);
// //   const [weight, setWeight] = useState<number>(0);
// //   const [units, setUnits] = useState<Units>(Units.Grams);
// //   const [purity, setPurity] = useState<number>(24);
// //   const [country, setCountry] = useState<string>("Pakistan");

// //   // Define country mapping and gold rates
// //   const countryMap: Record<string, string> = {
// //     USD: "USA",
// //     AED: "United Arab Emirates",
// //     INR: "India",
// //     PKR: "Pakistan",
// //     SAR: "Saudi Arabia",
// //   };

// //   const countries1: Record<string, { rate: number; currency: string }> = {};
// //   for (const [code, rate] of Object.entries(currencyLive)) {
// //     const countryName = countryMap[code];
// //     if (countryName) {
// //       countries1[countryName] = {
// //         rate,
// //         currency: code,
// //       };
// //     }
// //   }

// //   // Default to the rate of the selected country
// //   const { rate: todayRate, currency } = countries1[country] || {
// //     rate: live,
// //     currency: "USD",
// //   };

// //   // Calculate gold rates based on the current country and rate
// //   const goldRatesByCountry = useMemo(() => {
// //     if (!todayRate) return [];

// //     return [
// //       // Gold rates in Ounce
// //       {
// //         country,
// //         units: Units.Ounces,
// //         purity: 24,
// //         rate: todayRate * live,
// //         currency,
// //       },
// //       {
// //         country,
// //         units: Units.Ounces,
// //         purity: 22,
// //         rate: ((todayRate * live) / 24) * 22,
// //         currency,
// //       },
// //       {
// //         country,
// //         units: Units.Ounces,
// //         purity: 21,
// //         rate: ((todayRate * live) / 24) * 21,
// //         currency,
// //       },

// //       // Gold rates in Gram
// //       {
// //         country,
// //         units: Units.Grams,
// //         purity: 24,
// //         rate: (todayRate * live) / 31.1,
// //         currency,
// //       },
// //       {
// //         country,
// //         units: Units.Grams,
// //         purity: 22,
// //         rate: (0.9166 * 11.6638 * (todayRate * live)) / 31.1 / 11.663,
// //         currency,
// //       },
// //       {
// //         country,
// //         units: Units.Grams,
// //         purity: 21,
// //         rate: (0.875 * 11.6638 * (todayRate * live)) / 31.1 / 11.6638,
// //         currency,
// //       },

// //       // Gold rates in Tola
// //       {
// //         country,
// //         units: Units.Tola,
// //         purity: 24,
// //         rate: ((todayRate * live) / 31.1) * 11.6638,
// //         currency,
// //       },
// //       {
// //         country,
// //         units: Units.Tola,
// //         purity: 22,
// //         rate: (0.9166 * 11.6638 * (todayRate * live)) / 31.1,
// //         currency,
// //       },
// //       {
// //         country,
// //         units: Units.Tola,
// //         purity: 21,
// //         rate: (0.875 * 11.6638 * (todayRate * live)) / 31.1,
// //         currency,
// //       },
// //     ];
// //   }, [country, todayRate, live]);

// //   // Calculate the total price whenever weight, units, purity, country, or goldRatesByCountry change
// //   useEffect(() => {
// //     setTotalPrice(
// //       calculateTotalPrice(weight, goldRatesByCountry, units, purity, country)
// //     );
// //   }, [weight, units, purity, country, goldRatesByCountry]);

// //   const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
// //     setCountry(event.target.value);
// //   };

// //   const handleUnitsChange = (newUnits: Units) => {
// //     setUnits(newUnits);
// //   };

// //   const handlePurityChange = (newPurity: number) => {
// //     setPurity(newPurity);
// //   };

// //   const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     setWeight(Number(event.target.value));
// //   };

// //   const calculateTotalPrice = (
// //     weight: number,
// //     goldRates: {
// //       country: string;
// //       units: Units;
// //       purity: number;
// //       rate: number;
// //       currency: string;
// //     }[],
// //     units: Units,
// //     purity: number,
// //     country: string
// //   ) => {
// //     const selectedRate = goldRates.find(
// //       (r) => r.units === units && r.purity === purity && r.country === country
// //     );
// //     return selectedRate ? selectedRate.rate * weight : 0;
// //   };

// //   return (
// //     <section
// //       id="gold-exhibition"
// //       data-testid="gold-calculator"
// //       className="relative h-[calc(100vh_-_40vh)] bg-[url('/assets/gold-exibition.png')] bg-cover bg-center bg-no-repeat"
// //     >
// //       <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-black/70 px-1">
// //         <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
// //           Today's Gold Price{" "}
// //           <span className="text-yellow-500">{formatDate(new Date())}</span>
// //         </h2>
// //         <div>
// //           <select
// //             value={country}
// //             onChange={handleCountryChange}
// //             className="mb-4 px-2 py-1 rounded-full"
// //           >
// //             {Object.keys(countries1).map((countryName) => (
// //               <option key={countryName} value={countryName}>
// //                 {countryName}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //         <div className="space-x-2 space-y-2 md:space-x-5">
// //           <button
// //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// //               units === Units.Grams
// //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// //                 : ""
// //             }`}
// //             onClick={() => handleUnitsChange(Units.Grams)}
// //           >
// //             Gram
// //           </button>
// //           <button
// //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// //               units === Units.Tola
// //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// //                 : ""
// //             }`}
// //             onClick={() => handleUnitsChange(Units.Tola)}
// //           >
// //             Tola
// //           </button>
// //           <button
// //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// //               units === Units.Ounces
// //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// //                 : ""
// //             }`}
// //             onClick={() => handleUnitsChange(Units.Ounces)}
// //           >
// //             Ounce
// //           </button>
// //         </div>
// //         <div className="space-x-2 md:space-x-5">
// //           <button
// //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// //               purity === 24
// //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// //                 : ""
// //             }`}
// //             onClick={() => handlePurityChange(24)}
// //           >
// //             24k
// //           </button>
// //           <button
// //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// //               purity === 22
// //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// //                 : ""
// //             }`}
// //             onClick={() => handlePurityChange(22)}
// //           >
// //             22k
// //           </button>
// //           <button
// //             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
// //               purity === 21
// //                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
// //                 : ""
// //             }`}
// //             onClick={() => handlePurityChange(21)}
// //           >
// //             21k
// //           </button>
// //         </div>
// //         <input
// //           type="number"
// //           value={weight}
// //           onChange={handleWeightChange}
// //           className="mt-4 w-full max-w-xs rounded-lg p-2 text-center"
// //           placeholder="Enter weight"
// //         />
// //         <p className="mt-2 text-2xl font-bold text-white">
// //           Total Price: {totalPrice.toFixed(2)} {currency}
// //         </p>
// //         {isLoading && <Loader />}
// //         {error && <p className="text-red-500">{error}</p>}
// //       </div>
// //     </section>
// //   );
// // };

// // export default GoldCalculator;

// "use client";
// import React, { useEffect, useState, useMemo, FC } from "react";
// import { Loader } from "@/app/ui";
// import { useGoldRate } from "@/context/GoldRateContext";
// import { Units } from "@/common.types";
// import formatDate from "@/helpers/dateFormatter";

// const GoldCalculator: FC = () => {
//   const { todayRateusd, isLoading, error, live, currencyLive } = useGoldRate();
//   console.log(currencyLive, "currencyLive");

//   const [totalPrice, setTotalPrice] = useState<number>(0);
//   const [weight, setWeight] = useState<number>(0);
//   const [units, setUnits] = useState<Units>(Units.Grams);
//   const [purity, setPurity] = useState<number>(24);
//   const [country, setCountry] = useState<string>("Pakistan");
//   const [priceLocked, setPriceLocked] = useState<boolean>(false); // New state to lock the price

//   // Define country mapping and gold rates
//   const countryMap: Record<string, string> = {
//     USD: "USA",
//     AED: "United Arab Emirates",
//     INR: "India",
//     PKR: "Pakistan",
//     SAR: "Saudi Arabia",
//   };

//   const countries1: Record<string, { rate: number; currency: string }> = {};
//   for (const [code, rate] of Object.entries(currencyLive)) {
//     const countryName = countryMap[code];
//     if (countryName) {
//       countries1[countryName] = {
//         rate,
//         currency: code,
//       };
//     }
//   }

//   // Default to the rate of the selected country
//   const { rate: todayRate, currency } = countries1[country] || {
//     rate: live,
//     currency: "USD",
//   };

//   // Calculate gold rates based on the current country and rate
//   const goldRatesByCountry = useMemo(() => {
//     if (!todayRate) return [];

//     return [
//       // Gold rates in Ounce
//       {
//         country,
//         units: Units.Ounces,
//         purity: 24,
//         rate: todayRate * live,
//         currency,
//       },
//       {
//         country,
//         units: Units.Ounces,
//         purity: 22,
//         rate: ((todayRate * live) / 24) * 22,
//         currency,
//       },
//       {
//         country,
//         units: Units.Ounces,
//         purity: 21,
//         rate: ((todayRate * live) / 24) * 21,
//         currency,
//       },

//       // Gold rates in Gram
//       {
//         country,
//         units: Units.Grams,
//         purity: 24,
//         rate: (todayRate * live) / 31.1,
//         currency,
//       },
//       {
//         country,
//         units: Units.Grams,
//         purity: 22,
//         rate: (0.9166 * 11.6638 * (todayRate * live)) / 31.1 / 11.663,
//         currency,
//       },
//       {
//         country,
//         units: Units.Grams,
//         purity: 21,
//         rate: (0.875 * 11.6638 * (todayRate * live)) / 31.1 / 11.6638,
//         currency,
//       },

//       // Gold rates in Tola
//       {
//         country,
//         units: Units.Tola,
//         purity: 24,
//         rate: ((todayRate * live) / 31.1) * 11.6638,
//         currency,
//       },
//       {
//         country,
//         units: Units.Tola,
//         purity: 22,
//         rate: (0.9166 * 11.6638 * (todayRate * live)) / 31.1,
//         currency,
//       },
//       {
//         country,
//         units: Units.Tola,
//         purity: 21,
//         rate: (0.875 * 11.6638 * (todayRate * live)) / 31.1,
//         currency,
//       },
//     ];
//   }, [country, todayRate, live]);

//   // Calculate the total price only if price is not locked
//   useEffect(() => {
//     if (!priceLocked) {
//       setTotalPrice(
//         calculateTotalPrice(weight, goldRatesByCountry, units, purity, country)
//       );
//     }
//   }, [weight, units, purity, country, goldRatesByCountry, priceLocked]);

//   // Handle changes to country selection
//   const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setCountry(event.target.value);
//     setPriceLocked(false); // Allow recalculation when country changes
//   };

//   // Handle changes to units selection
//   const handleUnitsChange = (newUnits: Units) => {
//     setUnits(newUnits);
//     setPriceLocked(false); // Allow recalculation when units change
//   };

//   // Handle changes to purity selection
//   const handlePurityChange = (newPurity: number) => {
//     setPurity(newPurity);
//     setPriceLocked(false); // Allow recalculation when purity changes
//   };

//   // Handle changes to weight input
//   const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setWeight(Number(event.target.value));
//     setPriceLocked(false); // Allow recalculation when weight changes
//   };

//   // Calculate total price based on weight and selected gold rates
//   const calculateTotalPrice = (
//     weight: number,
//     goldRates: {
//       country: string;
//       units: Units;
//       purity: number;
//       rate: number;
//       currency: string;
//     }[],
//     units: Units,
//     purity: number,
//     country: string
//   ) => {
//     const selectedRate = goldRates.find(
//       (r) => r.units === units && r.purity === purity && r.country === country
//     );
//     return selectedRate ? selectedRate.rate * weight : 0;
//   };

//   return (
//     <section
//       id="gold-exhibition"
//       data-testid="gold-calculator"
//       className="relative h-[calc(100vh_-_40vh)] bg-[url('/assets/gold-exibition.png')] bg-cover bg-center bg-no-repeat"
//     >
//       <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-black/70 px-1">
//         <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
//           Today's Gold Price{" "}
//           <span className="text-yellow-500">{formatDate(new Date())}</span>
//         </h2>
//         <div>
//           <select
//             value={country}
//             onChange={handleCountryChange}
//             className="mb-4 px-2 py-1 rounded-full"
//           >
//             {Object.keys(countries1).map((countryName) => (
//               <option key={countryName} value={countryName}>
//                 {countryName}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="space-x-2 space-y-2 md:space-x-5">
//           <button
//             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
//               units === Units.Grams
//                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
//                 : ""
//             }`}
//             onClick={() => handleUnitsChange(Units.Grams)}
//           >
//             Gram
//           </button>
//           <button
//             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
//               units === Units.Tola
//                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
//                 : ""
//             }`}
//             onClick={() => handleUnitsChange(Units.Tola)}
//           >
//             Tola
//           </button>
//           <button
//             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
//               units === Units.Ounces
//                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
//                 : ""
//             }`}
//             onClick={() => handleUnitsChange(Units.Ounces)}
//           >
//             Ounce
//           </button>
//         </div>
//         <div className="space-x-2 md:space-x-5">
//           <button
//             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
//               purity === 24
//                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
//                 : ""
//             }`}
//             onClick={() => handlePurityChange(24)}
//           >
//             24k
//           </button>
//           <button
//             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
//               purity === 22
//                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
//                 : ""
//             }`}
//             onClick={() => handlePurityChange(22)}
//           >
//             22k
//           </button>
//           <button
//             className={`w-24 rounded-full py-1 sm:py-2 text-xl font-bold text-white md:w-28 ${
//               purity === 21
//                 ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400"
//                 : ""
//             }`}
//             onClick={() => handlePurityChange(21)}
//           >
//             21k
//           </button>
//         </div>
//         <input
//           type="number"
//           value={weight}
//           onChange={handleWeightChange}
//           className="mt-4 w-full max-w-xs rounded-lg p-2 text-center"
//           placeholder="Enter weight"
//         />
//         <p className="mt-2 text-2xl font-bold text-white">
//           Total Price: {totalPrice.toFixed(2)} {currency}
//         </p>
//         {isLoading && <Loader />}
//         {error && <p className="text-red-500">{error}</p>}
//       </div>
//     </section>
//   );
// };

// export default GoldCalculator;

"use client";
import React, { useEffect, useState, useMemo, FC } from "react";
import { Loader } from "@/app/ui";
import { useGoldRate } from "@/context/GoldRateContext";
import { Units } from "@/common.types";
import formatDate from "@/helpers/dateFormatter";

const GoldCalculator: FC = () => {
  const { isLoading, error, live, currencyLive } = useGoldRate();

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [weight, setWeight] = useState<number>(1); // Default value set to 1
  const [units, setUnits] = useState<Units>(Units.Grams);
  const [purity, setPurity] = useState<number>(24);
  const [country, setCountry] = useState<string>("Pakistan");
  const [priceLocked, setPriceLocked] = useState<boolean>(false); // New state to lock the price

  const countryMap: Record<string, string> = {
    USD: "USA",
    AED: "United Arab Emirates",
    INR: "India",
    PKR: "Pakistan",
    SAR: "Saudi Arabia",
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
  console.log(todayRate, "todayRate");
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
