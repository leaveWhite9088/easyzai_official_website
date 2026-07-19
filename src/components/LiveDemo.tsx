'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import CodeMigrationDemo from './demos/CodeMigrationDemo'
import ChatDemo from './demos/ChatDemo'
import OutreachDemo from './demos/OutreachDemo'
import SectionLabel from './ui/SectionLabel'

const TABS = ['migration', 'chat', 'support', 'outreach'] as const

export default function LiveDemo() {
  const t = useTranslations('demo')
  const [tab, setTab] = useState<(typeof TABS)[number]>('migration')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const moveToTab = (index: number) => {
    const next = (index + TABS.length) % TABS.length
    setTab(TABS[next])
    tabRefs.current[next]?.focus()
  }

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight') moveToTab(index + 1)
    else if (event.key === 'ArrowLeft') moveToTab(index - 1)
    else if (event.key === 'Home') moveToTab(0)
    else if (event.key === 'End') moveToTab(TABS.length - 1)
    else return
    event.preventDefault()
  }

  return (
    <section id="demo" className="site-section site-mobile-static bg-bg-base">
      <div className="site-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="site-section-header"
        >
          <SectionLabel>Live Demo</SectionLabel>
          <h2 className="text-h1 text-text-primary mb-3">{t('title')}</h2>
          <p className="text-[15px] text-text-tertiary max-w-2xl">{t('subtitle')}</p>
        </motion.div>

        {/* Tab switcher */}
        <div role="tablist" aria-label={t('title')} className="grid w-full grid-cols-2 items-center gap-1 p-1 mb-8 rounded-lg bg-bg-elevated border border-border-subtle sm:inline-flex sm:w-auto sm:flex-wrap">
          {TABS.map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              ref={(element) => {
                tabRefs.current[TABS.indexOf(key)] = element
              }}
              id={`demo-tab-${key}`}
              aria-selected={tab === key}
              aria-controls={`demo-panel-${key}`}
              tabIndex={tab === key ? 0 : -1}
              onKeyDown={(event) => handleTabKeyDown(event, TABS.indexOf(key))}
              onClick={() => setTab(key)}
              className={`relative px-4 py-2 min-h-[44px] rounded-md text-[13px] font-medium transition-colors duration-300 ${
                tab === key ? 'text-text-primary' : 'text-text-tertiary hover:text-text-secondary'
              }`}
            >
              {tab === key && (
                <motion.div
                  layoutId="demo-tab"
                  className="absolute inset-0 rounded-md bg-ink/[0.08] border border-ink/[0.1]"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{t(`tab_${key}`)}</span>
            </button>
          ))}
        </div>

        {/* Active demo */}
        <motion.div
          key={tab}
          role="tabpanel"
          id={`demo-panel-${tab}`}
          aria-labelledby={`demo-tab-${tab}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="min-w-0 lg:h-[520px] lg:overflow-hidden"
        >
          {tab === 'migration' && <CodeMigrationDemo />}
          {tab === 'chat' && <ChatDemo namespace="demo.chat" caseSlug="securities-ai-platform" />}
          {tab === 'support' && <ChatDemo namespace="demo.support" />}
          {tab === 'outreach' && <OutreachDemo />}
        </motion.div>
      </div>
    </section>
  )
}
