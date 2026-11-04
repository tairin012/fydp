"use client"
import { StudentCourseCardProps } from '@/types/propTypes';
import Image from 'next/image';
import Link from 'next/link';

const StudentCourseCard = ({
  imgPath,
  heading,
  courseCode,
  badge,
  href = 'course',
  actionLabel = 'Start',
}: StudentCourseCardProps) => {
  return (
    <div className='bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 transition-transform hover:scale-[1.02]'>
      {/* Image */}
      <div className='relative w-full h-48'>
        <Image src={imgPath} alt='Course Image' fill className='object-cover' />
      </div>

      {/* Content */}
      <div className='p-4'>
        <h2 className='text-lg sm:text-xl font-semibold text-gray-900'>
          {heading}
        </h2>
        <h3 className='inline-block bg-[#E24B37] mt-2 text-white px-2 py-1 rounded text-sm cursor-pointer'>
          {badge ?? `Code: ${courseCode ?? ''}`}
        </h3>

        <Link href={href} className='mt-4 flex justify-end '>
          <button className='cursor-pointer bg-[#E24B37] hover:bg-[#c93c2c] text-white px-4 py-2 rounded text-sm transition-colors duration-200'>
            {actionLabel}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StudentCourseCard;
