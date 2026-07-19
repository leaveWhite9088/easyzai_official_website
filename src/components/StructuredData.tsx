import type { JsonLdNode } from '@/lib/structured-data'

export default function StructuredData({ data }: { data: JsonLdNode }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
