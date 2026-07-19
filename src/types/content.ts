// Shapes for the i18n content read via t.raw(...). Replaces `as any[]` so
// field references get compile-time checking against messages/*.json.

export interface Problem {
  number: string
  title: string
  desc: string
}

export interface Step {
  number: string
  title: string
  desc: string
  detail: string
}

export interface CaseItem {
  industry: string
  title: string
  desc: string
  coreMetric: string
  coreMetricLabel: string
  otherMetrics?: string[]
  tags?: string[]
}

export interface CompareRow {
  problem: string
  solution: string
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  content: string
}

export interface FactItem {
  label: string
  value: string
}

export interface ChatDemoItem {
  q: string
  steps: string[]
  a: string
  sources?: string[]
  // Structured parameter card (e.g. parsed authorization params).
  fields?: { k: string; v: string }[]
  // Optional action button that resolves to a "done" confirmation line.
  confirm?: { label: string; cancel: string; done: string }
  // Optional follow-up suggestion chips shown after the answer.
  followups?: string[]
}
