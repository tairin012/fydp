import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import TeacherCourseCard from '@/components/card/TeacherCourseCard'
import { db } from '@/lib/db'
import { FALLBACK_COURSE_IMAGE, chaptersLabel } from '@/lib/ui-helpers'

export default async function TeacherCourseOverview({ searchParams }: { searchParams: { title?: string } }) {
  const { userId } = auth()
  if (!userId) return redirect('/sign-in')

  const title = searchParams.title ?? ''
  const courses = await db.course.findMany({
    where: { createdById: userId, ...(title ? { title: { contains: title, mode: 'insensitive' } } : {}) },
    include: { chapters: { select: { id: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <>
      <h2 className="text-black text-3xl md:text-5xl p-8 font-bold border-b border-black capitalize">Course Overview</h2>

      <div className="container flex flex-col mt-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-black text-2xl md:text-4xl py-1 font-extrabold capitalize">Your Courses</h3>
            <h3 className="text-black text-sm md:text-2xl pb-6 font-extralight capitalize">
              Manage the courses you’re currently teaching
            </h3>
          </div>
          <Link href="/teacher/create" className="shrink-0 rounded-sm bg-[#1F5A75] px-4 py-2 text-white">
            New course
          </Link>
        </div>
        <div className="basis-2/3">
          <form className="w-1/2 p-1 rounded-sm flex items-center gap-x-3 border border-black">
            <Image src={"/icons/search.png"} alt="Search Icon" width={25} height={25} />
            <input
              type="text"
              name="title"
              defaultValue={title}
              className="focus:outline-none text-black placeholder:text-gray-600 placeholder:text-sm"
              placeholder="Search Course"
            />
          </form>

          {courses.length === 0 ? (
            <p className="mt-8 text-gray-600">No courses yet. Create your first one with “New course”.</p>
          ) : (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              {courses.map((course) => (
                <TeacherCourseCard
                  key={course.id}
                  imgPath={course.imageUrl ?? FALLBACK_COURSE_IMAGE}
                  heading={course.title}
                  badge={`${course.isPublished ? 'Published' : 'Draft'} · ${chaptersLabel(course.chapters.length)}`}
                  href={`/teacher/courses/${course.id}`}
                  actionLabel="Manage"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
