'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import SpecularButton from './SpecularButton'

export default function CTA() {
  const t = useTranslations('cta')
  const [qrOpen, setQrOpen] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)

  // When pinned open (click/tap), close on outside click or Esc.
  useEffect(() => {
    if (!qrOpen) return
    const onDown = (e: MouseEvent) => {
      if (qrRef.current && !qrRef.current.contains(e.target as Node)) setQrOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setQrOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [qrOpen])

  return (
    <section id="contact" className="site-section site-mobile-static bg-bg-base overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(500px,100vw)] h-[250px] bg-accent/3 rounded-full blur-[100px]" />
      </div>

      <div className="site-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <h2 className="text-h1 text-text-primary mb-4">
            {t('title')}
          </h2>
          <p className="text-[17px] text-text-secondary leading-relaxed mb-10 max-w-xl mx-auto">
            {t('subtitle')}
          </p>

          <div ref={qrRef} className="relative group inline-block">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              <SpecularButton
                onClick={() => setQrOpen((v) => !v)}
                ariaExpanded={qrOpen}
                ariaControls="qr-popover"
                radius={14}
                className="px-6 py-3 min-h-[44px] text-[14px]"
              >
                {t('button')}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </SpecularButton>
            </motion.div>

            {/* Popover: hover-preview on desktop, click-to-pin everywhere.
                pt-3 bridges the gap so the pointer doesn't lose hover mid-move. */}
            <div
              id="qr-popover"
              className={`absolute bottom-full left-1/2 -translate-x-1/2 pt-3 pb-3 transition-all duration-300 z-50 group-hover:opacity-100 group-hover:visible ${
                qrOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              <div className="relative bg-bg-elevated rounded-xl border border-border-subtle p-4 shadow-card">
                {qrOpen && (
                  <button
                    type="button"
                    onClick={() => setQrOpen(false)}
                    aria-label={t('qrClose')}
                    className="absolute top-1 right-1 w-11 h-11 flex items-center justify-center rounded-md text-text-tertiary hover:text-text-primary hover:bg-ink/5 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <div className="w-[144px] h-[144px] relative">
                  <Image
                    src="/assets/个人二维码.png"
                    alt={t('qrHint')}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <p className="text-center text-[13px] text-text-secondary mt-3">{t('qrHint')}</p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-6 flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] text-text-tertiary">
            <span>{t('emailLabel')}:</span>
            <a
              href="mailto:18781630574@163.com"
              className="break-all text-text-secondary underline decoration-border-subtle underline-offset-4 transition-colors hover:text-accent"
            >
              18781630574@163.com
            </a>
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText('18781630574@163.com')
                  setEmailCopied(true)
                  setTimeout(() => setEmailCopied(false), 2000)
                } catch {
                  // Clipboard unavailable (e.g. insecure context) — the mailto link still works.
                }
              }}
              className="rounded border border-border-subtle px-2 py-0.5 text-[12px] text-text-tertiary transition-colors hover:border-accent/40 hover:text-accent"
            >
              {emailCopied ? t('emailCopied') : t('copyEmail')}
            </button>
          </div>
          <p className="mt-3 text-[13px] text-text-tertiary">{t('reassurance')}</p>
        </motion.div>
      </div>
    </section>
  )
}
