'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

// Animates the first numeric part of a metric string (e.g. "80%+", "3x+")
// counting up from zero when it scrolls into view. Non-numeric parts are kept.
export default function AnimatedMetric({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const match = value.match(/[\d.]+/)
    if (!inView || !match) {
      setDisplay(value)
      return
    }
    if (reduceMotion) {
      setDisplay(value)
      return
    }
    const target = parseFloat(match[0])
    const decimals = (match[0].split('.')[1] || '').length
    const duration = 1100
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const current = (target * eased).toFixed(decimals)
      setDisplay(value.replace(match[0], current))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, reduceMotion])

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ''}`}>
      {display}
    </span>
  )
}
