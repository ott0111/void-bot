'use client'

import { ReactNode } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-void-black">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col lg:ml-0">
          <TopBar />
          <main className="flex-1 p-6 overflow-y-auto scrollbar-thin">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
