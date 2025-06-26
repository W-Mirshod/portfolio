import * as React from 'react'
import { cn } from './utils'

const Button = React.forwardRef(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
        variant === 'ghost' && 'bg-transparent hover:bg-accent hover:text-accent-foreground',
        size === 'icon' && 'h-10 w-10 p-0',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = 'Button'
export { Button }
