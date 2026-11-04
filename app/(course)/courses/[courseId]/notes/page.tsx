import React from 'react'
import { db } from '@/lib/db'
import NotesList from '@/app/(course)/courses/[courseId]/notes/NotesList'

export default async function NotesPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params

  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        where: { isPublished: true },
      },
    },
  })

  if (!course) {
    return <div>Course not found</div>
  }

  const courseData = {
    id: courseId,
    title: course.title,
    chapters:
      course.chapters.map((chapter) => ({
        id: chapter.id,
        title: chapter.title,
        notes: [
          { id: 'note1', content: 'Note 1 content from chapter - ' + chapter.title },
          { id: 'note2', content: 'Note 2 content from chapter - ' + chapter.title },
        ],
      })) || [],
  }

  return (
    <div className="mx-auto mt-5 flex h-full w-full max-w-4xl flex-col gap-4">
      <NotesList courseData={courseData} />
    </div>
  )
}
