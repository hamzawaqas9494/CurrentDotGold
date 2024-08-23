import { FC } from "react";

const Subscribe: FC = () => {
  return (
    <section
      id="subscribe"
      className="relative flex h-[calc(100vh_-_65vh)] sm:h-[calc(100vh_-_60vh)] items-center bg-[url('/assets/goldplate.png')] bg-cover bg-center bg-no-repeat md:h-[calc(100vh_-_55vh)]"
    >
      <div className="group absolute inset-0 flex items-center bg-black/50 p-4">
        <div className="md:pl-24">
          <h3 className="text-xl sm:text-2xl font-bold text-white group-focus:text-red-500 sm:pl-16">
            SUBSCRIBE OUR NEWSLETTER
          </h3>
          <p className="mt-5 text-sm text-white  sm:pl-40">
            SINGUP FOR OUR NEWS LETTER
          </p>
          <form className="relative mt-10 sm:px-10">
            <input
              className="w-full rounded-full px-2 sm:px-5 py-3 focus:outline-none"
              placeholder="Enter your email address"
            ></input>
            <button className=" absolute right-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-yellow-600 via-yellow-500  to-yellow-400  py-3 px-3 sm:px-8 text-white">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
