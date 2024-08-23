"use client";
import React, { useState, FC, useEffect } from "react";
import { Loader } from "@/app/ui";
import { TabNavItem } from "./TabNavItem";
import { TabContent } from "./TabContent";
import { GreenArrow, RedArrow } from "@/icons";
import { useGoldRate } from "@/context/GoldRateContext";
import { CityPrices } from "@/common.types";
import { cities } from "@/app/constants";

const GoldRatesPak: FC = () => {
  const { todayRate, isLoading, error } = useGoldRate();

  const [activeTab, setActiveTab] = useState("tab1");
  const [goldPrices, setGoldPrices] = useState<CityPrices>({});

  const gramRate = todayRate / 31.1;

  useEffect(() => {
    if (todayRate !== null) {
      // Calculate dynamic gold prices based on today's rate
      const generateRandomPrice = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

      setGoldPrices({
        lahore: generateRandomPrice(500, 1000) + gramRate,
        karachi: generateRandomPrice(1000, 2000) + gramRate,
        peshawar: generateRandomPrice(100, 1000) + gramRate,
        islamabad: generateRandomPrice(500, 1000) + gramRate,
        quetta: generateRandomPrice(100, 1000) + gramRate,
        sialkot: generateRandomPrice(500, 1000) + gramRate,
      });
    }
  }, [todayRate]);

  return (
    <section className="bg-[#F9F9F9] py-10 sm:py-14 px-2 md:px-0">
      <div className="container mx-auto space-y-16">
        <h2 className="text-center text-2xl font-semibold text-[#333333]">
          GOLD PRICE TODAY IN MAJOR CITIES OF PAKISTAN
        </h2>
        <div className="Tabs space-y-8 sm:space-y-16">
          <ul className="nav flex flex-wrap justify-center gap-8 lg:gap-20">
            {cities.map((city, index) => (
              <TabNavItem
                key={`tab${index + 1}`}
                city={city}
                id={`tab${index + 1}`}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            ))}
          </ul>
          <div className="overflow-x-auto">
            <TabContent id="tab1" activeTab={activeTab}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b-2 border-gray-300">
                      <th className="w-24 py-4 px-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333] md:px-0">
                        Gram
                      </th>
                      <th className="w-24 py-4 px-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333] md:px-0">
                        24K Gold Price
                      </th>
                      <th className="w-24 py-4 px-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333] md:px-0">
                        Daily Price Change
                      </th>
                    </tr>
                    <tr className="border-b-2 border-gray-200 text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        1 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333] ">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          goldPrices?.lahore?.toFixed(0)
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        +0.54%
                        <span className="ml-6">
                          <RedArrow />
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b-2 border-gray-200 text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        5 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333] ">
                        {isLoading ? (
                          <Loader center />
                        ) : goldPrices.lahore ? (
                          (goldPrices.lahore * 5)?.toFixed(0)
                        ) : (
                          "-"
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        +0.54%
                        <span className="ml-6">
                          <RedArrow />
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b-2 border-gray-200 text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        10 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333] ">
                        {isLoading ? (
                          <Loader center />
                        ) : goldPrices?.lahore ? (
                          (goldPrices?.lahore * 10)?.toFixed(0)
                        ) : (
                          "-"
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        -0.15%
                        <span className="ml-6">
                          <GreenArrow />
                        </span>
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        100 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333] ">
                        {isLoading ? (
                          <Loader center />
                        ) : goldPrices?.lahore ? (
                          (goldPrices?.lahore * 100)?.toFixed(0)
                        ) : (
                          "-"
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        -0.15%
                        <span className="ml-6">
                          <GreenArrow />
                        </span>
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
                      <th className="w-24 py-4 sm:px-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333] md:px-0">
                        Gram
                      </th>
                      <th className="w-24 py-4 sm:px-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333] md:px-0">
                        24K Gold Price
                      </th>
                      <th className="w-24 py-4 sm:px-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333] md:px-0">
                        Daily Price Change
                      </th>
                    </tr>
                    <tr className="border-b-2 border-gray-200 text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        1 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333] ">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          goldPrices?.karachi?.toFixed(0)
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        +0.54%
                        <span className="ml-6">
                          <RedArrow />
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b-2 border-gray-200 text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        5 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333] ">
                        {isLoading ? (
                          <Loader center />
                        ) : goldPrices?.karachi ? (
                          (goldPrices?.karachi * 5)?.toFixed(0)
                        ) : (
                          "-"
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        +0.54%
                        <span className="ml-6">
                          <RedArrow />
                        </span>
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
                      <th className="w-24 py-4 px-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333] md:px-0">
                        Gram
                      </th>
                      <th className="w-24 py-4 px-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333] md:px-0">
                        24K Gold Price
                      </th>
                      <th className="w-24 py-4 px-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333] md:px-0">
                        Daily Price Change
                      </th>
                    </tr>
                    <tr className="border-b-2 border-gray-200 text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        1 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333] ">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          goldPrices?.islamabad?.toFixed(0)
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        +0.54%
                        <span className="ml-6">
                          <RedArrow />
                        </span>
                      </td>
                    </tr>

                    <tr className="border-b-2 border-gray-200 text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        10 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333] ">
                        {isLoading ? (
                          <Loader center />
                        ) : goldPrices?.islamabad ? (
                          (goldPrices?.islamabad * 10)?.toFixed(0)
                        ) : (
                          "-"
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        -0.15%
                        <span className="ml-6">
                          <GreenArrow />
                        </span>
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        100 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333] ">
                        {isLoading ? (
                          <Loader center />
                        ) : goldPrices?.islamabad ? (
                          (goldPrices?.islamabad * 100)?.toFixed(0)
                        ) : (
                          "-"
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        -0.15%
                        <span className="ml-6">
                          <GreenArrow />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabContent>
            <TabContent id="tab4" activeTab={activeTab}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b-2 border-gray-300">
                      <th className="w-24 py-4 px-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333] md:px-0">
                        Gram
                      </th>
                      <th className="w-24 py-4 px-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333] md:px-0">
                        24K Gold Price
                      </th>
                      <th className="w-24 py-4 px-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333] md:px-0">
                        Daily Price Change
                      </th>
                    </tr>

                    <tr className="text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        100 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333] ">
                        {isLoading ? (
                          <Loader center />
                        ) : goldPrices?.peshawar ? (
                          (goldPrices?.peshawar * 100)?.toFixed(0)
                        ) : (
                          "-"
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        -0.15%
                        <span className="ml-6">
                          <GreenArrow />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabContent>
            <TabContent id="tab5" activeTab={activeTab}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b-2 border-gray-300">
                      <th className="w-24 py-4 px-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333] md:px-0">
                        Gram
                      </th>
                      <th className="w-24 py-4 px-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333] md:px-0">
                        24K Gold Price
                      </th>
                      <th className="w-24 py-4 px-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333] md:px-0">
                        Daily Price Change
                      </th>
                    </tr>
                    <tr className="border-b-2 border-gray-200 text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        1 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333] ">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          goldPrices?.quetta?.toFixed(0)
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        +0.54%
                        <span className="ml-6">
                          <RedArrow />
                        </span>
                      </td>
                    </tr>

                    <tr className="text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        100 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333] ">
                        {isLoading ? (
                          <Loader center />
                        ) : goldPrices?.quetta ? (
                          (goldPrices?.quetta * 100)?.toFixed(0)
                        ) : (
                          "-"
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        -0.15%
                        <span className="ml-6">
                          <GreenArrow />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabContent>
            <TabContent id="tab6" activeTab={activeTab}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b-2 border-gray-300">
                      <th className="w-24 py-4 px-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333] md:px-0">
                        Gram
                      </th>
                      <th className="w-24 py-4 px-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333] md:px-0">
                        24K Gold Price
                      </th>
                      <th className="w-24 py-4 px-4 text-center align-middle text-sm sm:text-lg md:text-xl font-bold text-[#333333] md:px-0">
                        Daily Price Change
                      </th>
                    </tr>
                    <tr className="border-b-2 border-gray-200 text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        1 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333] ">
                        {isLoading ? (
                          <Loader center />
                        ) : (
                          goldPrices?.sialkot?.toFixed(0)
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        +0.54%
                        <span className="ml-6">
                          <RedArrow />
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b-2 border-gray-200 text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        5 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333] ">
                        {isLoading ? (
                          <Loader center />
                        ) : goldPrices?.sialkot ? (
                          (goldPrices?.sialkot * 5)?.toFixed(0)
                        ) : (
                          "-"
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        +0.54%
                        <span className="ml-6">
                          <RedArrow />
                        </span>
                      </td>
                    </tr>

                    <tr className="text-center">
                      <td className="py-4 font-semibold  text-[#333333]">
                        100 Gram
                      </td>
                      <td className="py-4 font-semibold text-[#333333] ">
                        {isLoading ? (
                          <Loader center />
                        ) : goldPrices?.sialkot ? (
                          (goldPrices?.sialkot * 100)?.toFixed(0)
                        ) : (
                          "-"
                        )}{" "}
                        <span className="ml-2 text-xs">PKR</span>
                      </td>
                      <td className="flex items-center justify-center py-4 font-semibold text-[#333333]">
                        -0.15%
                        <span className="ml-6">
                          <GreenArrow />
                        </span>
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

export default GoldRatesPak;
