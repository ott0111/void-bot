# Void Bot Dashboard

A modern, high-end Discord bot dashboard frontend built with pure HTML, CSS, and JavaScript. Features a dark esports-inspired theme with black and purple colors, smooth animations, and a clean SaaS-style layout.

## 🚀 Features

- **Modern UI/UX**: Dark theme with purple accents, glass morphism effects, and smooth animations
- **Responsive Design**: Fully responsive for desktop and mobile devices
- **Dashboard Overview**: Server statistics, member growth charts, and activity monitoring
- **Moderation Controls**: Advanced auto-moderation settings with customizable punishments
- **Music Player**: Full-featured music controls with queue management
- **Settings Management**: Comprehensive bot configuration options
- **Toast Notifications**: User-friendly feedback system
- **Interactive Elements**: Toggle switches, sliders, dropdowns, and buttons
- **Single Page Application**: Smooth navigation without page reloads

## 🛠️ Tech Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Custom design system with animations and transitions
- **Vanilla JavaScript**: No frameworks, pure JS functionality
- **Google Fonts**: Inter font family
- **SVG Icons**: Inline scalable icons

## 📁 Project Structure

```
void-bot-dashboard/
├── index.html              # Main HTML file
├── styles.css              # Complete CSS with design system
├── script.js               # JavaScript functionality
├── README.md               # Project documentation
└── .gitignore              # Git ignore file
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

### Dashboard
- Server statistics cards
- Member growth chart placeholder
- Top commands usage
- Recent activity feed
- Quick action shortcuts

### Moderation
- Auto-moderation toggle
- Content filtering options (spam, links, invites, caps, swear)
- Punishment configuration
- Threshold settings

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
- Real-time updates

### Additional Pages
- Security (Anti-nuke protection)
- Welcome (Greeting settings)
- Logs (Activity monitoring)
- Commands (Custom commands)
- Economy (Virtual currency)

## 🔧 Installation & Setup

1. **Download or clone the repository**
   ```bash
   git clone <repository-url>
   cd void-bot-dashboard
   ```

2. **Open in browser**
   Simply open `index.html` in your web browser:
   ```bash
   # Double-click index.html or use:
   open index.html
   ```

3. **Or serve with a local server** (optional)
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

4. **Open your browser**
   Navigate to [http://localhost:8000](http://localhost:8000) (if using a server)

## 🌐 Deployment

### Static Hosting Services
The dashboard can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repository and deploy
- **Netlify**: Drag and drop the folder or connect Git
- **GitHub Pages**: Enable GitHub Pages in your repository
- **Firebase Hosting**: Use Firebase CLI to deploy
- **Surge.sh**: Quick deployment with surge command

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect to GitHub for auto-deployment
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir .
```

## 🎯 Key Features

### Navigation
- Responsive sidebar with mobile hamburger menu
- Active state indicators
- Smooth transitions between pages
- Server and user information display

### Interactive Elements
- **Toggle Switches**: Custom styled on/off switches
- **Input Fields**: Dark themed with focus states
- **Buttons**: Primary and secondary styles with hover effects
- **Dropdowns**: Styled select elements
- **Cards**: Glass morphism effect with hover animations

### Toast Notifications
- Success, error, and info variants
- Auto-dismiss after 3 seconds
- Smooth slide-in animations
- Stacking support for multiple toasts

### Responsive Design
- Mobile-first approach
- Collapsible sidebar on mobile
- Touch-friendly interface
- Optimized for all screen sizes

## 🎭 JavaScript Features

### State Management
- Centralized state object for application data
- Persistent settings across page navigation
- Real-time UI updates

### Navigation System
- Single Page Application (SPA) routing
- History API support
- Dynamic content loading
- Active state management

### Form Handling
- Real-time form validation
- Settings persistence
- Interactive controls
- Event handling

### Utility Functions
- Toast notification system
- Settings management
- UI helpers
- Event listeners

## 🚀 Future Enhancements

- [ ] Real-time WebSocket integration
- [ ] Advanced analytics and charts
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

## 📄 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari 12+, Chrome Mobile 60+)

## 🙏 Acknowledgments

- **Google Fonts** - Inter font family
- **SVG Icons** - Custom icon implementations
- **CSS Grid & Flexbox** - Modern layout techniques
- **CSS Variables** - Dynamic theming
- **ES6+ JavaScript** - Modern JavaScript features

---

**Void Bot Dashboard** - Elevating Discord bot management to the next level. 🚀
