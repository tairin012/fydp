'use client';

import { GradeList as rawData } from '@/constants/studentList';
import 'react-data-table-component';
import DataTable, {
  ConditionalStyles,
  TableColumn,
} from 'react-data-table-component';

type StudentGradeType = {
  index: number;
  id: string;
  name: string;
  grade: string;
  level: string;
  action: string;
};

export default function GradeDataTable({}) {
  const columns: TableColumn<StudentGradeType>[] = [
    { name: 'ID', selector: (row: StudentGradeType) => row.id, sortable: true },
    {
      name: 'Name',
      selector: (row: StudentGradeType) => row.name,
      sortable: true,
    },
    { name: 'Grade', selector: (row: StudentGradeType) => row.grade },
    { name: 'Level', selector: (row: StudentGradeType) => row.level },
    { name: 'Action', selector: (row: StudentGradeType) => row.action },
  ];

  const data = rawData.map((item, index) => ({ ...item, index }));

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#F36C2D',
        fontWeight: 'bold',
        fontSize: '16px',
      },
    },
  };
  const conditionalRowStyles: ConditionalStyles<StudentGradeType>[] = [
    {
      when: (row) => row.index % 2 === 0,
      style: {
        backgroundColor: '#f9f9f9',
      },
    },
    {
      when: (row) => row.index % 2 === 1,
      style: {
        backgroundColor: '#88AB73',
      },
    },
  ];

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4 text-black'>
        List of Students in Introduction to Computer System
      </h1>
      <DataTable
        columns={columns}
        data={data}
        conditionalRowStyles={conditionalRowStyles}
        pagination
        responsive
        customStyles={customStyles}
      />
    </div>
  );
}
