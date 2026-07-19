'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { useTimers } from '@/hooks/useTimers'
import { highlight } from './highlight'

const SOURCE = [
  'def quick_sort(arr):',
  '    if len(arr) <= 1:',
  '        return arr',
  '    pivot = arr[len(arr) // 2]',
  '    left  = [x for x in arr if x < pivot]',
  '    mid   = [x for x in arr if x == pivot]',
  '    right = [x for x in arr if x > pivot]',
  '    return quick_sort(left) + mid + quick_sort(right)',
]

const TARGET = [
  'func quickSort(arr: Array<Int64>): Array<Int64> {',
  '    if (arr.size <= 1) {',
  '        return arr',
  '    }',
  '    let pivot = arr[arr.size / 2]',
  '    let left  = arr.filter { x => x < pivot }',
  '    let mid   = arr.filter { x => x == pivot }',
  '    let right = arr.filter { x => x > pivot }',
  '    return quickSort(left) + mid + quickSort(right)',
  '}',
]

type Status = 'idle' | 'running' | 'done'

function PaneHeader({ label, lang, dot }: { label: string; lang: string; dot: string }) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 px-3 py-2.5 sm:px-4 border-b border-border-subtle">
      <div className="flex min-w-0 items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dot }} />
        <span className="truncate font-mono text-[11.5px] text-text-tertiary">{label}</span>
      </div>
      <span className="flex-shrink-0 font-mono text-[11px]" style={{ color: dot }}>
        {lang}
      </span>
    </div>
  )
}

