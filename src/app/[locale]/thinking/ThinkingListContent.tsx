// Thinking list — 820px narrow column, "newspaper article header" rhythm.
// Each article: serif number + date + category tag (inline), then serif h2,
// excerpt, and a "read more" mono link.
'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Article, SeriesMeta } from '@/types/content'

// List entries: standalone articles render as before; consecutive articles
// sharing a series id collapse into one "series collection" row so a series
// never pushes older standalone essays down the page.
type ListEntry =
  | { kind: 'article'; article: Article; number: number }
  | { kind: 'series'; id: string; meta: SeriesMeta; articles: Article[]; number: number }

function buildEntries(articles: Article[], seriesMap: Record<string, SeriesMeta>): ListEntry[] {
  const entries: ListEntry[] = []
  articles.forEach((article, i) => {
    const sid = article.series?.id
    const meta = sid ? seriesMap[sid] : undefined
    const prevEntry = entries[entries.length - 1]
    if (sid && meta && prevEntry?.kind === 'series' && prevEntry.id === sid) {
      prevEntry.articles.push(article)
    } else if (sid && meta) {
      entries.push({ kind: 'series', id: sid, meta, articles: [article], number: i + 1 })
    } else {
      entries.push({ kind: 'article', article, number: i + 1 })
    }
  })
  return entries
}

export default function ThinkingListContent() {
  const t = useTranslations('thinking')
  const locale = useLocale()
  const articles = t.raw('articles') as Article[]
  const seriesMap = t.raw('series') as Record<string, SeriesMeta>
  const entries = buildEntries(articles, seriesMap)

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

          {/* Article list — each row gets a top hairline, py-10 padding.
              Articles are ordered oldest-first: the earliest essay is 01. */}
          {entries.map((entry) => {
            if (entry.kind === 'series') {
              const latestDate = entry.articles[entry.articles.length - 1].date
              return (
                <div key={entry.id} className="border-t border-rule py-[clamp(36px,5vw,56px)]">
                  <div className="mb-5 flex items-baseline gap-3">
                    <span
                      className="font-serif leading-none tracking-[-0.01em] text-ink"
                      style={{ fontSize: 'clamp(28px, 2.4vw, 34px)' }}
                    >
                      {String(entry.number).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3">
                      ·
                    </span>
                    <time
                      dateTime={latestDate}
                      className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3"
                    >
                      {latestDate}
                    </time>
                    <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3">
                      ·
                    </span>
                    <span className="inline-block border border-cyan/50 px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] text-cyan">
                      {t('seriesTag', { total: entry.meta.parts.length })}
                    </span>
                  </div>
                  <h2
                    className="font-serif text-ink leading-[1.22] tracking-[-0.005em]"
                    style={{ fontSize: 'clamp(24px, 2.6vw, 32px)' }}
                  >
                    {entry.meta.title}
                  </h2>
                  <p className="mt-4 text-[15px] leading-[1.7] text-ink-2">
                    {entry.meta.intro}
                  </p>
                  {/* Full series map: published parts link through, planned
                      parts stay muted so readers see where the series is going */}
                  <ol className="mt-8 border-b border-rule/60">
                    {entry.meta.parts.map((part, i) => {
                      const published = entry.articles.find((a) => a.series?.index === i + 1)
                      const num = String(i + 1).padStart(2, '0')
                      if (published) {
                        return (
                          <li key={part}>
                            <Link
                              href={`/${locale}/thinking/${published.slug}`}
                              className="group flex items-baseline gap-4 border-t border-rule/60 py-3.5"
                            >
                              <span className="font-mono text-[11px] tracking-[0.18em] text-ink-3">
                                {num}
                              </span>
                              <span className="text-[15px] leading-[1.5] text-ink-2 transition-colors duration-300 group-hover:text-cyan">
                                {part}
                              </span>
                              <span className="ml-auto text-[14px] text-ink-3 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-cyan">
                                →
                              </span>
                            </Link>
                          </li>
                        )
                      }
                      return (
                        <li
                          key={part}
                          className="flex items-baseline gap-4 border-t border-rule/60 py-3.5"
                        >
                          <span className="font-mono text-[11px] tracking-[0.18em] text-ink-3/60">
                            {num}
                          </span>
                          <span className="text-[15px] leading-[1.5] text-ink-3/70">{part}</span>
                          <span className="ml-auto font-mono text-[10px] tracking-[0.14em] uppercase text-ink-3/60">
                            {t('seriesDraft')}
                          </span>
                        </li>
                      )
                    })}
                  </ol>
                </div>
              )
            }
            const article = entry.article
            return (
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
                    {String(entry.number).padStart(2, '0')}
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
            )
          })}
          {/* Close the list with a hairline */}
          <div className="border-b border-rule" />

          {/* Bottom: count tag only — RSS link removed (was a dead link). */}
          <div className="mt-8 font-mono text-[10px] tracking-[0.18em] uppercase text-ink-3">
            {t('countTag')}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
