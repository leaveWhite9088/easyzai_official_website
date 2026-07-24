import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { locales } from '@/i18n'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AboutHeader from '@/components/about/AboutHeader'
import AboutPrinciples from '@/components/about/AboutPrinciples'
import AboutHowWeWork from '@/components/about/AboutHowWeWork'
import AboutPartners from '@/components/about/AboutPartners'
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
  const t = await getTranslations({ locale, namespace: 'about.meta' })
  const url = `https://easyzai.top/${locale}/about`
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: url,
      languages: {
        zh: 'https://easyzai.top/zh/about',
        en: 'https://easyzai.top/en/about',
        'x-default': 'https://easyzai.top/zh/about',
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

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'about.meta' })
  const path = '/about'
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
      <AboutHeader />
      <AboutPrinciples />
      <AboutHowWeWork />
      <AboutPartners />
      <Footer />
    </main>
  )
}
