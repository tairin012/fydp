'use client'

import { Chapter, Question } from '@prisma/client'

interface ChapterQuestionsFormProps {
  initialData: Chapter & { questions: Question[] }
}

export const ChapterQuestionsForm = ({ initialData }: ChapterQuestionsFormProps) => {
  return (
    <div className="mt-6 grid gap-4 rounded-md border bg-slate-100 p-4">
      <h1 className="text-2xl font-semibold text-gray-800">Chapter Questions</h1>
      {initialData.questions.map((question) => (
        <div key={question.id} className="transform rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">{question.question}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {question.options.map((option) => (
              <div
                key={option}
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  question.correctAnswer === option ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                }`}
              >
                {option}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">Appears at {question.time}</p>
        </div>
      ))}
    </div>
  )
}
