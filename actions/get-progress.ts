'use server'

import { db } from '@/lib/db'

type validCompletedChaptersDataType = {
  id: string
  chapterId: string
  userId: string
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date
}

export async function getProgress(
  userId: string,
  courseId: string,
): Promise<{ progressPercentage: number; validCompletedChaptersData: validCompletedChaptersDataType[] }> {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: { courseId, isPublished: true },
      select: { id: true },
    })
    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id)

    const validCompletedChapters = await db.userProgress.count({
      where: { userId, chapterId: { in: publishedChapterIds }, isCompleted: true },
    })

    const validCompletedChaptersData = await db.userProgress.findMany({
      where: { userId, chapterId: { in: publishedChapterIds }, isCompleted: true },
    })

    const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100

    return { progressPercentage, validCompletedChaptersData }
  } catch {
    return {
      progressPercentage: 0,
      validCompletedChaptersData: [],
    }
  }
}
