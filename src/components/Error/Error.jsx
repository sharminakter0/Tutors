import React from "react";
import { Link } from "react-router";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-6 py-12 text-center">
      <h1 className="text-6xl font-bold text-red-600 dark:text-red-500 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        Oops! Page not found.
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 transition rounded-lg"
      >
        <FaHome className="mr-2" />
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
