import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-8">Welcome to the App</h1>
      <div className="space-x-4">
        <Link
          to="/workflow-builder"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Workflow Builder
        </Link>
        <Link
          to="/report-generator"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Go to Report Generator
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;