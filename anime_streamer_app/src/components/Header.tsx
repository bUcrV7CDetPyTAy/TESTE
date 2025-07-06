import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, Settings, User, Bell, Zap } from 'lucide-react'

interface HeaderProps {
  onMenuClick: () => void
  searchTerm: string
  onSearchChange: (term: string) => void
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, searchTerm, onSearchChange }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/30"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
      
      <div className="relative px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center space-x-4">
            {/* Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMenuClick}
              className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 group"
            >
              <Menu className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <img 
                  src="/drawer_logo.png" 
                  alt="AnimeStreamer" 
                  className="w-10 h-10 rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-lg" />
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg opacity-20 blur-sm"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  CYBER<span className="text-cyan-300">ANIME</span>
                </h1>
                <p className="text-xs text-cyan-300/60 font-mono">STREAMING SYSTEM</p>
              </div>
            </motion.div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-md mx-8">
            <motion.div
              animate={{
                boxShadow: isSearchFocused 
                  ? '0 0 20px rgba(0,255,255,0.5)' 
                  : '0 0 10px rgba(0,255,255,0.2)'
              }}
              className="relative"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                <input
                  type="text"
                  placeholder="Buscar animes cyberpunk..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full bg-black/60 border border-cyan-500/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder-cyan-300/50 focus:outline-none focus:border-cyan-400 focus:bg-black/80 transition-all duration-300 font-mono"
                />
                
                {/* Search glow effect */}
                <motion.div
                  animate={{
                    opacity: isSearchFocused ? 1 : 0,
                    scale: isSearchFocused ? 1 : 0.8
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-lg pointer-events-none"
                />
              </div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {isSearchFocused && searchTerm && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 left-0 right-0 bg-black/90 backdrop-blur-md border border-cyan-500/30 rounded-lg overflow-hidden z-50"
                  >
                    <div className="p-2">
                      <div className="text-cyan-300/60 text-xs font-mono mb-2">RESULTADOS DA BUSCA:</div>
                      {/* Search results would go here */}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <motion.div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:border-purple-400 transition-all duration-300 group relative"
              >
                <Bell className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full"
                />
              </motion.button>
            </motion.div>

            {/* Settings */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 hover:border-green-400 transition-all duration-300 group"
            >
              <Settings className="w-5 h-5 text-green-400 group-hover:text-green-300" />
            </motion.button>

            {/* User Profile */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 hover:border-pink-400 transition-all duration-300 group relative overflow-hidden"
            >
              <User className="w-5 h-5 text-pink-400 group-hover:text-pink-300 relative z-10" />
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-400/20 to-transparent"
              />
            </motion.button>

            {/* Power Indicator */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-lg">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Zap className="w-4 h-4 text-green-400" />
              </motion.div>
              <span className="text-green-400 text-sm font-mono">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Bottom Scan Line */}
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        />
      </div>
    </motion.header>
  )
}

export default Header
