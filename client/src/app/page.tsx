import { FaRegEye } from "react-icons/fa6";
import { CgDanger } from "react-icons/cg";
import { MdPeople } from "react-icons/md";
import { RiMotorbikeFill } from "react-icons/ri";

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
              <FaRegEye className="w-8 h-5" />
            </div>
          </div>
          <div className="border border-gray-200 hoverEffect shadow-lg w-full rounded-full p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md">Helmet Violations</span>
              <span className="font-light">1,247</span>
            </div>
            <div>
              <CgDanger className="w-8 h-5" />
            </div>
          </div>
          <div className="border border-gray-200 hoverEffect shadow-lg w-full rounded-full p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md">Triple Ride Violations</span>
              <span className="font-light">1,247</span>
            </div>
            <div>
              <MdPeople className="w-8 h-5" />
            </div>
          </div>
          <div className="border border-gray-200 hoverEffect shadow-lg w-full rounded-full p-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md">License plates Read</span>
              <span className="font-light">1,247</span>
            </div>
            <div>
              <RiMotorbikeFill className="w-8 h-5" />
            </div>
          </div>
        </div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </div>
    </div>
  );
}
