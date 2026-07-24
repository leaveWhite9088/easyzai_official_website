'use client'

import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
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

// Temporary stub — replaced in step 5/7 (Practice 4-case compact list)
export default function Cases() {
  const t = useTranslations('cases')
  const locale = useLocale()
  const cases = t.raw('items') as CaseItem[]

  return (
    <section id="cases" className="site-section site-mobile-static bg-bg-base">
      <div className="site-container">
        <div className="site-section-header">
          <SectionLabel>Case Studies</SectionLabel>
          <h2 className="text-h1 text-text-primary mb-3">{t('title')}</h2>
          <p className="text-[15px] text-text-tertiary">{t('subtitle')}</p>
        </div>
        <ul>
          {cases.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="border-t border-border-subtle py-6"
            >
              <Link
                href={
                  item.title.includes('编程') || item.title.includes('Programming')
                    ? `/${locale}/cases/programming-language-migration`
                    : item.title.includes('证券') || item.title.includes('Securities')
                      ? `/${locale}/cases/securities-ai-platform`
                      : `/${locale}/practice`
                }
                className="interactive-row group block px-4 lg:px-6"
              >
                <div className="flex items-baseline gap-4 flex-wrap mb-2">
                  <span className="font-mono text-[11px] text-accent tracking-wider">Case {String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[11px] text-text-tertiary">{item.industry}</span>
                </div>
                <h3 className="text-lg font-medium text-text-primary mb-2">{item.title}</h3>
                <p className="text-text-secondary text-[14px] leading-relaxed max-w-2xl mb-3">{item.desc}</p>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-2xl font-semibold text-text-primary tracking-tight">{item.coreMetric}</span>
                  <span className="text-text-tertiary text-[12px]">{item.coreMetricLabel}</span>
                </div>
                <Tags tags={item.tags} />
              </Link>
            </motion.li>
          ))}
        </ul>
        <div className="border-t border-border-subtle" />
      </div>
    </section>
  )
}
