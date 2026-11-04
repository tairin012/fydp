'use client';

import Breadcrumb from '@/components/base/Breadcrumb';
import GradeChart from '@/components/chart/Barchart';
import CourseProgress from '@/components/course-progress/CourseProgress';
import CourseProgressList from '@/components/course/CourseProgressList';
import Grade from '@/components/grade/Grade';
import CourseNote from '@/components/note/CourseNote';
import TabPane from '@/components/tab/Tabpane';
import { Rakkas } from 'next/font/google';
import { useState } from 'react';

const rakkas = Rakkas({
  variable: '--font-rakkas',
  subsets: ['latin'],
  weight: '400',
});

const grades = [
  {
    type: 'Assignment 1st',
    assignment: 10,
    quiz1: 8,
    quiz2: 7,
    quiz3: 9,
  },
  {
    type: 'Assignment 2nd',
    assignment: 9,
    quiz1: 6,
    quiz2: 8,
    quiz3: 10,
  },
  {
    type: 'Assignment 3rd',
    assignment: 10,
    quiz1: 9,
    quiz2: 9,
    quiz3: 10,
  },
];

const Page = () => {
  const [activeTab, setActiveTab] = useState('course');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'grade':
        return <Grade grades={grades} />;
      case 'course':
        return (
          <p className='p-8'>
            <CourseProgressList />
          </p>
        );
      case 'progress':
        return <CourseProgress />;
      case 'note':
        return <CourseNote />;
      case 'time':
        return (
          <div className='container'>
            <GradeChart
              type='bar'
              data={{
                labels: ['Quiz 1', 'Quiz 2', 'Assignment'],
                datasets: [
                  {
                    label: 'Grades',
                    data: [8, 9, 10],
                    backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                    borderColor: ['rgba(75, 192, 192, 1)'],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <h2
        className={`text-black text-2xl md:text-3xl px-8 py-4 font-bold border-b border-black capitalize ${rakkas.variable}`}
      >
        Course Grade
      </h2>

      <Breadcrumb />
      <TabPane activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className='mt-6'>{renderTabContent()}</div>
    </>
  );
};

export default Page;
