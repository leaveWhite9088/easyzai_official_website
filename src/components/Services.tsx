'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import type { Problem, Step } from '@/types/content'
import SectionLabel from './ui/SectionLabel'

// Temporary stub — replaced in step 5/7 (Practice 能力图谱)
export default function Services() {
  const t = useTranslations('services')
  const problems = t.raw('problems') as Problem[]
  const steps = t.raw('steps') as Step[]

  return (
    <section id="services" className="site-section site-mobile-static bg-bg-base">
      <div className="site-container">
        <div className="pb-20 sm:pb-28">
          <div className="site-section-header">
            <SectionLabel>The Problems</SectionLabel>
            <h2 className="text-h1 text-text-primary max-w-3xl text-balance">{t('problemsTitle')}</h2>
          </div>
          <ul className="space-y-8">
            {problems.map((p) => (
              <li key={p.number} className="border-t border-border-subtle pt-6">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[11px] text-accent tracking-wider">{p.number}</span>
                  <h3 className="text-lg font-medium text-text-primary">{p.title}</h3>
                </div>
                <p className="text-text-secondary text-[15px] leading-relaxed mt-3 max-w-2xl pl-10">{p.desc}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-border-subtle/70 pt-20 sm:pt-28">
          <div className="site-section-header">
            <SectionLabel>Our Approach</SectionLabel>
            <h2 className="text-h1 text-text-primary">{t('methodTitle')}</h2>
          </div>
          <ol className="space-y-10">
            {steps.map((step) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="border-t border-border-subtle pt-6"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[11px] text-accent tracking-wider">{step.number}</span>
                  <h3 className="text-lg font-medium text-text-primary">{step.title}</h3>
                </div>
                <p className="text-text-secondary text-[15px] leading-relaxed mt-3 max-w-2xl pl-10">{step.desc}</p>
                <p className="text-text-tertiary text-[14px] leading-relaxed mt-2 max-w-2xl pl-10">{step.detail}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
