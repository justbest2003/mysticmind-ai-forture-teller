import * as React from 'react'
import { cn } from '@/lib/utils'

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[100px] w-full rounded-xl border border-mystic-700/30 bg-surface-800/60 px-4 py-3 text-sm text-mystic-100 placeholder:text-mystic-500 transition-all duration-300 resize-none',
        'focus:outline-none focus:ring-2 focus:ring-mystic-500/50 focus:border-mystic-500/50',
        'hover:border-mystic-600/50',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
