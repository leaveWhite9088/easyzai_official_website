'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function TrustBar() {
  const t = useTranslations('trustBar')

  return (
    <section className="site-section site-mobile-static min-h-svh flex items-center bg-bg-base overflow-hidden">
      {/* Subtle top glow — continuation from hero */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgb(var(--c-ink) / 0.04) 0%, transparent 100%)' }}
      />
      {/* Faint accent aura behind the statement */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-64 w-[60%] rounded-full bg-accent/[0.05] blur-[120px]" />

      <div className="site-container relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/40" />
          <span className="font-mono text-[11px] text-accent tracking-[0.22em] uppercase">{t('eyebrow')}</span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent/40" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.68, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
          className="text-[27px] sm:text-[36px] lg:text-[44px] text-text-primary leading-[1.32] tracking-tight font-medium text-balance"
          style={{ fontFamily: "'Noto Serif SC', 'Source Han Serif SC', 'STSong', serif" }}
        >
          {t('text')}
        </motion.p>
      </div>
    </section>
  )
}
