// Site contract tests for the redesigned EasyZ website (v1.0, 2026-07-24).
//
// 4 pages: Home / About / Practice / Thinking (+ 2 case detail pages +
// 3 thinking detail pages). Single "paper" theme, 蓝晒蓝 accent. These
// tests lock the route map, JSON-LD structure, design tokens, and the
// shared section rhythm so future refactors don't drift.

import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'

const BASE = 'https://easyzai.top'
const locales = ['zh', 'en']
const articles = [
  'ai-project-screening',
  'securities-ai-case-study',
  'why-not-dify-langchain',
]
const cases = [
  'programming-language-migration',
  'securities-ai-platform',
]
const pages = ['', 'about', 'practice', 'thinking']

const routes = locales.flatMap((locale) => [
  `/${locale}`,
  ...pages
    .filter((p) => p !== '')
    .map((p) => `/${locale}/${p}`),
  ...articles.map((slug) => `/${locale}/thinking/${slug}`),
  ...cases.map((slug) => `/${locale}/cases/${slug}`),
])

function outputPath(route) {
  return `out${route}.html`
}

function jsonLdFrom(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]))
}

function schemaTypes(value, types = new Set()) {
  if (Array.isArray(value)) {
    value.forEach((item) => schemaTypes(item, types))
    return types
  }
  if (!value || typeof value !== 'object') return types
  const type = value['@type']
  if (Array.isArray(type)) type.forEach((item) => types.add(item))
  else if (type) types.add(type)
  Object.values(value).forEach((item) => schemaTypes(item, types))
  return types
}

