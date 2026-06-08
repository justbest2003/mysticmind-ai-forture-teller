import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-11 w-full rounded-xl border border-mystic-700/30 bg-surface-800/60 px-4 py-2 text-sm text-mystic-100 placeholder:text-mystic-500 transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-mystic-500/50 focus:border-mystic-500/50',
        'hover:border-mystic-600/50',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
