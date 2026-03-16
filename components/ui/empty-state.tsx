'use client'

import { clsx } from 'clsx'

/**
 * Empty state per Brand Kit 5.17: optional icon (48px), heading, copy, primary CTA.
 */
export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray py-12 px-6 text-center',
        className
      )}
    >
      {icon && (
        <div className="mb-4 flex size-12 items-center justify-center text-slate-gray dark:text-muted-text [&>svg]:size-12">
          {icon}
        </div>
      )}
      <h2 className="text-lg font-semibold text-charcoal dark:text-light-text">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-slate-gray dark:text-muted-text">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
