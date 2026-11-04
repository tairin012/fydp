'use client'

import { useState } from 'react'

type RetryButtonProps = {
  userId: string
  chapterId: string
  allNextChapters: {
    id: string
    title: string
    description: string | null
    videoUrl: string | null
    position: number
    isPublished: boolean
    courseId: string
    createdAt: Date
    updatedAt: Date
  }[]
}

export const RetryButton = ({ userId, chapterId, allNextChapters }: RetryButtonProps) => {
  const allChapterIds = [chapterId, ...allNextChapters.map((chapter) => chapter.id)]
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = async () => {
    setIsRetrying(true)

    // Call the API to reset user progress (this is where you might want to trigger the reset)
    const response = await fetch('/api/reset-user-progress', {
      method: 'POST',
      body: JSON.stringify({ userId, allChapterIds }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      window.location.reload() // Reload to reset state and rewatch the video
    } else {
      console.error('Error resetting progress')
      setIsRetrying(false)
    }
  }

  return (
    <div className="mt-4">
      <button
        className="w-full rounded-md bg-blue-600 p-3 text-white hover:bg-blue-700"
        onClick={handleRetry}
        disabled={isRetrying}
      >
        {isRetrying ? 'Resetting...' : 'Reset Chapter'}
      </button>
    </div>
  )
}
