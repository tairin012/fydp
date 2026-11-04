'use client';

import { List as rawData } from '@/constants/studentList';
import 'react-data-table-component';
import DataTable, {
  ConditionalStyles,
  TableColumn,
} from 'react-data-table-component';

type StudentRowType = {
  index: number;
  id: string;
  name: string;
  emailId: string;
  action: string;
};

export default function StudentDataTable({}) {
  const columns: TableColumn<StudentRowType>[] = [
    { name: 'ID', selector: (row: StudentRowType) => row.id, sortable: true },
    {
      name: 'Name',
      selector: (row: StudentRowType) => row.name,
      sortable: true,
    },
    { name: 'Email ID', selector: (row: StudentRowType) => row.emailId },
    { name: 'Action', selector: (row: StudentRowType) => row.action },
  ];

  const data = rawData.map((item, index) => ({ ...item, index }));

  const conditionalRowStyles: ConditionalStyles<StudentRowType>[] = [
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

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#F36C2D',
        fontWeight: 'bold',
        fontSize: '16px',
      },
    },
  };
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
        customStyles={customStyles}
      />
    </div>
  );
}
