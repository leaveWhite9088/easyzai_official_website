// 02 / 案例 (主菜) — 4 case compact rows. Hover: arrow shifts right, metric
// and title turn cyan. The 80%+/70%+/75%+/3x+ metrics get their own column.
'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import type { CaseItem } from '@/types/content'

export default function PracticeCases() {
  const t = useTranslations('practice.cases')
  const caseT = useTranslations('cases')
  const cases = caseT.raw('items') as CaseItem[]
  const locale = useLocale()

  // Detail pages currently exist for the first two cases; the rest link to
  // a placeholder that the user can flesh out later.
  const detailSlug: Record<string, string> = {
    'programming-language-migration': 'programming-language-migration',
    'securities-ai-platform': 'securities-ai-platform',
  }

  return (
    <section id="02" className="bg-canvas border-t border-rule py-[clamp(72px,9vw,128px)]">
      <div className="mx-auto max-w-page px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-x-6 sm:gap-x-10">
          <div className="col-span-12 md:col-span-3">
            <SectionEyebrow number="02" name="case studies" zh={t('eyebrowZh')} />
          </div>

          <div className="col-span-12 md:col-span-9 mt-10 md:mt-0">
            <div className="mb-8 flex items-baseline justify-between">
              <h2 className="text-[26px] sm:text-[32px] font-medium leading-[1.2] tracking-[-0.005em] text-ink">
                {t('title')}
              </h2>
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3">
                {t('count')}
              </span>
            </div>

            <p className="max-w-read mb-6 text-[14px] sm:text-[15px] leading-[1.7] text-ink-2">
              {t('body')}
            </p>

            <div>
              {cases.map((c, i) => {
                const href = detailSlug[c.title.includes('编程') || c.title.includes('Programming') ? 'programming-language-migration' : '']
                  ? `/${locale}/cases/${detailSlug[c.title.includes('编程') || c.title.includes('Programming') ? 'programming-language-migration' : 'securities-ai-platform']}`
                  : `/${locale}/practice#case-${i + 1}`
                return (
                  <Link
                    key={c.title}
                    href={href}
                    className="group block border-t border-rule transition-colors duration-300 hover:bg-bg-elevated/40"
                  >
                    <div className="grid grid-cols-12 items-baseline gap-4 py-6 sm:gap-6 sm:py-7">
                      <div className="col-span-3 sm:col-span-2">
                        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-3">
                          CASE {String(i + 1).padStart(2, '0')}
                        </div>
                        <div
                          className="mt-1 font-serif font-light text-ink leading-none transition-colors duration-300 group-hover:text-cyan"
                          style={{ fontSize: '28px' }}
                        >
                          {c.coreMetric}
                        </div>
                        <div className="mt-1.5 font-mono text-[9px] tracking-[0.18em] uppercase text-ink-3">
                          {c.industry}
                        </div>
                      </div>
                      <div className="col-span-8 sm:col-span-9">
                        <h3 className="text-[17px] sm:text-[19px] font-medium leading-[1.3] text-ink transition-colors duration-300 group-hover:text-cyan">
                          {c.title}
                        </h3>
                        <p className="mt-1.5 text-[13px] sm:text-[14px] leading-[1.6] text-ink-2">
                          {c.desc}
                        </p>
                      </div>
                      <div className="col-span-1 pt-1 text-right text-[16px] text-ink-3 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-cyan">
                        →
                      </div>
                    </div>
                  </Link>
                )
              })}
              <div className="border-b border-rule" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
