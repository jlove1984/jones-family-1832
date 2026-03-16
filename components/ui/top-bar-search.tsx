'use client'

import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { useRef, useState } from 'react'

/**
 * NextAdmin-style top bar search: icon + input, submits to directory search.
 * Placeholder and compact width for header alignment.
 */
export function TopBarSearch() {
  const router = useRouter()
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = value.trim()
    if (q) {
      router.push(`/directory?q=${encodeURIComponent(q)}`)
      setValue('')
    } else {
      router.push('/directory')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="hidden sm:flex items-center gap-2 rounded-lg border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray px-3 py-2 min-w-0 w-full max-w-[220px] lg:max-w-[260px] focus-within:ring-2 focus-within:ring-heritage-green-DEFAULT dark:focus-within:ring-heritage-green-light focus-within:ring-offset-0 focus-within:border-transparent"
    >
      <Search className="size-5 shrink-0 text-slate-gray dark:text-muted-text" aria-hidden />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search…"
        className="min-w-0 flex-1 bg-transparent text-sm text-charcoal dark:text-light-text placeholder:text-slate-gray dark:placeholder:text-muted-text focus:outline-none"
        aria-label="Search"
      />
    </form>
  )
}
