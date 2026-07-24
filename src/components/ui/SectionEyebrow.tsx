// Editorial section header used by every redesigned home/about/practice section.
// Format: em-dash · number + name (mono) · optional Chinese sub-label.
// Example: — 02 / statement
//                我们是谁
export default function SectionEyebrow({
  number,
  name,
  zh,
  zhSize = 'small',
}: {
  number: string
  name: string
  zh?: string
  zhSize?: 'small' | 'large'
}) {
  return (
    <div>
      <div className="flex items-center gap-3.5">
        {/* Section-prefix: a real em-dash in the mono stack — gives the
            header a '— 02 / statement' reading instead of an underline. */}
        <span
          aria-hidden
          className="font-mono text-ink-2 leading-none -translate-y-px"
          style={{ fontSize: '14px' }}
        >
          —
        </span>
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">
          <span className="text-ink">{number}</span>
          <span className="mx-1.5 text-ink-3">/</span>
          {name}
        </span>
      </div>
      {zh ? (
        <div
          className={
            zhSize === 'large'
              ? 'mt-7 font-sans text-[18px] sm:text-[20px] tracking-[0.04em] text-ink-2'
              : 'mt-6 font-mono text-[11px] tracking-[0.12em] uppercase text-ink-3'
          }
        >
          {zh}
        </div>
      ) : null}
    </div>
  )
}
