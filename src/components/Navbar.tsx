'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './theme/ThemeToggle'

const NAV_ITEMS = [
  { id: 'services', labelKey: 'services' },
  { id: 'cases', labelKey: 'cases' },
  { id: 'demo', labelKey: 'demo' },
  { id: 'why-us', labelKey: 'about' },
  { id: 'contact', labelKey: 'contact' },
]

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the mobile menu on route change (incl. browser back/forward).
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // While open: Esc closes and returns focus to the toggle; move focus into the panel.
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        hamburgerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileOpen])

  // Scroll-spy with IntersectionObserver
  useEffect(() => {
    const isHomePage = pathname === '/' || pathname === `/${locale}` || pathname === `/${locale}/` || pathname === '/zh' || pathname === '/en'
    if (!isHomePage) return

    const sectionIds = ['hero', 'services', 'cases', 'partners', 'demo', 'why-us', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [pathname, locale])

  const isHomePage = pathname === '/' || pathname === `/${locale}` || pathname === `/${locale}/` || pathname === '/zh' || pathname === '/en'
  const otherLocale = locale === 'zh' ? 'en' : 'zh'
  // Keep the current page when switching language instead of jumping to home.
  const switchLocaleHref = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${otherLocale}`) || `/${otherLocale}`

  const getLinkHref = (id: string) => {
    if (isHomePage) return `#${id}`
    return `/${locale}#${id}`
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-expo-out ${
        scrolled
          ? 'bg-bg-base/80 backdrop-blur-xl border-b border-border-subtle/50'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} aria-label="EasyZ" className="group flex min-h-[44px] items-center gap-2.5">
            <span className="relative block h-8 w-[122px] transition-transform duration-300 group-hover:scale-[1.02] sm:h-10 sm:w-[152px]">
              <Image
                src="/assets/导航栏logo（白色）.svg"
                alt=""
                fill
                priority
                className="theme-logo-dark object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                sizes="152px"
              />
              <Image
                src="/assets/导航栏logo（黑色）.svg"
                alt=""
                fill
                priority
                className="theme-logo-light object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                sizes="152px"
              />
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.id}
                  href={getLinkHref(item.id)}
                  className={`px-3 py-1.5 rounded-md hover:bg-ink/5 transition-all duration-200 ${
                    isActive
                      ? 'text-[14px] font-medium text-text-primary'
                      : 'text-[13px] text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {t(item.labelKey)}
                </a>
              )
            })}
            <Link
              href={`/${locale}/thinking`}
              className={`px-3 py-1.5 text-[13px] rounded-md hover:bg-ink/5 transition-colors duration-200 ${
                pathname.includes('/thinking') ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {t('thinking')}
            </Link>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href={switchLocaleHref}
              aria-label={locale === 'zh' ? 'Switch to English' : '切换到中文'}
              className="text-[13px] font-mono text-text-tertiary hover:text-text-secondary transition-colors px-2 py-2.5 min-h-[44px] flex items-center"
            >
              {locale === 'zh' ? 'EN' : '中'}
            </Link>
            <a
              href={isHomePage ? '#contact' : `/${locale}#contact`}
              className="px-4 py-2.5 min-h-[44px] flex items-center text-[13px] text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {t('cta')}
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            ref={hamburgerRef}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden flex min-h-[44px] min-w-[44px] items-center justify-center text-text-secondary p-2"
            aria-label={mobileOpen ? (locale === 'zh' ? '关闭导航' : 'Close menu') : (locale === 'zh' ? '打开导航' : 'Open menu')}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div id="mobile-menu" ref={panelRef} className="md:hidden max-h-[calc(100svh-4rem)] overflow-y-auto overscroll-contain bg-bg-base/95 backdrop-blur-xl border-b border-border-subtle">
          <div className="max-w-content mx-auto px-5 sm:px-6 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={getLinkHref(item.id)}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-[15px] text-text-secondary hover:text-text-primary transition-colors border-b border-border-subtle/40"
              >
                {t(item.labelKey)}
              </a>
            ))}
            <Link
              href={`/${locale}/thinking`}
              onClick={() => setMobileOpen(false)}
              className="py-3 text-[15px] text-text-secondary hover:text-text-primary transition-colors border-b border-border-subtle/40"
            >
              {t('thinking')}
            </Link>
            <div className="flex items-center justify-between pt-4">
              <a
                href={isHomePage ? '#contact' : `/${locale}#contact`}
                onClick={() => setMobileOpen(false)}
                className="inline-flex min-h-[44px] items-center text-[15px] font-medium text-text-primary"
              >
                {t('cta')}
              </a>
              <div className="flex items-center gap-1">
                <ThemeToggle />
                <Link
                  href={switchLocaleHref}
                  aria-label={locale === 'zh' ? 'Switch to English' : '切换到中文'}
                  className="text-[14px] font-mono text-text-tertiary hover:text-text-secondary transition-colors min-h-[44px] flex items-center"
                >
                  {locale === 'zh' ? 'EN' : '中'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
