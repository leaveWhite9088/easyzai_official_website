import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { locales } from '@/i18n'
import ThinkingListContent from './ThinkingListContent'
import StructuredData from '@/components/StructuredData'
import type { Article } from '@/types/content'
import { breadcrumbNode, graph, localizedUrl, webPageNode } from '@/lib/structured-data'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' })
  const url = `https://easyzai.top/${locale}/thinking`
  const title = t('thinkingTitle')
  const description = t('thinkingDesc')
  const ogImage = '/assets/og-default.png'
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        zh: 'https://easyzai.top/zh/thinking',
        en: 'https://easyzai.top/en/thinking',
        'x-default': 'https://easyzai.top/zh/thinking',
      },
    },
    openGraph: { title, description, url, type: 'website', images: [ogImage] },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  }
}

export default async function ThinkingListPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const metaT = await getTranslations({ locale, namespace: 'meta' })
  const t = await getTranslations({ locale, namespace: 'thinking' })
  const articles = t.raw('articles') as Article[]
  const path = '/thinking'
  const jsonLd = graph([
    webPageNode({
      locale,
      path,
      name: metaT('thinkingTitle'),
      description: metaT('thinkingDesc'),
      type: 'CollectionPage',
    }),
    breadcrumbNode(locale, [
      { name: locale === 'en' ? 'Home' : '首页', path: '' },
      { name: t('title'), path },
    ]),
    {
      '@type': 'ItemList',
      '@id': `${localizedUrl(locale, path)}#articles`,
      name: metaT('thinkingTitle'),
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: article.title,
        url: localizedUrl(locale, `${path}/${article.slug}`),
      })),
    },
  ])
  return (
    <>
      <StructuredData data={jsonLd} />
      <ThinkingListContent />
    </>
  )
}
