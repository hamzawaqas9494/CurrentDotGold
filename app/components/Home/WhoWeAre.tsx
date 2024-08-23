import { FC } from "react";
import Image from "next/image";

const WhoWeAre: FC = () => {
  return (
    <section id="whoweare" className="bg-white">
      <div className="container mx-auto px-4 md:px-10 pt-10 md:py-12 ">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-24">
          {/* content */}
          <div className="m-auto flex flex-col space-y-4 text-center md:text-start lg:pr-8 px-6 ">
            <h2 className="text-2xl font-semibold uppercase text-[#333333]">
              EXPERIENCED WE ARE!
            </h2>
            <p className="text-sm text-[#616161]">
              With 15 years in the industry, we proudly provide the current rate
              of Gold. Our extensive expertise and deep understanding of the
              market have enabled us to consistently deliver accurate and
              up-to-date information.
            </p>
            <p className="text-sm text-[#616161]">
              Count on our seasoned team to help you make informed decisions and
              navigate the ever-changing world of gold prices. Experience
              matters, and we've got plenty of it!
            </p>
          </div>
          {/* graph */}
          <div className="flex items-center justify-center p-8">
            <Image
              alt="Prgoress Graph"
              src="assets/wegraph.svg"
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
