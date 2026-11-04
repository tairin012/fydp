import Image from 'next/image';
import Link from 'next/link';
import { TeacherCourseCardProps } from '@/types/propTypes';

const TeacherCourseCard = ({
  imgPath,
  heading,
  courseCode,
  badge,
  href,
  actionLabel = 'Start',
}: TeacherCourseCardProps) => {
  const button = (
    <button className="bg-[#E24B37] hover:bg-[#c93c2c] cursor-pointer text-white px-4 py-2 rounded text-sm transition-colors duration-200">
      {actionLabel}
    </button>
  );

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 transition-transform hover:scale-[1.02]">
      {/* Image */}
      <div className="relative w-full h-48">
        <Image src={imgPath} alt="Course Image" fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{heading}</h2>
        <h3 className="inline-block bg-[#E24B37] mt-2 text-white px-2 py-1 rounded text-sm ">
          {badge ?? `Code: ${courseCode ?? ''}`}
        </h3>

        <div className="mt-4 flex justify-end cursor-pointer">{href ? <Link href={href}>{button}</Link> : button}</div>
      </div>
    </div>
  );
};

export default TeacherCourseCard;
