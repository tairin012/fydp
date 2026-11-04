'use server'

import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { userId, chapterId } = await req.json()

    // Reset user's question progress for the chapter
    const questionIds = await db.question.findMany({
      where: { chapterId },
      select: { id: true },
    })

    await db.userQuestionProgress.deleteMany({
      where: {
        userId,
        questionId: { in: questionIds.map((question) => question.id) },
      },
    })

    // Optionally, reset the chapter completion status
    await db.userProgress.update({
      where: { userId_chapterId: { userId, chapterId } },
      data: { isCompleted: false },
    })

    return new Response('User progress reset successfully', { status: 200 })
  } catch (error) {
    console.error('Error resetting user progress:', error)
    return new Response('Error resetting user progress', { status: 500 })
  }
}
