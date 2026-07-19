import type { ReactNode } from 'react'
import { cn } from 'cnfast'

export type FeatureCardProps = {
  title: string
  titleClassName?: string
  description: ReactNode
  /** Line-length tuning for the paragraph */
  descriptionClassName?: string
  /** Overrides the padded text body (e.g. remove bottom padding) */
  bodyClassName?: string
  media?: ReactNode
  /** 'inline' = media flows inside the padded body; 'panel' = pinned to bottom edge */
  mediaVariant?: 'inline' | 'panel'
  /** Styles the panel container (backgrounds, custom padding, alignment) */
  mediaClassName?: string
  className?: string
}

export function FeatureCard({
  title,
  titleClassName,
  description,
  descriptionClassName,
  bodyClassName,
  media,
  mediaVariant = 'panel',
  mediaClassName,
  className,
}: FeatureCardProps) {
  return (
    <div className={cn('flex flex-col justify-between', className)}>
      <div className={cn('flex flex-col gap-3 p-5 sm:p-10', bodyClassName)}>
        <h3 className={cn('text-h5 text-white', titleClassName)}>{title}</h3>
        <p className={cn('text-pretty', descriptionClassName)}>{description}</p>
        {media && mediaVariant === 'inline' ? media : null}
      </div>
      {media && mediaVariant === 'panel' ? (
        <div className={cn('relative flex justify-center p-5 sm:p-10', mediaClassName)}>
          {media}
        </div>
      ) : null}
    </div>
  )
}
