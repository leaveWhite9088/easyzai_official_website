'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SubpageAtmosphere from '@/components/SubpageAtmosphere'
import SectionLabel from '@/components/ui/SectionLabel'
import type { Article } from '@/types/content'

export default function ThinkingListContent() {
  const t = useTranslations('thinking')
  const locale = useLocale()
  const articles = t.raw('articles') as Article[]

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-bg-base">
      <SubpageAtmosphere />
      <Navbar />
      <div className="subpage-mobile-static relative z-10 pt-24 pb-20 sm:pt-32 sm:pb-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-10">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-12 border-b border-border-subtle pb-10 sm:mb-16 sm:pb-12"
          >
            <SectionLabel>EasyZ Thinking</SectionLabel>
            <h1 className="text-[2rem] sm:text-3xl lg:text-4xl font-medium text-text-primary mb-4">
              {t('title')}
            </h1>
            <p className="text-text-secondary text-base">
              {t('subtitle')}
            </p>
          </motion.header>

          <div className="space-y-5 sm:space-y-6">
            {articles.map((article, i) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="subpage-surface subpage-surface-interactive group rounded-2xl"
              >
                <Link href={`/${locale}/thinking/${article.slug}`} className="block rounded-2xl p-5 sm:p-7">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                    <span className="h-px w-5 bg-accent/50" />
                    <time dateTime={article.date} className="text-xs text-text-tertiary">{article.date}</time>
                    <span className="text-xs px-2 py-0.5 rounded bg-bg-hover text-text-tertiary">{article.category}</span>
                  </div>
                  <h2 className="break-words text-xl font-medium text-text-primary mb-3 group-hover:text-accent transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed mb-5">{article.excerpt}</p>
                  <span className="inline-flex min-h-[44px] items-center gap-1 text-sm text-accent transition-all group-hover:gap-2">
                    {t('readMore')} →
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
