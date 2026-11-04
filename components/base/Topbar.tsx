'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navItems = [
  { id: '1', name: 'Home', path: '/' },
  { id: '2', name: 'Courses', path: '/student/course-overview' },
  { id: '3', name: 'Progress', path: '/student/course-list' },
  { id: '4', name: 'Note', path: '/student/course-note' },
  { id: '5', name: 'Grade', path: '/student/grade' },
  { id: '6', name: 'Teacher overview', path: '/teacher/course-overview' },
  { id: '7', name: 'Teacher course', path: '/teacher/course-details' },
  { id: '8', name: 'Teacher StudentsList', path: '/teacher/student-list' }
];

const Navbar = () => {
  const pathname = usePathname();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetPath: string) => {
    if (pathname === targetPath) {
      e.preventDefault(); // prevent same route navigation
    }
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.id}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
