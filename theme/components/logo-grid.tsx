import { useEffect, useRef, useState } from 'react'

export interface Logo {
  src: string
  alt: string
}

export interface LogoGridProps {
  logos: Logo[]
  /** Styling seam for parents (replaces `:deep(img)` from the Vue version) */
  imgClassName?: string
}

// Used only for the overflow math — keep in sync with the utility classes
// below: max-w-[120px], gap-[80px], pe-[80px], after:right-[-40px] (= gap / 2)
const LOGO_WIDTH = 120
const GAP = 80
const SECONDS_PER_LOGO = 3

// Static string literals so the Tailwind scanner picks everything up.
// Shared cell: divider drawn as a pseudo-element; position differs per mode.
const cellBase =
  'relative flex h-[25px] items-center justify-center ' +
  "after:absolute after:-inset-y-6 after:w-px after:content-[''] " +
  'after:bg-[light-dark(var(--color-stroke),var(--color-nickel))]'

// Marquee: fixed-width cells (the seamless -50% loop depends on it),
// divider centered in the 80px gap
const cellLoop = `${cellBase} w-[120px] shrink-0 after:right-[-40px]`

// Static: cells flex to share the full row, divider sits exactly on the
// cell boundary, no divider after the last one
const cellStatic = `${cellBase} flex-1 after:right-0 last:after:hidden`

// max-w caps the logo in flex-1 cells so both modes render logos the same size
const logoImg = 'max-w-[120px] max-h-full object-contain grayscale'

function LogoSet({
  logos,
  imgClassName,
  loop,
  ariaHidden,
}: {
  logos: Logo[]
  imgClassName: string
  /** Marquee mode: fixed-width cells + trailing gap; static mode: flex-1 cells */
  loop?: boolean
  ariaHidden?: boolean
}) {
  return (
    <div
      className={
        loop
          ? // Trailing gap (pe) makes the track exactly 2 full cycles wide → -50% loops seamlessly
            'flex shrink-0 items-center gap-[80px] pe-[80px]'
          : 'flex items-center'
      }
      aria-hidden={ariaHidden || undefined}
    >
      {logos.map((logo) => (
        <div key={logo.alt} className={loop ? cellLoop : cellStatic}>
          <img
            loading="lazy"
            src={logo.src}
            alt={ariaHidden ? '' : logo.alt}
            className={`${logoImg} ${imgClassName}`}
          />
        </div>
      ))}
    </div>
  )
}

export function LogoGrid({ logos, imgClassName = '' }: LogoGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [overflows, setOverflows] = useState(false)

  // The only JS left: "does the content fit?" — CSS can't branch on that
  // cross-browser yet. (`@container scroll-state(scrollable: …)` will replace
  // this once support lands beyond Chromium.)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const contentWidth = logos.length * (LOGO_WIDTH + GAP) - GAP
    const ro = new ResizeObserver(([entry]) => {
      setOverflows(contentWidth > entry.contentRect.width)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [logos.length])

  return (
    <div ref={containerRef} className="overflow-hidden py-6">
      {overflows ? (
        <div
          className="flex w-max animate-lg-marquee motion-reduce:animate-none"
          // Duration must be set here, on the element — a calc(var(--n) * 3s)
          // inside the @theme variable resolves against :root (where --n
          // doesn't exist) and silently kills the whole animation.
          style={{ animationDuration: `${logos.length * SECONDS_PER_LOGO}s` }}
        >
          <LogoSet logos={logos} imgClassName={imgClassName} loop />
          {/* Duplicate set for the seamless loop (hidden from the a11y tree) */}
          <LogoSet logos={logos} imgClassName={imgClassName} loop ariaHidden />
        </div>
      ) : (
        <LogoSet logos={logos} imgClassName={imgClassName} />
      )}
    </div>
  )
}