export default function CodeMigrationDemo() {
  const t = useTranslations('demo.migration')
  const locale = useLocale()
  const stages = t.raw('stages') as string[]
  const stageDetails = t.raw('stageDetails') as string[]

  const [revealed, setRevealed] = useState(0)
  const [status, setStatus] = useState<Status>('idle')
  const [stage, setStage] = useState(-1)
  const [subStatus, setSubStatus] = useState('')
  const { schedule, clearAll } = useTimers()
  const reduceMotion = useReducedMotion()

  const run = () => {
    clearAll()
    if (reduceMotion) {
      setStage(3)
      setRevealed(TARGET.length)
      setSubStatus('')
      setStatus('done')
      return
    }
    setRevealed(0)
    setStage(0)
    setStatus('running')
    setSubStatus(stageDetails[0])

    const S = 1100 // per pipeline stage (parse / retrieve)
    const LINE = 265 // per generated line

    // Stage 0 → 1
    schedule(() => {
      setStage(1)
      setSubStatus(stageDetails[1])
    }, S)

    // Stage 2: generate line by line
    const genStart = 2 * S
    schedule(() => {
      setStage(2)
      setSubStatus(stageDetails[2])
    }, genStart)
    TARGET.forEach((_, i) => {
      schedule(() => setRevealed(i + 1), genStart + i * LINE)
    })
    const genEnd = genStart + TARGET.length * LINE

    // Stage 3: multi-round compile self-check
    schedule(() => {
      setStage(3)
      setSubStatus(t('compile.round1'))
    }, genEnd + 200)
    schedule(() => setSubStatus(t('compile.fixing')), genEnd + 1300)
    schedule(() => setSubStatus(t('compile.round2')), genEnd + 2300)
    schedule(() => {
      setSubStatus('')
      setStatus('done')
    }, genEnd + 3000)
  }

  const reset = () => {
    clearAll()
    setRevealed(0)
    setStage(-1)
    setSubStatus('')
    setStatus('idle')
  }

  const generating = status === 'running' && stage === 2 && revealed < TARGET.length

  return (
    <div
      className="demo-scroll min-w-0 lg:h-full lg:overflow-y-auto lg:pr-2"
      tabIndex={0}
      aria-label={`${t('sourceLabel')} / ${t('targetLabel')}`}
    >
      <div className="relative overflow-x-clip rounded-2xl">
        <div aria-hidden className="pointer-events-none absolute -inset-x-6 -top-10 h-48 rounded-full bg-accent/10 blur-[90px]" />
        <div className="relative rounded-2xl p-px bg-gradient-to-b from-ink/[0.14] via-ink/[0.05] to-ink/[0.02] shadow-card">
          <div className="grid min-w-0 lg:grid-cols-2 rounded-[15px] overflow-hidden bg-bg-hover">
            {/* Source */}
            <div className="min-w-0 border-b lg:border-b-0 lg:border-r border-border-subtle">
              <PaneHeader label={t('sourceLabel')} lang="python" dot="#6E6E80" />
              <pre className="max-w-full overflow-x-auto p-3 text-[12px] leading-[1.7] font-mono sm:p-4 sm:text-[12.5px]">
                {SOURCE.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="select-none w-7 text-text-tertiary flex-shrink-0 text-right pr-3">{i + 1}</span>
                    <code className="whitespace-pre">{highlight(line, 'python')}</code>
                  </div>
                ))}
              </pre>
            </div>

            {/* Target */}
            <div className="relative min-w-0">
              <PaneHeader label={t('targetLabel')} lang="cangjie" dot="rgb(var(--c-accent))" />
              <pre className="max-w-full overflow-x-auto p-3 text-[12px] leading-[1.7] font-mono min-h-[220px] sm:min-h-[240px] sm:p-4 sm:text-[12.5px]">
                {status === 'idle' ? (
                  <div className="text-text-tertiary pt-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse" />
                    {t('targetPlaceholder')}
                  </div>
                ) : (
                  <>
                    {TARGET.slice(0, revealed).map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative flex"
                      >
                        {i === revealed - 1 && generating && (
                          <motion.span layoutId="fresh-line" className="absolute -inset-x-2 inset-y-0 bg-accent/[0.07] rounded" />
                        )}
                        <span className="select-none w-7 flex-shrink-0 text-right pr-3 text-accent/50">+</span>
                        <code className="whitespace-pre relative">
                          {highlight(line, 'cangjie')}
                          {i === revealed - 1 && generating && (
                            <span className="inline-block w-[7px] h-[14px] ml-0.5 align-middle bg-accent/70 animate-pulse" />
                          )}
                        </code>
                      </motion.div>
                    ))}
                  </>
                )}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Live sub-status */}
      <AnimatePresence mode="wait">
        {subStatus && (
          <motion.div
            key={subStatus}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-2.5 font-mono text-[12px] text-text-secondary"
          >
            <span className="flex h-3.5 w-3.5 items-center justify-center">
              <motion.span
                className="h-3.5 w-3.5 rounded-full border border-accent/40 border-t-accent"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
              />
            </span>
            {subStatus}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success banner */}
      <AnimatePresence>
        {status === 'done' && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-accent/25 bg-accent/[0.06]"
          >
            <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[13px] text-text-primary font-medium">{t('success')}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pipeline + controls */}
      <div className="mt-6 flex flex-col lg:flex-row lg:items-center gap-5 justify-between">
        <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
          {stages.map((s, i) => {
            const state = stage < 0 ? 'idle' : i < stage || status === 'done' ? 'done' : i === stage ? 'active' : 'idle'
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
                  {state === 'done' ? '✓ ' : state === 'active' ? '● ' : ''}
                  {s}
                </span>
                {i < stages.length - 1 && (
                  <span className={`text-[10px] transition-colors duration-300 ${i < stage || status === 'done' ? 'text-accent/50' : 'text-text-tertiary'}`}>→</span>
                )}
              </div>
            )
          })}
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          {status === 'done' && (
            <Link href={`/${locale}/cases/programming-language-migration`} className="text-[13px] text-accent hover:text-accent/80 transition-colors">
              {t('caseCta')}
            </Link>
          )}
          <button
            type="button"
            onClick={status === 'done' ? reset : run}
            disabled={status === 'running'}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[13px] font-medium text-text-primary bg-ink/[0.07] border border-ink/[0.12] hover:bg-ink/[0.12] hover:border-ink/[0.2] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'running' ? t('running') : status === 'done' ? t('reset') : t('run')}
          </button>
        </div>
      </div>
    </div>
  )
}
