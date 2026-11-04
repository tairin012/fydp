'use client'

import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'
import Link from 'next/link'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { getUserRole } from '@/actions/get-user-role'

export const NavbarRoutes = () => {
  const [isTeacher, setIsTeacher] = useState(false)

  useEffect(() => {
    const checkUserRole = async () => {
      const role = await getUserRole()
      setIsTeacher(role === 'teacher')
    }

    checkUserRole()
  }, [])

  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith('/teacher')
  const isCoursePage = pathname?.includes('/courses')

  return (
    <div className="ml-auto flex gap-x-2">
      {isTeacherPage || isCoursePage ? (
        <Link href="/dashboard">
          <Button size="sm" variant="ghost">
            <LogOut className="mr-2 h-4 w-4" />
            Exit
          </Button>
        </Link>
      ) : isTeacher ? (
        <Link href="/teacher/courses">
          <Button size="sm" variant="ghost">
            Teacher mode
          </Button>
        </Link>
      ) : null}
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
