"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  repoUrl: string
}

export function ProjectCard({ title, description, image, tags, demoUrl, repoUrl }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{
        y: -10,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full perspective-1000"
    >
      <Card className="overflow-hidden h-full flex flex-col bg-card/50 backdrop-blur-sm border-2 border-primary/10 dark:border-primary/5 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative overflow-hidden aspect-video">
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
            animate={{
              scale: isHovered ? 1.1 : 1,
              filter: isHovered ? "brightness(0.8)" : "brightness(1)",
            }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="absolute bottom-4 left-4 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex gap-2">
              <Button size="sm" variant="default" asChild className="rounded-full">
                <Link href={demoUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
              <Button size="sm" variant="outline" asChild className="rounded-full bg-background/80 backdrop-blur-sm">
                <Link href={repoUrl} target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
        <CardContent className="flex-1 p-6">
          <motion.h3
            className="text-2xl font-bold mb-2"
            animate={{
              color: isHovered ? "hsl(var(--primary))" : "hsl(var(--foreground))",
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-secondary/50 backdrop-blur-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
