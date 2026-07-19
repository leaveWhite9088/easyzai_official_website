// Case metadata for per-page SEO (generateMetadata). Kept separate from the
// client component CaseContent.tsx so server pages can import it without pulling
// the whole client bundle across the server boundary.

export interface CaseMeta {
  title: { zh: string; en: string }
  summary: { zh: string; en: string }
  industry: { zh: string; en: string }
  serviceType: { zh: string; en: string }
}

export const caseMeta: Record<string, CaseMeta> = {
  'programming-language-migration': {
    title: {
      zh: '编程语言生态库迁移工具',
      en: 'Programming Language Ecosystem Migration',
    },
    summary: {
      zh: '为华为自研编程语言仓颉打造跨语言库自动迁移系统，结合 RAG 与 Agent，实现 80%+ 库迁移自动化，单库迁移从数周压缩至数小时。',
      en: "An automated cross-language library migration system for Huawei's Cangjie language, combining RAG and Agents to reach 80%+ automation — cutting per-library migration from weeks to hours.",
    },
    industry: { zh: '科技 / 开发者工具', en: 'Technology / Developer Tools' },
    serviceType: { zh: 'AI 代码迁移与知识工程', en: 'AI code migration and knowledge engineering' },
  },
  'securities-ai-platform': {
    title: {
      zh: '证券中台管理系统 AI 化改造',
      en: 'Securities Platform AI Transformation',
    },
    summary: {
      zh: '非侵入式在现有证券中台叠加智能授权、智能整合、智能推文三个 AI 场景，权限审批周期缩短 70%+，原系统零改动。',
      en: 'A non-invasive AI layer over an existing securities platform — smart authorization, consolidation, and content generation — cutting approval cycles by 70%+ with zero changes to the legacy system.',
    },
    industry: { zh: '金融科技', en: 'Financial Technology' },
    serviceType: { zh: '企业系统 AI 改造', en: 'Enterprise system AI transformation' },
  },
}
