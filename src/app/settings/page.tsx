'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { getGuildSettings, updateGuildSettings } from '@/lib/api'
import toast from 'react-hot-toast'
import { 
  Settings as SettingsIcon, 
  Save, 
  Bot, 
  Globe, 
  Clock,
  Palette,
  Gamepad2
} from 'lucide-react'
import type { GuildSettings, GeneralSettings } from '@/types'

export default function SettingsPage() {
  const [settings, setSettings] = useState<GeneralSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const guildSettings = await getGuildSettings('987654321')
        setSettings(guildSettings.general)
      } catch (error) {
        console.error('Failed to load settings:', error)
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
      await updateGuildSettings('987654321', { general: settings })
      toast.success('Settings saved successfully!')
    } catch (error) {
      console.error('Failed to save settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const updateSettings = (updates: Partial<GeneralSettings>) => {
    if (!settings) return
    setSettings({ ...settings, ...updates })
  }

  const updateActivity = (updates: Partial<GeneralSettings['activity']>) => {
    if (!settings) return
    setSettings({
      ...settings,
      activity: { ...settings.activity, ...updates }
    })
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-void-gray rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <SettingsIcon className="mx-auto text-red-400 mb-4" size={48} />
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
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-void-gray-light">
              Configure general bot settings and preferences.
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

        {/* Basic Settings */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon size={24} className="text-void-purple-light" />
            <h2 className="text-xl font-semibold">Basic Settings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Command Prefix */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Command Prefix
              </label>
              <input
                type="text"
                value={settings.prefix}
                onChange={(e) => updateSettings({ prefix: e.target.value })}
                className="input-field w-full"
                placeholder="!"
                maxLength={5}
              />
              <p className="text-xs text-void-gray-light mt-1">
                Prefix for bot commands (max 5 characters)
              </p>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => updateSettings({ language: e.target.value })}
                className="input-field w-full"
              >
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="es-ES">Spanish</option>
                <option value="fr-FR">French</option>
                <option value="de-DE">German</option>
                <option value="ja-JP">Japanese</option>
                <option value="zh-CN">Chinese (Simplified)</option>
                <option value="pt-BR">Portuguese (Brazil)</option>
              </select>
              <p className="text-xs text-void-gray-light mt-1">
                Bot response language
              </p>
            </div>

            {/* Timezone */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Timezone
              </label>
              <select
                value={settings.timezone}
                onChange={(e) => updateSettings({ timezone: e.target.value })}
                className="input-field w-full"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
                <option value="Asia/Tokyo">Tokyo</option>
                <option value="Australia/Sydney">Sydney</option>
              </select>
              <p className="text-xs text-void-gray-light mt-1">
                Timezone for timestamps and schedules
              </p>
            </div>

            {/* Embed Color */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Embed Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.embedColor}
                  onChange={(e) => updateSettings({ embedColor: e.target.value })}
                  className="h-10 w-20 bg-void-darker border border-void-gray/30 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.embedColor}
                  onChange={(e) => updateSettings({ embedColor: e.target.value })}
                  className="input-field flex-1"
                  placeholder="#8b5cf6"
                />
              </div>
              <p className="text-xs text-void-gray-light mt-1">
                Color for embed messages and highlights
              </p>
            </div>
          </div>
        </div>

        {/* Bot Status */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Bot size={24} className="text-void-purple-light" />
            <h2 className="text-xl font-semibold">Bot Status</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Status
              </label>
              <select
                value={settings.status}
                onChange={(e) => updateSettings({ 
                  status: e.target.value as GeneralSettings['status'] 
                })}
                className="input-field w-full"
              >
                <option value="online">🟢 Online</option>
                <option value="idle">🟡 Idle</option>
                <option value="dnd">🔴 Do Not Disturb</option>
                <option value="invisible">⚫ Invisible</option>
              </select>
              <p className="text-xs text-void-gray-light mt-1">
                Bot's Discord status
              </p>
            </div>

            {/* Activity Type */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Activity Type
              </label>
              <select
                value={settings.activity.type}
                onChange={(e) => updateActivity({ 
                  type: e.target.value as GeneralSettings['activity']['type'] 
                })}
                className="input-field w-full"
              >
                <option value="playing">Playing</option>
                <option value="watching">Watching</option>
                <option value="listening">Listening to</option>
                <option value="competing">Competing in</option>
              </select>
              <p className="text-xs text-void-gray-light mt-1">
                Type of activity to display
              </p>
            </div>

            {/* Activity Text */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Activity Text
              </label>
              <input
                type="text"
                value={settings.activity.text}
                onChange={(e) => updateActivity({ text: e.target.value })}
                className="input-field w-full"
                placeholder="Void Bot Dashboard"
                maxLength={128}
              />
              <p className="text-xs text-void-gray-light mt-1">
                Text to display as bot activity (max 128 characters)
              </p>
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Globe size={24} className="text-void-purple-light" />
            <h2 className="text-xl font-semibold">Advanced Settings</h2>
          </div>

          <div className="space-y-6">
            {/* API Settings */}
            <div>
              <h3 className="font-medium mb-4">API Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 glass rounded-lg">
                  <h4 className="font-medium mb-2">Webhook URL</h4>
                  <input
                    type="url"
                    className="input-field w-full text-sm"
                    placeholder="https://your-webhook-url.com"
                  />
                  <p className="text-xs text-void-gray-light mt-2">
                    Optional webhook for external integrations
                  </p>
                </div>
                <div className="p-4 glass rounded-lg">
                  <h4 className="font-medium mb-2">API Key</h4>
                  <input
                    type="password"
                    className="input-field w-full text-sm"
                    placeholder="••••••••••••••••"
                  />
                  <p className="text-xs text-void-gray-light mt-2">
                    API key for third-party services
                  </p>
                </div>
              </div>
            </div>

            {/* Backup Settings */}
            <div>
              <h3 className="font-medium mb-4">Backup & Recovery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="btn-secondary flex items-center justify-center gap-2">
                  <Clock size={20} />
                  Export Settings
                </button>
                <button className="btn-secondary flex items-center justify-center gap-2">
                  <SettingsIcon size={20} />
                  Import Settings
                </button>
              </div>
              <p className="text-xs text-void-gray-light mt-3">
                Export your settings for backup or import from a previous configuration
              </p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card border-l-4 border-red-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <SettingsIcon size={20} className="text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-red-400">Danger Zone</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 glass rounded-lg">
              <div>
                <h3 className="font-medium">Reset All Settings</h3>
                <p className="text-sm text-void-gray-light">
                  Reset all settings to their default values
                </p>
              </div>
              <button className="btn-secondary border border-red-500 text-red-400 hover:bg-red-500/10">
                Reset Settings
              </button>
            </div>

            <div className="flex items-center justify-between p-4 glass rounded-lg">
              <div>
                <h3 className="font-medium">Clear All Data</h3>
                <p className="text-sm text-void-gray-light">
                  Remove all bot data and configuration for this server
                </p>
              </div>
              <button className="btn-secondary border border-red-500 text-red-400 hover:bg-red-500/10">
                Clear Data
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-red-500/10 rounded-lg border border-red-500/30">
            <p className="text-sm text-red-400">
              <strong>Warning:</strong> These actions cannot be undone. Please be careful before proceeding.
            </p>
          </div>
        </div>

        {/* Info Card */}
        <div className="card border-l-4 border-void-purple">
          <div className="flex gap-4">
            <Gamepad2 size={24} className="text-void-purple-light flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Settings Tips</h3>
              <ul className="text-sm text-void-gray-light space-y-1">
                <li>• Use a unique prefix to avoid conflicts with other bots</li>
                <li>• Set your timezone for accurate scheduling and timestamps</li>
                <li>• Customize embed colors to match your server's theme</li>
                <li>• Regularly export settings for backup purposes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
