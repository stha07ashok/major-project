"use client";
import { useTheme } from "next-themes";
import { BiSun } from "react-icons/bi";
import { FaRegMoon } from "react-icons/fa";

export default function Dark() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className=""
      >
        {theme === "dark" ? (
          <div className="hoverEffect text-[26px] font-bold ">
            <FaRegMoon className="text-green-400" />
          </div>
        ) : (
          <div className=" hoverEffect text-[26px] font-bold">
            <BiSun className="text-green-400" />
          </div>
        )}
      </button>
    </>
  );
}
