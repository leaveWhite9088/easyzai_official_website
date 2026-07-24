/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // All colors resolve through CSS variables (see globals.css). The
      // redesigned site is single "paper" theme — no light/dark sweep needed.
      colors: {
        // Surfaces (the 4 paper tones)
        'bg-base':     'rgb(var(--c-bg-base) / <alpha-value>)',
        'bg-elevated': 'rgb(var(--c-bg-elevated) / <alpha-value>)',
        'bg-hover':    'rgb(var(--c-bg-hover) / <alpha-value>)',
        'panel':       'rgb(var(--c-panel) / <alpha-value>)',

        // Paper-specific tones (new tokens)
        'paper':    'rgb(var(--c-bg-base) / <alpha-value>)',
        'surface':  'rgb(var(--c-bg-elevated) / <alpha-value>)',
        'canvas':   'rgb(var(--c-panel) / <alpha-value>)',

        // Ink (text)
        'text-primary':   'rgb(var(--c-text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--c-text-secondary) / <alpha-value>)',
        'text-tertiary':  'rgb(var(--c-text-tertiary) / <alpha-value>)',

        // Accent: 蓝晒蓝 — the ONLY color accent
        'accent':    'rgb(var(--c-accent) / <alpha-value>)',
        'accent-dim':'rgb(var(--c-accent) / 0.15)',
        'cyan':      'rgb(var(--c-accent) / <alpha-value>)',
        'cyan-d':    'rgb(var(--c-cyan-d) / <alpha-value>)',

        // Hairline rules
        'border-subtle': 'rgb(var(--c-border) / <alpha-value>)',
        'rule':          'rgb(var(--c-border) / <alpha-value>)',
        'rule-2':        'rgb(var(--c-rule-2) / <alpha-value>)',

        // "ink" — foreground extreme, used by ink/5 / ink/10 opacity utilities.
        'ink': 'rgb(var(--c-ink) / <alpha-value>)',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
      },
      fontFamily: {
        'sans':  ['var(--font-sans)',  'Source Han Sans', 'PingFang SC', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'serif': ['var(--font-serif)', '"Source Serif 4"', '"Source Han Serif SC"', 'Georgia', 'serif'],
        'mono':  ['var(--font-mono)',  'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display':  ['clamp(2.5rem, 8vw, 4.5rem)',  { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '500' }],
        'h1':       ['clamp(1.9rem, 6vw, 3rem)',    { lineHeight: '1.1',  letterSpacing: '-0.02em',  fontWeight: '500' }],
        'h2':       ['clamp(1.25rem, 4vw, 1.5rem)', { lineHeight: '1.3',  letterSpacing: '-0.01em',  fontWeight: '500' }],
      },
      maxWidth: {
        'content': '1152px',  // legacy home
        'read':    '720px',   // narrow reading column (case detail, thinking detail)
        'page':    '1360px',  // redesigned page-width layout
        'wide':    '1480px',  // extra-wide hero / spread
        'think':   '820px',   // thinking list narrow column (v0.4)
      },
      letterSpacing: {
        'label': '0.18em',
        'micro': '0.12em',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
