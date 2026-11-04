'use server'

import { Course } from '@prisma/client'
import { db } from '@/lib/db'
import { getProgress } from './get-progress'

export type CourseWithProgress = Course & {
  chapters: { id: string }[]
  progress: number | null
}

type GetCoursesArgs = {
  userId: string
  title?: string
}

export async function getCourses({ userId, title }: GetCoursesArgs): Promise<CourseWithProgress[]> {
  try {
    const courses = await db.course.findMany({
      where: { isPublished: true, title: { contains: title } },
      include: {
        chapters: { where: { isPublished: true }, select: { id: true } },
        enrollments: { where: { userId } },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const coursesWithProgress: CourseWithProgress[] = await Promise.all(
      courses.map(async (course) => {
        if (course.enrollments.length === 0) {
          return { ...course, progress: null }
        }

        const { progressPercentage } = await getProgress(userId, course.id)
        return {
          ...course,
          progress: progressPercentage,
        }
      }),
    )

    return coursesWithProgress
  } catch {
    return []
  }
}
