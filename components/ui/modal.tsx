'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * Modal per Brand Kit 5.5: overlay, max-width 600px, border-radius 16px, focus trap, Escape to close.
 */
export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  React.useEffect(() => {
    if (!open || !ref.current) return
    const focusables = ref.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    first?.focus()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    ref.current.addEventListener('keydown', handleKeyDown)
    return () => ref.current?.removeEventListener('keydown', handleKeyDown)
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={ref}
        className={clsx(
          'relative w-full max-w-[600px] rounded-2xl border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-8 shadow-modal dark:shadow-modal-dark',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-start justify-between gap-4 mb-6">
            <h2 id="modal-title" className="text-xl font-display font-semibold text-charcoal dark:text-light-text">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded p-1 text-charcoal dark:text-light-text hover:bg-light-gray/50 dark:hover:bg-medium-gray/50 focus:outline-none focus:ring-2 focus:ring-heritage-green-DEFAULT dark:focus:ring-heritage-green-light"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </div>
        )}
        {!title && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded p-1 text-charcoal dark:text-light-text hover:bg-light-gray/50 dark:hover:bg-medium-gray/50 focus:outline-none focus:ring-2 focus:ring-heritage-green-DEFAULT dark:focus:ring-heritage-green-light"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}
