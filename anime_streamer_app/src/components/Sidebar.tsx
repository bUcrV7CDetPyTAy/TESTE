import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Home, TrendingUp, Star, Clock, Download, Settings, Database, Cpu, Activity } from 'lucide-react'
import { Anime } from '../types/anime'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  animes: Anime[]
  onSelectAnime: (anime: Anime) => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, animes, onSelectAnime }) => {
  const [activeSection, setActiveSection] = useState('home')

  const menuItems = [
    { id: 'home', icon: Home, label: 'INÍCIO', color: 'cyan' },
    { id: 'trending', icon: TrendingUp, label: 'TRENDING', color: 'purple' },
    { id: 'favorites', icon: Star, label: 'FAVORITOS', color: 'pink' },
    { id: 'history', icon: Clock, label: 'HISTÓRICO', color: 'green' },
    { id: 'downloads', icon: Download, label: 'DOWNLOADS', color: 'orange' },
    { id: 'settings', icon: Settings, label: 'CONFIGURAÇÕES', color: 'blue' }
  ]

  const systemStats = [
    { label: 'CPU', value: '23%', color: 'cyan' },
    { label: 'RAM', value: '45%', color: 'purple' },
    { label: 'NET', value: '78%', color: 'green' },
    { label: 'GPU', value: '12%', color: 'pink' }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Sidebar */}
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-black/95 backdrop-blur-md border-r border-cyan-500/30 z-50 overflow-hidden"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/5 to-transparent" />
            
            {/* Header */}
            <div className="relative p-6 border-b border-cyan-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img 
                      src="/drawer_logo.png" 
                      alt="Logo" 
                      className="w-12 h-12 rounded-lg"
                    />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      className="absolute -inset-1 border border-cyan-400/50 rounded-lg"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      CYBER MENU
                    </h2>
                    <p className="text-xs text-cyan-300/60 font-mono">NAVIGATION SYSTEM</p>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 rounded-lg bg-red-500/20 border border-red-500/30 hover:border-red-400 transition-all duration-300"
                >
                  <X className="w-5 h-5 text-red-400" />
                </motion.button>
              </div>
              
              {/* Scan Line */}
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute bottom-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              />
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                
                return (
                  <motion.button
                    key={item.id}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group relative overflow-hidden ${
                      isActive 
                        ? `bg-${item.color}-500/20 border border-${item.color}-500/50` 
                        : 'hover:bg-white/5 border border-transparent hover:border-white/10'
                    }`}
                  >
                    <div className={`p-2 rounded-lg bg-${item.color}-500/20 border border-${item.color}-500/30 group-hover:border-${item.color}-400 transition-all duration-300`}>
                      <Icon className={`w-5 h-5 text-${item.color}-400 group-hover:text-${item.color}-300`} />
                    </div>
                    <span className={`font-mono text-sm ${isActive ? `text-${item.color}-300` : 'text-white/70 group-hover:text-white'}`}>
                      {item.label}
                    </span>
                    
                    {/* Hover effect */}
                    <motion.div
                      animate={{ x: isActive ? 0 : '-100%' }}
                      className={`absolute left-0 top-0 bottom-0 w-1 bg-${item.color}-400`}
                    />
                    
                    {/* Scan effect on hover */}
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                      className={`absolute inset-0 bg-gradient-to-r from-transparent via-${item.color}-400/10 to-transparent opacity-0 group-hover:opacity-100`}
                    />
                  </motion.button>
                )
              })}
            </div>

            {/* System Stats */}
            <div className="p-4 border-t border-cyan-500/30">
              <div className="mb-3">
                <h3 className="text-sm font-mono text-cyan-300 mb-2 flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  SYSTEM STATUS
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {systemStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`p-2 bg-${stat.color}-500/10 border border-${stat.color}-500/30 rounded-lg`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono text-${stat.color}-300`}>{stat.label}</span>
                        <span className={`text-xs font-bold text-${stat.color}-400`}>{stat.value}</span>
                      </div>
                      <div className={`mt-1 h-1 bg-black/50 rounded-full overflow-hidden`}>
                        <motion.div
                          animate={{ width: stat.value }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className={`h-full bg-${stat.color}-400 rounded-full`}
                          style={{ width: stat.value }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Animes */}
            <div className="p-4 border-t border-cyan-500/30 flex-1 overflow-y-auto">
              <h3 className="text-sm font-mono text-cyan-300 mb-3 flex items-center">
                <Database className="w-4 h-4 mr-2" />
                ANIMES RECENTES
              </h3>
              <div className="space-y-2">
                {animes.slice(0, 4).map((anime, index) => (
                  <motion.button
                    key={anime.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onSelectAnime(anime)
                      onClose()
                    }}
                    className="w-full flex items-center space-x-3 p-2 rounded-lg bg-white/5 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 transition-all duration-300 group"
                  >
                    <div className="relative">
                      <img 
                        src={anime.coverImage.medium} 
                        alt={anime.title.romaji}
                        className="w-12 h-16 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="text-sm font-medium text-white group-hover:text-cyan-300 truncate">
                        {anime.title.romaji}
                      </h4>
                      <p className="text-xs text-white/50 group-hover:text-cyan-400/70 truncate">
                        {anime.genres.slice(0, 2).join(', ')}
                      </p>
                      <div className="flex items-center mt-1">
                        <Star className="w-3 h-3 text-yellow-400 mr-1" />
                        <span className="text-xs text-yellow-400">{anime.averageScore || 'N/A'}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-50" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Sidebar
