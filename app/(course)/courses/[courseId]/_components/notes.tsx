'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

type NotesProps = {
  notes: {
    id: string
    title: string
    content: string
  }[]
}

function Notes({ notes }: NotesProps) {
  const [allNotes, setAllNotes] = useState(notes)
  const [newNote, setNewNote] = useState({ title: '', content: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewNote((prev) => ({ ...prev, [name]: value }))
  }
  return (
    <div className="grid grid-cols-5 gap-2 p-4">
      <div className="col-span-5 max-h-fit rounded-md border-2 p-2 md:col-span-3">
        <Input
          className="w-full"
          type="text"
          placeholder="Note Title"
          name="title"
          value={newNote.title}
          onChange={handleInputChange}
        />
        <Textarea
          className="mt-2 w-full"
          placeholder="Type your notes here..."
          rows={4}
          name="content"
          value={newNote.content}
          onChange={handleInputChange}
        />
        <Button
          className="mt-2"
          variant="default"
          type="submit"
          onClick={() => {
            setAllNotes((prev) => [...prev, { id: Date.now().toString(), ...newNote }])
            setNewNote({ title: '', content: '' })
          }}
        >
          Save
        </Button>
      </div>
      <div className="col-span-5 rounded-md border-2 p-2 md:col-span-2">
        <h3 className="text-lg font-semibold">Your Notes</h3>
        <div className="mt-2 flex flex-col gap-2">
          {allNotes.map((note) => (
            <div key={note.id} className="rounded-md border p-2">
              <h4 className="text-md font-semibold">{note.title}</h4>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Notes
