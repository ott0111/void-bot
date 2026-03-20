'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { getDashboardStats } from '@/lib/api'
import { formatNumber } from '@/lib/utils'
import { 
  Users, 
  MessageSquare, 
  Zap, 
  TrendingUp,
  Play,
  HelpCircle,
  Coins,
  Shield,
  Ban
} from 'lucide-react'
import type { DashboardStats } from '@/types'

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats('987654321') // Mock server ID
        setStats(data)
      } catch (error) {
        console.error('Failed to load dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  const statCards = [
    {
      title: 'Total Members',
      value: stats?.totalMembers || 0,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      title: 'Active Members',
      value: stats?.activeMembers || 0,
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      title: 'Messages Today',
      value: stats?.messagesToday || 0,
      icon: MessageSquare,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
    {
      title: 'Commands Used',
      value: stats?.commandsUsed || 0,
      icon: Zap,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
    },
  ]

  const commandIcons: Record<string, any> = {
    play: Play,
    help: HelpCircle,
    balance: Coins,
    ban: Ban,
    kick: Shield,
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-void-gray rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-void-gray rounded-xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-void-gray rounded-xl"></div>
            <div className="h-96 bg-void-gray rounded-xl"></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-void-gray-light">
            Welcome back! Here's what's happening in your server.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => {
            const Icon = card.icon
            return (
              <div key={index} className="stat-card">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${card.bgColor}`}>
                    <Icon size={24} className={card.color} />
                  </div>
                  <div className="text-2xl font-bold gradient-text">
                    {formatNumber(card.value)}
                  </div>
                </div>
                <h3 className="text-void-gray-light">{card.title}</h3>
              </div>
            )
          })}
        </div>

        {/* Charts and Top Commands */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Member Growth Chart */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Member Growth</h2>
            <div className="h-64 flex items-end justify-between gap-2">
              {stats?.memberGrowth.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gradient-to-t from-void-purple to-void-purple-light rounded-t-lg transition-all duration-300 hover:opacity-80"
                    style={{ 
                      height: `${(data.count / 16000) * 100}%`,
                      minHeight: '20px'
                    }}
                  />
                  <span className="text-xs text-void-gray-light">
                    {new Date(data.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Commands */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Top Commands</h2>
            <div className="space-y-4">
              {stats?.topCommands.map((command, index) => {
                const Icon = commandIcons[command.name] || HelpCircle
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-void-purple/20 rounded-lg">
                        <Icon size={16} className="text-void-purple-light" />
                      </div>
                      <span className="font-medium capitalize">{command.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-void-gray-light">
                        {formatNumber(command.uses)} uses
                      </div>
                      <div className="w-24 bg-void-gray rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-void-purple to-void-purple-light h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(command.uses / 5000) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'New member joined', user: 'User#1234', time: '2 minutes ago', color: 'text-green-400' },
              { action: 'Music playlist created', user: 'MusicFan#5678', time: '15 minutes ago', color: 'text-purple-400' },
              { action: 'Command executed: !help', user: 'NewUser#9012', time: '1 hour ago', color: 'text-blue-400' },
              { action: 'User warned for spam', user: 'Moderator#3456', time: '2 hours ago', color: 'text-yellow-400' },
              { action: 'Server settings updated', user: 'Admin#7890', time: '3 hours ago', color: 'text-gray-400' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-void-gray/20 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${activity.color.replace('text', 'bg')}`} />
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-void-gray-light">by {activity.user}</p>
                  </div>
                </div>
                <span className="text-sm text-void-gray-light">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Moderation', description: 'Manage moderation settings', href: '/moderation', icon: Shield },
            { title: 'Music', description: 'Configure music player', href: '/music', icon: Play },
            { title: 'Welcome', description: 'Set up welcome messages', href: '/welcome', icon: MessageSquare },
            { title: 'Commands', description: 'Manage custom commands', href: '/commands', icon: HelpCircle },
          ].map((action, index) => {
            const Icon = action.icon
            return (
              <a
                key={index}
                href={action.href}
                className="card p-6 hover:scale-105 transition-transform duration-200 cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-void-purple/20 rounded-lg group-hover:bg-void-purple/30 transition-colors">
                    <Icon size={20} className="text-void-purple-light" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-sm text-void-gray-light">{action.description}</p>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
