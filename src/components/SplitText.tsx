'use client'

import { motion } from 'framer-motion'
import React, { useMemo } from 'react'

export interface SplitTextProps {
  text: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  delay?: number
  duration?: number
  stagger?: number
  from?: {
    opacity?: number
    y?: number | string
    x?: number | string
    rotateX?: number
    scale?: number
  }
  to?: {
    opacity?: number
    y?: number | string
    x?: number | string
    rotateX?: number
    scale?: number
  }
  once?: boolean
  threshold?: number
  ease?: [number, number, number, number]
}

export default function SplitText({
  text,
  className = '',
  tag = 'span',
  delay = 0,
  duration = 1.2,
  stagger = 0.04,
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  once = true,
  threshold = 0.1,
  ease = [0.25, 0.46, 0.45, 0.94],
}: SplitTextProps) {
  const chars = useMemo(() => text.split(''), [text])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const childVariants = {
    hidden: from,
    visible: {
      ...to,
      transition: { duration, ease },
    },
  }

  const content = (
    <motion.span
      className="inline-block"
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={containerVariants}
    >
      {chars.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          variants={childVariants}
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </motion.span>
  )

  return React.createElement(tag, { className }, content)
}
