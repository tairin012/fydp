'use server'

import { db } from '@/lib/db'

export async function isUserPermittedToAccessCourse(userId: string, courseId: string) {
  try {
    const enrollment = await db.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    })

    if (!enrollment) {
      throw new Error('User is not enrolled in this course')
    }

    return true
  } catch (error) {
    console.error('Error checking user permission:', error)
    return false
  }
}
