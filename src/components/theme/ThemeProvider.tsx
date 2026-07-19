'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const THEME_COLORS: Record<Theme, string> = {
  dark: '#0B0B0A',
  light: '#F8F7F3',
}

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // SSR renders dark (brand default); the real value syncs after mount from
  // the attribute the init script already applied.
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme')
    const resolved: Theme = current === 'light' ? 'light' : 'dark'
    setTheme(resolved)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[resolved])
  }, [])

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      try {
        localStorage.setItem('theme', next)
      } catch {}
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', THEME_COLORS[next])
      return next
    })
  }, [])

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}
