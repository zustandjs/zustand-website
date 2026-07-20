import { useMemo } from 'react'
import { useSite } from '@rspress/core/runtime' // Rspress v1: `import { useSiteData } from 'rspress/runtime'`
import { Wrapper } from './wrapper'
import type { NavItem, SocialLink } from '@rspress/core'
// import { Icon } from '@iconify/react'

// Social icon name mapping
const socialIconName = (icon: string): string => {
  const key = icon.toLowerCase()
  if (key === 'twitter') return 'simple-icons:x'
  return `simple-icons:${key}`
}

// Footer configuration types
interface FooterLink {
  text: string
  link: string
}

interface FooterColumn {
  title: string
  items: FooterLink[]
}

export interface FooterConfig {
  message?: string
  copyright?: string
  nav?: FooterColumn[]
  social?: SocialLink[]
}

// Get display label for social link
const getSocialLabel = (social: SocialLink): string => {
  const labels: Record<string, string> = {
    github: 'GitHub',
    discord: 'Discord',
    bluesky: 'Bluesky',
    twitter: 'X.com',
    x: 'X.com',
  }
  return labels[social.icon as string] || (social.icon as string)
}

export function FooterNav() {
  const { site } = useSite() // Rspress v1: `const site = useSiteData()`
  const footerCopyright = `© ${new Date().getFullYear()} Zustand. All Rights Reserved.`

  const footerNav = [
    {
      text: site.logoText,
      link: site.base,
      // oxlint-disable-next-line no-unsafe-optional-chaining
      items: (site.themeConfig.locales[0].nav?.default as unknown as NavItem[]).filter(
        (item) => !item.text?.startsWith('v'),
      ),
    },
  ]

  return (
    <div>
      <Wrapper className="border-t" hasTicks>
        <div className="px-5 md:px-24 pt-10 md:pt-16 pb-16 md:pb-40 flex flex-col md:flex-row gap-10 md:gap-0 md:justify-between">
          <div className="flex flex-col md:flex-row gap-10 md:gap-20">
            {footerNav.map((column) => (
              <div key={column.link}>
                <p className="text-[var(--vp-c-text-2)] text-xs font-mono uppercase tracking-wide mb-8">
                  {column.text}
                </p>
                <ul className="flex flex-col gap-3">
                  {column.items?.map((item) => (
                    <li key={item.link}>
                      <a href={item.link} className="text-[var(--vp-c-text-1)] text-base">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {site.themeConfig.socialLinks?.length ? (
            <div>
              <p className="text-[var(--vp-c-text-2)] text-xs font-mono uppercase tracking-wide mb-8">
                Social
              </p>
              <ul className="flex flex-col gap-3">
                {site.themeConfig.socialLinks.map((social) => (
                  <li key={social.content}>
                    <a
                      href={social.content}
                      className="text-[var(--vp-c-text-1)] text-base flex gap-3 items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {/* <Icon
                        icon={socialIconName(social.icon)}
                        className="size-[18px]"
                        aria-label={getSocialLabel(social)}
                      /> */}
                      {getSocialLabel(social)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Wrapper>

      <Wrapper
        className="border-t py-5 px-5 md:px-24 flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-start md:items-center"
        hasTicks
      >
        <p className="text-sm">{footerCopyright}</p>
        <div className="gap-10 text-sm hidden md:flex">
          {/*
          <a href="https://voidzero.dev/terms" className="text-grey">Terms & Conditions</a>
          <a href="https://voidzero.dev/privacy" className="text-grey">Privacy Policy</a>
          */}
        </div>
      </Wrapper>
    </div>
  )
}
