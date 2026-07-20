'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SplitText from './SplitText'
import { useTheme } from './theme/ThemeProvider'

const Ferrofluid = dynamic(() => import('./Ferrofluid'), { ssr: false })

export default function Hero() {
  const t = useTranslations('hero')
  const { theme } = useTheme()
  const reduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const [largeScreen, setLargeScreen] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [heroVisible, setHeroVisible] = useState(true)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const sync = () => setLargeScreen(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const sync = () => setPageVisible(document.visibilityState === 'visible')
    sync()
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [])

  useEffect(() => {
    const section = heroRef.current
    if (!section) return
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), {
      rootMargin: '120px 0px',
    })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const showFluid = theme === 'dark' && largeScreen && pageVisible && heroVisible && !reduceMotion

  return (
    <section ref={heroRef} id="hero" className="relative overflow-hidden min-h-svh flex items-center py-20 sm:py-24" style={{ backgroundColor: 'rgb(var(--c-hero))' }}>
      {/* Dark mode keeps the ferrofluid field. Light mode uses a quiet
          paper-and-graphite texture, so contrast never depends on WebGL. */}
      {showFluid && (
        <div className="hero-dark-beams absolute inset-0">
          <Ferrofluid
            colors={['#d8b67f', '#be9a63', '#6f5836']}
            speed={0.3}
            scale={1.6}
            turbulence={1}
            fluidity={0.1}
            rimWidth={0.2}
            sharpness={2.5}
            shimmer={1.5}
            glow={2}
            flowDirection="down"
            opacity={1}
            mouseInteraction
            mouseStrength={1}
            mouseRadius={0.35}
          />
        </div>
      )}
      <div aria-hidden className="hero-static-texture absolute inset-0 pointer-events-none" />
      <div aria-hidden className="hero-light-texture absolute inset-0 pointer-events-none" />

      {/* Bottom divider line — thin white glow */}
      <div
        className="hero-divider absolute bottom-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{
          background: 'linear-gradient(90deg, transparent 5%, rgb(var(--c-ink) / 0.1) 30%, rgb(var(--c-ink) / 0.14) 50%, rgb(var(--c-ink) / 0.1) 70%, transparent 95%)',
        }}
      />

      {/* Bottom white glow — fades upward from the divider line */}
      <div
        className="hero-bottom-glow absolute bottom-0 left-0 right-0 pointer-events-none z-10"
        style={{
          height: '1000px',
          background: 'linear-gradient(to top, rgb(var(--c-ink) / 0.12) 0%, rgb(var(--c-ink) / 0.07) 15%, rgb(var(--c-ink) / 0.035) 35%, rgb(var(--c-ink) / 0.015) 60%, transparent 80%)',
        }}
      />

      <div className="relative z-10 w-full">
        {/* Text content - centered */}
        <div className="hero-mobile-static max-w-content mx-auto px-5 sm:px-6 lg:px-10 text-center">
          {/* A short, layered entrance: readable immediately, settled quickly. */}
          <motion.p
            initial={{ opacity: 0.2, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6 text-[13px] text-text-primary/80 tracking-wide font-medium sm:mb-8 sm:text-[15px]"
          >
            {t('eyebrow')}
          </motion.p>

          {/* Main Title */}
          <SplitText
            text={t('title')}
            tag="h1"
            delay={0.12}
            duration={0.85}
            stagger={0.04}
            from={{ opacity: 0.12, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            className="text-[2.25rem] leading-[1.08] tracking-[-0.025em] font-medium sm:text-display text-text-primary mb-7 sm:mb-8 text-balance mx-auto"
          />

          <motion.p
            initial={{ opacity: 0.16, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[15px] sm:text-[17px] text-text-primary/80 leading-relaxed max-w-2xl mx-auto mb-9 sm:mb-12"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0.12, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.46, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-10 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <a
              href="#cases"
              className="group inline-flex w-full max-w-[280px] items-center justify-center gap-2 px-7 py-3 min-h-[48px] rounded-full text-[15px] font-medium transition-all duration-300 bg-[rgb(var(--c-ink))] text-[rgb(var(--c-hero))] hover:opacity-90 hover:scale-[1.02] sm:w-auto"
            >
              {t('ctaPrimary')}
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex w-full max-w-[280px] items-center justify-center px-7 py-3 min-h-[48px] rounded-full text-[15px] font-medium transition-all duration-300 border border-[rgb(var(--c-ink)/0.25)] text-[rgb(var(--c-ink))] hover:bg-[rgb(var(--c-ink)/0.08)] sm:w-auto"
            >
              {t('ctaSecondary')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
