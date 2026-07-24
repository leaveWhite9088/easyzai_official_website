// 03 / 我们如何工作 — long-form prose on a marble-textured background.
// Marble is loaded as a real image, with a paper veil (alpha 0.86) layered
// on top so the text stays readable.
'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

export default function AboutHowWeWork() {
  const t = useTranslations('about.howWeWork')
  const locale = useLocale()

  return (
    <section
      id="03"
      className="relative border-t border-rule py-[clamp(72px,9vw,128px)]"
      style={{
        backgroundColor: 'rgb(var(--c-bg-base))',
        backgroundImage: 'url(/assets/marble-texture.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'rgb(var(--c-bg-elevated) / 0.86)' }}
      />
      <div className="relative mx-auto max-w-page px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-x-6 sm:gap-x-10">
          <div className="col-span-12 md:col-span-3">
            <SectionEyebrow number="03" name="how we work" zh={t('eyebrowZh')} />
          </div>

          <div className="col-span-12 md:col-span-9 mt-10 md:mt-0 max-w-read">
            <p
              className="text-ink text-[16px] sm:text-[17px] leading-[1.75]"
              dangerouslySetInnerHTML={{ __html: t('body1') }}
            />
            <p
              className="mt-7 text-ink-2 text-[15px] sm:text-[16px] leading-[1.75]"
              dangerouslySetInnerHTML={{ __html: t('body2') }}
            />
            <p className="mt-7 text-ink-2 text-[15px] sm:text-[16px] leading-[1.75]">
              {t('body3')}
            </p>

            <div className="mt-12">
              <Link
                href={`/${locale}/practice`}
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 hover:text-ink transition-colors"
              >
                {t('link')} <span className="text-[14px]">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
