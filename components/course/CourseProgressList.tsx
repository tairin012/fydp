// import { courseList } from '@/constants/teacherCourseOverview';
import { Rakkas } from 'next/font/google';

const rakkas = Rakkas({
  variable: '--font-rakkas',
  subsets: ['latin'],
  weight: '400',
});
const CourseProgressList = () => {
  // const getProgressColor = (progress: number) => {
  //   if (progress >= 75) return 'bg-green-500';
  //   if (progress >= 50) return 'bg-yellow-500';
  //   return 'bg-red-500';
  // };
  return (
    <div className='container flex flex-col mt-8'>
      <div className='cursor-pointer pb-5'>
        <h3
          className={`text-black text-2xl   md:text-4xl py-1 font-bold md:font-bold capitalize ${rakkas.variable}`}
        >
          Placed your item
        </h3>
      </div>
      {/* <div className='basis-2/3'>
        <div className=' text-black'>
          <table className='w-full text-sm text-left text-gray-700 border border-gray-300'>
            <thead className='bg-gray-100 border-b border-gray-300'>
              <tr className={`text-sm md:text-base ${rakkas.variable}`}>
                <th className='px-4 py-2'>Course</th>
                <th className='px-4 py-2'>Course Progress</th>
                <th className='px-4 py-2'>Level</th>
                <th className='px-4 py-2'>Termister</th>
              </tr>
            </thead>
            <tbody>
              {courseList.map((course, index) => (
                <tr key={index} className='border-t border-gray-300'>
                  <td className='px-4 py-2'>{course.course}</td>
                  <td className='px-4 py-2'>
                    <div className='w-full bg-gray-200 rounded-full h-4'>
                      <div
                        className={`h-4 rounded-full ${getProgressColor(
                          course.progress
                        )}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className='text-xs text-gray-500 mt-1 inline-block'>
                      {course.progress}%
                    </span>
                  </td>
                  <td className='px-4 py-2'>{course.level}</td>
                  <td className='px-4 py-2'>{course.termister}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};

export default CourseProgressList;
