import { redirect } from 'next/navigation'
import { isTeacher } from '@/actions/get-user-role'

export default async function TeacherUiLayout({ children }: { children: React.ReactNode }) {
  if (!(await isTeacher())) return redirect('/student/home')
  return <>{children}</>
}
