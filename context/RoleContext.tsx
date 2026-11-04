'use client'
import { ReactNode, createContext, useState } from 'react'

type Role = 'student' | 'teacher'

interface RoleContextProps {
  role: Role
  setRole: (role: Role) => void
  /** true only for real teachers: they may preview the student menu. Students can never switch. */
  canSwitch: boolean
}

interface RoleProviderProps {
  children: ReactNode
  /** Real role from the server (Clerk metadata). */
  initialRole?: Role
}

export const RoleContext = createContext<RoleContextProps>({
  role: 'student',
  setRole: () => {},
  canSwitch: false,
})

const RoleProvider = ({ children, initialRole = 'student' }: RoleProviderProps) => {
  const [role, setRole] = useState<Role>(initialRole)

  return <RoleContext.Provider value={{ role, setRole, canSwitch: initialRole === 'teacher' }}>{children}</RoleContext.Provider>
}

export default RoleProvider
