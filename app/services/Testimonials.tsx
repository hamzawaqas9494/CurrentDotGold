"use client";
import { FC } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import QuotesIcon from "@/icons/QuotesIcon";

export const Testimonails: FC = () => {
  return (
    <Carousel
      // showArrows={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      // autoPlay={true}
      interval={5000}
    >
      {testimonials.map((t) => (
        <div className="relative flex items-center justify-center" key={t.id}>
          <img className="profile" src={t.image} alt="house" />
          <div className="myCarousel w-1/2 p-4 text-start font-medium text-black md:p-10">
            <div className="mt-10 flex items-center justify-center lg:mt-0 lg:justify-start">
              <QuotesIcon />
              <h4 className="ml-5 text-2xl font-normal">{t.name}</h4>
            </div>
            <p className="mt-5">{t.text}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

const testimonials = [
  {
    id: 1,
    name: "Katie Walton",
    image: "/assets/pexels-marcu.png",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 2,
    name: "Katie Walton",
    image: "/assets/pexels-marcu.png",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 3,
    name: "Katie Walton",
    image: "/assets/pexels-marcu.png",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];
