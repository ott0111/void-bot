'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Shield, 
  Lock, 
  Music, 
  Mail, 
  FileText, 
  Terminal, 
  Coins, 
  Settings,
  Menu,
  X
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Moderation', href: '/moderation', icon: Shield },
  { name: 'Security', href: '/security', icon: Lock },
  { name: 'Music', href: '/music', icon: Music },
  { name: 'Welcome', href: '/welcome', icon: Mail },
  { name: 'Logs', href: '/logs', icon: FileText },
  { name: 'Commands', href: '/commands', icon: Terminal },
  { name: 'Economy', href: '/economy', icon: Coins },
  { name: 'Settings', href: '/settings', icon: Settings },
]

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className = '' }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 glass rounded-lg"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 glass border-r border-void-gray/20
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${className}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-void-gray/20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-void-purple rounded-lg flex items-center justify-center glow-purple">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Void Bot</h1>
                <p className="text-xs text-void-gray-light">Dashboard</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`sidebar-item ${isActive(item.href) ? 'active' : ''}`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-void-gray/20">
            <div className="text-center">
              <p className="text-xs text-void-gray-light">
                © 2024 Void Bot
              </p>
              <p className="text-xs text-void-gray-light mt-1">
                Premium Dashboard
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
