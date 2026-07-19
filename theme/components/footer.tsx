import { FooterNav } from './footer-nav'
import { Wrapper } from './wrapper'

export function Footer({ heading, subheading, buttonText, buttonLink }) {
  return (
    <footer className="bg-primary" data-theme="dark">
      <Wrapper>
        <div className="relative w-full bg-[linear-gradient(135deg,#eb2972_-7%,#06c0cc_73%)]">
          {/* <img :src="backgroundImage" alt="Footer background" inert loading="lazy"
             className="absolute inset-0 w-full h-full object-cover z-0"/> */}
          <div className="relative z-10 w-full sm:w-2xl flex flex-col justify-start items-center gap-5 px-5 sm:px-0 py-10 md:py-30 mx-auto">
            <h2 className="text-center text-white text-balance drop-shadow-sm/70 md:text-5xl">
              {heading}
            </h2>
            <p className="text-white max-w-md text-balance text-center drop-shadow-sm/70 md:text-lg">
              {subheading}
            </p>
            <a href={buttonLink} className="button button--white mt-5">
              {buttonText}
            </a>
          </div>
        </div>
      </Wrapper>

      <FooterNav />
    </footer>
  )
}
