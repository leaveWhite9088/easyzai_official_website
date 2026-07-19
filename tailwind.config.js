/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // All colors resolve through CSS variables (see globals.css) so the
      // light/dark theme switches via html[data-theme] without class sweeps.
      colors: {
        'bg-base': 'rgb(var(--c-bg-base) / <alpha-value>)',
        'bg-elevated': 'rgb(var(--c-bg-elevated) / <alpha-value>)',
        'bg-hover': 'rgb(var(--c-bg-hover) / <alpha-value>)',
        'panel': 'rgb(var(--c-panel) / <alpha-value>)',
        'text-primary': 'rgb(var(--c-text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--c-text-secondary) / <alpha-value>)',
        'text-tertiary': 'rgb(var(--c-text-tertiary) / <alpha-value>)',
        'accent': 'rgb(var(--c-accent) / <alpha-value>)',
        'accent-dim': 'rgb(var(--c-accent) / 0.15)',
        'border-subtle': 'rgb(var(--c-border) / <alpha-value>)',
        'ink': 'rgb(var(--c-ink) / <alpha-value>)',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
      },
      fontFamily: {
        'sans': ['var(--font-sans)', 'Source Han Sans', 'PingFang SC', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'mono': ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 8vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '500' }],
        'h1': ['clamp(1.9rem, 6vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '500' }],
        'h2': ['clamp(1.25rem, 4vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
      },
      maxWidth: {
        'content': '1152px',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
