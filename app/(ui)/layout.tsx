import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { isTeacher } from '@/actions/get-user-role'
import Navbar from '@/components/base/Navbar'
import RoleProvider from '@/context/RoleContext'

export default async function UiLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth()
  if (!userId) return redirect('/sign-in')

  const role = (await isTeacher()) ? 'teacher' : 'student'

  return (
    <div className="ui-shell min-h-screen">
      <RoleProvider initialRole={role}>
        <Navbar />
        {children}
      </RoleProvider>
    </div>
  )
}
