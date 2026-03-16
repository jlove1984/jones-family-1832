'use client'

import { clsx } from 'clsx'

/**
 * Badge / status tag for states (Attending, Pending, Paid, etc.). Brand Kit colors.
 */
type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'muted'

const variantStyles: Record<BadgeVariant, string> = {
  default:
    'bg-heritage-green-DEFAULT/10 dark:bg-heritage-green-light/20 text-heritage-green-DEFAULT dark:text-heritage-green-light border border-heritage-green-DEFAULT/30 dark:border-heritage-green-light/30',
  success:
    'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800',
  warning:
    'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800',
  error:
    'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800',
  muted:
    'bg-light-gray/50 dark:bg-medium-gray/50 text-slate-gray dark:text-muted-text border border-light-gray dark:border-medium-gray',
}

export interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
