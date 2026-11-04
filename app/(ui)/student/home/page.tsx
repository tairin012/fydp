import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { getCourses } from '@/actions/get-courses'
import { getDashboardCourses } from '@/actions/get-dashboard-courses'
import StudentBlogCard from '@/components/card/StudentBlogCard'
import StudentCourseCard from '@/components/card/StudentCourseCard'
import { FALLBACK_COURSE_IMAGE, chaptersLabel } from '@/lib/ui-helpers'

export default async function StudentHome({ searchParams }: { searchParams: { title?: string } }) {
  const { userId } = auth()
  if (!userId) return redirect('/sign-in')

  const title = searchParams.title ?? ''
  const [courses, { coursesInProgress }] = await Promise.all([
    getCourses({ userId, title: title || undefined }),
    getDashboardCourses(userId),
  ])

  return (
    <>
      <h2 className="text-black text-5xl p-8 font-bold border-b border-black capitalize">Course Overview</h2>

      <div className="container mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        {/* Left Side */}
        <div className="lg:basis-2/3 lg:border-r border-gray-300 lg:pr-8">
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

          {/* Course Cards */}
          {courses.length === 0 ? (
            <p className="mt-6 text-gray-600">No courses found.</p>
          ) : (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
              {courses.map((course) => (
                <div key={course.id} className="col-span-2">
                  <StudentCourseCard
                    imgPath={course.imageUrl ?? FALLBACK_COURSE_IMAGE}
                    heading={course.title}
                    badge={chaptersLabel(course.chapters.length)}
                    href={`/courses/${course.id}`}
                    actionLabel={course.progress === null ? 'Start' : 'Continue'}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-y-5 lg:basis-1/3">
          <div className="text-gray-700">
            <h1 className="font-bold">Continue learning</h1>
          </div>
          <div className="flex flex-col gap-y-5">
            {coursesInProgress.length === 0 ? (
              <p className="text-sm text-gray-600">Courses you start will show up here.</p>
            ) : (
              coursesInProgress.slice(0, 3).map((course) => (
                <StudentBlogCard
                  key={course.id}
                  imgPath={course.imageUrl ?? FALLBACK_COURSE_IMAGE}
                  heading={course.title}
                  courseCode={chaptersLabel(course.chapters.length)}
                  href={`/courses/${course.id}`}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="h-20" />
    </>
  )
}
