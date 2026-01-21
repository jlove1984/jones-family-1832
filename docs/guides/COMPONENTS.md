# Component Guidelines

Best practices for creating and organizing React components in Jones Family Hub.

## Component Structure

### Basic Component Pattern

```typescript
// components/home/feature-card.tsx

/**
 * Displays a feature card with icon, title, and description
 * Used on the homepage to highlight key features
 * 
 * @component
 * @example
 * const icon = <Users className="h-10 w-10" />
 * return <FeatureCard icon={icon} title="Directory" description="View members" href="/directory" />
 */
export interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

export function FeatureCard({
  icon,
  title,
  description,
  href,
}: FeatureCardProps) {
  return (
    <a href={href} className="feature-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  )
}
```

## File Organization

### Where to Create Components

| Type | Location | Example |
|------|----------|---------|
| Layout (shared) | `components/layout/` | `header.tsx`, `footer.tsx` |
| Feature-specific | `components/[feature]/` | `components/home/hero-section.tsx` |
| Reusable UI | `components/ui/` | `button.tsx`, `card.tsx` |
| Providers/Context | `components/providers/` | `theme-provider.tsx` |

### File Organization Inside Component

```
components/home/
├── feature-card.tsx           # Main component
├── feature-card.module.css    # Component styles (if needed)
└── __tests__/
    └── feature-card.test.tsx  # Component tests
```

## Props Pattern

Always define component props with TypeScript interfaces:

```typescript
/**
 * Clearly document the purpose of each prop
 */
export interface ButtonProps {
  /** Button text content */
  label: string
  
  /** Callback when button is clicked */
  onClick: () => void
  
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline'
  
  /** Whether button is disabled */
  disabled?: boolean
  
  /** Additional CSS classes */
  className?: string
}

export function Button({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false,
  className 
}: ButtonProps) {
  // ...
}
```

## Styling Components

### Using Tailwind CSS

Always use Tailwind classes. Never use inline styles:

```typescript
// ✅ Good - Tailwind classes
export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-lg border border-gray-200">
      {children}
    </div>
  )
}

// ❌ Bad - Inline styles
export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: '16px', borderRadius: '8px' }}>
      {children}
    </div>
  )
}
```

### Conditional Classes

Use the `cn()` utility for conditional Tailwind classes:

```typescript
import { cn } from '@/lib/utils'

export function Card({ 
  children, 
  highlighted 
}: { 
  children: React.ReactNode
  highlighted?: boolean 
}) {
  return (
    <div className={cn(
      'p-4 rounded-lg border transition-colors',
      highlighted && 'border-blue-500 bg-blue-50'
    )}>
      {children}
    </div>
  )
}
```

## Component Patterns

### Composition Pattern

Build complex components from smaller ones:

```typescript
// components/home/hero-section.tsx
export function HeroSection() {
  return (
    <section className="hero">
      <HeroTitle title="Welcome" />
      <HeroSubtitle subtitle="Join us" />
      <HeroCTA href="/reunion" label="Learn More" />
    </section>
  )
}

export function HeroTitle({ title }: { title: string }) {
  return <h1 className="text-4xl font-bold">{title}</h1>
}

export function HeroSubtitle({ subtitle }: { subtitle: string }) {
  return <p className="text-lg text-gray-600">{subtitle}</p>
}

export function HeroCTA({ href, label }: { href: string; label: string }) {
  return <Link href={href} className="btn btn-primary">{label}</Link>
}
```

### Container Pattern

Separate layout (container) from presentation:

```typescript
// components/layout/page-container.tsx
export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}

// Usage
export function HomePage() {
  return (
    <PageContainer>
      <h1>Welcome</h1>
    </PageContainer>
  )
}
```

### State Management Pattern

Keep state close to where it's used:

```typescript
'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
```

## Dark Mode

Always test and style for dark mode:

```typescript
export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      {children}
    </div>
  )
}
```

Dark mode classes:
- `dark:` prefix for dark mode styles
- Tested via theme-toggle component
- Tailwind dark mode enabled in config

## Responsive Design

