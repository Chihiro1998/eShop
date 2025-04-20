"use client";

import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

const Footer = () => {
  return (
    <footer className="bg-purple-3 text-white px-10 py-10 font-roboto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-col gap-4 max-w-xl">
          <h2 className={`${pacifico.className} text-2xl text-pink-1`}>
            🌙✨Find your own style here!
          </h2>
          <p className="text-sm leading-relaxed">
            This is a Final Practice Project in CS5610 Web Development Course.
            This is our first time to work together, if you have any suggest
            about this pages, feel free to contact our team!
          </p>
          <div className={`${pacifico.className} text-3xl mt-4 text-pink-1`}>
            EShop
          </div>
          <p className="text-sm mt-1">
            COPYRIGHT © Olivia Kuang | Yantong Guo | Siyu Sun
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <p>For our Consumer Complaint Services</p>
          <p>Phone : (xxx) 111-2223333</p>
          <p>Email : xxxxx@eshop.com</p>
          <p>Address : 100 Fore Street, Portland, ME 04101</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
