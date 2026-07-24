// Thinking list — 820px narrow column, "newspaper article header" rhythm.
// Each article: serif number + date + category tag (inline), then serif h2,
// excerpt, and a "read more" mono link.
'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Article } from '@/types/content'

export default function ThinkingListContent() {
  const t = useTranslations('thinking')
  const locale = useLocale()
  const articles = t.raw('articles') as Article[]

  return (
    <main className="min-h-screen bg-canvas">
      <Navbar />

      <div className="pt-24 pb-12 sm:pt-32">
        <div className="mx-auto max-w-think px-6 sm:px-10">
          {/* Single h1 for SEO — the visible intro is a serif italic p, the
              page title is exposed via the nav (which is already a 4-page
              structure). Visually hidden keeps the editorial intro clean. */}
          <h1 className="sr-only">{t('title')}</h1>
          {/* 短 serif italic intro — the one serif on the thinking list page */}
          <p
            className="mb-2 max-w-[640px] font-serif italic leading-[1.4] tracking-[-0.005em] text-ink-2"
            style={{ fontSize: 'clamp(19px, 2vw, 22px)' }}
          >
            {t('eyebrowIntro')}
          </p>
          <div className="mb-10 font-mono text-[10px] tracking-[0.18em] uppercase text-ink-3 sm:mb-14">
            {t('categoriesTag')}
          </div>

          {/* Article list — each row gets a top hairline, py-10 padding */}
          {articles.map((article, i) => (
            <Link
              key={article.slug}
              href={`/${locale}/thinking/${article.slug}`}
              className="essay-row group block"
            >
              <article className="border-t border-rule py-[clamp(36px,5vw,56px)]">
                <div className="mb-5 flex items-baseline gap-3">
                  <span
                    className="font-serif leading-none tracking-[-0.01em] text-ink"
                    style={{ fontSize: 'clamp(28px, 2.4vw, 34px)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3">
                    ·
                  </span>
                  <time
                    dateTime={article.date}
                    className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3"
                  >
                    {article.date}
                  </time>
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3">
                    ·
                  </span>
                  <span className="inline-block border border-rule px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] text-ink-2">
                    {article.category}
                  </span>
                </div>
                <h2
                  className="font-serif text-ink leading-[1.22] tracking-[-0.005em] transition-colors duration-300 group-hover:text-cyan"
                  style={{ fontSize: 'clamp(24px, 2.6vw, 32px)' }}
                >
                  {article.title}
                </h2>
                <p className="mt-4 text-[15px] leading-[1.7] text-ink-2">
                  {article.excerpt}
                </p>
                <div className="mt-6 inline-flex items-center gap-1.5 font-mono text-[12px] tracking-[0.18em] uppercase text-ink-2 transition-all duration-300 group-hover:gap-2.5 group-hover:text-cyan">
                  <span>{t('readMore')}</span>
                  <span className="text-[15px]">→</span>
                </div>
              </article>
            </Link>
          ))}
          {/* Close the list with a hairline */}
          <div className="border-b border-rule" />

          {/* Bottom: count + RSS */}
          <div className="mt-8 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] uppercase text-ink-3">
            <span>{t('countTag')}</span>
            <a href="/zh/rss.xml" className="transition-colors hover:text-ink-2">
              {t('rssLink')} →
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