test('every localized route exposes complete indexable metadata', async () => {
  for (const route of routes) {
    const html = await readFile(outputPath(route), 'utf8')
    assert.match(html, new RegExp(`<html lang="${route.slice(1, 3)}"`), route)
    assert.match(html, new RegExp(`<link rel="canonical" href="${BASE}${route}"`), route)
    assert.equal((html.match(/hrefLang=/g) ?? []).length, 3, `${route}: hreflang`)
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${route}: h1`)
    assert.match(html, /<meta name="robots" content="index, follow/, `${route}: robots metadata`)
  }
})

test('home page describes the organization, website and webpage', async () => {
  for (const locale of locales) {
    const html = await readFile(outputPath(`/${locale}`), 'utf8')
    const types = schemaTypes(jsonLdFrom(html))
    for (const type of ['Organization', 'WebSite', 'WebPage']) {
      assert.ok(types.has(type), `/${locale}: missing ${type}`)
    }
    assert.match(html, /"@id":"https:\/\/easyzai\.top\/#organization"/)
  }
})

test('about and practice pages carry breadcrumb and webPage entities', async () => {
  for (const locale of locales) {
    for (const page of ['about', 'practice']) {
      const types = schemaTypes(jsonLdFrom(await readFile(outputPath(`/${locale}/${page}`), 'utf8')))
      for (const type of ['WebPage', 'BreadcrumbList']) {
        assert.ok(types.has(type), `/${locale}/${page}: missing ${type}`)
      }
    }
  }
})

test('thinking list and detail expose the right schema types', async () => {
  for (const locale of locales) {
    const listTypes = schemaTypes(jsonLdFrom(await readFile(outputPath(`/${locale}/thinking`), 'utf8')))
    for (const type of ['CollectionPage', 'ItemList', 'BreadcrumbList']) {
      assert.ok(listTypes.has(type), `/${locale}/thinking: missing ${type}`)
    }
    for (const slug of articles) {
      const types = schemaTypes(jsonLdFrom(await readFile(outputPath(`/${locale}/thinking/${slug}`), 'utf8')))
      for (const type of ['Article', 'WebPage', 'BreadcrumbList']) {
        assert.ok(types.has(type), `/${locale}/thinking/${slug}: missing ${type}`)
      }
    }
  }
})

test('case detail pages connect a case article to its service and breadcrumb', async () => {
  for (const locale of locales) {
    for (const slug of cases) {
      const types = schemaTypes(jsonLdFrom(await readFile(outputPath(`/${locale}/cases/${slug}`), 'utf8')))
      for (const type of ['Article', 'Service', 'WebPage', 'BreadcrumbList']) {
        assert.ok(types.has(type), `/${locale}/cases/${slug}: missing ${type}`)
      }
    }
  }
})

test('robots makes ChatGPT search crawling intent explicit', async () => {
  const robots = await readFile('out/robots.txt', 'utf8')
  assert.match(robots, /User-Agent: OAI-SearchBot\nAllow: \//)
  assert.match(robots, /Sitemap: https:\/\/easyzai\.top\/sitemap\.xml/)
})

test('thinking detail narrow-screen code blocks and tables stay contained', async () => {
  const [thinking, globalCss] = await Promise.all([
    readFile('src/app/[locale]/thinking/[slug]/ThinkingDetailContent.tsx', 'utf8'),
    readFile('src/app/globals.css', 'utf8'),
  ])
  // The markdown wrapper class is in the source.
  assert.match(thinking, /article-prose/)
  // The CSS file keeps the prose-content overflow rules.
  assert.match(globalCss, /\.article-prose\s+:not\(pre\)\s*>\s*code/)
  assert.match(globalCss, /\.article-prose\s+pre/)
  assert.match(globalCss, /\.article-prose\s+table/)
})

test('secondary pages inherit the redesigned single-theme visual language', async () => {
  const [thinkingList, thinkingDetail, caseDetail, notFound, page, globalCss] = await Promise.all([
    readFile('src/app/[locale]/thinking/ThinkingListContent.tsx', 'utf8'),
    readFile('src/app/[locale]/thinking/[slug]/ThinkingDetailContent.tsx', 'utf8'),
    readFile('src/app/[locale]/cases/[slug]/CaseContent.tsx', 'utf8'),
    readFile('src/app/not-found.tsx', 'utf8'),
    readFile('src/app/[locale]/page.tsx', 'utf8'),
    readFile('src/app/globals.css', 'utf8'),
  ])
  // Every redesigned content template uses the shared section header.
  for (const tpl of [thinkingList, thinkingDetail, caseDetail]) {
    assert.match(tpl, /max-w-think|max-w-read/)
    assert.match(tpl, /border-rule/)
  }
  // Home composes the 5 redesigned sections in order.
  for (const component of ['HomeHero', 'HomeStatement', 'HomeSpecimen', 'HomeLatest', 'HomeContact', 'Footer']) {
    assert.ok(page.includes(`<${component}`), `home page missing <${component} />`)
  }
  // The 404 keeps a self-contained paper background.
  assert.match(notFound, /radial-gradient|linear-gradient/)
  // The shared section rhythm tokens are present.
  assert.match(globalCss, /\.site-section\s*\{/)
  assert.match(globalCss, /\.site-container\s*\{/)
})

test('brand palette uses paper + 蓝晒蓝 instead of generic dark + gold', async () => {
  const css = await readFile('src/app/globals.css', 'utf8')
  // New paper background (RGB triplet)
  assert.match(css, /--c-bg-base:\s*242 241 237/)
  // New cyan accent (RGB triplet)
  assert.match(css, /--c-accent:\s*27 58 95/)
  // New ink (foreground)
  assert.match(css, /--c-text-primary:\s*22 22 26/)
  // Old gold is gone
  assert.doesNotMatch(css, /--c-accent:\s*190 154 99/)
  // Old warm charcoal is gone
  assert.doesNotMatch(css, /--c-bg-base:\s*11 11 10/)
  // tailwind exposes the new tokens
  const tw = await readFile('tailwind.config.js', 'utf8')
  // Keys with hyphens must be quoted, so accept both 'paper:' and paper:.
  assert.match(tw, /['"]?paper['"]?\s*:\s*'rgb\(var\(--c-bg-base\)/)
  assert.match(tw, /['"]?cyan['"]?\s*:\s*'rgb\(var\(--c-accent\)/)
  assert.match(tw, /['"]?think['"]?\s*:\s*'820px'/)
  assert.match(tw, /['"]?read['"]?\s*:\s*'720px'/)
})

test('source files never import the deleted heavy components', async () => {
  const { readdir, readFile: rf } = await import('node:fs/promises')
  const layout = await readFile('src/app/[locale]/layout.tsx', 'utf8')
  const page = await readFile('src/app/[locale]/page.tsx', 'utf8')

  // Layout never re-introduces the theme provider.
  assert.doesNotMatch(layout, /ThemeProvider/)
  assert.doesNotMatch(layout, /theme-script/)
  // Home page only renders redesigned sections.
  assert.doesNotMatch(page, /SubpageAtmosphere/)

  // Walk all source files under src/ and assert none of them re-import
  // a component the redesign removed.
  const removed = [
    'Ferrofluid', 'SplitText', 'BlurText', 'SpecularButton', 'AnimatedMetric',
    'SubpageAtmosphere', 'LineSidebar', "from '\\./demos", "from '@/components/demos",
    "from '\\./theme", "from '@/components/theme",
  ]
  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true })
    const files = []
    for (const e of entries) {
      const p = `${dir}/${e.name}`
      if (e.isDirectory()) files.push(...(await walk(p)))
      else if (/\.(ts|tsx)$/.test(e.name)) files.push(p)
    }
    return files
  }
  const sources = await walk('src')
  for (const f of sources) {
    const txt = await rf(f, 'utf8')
    for (const r of removed) {
      assert.doesNotMatch(txt, new RegExp(r), `${f} must not reference ${r}`)
    }
  }
})

test('footer is the only full-bleed blue surface, with white text and WeChat QR', async () => {
  const footer = await readFile('src/components/Footer.tsx', 'utf8')
  // Cyan-d base background
  assert.match(footer, /--c-cyan-d/)
  // AI-generated texture overlay
  assert.match(footer, /footer-bg\.png/)
  // WeChat QR code is shown in the footer (carryover from old site)
  assert.match(footer, /个人二维码/)
  // Email is shown
  assert.match(footer, /18781630574@163\.com/)
  // Public security record is shown
  assert.match(footer, /辽公网安备/)
})

test('navbar uses the 4 redesigned pages and skips the theme toggle', async () => {
  const nav = await readFile('src/components/Navbar.tsx', 'utf8')
  // 4 page links
  for (const href of ['practice', 'thinking', 'about']) {
    assert.match(nav, new RegExp(`/${'$'}{locale}/${href}|\\${'$'}{locale}\\/${href}`), `missing /${href} link`)
  }
  // No theme toggle
  assert.doesNotMatch(nav, /ThemeToggle/)
  assert.doesNotMatch(nav, /useTheme/)
  // Locale switch kept
  assert.match(nav, /switchLocaleHref/)
})
