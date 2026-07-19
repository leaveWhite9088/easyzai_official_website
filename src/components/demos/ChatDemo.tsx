'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { useTimers } from '@/hooks/useTimers'
import { useTypewriter } from '@/hooks/useTypewriter'
import type { ChatDemoItem } from '@/types/content'

function AssistantAvatar() {
  return (
    <span className="relative flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-accent/15 border border-accent/30 overflow-hidden">
      <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
      </svg>
      <span className="absolute inset-0 rounded-lg bg-accent/20 blur-md" />
    </span>
  )
}

type Phase = 'idle' | 'thinking' | 'answer' | 'confirmed'

export default function ChatDemo({
  namespace = 'demo.chat',
  caseSlug,
}: {
  namespace?: string
  caseSlug?: string
} = {}) {
  const t = useTranslations(namespace)
  const locale = useLocale()
  const items = t.raw('items') as ChatDemoItem[]

  const [active, setActive] = useState<number | null>(null)
  const [visibleSteps, setVisibleSteps] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')
  const { schedule, clearAll } = useTimers()
  const answer = useTypewriter()
  const reduceMotion = useReducedMotion()

  const ask = (i: number) => {
    clearAll()
    answer.reset()
    setActive(i)
    setVisibleSteps(0)
    setPhase('thinking')
    const item = items[i]

    if (reduceMotion) {
      setVisibleSteps(item.steps.length)
      setPhase('answer')
      answer.type(item.a, { cps: 100000 })
      return
    }

    const STEP_MS = 820
    item.steps.forEach((_, s) => {
      schedule(() => setVisibleSteps(s + 1), 500 + s * STEP_MS)
    })
    const afterSteps = 500 + item.steps.length * STEP_MS + 400
    schedule(() => {
      setPhase('answer')
      answer.type(item.a, { cps: 38 })
    }, afterSteps)
  }

  const item = active === null ? null : items[active]
  const thinking = phase === 'thinking'
  const answerReady = phase === 'answer' || phase === 'confirmed'
  const answerDone = answerReady && !answer.typing

  return (
    <div className="grid min-w-0 gap-6 lg:h-full lg:grid-cols-[248px_1fr]">
      {/* Question chips */}
      <div className="flex flex-col gap-2">
        <p className="text-[12px] text-text-tertiary mb-1">{t('hint')}</p>
        {items.map((it, i) => (
          <button
            key={i}
            type="button"
            onClick={() => ask(i)}
            className={`group text-left px-4 py-3 rounded-xl text-[13px] leading-snug transition-all duration-300 border ${
              active === i
                ? 'border-accent/50 bg-accent/[0.08] text-text-primary shadow-[0_0_24px_-8px_rgba(190,154,99,0.35)]'
                : 'border-ink/[0.08] text-text-secondary hover:border-ink/[0.16] hover:bg-ink/[0.03] hover:text-text-primary'
            }`}
          >
            <span className="flex items-start gap-2.5">
              <span className={`mt-0.5 font-mono text-[10px] ${active === i ? 'text-accent' : 'text-text-tertiary/70'}`}>
                0{i + 1}
              </span>
              {it.q}
            </span>
          </button>
        ))}
      </div>

      {/* Conversation card */}
      <div className="relative min-w-0 overflow-x-clip rounded-2xl lg:h-full">
        <div aria-hidden className="pointer-events-none absolute -inset-x-6 -top-8 h-40 rounded-full bg-accent/10 blur-[80px]" />
        <div className="relative rounded-2xl p-px bg-gradient-to-b from-ink/[0.14] via-ink/[0.05] to-ink/[0.02] shadow-card lg:h-full">
          <div
            className="demo-scroll flex min-h-[360px] flex-col rounded-[15px] bg-panel p-3 sm:p-5 lg:h-full lg:min-h-0 lg:overflow-y-auto"
            tabIndex={0}
            aria-label={t('assistant')}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <AssistantAvatar />
                <span className="font-mono text-[11.5px] text-text-tertiary">{t('assistant')}</span>
              </div>
              <span className="font-mono text-[11px] text-accent/70">online</span>
            </div>

            {!item ? (
              <div className="flex-1 flex items-center justify-center text-center p-5">
                <p className="text-[13px] text-text-tertiary/80 max-w-xs leading-relaxed">{t('empty')}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 p-5">
                {/* User bubble */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="self-end max-w-[85%] px-4 py-2.5 rounded-2xl rounded-br-md bg-ink/[0.08] border border-ink/[0.06] text-[13.5px] text-text-primary"
                >
                  {item.q}
                </motion.div>

                <div className="flex gap-2.5">
                  <AssistantAvatar />
                  <div className="flex-1 rounded-2xl rounded-bl-md bg-ink/[0.03] border border-ink/[0.06] px-4 py-3 min-w-0">
                    {/* Reasoning trace */}
                    <div className="flex flex-col gap-2">
                      <AnimatePresence>
                        {item.steps.slice(0, visibleSteps).map((s, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-start gap-2 font-mono text-[11.5px]"
                          >
                            <span className="text-accent mt-px">✓</span>
                            <span className="text-text-tertiary">{s}</span>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {thinking && (
                        <div className="flex items-center gap-1 pl-0.5 pt-0.5">
                          {[0, 1, 2].map((d) => (
                            <motion.span
                              key={d}
                              className="h-1.5 w-1.5 rounded-full bg-accent/60"
                              animate={{ opacity: [0.25, 1, 0.25] }}
                              transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Structured fields card */}
                    {answerReady && item.fields && item.fields.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 pt-3 border-t border-ink/[0.06] grid grid-cols-3 gap-2"
                      >
                        {item.fields.map((f) => (
                          <div key={f.k} className="rounded-lg border border-ink/[0.08] bg-ink/[0.02] px-3 py-2">
                            <div className="text-[10px] font-mono text-text-tertiary uppercase tracking-wide">{f.k}</div>
                            <div className="text-[13px] text-text-primary mt-0.5">{f.v}</div>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {/* Retrieved sources */}
                    {answerReady && item.sources && item.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-ink/[0.06] flex flex-wrap items-center gap-1.5">
                        <span className="font-mono text-[10.5px] text-text-tertiary/80 mr-1">sources</span>
                        {item.sources.map((src) => (
                          <span
                            key={src}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] text-text-secondary bg-ink/[0.04] border border-ink/[0.06]"
                          >
                            <svg className="w-2.5 h-2.5 text-accent/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h10" />
                            </svg>
                            {src}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Typewriter answer */}
                    {answerReady && (
                      <div className="mt-3 pt-3 border-t border-ink/[0.06] text-[13.5px] text-text-primary leading-relaxed whitespace-pre-line">
                        {answer.text}
                        {answer.typing && (
                          <span className="inline-block w-[6px] h-[15px] ml-0.5 -mb-0.5 bg-accent/70 animate-pulse" />
                        )}
                      </div>
                    )}

                    {/* Confirm action */}
                    {answerDone && item.confirm && phase !== 'confirmed' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setPhase('confirmed')}
                          className="px-4 py-2 rounded-lg text-[12.5px] font-medium text-bg-base bg-accent/90 hover:bg-accent transition-colors shadow-[0_0_20px_-6px_rgba(190,154,99,0.5)]"
                        >
                          {item.confirm.label}
                        </button>
                        <button
                          type="button"
                          onClick={() => ask(active!)}
                          className="px-4 py-2 rounded-lg text-[12.5px] text-text-secondary border border-ink/[0.1] hover:bg-ink/[0.04] transition-colors"
                        >
                          {item.confirm.cancel}
                        </button>
                      </motion.div>
                    )}
                    {phase === 'confirmed' && item.confirm && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 flex items-start gap-2 px-3 py-2.5 rounded-lg border border-accent/25 bg-accent/[0.06]"
                      >
                        <svg className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[12.5px] text-text-primary leading-relaxed">{item.confirm.done}</span>
                      </motion.div>
                    )}

                    {/* Follow-up suggestions */}
                    {answerDone && item.followups && item.followups.length > 0 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex flex-wrap gap-1.5">
                        {item.followups.map((f) => (
                          <span key={f} className="px-2.5 py-1 rounded-full text-[11.5px] text-text-tertiary border border-ink/[0.08] bg-ink/[0.02]">
                            {f}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>

                {answerDone && caseSlug && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pl-10">
                    <Link
                      href={`/${locale}/cases/${caseSlug}`}
                      className="text-[13px] text-accent hover:text-accent/80 transition-colors"
                    >
                      {t('caseCta')}
                    </Link>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
