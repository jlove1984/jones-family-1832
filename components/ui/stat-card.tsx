'use client'

import Link from 'next/link'
import { clsx } from 'clsx'

/**
 * Stat / overview card per Brand Kit 5.3 (Standard Card). Optional icon, label, value, link.
 */
export interface StatCardProps {
  label: string
  value?: React.ReactNode
  secondary?: React.ReactNode
  icon?: React.ReactNode
  href?: string
  linkLabel?: string
  className?: string
}

export function StatCard({
  label,
  value,
  secondary,
  icon,
  href,
  linkLabel,
  className,
}: StatCardProps) {
  const content = (
    <>
      {icon && (
        <div className="mb-3 text-heritage-green-DEFAULT dark:text-heritage-green-light">
          {icon}
        </div>
      )}
      <h2 className="text-sm font-semibold text-slate-gray dark:text-muted-text mb-2">
        {label}
      </h2>
      {value !== undefined && (
        <p className="font-medium text-charcoal dark:text-light-text">
          {value}
        </p>
      )}
      {secondary !== undefined && secondary !== null && (
        <p className="text-sm text-slate-gray dark:text-muted-text mt-1">
          {secondary}
        </p>
      )}
      {href && linkLabel && (
        <Link
          href={href}
          className="mt-2 inline-block text-sm font-medium text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline"
        >
          {linkLabel} →
        </Link>
      )}
    </>
  )

  const cardClass =
    'rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-6 shadow-card dark:shadow-card-dark'

  if (href && !linkLabel) {
    return (
      <Link href={href} className={clsx('block', cardClass, className)}>
        {content}
      </Link>
    )
  }

  return <div className={clsx(cardClass, className)}>{content}</div>
}
