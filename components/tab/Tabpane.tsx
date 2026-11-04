'use client';
import { TabOptionType } from '@/types/interface';
import { useEffect, useRef } from 'react';

interface TabPaneProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const tabOptions: TabOptionType[] = [
  { id: 'course', label: 'Course' },
  { id: 'progress', label: 'Progress' },
  { id: 'note', label: 'Note' },
  { id: 'time', label: 'Time' },
  { id: 'grade', label: 'Grade' },
];

export default function TabPane({ activeTab, setActiveTab }: TabPaneProps) {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const index = tabOptions.findIndex((tab) => tab.id === activeTab);
    const current = tabsRef.current[index];
    const indicator = indicatorRef.current;
    if (current && indicator) {
      indicator.style.left = `${current.offsetLeft}px`;
      indicator.style.width = `${current.offsetWidth}px`;
    }
  }, [activeTab]);

  return (
    <div className="mx-auto relative flex items-center justify-center bg-gray-200 p-1 rounded-lg w-fit mt-6">
      <div
        ref={indicatorRef}
        className="absolute top-1 bottom-1 bg-[#1F5A75] rounded-md transition-all duration-300 ease-in-out shadow-md"
      ></div>

      {tabOptions.map((tab, index) => (
        <button
          key={tab.id}
          ref={(el) => {
            tabsRef.current[index] = el;
          }}
          className={`cursor-pointer relative z-10 px-5 py-1 text-lg font-medium transition-colors duration-200 ${
            activeTab === tab.id
              ? 'text-white'
              : 'text-gray-700 hover:text-black'
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
