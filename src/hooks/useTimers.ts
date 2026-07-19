'use client'

import { useEffect, useRef } from 'react'

// Centralizes setTimeout bookkeeping so scheduled callbacks can't leak past
// unmount and every timer is cleared on reset. Used by the demo components.
export function useTimers() {
  const timers = useRef<number[]>([])

  const clearAll = () => {
    timers.current.forEach((id) => clearTimeout(id))
    timers.current = []
  }

  const schedule = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  useEffect(() => clearAll, [])

  return { schedule, clearAll }
}
