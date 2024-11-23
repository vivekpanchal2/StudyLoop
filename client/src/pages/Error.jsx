import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] bg-gray-900 text-white px-4">
      <div className="text-center">
        <h1 className="text-8xl md:text-9xl font-bold mb-4">404</h1>
        <p className="text-2xl md:text-4xl mb-6">Oops! Page not found</p>
        <p className="hidden md:block md:text-lg mb-8 text-gray-400">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-all text-white rounded-lg shadow-lg text-sm md:text-base"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
