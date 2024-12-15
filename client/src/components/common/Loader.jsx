import React from "react";

const LoaderPage = () => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 backdrop-blur-md flex flex-col items-center justify-center z-50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-3 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin-reverse"></div>
      </div>
      <p className="text-yellow-300 text-lg font-semibold mt-4 animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default LoaderPage;
