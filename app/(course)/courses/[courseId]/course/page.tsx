import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { CourseProgress } from '@/components/course-progress'
import { getProgress } from '@/actions/get-progress'
import CourseList from '@/app/(course)/courses/[courseId]/course/CourseList'
import CourseEnrollButton from '@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/course-enroll-button'

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        where: { isPublished: true },
        include: { userProgress: { where: { userId } } },
        orderBy: { position: 'asc' },
      },
    },
  })

  if (!course) {
    return redirect('/dashboard')
  }

  const enrollment = await db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  })

  const { progressPercentage } = await getProgress(userId, course.id)

  return (
    <div className="mx-auto mt-5 flex h-full w-full max-w-4xl flex-col">
      <div className="flex flex-col border-b p-8">
        <h1 className="text-center text-xl font-semibold">{course.title}</h1>
        {enrollment ? (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressPercentage} />
          </div>
        ) : (
          <div className="mx-auto my-5">
            <CourseEnrollButton courseId={courseId} />
          </div>
        )}
      </div>
      <CourseList course={course} enrollment={enrollment} />
    </div>
  )
}
