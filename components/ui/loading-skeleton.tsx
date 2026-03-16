'use client'

import { clsx } from 'clsx'

/**
 * Loading skeletons per Brand Kit 5.17: rectangles/circles in Light Gray / Dark Gray.
 */
export interface LoadingSkeletonProps {
  className?: string
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded bg-light-gray dark:bg-medium-gray',
        className
      )}
      aria-hidden
    />
  )
}

/**
 * Card-shaped skeleton for list/grid items.
 */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={clsx('rounded-card border border-light-gray dark:border-medium-gray p-6', className)}>
      <LoadingSkeleton className="mb-4 h-24 w-full rounded-lg" />
      <LoadingSkeleton className="mb-2 h-4 w-3/4" />
      <LoadingSkeleton className="h-3 w-full" />
    </div>
  )
}

/**
 * Row-shaped skeleton for table/list rows.
 */
export function RowSkeleton({ className }: { className?: string }) {
  return (
    <div className={clsx('flex items-center gap-3 py-3', className)}>
      <LoadingSkeleton className="size-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <LoadingSkeleton className="h-4 w-32" />
        <LoadingSkeleton className="h-3 w-20" />
      </div>
    </div>
  )
}
