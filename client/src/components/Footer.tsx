import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-600 dark:bg-[#1a252d] w-full  text-xl h-16 flex items-center justify-between px-6  text-gray-600 dark:text-gray-400">
      <span>
        © {new Date().getFullYear()} Smart Traffic Monitoring System. All rights
        reserved.
      </span>
      <div className="flex gap-4">
        <a href="#" className="hover:text-blue-500 transition-colors text-lg">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-blue-500 transition-colors text-lg ">
          Terms of Service
        </a>
        <a href="#" className="hover:text-blue-500 transition-colors text-lg">
          Support
        </a>
      </div>
    </footer>
  );
};

export default Footer;
