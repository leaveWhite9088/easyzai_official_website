// 04 / LATEST — the one case the home page shows. Practitioner first: real work
// (45%+ metric) over abstract intro. Reader can drill into Practice for the
// full archive.
//
// Typography: serif italic carries the case title (single serif on this
// section), metric block stays sans-medium as the visual anchor, body and
// meta stay prose. mono is reserved for labels / scopes.
//
// Density: this section gets read as a self-contained editorial spread, so
// vertical rhythm is tighter than the surrounding narrative sections —
// meta → title → metric → body → scope → link, hairline-bounded blocks
// with minimal outer margin between them.
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

export default function HomeLatest() {
  const t = useTranslations('home.latest')
  const locale = useLocale()

  return (
    <section
      id="04"
      className="bg-paper border-t border-rule py-[clamp(48px,7vw,88px)]"
    >
      <div className="mx-auto max-w-wide px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-x-6 sm:gap-x-10">
          {/* Left: section eyebrow (em-dash + 04 / latest + 最新在做的) */}
          <div className="col-span-12 md:col-span-3">
            <SectionEyebrow number="04" name="latest" zh={t('eyebrowZh')} />
          </div>

          <div className="col-span-12 md:col-span-9 mt-10 md:mt-0 max-w-read">
            {/* Case meta line — mono, single row of uppercase tags. */}
            <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.18em] uppercase">
              <span className="text-ink-3">{t('industryLabel')}</span>
              <span className="text-ink-3/40">·</span>
              <span className="text-ink-3">{t('industry')}</span>
              <span className="text-ink-3/40">·</span>
              <span className="text-cyan">{t('status')}</span>
            </div>

            {/* Case title — serif (roman), the section's single serif use.
                Roman not italic so the title reads as the page's editorial
                anchor, not a callout. Two lines: hook + detail. */}
            <h3 className="font-serif font-light text-ink leading-[1.18] tracking-[-0.01em] text-[clamp(28px,3.8vw,44px)]">
              {t('titleLine1')}
              <br />
              {t('titleLine2')}
            </h3>

            {/* 45%+ metric callout — sans medium anchor, sans-mono label. */}
            <div className="mt-7 mb-7 flex items-baseline gap-5 border-t border-rule pt-7">
              <span className="text-ink font-medium leading-none tracking-[-0.02em] text-[clamp(56px,7vw,84px)]">
                {t('metric')}
              </span>
              <div className="pb-1 font-mono text-[10px] tracking-[0.18em] uppercase text-ink-2 leading-[1.6]">
                {t('metricLabel1')}
                <br />
                {t('metricLabel2')}
              </div>
            </div>

            {/* Body — single column, JSX split (no innerHTML strings). */}
            <p className="text-ink-2 text-[15px] sm:text-[16px] leading-[1.75]">
              {t('body1')}
            </p>
            <p className="mt-4 text-ink-2 text-[15px] sm:text-[16px] leading-[1.75]">
              {t('body2Prefix')}
              <span className="text-ink">{t('body2Highlight')}</span>
              {t('body2Suffix')}
            </p>

            {/* Scope meta + status — single hairline-bounded row. */}
            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-rule pt-5 font-mono text-[11px] tracking-[0.18em] uppercase">
              <span className="text-ink-3">{t('scopeLabel')}</span>
              <span className="text-ink-3/40">·</span>
              <span className="text-ink-3">{t('scope1')}</span>
              <span className="text-ink-3/40">·</span>
              <span className="text-ink-3">{t('scope2')}</span>
              <span className="text-ink-3/40">·</span>
              <span className="text-cyan">{t('status')}</span>
            </div>

            {/* Link to Practice */}
            <div className="mt-7">
              <Link
                href={`/${locale}/practice`}
                className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 transition-colors hover:text-ink"
              >
                {t('link')}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
