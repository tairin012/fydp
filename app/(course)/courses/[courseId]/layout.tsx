import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import CourseNavbar from './_components/course-navbar'
// import CourseSidebar from './_components/course-sidebar'
import { getProgress } from '@/actions/get-progress'
import ChapterNavbar from '@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/chapter-navbar'

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { courseId: string }
}) {
  const { userId } = auth()
  if (!userId) {
    return redirect('/')
  }

  const course = await db.course.findUnique({
    where: { id: params.courseId },
    include: {
      chapters: {
        where: { isPublished: true },
        include: { userProgress: { where: { userId } } },
        orderBy: { position: 'asc' },
      },
    },
  })

  if (!course) {
    return redirect('/')
  }

  const { progressPercentage } = await getProgress(userId, course.id)

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-50 h-20 w-full">
        <CourseNavbar course={course} progressCount={progressPercentage} />
      </div>

      {/* <div className="fixed inset-y-0 z-50 hidden h-full w-80 flex-col md:flex"> */}
      {/*   <CourseSidebar course={course} progressCount={progressPercentage} /> */}
      {/* </div> */}

      <main className="h-full pt-20">
        <ChapterNavbar courseId={params.courseId} />
        {children}
      </main>
    </div>
  )
}
