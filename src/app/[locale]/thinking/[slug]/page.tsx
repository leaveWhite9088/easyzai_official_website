import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { locales } from '@/i18n'
import ThinkingDetailContent from './ThinkingDetailContent'
import StructuredData from '@/components/StructuredData'
import type { Article } from '@/types/content'
import {
  ORGANIZATION_ID,
  breadcrumbNode,
  graph,
  languageTag,
  localizedUrl,
  webPageNode,
} from '@/lib/structured-data'

export async function generateStaticParams() {
  // Union of slugs across locales (some series are zh-only) × every locale.
  // A locale missing an article for a slug 404s in the page component —
  // with output:export every param must still be declared up front.
  const allSlugs = new Set<string>()
  for (const locale of locales) {
    const t = await getTranslations({ locale, namespace: 'thinking' })
    const articles = t.raw('articles') as Array<{ slug: string }>
    for (const article of articles) allSlugs.add(article.slug)
  }
  const params: { locale: string; slug: string }[] = []
  for (const locale of locales) {
    for (const slug of Array.from(allSlugs)) {
      params.push({ locale, slug })
    }
  }
  return params
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'thinking' })
  const articles = t.raw('articles') as Array<{ slug: string; title: string; excerpt: string }>
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}
  const url = `https://easyzai.top/${locale}/thinking/${slug}`
  const ogImage = '/assets/og-default.png'
  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: url,
      languages: {
        zh: `https://easyzai.top/zh/thinking/${slug}`,
        en: `https://easyzai.top/en/thinking/${slug}`,
        'x-default': `https://easyzai.top/zh/thinking/${slug}`,
      },
    },
    openGraph: { title: article.title, description: article.excerpt, url, type: 'article', images: [ogImage] },
    twitter: { card: 'summary_large_image', title: article.title, description: article.excerpt, images: [ogImage] },
  }
}

export default async function ThinkingDetailPage({ params }: { params: { locale: string; slug: string } }) {
  const { locale, slug } = params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'thinking' })
  const articles = t.raw('articles') as Article[]
  const article = articles.find((a) => a.slug === slug)
  // The slug set differs per locale (some series are zh-only); a slug that
  // has no article in this locale is a real 404.
  if (!article) notFound()
  const path = `/thinking/${slug}`
  const url = localizedUrl(locale, path)
  const listName = t('title')
  const jsonLd = article && graph([
    webPageNode({ locale, path, name: article.title, description: article.excerpt }),
    breadcrumbNode(locale, [
      { name: locale === 'en' ? 'Home' : '首页', path: '' },
      { name: listName, path: '/thinking' },
      { name: article.title, path },
    ]),
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: article.title,
      description: article.excerpt,
      datePublished: article.date,
      articleSection: article.category,
      inLanguage: languageTag(locale),
      image: 'https://easyzai.top/assets/og-default.png',
      author: { '@id': ORGANIZATION_ID },
      publisher: { '@id': ORGANIZATION_ID },
      mainEntityOfPage: { '@id': `${url}#webpage` },
    },
  ])

  return (
    <>
      {jsonLd && (
        <StructuredData data={jsonLd} />
      )}
      <ThinkingDetailContent locale={locale} slug={slug} />
    </>
  )
}
