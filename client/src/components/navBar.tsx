"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Dark from "./darkMode";
import Link from "next/link";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleString("en-US", options);
  };
  return (
    <header className="shadow-md sticky top-0 z-50 border-b border-gray-300 bg-[#ffffff] dark:bg-[#171717] ">
      <nav className="w-full h-full flex items-center justify-between px-7 py-2">
        {/* Left: Emblem */}
        <div className="flex items-center">
          <Image
            src="/images/traffic_logo.png"
            alt="Nepal Emblem"
            width={64}
            height={64}
            className="w-16 h-16 md:w-20 md:h-20 mr-2"
          />
        </div>

        {/* Center: Nepali Text */}
        <div className="text-center leading-5 text-red-600 text-sm md:text-base font-semibold">
          <div>Government of Nepal</div>
          <div>Ministry of Physical Infrastructure and Transport</div>
          <div className="text-lg font-bold">
            Department of Transport Management
          </div>
          <div className="text-base text-red-600 font-medium">
            Minbhawan, Kathmandu
          </div>
        </div>

        {/* Right: Nepal flag and Date */}
        <div className="flex flex-col items-end text-xs md:text-sm">
          <Image
            src="/images/nepal-flag.gif"
            alt="Nepal Flag"
            width={100}
            height={100}
            className="w-16 h-16 md:w-20 md:h-20"
          />
          <div className="mt-1">{formatDate(currentTime)}</div>
        </div>
      </nav>
      <div className="bg-blue-700 text-white flex items-center justify-between px-20 py-2 border-t border-gray-300">
        <div className="space-x-6 font-bold">Home</div>
        <div className="flex">
          <div className="py-2">
            <Dark />
          </div>
          <Link
            href="/"
            className="border-1 border-white shadow-lg rounded-md py-3 px-2"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
