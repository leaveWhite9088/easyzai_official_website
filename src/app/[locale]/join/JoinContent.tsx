// Join us — single editorial section. Pattern mirrors AboutHowWeWork (left
// large eyebrow + right narrow read column), but the body is a list of
// who-we're-looking-for attributes + email CTA at the end. Static page, no
// sections beyond this one — keeping it tight per "简单写一下".
'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

export default function JoinContent() {
  const t = useTranslations('join')
  const locale = useLocale()
  const traits = t.raw('traits') as string[]

  return (
    <section className="bg-canvas border-t border-rule py-[clamp(72px,9vw,128px)]">
      <div className="mx-auto max-w-page px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-x-6 sm:gap-x-10">
          {/* Left: large eyebrow — pair with the section's narrow body. */}
          <div className="col-span-12 md:col-span-3">
            <SectionEyebrow number="" name="join" zh={t('eyebrowZh')} zhSize="large" />
          </div>

          <div className="col-span-12 md:col-span-9 mt-10 md:mt-0 max-w-read">
            {/* Title — serif italic, single use on this page. */}
            <h1
              className="font-serif font-light italic text-ink leading-[1.18] tracking-[-0.005em]"
              style={{ fontSize: 'clamp(28px, 4.4vw, 52px)' }}
            >
              {t('titleLine1')}
              <br />
              {t('titleLine2')}
            </h1>

            {/* Intro — two-line framing. */}
            <p className="mt-9 text-ink text-[16px] sm:text-[17px] leading-[1.75]">
              {t('intro')}
            </p>

            {/* Trait list */}
            <h2 className="mt-12 font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">
              {t('traitsTitle')}
            </h2>
            <ul className="mt-5 space-y-3 text-ink-2 text-[15px] sm:text-[16px] leading-[1.7]">
              {traits.map((line, i) => (
                <li key={i} className="grid grid-cols-[28px_1fr] gap-3">
                  <span className="font-mono text-[11px] tracking-[0.1em] text-ink-3 pt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-ink">{line}</span>
                </li>
              ))}
            </ul>

            {/* Email CTA */}
            <div className="mt-14 border-t border-rule pt-8">
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3">
                {t('contactTitle')}
              </p>
              <a
                href={`mailto:${t('email')}`}
                className="mt-3 inline-block font-serif text-ink leading-[1.3] tracking-[-0.005em] text-[clamp(22px,3vw,32px)] transition-colors hover:text-cyan"
                style={{ wordBreak: 'break-all' }}
              >
                {t('email')}
              </a>
            </div>

            {/* Back link */}
            <div className="mt-12">
              <Link
                href={`/${locale}`}
                className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 transition-colors hover:text-ink"
              >
                <span className="inline-block transition-transform group-hover:-translate-x-1">
                  ←
                </span>
                {t('back')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
