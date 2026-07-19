import cn from 'cnfast'

interface WrapperProps {
  className?: string
  hasTicks?: boolean
  children?: React.ReactNode
}

export function Wrapper({ className, hasTicks, children }: WrapperProps) {
  return (
    <section
      className={cn(
        'md:max-w-[calc(100vw-2rem)] min-[90rem]:max-w-[90rem] mx-auto md:border-l md:border-r border-stroke dark:border-nickel divide-stroke dark:divide-nickel relative overflow-x-clip',
        hasTicks &&
          "before:content-[''] before:absolute before:-top-[5px] before:left-0 before:w-0 before:h-0 before:border-[5px] before:border-transparent before:border-l-stroke dark:before:border-l-nickel",
        hasTicks &&
          "after:content-[''] after:absolute after:-top-[5px] after:right-0 after:w-0 after:h-0 after:border-[5px] after:border-transparent after:border-l-0 dark:after:border-r-nickel",
        className,
      )}
    >
      {children}
    </section>
  )
}
