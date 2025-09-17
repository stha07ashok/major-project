import React from "react";
import { IoCameraOutline } from "react-icons/io5";
import { LuBrain, LuShield } from "react-icons/lu";
import { MdOutlineAccessTime, MdPeople } from "react-icons/md";
import { LiaDotCircleSolid } from "react-icons/lia";
import { RiMotorbikeFill } from "react-icons/ri";

const skills = [
  "Computer Vision",
  "Machine Learning",
  "OpenCV",
  "YOLO",
  "TensorFlow",
  "NextJs",
  "TypeScript",
  "Real-time Processing",
  "OCR",
  "Deep Learning",
  "ExpressJs",
  "MySQL",
  "NodeJs",
  "Tailwind CSS",
];

const AboutProject = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-12 py-8">
      <div className="flex flex-col gap-6 my-8">
        {/* Title */}
        <div className="flex flex-col gap-2 justify-center items-center text-center">
          <span className="font-bold text-3xl sm:text-4xl py-5">
            Smart Traffic Monitoring System
          </span>
          <span className="font-light max-w-xl sm:max-w-2xl text-sm sm:text-base">
            AI-powered computer vision system for automated traffic violation
            detection including helmet detection, triple ride identification,
            and license plate recognition.
          </span>
        </div>

        {/* Left and Right Panels */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-6">
          {/* Left panel */}
          <div className="md:w-1/2 flex flex-col gap-4 border border-gray-200 dark:border-gray-600 dark:bg-[#1a252d] rounded-lg p-6 shadow-lg">
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2 font-extrabold text-2xl">
                <IoCameraOutline className="h-8 w-8 text-green-200 border rounded-lg p-1 bg-blue-700" />
                Project Overview
              </span>
              <span className="font-light text-sm text-justify">
                Advanced traffic monitoring solution using computer vision
              </span>
            </div>

            <span className="font-light text-justify text-sm sm:text-base">
              This system leverages state-of-the-art computer vision and deep
              learning technologies to automatically detect traffic violations
              in real-time. The AI models are trained to identify riders without
              helmets, motorcycles carrying more than two passengers, and
              automatically extract license plate information for enforcement
              purposes.
            </span>

            <div className="flex flex-col gap-2 mt-4">
              <span className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                <MdOutlineAccessTime className="text-violet-400" />
                Real-time violation detection and alerts
              </span>
              <span className="font-bold flex items-center gap-2 text-sm sm:text-base">
                <LuBrain className="text-green-400" />
                AI-powered computer vision analysis
              </span>
              <span className="font-bold flex items-center gap-2 text-sm sm:text-base">
                <LiaDotCircleSolid className="text-orange-400" />
                High accuracy traffic monitoring
              </span>
            </div>
          </div>

          {/* Right panel */}
          <div className="md:w-1/2 flex flex-col border border-gray-200 dark:border-gray-600 dark:bg-[#1a252d] rounded-lg p-6 shadow-lg gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-2xl">Technologies & Tools</span>
              <span className="font-light text-sm sm:text-base">
                Modern tech stack for robust performance
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 border border-gray-200 rounded-full text-sm font-medium shadow-sm text-center"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm sm:text-base">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-lg sm:text-xl">Frontend</span>
                <span>NextJs, TypeScript, Tailwind CSS</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-lg sm:text-xl">Backend</span>
                <span>ExpressJs, TypeScript, MySQL, NodeJs</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-lg sm:text-xl">
                  Computer Vision
                </span>
                <span>OpenCV, YOLO, TensorFlow</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-lg sm:text-xl">
                  Machine Learning
                </span>
                <span>Deep Learning, Neural Networks, OCR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <div className="flex flex-col gap-2 items-center border border-gray-200 dark:border-gray-600 dark:bg-[#1a252d] rounded-lg p-4 shadow-lg hoverEffect">
            <LuShield className="w-10 h-10 text-red-400" />
            <span className="font-bold text-lg">Helmet Detection</span>
            <span className="text-center font-light text-sm">
              AI-powered computer vision to detect riders without helmets in
              real-time
            </span>
          </div>
          <div className="flex flex-col gap-2 items-center border border-gray-200 dark:border-gray-600 dark:bg-[#1a252d] rounded-lg p-4 shadow-lg hoverEffect">
            <MdPeople className="w-10 h-10 text-yellow-400" />
            <span className="font-bold text-lg">Triple Ride Detection</span>
            <span className="text-center font-light text-sm">
              Automatic identification of motorcycles carrying more than 2
              passengers
            </span>
          </div>
          <div className="flex flex-col gap-2 items-center border border-gray-200 dark:border-gray-600 dark:bg-[#1a252d] rounded-lg p-4 shadow-lg hoverEffect">
            <RiMotorbikeFill className="w-10 h-10 text-blue-400" />
            <span className="font-bold text-lg">License Plate Recognition</span>
            <span className="text-center font-light text-sm">
              OCR technology to read and extract license plate numbers from
              vehicles
            </span>
          </div>
          <div className="flex flex-col gap-2 items-center border border-gray-200 dark:border-gray-600 dark:bg-[#1a252d] rounded-lg p-4 shadow-lg hoverEffect">
            <LuBrain className="w-10 h-10 text-green-400" />
            <span className="font-bold text-lg">AI-Powered Analysis</span>
            <span className="text-center font-light text-sm">
              Advanced machine learning models for accurate traffic violation
              detection
            </span>
          </div>
          <div className="flex flex-col gap-2 items-center border border-gray-200 dark:border-gray-600 dark:bg-[#1a252d] rounded-lg p-4 shadow-lg hoverEffect">
            <MdOutlineAccessTime className="w-10 h-10 text-violet-400" />
            <span className="font-bold text-lg">Real-time Processing</span>
            <span className="text-center font-light text-sm">
              Live video feed analysis with instant violation alerts and
              notifications
            </span>
          </div>
          <div className="flex flex-col gap-2 items-center border border-gray-200 dark:border-gray-600 dark:bg-[#1a252d] rounded-lg p-4 shadow-lg hoverEffect transition">
            <LiaDotCircleSolid className="w-10 h-10 text-orange-400" />
            <span className="font-bold text-lg">High Accuracy</span>
            <span className="text-center font-light text-sm">
              Computer vision models trained for precision in traffic monitoring
              scenarios
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProject;
