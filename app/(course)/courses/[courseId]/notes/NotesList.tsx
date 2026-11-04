'use client'
import React from 'react'

type Chapter = {
  id: string
  title: string
  notes: {
    id: string
    content: string
  }[]
}

type NotesListProps = {
  courseData: {
    id: string
    title: string
    chapters: Chapter[]
  }
}

function NotesList({ courseData }: NotesListProps) {
  const [selectedChapter, setSelectedChapter] = React.useState<Chapter | null>(courseData.chapters[0] || null)
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-4 border-r-2 p-2 text-center md:col-span-1">
        {courseData.chapters.map((chapter) => (
          <button
            key={chapter.id}
            className={`mb-4 cursor-pointer rounded-md p-2 ${
              selectedChapter?.id === chapter.id ? 'bg-orange-200' : ''
            }`}
            onClick={() => setSelectedChapter(chapter)}
          >
            {chapter.title}
          </button>
        ))}
      </div>
      <div className="col-span-4 p-2 md:col-span-3">
        {selectedChapter && (
          <div>
            <h2 className="text-lg font-semibold">{selectedChapter.title}</h2>
            {selectedChapter?.notes?.map((note) => (
              <div key={note.id} className="mt-2 rounded-md border bg-gray-100 p-4">
                {note.content}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default NotesList
