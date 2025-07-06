import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Play, Star, Calendar, Users, Zap, Eye, Heart, Download } from 'lucide-react'
import { Anime } from '../types/anime'

interface HomePageProps {
  animes: Anime[]
  onSelectAnime: (anime: Anime) => void
}

const HomePage: React.FC<HomePageProps> = ({ animes, onSelectAnime }) => {
  const navigate = useNavigate()
  const [hoveredAnime, setHoveredAnime] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'TODOS', color: 'cyan' },
    { id: 'cyberpunk', label: 'CYBERPUNK', color: 'purple' },
    { id: 'mecha', label: 'MECHA', color: 'pink' },
    { id: 'sci-fi', label: 'SCI-FI', color: 'green' },
    { id: 'action', label: 'AÇÃO', color: 'orange' }
  ]

  const filteredAnimes = selectedCategory === 'all' 
    ? animes 
    : animes.filter(anime => 
        anime.genres.some(genre => 
          genre.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      )

  const featuredAnime = animes[0]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen pt-8 pb-20"
    >
      {/* Hero Section */}
      {featuredAnime && (
        <motion.section
          variants={itemVariants}
          className="relative h-[70vh] mb-12 mx-4 rounded-2xl overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={featuredAnime.bannerImage || featuredAnime.coverImage.large}
              alt={featuredAnime.title.romaji}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          {/* Cyber Effects */}
          <div className="absolute inset-0">
            {/* Scan lines */}
            <motion.div
              animate={{ y: [0, '100%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
            />
            
            {/* Glitch effect */}
            <motion.div
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 mix-blend-overlay"
            />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center px-8 md:px-16">
            <div className="max-w-2xl">
              <motion.h1
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                {featuredAnime.title.romaji}
              </motion.h1>
              
              <motion.p
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-lg text-white/80 mb-6 leading-relaxed"
              >
                {featuredAnime.description?.slice(0, 200)}...
              </motion.p>

              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex items-center space-x-6 mb-8"
              >
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">{featuredAnime.averageScore || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-400">{featuredAnime.seasonYear}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400">{featuredAnime.popularity?.toLocaleString()}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="flex space-x-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,255,255,0.6)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onSelectAnime(featuredAnime)
                    navigate(`/watch/${featuredAnime.id}`)
                  }}
                  className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-bold text-black hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 relative overflow-hidden group"
                >
                  <Play className="w-6 h-6" />
                  <span>ASSISTIR AGORA</span>
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-3 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  <Heart className="w-5 h-5 text-pink-400" />
                  <span>FAVORITAR</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Categories */}
      <motion.section variants={itemVariants} className="mb-8 px-4">
        <div className="flex items-center space-x-4 overflow-x-auto pb-4">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-mono text-sm whitespace-nowrap transition-all duration-300 ${
                selectedCategory === category.id
                  ? `bg-${category.color}-500/20 border border-${category.color}-500/50 text-${category.color}-300`
                  : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Zap className={`w-4 h-4 ${selectedCategory === category.id ? `text-${category.color}-400` : 'text-white/50'}`} />
              <span>{category.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Anime Grid */}
      <motion.section variants={itemVariants} className="px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {filteredAnimes.map((anime, index) => (
            <motion.div
              key={anime.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, z: 10 }}
              onHoverStart={() => setHoveredAnime(anime.id)}
              onHoverEnd={() => setHoveredAnime(null)}
              className="relative group cursor-pointer"
              onClick={() => {
                onSelectAnime(anime)
                navigate(`/watch/${anime.id}`)
              }}
            >
              {/* Card */}
              <div className="relative bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={anime.coverImage.large}
                    alt={anime.title.romaji}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Hover Overlay */}
                  <motion.div
                    animate={{ opacity: hoveredAnime === anime.id ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                  />
                  
                  {/* Play Button */}
                  <motion.div
                    animate={{ 
                      opacity: hoveredAnime === anime.id ? 1 : 0,
                      scale: hoveredAnime === anime.id ? 1 : 0.8
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="p-4 bg-cyan-500/20 backdrop-blur-md rounded-full border border-cyan-400/50">
                      <Play className="w-8 h-8 text-cyan-400" />
                    </div>
                  </motion.div>

                  {/* Score Badge */}
                  {anime.averageScore && (
                    <div className="absolute top-2 right-2 flex items-center space-x-1 px-2 py-1 bg-black/70 backdrop-blur-md rounded-lg">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs text-yellow-400 font-bold">{anime.averageScore}</span>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-2 left-2 px-2 py-1 bg-green-500/20 backdrop-blur-md rounded-lg border border-green-400/50">
                    <span className="text-xs text-green-400 font-mono">{anime.status}</span>
                  </div>

                  {/* Glow Effect */}
                  <motion.div
                    animate={{ 
                      opacity: hoveredAnime === anime.id ? 1 : 0,
                      scale: hoveredAnime === anime.id ? 1 : 0.8
                    }}
                    className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-xl blur-sm"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 truncate mb-2">
                    {anime.title.romaji}
                  </h3>
                  
                  <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                    <span>{anime.seasonYear}</span>
                    <span>{anime.episodes} eps</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {anime.genres.slice(0, 2).map((genre) => (
                      <span 
                        key={genre}
                        className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full font-mono"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <motion.div
                    animate={{ 
                      opacity: hoveredAnime === anime.id ? 1 : 0,
                      y: hoveredAnime === anime.id ? 0 : 10
                    }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-pink-500/20 border border-pink-400/50 rounded-lg hover:bg-pink-500/30 transition-all duration-300"
                      >
                        <Heart className="w-4 h-4 text-pink-400" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-green-500/20 border border-green-400/50 rounded-lg hover:bg-green-500/30 transition-all duration-300"
                      >
                        <Download className="w-4 h-4 text-green-400" />
                      </motion.button>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-white/50">
                      <Eye className="w-4 h-4" />
                      <span className="text-xs">{anime.popularity?.toLocaleString()}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Scan Line Effect */}
                <motion.div
                  animate={{ 
                    y: hoveredAnime === anime.id ? ['-100%', '100%'] : '-100%' 
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: hoveredAnime === anime.id ? Infinity : 0,
                    ease: 'linear'
                  }}
                  className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  )
}

export default HomePage
