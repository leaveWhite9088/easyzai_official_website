'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import type { Problem, Step } from '@/types/content'
import SectionLabel from './ui/SectionLabel'
import LineSidebar from './bits/LineSidebar'

function StepIcon({ i }: { i: number }) {
  const paths = [
    // understand — magnifier
    'M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z',
    // research — beaker
    'M9 3h6M10 3v5.5L5.5 18a2 2 0 001.8 3h9.4a2 2 0 001.8-3L14 8.5V3',
    // deliver — cube
    'M21 8l-9-5-9 5m18 0l-9 5m9-5v8l-9 5m0-8L3 8m9 5v8M3 8v8l9 5',
    // iterate — refresh
    'M4 4v5h5M20 20v-5h-5M20 9a8 8 0 00-15-2M4 15a8 8 0 0015 2',
  ]
  return (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[i] || paths[0]} />
    </svg>
  )
}

export default function Services() {
  const t = useTranslations('services')
  const problems = t.raw('problems') as Problem[]
  const steps = t.raw('steps') as Step[]

  return (
    <section id="services" className="site-section site-mobile-static bg-bg-base">
      <div className="site-container">
        {/* Part 1: Problems */}
        <div className="pb-20 sm:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="site-section-header"
          >
            <SectionLabel>The Problems</SectionLabel>
            <h2 className="text-h1 text-text-primary max-w-3xl text-balance">{t('problemsTitle')}</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
          >
            <LineSidebar
              items={problems.map((problem) => ({
                label: problem.title,
                description: problem.desc,
              }))}
              accentColor="rgb(var(--c-accent))"
              textColor="rgb(var(--c-text-secondary))"
              markerColor="rgb(var(--c-text-tertiary) / 0.45)"
              showIndex
              showMarker
              markerLength={40}
              markerGap={20}
              itemGap={32}
              fontSize={1}
              proximityRadius={140}
              maxShift={18}
              falloff="smooth"
            />
          </motion.div>
        </div>

        {/* Part 2: Methodology */}
        <div className="border-t border-border-subtle/70 pt-20 sm:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="site-section-header"
          >
            <SectionLabel>Our Approach</SectionLabel>
            <h2 className="text-h1 text-text-primary">{t('methodTitle')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="method-card group relative py-8 text-left border-t border-border-subtle lg:py-10"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink/[0.08] text-text-tertiary group-hover:text-text-secondary transition-colors duration-300">
                    <StepIcon i={i} />
                  </span>
                  <span className="font-mono text-[26px] tabular-nums text-text-tertiary group-hover:text-text-secondary transition-colors duration-300">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-[15px] font-medium text-text-primary mb-2">{step.title}</h3>
                <p className="text-[13.5px] text-text-secondary leading-relaxed mb-5">{step.desc}</p>
                <div className="border-t border-border-subtle pt-5">
                  <p className="text-[14px] text-text-secondary/90 leading-relaxed">{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
