// 02 / 原则 — 3 principles, hairline-separated rows. Mono numbering, no
// serif here (the page already used its one in AboutHeader).
'use client'

import { useTranslations } from 'next-intl'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

interface Principle {
  num: string
  main: string
  sub: string
}

export default function AboutPrinciples() {
  const t = useTranslations('about.principles')
  const items = t.raw('items') as Principle[]

  return (
    <section id="02" className="bg-paper border-t border-rule py-[clamp(72px,9vw,128px)]">
      <div className="mx-auto max-w-page px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-x-6 sm:gap-x-10">
          <div className="col-span-12 md:col-span-3">
            <SectionEyebrow number="02" name="principles" zh={t('eyebrowZh')} />
          </div>

          <div className="col-span-12 md:col-span-9 mt-10 md:mt-0 max-w-read">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3 mb-6">
              {t('count')}
            </div>

            <div>
              {items.map((p) => (
                <div
                  key={p.num}
                  className="grid grid-cols-[36px_1fr] items-start gap-4 border-t border-rule py-7 last:border-b last:border-rule"
                >
                  <span className="pt-1.5 font-mono text-[11px] text-ink-3 tracking-[0.1em]">
                    {p.num}
                  </span>
                  <div>
                    <p className="text-ink text-[16px] sm:text-[18px] leading-[1.45]">
                      {p.main}
                    </p>
                    <p className="mt-2 text-ink-2 text-[13px] leading-[1.6]">
                      {p.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
