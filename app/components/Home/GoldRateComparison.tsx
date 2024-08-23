import { FC } from "react";
import LineChart from "./Graph";

const GoldRateComparison: FC = () => {
  return (
    <section id="goldRateComparison" className="bg-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#333333]">
            GOLD RATE COMPARISON
          </h2>
          <p className="mt-4 text-sm text-[#616161]">
            Comparing the gold rates of 24k and 22k in a 10-gram quantity to
            determine the <br /> price difference between the two purity levels.
          </p>
        </div>
        <div className="mt-14">
          <LineChart />
        </div>
      </div>
    </section>
  );
};

export default GoldRateComparison;
