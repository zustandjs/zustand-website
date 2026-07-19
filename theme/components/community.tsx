import { IconGithub } from '@rspress/core/theme'

import { Wrapper } from './wrapper'
import { TestimonialCard } from './testimonial-card'

interface Testimonial {
  name: string
  handle: string
  avatar: string
  comment: string[]
}

const testimonials: Testimonial[] = [
  {
    name: 'Dominik',
    handle: '@TkDodo',
    avatar: 'https://pbs.twimg.com/profile_images/2066493098058739712/7vY_pI84_normal.jpg',
    comment: [
      `❤️ I've talked a lot about how I love zustand - I've been using it quite extensively over the last 3 years.`,
      `📚 This is the beginning of a series I've planned on "working with zustand". The intro is a bit basic, I want to go deeper in the future:`,
    ],
  },
  {
    name: 'David K Piano',
    handle: '@DavidKPiano',
    avatar: 'https://pbs.twimg.com/profile_images/619677584805208064/RwwbnNpi_normal.jpg',
    comment: [
      'Zustand proved that developers (and LLMs) prefer simplicity. Well-deserved milestone',
    ],
  },
  {
    name: 'Tiger Abrodi',
    handle: '@TAbrodi',
    avatar: 'https://pbs.twimg.com/profile_images/2052931550594162688/W7RW43H8_normal.jpg',
    comment: [
      `What state management libraries yall use in React?`,
      `I would honestly just go with Zustand, I love it....`,
      `I know they all got their own trade offs and stuff, but Zustand is so easy to use, lovely..`,
    ],
  },
  {
    name: 'Tanner Linsley',
    handle: '@tannerlinsley',
    avatar: 'https://pbs.twimg.com/profile_images/1943040832564506624/mbc_FWFV_normal.jpg',
    comment: [
      `I'm using #ReactQuery with Zustand and really liking the pairing. It's a super tiny, very flexible, no-nonsense client-state solution for React.`,
      `If I were to write a client-state solution from scratch, it would likely resemble Zustand in many ways.`,
    ],
  },
  {
    name: 'Jack Herrington',
    handle: '@jherr',
    avatar: 'https://pbs.twimg.com/profile_images/1829194820062990340/CJgUCHxp_normal.jpg',
    comment: [
      `Zustand is a case where the home page design might be so cool that it distracts you from the technology it's trying to promote. I was casually showing Zustand off yesterday and most folks were stuck on the cool parallax effect. `,
    ],
  },
  {
    name: 'Carles Núñez Tomeo',
    handle: '@carlesnunez',
    avatar: 'https://pbs.twimg.com/profile_images/1988166583349374976/Tez9-v_O_normal.jpg',
    comment: [
      `I do recommend you to check zustand. It allows you to compute which state values you wanna react too with an store based approach.`,
      `I know its not a pure hook and is a middle ground state mgmnt solution but it performs really well.`,
    ],
  },
  {
    name: 'bytes.dev',
    handle: '@bytesdotdev',
    avatar: 'https://pbs.twimg.com/profile_images/1738349930409054208/sT9hUvny_normal.jpg',
    comment: [
      `Zustand is small, fast and scaleable state-management solution created by @0xca0a. It has a hooks-based api, isn’t boilerplate-y or opinionated, and is “just enough to be explicit and flux-like.”`,
    ],
  },
  {
    name: 'Master.dev',
    handle: '@MasterDotDev',
    avatar: 'https://pbs.twimg.com/profile_images/911069740164108289/ZiVAi6zG_normal.jpg',
    comment: [
      `Zustand is a minimal, but fun and effective state management library which just may improve your render performance.`,
    ],
  },
  {
    name: 'Andrei Canta',
    handle: '@deiucanta',
    avatar: 'https://pbs.twimg.com/profile_images/1771140518996549632/l0dbjYq__normal.jpg',
    comment: [
      `My go-to state management solution for React is simple:`,
      `✅ react-query for async state (by @tannerlinsley)\n✅ zustand for sync state (by @pmndrs)`,
      `I wonder if react-query could do something for sync state since I assume it has all the required primitives.`,
    ],
  },
]

export function Community() {
  return (
    <Wrapper className="border-t pt-14 sm:pt-30 px-5 sm:px-10" hasTicks>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-20 text-center sm:text-left">
        <div className="flex flex-col gap-3">
          <h3 className="text-white max-w-xl text-balance md:text-[2.5rem]">
            Loved by the community
          </h3>
          <p className="max-w-md text-white/70 text-balance md:text-lg">
            As an open-source project, Zustand thrives on community feedback. Don't just take our
            word for it — see what users are saying.
          </p>
        </div>
        <div className="flex gap-8 sm:gap-12 items-start justify-center sm:justify-start sm:pr-20">
          <div className="flex flex-col gap-3">
            <h2 className="text-white md:text-5xl">50k+</h2>
            <p className="text-grey flex items-center gap-2">
              <IconGithub className="w-5 h-5" />
              Github Stars
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-white md:text-5xl">35m+</h2>
            <p className="text-grey md:text-lg">Weekly NPM downloads</p>
          </div>
        </div>
      </div>
      <div className="pt-14 sm:pt-30 h-[50rem] overflow-clip [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="break-inside-avoid mb-5">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  )
}
