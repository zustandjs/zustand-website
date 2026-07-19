import { Wrapper } from './wrapper'

interface HeadingProps {
  heading: string
  subheading?: string
}

export function Heading({ heading, subheading }: HeadingProps) {
  return (
    <Wrapper className="border-t px-5 sm:px-10 py-14 sm:py-28 flex flex-col justify-center gap-3 text-center items-center">
      <h2 className="text-white max-w-2xl text-balance text-center md:text-5xl">{heading}</h2>
      {subheading ? (
        <p className="max-w-md text-white/70 text-balance sm:text-pretty md:text-lg">
          {subheading}
        </p>
      ) : null}
    </Wrapper>
  )
}
