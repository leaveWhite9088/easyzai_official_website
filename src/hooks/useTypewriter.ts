'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// Character-by-character text reveal for a realistic "typing" feel.
// Interval-based (one timer regardless of text length), reduced-motion aware,
// and interruptible via reset() when the user switches inputs.
export function useTypewriter() {
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const reduceMotion = useReducedMotion()

  const clear = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }
  useEffect(() => clear, [])

  const type = (full: string, opts?: { cps?: number; onDone?: () => void }) => {
    clear()
    if (reduceMotion) {
      setText(full)
      setTyping(false)
      opts?.onDone?.()
      return
    }
    setTyping(true)
    setText('')
    const cps = opts?.cps ?? 42 // characters per second
    let i = 0
    intervalRef.current = window.setInterval(() => {
      i += 1
      setText(full.slice(0, i))
      if (i >= full.length) {
        clear()
        setTyping(false)
        opts?.onDone?.()
      }
    }, 1000 / cps)
  }

  const reset = () => {
    clear()
    setText('')
    setTyping(false)
  }

  return { text, typing, type, reset }
}
