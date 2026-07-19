import { Wrapper } from './wrapper'
import { type FeatureCardProps, FeatureCard } from './feature-card'

const FEATURES: FeatureCardProps[] = [
  {
    title: 'Flexible Plugin System',
    titleClassName: 'text-balance sm:text-pretty',
    description:
      "Vite plugins extends Rollup's well-designed plugin interface with a few extra Vite-specific options.",
    descriptionClassName: 'sm:max-w-[28rem]',
  },
  {
    className: 'border-r-0',
    title: 'Fully Typed API',
    description: 'Designed to be built on top of.',
    descriptionClassName: 'max-w-[26rem]',
    mediaClassName: 'bg-[#370a7f]',
    media: (
      <>
        <img
          className="absolute inset-0 h-full w-full object-cover"
          // src={typedApiBg}
          alt=""
          loading="lazy"
        />
        <img
          className="relative"
          // src={typedApiSvg}
          width={454}
          height={252}
          alt="typed api"
          loading="lazy"
        />
      </>
    ),
  },
  {
    className: 'lg:border-b-0',
    title: 'First class SSR Support',
    description:
      "It's never been easier to setup custom SSR (Server-Side Rendering), or build your own SSR framework.",
    descriptionClassName: 'sm:max-w-[28rem]',
    mediaVariant: 'inline',
    media: (
      <img
        // src={ssrImg}
        width={1008}
        height={466}
        alt="SSR Support"
        loading="lazy"
        className="w-full px-5 mt-12 sm:mt-16"
      />
    ),
  },
  {
    title: 'Continuous ecosystem integration',
    description:
      'Our CI continuously tests Vite changes against downstream projects, allowing us to improve Vite with stability and confidence.',
    descriptionClassName: 'max-w-[25rem]',
    mediaClassName: 'px-5 sm:px-10 py-0 sm:py-0',
    media: (
      <img
        // src={ciSvg}
        width={476}
        height={272}
        alt="continuous ecosystem integration"
        loading="lazy"
      />
    ),
  },
]

export function FeatureGridAlternative() {
  return (
    <Wrapper className="border-t grid lg:grid-cols-2 divide-x divide-y divide-nickel" hasTicks>
      {FEATURES.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </Wrapper>
  )
}
