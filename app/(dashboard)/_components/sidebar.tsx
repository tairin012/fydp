'use client'
import Logo from './logo'
import { SidebarRoutes } from './sidebar-routes'

const Sidebar = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-white shadow-sm">
      <div className="p-3">
        <Logo />
      </div>
      <div className="flex w-full flex-col">
        <SidebarRoutes setIsOpen={setIsOpen} />
      </div>
    </div>
  )
}

export default Sidebar
