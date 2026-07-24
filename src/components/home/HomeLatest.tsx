// 04 / LATEST — the one case the home page shows. Practitioner first: real work
// (45%+ metric) over abstract intro. Reader can drill into Practice for the
// full archive.
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

export default function HomeLatest() {
  const t = useTranslations('home.latest')
  const locale = useLocale()

  return (
    <section id="04" className="bg-paper border-t border-rule py-[clamp(80px,12vw,160px)]">
      <div className="mx-auto max-w-wide px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-x-6 sm:gap-x-10">
          <div className="col-span-12 md:col-span-3">
            <SectionEyebrow number="04" name="latest" zh={t('eyebrowZh')} />
          </div>

          <div className="col-span-12 md:col-span-9 mt-10 md:mt-0 max-w-read">
            {/* Case meta line */}
            <div className="mb-6 flex flex-wrap items-baseline gap-3 font-mono text-[11px] tracking-[0.18em] uppercase">
              <span className="text-ink-3">CASE</span>
              <span className="text-ink-3/40">·</span>
              <span className="text-ink-3">{t('industry')}</span>
              <span className="text-ink-3/40">·</span>
              <span className="text-cyan">{t('status')}</span>
            </div>

            {/* Case title — sans, keeps the "one serif per page" budget */}
            <h3
              className="text-ink font-medium leading-[1.18] tracking-[-0.005em] mb-8"
              style={{ fontSize: 'clamp(26px, 3.4vw, 38px)' }}
            >
              {t('title')}
            </h3>

            {/* 45%+ metric callout */}
            <div className="mb-10 flex items-baseline gap-4">
              <span
                className="text-ink font-medium leading-none tracking-[-0.02em]"
                style={{ fontSize: 'clamp(48px, 6vw, 72px)' }}
              >
                {t('metric')}
              </span>
              <div className="pb-1 font-mono text-[10px] tracking-[0.18em] uppercase text-ink-2 leading-[1.5]">
                {t('metricLabel1')}
                <br />
                {t('metricLabel2')}
              </div>
            </div>

            <p className="text-ink-2 text-[15px] sm:text-[16px] leading-[1.7]">
              {t('body1')}
            </p>
            <p
              className="mt-4 text-ink-2 text-[15px] sm:text-[16px] leading-[1.7]"
              dangerouslySetInnerHTML={{ __html: t('body2') }}
            />

            {/* Scope meta */}
            <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.18em] uppercase">
              <span className="text-ink-3">{t('scope1')}</span>
              <span className="text-ink-3/40">·</span>
              <span className="text-ink-3">{t('scope2')}</span>
              <span className="text-ink-3/40">·</span>
              <span className="text-cyan">{t('status')}</span>
            </div>

            {/* Link to Practice */}
            <div className="mt-10">
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
