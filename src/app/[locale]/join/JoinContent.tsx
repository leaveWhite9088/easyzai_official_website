// Join us — mirrors the ThinkingDetailContent pattern:
//   Navbar
//   50vh top hero image (full-bleed workspace photo)
//   article body: title + intro + traits (who we look for) + benefits
//                 (what you'll get) + email CTA + back link
//   Footer
//
// The hero image replaces the decorative half-screen panel from earlier
// commits — same start, but framed like the thinking-detail concept image
// (full-bleed, top of page, dominant).
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

export default function JoinContent() {
  const t = useTranslations('join')
  const locale = useLocale()
  const traits = t.raw('traits') as string[]
  const benefits = t.raw('benefits') as string[]

  return (
    <main className="min-h-screen bg-canvas">
      <Navbar />

      {/* Top hero image — bumped again (50 → 70 → 85vh) so the workspace
          photo carries the page. minHeight 560 keeps small viewports
          meaningful. */}
      <section className="w-full bg-canvas" style={{ height: '85vh', minHeight: '560px' }}>
        <Image
          src="/assets/joinus.jpg"
          alt={t('eyebrowZh')}
          width={1600}
          height={900}
          className="h-full w-full object-cover"
          priority
        />
      </section>

      <article className="border-t border-rule py-[clamp(72px,9vw,128px)]">
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

              {/* Trait list — who we look for */}
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

              {/* Benefits list — what you'll get */}
              <h2 className="mt-12 font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">
                {t('benefitsTitle')}
              </h2>
              <ul className="mt-5 space-y-3 text-ink-2 text-[15px] sm:text-[16px] leading-[1.7]">
                {benefits.map((line, i) => (
                  <li key={i} className="grid grid-cols-[28px_1fr] gap-3">
                    <span className="font-mono text-[11px] tracking-[0.1em] text-ink-3 pt-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-ink">{line}</span>
                  </li>
                ))}
              </ul>

              {/* Email — small, at the bottom. */}
              <div className="mt-14 border-t border-rule pt-6">
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3">
                  {t('contactTitle')}
                </p>
                <a
                  href={`mailto:${t('email')}`}
                  className="mt-2 inline-block break-all font-mono text-[14px] text-ink-2 transition-colors hover:text-ink"
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
      </article>

      <Footer />
    </main>
  )
}
