import { redirect } from 'next/navigation'
import { isTeacher } from '@/actions/get-user-role'

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const teacher = await isTeacher()
  if (!teacher) {
    return redirect('/')
  }

  return <>{children}</>
}
