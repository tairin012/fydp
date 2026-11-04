'use server'

import { db } from '@/lib/db'

export async function hasUserAnsweredMoreThan50PercentCorrectly(
  userId: string,
  chapterId: string,
): Promise<{ canProceed: boolean; scorePercentage: number }> {
  try {
    // Fetch the questions for the chapter
    const questions = await db.question.findMany({
      where: { chapterId },
    })

    if (questions.length === 0) {
      console.log('No questions found for this chapter.')
      return { canProceed: true, scorePercentage: 0 }
    }

    // Count the total number of questions
    const totalQuestions = questions.length

    // Count the number of correct answers by the user
    const correctAnswers = await db.userQuestionProgress.count({
      where: {
        userId,
        questionId: {
          in: questions.map((question) => question.id),
        },
        isCorrect: true,
      },
    })

    // Calculate the score
    const score = correctAnswers

    // Check if the user has answered more than 50% of the questions correctly
    const hasAnswered = score > totalQuestions / 2

    return { canProceed: hasAnswered, scorePercentage: (score / totalQuestions) * 100 }
  } catch (error) {
    console.error('Error checking user answers:', error)
    return { canProceed: false, scorePercentage: 0 }
  }
}
