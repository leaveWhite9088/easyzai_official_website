import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { locales } from '@/i18n'
import { caseMeta } from '@/data/cases-meta'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CaseContent from './CaseContent'
import StructuredData from '@/components/StructuredData'
import {
  ORGANIZATION_ID,
  SITE_URL,
  breadcrumbNode,
  graph,
  languageTag,
  localizedUrl,
  serviceNode,
  webPageNode,
} from '@/lib/structured-data'

export function generateStaticParams() {
  const slugs = ['programming-language-migration', 'securities-ai-platform']
  const params: { locale: string; slug: string }[] = []
  for (const locale of locales) {
    for (const slug of slugs) {
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
  const c = caseMeta[slug]
  const lang = locale === 'en' ? 'en' : 'zh'
  if (!c) return {}
  const title = c.title[lang]
  const description = c.summary[lang]
  const url = `https://easyzai.top/${locale}/cases/${slug}`
  const ogImage = '/assets/og-default.png'
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        zh: `https://easyzai.top/zh/cases/${slug}`,
        en: `https://easyzai.top/en/cases/${slug}`,
        'x-default': `https://easyzai.top/zh/cases/${slug}`,
      },
    },
    openGraph: { title, description, url, type: 'article', images: [ogImage] },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  }
}

export default async function CaseDetailPage({ params }: { params: { locale: string; slug: string } }) {
  const { locale, slug } = params
  setRequestLocale(locale)

  const slugs = ['programming-language-migration', 'securities-ai-platform']
  if (!slugs.includes(slug)) notFound()

  const c = caseMeta[slug]
  const lang = locale === 'en' ? 'en' : 'zh'
  const path = `/cases/${slug}`
  const url = localizedUrl(locale, path)
  const serviceId = `${SITE_URL}/#case-service-${slug}`
  const jsonLd = c && graph([
    webPageNode({ locale, path, name: c.title[lang], description: c.summary[lang] }),
    breadcrumbNode(locale, [
      { name: locale === 'en' ? 'Home' : '首页', path: '' },
      { name: locale === 'en' ? 'Case Studies' : '代表案例', path: '#cases' },
      { name: c.title[lang], path },
    ]),
    serviceNode({
      id: serviceId,
      locale,
      name: c.title[lang],
      description: c.summary[lang],
      serviceType: c.serviceType[lang],
      url,
    }),
    {
      '@type': 'Article',
      '@id': `${url}#case-study`,
      headline: c.title[lang],
      description: c.summary[lang],
      articleSection: locale === 'en' ? 'Case Study' : '项目案例',
      about: { '@id': serviceId },
      inLanguage: languageTag(locale),
      image: `${SITE_URL}/assets/og-default.png`,
      author: { '@id': ORGANIZATION_ID },
      publisher: { '@id': ORGANIZATION_ID },
      mainEntityOfPage: { '@id': `${url}#webpage` },
    },
  ])

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg-base">
      {jsonLd && (
        <StructuredData data={jsonLd} />
      )}
      <Navbar />
      <CaseContent locale={locale} slug={slug} />
      <Footer />
    </main>
  )
}
