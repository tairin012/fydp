import { StudentCourseCardProps } from '@/types/propTypes';
import Image from 'next/image';
import Link from 'next/link';

const StudentBlogCard = ({ imgPath, heading, courseCode, href }: StudentCourseCardProps) => {
  const card = (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <Image src={imgPath} alt={heading} width={500} height={300} className="w-full h-48 object-cover" />
      <div className="p-4 cursor-pointer">
        <h3 className="text-lg font-semibold mb-1 text-gray-600">{heading}</h3>
        <p className="text-sm text-gray-600">{courseCode}</p>
      </div>
    </div>
  );
  return href ? <Link href={href}>{card}</Link> : card;
};

export default StudentBlogCard;
