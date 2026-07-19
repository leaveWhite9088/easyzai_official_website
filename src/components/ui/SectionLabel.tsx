import type { ReactNode } from 'react'

// Consistent section eyebrow: a glowing accent dot + spaced mono label.
export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent/60 blur-[3px]" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      <span className="font-mono text-[11px] text-accent tracking-[0.22em] uppercase">
        {children}
      </span>
    </div>
  )
}
