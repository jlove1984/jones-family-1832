# Development Guide

This guide provides best practices, standards, and conventions for developing on the Jones Family Hub project. Follow these guidelines to maintain code quality and consistency.

## Code Quality Standards

### TypeScript

- **Strict Mode:** Always enabled - all code must be type-safe
- **No `any`:** Avoid `any` types; use proper typing or generics
- **Explicit returns:** Always specify return types on functions
- **Imports:** Use named imports; avoid default exports from utilities

```typescript
// ❌ Bad
function processData(data) {
  return data.map(x => x.value)
}

// ✅ Good
function processData(data: DataItem[]): number[] {
  return data.map(item => item.value)
}
```

### Components

- **Functional components only:** Use React 19 functional components
- **Props interfaces:** Always define props with interfaces
- **No inline functions:** Extract callbacks to prevent re-renders
- **JSDoc comments:** Document non-obvious or public components

```typescript
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

/**
 * Reusable button component with multiple variants
 * @component
 */
export function Button({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false 
}: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      className={`button button--${variant}`}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
```

### Styling

- **Tailwind CSS only:** Use Tailwind classes; never inline styles
- **Class merging:** Use `cn()` utility when combining classes conditionally
- **Dark mode:** Always test components in dark mode
- **Responsive:** Design mobile-first, use Tailwind breakpoints

```typescript
import { cn } from '@/lib/utils'

export function Card({ highlighted, className }: { 
  highlighted?: boolean
  className?: string 
}) {
  return (
    <div className={cn(
      'p-4 rounded-lg border transition-colors',
      highlighted && 'border-heritage-green-DEFAULT bg-heritage-green-light/10',
      className
    )}>
      {/* content */}
    </div>
  )
}
```

## File Organization

### Component Files

One component per file (with exceptions for very small related components):

```typescript
// components/home/hero-section.tsx
export interface HeroSectionProps {
  title: string
  subtitle?: string
  cta?: React.ReactNode
}

/**
 * Main hero section for the homepage
 */
export function HeroSection({ title, subtitle, cta }: HeroSectionProps) {
  return (
    <section className="...">
      {/* component */}
    </section>
  )
}
```

### Import Organization

Follow this consistent order:

```typescript
// 1. React & external packages
import type { ReactNode } from 'react'
import Link from 'next/link'
import { Calendar } from 'lucide-react'

// 2. Internal utilities & types
import { cn } from '@/lib/utils'
import type { Member } from '@/types'

// 3. Components
import { Header } from '@/components/layout/header'

// 4. Styles (if applicable)
import styles from './component.module.css'
```

### File Naming

- **Components:** PascalCase or kebab-case → `Header.tsx` or `feature-card.tsx`
- **Utilities:** camelCase → `formatDate.ts`, `validators.ts`
- **Routes:** kebab-case → `/api/health`, `/reunion-info`
- **Types:** PascalCase for interfaces → `Member.ts`, `Event.ts`

## Testing (Framework)

When testing is implemented, follow these patterns:

```typescript
// components/__tests__/button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '../button'

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" onClick={() => {}} />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = jest.fn()
    render(<Button label="Click" onClick={onClick} />)
    screen.getByRole('button').click()
    expect(onClick).toHaveBeenCalled()
  })
})
```

### Test Organization

```
components/
├── button.tsx
├── button.module.css
└── __tests__/
    ├── button.test.tsx
    └── button.integration.test.tsx
```

## Performance Optimization

### Image Optimization

Use Next.js Image component with proper optimization:

```typescript
import Image from 'next/image'

export function ProfilePhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={200}
      height={200}
      priority={false}        // Only set true for critical images
      quality={85}             // Balance quality and file size
      placeholder="blur"       // Blur while loading (if available)
    />
  )
}
```

### Code Splitting

Use dynamic imports for heavy components:

```typescript
import dynamic from 'next/dynamic'

const GalleryViewer = dynamic(
  () => import('@/components/gallery/viewer'),
  { 
    loading: () => <div>Loading...</div>,
    ssr: false  // If not needed on server
  }
)
```

