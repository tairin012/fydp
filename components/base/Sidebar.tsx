'use client';
import { SignOutButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  FaChalkboardTeacher,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaUsers,
} from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

const Sidebar = () => {
  const [active, setActive] = useState('participants');
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    {
      label: 'Participants',
      value: 'participants',
      icon: <FaUsers className='text-lg' />,
      link: '/teacher/student-list',
    },
    {
      label: 'Grade/Level',
      value: 'Grade/Level',
      icon: <FaChartBar className='text-lg' />,
      link: '/teacher/student-grade',
    },
    {
      label: 'Lecture',
      value: 'lecture',
      icon: <FaChalkboardTeacher className='text-lg' />,
      link: '/teacher/course-details',
    },
    // {
    //   label: 'Level',
    //   value: 'level',
    //   icon: <FaLayerGroup className='text-lg' />,
    //   link: '/level',
    // },
  ];

  return (
    <>
      {/* Hamburger Button (Mobile Only) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='fixed my-4 left-2 z-50 cursor-pointer text-2xl text-white bg-blue-600 p-2 rounded-lg shadow-md hover:bg-blue-700  transition-all duration-300'
      >
        <FiMenu />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed sm:static left-0 z-40 h-[calc(100vh-165px)] bg-green-200 text-white px-4 py-4 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'w-56' : 'w-20'
        }`}
      >
        {/* Top Section */}
        <div>
          {/* Profile Section */}
          <div className='flex flex-col items-center pb-6 border-b border-gray-600 mb-6'>
            <div className='relative w-12 h-12 md:w-20 md:h-20 mb-3 group'>
              <Image
                src='/images/profile.png'
                alt='Profile Picture'
                fill
                className={`rounded-full border-2 border-blue-500 object-cover transition-transform duration-300 group-hover:scale-105 ${
                  isOpen ? 'block' : 'hidden'
                }`}
              />
            </div>
            <h2 className='text-sm md:text-lg font-semibold text-gray-600'>
              User
            </h2>
          </div>

          {/* Menu Items */}
          <div className='flex flex-col gap-y-2'>
            {menuItems.map((item) => (
              <Link
                href={item.link}
                key={item.value}
                onClick={() => setActive(item.value)}
                className={`flex items-center px-3 py-2 rounded-lg text-left text-base font-medium transition-all duration-200 ${
                  active === item.value
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-orange-500 hover:text-white'
                }`}
              >
                <span className='mr-3'>{item.icon}</span>
                <span className={`${isOpen ? 'block' : 'hidden'}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className='flex flex-col items-center md:items-start gap-y-2 pt-6'>
          <Link
            href={'/settings'}
            className='flex items-center space-x-2 text-base text-gray-600 transition-all md: p-2 rounded-md w-full'
          >
            <FaCog className='text-lg' />
            <span className={`${isOpen ? 'block' : 'hidden'}`}>Settings</span>
          </Link>
          <SignOutButton>
            <button className='flex items-center space-x-2 text-base text-red-600 md:p-2 rounded-md w-full'>
              <FaSignOutAlt className='text-lg text-red-600' />
              <span className={`${isOpen ? 'block' : 'hidden'}`}>Logout</span>
            </button>
          </SignOutButton>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
