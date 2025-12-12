import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-64">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-12 h-12 rounded-full border-4 border-gray-200"></div>
        {/* Spinning Ring */}
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-sm font-medium text-gray-500">
        Loading sales data...
      </p>
    </div>
  );
};

export default Loader;
