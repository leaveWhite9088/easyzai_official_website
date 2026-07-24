// 02 / STATEMENT — who we are, in 3 lines + 3 meta facts.
'use client'

import { useTranslations } from 'next-intl'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

export default function HomeStatement() {
  const t = useTranslations('home.statement')

  return (
    <section id="02" className="bg-paper border-t border-rule py-[clamp(80px,12vw,160px)]">
      <div className="mx-auto max-w-wide px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-x-6 sm:gap-x-10">
          {/* Left: section eyebrow */}
          <div className="col-span-12 md:col-span-3">
            <SectionEyebrow number="02" name="statement" zh={t('eyebrowZh')} />
          </div>

          {/* Right: serif h2 + body + meta row */}
          <div className="col-span-12 md:col-span-9 mt-10 md:mt-0">
            <h2
              className="font-serif font-light text-ink leading-[1.18] tracking-[-0.005em]"
              style={{ fontSize: 'clamp(28px, 4.4vw, 56px)' }}
            >
              {t('title')}
            </h2>

            <div className="mt-12 max-w-read">
              <p
                className="text-ink-2 text-[15px] sm:text-[16px] leading-[1.7]"
                dangerouslySetInnerHTML={{ __html: t('body1') }}
              />
              <p className="mt-6 text-ink-2 text-[15px] sm:text-[16px] leading-[1.7]">
                {t('body2')}
              </p>
            </div>

            <div className="mt-16 grid max-w-read grid-cols-3 gap-6 border-t border-rule pt-8">
              <div>
                <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-3">
                  {t('estLabel')}
                </div>
                <div className="mt-2 font-serif text-[20px] text-ink">{t('estValue')}</div>
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-3">
                  {t('teamLabel')}
                </div>
                <div className="mt-2 font-serif text-[20px] text-ink">{t('teamValue')}</div>
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-3">
                  {t('baseLabel')}
                </div>
                <div className="mt-2 font-serif text-[20px] text-ink">{t('baseValue')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
