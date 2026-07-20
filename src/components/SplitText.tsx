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
  const units = useMemo(() => {
    // Per-char inline-block spans bypass the browser's CJK line-break rules,
    // so closing punctuation (，。 etc.) can land at a line start. Merge those
    // chars into the preceding unit so they never orphan.
    const noLineStart = new Set('，。、；：？！…·」』）】》”’'.split(''))
    const out: string[] = []
    for (const ch of text) {
      if (noLineStart.has(ch) && out.length > 0) {
        out[out.length - 1] += ch
      } else {
        out.push(ch)
      }
    }
    return out
  }, [text])

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
      {units.map((unit, index) => (
        <motion.span
          key={`${unit}-${index}`}
          className="inline-block"
          variants={childVariants}
          style={{ whiteSpace: unit === ' ' ? 'pre' : 'normal' }}
        >
          {unit === ' ' ? ' ' : unit}
        </motion.span>
      ))}
    </motion.span>
  )

  return React.createElement(tag, { className }, content)
}
