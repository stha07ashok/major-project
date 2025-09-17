import React from "react";
import { IoCameraOutline } from "react-icons/io5";
import Dark from "./DarkMode";
import { RxDashboard } from "react-icons/rx";
import { LuBrain } from "react-icons/lu";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="border-b bg-white dark:bg-[#293944] border-gray-200 w-full h-18 shadow-lg fixed top-0 z-50">
      <div className="flex justify-between px-10 py-4">
        <Link href="/" className="flex gap-3 cursor-pointer">
          <div className="h-9 my-1">
            <IoCameraOutline className="h-9 w-9 text-green-200 border rounded-lg p-1 bg-blue-700" />
          </div>
          <div className="h-9 ">
            <div className="font-bold">TrafficWatch AI</div>
            <div className="text-sm font-light">
              Smart Traffic Monitoring System
            </div>
          </div>
        </Link>
        <div className="flex gap-8 items-center">
          <Link
            href="/"
            className="font-bold hover:underline flex gap-1 items-center group hover:scale-105 transition-transform cursor-pointer"
          >
            <div>
              <RxDashboard className="text-green-400" />
            </div>
            Dashboard
          </Link>
          <Link
            href="/aboutproject"
            className="font-bold hover:underline flex gap-1 items-center group hover:scale-105 transition-transform cursor-pointer"
          >
            <div>
              <LuBrain className="text-green-400" />
            </div>
            About Project
          </Link>
          <Dark />
          <Link
            href="/login"
            className="font-bold border border-green-400 rounded-full px-3 py-1 shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
