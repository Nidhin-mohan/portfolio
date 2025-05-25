"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    const mouse = { x: 0, y: 0, radius: 150 }

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Define Particle class first
    class Particle {
      x: number
      y: number
      size: number
      baseX: number
      baseY: number
      density: number
      color: string
      distance: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.baseX = this.x
        this.baseY = this.y
        this.size = Math.random() * 3 + 1
        this.density = Math.random() * 30 + 1
        this.distance = 0

        // Create a gradient from primary to accent color
        const hue = Math.random() * 60 + 210 // Blue to purple range
        const saturation = Math.random() * 50 + 50
        const lightness = Math.random() * 20 + 50
        this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${Math.random() * 0.5 + 0.3})`
      }

      update() {
        // Calculate distance between mouse and particle
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        this.distance = Math.sqrt(dx * dx + dy * dy)

        // Create repulsion force
        const forceDirectionX = dx / this.distance
        const forceDirectionY = dy / this.distance
        const maxDistance = mouse.radius
        const force = (maxDistance - this.distance) / maxDistance
        const directionX = forceDirectionX * force * this.density
        const directionY = forceDirectionY * force * this.density

        // If particle is close to mouse, move it away
        if (this.distance < mouse.radius) {
          this.x -= directionX
          this.y -= directionY
        } else {
          // If particle is away from its original position, move it back slowly
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX
            this.x -= dx / 20
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY
            this.y -= dy / 20
          }
        }
      }

      draw() {
        ctx!.fillStyle = this.color
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    function initParticles() {
      particles = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000)

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function connectParticles() {
      const maxDistance = 150

      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx!.strokeStyle = `rgba(120, 160, 255, ${opacity * 0.3})`
            ctx!.lineWidth = 0.6
            ctx!.beginPath()
            ctx!.moveTo(particles[a].x, particles[a].y)
            ctx!.lineTo(particles[b].x, particles[b].y)
            ctx!.stroke()
          }
        }
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      connectParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/70 dark:from-background dark:via-background/90 dark:to-background/80 z-10" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </motion.div>
  )
}
