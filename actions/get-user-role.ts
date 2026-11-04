'use server'

import { currentUser } from '@clerk/nextjs'

export const getUserRole = async () => {
  const user = await currentUser()
  return user?.privateMetadata?.role || 'student'
}

export const isTeacher = async () => {
  return (await getUserRole()) === 'teacher'
}
