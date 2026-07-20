'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import type { CompareRow } from '@/types/content'

function PartIcon({ type }: { type: 'team' | 'compare' | 'shield' }) {
  if (type === 'team') {
    return (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    )
  }
  if (type === 'compare') {
    return (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    )
  }
  return (
    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  )
}

export default function WhyUs() {
  const t = useTranslations('whyUs')
  const compareRows = t.raw('compareRows') as CompareRow[]
  const commitments = t.raw('commitments') as string[]

  return (
    <section id="why-us" className="site-section site-mobile-static bg-bg-base">
      <div className="site-container">
        {/* Part A: Who We Are */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-20 sm:mb-28 max-w-2xl"
        >
          <div className="flex items-center gap-2.5 mb-4">
            <PartIcon type="team" />
            <span className="font-mono text-[11px] text-accent tracking-widest uppercase">
              Part A
            </span>
          </div>
          <h2 className="text-h1 text-text-primary mb-5">
            {t('whoTitle')}
          </h2>
          <p className="text-[16px] text-text-secondary leading-relaxed">
            {t('whoText')}
          </p>
        </motion.div>

        {/* Part B: Comparison */}
        <div className="mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-10"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <PartIcon type="compare" />
              <span className="font-mono text-[11px] text-accent tracking-widest uppercase">
                Part B
              </span>
            </div>
            <h2 className="text-h2 text-text-primary">
              {t('compareTitle')}
            </h2>
          </motion.div>

          <div>
            <div className="hidden sm:grid grid-cols-[1fr_auto_1fr] items-center gap-4 pb-3 mb-2 border-b border-border-subtle">
              <div className="text-[13px] font-medium text-text-tertiary sm:text-right">
                {t('compareLeftLabel')}
              </div>
              <div className="w-px h-4 bg-border-subtle" />
              <div className="text-[13px] font-medium text-accent">
                {t('compareRightLabel')}
              </div>
            </div>

            {compareRows.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.12 + i * 0.07 }}
                className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-start sm:items-center gap-1.5 sm:gap-4 py-3 border-b border-border-subtle/40 sm:border-b-0"
              >
                <div className="text-[14px] text-text-secondary order-1 sm:order-none sm:text-right">
                  {row.problem}
                </div>
                <div className="hidden sm:block w-px h-4 bg-border-subtle/50" />
                <div className="text-[14px] text-text-primary order-2 sm:order-none flex items-start gap-2">
                  <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-accent/70 sm:hidden" />
                  {row.solution}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Part C: Commitment */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <PartIcon type="shield" />
              <span className="font-mono text-[11px] text-accent tracking-widest uppercase">
                Part C
              </span>
            </div>
            <h2 className="text-h2 text-text-primary">
              {t('commitmentTitle')}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[16px] text-text-secondary mb-8 max-w-2xl leading-relaxed"
          >
            {t('commitmentIntro')}
          </motion.p>

          <div className="space-y-3 mb-12">
            {commitments.map((commitment, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.18 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex items-center gap-3"
              >
                <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                <span className="text-[15px] text-text-primary">{commitment}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
