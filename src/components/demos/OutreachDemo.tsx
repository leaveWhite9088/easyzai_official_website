'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useTimers } from '@/hooks/useTimers'
import { useTypewriter } from '@/hooks/useTypewriter'

type Target = {
  label: string
  region: string
  contact: string
  intel: string[]
  langs: string
  subject: string
  lines: string[]
}

export default function OutreachDemo() {
  const t = useTranslations('demo.outreach')
  const stages = t.raw('stages') as string[]
  const targets = t.raw('targets') as Target[]

  const [active, setActive] = useState<number | null>(null)
  const [stage, setStage] = useState(-1)
  const [subStatus, setSubStatus] = useState('')
  const [done, setDone] = useState(false)
  const { schedule, clearAll } = useTimers()
  const body = useTypewriter()
  const reduceMotion = useReducedMotion()

  const target = active === null ? null : targets[active]

  const run = (i: number) => {
    clearAll()
    body.reset()
    setActive(i)
    setDone(false)
    const tg = targets[i]

    if (reduceMotion) {
      setStage(stages.length - 1)
      body.type(tg.lines.join('\n'), { cps: 100000 })
      setSubStatus('')
      setDone(true)
      return
    }

    setStage(0)
    setSubStatus(`${t('contactLabel')}：${tg.contact}`)

    schedule(() => {
      setStage(1)
      setSubStatus(`${t('intelLabel')}：${tg.intel.join(' · ')}`)
    }, 1100)

    schedule(() => {
      setStage(2)
      setSubStatus(t('genLabel'))
      body.type(tg.lines.join('\n'), {
        cps: 120,
        onDone: () => {
          setStage(3)
          setSubStatus(`${t('langLabel')}：${tg.langs}`)
          schedule(() => {
            setSubStatus('')
            setDone(true)
          }, 900)
        },
      })
    }, 2200)
  }

  return (
    <div className="grid min-w-0 gap-6 lg:h-full lg:grid-cols-[248px_1fr]">
      {/* Target chips */}
      <div className="flex flex-col gap-2">
        <p className="text-[12px] text-text-tertiary mb-1">{t('hint')}</p>
        {targets.map((tg, i) => (
          <button
            key={i}
            type="button"
            onClick={() => run(i)}
            className={`group text-left px-4 py-3 rounded-xl transition-all duration-300 border ${
              active === i
                ? 'border-accent/50 bg-accent/[0.08] shadow-[0_0_24px_-8px_rgba(190,154,99,0.35)]'
                : 'border-ink/[0.08] hover:border-ink/[0.16] hover:bg-ink/[0.03]'
            }`}
          >
            <div className={`text-[13px] font-medium ${active === i ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
              {tg.label}
            </div>
            <div className="text-[11px] text-text-tertiary mt-0.5 font-mono">{tg.region}</div>
          </button>
        ))}
      </div>

      {/* Mail composer card */}
      <div className="relative min-w-0 overflow-x-clip rounded-2xl lg:h-full">
        <div aria-hidden className="pointer-events-none absolute -inset-x-6 -top-8 h-40 rounded-full bg-accent/10 blur-[80px]" />
        <div className="relative rounded-2xl p-px bg-gradient-to-b from-ink/[0.14] via-ink/[0.05] to-ink/[0.02] shadow-card lg:h-full">
          <div
            className="demo-scroll min-h-[360px] overflow-hidden rounded-[15px] bg-panel lg:h-full lg:min-h-0 lg:overflow-y-auto"
            tabIndex={0}
            aria-label={t('genLabel')}
          >
            {/* Mail chrome */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
                <span className="font-mono text-[11.5px] text-text-tertiary">EasyZ Outreach</span>
              </div>
              <span className="font-mono text-[11px] text-accent/70">{done ? 'ready' : 'draft'}</span>
            </div>

            {!target ? (
              <div className="flex items-center justify-center text-center h-[300px] px-6">
                <p className="text-[13px] text-text-tertiary/80 max-w-xs leading-relaxed">{t('empty')}</p>
              </div>
            ) : (
              <div className="p-3 sm:p-5">
                {/* Pipeline */}
                <div className="flex flex-wrap items-center gap-x-1 gap-y-2 mb-4">
                  {stages.map((s, i) => {
                    const state = i < stage || done ? 'done' : i === stage ? 'active' : 'idle'
                    return (
                      <div key={i} className="flex items-center gap-1">
                        <span
                          className={`font-mono text-[11px] px-2.5 py-1 rounded-md border transition-all duration-300 ${
                            state === 'done'
                              ? 'border-accent/30 text-accent bg-accent/[0.04]'
                              : state === 'active'
                              ? 'border-accent/60 text-accent bg-accent/10 shadow-[0_0_18px_-4px_rgba(190,154,99,0.45)]'
                              : 'border-ink/[0.08] text-text-tertiary'
                          }`}
                        >
                          {state === 'done' ? '✓ ' : ''}
                          {s}
                        </span>
                        {i < stages.length - 1 && <span className="text-[10px] text-text-tertiary">→</span>}
                      </div>
                    )
                  })}
                </div>

                {/* Live sub-status */}
                <AnimatePresence mode="wait">
                  {subStatus && (
                    <motion.div
                      key={subStatus}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mb-4 flex items-center gap-2 font-mono text-[11.5px] text-text-secondary"
                    >
                      <motion.span
                        className="h-3 w-3 rounded-full border border-accent/40 border-t-accent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                      />
                      {subStatus}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mail meta */}
                <div className="space-y-1.5 pb-3 mb-3 border-b border-border-subtle text-[12px]">
                  <div className="flex gap-2">
                    <span className="w-14 text-text-tertiary font-mono flex-shrink-0">To</span>
                    <span className="text-text-secondary">{target.contact} · {target.region}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-14 text-text-tertiary font-mono flex-shrink-0">Subject</span>
                    <span className="text-text-primary font-medium">{target.subject}</span>
                  </div>
                </div>

                {/* Body (typewriter) */}
                <div className="text-[13px] leading-relaxed text-text-secondary min-h-[150px] whitespace-pre-line">
                  {body.text}
                  {body.typing && <span className="inline-block w-[6px] h-[14px] ml-0.5 -mb-0.5 bg-accent/70 animate-pulse" />}
                </div>

                {/* Done: language versions + note */}
                <AnimatePresence>
                  {done && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[10.5px] text-text-tertiary/80">{t('langLabel')}</span>
                        {target.langs.split('·').map((l) => (
                          <span key={l} className="px-2 py-0.5 rounded text-[11px] text-text-secondary bg-ink/[0.04] border border-ink/[0.06]">
                            {l.trim()}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-accent/25 bg-accent/[0.06]">
                        <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[12.5px] text-text-primary">{t('doneNote')}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
