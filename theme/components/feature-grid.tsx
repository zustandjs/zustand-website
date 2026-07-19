import { Wrapper } from './wrapper'
import { FeatureCard, type FeatureCardProps } from './feature-card'

const FEATURES: FeatureCardProps[] = [
  {
    title: 'Instant Server Start',
    titleClassName: 'text-balance sm:text-pretty',
    description:
      'On demand source file serving over native ESM, with blazing fast dependency pre-bundling.',
    descriptionClassName: 'sm:max-w-[28rem]',
    mediaClassName: 'p-10 sm:p-15 bg-[#370a7f]',
    media: (
      <>
        <img
          className="absolute inset-0 h-full w-full object-cover"
          // src={serverStartBg}
          alt=""
          loading="lazy"
        />
        <img
          className="relative"
          // src={serverStartTerminal}
          width={493}
          height={230}
          alt="Terminal"
          loading="lazy"
        />
      </>
    ),
  },
  {
    className: 'border-r-0',
    title: 'Lightning Fast HMR',
    description: 'Instantly reflect changes as you save, no matter how big your app is.',
    descriptionClassName: 'max-w-[26rem]',
    mediaClassName: 'justify-end p-0 sm:p-0',
    media: (
      <img
        // src={hmrTerminal}
        width={1126}
        height={734}
        className="md:max-w-[80%]"
        alt="lightning fast hot module replacement"
        loading="lazy"
      />
    ),
  },
  {
    className: 'lg:border-b-0',
    title: 'Rich Features Out of the Box',
    bodyClassName: 'pb-0 sm:pb-0',
    description: 'TypeScript, JSX, CSS, Workers, WebAssembly... and more just a plugin away.',
    descriptionClassName: 'sm:max-w-[28rem]',
    // TODO: port RiveAnimation from Vue — add it as `media` with mediaVariant: 'inline'
  },
  {
    className: 'border-r-0 border-b-0',
    title: 'Optimized Build',
    description:
      'Advanced tree-shaking, built-in minification, fine-grained chunking control powered by Rolldown.',
    descriptionClassName: 'max-w-[25rem]',
    mediaClassName: 'p-10 sm:p-15 bg-[#370a7f]',
    media: (
      <>
        <img
          className="absolute inset-0 h-full w-full object-cover"
          // src={optimizedBuildBg}
          alt=""
          loading="lazy"
        />
        <img
          className="relative"
          // src={optimizedBuildTerminal}
          width={436}
          height={209}
          alt="optimized build"
          loading="lazy"
        />
      </>
    ),
  },
]

export function FeatureGrid() {
  return (
    <Wrapper className="border-t grid lg:grid-cols-2 divide-x divide-y divide-nickel" hasTicks>
      {FEATURES.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </Wrapper>
  )
}
