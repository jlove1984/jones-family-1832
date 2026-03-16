'use client'

import * as React from 'react'
import { CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * Alert component per Brand Kit 5.6: success, warning, error.
 * Optional title, description, and onDismiss.
 */
type AlertVariant = 'success' | 'warning' | 'error'

const iconComponents: Record<AlertVariant, React.ComponentType<{ className?: string }>> = {
  success: ({ className }) => <CheckCircle2 className={clsx('text-green-600 dark:text-green-400', className)} aria-hidden />,
  warning: ({ className }) => <AlertTriangle className={clsx('text-amber-600 dark:text-amber-400', className)} aria-hidden />,
  error: ({ className }) => <XCircle className={clsx('text-red-600 dark:text-red-400', className)} aria-hidden />,
}

export interface AlertProps {
  variant: AlertVariant
  title?: string
  description?: React.ReactNode
  onDismiss?: () => void
  className?: string
  role?: 'alert' | 'status'
}

export function Alert({
  variant,
  title,
  description,
  onDismiss,
  className,
  role = 'alert',
}: AlertProps) {
  const Icon = iconComponents[variant]
  const isSuccess = variant === 'success'

  const containerClass = clsx(
    'rounded-lg border-l-4 px-4 py-3 flex gap-3',
    variant === 'success' && 'border-l-green-600 dark:border-l-green-400 bg-green-50 dark:bg-green-950/30 text-charcoal dark:text-light-text',
    variant === 'warning' && 'border-l-amber-600 dark:border-l-amber-400 bg-amber-50 dark:bg-amber-950/20 text-charcoal dark:text-light-text',
    variant === 'error' && 'border-l-red-600 dark:border-l-red-400 bg-red-50 dark:bg-red-950/30 text-charcoal dark:text-light-text',
    className
  )

  return (
    <div className={containerClass} role={isSuccess ? 'status' : role}>
      <span className="flex-shrink-0 mt-0.5">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        {title && <p className="font-semibold text-sm">{title}</p>}
        {(description !== undefined && description !== null) && (
          <p className={clsx('text-sm', title && 'mt-1')}>{description}</p>
        )}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="flex-shrink-0 rounded p-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-heritage-green-DEFAULT dark:focus:ring-heritage-green-light"
          aria-label="Dismiss"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
