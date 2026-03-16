'use client'

import { clsx } from 'clsx'

/**
 * Page header for protected pages: title, optional description, optional actions (right).
 */
export interface PageHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
  className?: string
}

export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
        className
      )}
    >
      <div>
        <h1 className="text-2xl font-display font-semibold text-charcoal dark:text-light-text">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-slate-gray dark:text-muted-text">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  )
}
