// Thinking detail — 50vh top concept image + 820px narrow article body.
// Concept image swaps by category:
//   methodology      → concept-cyanotype-3.png  (蓝晒)
//   case study       → marble-texture.png       (大理石)
//   technical view   → thinking-arch.png        (建筑结构)
'use client'

import Link from 'next/link'
import Image from 'next/image'
import Markdown from 'react-markdown'
import { useLocale, useTranslations } from 'next-intl'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Article } from '@/types/content'

// Map a Chinese/English category to the matching concept image.
function imageForCategory(category: string): string {
  if (category === '方法论' || category === 'Methodology') return '/assets/concept-cyanotype-3.png'
  if (category === '案例复盘' || category === 'Case Study' || category === 'Case study') return '/assets/marble-texture.png'
  // 技术观点 / Technical perspective
  return '/assets/thinking-arch.png'
}

export default function ThinkingDetailContent({ slug }: { locale: string; slug: string }) {
  const t = useTranslations('thinking')
  const td = useTranslations('thinking.detail')
  const locale = useLocale()
  const articles = t.raw('articles') as Article[]
  const index = articles.findIndex((a) => a.slug === slug)
  const article = articles[index]

  if (!article) {
    return (
      <main className="min-h-screen bg-canvas">
        <Navbar />
        <article className="pt-32 pb-24">
          <div className="mx-auto max-w-think px-6 sm:px-10">
            <Link
              href={`/${locale}/thinking`}
              className="mb-12 inline-flex min-h-[44px] items-center font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 transition-colors hover:text-ink"
            >
              ← {t('title')}
            </Link>
            <h1 className="text-3xl lg:text-4xl font-medium text-text-primary">
              {t('notFound')}
            </h1>
          </div>
        </article>
        <Footer />
      </main>
    )
  }

  const prev = index > 0 ? articles[index - 1] : null
  const next = index < articles.length - 1 ? articles[index + 1] : null
  const conceptImage = imageForCategory(article.category)

  return (
    <main className="min-h-screen bg-canvas">
      <Navbar />

      {/* Top concept image — 50vh, category-driven */}
      <section className="w-full bg-canvas" style={{ height: '50vh', minHeight: '360px' }}>
        <Image
          src={conceptImage}
          alt={`${td('imageAltPrefix')} · ${article.category}`}
          width={1600}
          height={900}
          className="h-full w-full object-cover"
          priority
        />
      </section>

      <article className="pb-24 pt-12 sm:pb-32 sm:pt-16">
        <div className="mx-auto max-w-think px-6 sm:px-8">
          {/* Back link */}
          <Link
            href={`/${locale}/thinking`}
            className="group inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] uppercase text-ink-2 transition-colors hover:text-ink"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-0.5">←</span>{' '}
            {t('title')}
          </Link>

          {/* Header */}
          <header className="mt-10 sm:mt-12 border-b border-rule pb-8 sm:pb-10">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span aria-hidden className="h-px w-5 bg-ink-3/40" />
              <time
                dateTime={article.date}
                className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3"
              >
                {article.date}
              </time>
              <span className="inline-block border border-rule px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] text-ink-2">
                {article.category}
              </span>
            </div>
            <h1
              className="font-serif font-light leading-[1.2] tracking-[-0.005em] text-ink"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
            >
              {article.title}
            </h1>
          </header>

          {/* Body — markdown */}
          <div className="article-prose mt-16 max-w-none">
            <Markdown
              components={{
                h2: ({ children }) => (
                  <h2 className="mt-14 mb-5 font-serif font-normal text-[26px] leading-[1.3] tracking-[-0.005em] text-ink">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mt-9 mb-3 text-[19px] font-medium leading-[1.4] text-ink">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-5 text-[16px] leading-[1.75] text-ink">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="font-medium text-ink">{children}</strong>
                ),
                ul: ({ children }) => (
                  <ul className="mb-5 list-disc pl-[22px] text-ink">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-5 list-decimal pl-[22px] text-ink">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="mb-2 text-[16px] leading-[1.75]">{children}</li>
                ),
                hr: () => <hr className="my-12 border-t border-rule" />,
                blockquote: ({ children }) => (
                  <blockquote className="my-6 border-l-2 border-cyan pl-[18px] italic text-ink-2">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-[14px] text-cyan">
                    {children}
                  </code>
                ),
              }}
            >
              {article.content}
            </Markdown>
          </div>

          {/* Prev / Next */}
          <nav className="mt-24 border-t border-rule pt-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {prev ? (
                <Link href={`/${locale}/thinking/${prev.slug}`} className="group">
                  <div className="mb-2 font-mono text-[10px] tracking-[0.18em] uppercase text-ink-3">
                    ← {td('prev')}
                  </div>
                  <div className="text-[15px] leading-[1.4] text-ink transition-colors sm:text-[16px] group-hover:text-cyan">
                    {prev.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/${locale}/thinking/${next.slug}`}
                  className="group sm:text-right"
                >
                  <div className="mb-2 font-mono text-[10px] tracking-[0.18em] uppercase text-ink-3">
                    {td('next')} →
                  </div>
                  <div className="text-[15px] leading-[1.4] text-ink transition-colors sm:text-[16px] group-hover:text-cyan">
                    {next.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </nav>
        </div>
      </article>

      <Footer />
    </main>
  )
}
