import { Server, User, GuildSettings, DashboardStats, LogEntry } from '@/types'

// Mock API functions - replace with actual API calls
export async function getCurrentUser(): Promise<User> {
  return {
    id: '123456789',
    username: 'VoidUser',
    discriminator: '1337',
    avatar: 'default_avatar',
    email: 'user@example.com',
    isPremium: true,
  }
}

export async function getUserServers(): Promise<Server[]> {
  return [
    {
      id: '987654321',
      name: 'Void Bot Community',
      icon: 'server_icon_1',
      memberCount: 15420,
      isPremium: true,
    },
    {
      id: '123456789',
      name: 'Gaming Hub',
      icon: 'server_icon_2',
      memberCount: 3420,
      isPremium: false,
    },
    {
      id: '456789123',
      name: 'Dev Squad',
      icon: 'server_icon_3',
      memberCount: 890,
      isPremium: false,
    },
  ]
}

export async function getGuildSettings(guildId: string): Promise<GuildSettings> {
  // Mock settings - in real app, fetch from API
  return {
    id: guildId,
    moderation: {
      enabled: true,
      autoMod: {
        enabled: true,
        antiSpam: true,
        antiLinks: false,
        antiInvites: true,
        antiCaps: true,
        antiSwear: true,
        warnThreshold: 3,
        muteDuration: 300,
      },
      punishments: {
        warn: true,
        mute: true,
        kick: true,
        ban: false,
      },
    },
    security: {
      enabled: true,
      antiNuke: {
        enabled: true,
        banThreshold: 5,
        kickThreshold: 5,
        channelDeleteThreshold: 3,
        roleCreateThreshold: 3,
        whitelistRoles: ['admin_role_id'],
      },
      raidProtection: {
        enabled: true,
        joinThreshold: 10,
        timeWindow: 60,
        action: 'lockdown',
      },
    },
    music: {
      enabled: true,
      defaultVolume: 70,
      autoPlay: false,
      autoLeave: true,
      maxQueueLength: 50,
      allowedChannels: ['music_channel_id'],
      djRole: 'dj_role_id',
    },
    welcome: {
      enabled: true,
      channel: 'welcome_channel_id',
      message: 'Welcome {user} to {server}! 🎉',
      embed: {
        enabled: true,
        title: 'Welcome!',
        description: 'We\'re glad to have you here!',
        color: '#8b5cf6',
        thumbnail: true,
      },
      autoRole: {
        enabled: true,
        roles: ['member_role_id'],
      },
    },
    logging: {
      enabled: true,
      channels: {
        moderation: 'mod_logs_channel_id',
        security: 'security_logs_channel_id',
        music: 'music_logs_channel_id',
        economy: 'economy_logs_channel_id',
        general: 'general_logs_channel_id',
      },
      events: {
        messageDelete: true,
        messageEdit: false,
        memberJoin: true,
        memberLeave: true,
        banAdd: true,
        banRemove: true,
        roleUpdate: true,
        channelUpdate: false,
      },
    },
    commands: {
      enabled: true,
      customCommands: [
        {
          id: '1',
          name: 'rules',
          response: '1. Be respectful\n2. No spam\n3. Follow Discord ToS',
          enabled: true,
          cooldown: 5,
          roles: [],
        },
      ],
      disabledCommands: ['eval'],
      commandCooldown: 3,
    },
    economy: {
      enabled: true,
      currency: {
        name: 'Void Coins',
        symbol: '⚡',
        startingBalance: 1000,
        dailyAmount: 500,
        workAmount: 200,
      },
      features: {
        shop: true,
        gambling: true,
        leaderboard: true,
        inventory: true,
      },
    },
    general: {
      prefix: '!',
      language: 'en-US',
      timezone: 'UTC',
      embedColor: '#8b5cf6',
      status: 'online',
      activity: {
        type: 'playing',
        text: 'with Void Bot Dashboard',
      },
    },
  }
}

export async function updateGuildSettings(guildId: string, settings: Partial<GuildSettings>): Promise<void> {
  // Mock API call - in real app, send to backend
  console.log('Updating settings for guild:', guildId, settings)
  await new Promise(resolve => setTimeout(resolve, 500))
}

export async function getDashboardStats(guildId: string): Promise<DashboardStats> {
  // Mock stats - in real app, fetch from API
  return {
    totalMembers: 15420,
    activeMembers: 8930,
    messagesToday: 45230,
    commandsUsed: 12840,
    topCommands: [
      { name: 'play', uses: 3420 },
      { name: 'help', uses: 2890 },
      { name: 'balance', uses: 2100 },
      { name: 'ban', uses: 890 },
      { name: 'kick', uses: 650 },
    ],
    memberGrowth: [
      { date: '2024-01-01', count: 14000 },
      { date: '2024-01-02', count: 14200 },
      { date: '2024-01-03', count: 14500 },
      { date: '2024-01-04', count: 14800 },
      { date: '2024-01-05', count: 15200 },
      { date: '2024-01-06', count: 15420 },
    ],
  }
}

export async function getGuildLogs(guildId: string, limit: number = 50): Promise<LogEntry[]> {
  // Mock logs - in real app, fetch from API
  return [
    {
      id: '1',
      type: 'moderation',
      action: 'User Banned',
      user: { id: '123', tag: 'User#1234' },
      target: { id: '456', tag: 'BadUser#5678' },
      reason: 'Spamming in chat',
      timestamp: new Date(Date.now() - 3600000),
      guildId,
    },
    {
      id: '2',
      type: 'security',
      action: 'Raid Detected',
      user: { id: '789', tag: 'System#0000' },
      reason: 'Multiple users joined in short time',
      timestamp: new Date(Date.now() - 7200000),
      guildId,
    },
    {
      id: '3',
      type: 'music',
      action: 'Queue Added',
      user: { id: '101', tag: 'MusicFan#2024' },
      reason: 'Added "Song Name" to queue',
      timestamp: new Date(Date.now() - 10800000),
      guildId,
    },
  ]
}
