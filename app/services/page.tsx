import React from "react";
import type { NextPage, Metadata } from "next";
import { Navebar, Footer } from "@/app/ui";
import { Testimonails } from "./Testimonials";

 const metadata: Metadata = {
  title: "Services - Gold Rate Pakistan",
};

const Services: NextPage = () => {
  return (
    <React.Fragment>
      <div className="bg-gray-100">
        {/* hero */}
        <header className="hero-sec relative h-[calc(100vh_-_35vh)] bg-[url('/assets/servicesBg.png')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-black/70 text-white">
            <Navebar className="text-white" />
            <div className="container mx-auto mt-10 space-y-4 px-10 text-center">
              <h2 className="text-4xl font-semibold drop-shadow-xl">
                We value{" "}
                <span className="text-7xl font-semibold drop-shadow-xl">
                  our clients,
                </span>
              </h2>
              <p className="text-3xl font-normal drop-shadow-xl">
                and it shows in every interaction
              </p>
            </div>
          </div>
        </header>
        {/* services */}
        <div className="container mx-auto px-2 md:px-20">
          <div className="ourservices my-20">
            <h2 className="text-center text-3xl md:text-4xl">
              OUR <span className=" text-4xl md:text-5xl">SERVICES</span>
            </h2>
            <div className="mt-5 grid grid-cols-12 space-y-10">
              <div className="lg-px-20 order-1 col-span-12 flex flex-col justify-center px-5 sm:col-span-6 lg:px-10">
                <h2 className="text-3xl lg:text-4xl">Gold Testing Facility </h2>
                <p className="mt-3 lg:mt-5">
                  Our Gold Testing Facility provides accurate and reliable
                  testing for gold, allowing you to determinethe karat of your
                  gold with precision and confidence.
                </p>
              </div>
              <div className="order-2 col-span-12 mt-5  p-3 sm:col-span-6 lg:mt-0 lg:p-5">
                <img src="/assets/year.png" alt="house" />
              </div>
              <div className="order-4 col-span-12 mt-5  p-3 sm:order-3 sm:col-span-6 lg:mt-0 lg:p-5 ">
                <img src="/assets/stockphoto.png" alt="house" />
              </div>
              <div className="lg-px-20 order-3 col-span-12 flex flex-col justify-center px-5 sm:order-4 sm:col-span-6 lg:px-10">
                <h2 className="text-3xl lg:text-4xl">
                  Buy and Sell Gold/Jewelry
                </h2>
                <p className="mt-3 lg:mt-5">
                  We offer a convenient platform for buying and selling gold and
                  jewelry. Whether you're looking to sell your gold or purchase
                  stunning pieces, we provide a trusted and secure marketplace
                  for all your gold-related transactions.
                </p>
              </div>
              <div className="lg-px-20 order-5 col-span-12 flex flex-col justify-center px-5 sm:order-5 sm:col-span-6 lg:px-10">
                <h2 className="text-3xl lg:text-4xl">
                  Up-to-Date Gold Price Updates
                </h2>
                <p className="mt-3 lg:mt-5">
                  Stay informed with our up-to-date updates on gold prices. We
                  provide real-time information on the current market value of
                  gold, ensuring you make informed decisions when buying or
                  selling.
                </p>
              </div>
              <div className="order-6 col-span-12 mt-5  p-3 sm:order-6 sm:col-span-6 lg:mt-0 lg:p-5">
                <img src="/assets/year.png" alt="house" />
              </div>
              <div className="order-8 col-span-12 mt-5 p-3 sm:order-7 sm:col-span-6 lg:mt-0 lg:p-5">
                <img src="/assets/stockphoto.png" alt="house" />
              </div>
              <div className="lg-px-20 order-7 col-span-12 flex flex-col justify-center px-5 sm:order-8 sm:col-span-6 lg:px-10">
                <h2 className="text-3xl lg:text-4xl">
                  Gold API for Integrations
                </h2>
                <p className="mt-3 lg:mt-5">
                  Simplify your integration process with our Gold API.
                  Seamlessly connect your applications, websites, or services to
                  our robust API, enabling you to access and utilize
                  gold-related data efficiently and effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* know more */}
        <div className="relative h-[calc(100vh-35vh)] border border-[#707070] bg-[url('/assets/know.png')] bg-cover bg-no-repeat text-white">
          <div className="absolute inset-0 flex flex-col items-center justify-between bg-black/70 py-16">
            <h2 className="text-5xl">
              Know <span className="font-semibold">More</span>
            </h2>
            <button className="rounded-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 py-2 px-8 text-base font-semibold text-white">
              GET STARTED
            </button>
          </div>
        </div>
        {/* testimonials */}
        <div className="container mx-auto px-2 py-16 text-center md:px-10">
          <h2 className="text-center text-4xl font-bold">Testimonails</h2>
          <Testimonails />
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Services;
