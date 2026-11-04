import Sidebar from '@/components/base/Sidebar';
import StudentDataTable from '@/components/table/StudentsDatatable';

const StudentList = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 overflow-x-auto">
        <StudentDataTable />
      </div>
    </div>
  );
};

export default StudentList;
