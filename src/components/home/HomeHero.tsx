// 01 / INTRO — Home hero.
// Full-viewport marble video as background, hairline frame corners, editorial
// title centered, English tagline at the bottom, scroll cue on the right.
'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export default function HomeHero() {
  const t = useTranslations('home.intro')

  return (
    <section
      id="01"
      className="relative overflow-hidden bg-canvas"
      style={{ minHeight: '100svh' }}
    >
      {/* Hero video — 大理石 dolly (AI-generated, 6s loop) */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/hero-4.mp4"
      >
        <source src="/assets/hero-4.mp4" type="video/mp4" />
      </video>

      {/* White veil — guarantees text contrast against the marble texture */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/5 to-white/40 pointer-events-none"
      />

      {/* 4-corner hairline frame */}
      <div aria-hidden className="pointer-events-none absolute inset-4 sm:inset-8 lg:inset-12">
        <span className="absolute top-0 left-0 h-[18px] w-[18px] border-t border-l border-ink" />
        <span className="absolute top-0 right-0 h-[18px] w-[18px] border-t border-r border-ink" />
        <span className="absolute bottom-0 left-0 h-[18px] w-[18px] border-b border-l border-ink" />
        <span className="absolute bottom-0 right-0 h-[18px] w-[18px] border-b border-r border-ink" />
      </div>

      <div className="relative mx-auto max-w-wide px-6 sm:px-10" style={{ minHeight: '100svh' }}>
        {/* Top: section number + index */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="absolute left-6 right-6 top-6 sm:left-10 sm:right-10 sm:top-10 flex items-start justify-between"
        >
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">
            <span className="text-ink">01</span>
            <span className="mx-1.5 text-ink-3">/</span>04 — intro
          </div>
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3 text-right">
            {t('index')}
          </div>
        </motion.div>

        {/* Middle: editorial serif title — the one serif on the home page */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="absolute left-6 right-6 sm:left-10 sm:right-10"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          <h1
            className="font-serif font-light text-ink leading-[1.02] tracking-[-0.01em]"
            style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}
          >
            {t('titleLine1')}
            <br />
            <span className="text-ink-2">{t('titleLine2')}</span>
          </h1>
        </motion.div>

        {/* Bottom: English tagline + scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.36 }}
          className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex items-end justify-between"
        >
          <div className="max-w-[420px]">
            <p className="font-serif italic text-ink-2 text-[15px] sm:text-[17px] leading-[1.55]">
              {t('tagline')}
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-center gap-2 text-ink-3 font-mono text-[10px] tracking-[0.18em] uppercase">
            <span>scroll</span>
            <span className="h-10 w-px bg-ink-3/60" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
