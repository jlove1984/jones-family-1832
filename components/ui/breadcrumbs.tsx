'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className={clsx('flex items-center gap-1 text-sm', className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRight
                className="size-4 text-slate-gray dark:text-muted-text flex-shrink-0"
                aria-hidden
              />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-slate-gray dark:text-muted-text hover:text-heritage-green-DEFAULT dark:hover:text-heritage-green-light transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={isLast ? 'font-medium text-charcoal dark:text-light-text' : 'text-slate-gray dark:text-muted-text'}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
