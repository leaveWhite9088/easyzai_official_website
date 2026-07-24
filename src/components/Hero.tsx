'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

// Temporary stub — replaced in step 5 (feat(home): 首页 7 段实施)
export default function Hero() {
  const t = useTranslations('hero')
  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-svh flex items-center py-20 sm:py-24"
      style={{ backgroundColor: 'rgb(var(--c-bg-base))' }}
    >
      <div aria-hidden className="hero-light-texture absolute inset-0 pointer-events-none" />
      <div className="relative z-10 w-full">
        <div className="max-w-content mx-auto px-5 sm:px-6 lg:px-10 text-center">
          <motion.p
            initial={{ opacity: 0.2, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="mb-6 text-[13px] text-text-primary/80 tracking-wide font-medium sm:mb-8 sm:text-[15px]"
          >
            {t('eyebrow')}
          </motion.p>
          <h1 className="text-[2.25rem] leading-[1.08] tracking-[-0.025em] font-medium sm:text-display text-text-primary mb-7 sm:mb-8 text-balance mx-auto">
            {t('title')}
          </h1>
          <motion.p
            initial={{ opacity: 0.16, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[15px] sm:text-[17px] text-text-primary/80 leading-relaxed max-w-2xl mx-auto mb-9 sm:mb-12"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
