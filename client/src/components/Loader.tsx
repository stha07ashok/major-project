import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-green-600 animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
