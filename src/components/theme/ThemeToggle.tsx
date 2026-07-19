'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useTheme } from './ThemeProvider'

// Sun/moon toggle. Icon state only renders after mount so SSR (always dark)
// never mismatches a stored light preference.
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const t = useTranslations('nav')
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isLight = mounted && theme === 'light'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t('themeToggle')}
      className={`relative flex h-9 w-9 items-center justify-center rounded-lg text-text-tertiary hover:text-text-primary hover:bg-ink/5 transition-colors duration-200 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isLight ? 'sun' : 'moon'}
          initial={{ opacity: 0, rotate: -40, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 40, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex"
        >
          {isLight ? (
            /* sun */
            <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <circle cx="12" cy="12" r="4" />
              <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            /* moon */
            <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
