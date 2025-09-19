import React from "react";
import { IoCameraOutline } from "react-icons/io5";
import { CgLivePhoto } from "react-icons/cg";
import { CiPause1, CiSettings } from "react-icons/ci";
import { LuTriangleAlert } from "react-icons/lu";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";

const violations = [
  {
    id: 1,
    type: "Triple Ride Violation",
    severity: "HIGH",
    time: "0s ago",
    camera: "Camera 01 - Main Road",
    plate: "MTF 9233",
    confidence: "91.4%",
    image: "/images/violation1.jpg",
  },
  {
    id: 2,
    type: "No Helmet Detected",
    severity: "HIGH",
    time: "3m ago",
    camera: "Camera 01 - Main Road",
    plate: "SKQ 4501",
    confidence: "82.1%",
    image: "/images/violation2.jpg",
  },
  {
    id: 3,
    type: "Triple Ride Violation",
    severity: "LOW",
    time: "4m ago",
    camera: "Camera 01 - Main Road",
    plate: "UND 8605",
    confidence: "81.9%",
    image: "/images/violation3.jpg",
  },
  {
    id: 4,
    type: "Triple Ride Violation",
    severity: "LOW",
    time: "6m ago",
    camera: "Camera 01 - Main Road",
    plate: "MTF 9233",
    confidence: "83.2%",
    image: "/images/violation4.jpg",
  },
];

const LiveViolations = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-3">
      {/* Live Feed */}
      <div className="flex flex-col gap-3 border border-gray-200 dark:border-gray-600 dark:bg-[#1a252d] rounded-lg p-6 shadow-lg flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <div className="flex gap-3 items-center">
            <IoCameraOutline className="h-9 w-9 text-green-200 border rounded-lg p-1 bg-blue-700" />
            <span className="font-bold text-xl">Live Video Feed</span>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex gap-1 items-center border border-gray-200 rounded-full px-2 py-1 shadow-lg hoverEffect">
              <CgLivePhoto className="h-7 w-7 text-green-500" />
              <span className="font-bold text-xl">Live</span>
            </div>
            <CiPause1 className="h-9 w-9 text-green-500 border border-gray-200 rounded-lg p-1 hoverEffect shadow-lg" />
            <div className="flex gap-1 items-center border border-gray-200 rounded-full px-2 py-1 shadow-lg hoverEffect cursor-pointer">
              <CiSettings className="h-7 w-7 text-green-500" />
              <span className="font-bold text-xl">Stop Detection</span>
            </div>
          </div>
        </div>

        <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg border border-gray-300">
          <span className="text-gray-400 text-lg">
            Live CCTV Footage Placeholder
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1 items-center">
            <span className="font-bold text-xl">3</span>
            <span className="font-light text-lg">Objects Detected</span>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <span className="font-bold text-xl">2</span>
            <span className="font-light text-lg">Helmets</span>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <span className="font-bold text-xl">1</span>
            <span className="font-light text-lg">Motorcycles</span>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <span className="font-bold text-xl">1</span>
            <span className="font-light text-lg">Plates Read</span>
          </div>
        </div>
      </div>

      {/* Violation Alerts */}
      <div className="flex flex-col border border-gray-200 dark:border-gray-600 dark:bg-[#1a252d] rounded-lg p-6 shadow-lg gap-2 h-[500px] lg:h-auto lg:max-h-[600px] w-full lg:w-[40%]">
        <div className="flex gap-2 items-center">
          <LuTriangleAlert className="h-7 w-7 text-green-500" />
          <span className="font-bold text-xl">Violation Alert</span>
        </div>
        <div className="space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
          {violations.map((v) => (
            <div
              key={v.id}
              className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 shadow-lg"
            >
              <img
                src={v.image}
                alt={v.type}
                className="w-20 h-16 sm:w-24 sm:h-20 rounded-md border border-gray-200 shadow-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold">{v.type}</h2>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      v.severity === "HIGH"
                        ? "bg-red-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {v.severity}
                  </span>
                </div>
                <div className="flex items-center text-sm mt-1">
                  <FaClock className="mr-1 text-gray-400" /> {v.time}
                </div>
                <div className="flex items-center text-sm">
                  <FaMapMarkerAlt className="mr-1 text-blue-500" /> {v.camera}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span className="px-2 py-1 rounded text-sm font-mono">
                    {v.plate}
                  </span>
                  <span className="text-sm ">Confidence: {v.confidence}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveViolations;
