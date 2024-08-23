import { FC } from "react";
import Image from "next/image";
import { AppleIcon, PlaystoreIcon } from "@/icons";

const MobileApp: FC = () => {
  return (
    <section
      id="mobileapp"
      className="bg-white bg-[url('/assets/coming-soon.svg')] bg-no-repeat px-4 bg-center bg-70% pt-8 sm:pt-6 sm:pb-4 pb-8"
    >
      <div className="container  flex justify-center items-center gap-4">
        <div className="text-center sm:text-left">
          <h3 className="bg-custom-gradient  bg-clip-text text-transparent text-4xl lg:text-6xl uppercase font-bold tracking-wider">
            coming soon
          </h3>
          <p className="text-[#333333] text-sm mt-4 sm:px-0 px-6">
            We are excited to announce that our app is coming live soon on
            multiple
            <br className="sm:block hidden" />
            platform for a more smooth way to use our product for our users.
          </p>
          {/* buttons */}
          <div className="flex items-center sm:justify-start justify-center gap-1 sm:gap-4 mt-5 ">
            {/* google play */}
            <div className="bg-black cursor-pointer rounded-md flex items-center justify-center gap-2 py-1 px-2 min-w-[150px]">
              <PlaystoreIcon className="w-7" />
              <div className="flex flex-col">
                <span className="text-white text-xs">Get it on</span>
                <span className="text-white text-sm sm:text-md">
                  Google Play
                </span>
              </div>
            </div>
            {/* app store */}
            <div className="bg-black cursor-pointer rounded-md flex items-center justify-center gap-1 py-1 px-2 min-w-[150px]">
              <AppleIcon className="w-6 h-7" />
              <div className="flex flex-col">
                <span className="text-white text-xs">Donwload on the</span>
                <span className="text-white text-sm sm:text-md">App Store</span>
              </div>
            </div>
          </div>
        </div>
        <Image
          className="w-[20%] mb-4 hidden sm:block"
          src="/assets/mobile.png"
          alt="mobile phone"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
    </section>
  );
};

export default MobileApp;
