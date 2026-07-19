export default function SubpageAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[30rem] w-[48rem] max-w-[130vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.07] blur-[120px]" />
      <div className="absolute -right-24 top-28 h-[34rem] w-36 rotate-[28deg] bg-gradient-to-b from-transparent via-ink/[0.035] to-transparent blur-2xl sm:right-[8%] sm:w-48" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
    </div>
  )
}
