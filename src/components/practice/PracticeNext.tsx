// 03 / 收尾 — the closing CTA. The one serif on the Practice page lives here.
'use client'

import { useTranslations } from 'next-intl'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

export default function PracticeNext() {
  const t = useTranslations('practice.next')

  return (
    <section id="03" className="bg-paper border-t border-rule py-[clamp(72px,9vw,128px)]">
      <div className="mx-auto max-w-page px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-x-6 sm:gap-x-10">
          <div className="col-span-12 md:col-span-3">
            <SectionEyebrow number="03" name="next" zh={t('eyebrowZh')} />
          </div>

          <div className="col-span-12 md:col-span-9 mt-10 md:mt-0 max-w-read">
            <h2
              className="font-serif font-light text-ink leading-[1.1] tracking-[-0.01em]"
              style={{ fontSize: 'clamp(32px, 4.6vw, 56px)' }}
            >
              {t('title1')}
              <br />
              <span className="text-ink-2">{t('title2')}</span>
            </h2>

            <p className="mt-10 text-[15px] sm:text-[16px] leading-[1.7] text-ink-2">
              {t('body')}
            </p>

            <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
              <a
                href="mailto:18781630574@163.com"
                className="inline-flex items-center justify-center border border-ink px-9 py-[18px] font-mono text-[12px] tracking-[0.22em] uppercase text-ink transition-colors duration-200 hover:bg-ink hover:text-canvas min-h-[48px]"
              >
                {t('cta')}
              </a>
              <a
                href="mailto:18781630574@163.com"
                className="font-mono text-[13px] tracking-[0.18em] text-ink-2 hover:text-ink transition-colors"
              >
                18781630574@163.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
