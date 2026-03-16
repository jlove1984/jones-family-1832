'use client'

import * as React from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'

/**
 * Button component per Brand Kit 5.1: primary, secondary, tertiary, destructive.
 * Supports link (href), loading, disabled, and size (default, sm).
 */
type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive'
type ButtonSize = 'default' | 'sm'

const base =
  'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-heritage-green-DEFAULT dark:focus:ring-heritage-green-light focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-heritage-green-DEFAULT dark:bg-heritage-green-light text-white dark:text-rich-black shadow-button hover:bg-heritage-green-DEFAULT/90 dark:hover:bg-heritage-green-light/90 active:opacity-90',
  secondary:
    'bg-transparent text-heritage-green-DEFAULT dark:text-heritage-green-light border-2 border-heritage-green-DEFAULT dark:border-heritage-green-light hover:bg-heritage-green-DEFAULT/10 dark:hover:bg-heritage-green-light/15 active:bg-heritage-green-DEFAULT/20 dark:active:bg-heritage-green-light/25',
  tertiary:
    'bg-transparent text-charcoal dark:text-light-text font-medium hover:underline active:opacity-70',
  destructive:
    'bg-red-600 dark:bg-red-500 text-white border-0 shadow-button hover:bg-red-700 dark:hover:bg-red-600 active:opacity-90',
}

const sizes: Record<ButtonSize, string> = {
  default: 'px-6 py-3 text-base',
  sm: 'px-4 py-2 text-sm',
}

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  children: React.ReactNode
  asChild?: false
}

export interface ButtonLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  variant?: ButtonVariant
  size?: ButtonSize
  href: string
  children: React.ReactNode
  asChild?: false
}

function getButtonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string
) {
  return clsx(base, variants[variant], sizes[size], className)
}

export function Button({
  variant = 'primary',
  size = 'default',
  loading = false,
  disabled,
  type = 'button',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading}
      className={getButtonClasses(variant, size, className)}
      {...props}
    >
      {loading ? (
        <>
          <span className="mr-2 size-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  )
}

export function ButtonLink({
  variant = 'primary',
  size = 'default',
  href,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={getButtonClasses(variant, size, className)}
      {...props}
    >
      {children}
    </Link>
  )
}