### Font Optimization

Fonts are optimized in `app/layout.tsx`:

```typescript
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',  // Prevents FOIT
  weight: ['400', '600', '700'],
})
```

## Common Patterns

### Creating a Feature Component

1. Create folder: `components/[feature]/`
2. Create component file: `components/[feature]/[component].tsx`
3. Define props interface
4. Add JSDoc comment
5. Export component

```typescript
// components/directory/member-card.tsx

export interface MemberCardProps {
  member: Member
  onSelect?: (id: string) => void
}

/**
 * Displays a single family member card in the directory
 */
export function MemberCard({ member, onSelect }: MemberCardProps) {
  return (
    <div onClick={() => onSelect?.(member.id)}>
      {/* content */}
    </div>
  )
}
```

### Creating an API Route

```typescript
// app/api/members/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Handle GET request
    return NextResponse.json({ data: [] })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Handle POST request
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
```

### Creating a Utility Function

```typescript
// lib/formatters.ts

/**
 * Format a date string or Date object to readable format
 * @param date - Date to format
 * @returns Formatted date string (e.g., "January 20, 2026")
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}
```

## Debugging

### Development Tips

```typescript
// Use debug module for conditional logging
const DEBUG = process.env.NODE_ENV === 'development'

export function debug(label: string, data: unknown) {
  if (DEBUG) {
    console.log(`[${label}]`, data)
  }
}

// Usage
debug('user-loaded', user)
```

### Common Issues

**Dark mode not persisting:**
- Verify `ThemeProvider` wraps entire app
- Check that `suppressHydrationWarning` is on `<html>`
- Ensure localStorage is enabled

**Styles not applying:**
- Confirm Tailwind content paths include file
- Verify class names are static (not dynamic)
- Check dark mode class on `<html>`

**Type errors:**
- Run `pnpm type-check` to see all issues
- Use `as const` for literal types
- Leverage TypeScript inference

## Code Review Checklist

Before submitting a PR:

- [ ] Code follows TypeScript strict mode
- [ ] Components have prop interfaces
- [ ] Reusable logic extracted to utilities
- [ ] No `any` types (use proper typing)
- [ ] Imports in correct order
- [ ] Tailwind classes used (no inline styles)
- [ ] `cn()` used for conditional classes
- [ ] Components work in dark mode
- [ ] Responsive design tested
- [ ] JSDoc comments on complex code
- [ ] File naming follows conventions
- [ ] No console.log or debugger left
- [ ] Tests pass (when implemented)
- [ ] Build successful: `pnpm build`
- [ ] Type check passes: `pnpm type-check`
- [ ] Lint passes: `pnpm lint`

## Useful Commands

```bash
# Development
pnpm dev                 # Start dev server with Turbopack
pnpm build              # Build for production
pnpm start              # Start production server

# Code Quality
pnpm lint               # Run ESLint
pnpm type-check         # Run TypeScript compiler
pnpm format             # Format with Prettier (future)

# Maintenance
pnpm add [package]      # Add dependency
pnpm remove [package]   # Remove dependency
pnpm update             # Update dependencies
```

## Resources

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Project structure
- **[Component Guidelines](./guides/COMPONENTS.md)** - Creating components
- **[Next.js Docs](https://nextjs.org/docs)** - Official documentation
- **[React 19 Docs](https://react.dev)** - React documentation
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - Type system

## Getting Help

1. Check existing code patterns in the repository
2. Review [ARCHITECTURE.md](./ARCHITECTURE.md) for structure questions
3. Review [guides/COMPONENTS.md](./guides/COMPONENTS.md) for component patterns
4. Check [guides/TROUBLESHOOTING.md](./guides/TROUBLESHOOTING.md) for common issues
5. Ask the team or create an issue

---

**Remember:** Code is read much more often than written. Prioritize clarity and consistency over cleverness.
