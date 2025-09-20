"use client";
import React, { useRef, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
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
    image: "/images/data.png",
  },
  {
    id: 2,
    type: "No Helmet Detected",
    severity: "HIGH",
    time: "3m ago",
    camera: "Camera 01 - Main Road",
    plate: "SKQ 4501",
    confidence: "82.1%",
    image: "/images/data.png",
  },
  {
    id: 3,
    type: "Triple Ride Violation",
    severity: "LOW",
    time: "4m ago",
    camera: "Camera 01 - Main Road",
    plate: "UND 8605",
    confidence: "81.9%",
    image: "/images/data.png",
  },
  {
    id: 4,
    type: "Triple Ride Violation",
    severity: "LOW",
    time: "6m ago",
    camera: "Camera 01 - Main Road",
    plate: "MTF 9233",
    confidence: "83.2%",
    image: "/images/data.png",
  },
];

const RecordedViolations = () => {
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
    <div className="flex flex-col lg:flex-row gap-3 mt-6">
      {/* Recorded Video */}
      <div className="flex flex-col gap-3 border border-gray-200  dark:border-gray-700 dark:bg-[#1a252d] rounded-lg p-6 shadow-lg flex-1">
        <div className="flex gap-3 items-center mb-4">
          <IoCameraOutline className="h-9 w-9 text-green-200 border border-gray-300 dark:border-gray-700 rounded-lg p-1 bg-blue-700" />
          <span className="font-bold text-xl">Recorded Video</span>
        </div>
        <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700">
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
      <div className="flex flex-col border border-gray-200 dark:border-gray-600 dark:bg-[#1a252d] rounded-lg p-6 shadow-lg gap-2 h-[500px] lg:h-auto lg:max-h-[600px] w-full lg:w-[40%]">
        <div className="flex gap-2 items-center">
          <LuTriangleAlert className="h-7 w-7 text-yellow-500" />
          <span className="font-bold text-xl">Recorded Violations</span>
        </div>
        <div className="space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
          {violations.map((v) => (
            <div
              key={v.id}
              className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg"
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

export default RecordedViolations;
