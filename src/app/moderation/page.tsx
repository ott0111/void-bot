'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { getGuildSettings, updateGuildSettings } from '@/lib/api'
import toast from 'react-hot-toast'
import { 
  Shield, 
  AlertTriangle, 
  Ban, 
  VolumeX,
  MessageSquare,
  Link,
  Users,
  Hash,
  Save
} from 'lucide-react'
import type { GuildSettings, ModerationSettings } from '@/types'

export default function ModerationPage() {
  const [settings, setSettings] = useState<ModerationSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const guildSettings = await getGuildSettings('987654321')
        setSettings(guildSettings.moderation)
      } catch (error) {
        console.error('Failed to load moderation settings:', error)
        toast.error('Failed to load settings')
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

  const handleSave = async () => {
    if (!settings) return

    setSaving(true)
    try {
      await updateGuildSettings('987654321', { moderation: settings })
      toast.success('Moderation settings saved successfully!')
    } catch (error) {
      console.error('Failed to save settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const updateSettings = (updates: Partial<ModerationSettings>) => {
    if (!settings) return
    setSettings({ ...settings, ...updates })
  }

  const updateAutoMod = (updates: Partial<ModerationSettings['autoMod']>) => {
    if (!settings) return
    setSettings({
      ...settings,
      autoMod: { ...settings.autoMod, ...updates }
    })
  }

  const updatePunishments = (updates: Partial<ModerationSettings['punishments']>) => {
    if (!settings) return
    setSettings({
      ...settings,
      punishments: { ...settings.punishments, ...updates }
    })
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-void-gray rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-void-gray rounded-xl"></div>
            <div className="h-96 bg-void-gray rounded-xl"></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!settings) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <AlertTriangle className="mx-auto text-red-400 mb-4" size={48} />
          <h2 className="text-2xl font-bold mb-2">Failed to load settings</h2>
          <p className="text-void-gray-light">Please try refreshing the page.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Moderation</h1>
            <p className="text-void-gray-light">
              Configure auto-moderation and punishment settings for your server.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary flex items-center gap-2"
          >
            <Save size={20} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Main Toggle */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-void-purple/20 rounded-lg">
                <Shield size={24} className="text-void-purple-light" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Enable Moderation</h2>
                <p className="text-void-gray-light">
                  Turn on moderation features for this server
                </p>
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.enabled}
                onChange={(e) => updateSettings({ enabled: e.target.checked })}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        {/* Auto-Moderation Settings */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle size={24} className="text-yellow-400" />
            <h2 className="text-xl font-semibold">Auto-Moderation</h2>
          </div>

          <div className="space-y-6">
            {/* Auto-Mod Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Enable Auto-Moderation</h3>
                <p className="text-sm text-void-gray-light">
                  Automatically moderate content based on rules
                </p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.autoMod.enabled}
                  onChange={(e) => updateAutoMod({ enabled: e.target.checked })}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            {/* Auto-Mod Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  key: 'antiSpam',
                  label: 'Anti-Spam',
                  description: 'Detect and prevent spam messages',
                  icon: MessageSquare,
                },
                {
                  key: 'antiLinks',
                  label: 'Anti-Links',
                  description: 'Block unwanted links and URLs',
                  icon: Link,
                },
                {
                  key: 'antiInvites',
                  label: 'Anti-Invites',
                  description: 'Block Discord server invites',
                  icon: Users,
                },
                {
                  key: 'antiCaps',
                  label: 'Anti-Caps',
                  description: 'Detect excessive capitalization',
                  icon: Hash,
                },
                {
                  key: 'antiSwear',
                  label: 'Anti-Swear',
                  description: 'Filter inappropriate language',
                  icon: Ban,
                },
              ].map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.key} className="flex items-center justify-between p-4 glass rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon size={20} className="text-void-purple-light" />
                      <div>
                        <h4 className="font-medium">{feature.label}</h4>
                        <p className="text-xs text-void-gray-light">{feature.description}</p>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.autoMod[feature.key as keyof typeof settings.autoMod] as boolean}
                        onChange={(e) => updateAutoMod({ 
                          [feature.key]: e.target.checked 
                        })}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                )
              })}
            </div>

            {/* Thresholds */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Warn Threshold
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={settings.autoMod.warnThreshold}
                  onChange={(e) => updateAutoMod({ 
                    warnThreshold: parseInt(e.target.value) || 3 
                  })}
                  className="input-field w-full"
                />
                <p className="text-xs text-void-gray-light mt-1">
                  Number of violations before warning
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Mute Duration (seconds)
                </label>
                <input
                  type="number"
                  min="60"
                  max="86400"
                  value={settings.autoMod.muteDuration}
                  onChange={(e) => updateAutoMod({ 
                    muteDuration: parseInt(e.target.value) || 300 
                  })}
                  className="input-field w-full"
                />
                <p className="text-xs text-void-gray-light mt-1">
                  Duration of automatic mute
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Punishment Settings */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Ban size={24} className="text-red-400" />
            <h2 className="text-xl font-semibold">Punishments</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                key: 'warn',
                label: 'Warning',
                description: 'Send a warning to the user',
                icon: AlertTriangle,
                color: 'text-yellow-400',
              },
              {
                key: 'mute',
                label: 'Mute',
                description: 'Temporarily mute the user',
                icon: VolumeX,
                color: 'text-orange-400',
              },
              {
                key: 'kick',
                label: 'Kick',
                description: 'Kick the user from the server',
                icon: Users,
                color: 'text-red-400',
              },
              {
                key: 'ban',
                label: 'Ban',
                description: 'Permanently ban the user',
                icon: Ban,
                color: 'text-red-600',
              },
            ].map((punishment) => {
              const Icon = punishment.icon
              return (
                <div key={punishment.key} className="flex items-center justify-between p-4 glass rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon size={20} className={punishment.color} />
                    <div>
                      <h4 className="font-medium">{punishment.label}</h4>
                      <p className="text-xs text-void-gray-light">{punishment.description}</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.punishments[punishment.key as keyof typeof settings.punishments] as boolean}
                      onChange={(e) => updatePunishments({ 
                        [punishment.key]: e.target.checked 
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              )
            })}
          </div>
        </div>

        {/* Info Card */}
        <div className="card border-l-4 border-void-purple">
          <div className="flex gap-4">
            <Shield size={24} className="text-void-purple-light flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Moderation Tips</h3>
              <ul className="text-sm text-void-gray-light space-y-1">
                <li>• Start with warnings and gradually increase punishments</li>
                <li>• Set reasonable thresholds to avoid false positives</li>
                <li>• Regularly review moderation logs to adjust settings</li>
                <li>• Consider your server size and activity level when configuring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
