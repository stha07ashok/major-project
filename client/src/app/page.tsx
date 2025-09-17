import { FaRegEye } from "react-icons/fa6";
import { CgDanger } from "react-icons/cg";
import { MdPeople } from "react-icons/md";
import { RiMotorbikeFill } from "react-icons/ri";
import { LuBrain, LuShield } from "react-icons/lu";

export default function Page() {
  return (
    <div className="min-h-[calc(160vh-450px)] px-10 py-22 mx-12 ">
      <div className="flex flex-col gap-6">
        <div className="flex gap-3 justify-between mt-3">
          <div className="border border-gray-200 hoverEffect shadow-lg w-full rounded-full p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md">Total Detections Today</span>
              <span className="font-light">1,247</span>
            </div>
            <div>
              <FaRegEye className="w-9 h-8 text-blue-700" />
            </div>
          </div>
          <div className="border border-gray-200 hoverEffect shadow-lg w-full rounded-full p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md">Helmet Violations</span>
              <span className="font-light">23</span>
            </div>
            <div>
              <CgDanger className="w-9 h-8 text-red-400" />
            </div>
          </div>
          <div className="border border-gray-200 hoverEffect shadow-lg w-full rounded-full p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md">Triple Ride Violations</span>
              <span className="font-light">15</span>
            </div>
            <div>
              <MdPeople className="w-9 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="border border-gray-200 hoverEffect shadow-lg w-full rounded-full p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md">License plates Read</span>
              <span className="font-light">829</span>
            </div>
            <div>
              <RiMotorbikeFill className="w-9 h-8 text-green-400" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 border border-gray-200 rounded-lg p-6 shadow-lg ">
          <div className="flex gap-2 items-center mb-4">
            <LuShield className="w-10 h-10 text-red-400" />
            <span className="font-bold text-2xl">System Status</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-1 items-center">
              <span>Camera Status</span>
              <span className="border border-gray-200 rounded-full w-full flex items-center shadow-lg font-bold justify-center px-3 py-1 bg-blue-500 text-white ">
                Online
              </span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <span>AI Model</span>
              <span className="border border-gray-200 rounded-full w-full flex items-center shadow-lg font-bold justify-center px-3 py-1 bg-blue-500 text-white ">
                Active
              </span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <span>Database</span>
              <span className="border border-gray-200 rounded-full w-full flex items-center shadow-lg font-bold justify-center px-3 py-1 bg-blue-500 text-white ">
                Connected
              </span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <span>Alert System</span>
              <span className="border border-gray-200 rounded-full w-full flex items-center shadow-lg font-bold justify-center px-3 py-1 bg-blue-500 text-white ">
                Enabled
              </span>
            </div>
          </div>
        </div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </div>
    </div>
  );
}
