'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Book, GraduationCap, Users } from 'lucide-react'
import { Poppins } from 'next/font/google'
import { UserButton, useUser } from '@clerk/nextjs'

// Import Poppins with desired weights and subsets.
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export default function Home() {
  const { user } = useUser()
  return (
    <div className={`${poppins.className} flex min-h-screen flex-col justify-center bg-gray-50`}>
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white px-32 shadow-md">
        <div className="mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" height={500} width={500} className="h-16 w-16" />
            <span className="text-4xl font-bold text-gray-800">uiuX</span>
          </div>

          {user && (
            <nav className="hidden space-x-6 md:block">
              <Link
                href="/search"
                className="text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-blue-900"
              >
                All Courses
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-blue-900"
              >
                Dashboard
              </Link>
              <Link
                href="/teacher/courses"
                className="text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-blue-900"
              >
                Teacher&apos;s Dashboard
              </Link>
            </nav>
          )}

          <div>
            {user ? (
              <UserButton />
            ) : (
              <Link
                className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 transition-colors duration-300 hover:bg-blue-200"
                href={'/sign-in'}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center">
        {/* Hero Section */}
        <section className="relative h-[600px] w-full">
          <Image src="/hero.png" alt="University Campus" fill className="object-cover brightness-50" priority />
          <div className="container relative flex h-full flex-col justify-center px-32 text-white">
            <h1 className="max-w-2xl text-5xl font-bold leading-tight drop-shadow-md">
              Success is walking from failure to failure
            </h1>
            <p className="mt-4 max-w-xl text-lg drop-shadow-sm">
              &quot;Concentrate all your thoughts upon the work in hand. The sun&apos;s rays do not burn until brought
              to a focus.&quot; - Alexander Graham Bell
            </p>
          </div>
        </section>

        {/* University Info Grid */}
        <section className="my-10 flex w-full items-center justify-center gap-10 px-32">
          <div className="flex w-3/5 items-center justify-center gap-4">
            <div className="w-full space-y-4">
              <Image
                src="/grid1.png"
                alt="Classroom"
                width={400}
                height={400}
                className="aspect-square w-full rounded-lg object-cover shadow-lg transition-transform duration-300 hover:scale-105"
              />

              <Image
                src="/grid2.png"
                alt="Library"
                width={400}
                height={400}
                className="aspect-square w-full rounded-lg object-cover shadow-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="w-full space-y-4">
              <Image
                src="/grid3.png"
                alt="Graduation"
                width={400}
                height={400}
                className="aspect-square w-full rounded-lg object-cover shadow-lg transition-transform duration-300 hover:scale-105"
              />
              <Image
                src="/grid4.png"
                alt="Campus Life"
                width={400}
                height={400}
                className="aspect-square w-full rounded-lg object-cover shadow-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
          <div className="flex w-2/5 flex-col items-center justify-center space-y-4 px-10">
            <h2 className="py-5 text-6xl font-bold text-blue-900">United International University</h2>
            <p className="text-2xl text-gray-600">
              United International University (UIU) is acclaimed for its educational quality, boasting notable rankings
              and recognitions in higher education, reflecting its commitment to excellence and research excellence on
              both a national and global scale.
            </p>
          </div>
        </section>

        {/* Goal Section */}
        <section className="h-[580px] w-full px-32 py-10">
          <div className="flex h-full w-full overflow-hidden rounded-lg shadow-lg">
            <div className="flex h-full w-1/2 items-center justify-center bg-[#125386]">
              <h2 className="mx-10 w-full text-6xl font-bold text-white">You set the goal. We will mark the path.</h2>
            </div>
            <div className="flex h-full w-1/2 items-center justify-center bg-[#D9D9D9]">
              <p className="mx-10 w-full text-base text-black">
                &quot;Embark on a journey to redefine your career with expert guidance, cutting edge skills, and
                personalized opportunities that open doors to success.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Platform Section */}
        <section className="relative my-10 w-full bg-gradient-to-br from-[#125386] to-[#BADFF2] px-32">
          <Image
            src="/student.png"
            alt="Student"
            fill
            className="absolute !-top-[50px] !left-0 bottom-0 !h-[650px] !w-auto"
          />

          <div className="flex h-full w-full overflow-hidden rounded-lg">
            <div className="relative h-[600px] w-1/2">{/* Intentionally left blank */}</div>
            <div className="flex w-1/2 flex-col justify-center space-y-4 p-8">
              <h2 className="text-5xl font-bold text-white drop-shadow-md">
                An engaging platform designed to guide you every step of the way.
              </h2>
              <p className="text-xl text-blue-100 drop-shadow-sm">
                Dive into course materials, test your knowledge with quizzes, and watch your progress soar.
              </p>
              <p className="text-xl text-blue-100 drop-shadow-sm">Track Your Academic Journey with Us.</p>
              <Link
                href="#"
                className="inline-flex w-fit items-center rounded-md bg-red-600 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-red-700"
              >
                Log In
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="my-10 w-full px-32">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div className="space-y-2">
              <Book className="mx-auto h-12 w-12 text-blue-900" />
              <h3 className="text-3xl font-bold">17+</h3>
              <p className="text-gray-600">Course</p>
            </div>
            <div className="space-y-2">
              <GraduationCap className="mx-auto h-12 w-12 text-blue-900" />
              <h3 className="text-3xl font-bold">20+</h3>
              <p className="text-gray-600">Quiz</p>
            </div>
            <div className="space-y-2">
              <Users className="mx-auto h-12 w-12 text-blue-900" />
              <h3 className="text-3xl font-bold">20+</h3>
              <p className="text-gray-600">Students</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="logo" height={500} width={500} className="h-16 w-16" />
                <span className="text-xl font-bold text-white">United International University</span>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Service</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="transition-colors duration-300 hover:text-white">
                    Registration
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors duration-300 hover:text-white">
                    Mobile Design
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors duration-300 hover:text-white">
                    Development
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors duration-300 hover:text-white">
                    SEO
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Get in Touch</h3>
              <ul className="space-y-2">
                <li>United City, Madani Ave</li>
                <li>info@uiu.com</li>
                <li>+1 234 567 890</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Newsletter</h3>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full rounded-md bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
