import { useMemo } from 'react'
import { Wrapper } from './wrapper'
// import viteByVoidzero from '../../assets/vite/vite-by-voidzero.png'

export interface Sponsor {
  name: string
  img: string
  url: string
  hasDark?: true
}

export type SponsorSize = 'big' | 'medium' | 'small' | 'avatar'

export interface SponsorTier {
  tier: string
  size: SponsorSize
  items: Sponsor[]
}

interface Props {
  sponsors?: SponsorTier[]
  heading?: string
  description?: string
  sponsorLink?: string
  sponsorLinkText?: string
  sideBySideTiers?: [string, string] // e.g., ['bronze', 'backers'] for side-by-side layout
  logoStyle?: 'opencollective'
}

interface SizeConfigEntry {
  columns: number
  padding: string
  logoSize: string
  avatarMode?: boolean
}

const sizeConfig: Record<SponsorSize, SizeConfigEntry> = {
  big: { columns: 3, padding: 'py-16', logoSize: 'h-13 w-[220px]' },
  medium: { columns: 5, padding: 'py-7', logoSize: 'h-8 w-[120px]' },
  small: { columns: 7, padding: 'py-5', logoSize: 'h-6 w-[100px]' },
  avatar: { columns: 15, padding: 'py-3', logoSize: 'w-10 h-10', avatarMode: true },
}

const gridClasses: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  7: 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-7',
}

const getEffectiveColumns = (size: SponsorSize, itemCount: number) =>
  Math.min(sizeConfig[size].columns, itemCount)

const getGridColumns = (size: SponsorSize, itemCount: number) =>
  gridClasses[getEffectiveColumns(size, itemCount)] || 'grid-cols-1'

const getEmptyCells = (itemCount: number, size: SponsorSize) => {
  const cols = getEffectiveColumns(size, itemCount)
  const remainder = itemCount % cols
  return remainder === 0 ? 0 : cols - remainder
}

// Calculate empty slots for backers grid (maintain visual consistency)
const getBackerEmptySlots = (itemCount: number, minSlots = 30) => {
  const targetSlots = Math.max(itemCount, minSlots)
  return Math.max(0, targetSlots - itemCount)
}

// .spsr-logo { filter: grayscale(1) invert(1) } → grayscale invert
// .spsr-style-oc overrides → conditional classes
const getLogoClasses = (isOpenCollective: boolean) =>
  isOpenCollective ? 'w-auto rounded' : 'grayscale invert'

function TierHeading({ label }: { label: string }) {
  return (
    <div className="py-5 px-5 sm:px-10 border-b border-nickel">
      <span className="text-white/70 text-xs font-mono uppercase tracking-wide">{label}</span>
    </div>
  )
}

