import React from 'react';
import Image from 'next/image';

const ProfileCard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-200">
      <div className="flex w-full max-w-5xl bg-white shadow-2xl rounded-xl p-10 m-6">
        {/* Left Section */}
        <div className="w-1/3 flex flex-col items-center border-r border-gray-200 pr-8">
          <div className="w-36 h-36 relative mb-6 rounded-full overflow-hidden shadow-lg">
            <Image
              src="/logo.png" // Replace with the actual path to your logo image
              alt="Profile Logo"
              fill
              className="rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold text-orange-600 mb-2">Tonni Islam</h1>
          <p className="text-black font-medium">Batch 201</p>
          <p className="text-black mt-4 italic text-center">Lorem ipsum dolor sit amet</p>
        </div>

        {/* Right Section */}
        <div className="w-2/3 pl-10">
          <h2 className="text-2xl font-semibold text-orange-600 mb-6">BASIC INFO</h2>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-black mb-2">FIRST NAME</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">LAST NAME</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
              />
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-sm font-medium text-black mb-2">EMAIL</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
            />
          </div>
          <div className="mb-8">
            <label className="block text-sm font-medium text-black mb-2">ABOUT ME</label>
            <textarea className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"></textarea>
          </div>
          <div className="flex justify-end gap-4">
            <button className="px-6 py-2 border border-gray-300 rounded-lg text-black font-medium shadow-sm hover:bg-gray-100 transition duration-200">
              CANCEL
            </button>
            <button className="px-6 py-2 bg-orange-600 text-white rounded-lg font-medium shadow-sm hover:bg-orange-700 transition duration-200">
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
