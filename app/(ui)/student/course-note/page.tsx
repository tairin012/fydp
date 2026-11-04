'use client';

import Breadcrumb from '@/components/base/Breadcrumb';
import { Inter, Rakkas } from 'next/font/google';
import { useState } from 'react';
import { LuBookOpenText } from 'react-icons/lu';

const rakkas = Rakkas({
  variable: '--font-rakkas',
  subsets: ['latin'],
  weight: '400',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const lectures = [
  {
    title: 'Lecture :1',
    topic: 'Variable',
    details: [
      {
        label: 'int',
        description: 'stores integers like 123 or -123',
      },
      {
        label: 'float',
        description: 'stores decimals like 19.99 or -19.99',
      },
      {
        label: 'char',
        description: 'stores single characters like a or B',
      },
    ],
  },
  {
    title: 'Lecture :2',
    topic: 'Data Types',
    details: [
      {
        label: 'string',
        description: 'used for text, like hello',
      },
      {
        label: 'boolean',
        description: 'holds true or false',
      },
    ],
  },
  {
    title: 'Lecture :3',
    topic: 'Operators',
    details: [
      {
        label: '+',
        description: 'Addition operator',
      },
      {
        label: '==',
        description: 'Comparison operator',
      },
    ],
  },
];

const Note = () => {
  const [selectedLecture, setSelectedLecture] = useState(0); // index of active lecture

  return (
    <div
      className={`${rakkas.variable} ${inter.variable} bg-slate-50 text-gray-800 min-h-screen`}
    >
      {/* Header */}
      <h2 className='text-3xl md:text-5xl px-6 pt-10 pb-6 font-bold border-b border-slate-300 capitalize text-blue-700'>
        Course Note
      </h2>

      <Breadcrumb />

      {/* Main Content */}
      <div className='container mx-auto px-4 py-10'>
        <div className='mb-8'>
          <h3 className='text-2xl md:text-4xl font-bold capitalize text-slate-800'>
            Course Topic
          </h3>
        </div>

        <div className='flex flex-col lg:flex-row gap-6'>
          {/* Lecture List */}
          <div className='lg:w-1/3 w-full'>
            <div className='bg-gradient-to-br from-[#fef9f6] to-[#e4f0ff] rounded-2xl p-5 shadow-lg border border-slate-100'>
              {lectures.map((lec, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedLecture(i)}
                  className={`flex items-center justify-between mb-4 px-4 py-3 rounded-xl font-medium text-sm md:text-lg cursor-pointer shadow-sm backdrop-blur-sm transition-all ${
                    selectedLecture === i
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-white/70 hover:bg-blue-100 hover:text-blue-800'
                  }`}
                >
                  <div className='flex items-center gap-x-2'>
                    <LuBookOpenText className='w-5 h-5 text-blue-500' />
                    <span>{lec.title}</span>
                  </div>
                  <span>{lec.topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Lecture Details */}
          <div className='lg:w-2/3 w-full bg-gradient-to-tr from-white to-blue-50 rounded-2xl shadow-lg p-6 border border-slate-100 mb-6'>
            <div className='mb-4'>
              <h1 className='text-xl md:text-3xl font-bold text-blue-700'>
                {lectures[selectedLecture].title}
              </h1>
              <h2 className='text-amber-600 text-lg md:text-2xl font-semibold'>
                {lectures[selectedLecture].topic}
              </h2>
            </div>
            <div className='space-y-4 text-sm md:text-base font-[var(--font-inter)] leading-relaxed'>
              {lectures[selectedLecture].details.map((detail, j) => (
                <p key={j}>
                  <span className='inline-block h-2 w-2 bg-blue-600 rounded-full mr-2' />
                  <code className='bg-gray-200 px-1 rounded font-mono'>
                    {detail.label}
                  </code>{' '}
                  – {detail.description}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
