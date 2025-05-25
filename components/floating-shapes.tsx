"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Shape {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  color: string
  delay: number
  duration: number
  type: "circle" | "square" | "triangle" | "donut"
}

export function FloatingShapes() {
  const [shapes, setShapes] = useState<Shape[]>([])

  useEffect(() => {
    // Generate random shapes
    const newShapes: Shape[] = []
    const types: ("circle" | "square" | "triangle" | "donut")[] = ["circle", "square", "triangle", "donut"]

    for (let i = 0; i < 15; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 10,
        rotation: Math.random() * 360,
        color: `hsla(${Math.random() * 60 + 210}, 70%, 60%, ${Math.random() * 0.15 + 0.05})`,
        delay: Math.random() * 5,
        duration: Math.random() * 20 + 15,
        type: types[Math.floor(Math.random() * types.length)],
      })
    }

    setShapes(newShapes)
  }, [])

  const renderShape = (shape: Shape) => {
    switch (shape.type) {
      case "circle":
        return (
          <div
            className="absolute rounded-full"
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              backgroundColor: shape.color,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              transform: `rotate(${shape.rotation}deg)`,
            }}
          />
        )
      case "square":
        return (
          <div
            className="absolute rounded-md"
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              backgroundColor: shape.color,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              transform: `rotate(${shape.rotation}deg)`,
            }}
          />
        )
      case "triangle":
        return (
          <div
            className="absolute"
            style={{
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              transform: `rotate(${shape.rotation}deg)`,
            }}
          />
        )
      case "donut":
        return (
          <div
            className="absolute rounded-full border-4"
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              borderColor: shape.color,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              transform: `rotate(${shape.rotation}deg)`,
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          initial={{ x: `${shape.x}%`, y: `${shape.y}%`, rotate: shape.rotation, opacity: 0 }}
          animate={{
            x: [`${shape.x}%`, `${shape.x + (Math.random() * 10 - 5)}%`],
            y: [`${shape.y}%`, `${shape.y + (Math.random() * 10 - 5)}%`],
            rotate: [shape.rotation, shape.rotation + 360],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: shape.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: shape.delay,
            times: [0, 0.5, 1],
          }}
          className="absolute"
        >
          {renderShape(shape)}
        </motion.div>
      ))}
    </div>
  )
}
