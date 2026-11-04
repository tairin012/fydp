import React from 'react'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'
import { db } from '@/lib/db'
import { getProgress } from '@/actions/get-progress'

// Dynamically import the pie chart component
const CourseProgressPie = dynamic(() => import('./CourseProgressPie'), {
  ssr: false, // Disable SSR for this component
})

export default async function ProgressPage({ params }: { params: Promise<{ courseId: string }> }) {
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

  const { progressPercentage } = await getProgress(userId, course.id)

  return (
    <div className="mx-auto mt-5 flex h-full w-full max-w-4xl flex-col gap-4">
      <div className="grid grid-cols-4 gap-2 border-2 p-2">
        <div className="col-span-4 flex h-full flex-col items-center justify-center p-2 text-center md:col-span-2">
          <h1 className="mb-2 text-xl font-bold">Course Completion</h1>
          <p className="text-sm text-gray-400">This represents how much of the course contents you have completed</p>
        </div>
        <div className="col-span-4 p-2 md:col-span-2">
          <CourseProgressPie value={progressPercentage} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 border-2 p-2">
        <div className="col-span-4 p-2 text-center md:col-span-2">
          <h1 className="mb-2 text-xl font-bold text-blue-600 ">Your Level</h1>
          <p className="text-sm ">Beginner</p>
        </div>
        <div className="col-span-4 p-2 text-center md:col-span-2">
          <h1 className="mb-2 text-xl font-bold text-blue-600">Recommendation</h1>
          <p className="text-sm">Watch Lectures 1 to 4</p>
        </div>
      </div>
    </div>
  )
}
