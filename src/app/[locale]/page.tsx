import { getTranslations, setRequestLocale } from 'next-intl/server'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import Services from '@/components/Services'
import Cases from '@/components/Cases'
import LiveDemo from '@/components/LiveDemo'
import Partners from '@/components/Partners'
import WhyUs from '@/components/WhyUs'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import CompanyFacts from '@/components/CompanyFacts'
import StructuredData from '@/components/StructuredData'
import type { CaseItem } from '@/types/content'
import {
  SITE_URL,
  graph,
  organizationNode,
  serviceNode,
  webPageNode,
  websiteNode,
} from '@/lib/structured-data'

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  // Set the locale for static rendering
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'meta' })
  const caseT = await getTranslations({ locale, namespace: 'cases' })
  const cases = caseT.raw('items') as CaseItem[]
  const serviceIds = cases.map((_, index) => `${SITE_URL}/#service-${index + 1}`)
  const servicePaths = [
    `/${locale}/cases/programming-language-migration`,
    `/${locale}/cases/securities-ai-platform`,
    `/${locale}#cases`,
    `/${locale}#cases`,
  ]
  const jsonLd = graph([
    organizationNode(locale, t('description'), serviceIds),
    websiteNode(locale, t('siteName'), t('description')),
    webPageNode({ locale, name: t('title'), description: t('description') }),
    ...cases.map((item, index) =>
      serviceNode({
        id: serviceIds[index],
        locale,
        name: item.title,
        description: item.desc,
        serviceType: item.industry,
        url: `${SITE_URL}${servicePaths[index]}`,
      })
    ),
  ])

  return (
    <main className="min-h-screen">
      <StructuredData data={jsonLd} />
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <Cases />
      <LiveDemo />
      <WhyUs />
      <CompanyFacts />
      <Partners />
      <CTA />
      <Footer />
    </main>
  )
}
