'use client';

import { studentMenu, teacherMenu } from '@/constants/navbarMenu';
import { RoleContext } from '@/context/RoleContext';
import { UserButton } from '@clerk/nextjs';
import { Rakkas, Raleway } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { RxHamburgerMenu } from 'react-icons/rx';

const rakkas = Rakkas({
  variable: '--font-rakkas',
  subsets: ['latin'],
  weight: '400'
});
const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin']
});

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);

  const { role, setRole, canSwitch } = useContext(RoleContext);

  const navigationMenu = role === 'student' ? studentMenu : teacherMenu;

  const handleNavbarToggle = () => {
    console.log('Navbar toggled', isNavbarOpen);
    setIsNavbarOpen((prev) => !prev);
  };
  return (
    <nav className="flex items-center justify-between bg-white text-black shadow-md px-2">
      <div className={`${rakkas.variable} flex items-center gap-x-1`}>
        <button onClick={handleNavbarToggle} className="md:hidden">
          {isNavbarOpen ? <ImCancelCircle size={24} /> : <RxHamburgerMenu size={24} />}
        </button>
        <Image
          src={'/icons/brand-logo.png'}
          alt="Brand Logo"
          width={50}
          height={69}
          className="w-16 h-auto sm:w-16 md:w-[4.5rem]"
        />
        <h1 className={`${rakkas.variable} hidden sm:block sm:text-3xl font-bold`}>uiUx</h1>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-x-4">
        {navigationMenu.map((menuItem) => (
          <li key={menuItem.id} className="mx-4">
            <Link href={menuItem.link} className={`${raleway.variable} hover:text-blue-500 tracking-wider`}>
              {menuItem.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu */}
      {isNavbarOpen && (
        <ul className="flex flex-col absolute top-20 left-0 w-full bg-white shadow-md px-4 py-2 md:hidden z-50">
          {navigationMenu.map((menuItem) => (
            <li key={menuItem.id} className="py-2 border-b border-gray-200">
              <Link
                href={menuItem.link}
                className={`${raleway.variable} hover:text-blue-500 tracking-wider block`}
                onClick={() => setIsNavbarOpen(false)} // close menu after click
              >
                {menuItem.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center gap-x-2 md:gap-x-6">
        {canSwitch && (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value === 'teacher' ? 'teacher' : 'student')}
            className="tracking-wide border border-gray-300 rounded px-2 py-1"
          >
            <option value="student">Student view</option>
            <option value="teacher">Teacher view</option>
          </select>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
