"use client";
import Link from "next/link";
import { FC } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/icons";
import Image from "next/image";

let curYear = new Date().getFullYear();

export const Footer: FC = () => {
  return (
    <footer className="bg-black relative z-10">
      <div className="flex flex-wrap justify-between border-b-2 md:space-y-0 space-y-4 border-gray-900 px-4 py-6 md:py-12 lg:justify-evenly">
        <div className="">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              width={0}
              height={0}
              alt="Current Gold"
              sizes="100vw"
              className="w-20 md:w-24 h-auto"
            />
          </Link>
          <p className="mt-5 w-auto text-sm leading-6 text-gray-500 md:w-72">
            We are your trusted source for up-to-date gold rates. Stay informed
            with our accurate and reliable information on the current price of
            gold.
          </p>
          <h4 className="mt-2 text-white">Follow Us</h4>
          <div className=" my-2 flex items-center justify-between">
            {" "}
            <Link href="/">
              <FacebookIcon />
            </Link>
            <Link href="/">
              <InstagramIcon />
            </Link>
            <Link href="/">
              <LinkedinIcon />
            </Link>
            <Link href="/">
              <TwitterIcon />
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h4 className="text-white">Contact</h4>
          <ul className="mt-5 cursor-pointer text-sm leading-8  text-gray-500">
            <li>Phone: +91 254 541 254</li>
            <li>Fax : +44 161 999 8888</li>
            <li>Email: email@CGgold.com</li>
          </ul>
        </div>
        <div className="flex flex-col justify-center">
          <h4 className="text-white">Opening Hours</h4>
          <ul className="mt-5 cursor-pointer text-sm leading-8  text-gray-500">
            <li>
              Monday to Friday<span className="ml-5">8 am - 12 pm</span>{" "}
            </li>
            <li>
              Saturday to Sunday<span className="ml-5">12 pm - 6 pm</span>{" "}
            </li>
            <li>Open 24 Hours in Online</li>
          </ul>
        </div>
        <div className="flex flex-col justify-center">
          <h4 className="text-white">Quick Links</h4>
          <ul className="mt-5 cursor-pointer text-sm leading-8  text-gray-500">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/#">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/#">Help Center</Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="py-10 pl-4 text-gray-800 md:pl-36">
        {" "}
        C <span className="ml-3">{curYear}</span>{" "}
        <span className="ml-2">Current Gold All Rights Reserved</span>
      </p>
    </footer>
  );
};
