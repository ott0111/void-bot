export interface Server {
  id: string;
  name: string;
  icon: string;
  memberCount: number;
  isPremium: boolean;
}

export interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  email: string;
  isPremium: boolean;
}

export interface GuildSettings {
  id: string;
  moderation: ModerationSettings;
  security: SecuritySettings;
  music: MusicSettings;
  welcome: WelcomeSettings;
  logging: LoggingSettings;
  commands: CommandSettings;
  economy: EconomySettings;
  general: GeneralSettings;
}

export interface ModerationSettings {
  enabled: boolean;
  autoMod: {
    enabled: boolean;
    antiSpam: boolean;
    antiLinks: boolean;
    antiInvites: boolean;
    antiCaps: boolean;
    antiSwear: boolean;
    warnThreshold: number;
    muteDuration: number;
  };
  punishments: {
    warn: boolean;
    mute: boolean;
    kick: boolean;
    ban: boolean;
  };
}

export interface SecuritySettings {
  enabled: boolean;
  antiNuke: {
    enabled: boolean;
    banThreshold: number;
    kickThreshold: number;
    channelDeleteThreshold: number;
    roleCreateThreshold: number;
    whitelistRoles: string[];
  };
  raidProtection: {
    enabled: boolean;
    joinThreshold: number;
    timeWindow: number;
    action: 'none' | 'lockdown' | 'kick';
  };
}

export interface MusicSettings {
  enabled: boolean;
  defaultVolume: number;
  autoPlay: boolean;
  autoLeave: boolean;
  maxQueueLength: number;
  allowedChannels: string[];
  djRole: string;
}

export interface WelcomeSettings {
  enabled: boolean;
  channel: string;
  message: string;
  embed: {
    enabled: boolean;
    title: string;
    description: string;
    color: string;
    thumbnail: boolean;
  };
  autoRole: {
    enabled: boolean;
    roles: string[];
  };
}

export interface LoggingSettings {
  enabled: boolean;
  channels: {
    moderation: string;
    security: string;
    music: string;
    economy: string;
    general: string;
  };
  events: {
    messageDelete: boolean;
    messageEdit: boolean;
    memberJoin: boolean;
    memberLeave: boolean;
    banAdd: boolean;
    banRemove: boolean;
    roleUpdate: boolean;
    channelUpdate: boolean;
  };
}

export interface CommandSettings {
  enabled: boolean;
  customCommands: CustomCommand[];
  disabledCommands: string[];
  commandCooldown: number;
}

export interface CustomCommand {
  id: string;
  name: string;
  response: string;
  enabled: boolean;
  cooldown: number;
  roles: string[];
}

export interface EconomySettings {
  enabled: boolean;
  currency: {
    name: string;
    symbol: string;
    startingBalance: number;
    dailyAmount: number;
    workAmount: number;
  };
  features: {
    shop: boolean;
    gambling: boolean;
    leaderboard: boolean;
    inventory: boolean;
  };
}

export interface GeneralSettings {
  prefix: string;
  language: string;
  timezone: string;
  embedColor: string;
  status: 'online' | 'idle' | 'dnd' | 'invisible';
  activity: {
    type: 'playing' | 'watching' | 'listening' | 'competing';
    text: string;
  };
}

export interface LogEntry {
  id: string;
  type: 'moderation' | 'security' | 'music' | 'economy' | 'general';
  action: string;
  user: {
    id: string;
    tag: string;
  };
  target?: {
    id: string;
    tag: string;
  };
  reason?: string;
  timestamp: Date;
  guildId: string;
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  messagesToday: number;
  commandsUsed: number;
  topCommands: { name: string; uses: number }[];
  memberGrowth: { date: string; count: number }[];
}
