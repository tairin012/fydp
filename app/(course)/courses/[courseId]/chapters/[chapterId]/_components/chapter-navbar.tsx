'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type ChapterNavbarProps = {
  courseId: string
}

function ChapterNavbar({ courseId }: ChapterNavbarProps) {
  const pathname = usePathname()

  const routes = [
    { label: 'Course', path: '/course' },
    { label: 'Progress', path: '/progress' },
    { label: 'Notes', path: '/notes' },
    { label: 'Time', path: '/time' },
    { label: 'Grade', path: '/grade' },
  ]

  return (
    <div className="flex justify-center gap-2 border-b bg-white p-2 shadow-sm">
      {routes.map((route) => {
        const isActive = pathname?.endsWith(route.path) || pathname?.endsWith(`${route.path}/`)
        return (
          <Link key={route.label} href={`/courses/${courseId}${route.path}`}>
            <Button
              variant={isActive ? 'outline' : 'ghost'}
              className={`px-4 py-2 text-sm font-medium transition-all ${isActive ? 'text-orange-500' : ''}`}
            >
              {route.label}
            </Button>
          </Link>
        )
      })}
    </div>
  )
}

export default ChapterNavbar
