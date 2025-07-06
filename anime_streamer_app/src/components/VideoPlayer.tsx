import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactPlayer from 'react-player'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  SkipBack, 
  SkipForward, 
  Settings, 
  ArrowLeft,
  Download,
  Heart,
  Share2,
  MoreVertical,
  Layers,
  Zap,
  Eye,
  Clock
} from 'lucide-react'
import { Anime } from '../types/anime'

interface VideoPlayerProps {
  anime: Anime | null
  onBack: () => void
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ anime, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [quality, setQuality] = useState('1080p')
  const [showSettings, setShowSettings] = useState(false)
  const [buffered, setBuffered] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const playerRef = useRef<ReactPlayer>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  const qualities = ['4K', '1080p', '720p', '480p', '360p']

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'Space':
          e.preventDefault()
          setIsPlaying(!isPlaying)
          break
        case 'KeyM':
          setIsMuted(!isMuted)
          break
        case 'KeyF':
          toggleFullscreen()
          break
        case 'ArrowLeft':
          seekTo(currentTime - 10)
          break
        case 'ArrowRight':
          seekTo(currentTime + 10)
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying, isMuted, currentTime])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const seekTo = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, 'seconds')
      setCurrentTime(time)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const showControlsTemporarily = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false)
    }, 3000)
  }

  if (!anime) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Nenhum anime selecionado</h2>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={containerRef}
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-black`}
      onMouseMove={showControlsTemporarily}
    >
      {/* Background Cyber Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Scanning lines */}
        <motion.div
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        />
        
        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-400/50" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-purple-400/50" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-green-400/50" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-pink-400/50" />
      </div>

      {/* Video Player */}
      <div className="relative w-full h-full flex items-center justify-center">
        <ReactPlayer
          ref={playerRef}
          url={anime.streamingEpisodes?.[0]?.url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
          playing={isPlaying}
          muted={isMuted}
          volume={volume}
          width="100%"
          height="100%"
          onProgress={({ played, loaded, playedSeconds }) => {
            setProgress(played)
            setBuffered(loaded)
            setCurrentTime(playedSeconds)
          }}
          onStart={() => {
            setIsLoading(false)
            if (playerRef.current) {
              setDuration(playerRef.current.getDuration())
            }
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onLoadStart={() => setIsLoading(true)}
          onError={(error) => {
            console.error('Erro ao carregar vídeo:', error)
            setIsLoading(false)
          }}
          config={{
            file: {
              attributes: {
                crossOrigin: 'anonymous'
              }
            }
          }}
        />

        {/* Loading Indicator */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-cyan-300 font-mono">CARREGANDO STREAM...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls Overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 pointer-events-none"
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-6 pointer-events-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onBack}
                    className="p-3 bg-black/60 backdrop-blur-md rounded-lg border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300"
                  >
                    <ArrowLeft className="w-6 h-6 text-cyan-400" />
                  </motion.button>

                  <div>
                    <h1 className="text-2xl font-bold text-white">{anime.title.romaji}</h1>
                    <p className="text-cyan-300 text-sm font-mono">
                      EP 1 - {anime.streamingEpisodes?.[0]?.title || 'Episódio 1'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-black/60 backdrop-blur-md rounded-lg border border-purple-500/30 hover:border-purple-400 transition-all duration-300"
                  >
                    <Heart className="w-5 h-5 text-purple-400" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-black/60 backdrop-blur-md rounded-lg border border-green-500/30 hover:border-green-400 transition-all duration-300"
                  >
                    <Download className="w-5 h-5 text-green-400" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-black/60 backdrop-blur-md rounded-lg border border-pink-500/30 hover:border-pink-400 transition-all duration-300"
                  >
                    <Share2 className="w-5 h-5 text-pink-400" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-3 bg-black/60 backdrop-blur-md rounded-lg border border-orange-500/30 hover:border-orange-400 transition-all duration-300"
                  >
                    <Settings className="w-5 h-5 text-orange-400" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-6 bg-black/60 backdrop-blur-md rounded-full border border-cyan-500/50 hover:border-cyan-400 transition-all duration-300 group"
              >
                {isPlaying ? (
                  <Pause className="w-12 h-12 text-cyan-400 group-hover:text-cyan-300" />
                ) : (
                  <Play className="w-12 h-12 text-cyan-400 group-hover:text-cyan-300" />
                )}
              </motion.button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-auto">
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
                  {/* Buffered */}
                  <div 
                    className="absolute left-0 top-0 h-full bg-white/30 transition-all duration-300"
                    style={{ width: `${buffered * 100}%` }}
                  />
                  
                  {/* Progress */}
                  <motion.div 
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                    style={{ width: `${progress * 100}%` }}
                  />
                  
                  {/* Seek handle */}
                  <motion.div
                    className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white shadow-lg"
                    style={{ left: `calc(${progress * 100}% - 8px)` }}
                    whileHover={{ scale: 1.2 }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                {/* Left Controls */}
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => seekTo(currentTime - 10)}
                    className="p-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/20 hover:border-cyan-400 transition-all duration-300"
                  >
                    <SkipBack className="w-5 h-5 text-white" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-300"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-black" />
                    ) : (
                      <Play className="w-6 h-6 text-black" />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => seekTo(currentTime + 10)}
                    className="p-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/20 hover:border-cyan-400 transition-all duration-300"
                  >
                    <SkipForward className="w-5 h-5 text-white" />
                  </motion.button>

                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/20 hover:border-cyan-400 transition-all duration-300"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 text-white" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-white" />
                      )}
                    </motion.button>

                    <div className="w-20 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-400 transition-all duration-300"
                        style={{ width: `${volume * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-white font-mono text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                {/* Right Controls */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/20">
                    <Layers className="w-4 h-4 text-white" />
                    <span className="text-white font-mono text-sm">{quality}</span>
                  </div>

                  <div className="flex items-center space-x-2 px-3 py-2 bg-black/60 backdrop-blur-md rounded-lg border border-green-500/30">
                    <Eye className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-mono text-sm">LIVE</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleFullscreen}
                    className="p-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/20 hover:border-cyan-400 transition-all duration-300"
                  >
                    {isFullscreen ? (
                      <Minimize className="w-5 h-5 text-white" />
                    ) : (
                      <Maximize className="w-5 h-5 text-white" />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute top-20 right-6 w-80 bg-black/90 backdrop-blur-md border border-cyan-500/30 rounded-lg p-6 pointer-events-auto"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-cyan-400" />
              CONFIGURAÇÕES
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-mono mb-2">QUALIDADE</label>
                <div className="space-y-2">
                  {qualities.map((q) => (
                    <motion.button
                      key={q}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setQuality(q)}
                      className={`w-full p-2 rounded-lg text-left transition-all duration-300 ${
                        quality === q
                          ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300'
                          : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-mono mb-2">VOLUME</label>
                <div className="flex items-center space-x-3">
                  <VolumeX className="w-4 h-4 text-white/50" />
                  <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300"
                      style={{ width: `${volume * 100}%` }}
                    />
                  </div>
                  <Volume2 className="w-4 h-4 text-white/50" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default VideoPlayer
