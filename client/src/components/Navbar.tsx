import React from "react";
import { IoCameraOutline } from "react-icons/io5";
import Dark from "./DarkMode";
import { RxDashboard } from "react-icons/rx";
import { LuBrain } from "react-icons/lu";

const Navbar = () => {
  return (
    <div className="border-b-2 border-gray-200 w-full h-18 shadow-lg fixed bg-gray-200 top-0z-50">
      <div className="flex justify-between px-10 py-4">
        <div className="flex gap-3 cursor-pointer">
          <div className="h-9 my-1">
            <IoCameraOutline className="h-9 w-9" />
          </div>
          <div className="h-9 ">
            <div className="font-bold">TrafficWatch AI</div>
            <div className="text-sm font-light">
              Smart Traffic Monitoring System
            </div>
          </div>
        </div>
        <div className="flex gap-8 items-center">
          <div className="font-bold hover:underline flex gap-1 items-center cursor-pointer">
            <div>
              <RxDashboard />
            </div>
            Dashboard
          </div>
          <div className="font-bold hover:underline flex gap-1 items-center cursor-pointer">
            <div>
              <LuBrain />
            </div>
            About Project
          </div>
          <Dark />
          <div className="font-bold border-2 rounded-full px-3 py-1 shadow-lg hover:scale-105 transition-transform cursor-pointer">
            login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
