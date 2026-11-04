import Sidebar from '@/components/base/Sidebar';
import GradeDataTable from '@/components/table/GradesDataTable';

const StudentGrades = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 overflow-x-auto">
        <GradeDataTable />
      </div>
    </div>
  );
};

export default StudentGrades;
