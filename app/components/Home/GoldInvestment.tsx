import { FC } from "react";
import { MoneyIcon, CashIcon, RefreshIcon } from "@/icons";

const GoldInvestment: FC = () => {
  return (
    <section className="invester bg-[#F9F9F9]">
      <div className="container mx-auto py-12 md:py-16 px-10">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#333333]">
            ONLINE INVESTMENT GOLD SERVICE
          </h2>
        </div>
        <div className="mt-6 sm:mt-14 grid grid-cols-1 text-center text-[#333333] md:mt-24 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center p-10">
            <MoneyIcon />
            <h3 className="mt-5 text-2xl font-semibold">$100 million</h3>
            <p className="mt-5 text-lg">of gold and silver traded monthly</p>
          </div>
          <div className="flex flex-col items-center justify-center border-r-2 border-l-2 border-dotted border-gray-300  p-10">
            <CashIcon />
            <h3 className="mt-5 text-2xl font-semibold">$3.7 billion</h3>
            <p className="mt-5 text-lg">of clients assets</p>
          </div>
          <div className="flex flex-col items-center justify-center p-10">
            <RefreshIcon />
            <h3 className="mt-5 text-2xl font-semibold">100,000 clients</h3>
            <p className="mt-5 text-lg">across 175 countries</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoldInvestment;
