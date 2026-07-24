// 01 / 段头 — the one serif on the about page (per "one serif per page" rule).
'use client'

import { useTranslations } from 'next-intl'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

export default function AboutHeader() {
  const t = useTranslations('about.intro')

  return (
    <section id="01" className="bg-canvas pt-[clamp(140px,16vw,220px)] pb-[clamp(72px,9vw,128px)]">
      <div className="mx-auto max-w-page px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-x-6 sm:gap-x-10">
          <div className="col-span-12 md:col-span-3">
            <SectionEyebrow number="01" name="intro" zh={t('eyebrowZh')} />
          </div>
          <div className="col-span-12 md:col-span-9 mt-10 md:mt-0">
            <h1
              className="max-w-[920px] font-serif font-light text-ink leading-[1.15] tracking-[-0.005em]"
              style={{ fontSize: 'clamp(28px, 4.2vw, 52px)' }}
            >
              {t('title1')}
              <br />
              {t('title2Prefix')}
              <span className="text-ink-2">{t('title2Highlight')}</span>
              {t('title2Suffix')}
            </h1>
            <p
              className="mt-10 max-w-read text-ink-2 text-[15px] sm:text-[16px] leading-[1.7]"
              dangerouslySetInnerHTML={{ __html: t('body') }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