Use mobile-first approach with Tailwind breakpoints:

```typescript
export function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {children}
    </div>
  )
}
```

Breakpoints:
- `sm:` → 640px and up
- `md:` → 768px and up
- `lg:` → 1024px and up
- `xl:` → 1280px and up

## Performance

### Memoization

Memoize components that are expensive or prevent unnecessary re-renders:

```typescript
import { memo } from 'react'

const FeatureCard = memo(function FeatureCard({ 
  icon, 
  title 
}: FeatureCardProps) {
  return (
    <div>
      {icon}
      <h3>{title}</h3>
    </div>
  )
})

export default FeatureCard
```

### Code Splitting

Load heavy components only when needed:

```typescript
import dynamic from 'next/dynamic'

const GalleryViewer = dynamic(
  () => import('@/components/gallery/viewer'),
  { loading: () => <div>Loading...</div> }
)
```

### Callback Functions

Extract callbacks to prevent component re-renders:

```typescript
// ❌ Bad - Function recreated on every render
export function UserList() {
  return (
    <ul>
      {users.map(user => (
        <UserItem 
          key={user.id} 
          user={user}
          onClick={() => selectUser(user.id)}  // New function each render
        />
      ))}
    </ul>
  )
}

// ✅ Good - Handler defined outside
export function UserList() {
  const handleUserSelect = (id: string) => selectUser(id)
  
  return (
    <ul>
      {users.map(user => (
        <UserItem 
          key={user.id} 
          user={user}
          onClick={() => handleUserSelect(user.id)}
        />
      ))}
    </ul>
  )
}
```

## Accessibility

Components should be accessible to all users:

```typescript
export function Button({ 
  label, 
  onClick,
  disabled 
}: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      aria-label={label}  // Screen reader label
      className="px-4 py-2 rounded"
    >
      {label}
    </button>
  )
}
```

## Type Safety

Always use proper TypeScript types:

```typescript
import type { ReactNode } from 'react'

export interface WrapperProps {
  children: ReactNode
  className?: string
}

export function Wrapper({ children, className = '' }: WrapperProps) {
  return <div className={className}>{children}</div>
}
```

## Documentation

Document non-obvious components with JSDoc:

```typescript
/**
 * Hero section with countdown timer for family reunion
 * 
 * Displays the main heading, subtitle, and countdown timer
 * to the upcoming family reunion event.
 * 
 * @component
 * @example
 * return <HeroSection daysUntil={180} />
 */
export function HeroSection({ daysUntil }: { daysUntil: number }) {
  return (
    <section>
      <h1>Reunion {daysUntil} Days Away!</h1>
    </section>
  )
}
```

## Testing Components

When tests are implemented, follow this pattern:

```typescript
// components/__tests__/button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../button'

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" onClick={() => {}} />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = jest.fn()
    render(<Button label="Click" onClick={onClick} />)
    
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('applies disabled state', () => {
    render(<Button label="Click" onClick={() => {}} disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

## Common Mistakes

❌ **Don't:**
- Use inline styles
- Define functions inside JSX
- Forget prop interfaces
- Skip dark mode support
- Create large monolithic components
- Use `any` type
- Create many levels of nesting

✅ **Do:**
- Use Tailwind classes
- Extract logic to functions
- Define prop interfaces
- Test dark mode
- Split into smaller components
- Use proper types
- Keep nesting to 2-3 levels

## Checklist for New Components

- [ ] Component file created in correct directory
- [ ] Props interface defined
- [ ] JSDoc comment added
- [ ] Tailwind classes (no inline styles)
- [ ] Dark mode tested
- [ ] Responsive design verified
- [ ] Type safety checked
- [ ] Reusable patterns used
- [ ] No console.log left
- [ ] Tested in browser

## Resources

- **[ARCHITECTURE.md](../ARCHITECTURE.md)** - Project structure
- **[DEVELOPMENT.md](../DEVELOPMENT.md)** - Coding standards
- **[React Docs](https://react.dev)** - React documentation
- **[Next.js Components](https://nextjs.org/docs/app/building-your-application/rendering)** - Next.js patterns
