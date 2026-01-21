# Project Architecture

This document describes the architectural organization of the Jones Family Hub project and explains the reasoning behind design decisions.

## Directory Structure Overview

```
jones-family-hub/
├── app/                    # Next.js App Router
├── components/             # React components
├── lib/                    # Utility functions
├── types/                  # TypeScript definitions
├── public/                 # Static assets
├── docs/                   # Documentation (you are here)
├── .github/                # GitHub configuration
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## Application Directory (`app/`)

Contains all routing logic and page components using Next.js App Router.

### Structure

```
app/
├── (public)/               # Public pages (route group)
│   └── page.tsx            # Home page
├── (auth)/                 # Auth pages (route group, future)
├── (protected)/            # Protected routes (route group, future)
├── api/                    # API routes
│   └── health/
│       └── route.ts        # Health check endpoint
├── layout.tsx              # Root layout component
├── page.tsx                # Root page (delegates to public)
└── globals.css             # Global styles & design tokens
```

### Route Groups

Route groups use parentheses `(name)` to organize related pages without affecting URLs. Benefits:

- **Logical organization** - Group related routes together
- **No URL changes** - `(public)/page.tsx` → `/` (not `/(public)`)
- **Shared layouts** - Each group can have its own layout
- **Future middleware** - Route group-specific middleware

### Future Expansion

```
app/
├── (admin)/                # Admin dashboard
├── (dashboard)/            # User dashboard  
│   ├── profile/
│   └── settings/
└── api/
    ├── members/            # Member CRUD
    ├── reunion/            # Reunion endpoints
    └── uploads/            # File uploads
```

## Components Directory (`components/`)

React components organized by scope and responsibility.

### Structure

```
components/
├── layout/                 # Shared layout components
│   ├── header.tsx          # Navigation header
│   └── footer.tsx          # Footer
├── home/                   # Home page components
│   └── feature-card.tsx    # Reusable feature card
├── ui/                     # Generic UI components
│   └── theme-toggle.tsx    # Theme switcher
└── providers/              # Context & providers
    └── theme-provider.tsx  # Next-themes provider
```

### Organization Guidelines

| Folder | Purpose | Examples |
|--------|---------|----------|
| `layout/` | Shared across all pages | Header, Footer, Navigation |
| `home/`, `directory/` | Feature-specific | Components used by one feature |
| `ui/` | Pure, reusable | Button, Card, Badge |
| `providers/` | Context/state management | ThemeProvider, AuthProvider |
| `forms/` | Form components (future) | MemberForm, LoginForm |

### Best Practices

- **One component per file** (with rare exceptions)
- **Consistent naming** - PascalCase for component files
- **Prop interfaces** - Always define props with TypeScript interfaces
- **Exports first** - Place component at end of file
- **JSDoc comments** - Document complex components

## Utilities (`lib/`)

Shared utility functions and helpers.

```
lib/
├── utils.ts                # Core utilities (cn, formatDate, etc.)
├── auth.ts                 # Auth helpers (future)
├── db.ts                   # Database queries (future)
└── validators.ts           # Form validators (future)
```

### Current Utilities

```typescript
// lib/utils.ts
export function cn(...inputs: ClassValue[]): string
// Merge Tailwind classes, handle conflicts

export function formatDate(date: Date | string): string
// Format date consistently across the app
```

## Types (`types/`)

Centralized TypeScript type definitions.

```
types/
└── index.ts                # All type definitions
```

### Organization

Group related types by feature:

```typescript
// types/index.ts

// Member types
export interface Member { ... }
export interface Family { ... }

// Event types
export interface Event { ... }
export interface Attendee { ... }

// API types
export interface ApiResponse<T> { ... }
```

## Configuration Files

### `tsconfig.json`
- TypeScript compilation options
- Path aliases (`@/` → project root)
- Strict type checking enabled

### `tailwind.config.ts`
- Custom color palette
- Design tokens
- Typography configuration
- Dark mode setup

### `next.config.ts`
- Next.js build optimization
- Image optimization
- Performance settings

### `eslint.config.mjs`
- Code quality rules
- Consistency checking
- Best practices enforcement

## Naming Conventions

Consistent naming improves code navigation and readability.

| Item | Convention | Example |
|------|-----------|---------|
| **Components** | PascalCase | `Header.tsx`, `FeatureCard.tsx` |
| **Functions** | camelCase | `formatDate()`, `cn()` |
| **Files** | kebab-case or PascalCase | `feature-card.tsx`, `Header.tsx` |
| **Routes** | kebab-case | `/api/health`, `/reunion-info` |
| **Types** | PascalCase | `Member`, `FamilyBranch` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_FILE_SIZE`, `API_TIMEOUT` |
| **Private functions** | Leading underscore | `_formatPrivate()` |

## Import Organization

Follow this import order for consistency:

```typescript
// 1. External packages
import type { ReactNode } from 'react'
import Link from 'next/link'
import { Calendar } from 'lucide-react'

// 2. Internal utilities & types
import { cn } from '@/lib/utils'
import type { Member } from '@/types'

// 3. Components
import { Header } from '@/components/layout/header'

// 4. Styles (if file-specific)
import styles from './component.module.css'
```

## Code Organization Principles

1. **Separation of Concerns** - Each file has one responsibility
2. **Composability** - Components are small and composable
3. **Type Safety** - Full TypeScript strict mode
4. **Clear Naming** - Names clearly describe purpose
5. **Documentation** - JSDoc for non-obvious code
6. **Consistency** - Uniform patterns throughout

## Component File Structure

```typescript
// components/home/feature-card.tsx

import Link from 'next/link'

/**
 * Feature card displaying a feature with icon and description
 * @component
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
    <Link href={href} className="card">
      {/* content */}
    </Link>
  )
}
```

## API Route Structure

```typescript
// app/api/health/route.ts

import { NextResponse } from 'next/server'

/**
 * Health check endpoint for deployment monitoring
 */
export async function GET() {
  return NextResponse.json(
    { status: 'healthy', timestamp: new Date().toISOString() },
    { status: 200 }
  )
}
```

## Scalability Considerations

### When to Add New Directories

✅ **Create new directories when:**
- You have 3+ related files
- Creating feature components (e.g., `directory/`, `gallery/`)
- Organizing route groups
- Separating concerns (hooks, middleware, services)

❌ **Don't create directories for:**
- Single files or utilities
- Over-nesting (max 2-3 levels)
- Premature organization

### Planned Growth

As the project grows:

```
lib/
├── auth/                   # Authentication utilities
├── db/                     # Database functions
├── api/                    # API client functions
└── validators/             # Input validation

hooks/                      # Custom React hooks
middleware/                 # Route middleware
services/                   # Business logic

tests/                      # Test files (future)
└── __tests__/
```

## Related Documentation

- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Development guidelines and best practices
- **[API.md](./API.md)** - API endpoints and documentation
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Colors, typography, tokens
- **[Component Guidelines](./guides/COMPONENTS.md)** - Component creation patterns

## External References

- [Next.js App Router](https://nextjs.org/docs/app)
- [React Component Patterns](https://react.dev)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
