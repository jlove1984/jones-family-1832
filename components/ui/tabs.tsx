'use client'

import * as React from 'react'
import { clsx } from 'clsx'

type TabsContextValue = {
  value: string
  onChange: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

export interface TabsProps {
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
  className?: string
}

export function Tabs({ value, onChange, children, className }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onChange }}>
      <div className={className} role="tablist">
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export interface TabsListProps {
  children: React.ReactNode
  className?: string
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div
      className={clsx(
        'flex flex-wrap gap-1 rounded-lg border border-light-gray dark:border-medium-gray p-1 bg-light-gray/30 dark:bg-medium-gray/30',
        className
      )}
    >
      {children}
    </div>
  )
}

export interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error('TabsTrigger must be used within Tabs')

  const isActive = ctx.value === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => ctx.onChange(value)}
      className={clsx(
        'rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-heritage-green-DEFAULT dark:focus:ring-heritage-green-light focus:ring-offset-2',
        isActive
          ? 'bg-white dark:bg-dark-gray text-heritage-green-DEFAULT dark:text-heritage-green-light shadow-sm'
          : 'text-slate-gray dark:text-muted-text hover:text-charcoal dark:hover:text-light-text',
        className
      )}
    >
      {children}
    </button>
  )
}

export interface TabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error('TabsContent must be used within Tabs')

  if (ctx.value !== value) return null

  return (
    <div className={className} role="tabpanel">
      {children}
    </div>
  )
}
