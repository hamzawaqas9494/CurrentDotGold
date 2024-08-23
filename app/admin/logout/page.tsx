import { NextPage } from 'next';
import React from 'react';
import Link from "next/link";
import Image from "next/image";
const Maintenance: NextPage = () => {
  return (
    <div className="relative flex items-center justify-center text-white bg-no-repeat bg-cover h-screen bg-[url('/assets/maintinance.png')]">
      <div className="absolute w-full h-full bg-black/80"></div>
      <div className="container mx-auto z-50">
        <div className="flex justify-center sm:justify-start items-center h-[calc(100vh-80vh)]">
        <Link href="/">
                  <Image
                    width={40}
                    height={40}
                    alt="Current Gold"
                    sizes="100vw"
                    className="w-16 md:w-20 h-auto"
                    src="/assets/logo.png"
                  />
                </Link>
        </div>
        <div className="content h-[calc(100vh-20vh)] flex flex-col justify-center items-center text-center">
          <span className="text-4xl sm:text-6xl">WEBSITE IS</span>
          <h2 className="text-4xl sm:text-6xl font-bold mt-2">UNDER MAINTENANCE</h2>
          <p className="text-xl leading-10 mt-4 sm:mt-10 ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            <br className="hidden sm:block"/>
            eiusmod tempor incididunt ut magna aliqua, consectetur
            <br className="hidden sm:block" />
            adipiscing elit.
          </p>
          <a href="/">
            <button className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 text-white text-md py-2 px-8 rounded-full mt-6 sm:mt-20">
              CONTACT US
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
