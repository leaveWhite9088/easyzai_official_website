import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { locales } from '@/i18n'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PracticeCapabilities from '@/components/practice/PracticeCapabilities'
import PracticeCases from '@/components/practice/PracticeCases'
import PracticeNext from '@/components/practice/PracticeNext'
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
  const t = await getTranslations({ locale, namespace: 'practice.meta' })
  const url = `https://easyzai.top/${locale}/practice`
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: url,
      languages: {
        zh: 'https://easyzai.top/zh/practice',
        en: 'https://easyzai.top/en/practice',
        'x-default': 'https://easyzai.top/zh/practice',
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

export default async function PracticePage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'practice.meta' })
  const path = '/practice'
  const jsonLd = graph([
    webPageNode({ locale, path, name: t('title'), description: t('description') }),
    breadcrumbNode(locale, [
      { name: locale === 'en' ? 'Home' : '首页', path: '' },
      { name: t('title'), path },
    ]),
  ])

  return (
    <main className="min-h-screen">
      <StructuredData data={jsonLd} />
      <Navbar />
      <PracticeCapabilities />
      <PracticeCases />
      <PracticeNext />
      <Footer />
    </main>
  )
}
