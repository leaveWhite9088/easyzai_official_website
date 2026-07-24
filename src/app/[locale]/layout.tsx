import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { MotionConfig } from 'framer-motion'
import { Inter, JetBrains_Mono, Source_Serif_4 } from 'next/font/google'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n'
import ThemeProvider from '@/components/theme/ThemeProvider'
import PageTransition from '@/components/PageTransition'
import { THEME_INIT_SCRIPT } from '@/components/theme/theme-script'
import '../globals.css'

// Self-hosted via next/font: build-time download, auto-subset, no render-blocking
// cross-origin @import. Exposed as CSS variables consumed by tailwind.config.js.
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })
// Source Serif 4 — editorial "one serif per page" rhythm. Variable font for
// fine weight control; the redesigned home / about / practice / thinking each
// use it in exactly one place.
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' })
  const url = `https://easyzai.top/${locale}`
  const ogImage = '/assets/og-default.png'
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: url,
      languages: {
        zh: 'https://easyzai.top/zh',
        en: 'https://easyzai.top/en',
        'x-default': 'https://easyzai.top/zh',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url,
      siteName: t('siteName'),
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: t('title') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [ogImage],
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${sourceSerif.variable}`}
    >
      <head>
        {/* Apply the stored theme before first paint — prevents theme flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider>
            <MotionConfig reducedMotion="user">
              <PageTransition>{children}</PageTransition>
            </MotionConfig>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
