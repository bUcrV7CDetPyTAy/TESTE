import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const CyberBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Partículas flutuantes
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      alpha: number
    }> = []

    // Criar partículas
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: ['#00ffff', '#ff00ff', '#00ff00', '#ff0080'][Math.floor(Math.random() * 4)],
        alpha: Math.random() * 0.5 + 0.1
      })
    }

    // Linhas de conexão
    const connections: Array<{
      x1: number
      y1: number
      x2: number
      y2: number
      alpha: number
    }> = []

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Atualizar partículas
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce nas bordas
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Desenhar partícula
        ctx.save()
        ctx.globalAlpha = particle.alpha
        ctx.fillStyle = particle.color
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Desenhar conexões entre partículas próximas
      connections.length = 0
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const alpha = (100 - distance) / 100 * 0.2
            connections.push({
              x1: particles[i].x,
              y1: particles[i].y,
              x2: particles[j].x,
              y2: particles[j].y,
              alpha
            })
          }
        }
      }

      // Desenhar conexões
      connections.forEach(connection => {
        ctx.save()
        ctx.globalAlpha = connection.alpha
        ctx.strokeStyle = '#00ffff'
        ctx.lineWidth = 1
        ctx.shadowBlur = 5
        ctx.shadowColor = '#00ffff'
        ctx.beginPath()
        ctx.moveTo(connection.x1, connection.y1)
        ctx.lineTo(connection.x2, connection.y2)
        ctx.stroke()
        ctx.restore()
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="fixed inset-0 z-0">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Scan Lines */}
      <motion.div
        animate={{ y: ['-100%', '100vh'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"
      />
      
      <motion.div
        animate={{ y: ['100vh', '-100%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: 2 }}
        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-20"
      />

      {/* Floating Geometric Shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotation: 0
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ],
            rotation: 360
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute w-4 h-4 border border-cyan-400/30"
          style={{
            boxShadow: '0 0 10px rgba(0,255,255,0.3)'
          }}
        />
      ))}

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400 opacity-60" />
        <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-400 rounded-full opacity-80" />
      </div>

      <div className="absolute top-0 right-0 w-32 h-32">
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-purple-400 opacity-60" />
        <div className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full opacity-80" />
      </div>

      <div className="absolute bottom-0 left-0 w-32 h-32">
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-green-400 opacity-60" />
        <div className="absolute bottom-2 left-2 w-2 h-2 bg-green-400 rounded-full opacity-80" />
      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32">
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-pink-400 opacity-60" />
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-pink-400 rounded-full opacity-80" />
      </div>

      {/* Glitch Effect Overlay */}
      <motion.div
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 5 }}
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 mix-blend-overlay"
      />
    </div>
  )
}

export default CyberBackground
