import { Fragment, useId, useState } from 'react'
import { cn } from 'cnfast'

interface CodeTab {
  label: string
  prefix?: string
  code: string
  language?: string
}

interface CodeGroupProps {
  className?: string
  tabs: CodeTab[]
}

// Panel visibility is pure CSS: the container watches which radio is checked
// via :has() and shows the matching panel. Static literals (scanner-safe),
// so the tab count is capped — extend the list if you ever need more.
const panelVisible = [
  'group-has-[input:nth-of-type(1):checked]/cg:block',
  'group-has-[input:nth-of-type(2):checked]/cg:block',
  'group-has-[input:nth-of-type(3):checked]/cg:block',
  'group-has-[input:nth-of-type(4):checked]/cg:block',
  'group-has-[input:nth-of-type(5):checked]/cg:block',
  'group-has-[input:nth-of-type(6):checked]/cg:block',
  'group-has-[input:nth-of-type(7):checked]/cg:block',
  'group-has-[input:nth-of-type(8):checked]/cg:block',
]

// Active/focus styling reads the adjacent radio's state: `[:checked+&]`
// compiles to `:checked + label` — precise per pair, unlike `peer-checked:`
// (general sibling ~), which would style every label after a checked radio.
// Active/focus styling reads the adjacent radio's state: `[:checked+&]`
// compiles to `:checked + label` — precise per pair, unlike `peer-checked:`
// (general sibling ~), which would style every label after a checked radio.
const tabLabel =
  'relative cursor-pointer px-3 text-sm font-medium ' +
  'text-[light-dark(#67676c,#98989f)] transition-colors ' +
  // VitePress-style underline: an ::after bar inset 8px, overlapping the
  // tab bar's 1px border (-bottom-px), transparent until the radio is checked
  'after:absolute after:inset-x-2 after:-bottom-px after:z-1 after:h-0.5 ' +
  "after:rounded-full after:bg-transparent after:transition-colors after:content-[''] " +
  '[:checked+&]:text-[light-dark(#3c3c43,#fffff5)] ' +
  '[:checked+&]:after:bg-[var(--vp-c-brand-1,#3451b2)] ' +
  '[:focus-visible+&]:outline-2 [:focus-visible+&]:outline-[var(--vp-c-brand-1,#3451b2)] ' +
  'leading-[3rem]'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      type="button"
      aria-label={copied ? 'Copied' : 'Copy code'}
      onClick={async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="absolute top-2.5 right-2.5 flex size-8 items-center justify-center rounded-md
        border border-[light-dark(var(--color-stroke),var(--color-nickel))]
        bg-[light-dark(#ffffff,#1e1e20)] opacity-0 transition-opacity
        group-hover/panel:opacity-100 focus-visible:opacity-100"
    >
      {copied ? (
        <svg
          viewBox="0 0 16 16"
          className="size-4 fill-none stroke-[var(--vp-c-brand-1,#3451b2)] stroke-2"
          aria-hidden
        >
          <path d="M3 8.5 6.5 12 13 4.5" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 16 16"
          className="size-4 fill-none stroke-[light-dark(#67676c,#98989f)] stroke-[1.5]"
          aria-hidden
        >
          <rect x="5" y="5" width="8" height="8" rx="1.5" />
          <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-5A1.5 1.5 0 0 0 3 3.5v5A1.5 1.5 0 0 0 4.5 10H5" />
        </svg>
      )}
    </button>
  )
}

export function CodeGroup({ className, tabs }: CodeGroupProps) {
  // Stable per-instance radio-group name (replaces the Math.random groupId)
  const groupId = useId()

  return (
    <div className={cn('group/cg overflow-hidden rounded-lg', className)}>
      {/* Tab bar: plain radios carry the active-tab state natively — no React state */}
      <div className="flex border-b border-[light-dark(var(--color-stroke),var(--color-nickel))] bg-slate px-3">
        {tabs.map((tab, index) => (
          <Fragment key={tab.label}>
            <input
              id={`${groupId}-${index}`}
              className="sr-only"
              type="radio"
              name={groupId}
              defaultChecked={index === 0}
            />
            <label htmlFor={`${groupId}-${index}`} className={tabLabel}>
              {tab.label}
            </label>
          </Fragment>
        ))}
      </div>

      {/* Panels: hidden by default, shown by :has() when their radio is checked */}
      {tabs.map((tab, index) => (
        <div
          key={tab.label}
          className={`group/panel relative hidden bg-slate ${panelVisible[index]}`}
        >
          <CopyButton text={tab.code} />
          <span
            className="absolute top-2.5 right-3 text-xs
              text-[light-dark(#67676c,#98989f)] transition-opacity
              group-hover/panel:opacity-0"
          >
            {tab.language || 'bash'}
          </span>
          <pre className="m-0 overflow-x-auto p-5 text-sm leading-relaxed">
            <code className="font-mono text-orange-400">
              {tab.prefix && <span className="select-none">{tab.prefix}</span>}
              <span>{tab.code}</span>
            </code>
          </pre>
        </div>
      ))}
    </div>
  )
}
