// "use client";
// import { useState, FC, useMemo } from "react";
// import { useGoldRate } from "@/context/GoldRateContext";
// import { TabNavItem } from "./TabNavItem";
// import { TabContent } from "./TabContent";
// import { RedArrow } from "@/icons";
// import { Loader } from "@/app/ui";

// const GoldRatesGeneral: FC = () => {
//   const { todayRate, yesterdayRate, isLoading, error } = useGoldRate();
//   const [activeTab, setActiveTab] = useState("tab1");

//   // Define the gold rates for different purities
//   const goldRates = useMemo(
//     () => ({
//       24: {
//         gram: todayRate / 31.1,
//         gramprev: yesterdayRate / 31.1,
//       },
//       22: {
//         gram: (0.916666 * 11.6638 * todayRate) / 31.1 / 11.6638,
//         gramprev: (0.916666 * 11.6638 * yesterdayRate) / 31.1 / 11.6638,
//       },
//       21: {
//         gram: (0.8750 * 11.6638 * todayRate) / 31.1 / 11.6638,
//         gramprev: (0.8750 * 11.6638 * yesterdayRate) / 31.1 / 11.6638,
//       },
//     }),
//     [todayRate]
//   );

//   return (
//     <section className="bg-white">
//       <div className="container py-10 sm:py-16">
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold uppercase text-[#333333]">
//             GOLD RATES
//           </h2>
//         </div>
//         <div className="Tabs mt-10 sm:mt-16">
//           <ul className="nav flex justify-center gap-6 md:gap-20">
//             <TabNavItem
//               city="24 Carat"
//               id="tab1"
//               activeTab={activeTab}
//               setActiveTab={setActiveTab}
//             />
//             <TabNavItem
//               city="22 Carat"
//               id="tab2"
//               activeTab={activeTab}
//               setActiveTab={setActiveTab}
//             />
//             <TabNavItem
//               city="21 Carat"
//               id="tab3"
//               activeTab={activeTab}
//               setActiveTab={setActiveTab}
//             />
//           </ul>

//           <div className="mt-16">
//             <TabContent id="tab1" activeTab={activeTab}>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <tbody>
//                     <tr className="border-b-2 border-gray-300">
//                       <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
//                         Gram
//                       </th>
//                       <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
//                         24K Gold Price
//                       </th>
//                       <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
//                         Daily Price Change
//                       </th>
//                     </tr>
//                     <tr className="border-b-2 border-gray-200 text-center">
//                       <td className="py-4 font-semibold  text-[#333333]">
//                         1 Gram
//                       </td>
//                       <td className="py-4 font-semibold text-[#333333]">
//                         {isLoading ? (
//                           <Loader center />
//                         ) : (
//                           goldRates[24].gram.toFixed()
//                         )}{" "}
//                         <span className="ml-2 text-xs">PKR</span>
//                       </td>
//                       <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
//                         +0.54%
//                         <span className="ml-6">
//                           <RedArrow />
//                         </span>
//                       </td>
//                     </tr>
//                     <tr className="border-b-2 border-gray-200 text-center">
//                       <td className="py-4 font-semibold  text-[#333333]">
//                         5 Gram
//                       </td>
//                       <td className="py-4 font-semibold text-[#333333] ">
//                         {isLoading ? (
//                           <Loader center />
//                         ) : (
//                           (goldRates[24].gram * 5).toFixed(0)
//                         )}{" "}
//                         <span className="ml-2 text-xs">PKR</span>
//                       </td>
//                       <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
//                         +0.54%
//                         <span className="ml-6">
//                           <RedArrow />
//                         </span>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </TabContent>
//             <TabContent id="tab2" activeTab={activeTab}>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <tbody>
//                     <tr className="border-b-2 border-gray-300">
//                       <th className="w-24 py-4 text-center align-middle text-xl font-bold text-[#333333]">
//                         Gram
//                       </th>
//                       <th className="w-24 py-4 text-center align-middle text-xl font-bold text-[#333333]">
//                         22K Gold Price
//                       </th>
//                       <th className="w-24 py-4 text-center align-middle text-xl font-bold text-[#333333]">
//                         Daily Price Change
//                       </th>
//                     </tr>

//                     <tr className="border-b-2 border-gray-200 text-center">
//                       <td className="py-4 font-semibold  text-[#333333]">
//                         5 Gram
//                       </td>
//                       <td className="py-4 font-semibold text-[#333333] ">
//                         {isLoading ? (
//                           <Loader center />
//                         ) : (
//                           (goldRates[22].gram * 5).toFixed(0)
//                         )}{" "}
//                         <span className="ml-2 text-xs">PKR</span>
//                       </td>
//                       <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
//                         +0.54%
//                         <span className="ml-6">
//                           <RedArrow />
//                         </span>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </TabContent>
//             <TabContent id="tab3" activeTab={activeTab}>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <tbody>
//                     <tr className="border-b-2 border-gray-300">
//                       <th className="w-24 py-4 text-center align-middle text-xl font-bold text-[#333333]">
//                         Gram
//                       </th>
//                       <th className="w-24 py-4 text-center align-middle text-xl font-bold text-[#333333]">
//                         21K Gold Price
//                       </th>
//                       <th className="w-24 py-4 text-center align-middle text-xl font-bold text-[#333333]">
//                         Daily Price Change
//                       </th>
//                     </tr>
//                     <tr className="border-b-2 border-gray-200 text-center">
//                       <td className="py-4 font-semibold  text-[#333333]">
//                         1 Gram
//                       </td>
//                       <td className="py-4 font-semibold text-[#333333] ">
//                         {isLoading ? (
//                           <Loader center />
//                         ) : (
//                           goldRates[21].gram.toFixed(0)
//                         )}{" "}
//                         <span className="ml-2 text-xs">PKR</span>
//                       </td>
//                       <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
//                         +0.54%
//                         <span className="ml-6">
//                           <RedArrow />
//                         </span>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </TabContent>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GoldRatesGeneral;
// "use client";
// import { useState, FC, useMemo } from "react";
// import { useGoldRate } from "@/context/GoldRateContext";
// import { TabNavItem } from "./TabNavItem";
// import { TabContent } from "./TabContent";
// import { RedArrow, GreenArrow } from "@/icons";
// import { Loader } from "@/app/ui";

// const GoldRatesGeneral: FC = () => {
//   const { todayRate, yesterdayRate, isLoading, error } = useGoldRate();
//   const [activeTab, setActiveTab] = useState("tab1");

//   // Define the gold rates for different purities
//   const goldRates = useMemo(
//     () => ({
//       24: {
//         gram: todayRate / 31.1,
//         gramprev: yesterdayRate / 31.1,
//       },
//       22: {
//         gram: (0.916666 * 11.6638 * todayRate) / 31.1 / 11.6638,
//         gramprev: (0.916666 * 11.6638 * yesterdayRate) / 31.1 / 11.6638,
//       },
//       21: {
//         gram: (0.8750 * 11.6638 * todayRate) / 31.1 / 11.6638,
//         gramprev: (0.8750 * 11.6638 * yesterdayRate) / 31.1 / 11.6638,
//       },
//     }),
//     [todayRate, yesterdayRate]
//   );

//   const calculateChange = (gram: number, gramprev: number) => {
//     console.log(gram, gramprev);
//     if (gram && gramprev) {
//       const change = ((gram - gramprev) / gramprev) * 100;
//       return change.toFixed(2);
//     }
//     return "0.00";
//   };

//   const getArrow = (change: string) => {
//     return parseFloat(change) >= 0 ? <GreenArrow /> : <RedArrow />;
//   };

//   return (
//     <section className="bg-white">
//       <div className="container py-10 sm:py-16">
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold uppercase text-[#333333]">
//             GOLD RATES
//           </h2>
//         </div>
//         <div className="Tabs mt-10 sm:mt-16">
//           <ul className="nav flex justify-center gap-6 md:gap-20">
//             <TabNavItem
//               city="24 Carat"
//               id="tab1"
//               activeTab={activeTab}
//               setActiveTab={setActiveTab}
//             />
//             <TabNavItem
//               city="22 Carat"
//               id="tab2"
//               activeTab={activeTab}
//               setActiveTab={setActiveTab}
//             />
//             <TabNavItem
//               city="21 Carat"
//               id="tab3"
//               activeTab={activeTab}
//               setActiveTab={setActiveTab}
//             />
//           </ul>

//           <div className="mt-16">
//             <TabContent id="tab1" activeTab={activeTab}>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <tbody>
//                     <tr className="border-b-2 border-gray-300">
//                       <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
//                         Gram
//                       </th>
//                       <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
//                         24K Gold Price
//                       </th>
//                       <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
//                         Daily Price Change
//                       </th>
//                     </tr>
//                     <tr className="border-b-2 border-gray-200 text-center">
//                       <td className="py-4 font-semibold  text-[#333333]">
//                         1 Gram
//                       </td>
//                       <td className="py-4 font-semibold text-[#333333]">
//                         {isLoading ? (
//                           <Loader center />
//                         ) : (
//                           goldRates[24].gram.toFixed(0)
//                         )}{" "}
//                         <span className="ml-2 text-xs">PKR</span>
//                       </td>
//                       <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
//                         {isLoading ? (
//                           <Loader center />
//                         ) : (
//                           <>
//                             {calculateChange(
//                               goldRates[24].gram,
//                               goldRates[24].gramprev
//                             )}
//                             %
//                             <span className="ml-6">
//                               {getArrow(
//                                 calculateChange(
//                                   goldRates[24].gram,
//                                   goldRates[24].gramprev
//                                 )
//                               )}
//                             </span>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                     <tr className="border-b-2 border-gray-200 text-center">
//                       <td className="py-4 font-semibold  text-[#333333]">
//                         5 Gram
//                       </td>
//                       <td className="py-4 font-semibold text-[#333333] ">
//                         {isLoading ? (
//                           <Loader center />
//                         ) : (
//                           (goldRates[24].gram * 5).toFixed(0)
//                         )}{" "}
//                         <span className="ml-2 text-xs">PKR</span>
//                       </td>
//                       <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
//                         {isLoading ? (
//                           <Loader center />
//                         ) : (
//                           <>
//                             {calculateChange(
//                               goldRates[24].gram * 5,
//                               goldRates[24].gramprev * 5
//                             )}
//                             %
//                             <span className="ml-6">
//                               {getArrow(
//                                 calculateChange(
//                                   goldRates[24].gram * 5,
//                                   goldRates[24].gramprev * 5
//                                 )
//                               )}
//                             </span>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </TabContent>

//             <TabContent id="tab2" activeTab={activeTab}>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <tbody>
//                     <tr className="border-b-2 border-gray-300">
//                       <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
//                         Gram
//                       </th>
//                       <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
//                         22K Gold Price
//                       </th>
//                       <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
//                         Daily Price Change
//                       </th>
//                     </tr>
//                     <tr className="border-b-2 border-gray-200 text-center">
//                       <td className="py-4 font-semibold  text-[#333333]">
//                         1 Gram
//                       </td>
//                       <td className="py-4 font-semibold text-[#333333]">
//                         {isLoading ? (
//                           <Loader center />
//                         ) : (
//                           goldRates[22].gram.toFixed(0)
//                         )}{" "}
//                         <span className="ml-2 text-xs">PKR</span>
//                       </td>
//                       <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
//                         {isLoading ? (
//                           <Loader center />
//                         ) : (
//                           <>
//                             {calculateChange(
//                               goldRates[22].gram,
//                               goldRates[22].gramprev
//                             )}
//                             %
//                             <span className="ml-6">
//                               {getArrow(
//                                 calculateChange(
//                                   goldRates[22].gram,
//                                   goldRates[22].gramprev
//                                 )
//                               )}
//                             </span>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                     <tr className="border-b-2 border-gray-200 text-center">
//                       <td className="py-4 font-semibold  text-[#333333]">
//                         5 Gram
//                       </td>
//                       <td className="py-4 font-semibold text-[#333333] ">
//                         {isLoading ? (
//                           <Loader center />
//                         ) : (
//                           (goldRates[22].gram * 5).toFixed(0)
//                         )}{" "}
//                         <span className="ml-2 text-xs">PKR</span>
//                       </td>
//                       <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
//                         {isLoading ? (
//                           <Loader center />
//                         ) : (
//                           <>
//                             {calculateChange(
//                               goldRates[22].gram * 5,
//                               goldRates[22].gramprev * 5
//                             )}
//                             %
//                             <span className="ml-6">
//                               {getArrow(
//                                 calculateChange(
//                                   goldRates[22].gram * 5,
//                                   goldRates[22].gramprev * 5
//                                 )
//                               )}
//                             </span>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </TabContent>

//             <TabContent id="tab3" activeTab={activeTab}>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <tbody>
//                     <tr className="border-b-2 border-gray-300">
//                       <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
//                         Gram
//                       </th>
//                       <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
//                         21K Gold Price
//                       </th>
//                       <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
//                         Daily Price Change
//                       </th>
//                     </tr>
//                     <tr className="border-b-2 border-gray-200 text-center">
//                       <td className="py-4 font-semibold  text-[#333333]">
//                         1 Gram
//                       </td>
//                       <td className="py-4 font-semibold text-[#333333]">
//                         {isLoading ? (
//                           <Loader center />
//                         ) : (
//                           goldRates[21].gram.toFixed(0)
//                         )}{" "}
//                         <span className="ml-2 text-xs">PKR</span>
//                       </td>
//                       <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
//                         {isLoading ? (
//                           <Loader center />
//                         ) : (
//                           <>
//                             {calculateChange(
//                               goldRates[21].gram,
//                               goldRates[21].gramprev
//                             )}
//                             %
//                             <span className="ml-6">
//                               {getArrow(
//                                 calculateChange(
//                                   goldRates[21].gram,
//                                   goldRates[21].gramprev
//                                 )
//                               )}
//                             </span>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                     <tr className="border-b-2 border-gray-200 text-center">
//                       <td className="py-4 font-semibold  text-[#333333]">
//                         5 Gram
//                       </td>
//                       <td className="py-4 font-semibold text-[#333333] ">
//                         {isLoading ? (
//                           <Loader center />
//                         ) : (
//                           (goldRates[21].gram * 5).toFixed(0)
//                         )}{" "}
//                         <span className="ml-2 text-xs">PKR</span>
//                       </td>
//                       <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
//                         {isLoading ? (
//                           <Loader center />
//                         ) : (
//                           <>
//                             {calculateChange(
//                               goldRates[21].gram * 5,
//                               goldRates[21].gramprev * 5
//                             )}
//                             %
//                             <span className="ml-6">
//                               {getArrow(
//                                 calculateChange(
//                                   goldRates[21].gram * 5,
//                                   goldRates[21].gramprev * 5
//                                 )
//                               )}
//                             </span>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </TabContent>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GoldRatesGeneral;

"use client";
import { useState, FC, useMemo } from "react";
import { useGoldRate } from "@/context/GoldRateContext";
import { TabNavItem } from "./TabNavItem";
import { TabContent } from "./TabContent";
import { RedArrow, GreenArrow } from "@/icons";
import { Loader } from "@/app/ui";

const GoldRatesGeneral: FC = () => {
  const { todayRate, yesterdayRate, isLoading, error } = useGoldRate();
  const [activeTab, setActiveTab] = useState("tab1");

  // Define the gold rates for different purities
  const goldRates = useMemo(
    () => ({
      24: {
        gram: todayRate / 31.1,
        gramprev: yesterdayRate / 31.1,
      },
      22: {
        gram: (0.9166 * 11.6638 * todayRate) / 31.1 / 11.6638,
        gramprev: (0.9166 * 11.6638 * yesterdayRate) / 31.1 / 11.6638,
      },
      21: {
        gram: (0.875 * 11.6638 * todayRate) / 31.1 / 11.6638,
        gramprev: (0.875 * 11.6638 * yesterdayRate) / 31.1 / 11.6638,
      },
    }),
    [todayRate, yesterdayRate]
  );

  const calculateChange = (gram: number, gramprev: number) => {
    if (gram && gramprev) {
      const change = ((gram - gramprev) / gramprev) * 100;
      const sign = change > 0 ? "+" : "-";
      return { sign, value: change.toFixed(2) };
    }
    return { sign: "", value: "0.00" };
  };

  const getArrow = (change: string) => {
    return parseFloat(change) >= 0 ? <GreenArrow /> : <RedArrow />;
  };

  return (
    <section className="bg-white">
      <div className="container py-10 sm:py-16">
        <div className="text-center">
          <h2 className="text-2xl font-semibold uppercase text-[#333333]">
            GOLD RATES
          </h2>
        </div>
        <div className="Tabs mt-10 sm:mt-16">
          <ul className="nav flex justify-center gap-6 md:gap-20">
            <TabNavItem
              city="24 Carat"
              id="tab1"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <TabNavItem
              city="22 Carat"
              id="tab2"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <TabNavItem
              city="21 Carat"
              id="tab3"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </ul>

          <div className="mt-16">
            <TabContent id="tab1" activeTab={activeTab}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b-2 border-gray-300">
                      <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
                        Gram
                      </th>
                      <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
                        24K Gold Price
                      </th>
                      <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
                        Daily Price Change
                      </th>
                    </tr>
                    <tr className="border-b-2 border-gray-200 text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        1 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333]">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          goldRates[24].gram.toFixed(0)
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          <>
                            {
                              calculateChange(
                                goldRates[24].gram,
                                goldRates[24].gramprev
                              ).sign
                            }
                            {
                              calculateChange(
                                goldRates[24].gram,
                                goldRates[24].gramprev
                              ).value
                            }
                            %
                            <span className="ml-6">
                              {getArrow(
                                calculateChange(
                                  goldRates[24].gram,
                                  goldRates[24].gramprev
                                ).value
                              )}
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                    <tr className="border-b-2 border-gray-200 text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        5 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333] ">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          (goldRates[24].gram * 5).toFixed(0)
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          <>
                            {
                              calculateChange(
                                goldRates[24].gram * 5,
                                goldRates[24].gramprev * 5
                              ).sign
                            }
                            {
                              calculateChange(
                                goldRates[24].gram * 5,
                                goldRates[24].gramprev * 5
                              ).value
                            }
                            %
                            <span className="ml-6">
                              {getArrow(
                                calculateChange(
                                  goldRates[24].gram * 5,
                                  goldRates[24].gramprev * 5
                                ).value
                              )}
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                    <tr className="border-b-2 border-gray-200 text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        10 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333] ">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          (goldRates[24].gram * 10).toFixed(0)
                        )}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          <>
                            {
                              calculateChange(
                                goldRates[24].gram * 10,
                                goldRates[24].gramprev * 10
                              ).sign
                            }
                            {
                              calculateChange(
                                goldRates[24].gram * 10,
                                goldRates[24].gramprev * 10
                              ).value
                            }
                            %
                            <span className="ml-6">
                              {getArrow(
                                calculateChange(
                                  goldRates[24].gram * 10,
                                  goldRates[24].gramprev * 10
                                ).value
                              )}
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                    <tr className="border-b-2 border-gray-200 text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        1 Tola
                      </td>
                      <td className="py-4 font-semibold text-[#333333] ">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          (goldRates[24].gram * 11.6638).toFixed(0)
                        )}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          <>
                            {
                              calculateChange(
                                goldRates[24].gram * 11.6638,
                                goldRates[24].gramprev * 11.6638
                              ).sign
                            }
                            {
                              calculateChange(
                                goldRates[24].gram * 11.6638,
                                goldRates[24].gramprev * 11.6638
                              ).value
                            }
                            %
                            <span className="ml-6">
                              {getArrow(
                                calculateChange(
                                  goldRates[24].gram * 11.6638,
                                  goldRates[24].gramprev * 11.6638
                                ).value
                              )}
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabContent>

            <TabContent id="tab2" activeTab={activeTab}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b-2 border-gray-300">
                      <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
                        Gram
                      </th>
                      <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
                        22K Gold Price
                      </th>
                      <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
                        Daily Price Change
                      </th>
                    </tr>
                    <tr className="border-b-2 border-gray-200 text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        1 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333]">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          goldRates[22].gram.toFixed(0)
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          <>
                            {
                              calculateChange(
                                goldRates[22].gram,
                                goldRates[22].gramprev
                              ).sign
                            }
                            {
                              calculateChange(
                                goldRates[22].gram,
                                goldRates[22].gramprev
                              ).value
                            }
                            %
                            <span className="ml-6">
                              {getArrow(
                                calculateChange(
                                  goldRates[22].gram,
                                  goldRates[22].gramprev
                                ).value
                              )}
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                    <tr className="border-b-2 border-gray-200 text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        5 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333] ">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          (goldRates[22].gram * 5).toFixed(0)
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          <>
                            {
                              calculateChange(
                                goldRates[22].gram * 5,
                                goldRates[22].gramprev * 5
                              ).sign
                            }
                            {
                              calculateChange(
                                goldRates[22].gram * 5,
                                goldRates[22].gramprev * 5
                              ).value
                            }
                            %
                            <span className="ml-6">
                              {getArrow(
                                calculateChange(
                                  goldRates[22].gram * 5,
                                  goldRates[22].gramprev * 5
                                ).value
                              )}
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabContent>

            <TabContent id="tab3" activeTab={activeTab}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b-2 border-gray-300">
                      <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
                        Gram
                      </th>
                      <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
                        21K Gold Price
                      </th>
                      <th className="w-24 py-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333]">
                        Daily Price Change
                      </th>
                    </tr>
                    <tr className="border-b-2 border-gray-200 text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        1 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333]">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          goldRates[21].gram.toFixed(0)
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          <>
                            {
                              calculateChange(
                                goldRates[21].gram,
                                goldRates[21].gramprev
                              ).sign
                            }
                            {
                              calculateChange(
                                goldRates[21].gram,
                                goldRates[21].gramprev
                              ).value
                            }
                            %
                            <span className="ml-6">
                              {getArrow(
                                calculateChange(
                                  goldRates[21].gram,
                                  goldRates[21].gramprev
                                ).value
                              )}
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                    <tr className="border-b-2 border-gray-200 text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        5 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333] ">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          (goldRates[21].gram * 5).toFixed(0)
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          <>
                            {
                              calculateChange(
                                goldRates[21].gram * 5,
                                goldRates[21].gramprev * 5
                              ).sign
                            }
                            {
                              calculateChange(
                                goldRates[21].gram * 5,
                                goldRates[21].gramprev * 5
                              ).value
                            }
                            %
                            <span className="ml-6">
                              {getArrow(
                                calculateChange(
                                  goldRates[21].gram * 5,
                                  goldRates[21].gramprev * 5
                                ).value
                              )}
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabContent>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoldRatesGeneral;
