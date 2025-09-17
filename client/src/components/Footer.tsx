import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-600 dark:bg-[#1a252d] w-full text-base sm:text-lg md:text-xl h-auto py-4 flex flex-col md:flex-row items-center justify-between gap-3 px-4 md:px-6 text-gray-600 dark:text-gray-400">
      <span className="text-center md:text-left">
        © {new Date().getFullYear()} Smart Traffic Monitoring System. All rights
        reserved.
      </span>

      <div className="flex flex-wrap justify-center md:justify-end gap-4">
        <a
          href="#"
          className="hover:text-blue-500 transition-colors text-sm sm:text-base md:text-lg"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="hover:text-blue-500 transition-colors text-sm sm:text-base md:text-lg"
        >
          Terms of Service
        </a>
        <a
          href="#"
          className="hover:text-blue-500 transition-colors text-sm sm:text-base md:text-lg"
        >
          Support
        </a>
      </div>
    </footer>
  );
};

export default Footer;
