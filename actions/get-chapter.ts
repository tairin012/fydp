'use server'

import { Attachment, Chapter } from '@prisma/client'
import { db } from '@/lib/db'

type GetChapterArgs = {
  userId: string
  courseId: string
  chapterId: string
}

export async function getChapter({ userId, courseId, chapterId }: GetChapterArgs) {
  try {
    const enrollment = await db.enrollment.findUnique({ where: { userId_courseId: { userId, courseId } } })
    const course = await db.course.findUnique({ where: { id: courseId, isPublished: true } })
    // In your getChapter function, update the questions include:
    const chapter = await db.chapter.findUnique({
      where: { id: chapterId, isPublished: true },
      include: {
        questions: {
          select: {
            id: true,
            question: true,
            options: true,
            time: true, // Only send what’s needed for the UI
          },
        },
      },
    })

    if (!chapter || !course) {
      throw new Error('Chapter or course not found!')
    }

    let muxData = null
    let attachments: Attachment[] = []
    let nextChapter: Chapter | null = null
    let allNextChapters: Chapter[] = []

    if (enrollment) {
      attachments = await db.attachment.findMany({ where: { courseId } })
    }

    if (enrollment) {
      muxData = await db.muxData.findUnique({ where: { chapterId } })

      nextChapter = await db.chapter.findFirst({
        where: { courseId, isPublished: true, position: { gt: chapter.position } },
        orderBy: { position: 'asc' },
      })

      allNextChapters = await db.chapter.findMany({
        where: { courseId, isPublished: true, position: { gt: chapter.position } },
        orderBy: { position: 'asc' },
      })
    }

    const userProgress = await db.userProgress.findUnique({ where: { userId_chapterId: { userId, chapterId } } })

    // Fetch the questions the user has already attempted
    const attemptedQuestions = await db.userQuestionProgress.findMany({
      where: { userId, question: { chapterId } },
      select: { questionId: true },
    })
    const attemptedQuestionIds = attemptedQuestions.map((progress) => progress.questionId)

    // Filter the questions to return only those that haven't been attempted yet
    const unansweredQuestions = chapter?.questions.filter((question) => !attemptedQuestionIds.includes(question.id))

    return {
      chapter: {
        ...chapter,
        questions: unansweredQuestions, // Return only the unanswered questions
      },
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      enrollment,
      allNextChapters,
    }
  } catch {
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: null,
      nextChapter: null,
      userProgress: null,
      enrollment: null,
      allNextChapters: null,
    }
  }
}
