import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-mystic-800/30',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
