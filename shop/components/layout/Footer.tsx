"use client";

const Footer = () => {
  return (
    <footer className="bg-purple-3 text-white text-sm px-6 py-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-2 text-left">
        <p className="w-full md:w-auto">
          Store Address: 123 Main St, Portland, OR 97201
        </p>
        <p className="w-full md:w-auto">
          Email:{" "}
          <a href="mailto:style@shop.com" className="underline">
            findYourStyle@shop.com
          </a>
        </p>
        <p className="text-center w-full pt-2">
          © {new Date().getFullYear()} E-shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
