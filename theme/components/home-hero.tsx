import { Wrapper } from './wrapper'

export function HomeHero() {
  return (
    <Wrapper className="grid md:grid-cols-2 w-full border-nickel md:divide-x" hasTicks>
      <div className="flex flex-col p-10 justify-between gap-20 items-center md:items-start">
        <div className="flex flex-col gap-5 items-center md:items-start text-center md:text-left">
          <a className="flex items-center gap-2" href="https://github.com/pmndrs" target="_blank">
            <span className="text-grey text-xs font-mono uppercase tracking-wide">Made with</span>
            ❤️
          </a>
          <h1 className="text-white text-pretty max-w-[25rem] md:text-6xl">
            The Bearbones State Manager
          </h1>
          <p className="text-white/70 max-w-[27rem] text-pretty md:text-lg ">
            A small, fast, and scalable bearbones state management solution.
          </p>
          <div className="flex items-center gap-5 mt-8">
            <a href="/guide/" className="button button--primary inline-block w-fit">
              Get Started
            </a>
            <a
              href="https://github.com/pmndrs/zustand"
              target="_blank"
              rel="noopener noreferrer"
              className="button inline-block w-fit"
            >
              View on GitHub
            </a>
          </div>
        </div>
        {/* <CodeGroup
        :tabs="installTabs"
        className="hidden md:block w-full -mb-[16px]"
        style="
          --vp-code-tab-bg: var(--color-slate);
          --vp-code-block-bg: var(--color-slate);
          --vp-code-tab-divider: #000;
        "
      /> */}
      </div>
      <div className="flex flex-col sm:min-h-[30rem]">
        <div className="relative px-10 pb-10 md:pt-10 h-full flex flex-col justify-center overflow-clip">
          {/* <RiveAnimation
          :desktop-src="viteAnimation"
          :mobile-src="viteAnimation"
          :desktop-width="641"
          :desktop-height="629"
          :mobile-width="641"
          :mobile-height="629"
          canvas-className="w-full"
        /> */}
        </div>
      </div>
    </Wrapper>
  )
}
