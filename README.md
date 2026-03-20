# Void Bot Dashboard

A modern, high-end Discord bot dashboard frontend built with Next.js, TypeScript, and TailwindCSS. Features a dark esports-inspired theme with black and purple colors, smooth animations, and a clean SaaS-style layout.

## 🚀 Features

- **Modern UI/UX**: Dark theme with purple accents, glass morphism effects, and smooth animations
- **Responsive Design**: Fully responsive for desktop and mobile devices
- **Dashboard Overview**: Server statistics, member growth charts, and activity monitoring
- **Moderation Controls**: Advanced auto-moderation settings with customizable punishments
- **Music Player**: Full-featured music controls with queue management
- **Security Features**: Anti-nuke protection and raid detection
- **Settings Management**: Comprehensive bot configuration options
- **Toast Notifications**: User-friendly feedback system
- **Loading States**: Professional loading animations and skeletons

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom design system
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Charts**: Recharts (for data visualization)

## 📁 Project Structure

```
void-bot-dashboard/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/         # Dashboard overview page
│   │   ├── moderation/        # Moderation settings
│   │   ├── music/            # Music player and settings
│   │   ├── settings/         # General settings
│   │   ├── globals.css       # Global styles and Tailwind
│   │   ├── layout.tsx        # Root layout component
│   │   └── page.tsx          # Landing page
│   ├── components/
│   │   └── layout/          # Layout components
│   │       ├── DashboardLayout.tsx
│   │       ├── Sidebar.tsx
│   │       └── TopBar.tsx
│   ├── lib/
│   │   ├── api.ts            # Mock API functions
│   │   └── utils.ts          # Utility functions
│   └── types/
│       └── index.ts          # TypeScript type definitions
├── public/                   # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary**: Void Purple (#8b5cf6)
- **Secondary**: Void Accent (#c084fc)
- **Background**: Void Black (#0a0a0a)
- **Surfaces**: Void Dark (#1a1a1a), Void Darker (#0f0f0f)
- **Text**: White with varying opacity levels

### Key Features
- **Glass Morphism**: Translucent backgrounds with backdrop blur
- **Glow Effects**: Purple glowing accents on interactive elements
- **Smooth Transitions**: Hover states and micro-interactions
- **Custom Components**: Toggle switches, input fields, buttons

## 📱 Pages

### Landing Page
- Hero section with gradient backgrounds
- Feature showcase with icons
- Pricing plans comparison
- Discord login and bot invitation buttons
- Responsive footer with links

### Dashboard
- Server statistics cards
- Member growth chart
- Top commands usage
- Recent activity feed
- Quick action shortcuts

### Moderation
- Auto-moderation toggle
- Content filtering options (spam, links, invites, caps, swear)
- Punishment configuration
- Threshold settings
- Tips and best practices

### Music
- Interactive music player with controls
- Queue management
- Volume and playback settings
- Channel restrictions
- DJ role configuration

### Settings
- Basic configuration (prefix, language, timezone)
- Bot status and activity
- Embed color customization
- Advanced API settings
- Backup and recovery options
- Danger zone for reset operations

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd void-bot-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Build & Deploy

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Lint code**
   ```bash
   npm run lint
   ```

## 🔌 API Integration

The dashboard currently uses mock API functions in `src/lib/api.ts`. To integrate with a real backend:

1. Replace mock functions with actual API calls
2. Update environment variables for API endpoints
3. Implement proper authentication and authorization
4. Add error handling for API failures

## 🎯 Key Components

### DashboardLayout
- Wraps all dashboard pages with sidebar and top bar
- Handles responsive navigation
- Provides consistent layout structure

### Sidebar
- Collapsible navigation menu
- Active state indicators
- Mobile-responsive with hamburger menu
- Server and user information

### TopBar
- Server selector dropdown
- User profile dropdown
- Logout functionality
- Premium status indicators

## 🎭 Custom Hooks & Utilities

### API Functions
- `getCurrentUser()`: Fetch user information
- `getUserServers()`: Get user's Discord servers
- `getGuildSettings()`: Retrieve server-specific settings
- `updateGuildSettings()`: Save configuration changes
- `getDashboardStats()`: Fetch dashboard statistics

### Utility Functions
- `formatNumber()`: Format large numbers with K/M suffixes
- `formatDate()`: Format dates with locale support
- `formatDuration()`: Convert seconds to readable duration
- `cn()`: Utility for conditional class names

## 🚀 Future Enhancements

- [ ] Real-time WebSocket integration
- [ ] Advanced analytics and reporting
- [ ] Custom theme editor
- [ ] Multi-server management
- [ ] Plugin system
- [ ] Role-based permissions
- [ ] Audit logs
- [ ] Command scheduling
- [ ] Custom embed builder
- [ ] Integration marketplace

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icons
- [React Hot Toast](https://react-hot-toast.com/) - Toast notifications

---

**Void Bot Dashboard** - Elevating Discord bot management to the next level. 🚀
