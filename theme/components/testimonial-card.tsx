import cn from 'cnfast'

export function TestimonialCard({ className, testimonial }) {
  return (
    <div
      className={cn(
        'relative overflow-clip isolate rounded-lg p-6 sm:px-8 sm:py-10 flex flex-col gap-6',
        "before:content-[''] before:absolute before:inset-0 before:opacity-0 before:z-0 before:pointer-events-none before:transition-opacity before:duration-100 before:ease-in-out hover:before:opacity-100",
        "after:content-[''] after:absolute after:inset-px after:z-[1] after:rounded-lg after:bg-slate after:border after:border-nickel after:transition-[border-color,background] after:duration-100 after:ease-in-out hover:after:border-transparent",
        'before:bg-[linear-gradient(135deg,#eb2972_-7%,#06c0cc_73%)] before:bg-[length:150%_150%] before:bg-center before:animate-[move-background_16s_ease-in-out_infinite] [&:nth-child(2)]:before:animate-[move-background_18s_ease-in-out_infinite_-3s] [&:nth-child(3)]:before:animate-[move-background_14s_ease-in-out_infinite_-7s] [&:nth-child(4)]:before:animate-[move-background_20s_ease-in-out_infinite_-5s] [&:nth-child(5)]:before:animate-[move-background_15s_ease-in-out_infinite_-9s] [&:nth-child(6)]:before:animate-[move-background_19s_ease-in-out_infinite_-2s] [&:nth-child(7)]:before:animate-[move-background_17s_ease-in-out_infinite_-11s] [&:nth-child(8)]:before:animate-[move-background_16s_ease-in-out_infinite_-6s]',
        className,
      )}
    >
      <div className="relative z-[2] flex flex-col gap-4">
        {testimonial.comment.map((paragraph, paragraphIndex) => (
          <p key={paragraphIndex} className="text-white/70 leading-relaxed text-sm sm:text-base">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="relative z-[2] flex items-center gap-5 mt-auto">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-sm object-cover flex-shrink-0"
          loading="lazy"
        />

        <div className="flex flex-col">
          <span className="text-grey text-sm font-mono">{testimonial.name}</span>
          <span className="text-biege text-sm font-mono">{testimonial.handle}</span>
        </div>
      </div>
    </div>
  )
}
