'use server'

import { Prisma } from '@prisma/client'
import { db } from '@/lib/db'
import { getProgress } from './get-progress'

type CourseWithProgress = Prisma.CourseGetPayload<{ include: { chapters: true } }> & {
  progress: number
}

type DashboardCourses = {
  completedCourses: CourseWithProgress[]
  coursesInProgress: CourseWithProgress[]
}

export async function getDashboardCourses(userId: string): Promise<DashboardCourses> {
  try {
    const enrolledCourses = await db.enrollment.findMany({
      where: { userId },
      select: { course: { include: { chapters: { where: { isPublished: true } } } } },
    })

    const courses = enrolledCourses.map((course) => course.course) as CourseWithProgress[]

    for (const course of courses) {
      const { progressPercentage } = await getProgress(userId, course.id)
      course.progress = progressPercentage
    }

    const completedCourses = courses.filter((course) => course.progress === 100)
    const coursesInProgress = courses.filter((course) => (course?.progress ?? 0) < 100)

    return {
      completedCourses,
      coursesInProgress,
    }
  } catch {
    return {
      completedCourses: [],
      coursesInProgress: [],
    }
  }
}
