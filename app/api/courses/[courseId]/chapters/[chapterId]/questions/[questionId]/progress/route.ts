import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; questionId: string } },
) {
  try {
    const { userId } = auth()
    const { selectedOption } = await req.json() // receive only the selected option

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Verify the user is enrolled in the course
    const courseEnrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: params.courseId,
        },
      },
    })

    if (!courseEnrollment) {
      return new NextResponse('Not enrolled', { status: 403 })
    }

    // Retrieve the full question record (with correctAnswer and explanation)
    const question = await db.question.findFirst({
      where: {
        id: params.questionId,
        chapterId: params.chapterId,
      },
    })

    if (!question) {
      return new NextResponse('Question not found', { status: 404 })
    }

    // Perform the server-side check
    const isCorrect = selectedOption === question.correctAnswer

    // Prepare the response payload
    const responsePayload: { isCorrect: boolean; explanation?: string } = { isCorrect }
    if (isCorrect && question.explanation) {
      responsePayload.explanation = question.explanation
    }

    // Update existing progress or create a new progress record
    const existingProgress = await db.userQuestionProgress.findUnique({
      where: {
        userId_questionId: {
          userId,
          questionId: params.questionId,
        },
      },
    })

    if (existingProgress) {
      const updatedProgress = await db.userQuestionProgress.update({
        where: { id: existingProgress.id },
        data: {
          // Only mark as correct if the current attempt is correct
          isCorrect: isCorrect === true ? true : existingProgress.isCorrect,
          attemptCount: { increment: 1 },
          lastAttemptAt: new Date(),
        },
      })

      return NextResponse.json({ progress: updatedProgress, ...responsePayload })
    } else {
      const progress = await db.userQuestionProgress.create({
        data: {
          userId,
          questionId: params.questionId,
          isCorrect: isCorrect === true,
          attemptCount: 1,
          lastAttemptAt: new Date(),
        },
      })

      return NextResponse.json({ progress, ...responsePayload })
    }
  } catch (error) {
    console.error('[QUESTION_PROGRESS]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
