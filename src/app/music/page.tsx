'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { getGuildSettings, updateGuildSettings } from '@/lib/api'
import toast from 'react-hot-toast'
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2,
  Repeat,
  Shuffle,
  Save,
  Music,
  Headphones,
  List,
  Settings
} from 'lucide-react'
import type { GuildSettings, MusicSettings } from '@/types'

export default function MusicPage() {
  const [settings, setSettings] = useState<MusicSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentVolume, setCurrentVolume] = useState(70)
  const [currentTrack, setCurrentTrack] = useState({
    title: "Current Song",
    artist: "Artist Name",
    duration: "3:45",
    progress: 45
  })

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const guildSettings = await getGuildSettings('987654321')
        setSettings(guildSettings.music)
        setCurrentVolume(guildSettings.music.defaultVolume)
      } catch (error) {
        console.error('Failed to load music settings:', error)
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
      await updateGuildSettings('987654321', { music: settings })
      toast.success('Music settings saved successfully!')
    } catch (error) {
      console.error('Failed to save settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const updateSettings = (updates: Partial<MusicSettings>) => {
    if (!settings) return
    setSettings({ ...settings, ...updates })
  }

  const mockQueue = [
    { id: 1, title: "Song One", artist: "Artist One", duration: "3:20", requestedBy: "User#1234" },
    { id: 2, title: "Song Two", artist: "Artist Two", duration: "4:15", requestedBy: "User#5678" },
    { id: 3, title: "Song Three", artist: "Artist Three", duration: "2:50", requestedBy: "User#9012" },
    { id: 4, title: "Song Four", artist: "Artist Four", duration: "3:35", requestedBy: "User#3456" },
    { id: 5, title: "Song Five", artist: "Artist Five", duration: "5:10", requestedBy: "User#7890" },
  ]

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-void-gray rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-96 bg-void-gray rounded-xl"></div>
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
          <Music className="mx-auto text-red-400 mb-4" size={48} />
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
            <h1 className="text-3xl font-bold mb-2">Music</h1>
            <p className="text-void-gray-light">
              Control music playback and configure player settings.
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

        {/* Music Player */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Player */}
          <div className="lg:col-span-2 card">
            <div className="space-y-6">
              {/* Album Art and Track Info */}
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 bg-gradient-to-br from-void-purple to-void-purple-dark rounded-lg flex items-center justify-center glow-purple">
                  <Music size={48} className="text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{currentTrack.title}</h2>
                  <p className="text-void-gray-light text-lg">{currentTrack.artist}</p>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm text-void-gray-light mb-2">
                      <span>1:38</span>
                      <span>{currentTrack.duration}</span>
                    </div>
                    <div className="w-full bg-void-gray rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-void-purple to-void-purple-light h-2 rounded-full transition-all duration-300"
                        style={{ width: `${currentTrack.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-4">
                <button className="p-3 glass rounded-lg hover:bg-void-gray/20 transition-colors">
                  <SkipBack size={20} />
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-4 bg-void-purple rounded-full hover:bg-void-purple-dark transition-colors glow-purple-hover"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button className="p-3 glass rounded-lg hover:bg-void-gray/20 transition-colors">
                  <SkipForward size={20} />
                </button>
              </div>

              {/* Additional Controls */}
              <div className="flex items-center justify-center gap-6">
                <button className="p-2 glass rounded-lg hover:bg-void-gray/20 transition-colors">
                  <Shuffle size={18} />
                </button>
                <button className="p-2 glass rounded-lg hover:bg-void-gray/20 transition-colors">
                  <Repeat size={18} />
                </button>
                <div className="flex items-center gap-3">
                  <Volume2 size={20} />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={currentVolume}
                    onChange={(e) => setCurrentVolume(parseInt(e.target.value))}
                    className="w-32"
                  />
                  <span className="text-sm text-void-gray-light w-10">{currentVolume}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Queue */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <List size={20} />
                Queue
              </h3>
              <span className="text-sm text-void-gray-light">{mockQueue.length} songs</span>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin">
              {mockQueue.map((song, index) => (
                <div key={song.id} className="flex items-center gap-3 p-3 glass rounded-lg hover:bg-void-gray/20 transition-colors">
                  <span className="text-void-gray-light w-6">{index + 1}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{song.title}</p>
                    <p className="text-xs text-void-gray-light">{song.artist}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-void-gray-light">{song.duration}</p>
                    <p className="text-xs text-void-gray-light">{song.requestedBy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Music Settings */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Settings size={24} className="text-void-purple-light" />
            <h2 className="text-xl font-semibold">Music Settings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Enable Music */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Enable Music</h3>
                <p className="text-sm text-void-gray-light">
                  Allow music playback in this server
                </p>
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

            {/* Auto Play */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Auto Play</h3>
                <p className="text-sm text-void-gray-light">
                  Automatically play suggested songs
                </p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.autoPlay}
                  onChange={(e) => updateSettings({ autoPlay: e.target.checked })}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            {/* Auto Leave */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Auto Leave</h3>
                <p className="text-sm text-void-gray-light">
                  Leave voice channel when inactive
                </p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.autoLeave}
                  onChange={(e) => updateSettings({ autoLeave: e.target.checked })}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            {/* Default Volume */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Default Volume
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={settings.defaultVolume}
                onChange={(e) => updateSettings({ 
                  defaultVolume: parseInt(e.target.value) || 70 
                })}
                className="input-field w-full"
              />
              <p className="text-xs text-void-gray-light mt-1">
                Default volume for new tracks (0-100)
              </p>
            </div>

            {/* Max Queue Length */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Max Queue Length
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={settings.maxQueueLength}
                onChange={(e) => updateSettings({ 
                  maxQueueLength: parseInt(e.target.value) || 50 
                })}
                className="input-field w-full"
              />
              <p className="text-xs text-void-gray-light mt-1">
                Maximum number of songs in queue
              </p>
            </div>

            {/* DJ Role */}
            <div>
              <label className="block text-sm font-medium mb-2">
                DJ Role
              </label>
              <select
                value={settings.djRole}
                onChange={(e) => updateSettings({ djRole: e.target.value })}
                className="input-field w-full"
              >
                <option value="">No DJ role</option>
                <option value="dj_role_id">DJ</option>
                <option value="admin_role_id">Admin</option>
                <option value="mod_role_id">Moderator</option>
              </select>
              <p className="text-xs text-void-gray-light mt-1">
                Role required to control music
              </p>
            </div>
          </div>

          {/* Allowed Channels */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">
              Allowed Channels
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { id: 'music_channel_id', name: '#music' },
                { id: 'general_channel_id', name: '#general' },
                { id: 'voice_chat_id', name: '#voice-chat' },
                { id: 'lounge_id', name: '#lounge' },
              ].map((channel) => (
                <label key={channel.id} className="flex items-center gap-3 p-3 glass rounded-lg cursor-pointer hover:bg-void-gray/20">
                  <input
                    type="checkbox"
                    checked={settings.allowedChannels.includes(channel.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateSettings({ 
                          allowedChannels: [...settings.allowedChannels, channel.id] 
                        })
                      } else {
                        updateSettings({ 
                          allowedChannels: settings.allowedChannels.filter(id => id !== channel.id) 
                        })
                      }
                    }}
                    className="rounded"
                  />
                  <span className="font-medium">{channel.name}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-void-gray-light mt-2">
              Channels where music commands can be used
            </p>
          </div>
        </div>

        {/* Info Card */}
        <div className="card border-l-4 border-void-purple">
          <div className="flex gap-4">
            <Headphones size={24} className="text-void-purple-light flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Music Tips</h3>
              <ul className="text-sm text-void-gray-light space-y-1">
                <li>• Use !play followed by a song name or URL to add music</li>
                <li>• Set a DJ role to restrict music controls to trusted users</li>
                <li>• Enable auto-play to keep the music going automatically</li>
                <li>• Configure allowed channels to keep music commands organized</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
