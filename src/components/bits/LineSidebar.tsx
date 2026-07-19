'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import './LineSidebar.css'

const FALLOFF_CURVES: Record<string, (p: number) => number> = {
  linear: (p) => p,
  smooth: (p) => p * p * (3 - 2 * p),
  sharp: (p) => p * p * p,
}

export interface LineSidebarItem {
  label: string
  description?: string
}

interface LineSidebarProps {
  items?: (string | LineSidebarItem)[]
  accentColor?: string
  textColor?: string
  markerColor?: string
  showIndex?: boolean
  showMarker?: boolean
  proximityRadius?: number
  maxShift?: number
  falloff?: 'linear' | 'smooth' | 'sharp'
  markerLength?: number
  markerGap?: number
  tickScale?: number
  scaleTick?: boolean
  itemGap?: number
  fontSize?: number
  smoothing?: number
  defaultActive?: number | null
  onItemClick?: (index: number, label: string) => void
  className?: string
}

export default function LineSidebar({
  items = [],
  accentColor,
  textColor,
  markerColor,
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 30,
  falloff = 'smooth',
  markerLength = 60,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 1.1,
  smoothing = 100,
  defaultActive = null,
  onItemClick,
  className = '',
}: LineSidebarProps) {
  const listRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const targetsRef = useRef<number[]>([])
  const currentRef = useRef<number[]>([])
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef<number>(0)
  const activeRef = useRef<number | null>(defaultActive)
  const smoothingRef = useRef<number>(smoothing)
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultActive)

  activeRef.current = activeIndex
  smoothingRef.current = smoothing

  // Single rAF loop that eases every item's --effect toward its target using
  // frame-rate independent exponential smoothing, so color, shift and scale
  // all move together without staggering CSS transitions.
  const runFrame = useCallback((now: number) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05)
    lastRef.current = now
    const tau = Math.max(smoothingRef.current, 1) / 1000
    const k = 1 - Math.exp(-dt / tau)

    let moving = false
    const itemEls = itemRefs.current
    for (let i = 0; i < itemEls.length; i++) {
      const el = itemEls[i]
      if (!el) continue
      const target = Math.max(targetsRef.current[i] || 0, activeRef.current === i ? 1 : 0)
      const cur = currentRef.current[i] || 0
      const next = cur + (target - cur) * k
      const settled = Math.abs(target - next) < 0.0015
      const value = settled ? target : next
      currentRef.current[i] = value
      el.style.setProperty('--effect', value.toFixed(4))
      if (!settled) moving = true
    }

    rafRef.current = moving ? requestAnimationFrame(runFrame) : null
  }, [])

  const startLoop = useCallback(() => {
    if (rafRef.current != null) return
    lastRef.current = performance.now()
    rafRef.current = requestAnimationFrame(runFrame)
  }, [runFrame])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLUListElement>) => {
      const list = listRef.current
      if (!list) return
      const rect = list.getBoundingClientRect()
      const pointerY = e.clientY - rect.top
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear
      const itemEls = itemRefs.current
      for (let i = 0; i < itemEls.length; i++) {
        const el = itemEls[i]
        if (!el) continue
        const center = el.offsetTop + el.offsetHeight / 2
        const distance = Math.abs(pointerY - center)
        targetsRef.current[i] = ease(Math.max(0, 1 - distance / proximityRadius))
      }
      startLoop()
    },
    [falloff, proximityRadius, startLoop]
  )

  const handlePointerLeave = useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0)
    startLoop()
  }, [startLoop])

  const handleClick = useCallback(
    (index: number, label: string) => {
      setActiveIndex(index)
      onItemClick?.(index, label)
    },
    [onItemClick]
  )

  useEffect(() => {
    startLoop()
  }, [activeIndex, startLoop])

  useEffect(
    () => () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    },
    []
  )

  const normalizedItems: LineSidebarItem[] = items.map((item) =>
    typeof item === 'string' ? { label: item } : item
  )

  const style: React.CSSProperties & Record<string, string | number> = {}
  if (accentColor) style['--accent-color'] = accentColor
  if (textColor) style['--text-color'] = textColor
  if (markerColor) style['--marker-color'] = markerColor
  if (markerLength !== undefined) style['--marker-length'] = `${markerLength}px`
  if (markerGap !== undefined) style['--marker-gap'] = `${markerGap}px`
  if (tickScale !== undefined) style['--tick-scale'] = tickScale
  if (maxShift !== undefined) style['--max-shift'] = `${maxShift}px`
  if (itemGap !== undefined) style['--item-gap'] = `${itemGap}px`
  if (fontSize !== undefined) style['--font-size'] = `${fontSize}rem`
  if (smoothing !== undefined) style['--smoothing'] = `${smoothing}ms`

  return (
    <nav
      className={`line-sidebar${showMarker ? ' line-sidebar--markers' : ''}${
        scaleTick ? ' line-sidebar--scale-tick' : ''
      }${className ? ` ${className}` : ''}`}
      style={style}
    >
      <ul
        ref={listRef}
        className="line-sidebar__list"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {normalizedItems.map((item, index) => (
          <li
            key={`${item.label}-${index}`}
            ref={(el) => {
              itemRefs.current[index] = el
            }}
            className="line-sidebar__item"
            aria-current={activeIndex === index ? 'true' : undefined}
            onClick={() => handleClick(index, item.label)}
          >
            {showMarker && <span className="line-sidebar__marker" aria-hidden="true" />}
            <span className="line-sidebar__label">
              {showIndex && (
                <span className="line-sidebar__index">
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
              <span className="line-sidebar__content">
                <span className="line-sidebar__text">{item.label}</span>
                {item.description && (
                  <span className="line-sidebar__desc">{item.description}</span>
                )}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  )
}
