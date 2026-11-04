'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { CheckCircleIcon, LockIcon, PlayCircleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type CourseListProps = {
  course: {
    id: string
    chapters: {
      id: string
      title: string
      userProgress?: Array<{ isCompleted: boolean }>
    }[]
  }
  enrollment: {
    courseId: string
  } | null
}

function CourseList({ course, enrollment }: CourseListProps) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex w-full flex-col">
      {course.chapters.map((chapter, i) => {
        const isLocked =
          !enrollment || (course.chapters[i - 1] && !course.chapters[i - 1]?.userProgress?.[0]?.isCompleted)

        const isCompleted = !!chapter.userProgress?.[0]?.isCompleted

        const Icon = isLocked ? LockIcon : isCompleted ? CheckCircleIcon : PlayCircleIcon

        const isActive = pathname?.includes(chapter.id)

        const onClick = () => {
          if (isLocked) return
          router.push(`/courses/${course.id}/chapters/${chapter.id}`)
        }
        return (
          <button
            key={chapter.id}
            disabled={
              !enrollment || (course.chapters[i - 1] && !course.chapters[i - 1]?.userProgress?.[0]?.isCompleted)
            }
            onClick={onClick}
            type="button"
            className={cn(
              'flex items-center gap-x-2 pl-6 text-sm font-medium text-slate-500 transition-all hover:bg-slate-300/20 hover:text-slate-600',
              {
                'bg-slate-200/20 text-slate-700 hover:bg-slate-200/20 hover:text-slate-700': isActive,
                'text-emerald-700 hover:text-emerald-700': isCompleted,
                'bg-emerald-200/20 ': isCompleted && isActive,
              },
            )}
          >
            <div className="flex w-full items-center justify-between gap-x-2 py-4">
              {chapter.title}
              <Icon
                size={22}
                className={cn('text-slate-500', { 'text-slate-700': isActive, 'text-emerald-700': isCompleted })}
              />
            </div>

            <div
              className={cn('ml-auto h-full border-2 border-slate-700 opacity-0 transition-all', {
                'opacity-100': isActive,
                'border-emerald-700': isCompleted,
              })}
            />
          </button>
        )
      })}
    </div>
  )
}

export default CourseList
