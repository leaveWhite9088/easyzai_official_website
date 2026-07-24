// Editorial section header used by every redesigned home/about/practice section.
// Format: hairline tick · number + name (mono) · optional Chinese sub-label.
// Example: ─ 02 / statement
//                我们是谁
export default function SectionEyebrow({
  number,
  name,
  zh,
}: {
  number: string
  name: string
  zh?: string
}) {
  return (
    <div>
      <div className="flex items-center gap-3.5">
        {/* Section-prefix hairline: 32px × 1.5px in ink-2 — visible but
            still quiet, sets the editorial rhythm against the page rule. */}
        <span aria-hidden className="block h-[1.5px] w-8 bg-ink-2" />
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">
          <span className="text-ink">{number}</span>
          <span className="mx-1.5 text-ink-3">/</span>
          {name}
        </span>
      </div>
      {zh ? (
        <div className="mt-6 font-mono text-[11px] tracking-[0.12em] uppercase text-ink-3">
          {zh}
        </div>
      ) : null}
    </div>
  )
}
