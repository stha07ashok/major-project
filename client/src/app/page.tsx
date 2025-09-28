"use client";

import { useState, useEffect } from "react";
import { FaRegEye } from "react-icons/fa6";
import { CgDanger } from "react-icons/cg";
import { MdPeople } from "react-icons/md";
import { RiMotorbikeFill } from "react-icons/ri";
import { LuShield } from "react-icons/lu";
import LiveViolations from "@/components/liveViolations";
import RecordedViolations from "@/components/RecordedViolations";
import Loader from "@/components/Loader";

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-[calc(160vh-450px)] px-3 py-22 sm:px-6 lg:px-10 ">
      <div className="flex flex-col gap-6">
        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
          <div className="border border-gray-200 dark:border-gray-600 dark:bg-[#1a252d] hoverEffect shadow-lg rounded-full p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md">Total Detections Today</span>
              <span className="font-light">1,247</span>
            </div>
            <FaRegEye className="w-8 h-8 text-blue-700" />
          </div>
          <div className="border border-gray-200 dark:border-gray-600 dark:bg-[#1a252d] hoverEffect shadow-lg rounded-full p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md">Helmet Violations</span>
              <span className="font-light">23</span>
            </div>
            <CgDanger className="w-8 h-8 text-red-400" />
          </div>
          <div className="border border-gray-200 dark:border-gray-600 dark:bg-[#1a252d] hoverEffect shadow-lg rounded-full p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md">Triple Ride Violations</span>
              <span className="font-light">15</span>
            </div>
            <MdPeople className="w-8 h-8 text-yellow-400" />
          </div>
          <div className="border border-gray-200 dark:border-gray-600 dark:bg-[#1a252d] hoverEffect shadow-lg rounded-full p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md">License plates Read</span>
              <span className="font-light">829</span>
            </div>
            <RiMotorbikeFill className="w-8 h-8 text-green-400" />
          </div>
        </div>

        {/* System Status */}
        <div className="flex flex-col gap-3 border border-gray-200 dark:border-gray-600 dark:bg-[#1a252d] rounded-lg p-6 shadow-lg">
          <div className="flex gap-2 items-center mb-4">
            <LuShield className="w-10 h-10 text-red-400" />
            <span className="font-bold text-2xl">System Status</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Camera Status", "AI Model", "Database", "Alert System"].map(
              (status, idx) => (
                <div key={idx} className="flex flex-col gap-1 items-center">
                  <span>{status}</span>
                  <span className="border border-gray-200 dark:border-gray-600  rounded-full w-full flex items-center shadow-lg font-bold justify-center px-3 py-1 bg-blue-500 text-white">
                    {status === "Camera Status"
                      ? "Online"
                      : status === "AI Model"
                      ? "Active"
                      : status === "Database"
                      ? "Connected"
                      : "Enabled"}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Live Feed & Violations */}
        <LiveViolations />

        {/* Recorded Video & Violations */}
        <RecordedViolations />
      </div>
    </div>
  );
}
