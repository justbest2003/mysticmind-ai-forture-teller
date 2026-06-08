import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mystic-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-mystic-600 to-cosmic-600 text-white shadow-lg shadow-mystic-500/25 hover:shadow-mystic-500/40 hover:scale-[1.02] active:scale-[0.98]',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/25',
        outline:
          'border border-mystic-600/50 bg-transparent text-mystic-200 hover:bg-mystic-800/30 hover:border-mystic-500/70',
        secondary:
          'bg-surface-700 text-mystic-200 hover:bg-surface-600 shadow-md',
        ghost:
          'text-mystic-300 hover:bg-mystic-800/20 hover:text-mystic-100',
        link: 'text-mystic-400 underline-offset-4 hover:underline hover:text-mystic-300',
        gold: 'bg-gradient-to-r from-gold-600 to-gold-500 text-surface-900 font-semibold shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-[1.02] active:scale-[0.98]',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-lg px-4 text-xs',
        lg: 'h-13 rounded-xl px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
