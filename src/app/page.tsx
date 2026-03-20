'use client'

import { useState } from 'react'
import { ArrowRight, Discord, Shield, Music, Zap, Crown, Check } from 'lucide-react'

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false)

  const features = [
    {
      icon: Shield,
      title: 'Advanced Moderation',
      description: 'Powerful auto-moderation tools with customizable rules and punishments.',
    },
    {
      icon: Music,
      title: 'Music System',
      description: 'High-quality music playback with support for all major streaming platforms.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for performance with minimal latency and 99.9% uptime.',
    },
    {
      icon: Crown,
      title: 'Premium Features',
      description: 'Unlock exclusive features with our premium subscription.',
    },
  ]

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      features: [
        'Basic moderation',
        'Music commands',
        'Up to 5 servers',
        'Community support',
      ],
      highlighted: false,
    },
    {
      name: 'Premium',
      price: '$9.99',
      features: [
        'Everything in Free',
        'Advanced moderation',
        'Unlimited servers',
        'Priority support',
        'Custom commands',
        'Economy system',
        'Welcome messages',
        'Logging system',
      ],
      highlighted: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-void-black via-void-darker to-void-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(192,132,252,0.1),transparent_50%)]" />

      {/* Navigation */}
      <nav className="relative z-10 glass border-b border-void-gray/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-void-purple rounded-lg flex items-center justify-center glow-purple">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Void Bot</h1>
                <p className="text-xs text-void-gray-light">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="btn-ghost">Features</button>
              <button className="btn-ghost">Pricing</button>
              <button className="btn-ghost">Documentation</button>
              <button className="btn-primary">Login</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8">
            <Crown size={16} className="text-yellow-400" />
            <span className="text-sm">Trusted by 10,000+ servers</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">The Ultimate</span>
            <br />
            Discord Bot Experience
          </h1>
          
          <p className="text-xl text-void-gray-light mb-12 max-w-3xl mx-auto">
            Transform your Discord server with Void Bot - the all-in-one solution for moderation, 
            music, entertainment, and community management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="btn-primary flex items-center justify-center gap-2 px-8 py-4 text-lg"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Discord size={24} />
              Login with Discord
              <ArrowRight size={20} className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            </button>
            <button className="btn-secondary flex items-center justify-center gap-2 px-8 py-4 text-lg">
              <Shield size={24} />
              Invite Bot
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {[
            { label: 'Servers', value: '10,000+' },
            { label: 'Users', value: '2M+' },
            { label: 'Commands', value: '500+' },
            { label: 'Uptime', value: '99.9%' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-void-gray-light">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-void-gray-light">Everything you need to manage your server</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="card text-center group">
                <div className="w-16 h-16 bg-void-purple/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-void-purple/30 transition-colors duration-300">
                  <Icon size={32} className="text-void-purple-light" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-void-gray-light">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-xl text-void-gray-light">Start free, upgrade when you're ready</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`card relative ${plan.highlighted ? 'ring-2 ring-void-purple glow-purple' : ''}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-void-purple text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6">
                  <span className="gradient-text">{plan.price}</span>
                  <span className="text-lg text-void-gray-light">/month</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check size={20} className="text-void-purple-light flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}`}>
                  {plan.name === 'Free' ? 'Get Started' : 'Upgrade Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 glass border-t border-void-gray/20 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-void-purple rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">V</span>
                </div>
                <span className="font-bold">Void Bot</span>
              </div>
              <p className="text-void-gray-light text-sm">
                The ultimate Discord bot for server management and entertainment.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-void-gray-light text-sm">
                <li><button className="hover:text-white transition-colors">Features</button></li>
                <li><button className="hover:text-white transition-colors">Pricing</button></li>
                <li><button className="hover:text-white transition-colors">API</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-void-gray-light text-sm">
                <li><button className="hover:text-white transition-colors">Documentation</button></li>
                <li><button className="hover:text-white transition-colors">Discord Server</button></li>
                <li><button className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-void-gray-light text-sm">
                <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-white transition-colors">Terms of Service</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-void-gray/20 mt-8 pt-8 text-center text-void-gray-light text-sm">
            <p>&copy; 2024 Void Bot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
