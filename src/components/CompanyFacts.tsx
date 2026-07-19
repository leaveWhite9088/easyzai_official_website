'use client'

import { useTranslations } from 'next-intl'
import type { FactItem } from '@/types/content'
import SectionLabel from './ui/SectionLabel'

export default function CompanyFacts() {
  const t = useTranslations('facts')
  const items = t.raw('items') as FactItem[]

  return (
    <section data-geo-facts aria-labelledby="company-facts-title" className="site-section site-mobile-static bg-bg-base">
      <div className="site-container">
        <div className="site-section-header">
          <SectionLabel>EasyZ Facts</SectionLabel>
          <h2 id="company-facts-title" className="mb-4 text-h1 text-text-primary">{t('title')}</h2>
          <p className="text-[15px] leading-relaxed text-text-secondary sm:text-[16px]">{t('intro')}</p>
        </div>
        <dl className="grid grid-cols-1 border-t border-border-subtle sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.label} className="interactive-row min-w-0 border-b border-border-subtle py-6 sm:odd:pr-8 sm:even:border-l sm:even:pl-8">
              <dt className="mb-2 font-mono text-[11px] uppercase tracking-wider text-accent">{item.label}</dt>
              <dd className="break-words text-[15px] leading-relaxed text-text-primary">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
