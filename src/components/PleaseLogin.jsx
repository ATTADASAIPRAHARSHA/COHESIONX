import React from 'react';
import { Link } from 'react-router-dom';

const PleaseLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Please Login to Continue</h1>
        <p className="text-center text-gray-600 mb-6">
          You need to be logged in to access this page. Please login with your credentials.
        </p>
        <div className="flex justify-center">
          <Link to="/authentication" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PleaseLogin;
