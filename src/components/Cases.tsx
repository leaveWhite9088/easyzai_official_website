'use client'

import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import AnimatedMetric from './AnimatedMetric'
import SectionLabel from './ui/SectionLabel'
import type { CaseItem } from '@/types/content'

function Tags({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-2 py-0.5 text-[11px] font-mono rounded text-text-tertiary bg-bg-hover"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

// The two headline cases (featured + secondary) share an identical layout;
// only data, case number, link and CTA label differ.
function FeaturedCaseRow({
  item,
  href,
  label,
  cta,
  delay,
}: {
  item: CaseItem
  href: string
  label: string
  cta: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={href} className="interactive-row group block border-t border-border-subtle py-10 lg:py-14 px-4 lg:px-6">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[11px] text-accent tracking-wide">{label}</span>
              <span className="text-[11px] text-text-tertiary">{item.industry}</span>
            </div>
            <h3 className="text-xl lg:text-2xl font-medium text-text-primary mb-4 group-hover:text-accent transition-colors">
              {item.title}
            </h3>
            <p className="text-[15px] text-text-secondary leading-relaxed mb-6 max-w-xl">
              {item.desc}
            </p>
            <span className="text-[14px] text-accent group-hover:gap-2 transition-all inline-flex items-center gap-1">
              {cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <AnimatedMetric
                value={item.coreMetric}
                className="block text-6xl lg:text-[68px] font-semibold font-mono tracking-tighter leading-[1.1] text-text-primary py-2"
              />
              <div className="flex items-center gap-2 mt-3">
                <span className="h-px w-5 bg-accent/70" />
                <span className="text-text-tertiary text-[12.5px]">{item.coreMetricLabel}</span>
              </div>
            </div>
            <div className="space-y-1.5 mb-5">
              {item.otherMetrics?.map((metric, idx) => (
                <p key={idx} className="text-[13px] text-text-tertiary leading-relaxed flex gap-2">
                  <span className="text-accent/50 flex-shrink-0">·</span>
                  {metric}
                </p>
              ))}
            </div>
            <Tags tags={item.tags} />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Cases() {
  const t = useTranslations('cases')
  const locale = useLocale()
  const cases = t.raw('items') as CaseItem[]

  const featured = cases[0]
  const secondary = cases[1]
  const others = cases.slice(2)

  return (
    <section id="cases" className="site-section site-mobile-static bg-bg-base">
      <div className="site-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="site-section-header"
        >
          <SectionLabel>Case Studies</SectionLabel>
          <h2 className="text-h1 text-text-primary mb-3">{t('title')}</h2>
          <p className="text-[15px] text-text-tertiary">{t('subtitle')}</p>
        </motion.div>

        <FeaturedCaseRow
          item={featured}
          href={`/${locale}/cases/programming-language-migration`}
          label="Case 01"
          cta={t('featuredCta')}
          delay={0.1}
        />
        <FeaturedCaseRow
          item={secondary}
          href={`/${locale}/cases/securities-ai-platform`}
          label="Case 02"
          cta={t('detailCta')}
          delay={0.2}
        />

        {/* Other Cases - 2-column with metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-bg-base">
          {others.map((caseItem, i) => (
            <motion.div
              key={caseItem.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.12 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="interactive-row py-8 lg:py-10 px-4 lg:px-6 border-t border-border-subtle"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[11px] text-accent tracking-wide">Case {String(i + 3).padStart(2, '0')}</span>
                <span className="text-[11px] text-text-tertiary">{caseItem.industry}</span>
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-3">{caseItem.title}</h3>
              <p className="text-[14px] text-text-secondary leading-relaxed mb-5 max-w-md">
                {caseItem.desc}
              </p>
              <div className="flex items-baseline gap-3 mb-4">
                <AnimatedMetric
                  value={caseItem.coreMetric}
                  className="text-4xl font-semibold text-text-primary font-mono tracking-tight leading-[1.1]"
                />
                <span className="text-text-tertiary text-[12px]">{caseItem.coreMetricLabel}</span>
              </div>
              {caseItem.otherMetrics && (
                <div className="space-y-1 mb-4">
                  {caseItem.otherMetrics.map((metric, idx) => (
                    <p key={idx} className="text-[12px] text-text-tertiary leading-relaxed">
                      {metric}
                    </p>
                  ))}
                </div>
              )}
              <Tags tags={caseItem.tags} />
            </motion.div>
          ))}
        </div>

        {/* Bottom border */}
        <div className="border-t border-border-subtle" />
      </div>
    </section>
  )
}
