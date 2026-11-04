import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Banner } from '@/components/banner'
import { Preview } from '@/components/preview'
import { VideoPlayer } from './_components/video-player'
import { getChapter } from '@/actions/get-chapter'
import CourseEnrollButton from './_components/course-enroll-button'
import { Separator } from '@/components/ui/separator'
import { db } from '@/lib/db'
import { RetryButton } from '@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/retry-button'
// import { isUserPermittedToAccessCourse } from '@/actions/get-course-permission'
import { isUserPermittedToAccessChapter } from '@/actions/get-chapter-permission'

import Notes from '@/app/(course)/courses/[courseId]/_components/notes'

export default async function ChapterDetails({ params }: { params: { courseId: string; chapterId: string } }) {
  const { userId } = auth()
  if (!userId) {
    return redirect('/')
  }

  const { chapter, course, muxData, attachments, nextChapter, userProgress, enrollment, allNextChapters } =
    await getChapter({
      userId,
      ...params,
    })

  if (!chapter || !course) {
    return redirect('/')
  }

  // if (!(await isUserPermittedToAccessCourse(userId, params.courseId))) {
  //   return redirect('/dashboard')
  // }

  if (!(await isUserPermittedToAccessChapter(userId, params.chapterId, params.courseId))) {
    return redirect('/courses/' + params.courseId)
  }

  const isLocked = !enrollment
  const completedOnEnd = !!enrollment && !userProgress?.isCompleted

  // Calculate score if the chapter is completed
  let score = 0
  let totalQuestions = 0
  if (userProgress?.isCompleted) {
    // Assuming you have a way to check correct answers (from userQuestionProgress)
    const correctAnswers = await db.userQuestionProgress.count({
      where: {
        userId,
        question: {
          chapterId: chapter.id,
        },
        isCorrect: true,
      },
    })
    score = correctAnswers

    // Count total questions
    totalQuestions = await db.question.count({
      where: {
        chapterId: chapter.id,
      },
    })
  }

  const notes = [
    {
      id: '1',
      title: 'Note 1',
      content: 'This is the content of note 1',
    },
    {
      id: '2',
      title: 'Note 2',
      content: 'This is the content of note 2',
    },
    {
      id: '3',
      title: 'Note 3',
      content: 'This is the content of note 3',
    },
  ]

  return (
    <div>
      {userProgress?.isCompleted ? <Banner label="You already completed this chapter" variant="success" /> : null}
      {isLocked ? <Banner label="You need to enroll in this course to watch this chapter" /> : null}

      <div className="mx-auto flex max-w-6xl flex-col pb-20">
        {!isLocked && (
          <div className="flex items-center justify-between p-4">
            {userProgress?.isCompleted && totalQuestions > 0 && (
              <div className="mt-4 p-4">
                <h3 className="text-xl font-semibold">Your Score</h3>
                <p className="text-lg">
                  {score} / {totalQuestions} (Score: {Math.round((score / totalQuestions) * 100)}%)
                </p>
              </div>
            )}

            <RetryButton userId={userId} chapterId={params.chapterId} allNextChapters={allNextChapters} />
          </div>
        )}
        <div className="p-4">
          <VideoPlayer
            chapterId={chapter.id}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completedOnEnd}
            questions={chapter.questions}
            userId={userId}
          />
        </div>

        <div>
          <div className="flex flex-col items-center justify-between p-4 md:flex-row">
            <h2 className="mb-2 text-2xl font-semibold">{chapter.title}</h2>
            {/* {enrollment ? ( */}
            {/*   <CourseProgressButton */}
            {/*     chapterId={params.chapterId} */}
            {/*     courseId={params.courseId} */}
            {/*     nextChapterId={nextChapter?.id} */}
            {/*     isCompleted={!!userProgress?.isCompleted} */}
            {/*   /> */}
            {/* ) : ( */}
            {/*   <CourseEnrollButton courseId={params.courseId} /> */}
            {/* )} */}

            {!enrollment && <CourseEnrollButton courseId={params.courseId} />}
          </div>

          <Separator />

          <div>
            <Preview value={chapter.description!} />
          </div>

          {attachments.length ? (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    className="flex w-full items-center rounded-md border bg-sky-200 p-3 text-sky-700 hover:underline"
                    key={attachment.id}
                    target="_blank"
                    href={attachment.url}
                    rel="noreferrer"
                  >
                    {attachment.name}
                  </a>
                ))}
              </div>
            </>
          ) : null}
        </div>

        {!isLocked && <Notes notes={notes} />}
      </div>
    </div>
  )
}
