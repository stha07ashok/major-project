"use client";
import { useRef, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { CgDanger } from "react-icons/cg";
import { MdPeople } from "react-icons/md";
import { RiMotorbikeFill } from "react-icons/ri";
import { LuShield } from "react-icons/lu";
import { IoCameraOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { CgLivePhoto } from "react-icons/cg";
import { LuTriangleAlert } from "react-icons/lu";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

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

export default function Page() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const handlePlay = () => {
    const video = document.querySelector("video");
    video?.play();
  };

  const handlePause = () => {
    const video = document.querySelector("video");
    video?.pause();
  };

  const handleStop = () => {
    const video = document.querySelector("video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setVideoUrl(null);
  };

  return (
    <div className="min-h-[calc(160vh-450px)] px-10 py-22 sm:px-6 lg:px-10 ">
      <div className="flex flex-col gap-6">
        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
          <div className="border border-gray-200 hoverEffect shadow-lg rounded-full p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md">Total Detections Today</span>
              <span className="font-light">1,247</span>
            </div>
            <FaRegEye className="w-8 h-8 text-blue-700" />
          </div>
          <div className="border border-gray-200 hoverEffect shadow-lg rounded-full p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md">Helmet Violations</span>
              <span className="font-light">23</span>
            </div>
            <CgDanger className="w-8 h-8 text-red-400" />
          </div>
          <div className="border border-gray-200 hoverEffect shadow-lg rounded-full p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md">Triple Ride Violations</span>
              <span className="font-light">15</span>
            </div>
            <MdPeople className="w-8 h-8 text-yellow-400" />
          </div>
          <div className="border border-gray-200 hoverEffect shadow-lg rounded-full p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md">License plates Read</span>
              <span className="font-light">829</span>
            </div>
            <RiMotorbikeFill className="w-8 h-8 text-green-400" />
          </div>
        </div>

        {/* System Status */}
        <div className="flex flex-col gap-3 border border-gray-200 rounded-lg p-6 shadow-lg">
          <div className="flex gap-2 items-center mb-4">
            <LuShield className="w-10 h-10 text-red-400" />
            <span className="font-bold text-2xl">System Status</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Camera Status", "AI Model", "Database", "Alert System"].map(
              (status, idx) => (
                <div key={idx} className="flex flex-col gap-1 items-center">
                  <span>{status}</span>
                  <span className="border border-gray-200 rounded-full w-full flex items-center shadow-lg font-bold justify-center px-3 py-1 bg-blue-500 text-white">
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
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Live Feed */}
          <div className="flex flex-col gap-3 border border-gray-200 rounded-lg p-6 shadow-lg flex-1">
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
          <div className="flex flex-col border border-gray-200 rounded-lg p-6 shadow-lg gap-2 h-[500px] lg:h-auto lg:max-h-[600px] w-full lg:w-[40%]">
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
                      <FaMapMarkerAlt className="mr-1 text-blue-500" />{" "}
                      {v.camera}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <span className="px-2 py-1 rounded text-sm font-mono">
                        {v.plate}
                      </span>
                      <span className="text-sm ">
                        Confidence: {v.confidence}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recorded Video & Violations */}
        <div className="flex flex-col lg:flex-row gap-3 mt-6">
          {/* Recorded Video */}
          <div className="flex flex-col gap-3 border border-gray-200 rounded-lg p-6 shadow-lg flex-1">
            <div className="flex gap-3 items-center mb-4">
              <IoCameraOutline className="h-9 w-9 text-green-200 border rounded-lg p-1 bg-blue-700" />
              <span className="font-bold text-xl">Recorded Video</span>
            </div>
            <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg border border-gray-300">
              {videoUrl ? (
                <video
                  ref={videoRef}
                  src={videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full rounded-lg object-cover"
                />
              ) : (
                <div className="text-gray-400 text-lg">
                  <div className="flex flex-col items-center gap-3">
                    <span>Recorded Video Placeholder</span>
                    <input
                      type="file"
                      accept="video/*"
                      ref={fileInputRef}
                      id="upload-video"
                      className="hidden"
                      onChange={handleVideoUpload}
                      title="Upload recorded video"
                      placeholder="Select a video file"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition"
                    >
                      Upload Video
                    </button>
                  </div>
                </div>
              )}
            </div>
            {videoUrl && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handlePlay}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition"
                >
                  Play
                </button>
                <button
                  onClick={handlePause}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition"
                >
                  Pause
                </button>
                <button
                  onClick={handleStop}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition"
                >
                  Stop
                </button>
              </div>
            )}
          </div>

          {/* Violations List */}
          <div className="flex flex-col border border-gray-200 rounded-lg p-6 shadow-lg gap-2 h-[500px] lg:h-auto lg:max-h-[600px] w-full lg:w-[40%]">
            <div className="flex gap-2 items-center">
              <LuTriangleAlert className="h-7 w-7 text-yellow-500" />
              <span className="font-bold text-xl">Recorded Violations</span>
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
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {v.severity}
                      </span>
                    </div>
                    <div className="flex items-center text-sm mt-1">
                      <FaClock className="mr-1 text-green-400" /> {v.time}
                    </div>
                    <div className="flex items-center text-sm">
                      <FaMapMarkerAlt className="mr-1 text-blue-500" />{" "}
                      {v.camera}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <span className="px-2 py-1 rounded text-sm font-mono">
                        {v.plate}
                      </span>
                      <span className="text-sm ">
                        Confidence: {v.confidence}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
