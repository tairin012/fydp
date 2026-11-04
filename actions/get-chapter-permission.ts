'use server'

import { db } from '@/lib/db'

// This function checks if a user is permitted to access a specific chapter in a course. users can only access chapters
// if they have completed the previous chapter or if the chapter is the first one in the course.

export async function isUserPermittedToAccessChapter(userId: string, chapterId: string, courseId: string) {
  try {
    const chapter = await db.chapter.findUnique({
      where: { id: chapterId },
      include: { course: true },
    })

    if (!chapter) {
      throw new Error('Chapter not found')
    }

    // Check if the user is enrolled in the course
    const enrollment = await db.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    })

    if (!enrollment) {
      return true
    }

    // Check if the chapter is the first one or if the previous chapter is completed
    const previousChapter = await db.chapter.findFirst({
      where: { courseId, position: chapter.position - 1 },
    })

    if (previousChapter) {
      const userProgress = await db.userProgress.findUnique({
        where: { userId_chapterId: { userId, chapterId: previousChapter.id } },
      })

      if (!userProgress?.isCompleted) {
        return false
      }
    }

    return true
  } catch (error) {
    console.error('Error checking user permission:', error)
    return false
  }
}
