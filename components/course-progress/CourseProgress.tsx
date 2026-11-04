import CircularProgressBar from '../progressbar/CircularProgressBar';

const CourseProgress = () => {
  return (
    <div className='container mx-auto px-4 py-6'>
      {/* Course Completion Card */}
      <div className='flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-gray-200 p-6 rounded-xl shadow-lg transition-transform hover:scale-[1.01]'>
        <div className='flex flex-col md:basis-1/2'>
          <h4 className='text-gray-800 text-3xl font-extrabold'>📚 Course Completion</h4>
          <p className='text-gray-500 mt-4 leading-relaxed'>
            You’ve completed <span className='font-semibold text-blue-600'>40%</span> of the course. Keep going!
          </p>
        </div>
        <div className='md:basis-1/2 flex items-center justify-center'>
          <CircularProgressBar progress={40} />
        </div>
      </div>

      {/* User Level and Recommendation Card */}
      <div className='flex flex-col md:flex-row items-start justify-between gap-6 bg-gradient-to-r from-blue-50 to-blue-100 mt-8 p-6 rounded-xl shadow-lg transition-transform hover:scale-[1.01]'>
        <div className='flex flex-col md:basis-1/2'>
          <h4 className='text-blue-800 text-2xl font-bold mb-2'>🚀 Your Level</h4>
          <p className='text-gray-700 text-lg font-medium'>Beginner</p>
        </div>
        <div className='flex flex-col md:basis-1/2'>
          <h4 className='text-blue-800 text-2xl font-bold mb-2'>🎯 Recommendation</h4>
          <p className='text-gray-700 text-lg font-medium'>Watch Lecture 1 to 4</p>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
