import { Wrapper } from './wrapper'
import { LogoGrid } from './logo-grid'

interface TrustedByProps {
  logos: string[]
}

export default function TrustedBy({ logos }: TrustedByProps) {
  const logoItems = logos.map((name) => ({
    src: `/trusted-by/${name}.svg`,
    alt: name,
  }))

  return (
    <>
      <Wrapper className="border-t px-10 py-6 md:py-8 flex flex-col justify-center gap-5" hasTicks>
        <h6 className="text-center md:text-start text-white">
          Trusted by the world's best software teams
        </h6>
      </Wrapper>
      {/* :deep(img) { filter: brightness(0) invert(1); opacity: 0.7 }
          → arbitrary descendant variants targeting imgs inside LogoGrid */}
      <Wrapper className="border-t [&_img]:brightness-0 [&_img]:invert [&_img]:opacity-70" hasTicks>
        <LogoGrid logos={logoItems} />
      </Wrapper>
    </>
  )
}
