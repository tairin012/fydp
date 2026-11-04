import Link from 'next/link';

export interface EnrolledCourseRow {
  id: string;
  title: string;
  /** 0-100 */
  progress: number;
}

const getProgressColor = (progress: number) => {
  if (progress >= 75) return 'bg-green-500';
  if (progress >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
};

const EnrolledCoursesTable = ({ courses }: { courses: EnrolledCourseRow[] }) => {
  return (
    <div className='container flex flex-col mt-8'>
      <div className='cursor-pointer pb-5'>
        <h3 className='text-black text-2xl md:text-4xl py-1 font-bold capitalize'>Enrolled Courses</h3>
      </div>
      {courses.length === 0 ? (
        <p className='text-gray-600'>
          You have not enrolled in any course yet.{' '}
          <Link href='/student/home' className='text-blue-600 underline'>
            Browse courses
          </Link>
        </p>
      ) : (
        <table className='w-full text-sm text-left text-gray-700 border border-gray-300'>
          <thead className='bg-gray-100 border-b border-gray-300'>
            <tr className='text-sm md:text-base'>
              <th className='px-4 py-2'>Course</th>
              <th className='px-4 py-2'>Course Progress</th>
              <th className='px-4 py-2'>Status</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className='border-t border-gray-300'>
                <td className='px-4 py-2'>
                  <Link href={`/courses/${course.id}`} className='hover:underline'>
                    {course.title}
                  </Link>
                </td>
                <td className='px-4 py-2'>
                  <div className='w-full bg-gray-200 rounded-full h-4'>
                    <div
                      className={`h-4 rounded-full ${getProgressColor(course.progress)}`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className='text-xs text-gray-500 mt-1 inline-block'>{course.progress}%</span>
                </td>
                <td className='px-4 py-2'>{course.progress === 100 ? 'Completed' : 'In progress'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EnrolledCoursesTable;
