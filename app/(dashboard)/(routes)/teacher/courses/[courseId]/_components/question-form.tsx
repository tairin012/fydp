'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import { BiTrash } from 'react-icons/bi'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

/** Define the schema for a single question and its options */
const questionSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  options: z.array(z.string().min(1, 'Option is required')).min(2, 'At least two options are required'),
  correctAnswer: z.string().min(1, 'Correct answer is required'),
  explanation: z.string().optional(),
  time: z.string().min(1, 'Time is required'),
})

/** The form accepts an array of questions */
const formSchema = z.object({
  questions: z.array(questionSchema),
})

interface ChapterQuestionsFormProps {
  initialData?: Array<{
    id: string
    question: string
    options: string[]
    correctAnswer: string
    explanation: string | null
    time: string
  }>
  courseId: string
  chapterId: string
}

/** Nested component for managing the options for a given question */
interface OptionsFormProps {
  nestIndex: number
  control: any
}

const OptionsForm = ({ nestIndex, control }: OptionsFormProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${nestIndex}.options`,
  })

  return (
    <div className="space-y-2">
      {fields.map((field, k) => (
        <div key={field.id} className="flex items-center gap-x-2">
          <FormField
            control={control}
            name={`questions.${nestIndex}.options.${k}`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <input placeholder={`Option ${k + 1}`} className="input w-full rounded p-1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="destructive" type="button" onClick={() => remove(k)}>
            <BiTrash />
          </Button>
        </div>
      ))}
      <Button type="button" onClick={() => append('')}>
        Add Option
      </Button>
    </div>
  )
}

/** Main form component for chapter questions */
export const ChapterQuestionsForm = ({ initialData, courseId, chapterId }: ChapterQuestionsFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questions: initialData
        ? initialData.map((q) => ({
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation || '',
            time: q.time,
          }))
        : [],
    },
  })

  const {
    control,
    formState: { isSubmitting, isValid },
  } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // PATCH endpoint should be adapted to handle questions
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
      toast.success('Questions updated')
      toggleEdit()
      router.refresh()
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Chapter Questions
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Questions
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="mt-2 text-sm">
          {fields.length === 0 ? (
            'No questions added'
          ) : (
            <ul className="list-disc pl-4">
              {fields.map((question, index) => (
                <li key={question.id} className="mb-1">
                  <strong>Q{index + 1}:</strong> {question.question} (at {question.time})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 gap-1 space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-4 rounded-md border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-medium">Question {index + 1}</span>
                  <Button variant="destructive" onClick={() => remove(index)}>
                    <BiTrash />
                  </Button>
                </div>
                <FormField
                  control={control}
                  name={`questions.${index}.question`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input placeholder="Enter question" className="input w-full rounded p-1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`questions.${index}.time`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input placeholder="Time (e.g., 05:30)" className="input w-full rounded p-1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`questions.${index}.correctAnswer`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input placeholder="Correct answer" className="input w-full rounded p-1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`questions.${index}.explanation`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input placeholder="Explanation (optional)" className="input w-full rounded p-1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-4">
                  <span className="mb-2 block font-medium">Options</span>
                  <OptionsForm nestIndex={index} control={control} />
                </div>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                append({
                  question: '',
                  options: ['', ''], // start with 2 empty options
                  correctAnswer: '',
                  explanation: '',
                  time: '',
                })
              }
            >
              Add Question
            </Button>
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
