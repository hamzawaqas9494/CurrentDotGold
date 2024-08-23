"use client";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import type { NextPage, Metadata } from 'next';
import { Navebar } from '@/app/ui';

export const metadata: Metadata = {
  title: 'Contact Us - Gold Rate Pakistan',
};

const Contact: NextPage = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.current) {
      emailjs.sendForm('service_157uens','template_w147r1i', form.current, 'hrF0bDuqjonUBNNZr')
        .then((result) => {
          console.log(result.text);
          alert('Message sent');
          form.current?.reset();
        }, (error) => {
          console.log(error.text);
        });
    }
  };
  return (
    <section className="relative h-screen">
      <div className="grid grid-cols-12">
        <div className="relative col-span-12 lg:col-span-4">
          <div className="absolute h-full w-full bg-black/75"></div>
          <img
            className="h-[calc(100vh_-_50vh)] w-full object-cover lg:h-screen"
            src="/assets/art.png"
            alt="art"
          />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <img
            className="h-[calc(100vh_-_50vh)] w-full lg:h-screen"
            src="/assets/contact-bg.png"
            alt="art"
          />
        </div>
      </div>
      <div className="absolute inset-0">
        <div className="flex h-screen flex-col justify-between">
          <div className="nav h-[calc(100%_-_90%)] lg:h-[calc(100%_-_80%)]">
            <Navebar className="relative z-50 text-white lg:text-black" />
          </div>
          <div className="container flex h-[calc(100%_-_10%)] flex-col justify-center px-[0.5rem] md:px-0 lg:h-[calc(100%_-_20%)]">
            <div className="grid grid-cols-12">
              <div className="col-span-12 self-center lg:col-span-4">
                <div className="text text-white">
                  <h2 className="text-xl sm:text-4xl">REACH US</h2>
                  <p className="mt-2 text-lg lg:mt-5">
                    Headquarters
                    <br /> 123 address goes here
                  </p>
                  <p className="mt-2 text-lg lg:mt-5">
                    Phone
                    <br /> 03331449494
                  </p>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-8">
                <form ref={form} className="lg-10 mt-20 lg:mt-0 xl:px-20" onSubmit={sendEmail}>
                  <h2 className="text-xl font-bold text-white sm:text-4xl lg:text-black">
                    We’d Like To Hear From You
                  </h2>
                  <div className="grid grid-cols-12 gap-2 gap-x-6 lg:gap-y-6">
                    <div className="col-span-12 mt-5 lg:col-span-6 lg:mt-0">
                      <label className="font-semibold text-black">Name</label>
                      <input
                        type="text"
                        className="text-md mt-2 block w-full rounded-lg border border-gray-400 bg-transparent py-2 px-3 text-gray-600 outline-none lg:py-3 lg:px-5"
                        placeholder="Enter your name"
                        name="user_name"
                        required
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <label className="font-semibold text-black">Email</label>
                      <input
                        type="email"
                        className="text-md mt-2 block w-full rounded-lg border border-gray-400 bg-transparent py-2 px-3 text-gray-600 outline-none lg:py-3 lg:px-5"
                        placeholder="Enter your email"
                        name="user_email"
                        required
                      />
                    </div>
                    <div className="col-span-12">
                      <label htmlFor="message" className="mb-2 block font-semibold">
                        Your message
                      </label>
                      <textarea
                        className="block h-[50px] w-full rounded-lg border border-gray-400 bg-transparent p-2.5 text-gray-900 outline-none lg:h-[150px]"
                        placeholder="Write your thoughts here..."
                        name="message"
                      ></textarea>
                    </div>
                  </div>
                  <input
                    type="submit"
                    value="SUBMIT"
                    className="text-md mt-3 cursor-pointer rounded-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 py-2 px-10 text-white lg:mt-10"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
