'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function CTA() {
  const t = useTranslations('cta')
  const [qrOpen, setQrOpen] = useState(false)
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
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.2 }}
              onClick={() => setQrOpen((v) => !v)}
              aria-expanded={qrOpen}
              aria-controls="qr-popover"
              className="inline-flex min-h-[44px] items-center gap-2 text-[14px] text-text-primary/70 hover:text-text-primary transition-colors duration-300 cursor-pointer"
            >
              <span className="border-b border-text-primary/20 hover:border-text-primary/50 transition-colors duration-300 pb-0.5">{t('button')}</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </motion.button>

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

          <p className="mx-auto mt-6 max-w-full break-all text-text-tertiary text-[13px]">
            {t('emailLabel')}: 18781630574@163.com
          </p>
        </motion.div>
      </div>
    </section>
  )
}
