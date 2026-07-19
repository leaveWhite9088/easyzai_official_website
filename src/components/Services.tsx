'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import type { Problem, Step } from '@/types/content'
import SectionLabel from './ui/SectionLabel'
import LineSidebar from './bits/LineSidebar'

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

          {/* Step rows: number + title + one-liner sit on the hairline axis,
              the long-form detail reads below at a comfortable size. */}
          <ol>
            {steps.map((step, i) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group border-t border-border-subtle py-8 lg:py-10 last:border-b"
              >
                <div className="flex flex-col gap-2 lg:grid lg:grid-cols-[72px_1fr_1.6fr] lg:items-baseline lg:gap-8 mb-4 lg:mb-5">
                  <span className="font-mono text-[13px] tracking-[0.2em] text-accent">{step.number}</span>
                  <h3 className="text-xl lg:text-2xl font-medium text-text-primary transition-colors duration-300 group-hover:text-accent">
                    {step.title}
                  </h3>
                  <p className="text-[15px] lg:text-base text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
                <p className="text-[14px] lg:text-[15px] text-text-tertiary leading-relaxed max-w-3xl lg:col-start-2 lg:ml-[104px]">
                  {step.detail}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
