import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { userId, allChapterIds } = await req.json()

    // Reset user's question progress for each chapter
    for (const chapterId of allChapterIds) {
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

      const userProgress = await db.userProgress.findUnique({
        where: { userId_chapterId: { userId, chapterId } },
      })

      if (userProgress) {
        await db.userProgress.update({
          where: { userId_chapterId: { userId, chapterId } },
          data: { isCompleted: false },
        })
      } else {
        // Optionally handle the case where the userProgress record doesn't exist
        console.log(`No progress found for user ${userId} and chapter ${chapterId}.`)
      }
    }

    return new Response('User progress reset successfully', { status: 200 })
  } catch (error) {
    console.error('Error resetting user progress:', error)
    return new Response('Error resetting user progress', { status: 500 })
  }
}
