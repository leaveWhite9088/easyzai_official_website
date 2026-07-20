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

          {/* Vertical axis: numbered nodes straddle the spine, big titles on
              the left, long-form detail on the right. Mobile collapses to a
              left-edge spine with content indented. */}
          <ol className="relative">
            <span
              aria-hidden
              className="absolute left-[19px] top-2 bottom-2 w-px bg-border-subtle lg:left-[calc(25%+2rem)] lg:-translate-x-1/2"
            />
            {steps.map((step, i) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative grid gap-4 py-10 pl-16 lg:grid-cols-[1fr_64px_3fr] lg:gap-x-8 lg:py-9 lg:pl-0"
              >
                <span className="absolute left-0 top-10 flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-bg-base font-mono text-[12px] tracking-wider text-accent lg:hidden">
                  {step.number}
                </span>
                <h3 className="text-2xl lg:text-3xl leading-[1.2] font-medium text-text-primary transition-colors duration-300 group-hover:text-accent lg:pt-1 lg:text-right">
                  {step.title}
                </h3>
                <span className="hidden lg:mt-1 lg:flex h-10 w-10 items-center justify-center justify-self-center rounded-full border border-accent/40 bg-bg-base font-mono text-[12px] tracking-wider text-accent">
                  {step.number}
                </span>
                <div className="max-w-[560px] lg:pt-1">
                  <p className="mb-3 text-[17px] lg:text-[18px] text-text-secondary leading-relaxed">
                    {step.desc}
                  </p>
                  <p className="text-[15px] leading-[1.85] text-text-tertiary">
                    {step.detail}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
