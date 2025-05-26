import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
        Coming Soon
      </h1>

      <p className="text-xl text-gray-600 mb-8 max-w-md">
        We're working hard to bring you something amazing. Stay tuned!
      </p>

      <div className="flex space-x-4">
        <a
          href="#"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Notify Me
        </a>
        <a
          href="mailto:hello@example.com"
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default page;
