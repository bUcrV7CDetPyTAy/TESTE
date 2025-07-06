import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ErrorBoundary } from './components/ErrorBoundary'
import HomePage from './components/HomePage'
import VideoPlayer from './components/VideoPlayer'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import CyberBackground from './components/CyberBackground'
import { Anime } from './types/anime'
import './App.css'

function App() {
  const [animes, setAnimes] = useState<Anime[]>([])
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Carregar dados dos animes
    fetch('/data/animes.json')
      .then(response => response.json())
      .then(data => {
        setAnimes(data)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Erro ao carregar animes:', error)
        setIsLoading(false)
      })
  }, [])

  const filteredAnimes = animes.filter(anime =>
    anime.title.romaji.toLowerCase().includes(searchTerm.toLowerCase()) ||
    anime.title.english?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    anime.genres.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"
            />
          </div>
          <motion.h2
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            INICIANDO SISTEMA...
          </motion.h2>
          <div className="mt-4 text-cyan-300 font-mono text-sm">
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
            >
              ▓
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
            >
              ▓
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
            >
              ▓
            </motion.span>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
          {/* Background Cyberpunk */}
          <CyberBackground />
          
          {/* Sidebar */}
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)}
            animes={animes}
            onSelectAnime={setSelectedAnime}
          />
          
          {/* Main Content */}
          <div className="relative z-10">
            {/* Header */}
            <Header 
              onMenuClick={() => setSidebarOpen(!sidebarOpen)}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            
            {/* Content Area */}
            <main className="pt-20">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route 
                    path="/" 
                    element={
                      <HomePage 
                        animes={filteredAnimes}
                        onSelectAnime={setSelectedAnime}
                      />
                    } 
                  />
                  <Route 
                    path="/watch/:id" 
                    element={
                      <VideoPlayer 
                        anime={selectedAnime}
                        onBack={() => setSelectedAnime(null)}
                      />
                    } 
                  />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
          
          {/* Overlay when sidebar is open */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App
