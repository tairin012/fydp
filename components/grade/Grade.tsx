import { Rakkas } from 'next/font/google';

const rakkas = Rakkas({
  variable: '--font-rakkas',
  subsets: ['latin'],
  weight: '400',
});

interface GradeItem {
  type: string;
  assignment: number;
  quiz1: number;
  quiz2: number;
  quiz3: number;
}

interface GradeProps {
  grades: GradeItem[];
}

const Grade = ({ grades }: GradeProps) => {
  return (
    <div className='container mx-auto px-4 mt-8'>
      <div className='pb-5'>
        <h3
          className={`text-black text-2xl md:text-3xl py-1 font-bold capitalize ${rakkas.variable}`}
        >
          Enrolled Courses Grade
        </h3>
      </div>

      <div className='overflow-x-auto shadow-xl rounded-xl border border-gray-200'>
  <table className='min-w-full text-sm text-left text-gray-800'>
    <thead className='bg-gradient-to-r from-blue-500 to-purple-500 text-white uppercase tracking-wider text-xs sticky top-0 z-10 shadow-md'>
      <tr>
        <th className='py-4 px-6 border-b border-white'>Course</th>
        <th className='py-4 px-6 border-b border-white'>Quiz 1</th>
        <th className='py-4 px-6 border-b border-white'>Quiz 2</th>
        <th className='py-4 px-6 border-b border-white'>Quiz 3</th>
        <th className='py-4 px-6 border-b border-white'>Total</th>
      </tr>
    </thead>
    <tbody className='divide-y divide-gray-200'>
      {grades.map((grade, index) => {
        const total =
          grade.assignment + grade.quiz1 + grade.quiz2 + grade.quiz3;
        return (
          <tr
            key={index}
            className={`${
              index % 2 === 0 ? 'bg-orange-400' : 'bg-purple-50'
            } hover:bg-yellow-100 transition duration-200`}
          >
            <td className='py-3 px-6 font-semibold text-gray-900'>{grade.type}</td>
            <td className='py-3 px-6'>{grade.quiz1}</td>
            <td className='py-3 px-6'>{grade.quiz2}</td>
            <td className='py-3 px-6'>{grade.quiz3}</td>
            <td className='py-3 px-6 font-bold text-indigo-700'>{total}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Grade;