function AvatarGrid({ tier }: { tier: SponsorTier }) {
  return (
    // .backers-grid → flex flex-wrap gap-3, centered on mobile / start on md+
    <div className="flex flex-wrap gap-3 justify-center md:justify-start px-5 sm:px-10 py-6">
      {tier.items.map((sponsor, index) => (
        <a
          key={index}
          href={sponsor.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex cursor-pointer"
        >
          <img
            src={sponsor.img}
            alt={sponsor.name}
            className="w-10 h-10 rounded object-cover border border-nickel transition-[transform,border-color] duration-200 ease-in-out group-hover:border-white/50 group-hover:scale-110"
          />
          {/* .backer-tooltip */}
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-black/90 text-white text-xs whitespace-nowrap rounded opacity-0 pointer-events-none transition-opacity duration-200 z-10 group-hover:opacity-100">
            {sponsor.name}
          </span>
        </a>
      ))}
      {/* Empty placeholder slots */}
      {Array.from({ length: getBackerEmptySlots(tier.items.length) }).map((_, emptyIndex) => (
        <div key={`empty-${emptyIndex}`} className="inline-flex opacity-30" aria-hidden="true">
          <div className="w-10 h-10 rounded border border-nickel/30 bg-transparent" />
        </div>
      ))}
    </div>
  )
}

function LogoGrid({ tier, isOpenCollective }: { tier: SponsorTier; isOpenCollective: boolean }) {
  const config = sizeConfig[tier.size]

  return (
    // Outer border clipping: overflow-hidden -mr-px -mb-px
    <div
      className={`grid overflow-hidden -mr-px -mb-px *:border-r *:border-b *:border-nickel ${getGridColumns(tier.size, tier.items.length)}`}
    >
      {tier.items.map((sponsor, index) => (
        <a
          key={index}
          href={sponsor.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center px-8 transition-opacity opacity-85 hover:opacity-100 ${config.padding}`}
        >
          <img
            src={sponsor.img}
            alt={sponsor.name}
            className={`object-contain ${config.logoSize} ${getLogoClasses(isOpenCollective)}`}
          />
          {isOpenCollective && <span className="ml-5 inline-block">{sponsor.name}</span>}
        </a>
      ))}

      {/* Empty cells to fill incomplete rows */}
      {Array.from({ length: getEmptyCells(tier.items.length, tier.size) }).map((_, emptyIndex) => (
        <div
          key={`empty-${emptyIndex}`}
          className={`flex items-center justify-center px-8 ${config.padding}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export function Sponsors({
  sponsors,
  heading = 'Free & open source',
  description = 'Vite is MIT Licensed and will always be free and open source. This is made possible by our contributors and these companies:',
  sponsorLink = 'https://github.com/sponsors/vitejs',
  sponsorLinkText = 'Become a Sponsor',
  sideBySideTiers,
  logoStyle,
}: Props) {
  const isOpenCollective = logoStyle === 'opencollective'

  // Side-by-side tier data (for layouts like OXC: Bronze + Backers)
  const sideBySideData = useMemo(() => {
    if (!sponsors || !sideBySideTiers) return null

    const [leftTierName, rightTierName] = sideBySideTiers
    const leftTier = sponsors.find((t) => t.tier.toLowerCase() === leftTierName.toLowerCase())
    const rightTier = sponsors.find((t) => t.tier.toLowerCase() === rightTierName.toLowerCase())

    if (!leftTier || !rightTier) return null

    return { left: leftTier, right: rightTier }
  }, [sponsors, sideBySideTiers])

  // Standard stacked tier data (excludes side-by-side tiers)
  const stackedSponsors = useMemo(() => {
    if (!sponsors) return []
    if (!sideBySideTiers) return sponsors

    const sideBySideNames = sideBySideTiers.map((n) => n.toLowerCase())
    return sponsors.filter((tier) => !sideBySideNames.includes(tier.tier.toLowerCase()))
  }, [sponsors, sideBySideTiers])

  return (
    <>
      <Wrapper className="border-t py-14 sm:py-30 px-10" hasTicks>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-20 text-center md:text-left md:pl-15">
          <div className="flex flex-col gap-3">
            <h3 className="text-white max-w-xl text-balance md:text-[2.5rem]">{heading}</h3>
            <p className="max-w-lg text-white/70 text-balance md:text-lg">{description}</p>
            <a
              href={sponsorLink}
              target="_blank"
              rel="noopener noreferrer"
              className="button w-fit mt-8 mx-auto md:mx-0 text-base"
            >
              {sponsorLinkText}
            </a>
          </div>
          <a
            className="flex gap-8 md:gap-12 items-start justify-center md:justify-start md:pr-25"
            href="https://voidzero.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <img
              src={viteByVoidzero}
              alt="Brought to you by VoidZero"
              className="h-44 max-w-full object-contain mt-10 md:mt-0"
            /> */}
          </a>
        </div>
      </Wrapper>

      {sponsors && sponsors.length > 0 ? (
        <Wrapper>
          {/* Standard Stacked Sponsors Grid */}
          {stackedSponsors.map((tier, tierIndex) => (
            <div key={tierIndex} className="border-t border-nickel">
              <TierHeading label={tier.tier} />
              {sizeConfig[tier.size].avatarMode ? (
                <AvatarGrid tier={tier} />
              ) : (
                <LogoGrid tier={tier} isOpenCollective={isOpenCollective} />
              )}
            </div>
          ))}

          {/* Side-by-Side Layout (e.g., Bronze + Backers) */}
          {sideBySideData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-nickel">
              {/* Left Tier */}
              <div className="border-b lg:border-b-0 lg:border-r border-nickel">
                <TierHeading label={sideBySideData.left.tier} />
                <div className="flex flex-col">
                  {sideBySideData.left.items.map((sponsor, index) => (
                    <a
                      key={index}
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-8 py-12 transition-opacity opacity-85 hover:opacity-100 border-b border-nickel last:border-b-0"
                    >
                      <img
                        src={sponsor.img}
                        alt={sponsor.name}
                        className={`object-contain ${sizeConfig[sideBySideData.left.size].logoSize} ${getLogoClasses(isOpenCollective)}`}
                      />
                      {isOpenCollective && (
                        <span className="ml-5 inline-block">{sponsor.name}</span>
                      )}
                    </a>
                  ))}
                </div>
              </div>

              {/* Right Tier (Backers style) */}
              <div>
                <TierHeading label={sideBySideData.right.tier} />
                {sizeConfig[sideBySideData.right.size].avatarMode ? (
                  <AvatarGrid tier={sideBySideData.right} />
                ) : (
                  <LogoGrid tier={sideBySideData.right} isOpenCollective={isOpenCollective} />
                )}
              </div>
            </div>
          )}
        </Wrapper>
      ) : null}
    </>
  )
}
