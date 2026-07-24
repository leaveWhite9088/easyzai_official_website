import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { locales } from '@/i18n'
import JoinContent from './JoinContent'
import StructuredData from '@/components/StructuredData'
import { breadcrumbNode, graph, webPageNode } from '@/lib/structured-data'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'join.meta' })
  const url = `https://easyzai.top/${locale}/join`
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: url,
      languages: {
        zh: 'https://easyzai.top/zh/join',
        en: 'https://easyzai.top/en/join',
        'x-default': 'https://easyzai.top/zh/join',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url,
      type: 'website',
      images: [{ url: '/assets/og-default.png', width: 1200, height: 630, alt: t('title') }],
    },
  }
}

export default async function JoinPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'join.meta' })
  const path = '/join'
  const jsonLd = graph([
    webPageNode({ locale, path, name: t('title'), description: t('description') }),
    breadcrumbNode(locale, [
      { name: locale === 'en' ? 'Home' : '首页', path: '' },
      { name: t('title'), path },
    ]),
  ])

  return (
    <>
      {jsonLd && <StructuredData data={jsonLd} />}
      <JoinContent />
    </>
  )
}
