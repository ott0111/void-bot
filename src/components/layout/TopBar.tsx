'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, LogOut, User, Crown } from 'lucide-react'
import { getAvatarUrl } from '@/lib/utils'
import { getCurrentUser, getUserServers } from '@/lib/api'
import type { User as UserType, Server } from '@/types'

export default function TopBar() {
  const [user, setUser] = useState<UserType | null>(null)
  const [servers, setServers] = useState<Server[]>([])
  const [selectedServer, setSelectedServer] = useState<Server | null>(null)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isServerDropdownOpen, setIsServerDropdownOpen] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userData, serversData] = await Promise.all([
          getCurrentUser(),
          getUserServers(),
        ])
        setUser(userData)
        setServers(serversData)
        setSelectedServer(serversData[0])
      } catch (error) {
        console.error('Failed to load user data:', error)
      }
    }

    loadData()
  }, [])

  const handleServerChange = (server: Server) => {
    setSelectedServer(server)
    setIsServerDropdownOpen(false)
    // In a real app, this would trigger a page reload or state update
    window.location.href = `/dashboard?server=${server.id}`
  }

  const handleLogout = () => {
    // In a real app, this would clear auth state and redirect to login
    window.location.href = '/'
  }

  return (
    <header className="glass border-b border-void-gray/20 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Server Selector */}
        <div className="relative">
          <button
            onClick={() => setIsServerDropdownOpen(!isServerDropdownOpen)}
            className="flex items-center gap-3 px-4 py-2 glass rounded-lg hover:bg-void-gray/20 transition-all duration-200"
          >
            {selectedServer && (
              <>
                <div className="w-8 h-8 bg-void-purple rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {selectedServer.name.charAt(0)}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-medium">{selectedServer.name}</p>
                  <p className="text-xs text-void-gray-light">
                    {selectedServer.memberCount.toLocaleString()} members
                  </p>
                </div>
                {selectedServer.isPremium && (
                  <Crown size={16} className="text-yellow-400" />
                )}
              </>
            )}
            <ChevronDown size={20} />
          </button>

          {isServerDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-80 glass rounded-lg shadow-xl border border-void-gray/20 z-50">
              <div className="p-2 max-h-96 overflow-y-auto scrollbar-thin">
                {servers.map((server) => (
                  <button
                    key={server.id}
                    onClick={() => handleServerChange(server)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-void-gray/20 transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-void-purple rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {server.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{server.name}</p>
                      <p className="text-xs text-void-gray-light">
                        {server.memberCount.toLocaleString()} members
                      </p>
                    </div>
                    {server.isPremium && (
                      <Crown size={16} className="text-yellow-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="flex items-center gap-3 px-4 py-2 glass rounded-lg hover:bg-void-gray/20 transition-all duration-200"
          >
            {user && (
              <>
                <div className="w-8 h-8 bg-void-purple rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <div className="text-left">
                  <p className="font-medium">{user.username}</p>
                  <p className="text-xs text-void-gray-light">
                    {user.isPremium ? 'Premium' : 'Free'}
                  </p>
                </div>
              </>
            )}
            <ChevronDown size={20} />
          </button>

          {isUserDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 glass rounded-lg shadow-xl border border-void-gray/20 z-50">
              <div className="p-4 border-b border-void-gray/20">
                {user && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-void-purple rounded-full flex items-center justify-center">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-medium">{user.username}</p>
                      <p className="text-xs text-void-gray-light">{user.email}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-void-gray/20 transition-all duration-200 text-red-400"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
