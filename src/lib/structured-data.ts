export const SITE_URL = 'https://easyzai.top'
export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export type JsonLdNode = Record<string, unknown>

export function languageTag(locale: string) {
  return locale === 'en' ? 'en-US' : 'zh-CN'
}

export function localizedUrl(locale: string, path = '') {
  return `${SITE_URL}/${locale}${path}`
}

export function graph(nodes: JsonLdNode[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  }
}

export function organizationNode(locale: string, description: string, serviceIds: string[] = []): JsonLdNode {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'EasyZ 易智',
    legalName: '沈阳易智软件信息技术服务有限公司',
    alternateName: 'EasyZ',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: `${SITE_URL}/assets/导航栏logo（白色）.svg`,
    },
    image: `${SITE_URL}/assets/og-default.png`,
    description,
    email: '18781630574@163.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '创新二路39-4号',
      addressLocality: '沈阳',
      addressRegion: '辽宁',
      addressCountry: 'CN',
    },
    knowsAbout: ['AI Agent', 'RAG', 'Knowledge Engineering', 'Workflow Automation', 'Private LLM Deployment'],
    inLanguage: languageTag(locale),
    ...(serviceIds.length > 0
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: locale === 'en' ? 'AI implementation services' : 'AI 落地服务',
            itemListElement: serviceIds.map((id) => ({ '@id': id })),
          },
        }
      : {}),
  }
}

export function websiteNode(locale: string, name: string, description: string): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name,
    alternateName: 'EasyZ',
    description,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: ['zh-CN', 'en-US'],
  }
}

export function webPageNode({
  locale,
  path = '',
  name,
  description,
  type = 'WebPage',
}: {
  locale: string
  path?: string
  name: string
  description: string
  type?: 'WebPage' | 'CollectionPage'
}): JsonLdNode {
  const url = localizedUrl(locale, path)
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
    inLanguage: languageTag(locale),
  }
}

export function breadcrumbNode(locale: string, items: Array<{ name: string; path: string }>): JsonLdNode {
  const pagePath = items.at(-1)?.path ?? ''
  return {
    '@type': 'BreadcrumbList',
    '@id': `${localizedUrl(locale, pagePath)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: localizedUrl(locale, item.path),
    })),
  }
}

export function serviceNode({
  id,
  locale,
  name,
  description,
  url,
  serviceType,
}: {
  id: string
  locale: string
  name: string
  description: string
  url: string
  serviceType: string
}): JsonLdNode {
  return {
    '@type': 'Service',
    '@id': id,
    name,
    description,
    serviceType,
    url,
    provider: { '@id': ORGANIZATION_ID },
    inLanguage: languageTag(locale),
  }
}
