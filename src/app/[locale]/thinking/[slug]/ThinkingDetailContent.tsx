'use client'

import { useTranslations } from 'next-intl'
import Markdown from 'react-markdown'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SubpageAtmosphere from '@/components/SubpageAtmosphere'
import type { Article } from '@/types/content'

export default function ThinkingDetailContent({ locale, slug }: { locale: string; slug: string }) {
  const t = useTranslations('thinking')
  const articles = t.raw('articles') as Article[]
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <main className="relative isolate min-h-screen overflow-hidden bg-bg-base">
        <SubpageAtmosphere />
        <Navbar />
        <article className="pt-32 pb-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <a href={`/${locale}/thinking`} className="inline-flex min-h-[44px] items-center text-text-tertiary hover:text-text-primary transition-colors text-sm mb-12">
              ← {t('title')}
            </a>
            <h1 className="text-3xl lg:text-4xl font-medium text-text-primary leading-tight">
              {t('notFound')}
            </h1>
          </div>
        </article>
        <Footer />
      </main>
    )
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-bg-base">
      <SubpageAtmosphere />
      <Navbar />
      <article className="subpage-mobile-static relative z-10 pt-24 pb-20 sm:pt-32 sm:pb-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-10">
          <motion.a
            href={`/${locale}/thinking`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="group inline-flex min-h-[44px] items-center gap-2 text-text-tertiary hover:text-text-primary transition-colors text-sm mb-10 sm:mb-12"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span> {t('title')}
          </motion.a>

          <motion.header
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8 border-b border-border-subtle pb-8 sm:mb-10 sm:pb-10"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-sm text-text-tertiary">{article.date}</span>
              <span className="text-sm px-2 py-0.5 rounded bg-bg-hover text-text-tertiary">{article.category}</span>
            </div>
            <h1 className="break-words text-[2rem] sm:text-3xl lg:text-4xl font-medium text-text-primary leading-tight">
              {article.title}
            </h1>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="subpage-surface article-prose prose prose-invert max-w-none min-w-0 rounded-2xl p-5 sm:p-8 lg:p-10"
          >
            <Markdown
              components={{
                h2: ({ children }) => (
                  <h2 className="text-2xl font-medium text-text-primary mt-12 mb-4">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-medium text-text-primary mt-8 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-text-secondary leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="text-text-primary font-medium">
                    {children}
                  </strong>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-outside pl-5 space-y-2 mb-4 text-text-secondary">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-outside pl-5 space-y-2 mb-4 text-text-secondary">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">
                    {children}
                  </li>
                ),
                code: ({ children }) => (
                  <code className="bg-bg-hover px-1.5 py-0.5 rounded text-sm font-mono text-accent">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-bg-hover p-4 rounded-lg overflow-x-auto mb-4">
                    {children}
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-accent pl-4 italic text-text-secondary mb-4">
                    {children}
                  </blockquote>
                ),
                hr: () => (
                  <hr className="border-border-subtle my-8" />
                ),
              }}
            >
              {article.content}
            </Markdown>
          </motion.div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
