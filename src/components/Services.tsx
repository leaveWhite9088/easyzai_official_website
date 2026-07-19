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

          {/* Step timeline: vertical spine on mobile, horizontal on lg. */}
          <ol className="relative">
            <span
              aria-hidden
              className="absolute left-[5px] top-2 bottom-2 w-px bg-border-subtle lg:left-0 lg:right-0 lg:top-[5px] lg:bottom-auto lg:h-px lg:w-auto"
            />
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-4 lg:gap-12">
              {steps.map((step, i) => (
                <motion.li
                  key={step.number}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative pl-10 lg:pl-0 lg:pt-10"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-[6px] h-[11px] w-[11px] rounded-full border-2 border-accent/50 bg-bg-base transition-colors duration-300 group-hover:border-accent group-hover:bg-accent/25 lg:top-0"
                  />
                  <h3 className="text-[19px] font-medium text-text-primary mb-2">{step.title}</h3>
                  <p className="text-[14px] text-text-secondary leading-relaxed mb-4">{step.desc}</p>
                  <p className="border-l border-border-subtle pl-3 text-[13px] text-text-tertiary leading-relaxed">
                    {step.detail}
                  </p>
                </motion.li>
              ))}
            </div>
          </ol>
        </div>
      </div>
    </section>
  )
}
