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

const routes = locales.flatMap((locale) => [
  `/${locale}`,
  `/${locale}/thinking`,
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

test('home pages describe the organization, website, webpage and services', async () => {
  for (const locale of locales) {
    const html = await readFile(outputPath(`/${locale}`), 'utf8')
    const types = schemaTypes(jsonLdFrom(html))
    for (const type of ['Organization', 'WebSite', 'WebPage', 'Service']) {
      assert.ok(types.has(type), `/${locale}: missing ${type}`)
    }
    assert.match(html, /"@id":"https:\/\/easyzai\.top\/#organization"/)
  }
})

test('thinking pages expose collection, article and breadcrumb entities', async () => {
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

test('case pages connect a case article to its service and breadcrumb', async () => {
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

test('known narrow-screen overflow sources have explicit containment', async () => {
  const [footer, migration, chat, outreach, thinking, globalCss, lineSidebarCss] = await Promise.all([
    readFile('src/components/Footer.tsx', 'utf8'),
    readFile('src/components/demos/CodeMigrationDemo.tsx', 'utf8'),
    readFile('src/components/demos/ChatDemo.tsx', 'utf8'),
    readFile('src/components/demos/OutreachDemo.tsx', 'utf8'),
    readFile('src/app/[locale]/thinking/[slug]/ThinkingDetailContent.tsx', 'utf8'),
    readFile('src/app/globals.css', 'utf8'),
    readFile('src/components/bits/LineSidebar.css', 'utf8'),
  ])
  assert.match(footer, /break-all/)
  assert.match(migration, /min-w-0/)
  assert.match(chat, /overflow-x-clip/)
  assert.match(outreach, /overflow-x-clip/)
  assert.match(thinking, /article-prose/)
  assert.match(globalCss, /\.article-prose\s+:not\(pre\)\s*>\s*code/)
  assert.match(lineSidebarCss, /@media\s*\(max-width:\s*767px\)[\s\S]*?\.line-sidebar__item::before[\s\S]*?inset:\s*-6px 0/)
})

test('all secondary page templates inherit the homepage visual language', async () => {
  const [thinkingList, thinkingDetail, caseDetail, notFound, globalCss] = await Promise.all([
    readFile('src/app/[locale]/thinking/ThinkingListContent.tsx', 'utf8'),
    readFile('src/app/[locale]/thinking/[slug]/ThinkingDetailContent.tsx', 'utf8'),
    readFile('src/app/[locale]/cases/[slug]/CaseContent.tsx', 'utf8'),
    readFile('src/app/not-found.tsx', 'utf8'),
    readFile('src/app/globals.css', 'utf8'),
  ])
  for (const template of [thinkingList, thinkingDetail, caseDetail]) {
    assert.match(template, /SubpageAtmosphere/)
    assert.match(template, /motion\./)
    assert.match(template, /subpage-mobile-static/)
  }
  for (const template of [thinkingList, thinkingDetail]) {
    assert.match(template, /subpage-surface/)
  }
  // Case detail reads as a plain article — no surface frame around the body.
  assert.doesNotMatch(caseDetail, /subpage-surface/)
  assert.match(notFound, /radial-gradient/)
  assert.match(globalCss, /\.subpage-surface/)
  assert.match(globalCss, /\.subpage-mobile-static/)
})

test('brand palette uses warm mineral neutrals instead of generic AI blue-purple', async () => {
  const css = await readFile('src/app/globals.css', 'utf8')
  assert.doesNotMatch(css, /--c-accent:\s*94 106 210/)
  assert.match(css, /--c-accent:\s*190 154 99/)
  assert.match(css, /--c-text-primary:\s*242 239 232/)
})

test('homepage uses one section rhythm and closes with the contact CTA', async () => {
  const [page, css, services, cases, demo, partners, cta] = await Promise.all([
    readFile('src/app/[locale]/page.tsx', 'utf8'),
    readFile('src/app/globals.css', 'utf8'),
    readFile('src/components/Services.tsx', 'utf8'),
    readFile('src/components/Cases.tsx', 'utf8'),
    readFile('src/components/LiveDemo.tsx', 'utf8'),
    readFile('src/components/Partners.tsx', 'utf8'),
    readFile('src/components/CTA.tsx', 'utf8'),
  ])
  assert.match(css, /\.site-section\s*\{/)
  assert.match(css, /\.site-container\s*\{/)
  for (const component of [services, cases, demo, partners, cta]) {
    assert.match(component, /site-section/)
    assert.match(component, /site-container/)
  }
  assert.ok(page.indexOf('<Partners />') < page.indexOf('<CTA />'))
  assert.ok(page.indexOf('<CTA />') < page.indexOf('<Footer />'))
})

test('statement and live demos keep a stable cinematic frame', async () => {
  const [trustBar, demo, chat, outreach] = await Promise.all([
    readFile('src/components/TrustBar.tsx', 'utf8'),
    readFile('src/components/LiveDemo.tsx', 'utf8'),
    readFile('src/components/demos/ChatDemo.tsx', 'utf8'),
    readFile('src/components/demos/OutreachDemo.tsx', 'utf8'),
  ])
  assert.match(trustBar, /min-h-svh/)
  assert.doesNotMatch(trustBar, /min-h-\[56svh\]/)
  assert.match(demo, /lg:h-\[520px\]/)
  assert.match(chat, /lg:h-full/)
  assert.match(chat, /overflow-y-auto/)
  assert.match(outreach, /lg:h-full/)
  assert.match(outreach, /overflow-y-auto/)
})

test('light theme, page transitions and reading axes are deliberately designed', async () => {
  const [hero, pageTransition, localeLayout, services, navbar, footer, lineCss, globalCss] = await Promise.all([
    readFile('src/components/Hero.tsx', 'utf8'),
    readFile('src/components/PageTransition.tsx', 'utf8'),
    readFile('src/app/[locale]/layout.tsx', 'utf8'),
    readFile('src/components/Services.tsx', 'utf8'),
    readFile('src/components/Navbar.tsx', 'utf8'),
    readFile('src/components/Footer.tsx', 'utf8'),
    readFile('src/components/bits/LineSidebar.css', 'utf8'),
    readFile('src/app/globals.css', 'utf8'),
  ])
  assert.match(hero, /hero-light-texture/)
  assert.match(hero, /theme === 'dark'/)
  assert.match(pageTransition, /key=\{pathname\}/)
  assert.match(pageTransition, /usePathname/)
  assert.match(localeLayout, /PageTransition/)
  assert.match(services, /lg:grid-cols-\[1fr_64px_3fr\]/)
  assert.match(lineCss, /\.line-sidebar--markers\s*\{[\s\S]*?padding-left:\s*0/)
  assert.match(globalCss, /\[data-theme='light'\]\s+\.site-section/)
  assert.match(globalCss, /\.hero-light-texture/)
  assert.match(navbar, /theme-logo-light/)
  assert.match(footer, /theme-logo-light/)
  assert.doesNotMatch(navbar, /useTheme/)
  assert.doesNotMatch(footer, /useTheme/)
})

test('hero and demo interactions close reduced-motion and keyboard gaps', async () => {
  const [hero, ferrofluid, demo, migration, chat, outreach] = await Promise.all([
    readFile('src/components/Hero.tsx', 'utf8'),
    readFile('src/components/Ferrofluid.tsx', 'utf8'),
    readFile('src/components/LiveDemo.tsx', 'utf8'),
    readFile('src/components/demos/CodeMigrationDemo.tsx', 'utf8'),
    readFile('src/components/demos/ChatDemo.tsx', 'utf8'),
    readFile('src/components/demos/OutreachDemo.tsx', 'utf8'),
  ])
  assert.match(hero, /dynamic\(/)
  assert.match(hero, /useReducedMotion/)
  assert.match(hero, /matchMedia\('\(min-width: 768px\)'\)/)
  assert.match(hero, /visibilitychange/)
  assert.match(ferrofluid, /1\.5/)
  assert.match(demo, /ArrowRight/)
  assert.match(demo, /Home/)
  assert.match(demo, /tabIndex=\{tab === key \? 0 : -1\}/)
  for (const scrollport of [migration, chat, outreach]) {
    assert.match(scrollport, /tabIndex=\{0\}/)
    assert.match(scrollport, /aria-label=/)
  }
})
