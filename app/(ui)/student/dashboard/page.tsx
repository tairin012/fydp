import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { getDashboardCourses } from '@/actions/get-dashboard-courses'
import EnrolledCoursesTable from '@/components/course/EnrolledCoursesTable'
import { safePercent } from '@/lib/ui-helpers'

export default async function StudentDashboard() {
  const { userId } = auth()
  if (!userId) return redirect('/sign-in')

  const { coursesInProgress, completedCourses } = await getDashboardCourses(userId)
  const rows = [...coursesInProgress, ...completedCourses].map((c) => ({
    id: c.id,
    title: c.title,
    progress: safePercent(c.progress),
  }))

  return <EnrolledCoursesTable courses={rows} />
}
