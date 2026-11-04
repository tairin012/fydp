'use client'

import axios from 'axios'
import MuxPlayer from '@mux/mux-player-react'
import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Loader2, Lock } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useConfettiStore } from '@/hooks/use-confetti'
import { hasUserAnsweredMoreThan50PercentCorrectly } from '@/actions/get-answer-stats'

interface Question {
  id: string
  question: string
  options: string[]
  time: string // Format: "MM:SS" or seconds as string
}

interface AnswerResult {
  isCorrect: boolean
  explanation?: string
}

interface VideoPlayerProps {
  playbackId: string
  courseId: string
  chapterId: string
  nextChapterId?: string
  isLocked: boolean
  completeOnEnd: boolean
  title: string
  questions?: Question[]
  userId: string
}

export const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
  questions = [],
  userId,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [answerResult, setAnswerResult] = useState<AnswerResult | null>(null)
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, boolean>>({})
  const [unlockTime, setUnlockTime] = useState(0) // Track the minimum allowed time

  const playerRef = useRef<any>(null)
  const router = useRouter()
  const confetti = useConfettiStore()

  // Convert time format (MM:SS or seconds) to seconds
  const timeToSeconds = (time: string): number => {
    if (time.includes(':')) {
      const [minutes, seconds] = time.split(':').map(Number)
      return minutes * 60 + seconds
    }
    return parseInt(time, 10)
  }

  useEffect(() => {
    updateUnlockTime()
  }, [answeredQuestions])

  // Check for questions that should appear at current time
  useEffect(() => {
    if (!isPlaying || !questions.length) return

    const checkForQuestions = () => {
      // Don't show questions that have already been answered
      const unansweredQuestions = questions.filter((q) => !answeredQuestions[q.id])

      for (const question of unansweredQuestions) {
        const questionTime = timeToSeconds(question.time)
        // Show question if we're within 2 seconds of the target time
        if (Math.abs(currentTime - questionTime) < 2 && !activeQuestion) {
          setActiveQuestion(question)
          if (playerRef.current) {
            playerRef.current.pause()
            setIsPlaying(false)
          }
          break
        }
      }
    }

    checkForQuestions()
  }, [currentTime, isPlaying, questions, activeQuestion, answeredQuestions])

  // Handle the time update
  const handleTimeUpdate = (event: any) => {
    const newTime = Math.floor(event.target.currentTime)
    setCurrentTime(newTime)
  }

  // Prevent skipping beyond the unlockable time
  const handleSeek = (event: any) => {
    const seekTime = Math.floor(event.target.currentTime)
    // Only restrict forward seeking if unlockTime is set (> 0)
    if (unlockTime > 0 && seekTime > unlockTime) {
      event.preventDefault()
      // Reset current time back to the unlockTime
      playerRef.current.currentTime = unlockTime
    }
  }

  // Set the unlock time after answering a question
  const updateUnlockTime = () => {
    const unansweredQuestions = questions.filter((q) => !answeredQuestions[q.id])
    if (unansweredQuestions.length === 0) {
      // If all questions are answered, allow full playback
      setUnlockTime(0)
    } else {
      // Set unlock time to the next unanswered question's time
      const nextUnlockTime = timeToSeconds(unansweredQuestions[0].time)
      setUnlockTime(nextUnlockTime)
    }
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const submitAnswer = async () => {
    if (!activeQuestion || !selectedOption) return

    try {
      const response = await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/questions/${activeQuestion.id}/progress`,
        { selectedOption },
      )

      const { isCorrect, explanation } = response.data
      setAnswerResult({ isCorrect, explanation })

      if (isCorrect) {
        toast.success('Correct answer!')
      } else {
        toast.error('Incorrect answer')
      }

      setAnsweredQuestions({
        ...answeredQuestions,
        [activeQuestion.id]: true,
      })

      if (isCorrect && explanation) {
        setTimeout(() => {
          continueVideo()
        }, 5000)
      }
    } catch (error) {
      toast.error('Failed to submit answer')
      console.error('Error submitting answer:', error)
    }
  }

  const continueVideo = () => {
    setActiveQuestion(null)
    setSelectedOption(null)
    setAnswerResult(null)
    if (playerRef.current) {
      playerRef.current.play()
      setIsPlaying(true)
    }
  }

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        const { canProceed, scorePercentage } = await hasUserAnsweredMoreThan50PercentCorrectly(userId, chapterId)

        console.log('Can proceed:', canProceed)

        if (!canProceed) {
          toast.error(
            'You need to answer more than 50% of the questions correctly to proceed. Your score: ' +
              scorePercentage +
              '%',
          )
          router.refresh()
        } else {
          await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
            isCompleted: true,
          })

          if (!nextChapterId) {
            confetti.onOpen()
          }

          toast.success('Progress updated')
          router.refresh()

          if (nextChapterId) {
            router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
          }
        }
      }
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-2 bg-slate-800 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          ref={playerRef}
          title={title}
          className={cn(!isReady && 'hidden')}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          onTimeUpdate={handleTimeUpdate}
          onSeeking={handleSeek} // Use onSeeking if available
          onPlay={handlePlay}
          onPause={handlePause}
          autoPlay
          playbackId={playbackId}
        />
      )}

      {/* Question popup */}
      {activeQuestion && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
          <div className="w-3/4 max-w-2xl rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-bold">{activeQuestion.question}</h3>

            {!answerResult ? (
              <>
                <div className="mb-6 space-y-3">
                  {activeQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className={cn(
                        'cursor-pointer rounded-md border p-3 hover:bg-gray-50',
                        selectedOption === option && 'border-blue-500 bg-blue-50',
                      )}
                      onClick={() => setSelectedOption(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={submitAnswer}
                    disabled={!selectedOption}
                    className={cn(
                      'rounded-md px-4 py-2',
                      selectedOption
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'cursor-not-allowed bg-gray-300 text-gray-600',
                    )}
                  >
                    Submit Answer
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div
                  className={cn(
                    'rounded-md p-4',
                    answerResult.isCorrect
                      ? 'border border-green-300 bg-green-100'
                      : 'border border-red-300 bg-red-100',
                  )}
                >
                  <p className="font-semibold">{answerResult.isCorrect ? 'Correct!' : 'Incorrect answer'}</p>
                  {answerResult.isCorrect && answerResult.explanation && (
                    <p className="mt-2">{answerResult.explanation}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={continueVideo}
                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
