import { getTranslations, setRequestLocale } from 'next-intl/server'
import Navbar from '@/components/Navbar'
import HomeHero from '@/components/home/HomeHero'
import HomeStatement from '@/components/home/HomeStatement'
import HomeSpecimen from '@/components/home/HomeSpecimen'
import HomeLatest from '@/components/home/HomeLatest'
import HomeContact from '@/components/home/HomeContact'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
import { graph, organizationNode, webPageNode, websiteNode } from '@/lib/structured-data'

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'meta' })
  const jsonLd = graph([
    organizationNode(locale, t('description'), []),
    websiteNode(locale, t('siteName'), t('description')),
    webPageNode({ locale, name: t('title'), description: t('description') }),
  ])

  return (
    <main className="min-h-screen">
      <StructuredData data={jsonLd} />
      <Navbar />
      <HomeHero />
      <HomeStatement />
      <HomeSpecimen />
      <HomeLatest />
      <HomeContact />
      <Footer />
    </main>
  )
}
