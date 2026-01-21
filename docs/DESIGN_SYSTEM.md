# Design System

The Jones Family Hub design system ensures visual and interaction consistency across the platform.

## Color Palette

All colors are defined in `tailwind.config.ts` and available as Tailwind classes.

### Primary Colors

These are the core brand colors for the Jones Family.

| Name | Hex | Tailwind Class | Usage |
|------|-----|---|---|
| Heritage Green | `#2D5016` | `heritage-green-DEFAULT` | Primary buttons, headers |
| Heritage Green Light | `#4A8028` | `heritage-green-light` | Hover states, accents |
| Legacy Gold | `#C19A6B` | `legacy-gold-DEFAULT` | Accent sections, highlights |
| Legacy Gold Bright | `#D4B896` | `legacy-gold-bright` | Links, emphasis |
| Family Burgundy | `#6B2E2E` | `family-burgundy-DEFAULT` | Secondary buttons, borders |
| Family Burgundy Light | `#9B4545` | `family-burgundy-light` | Hover states |

### Secondary Colors

Supporting colors for additional design needs.

| Name | Hex | Tailwind Class | Usage |
|------|-----|---|---|
| Sage | `#8BA888` | `sage-DEFAULT` | Subtle backgrounds |
| Sage Muted | `#6B9A68` | `sage-muted` | Muted text |
| Cream | `#F5F1E8` | `cream-DEFAULT` | Light backgrounds |
| Cream Dark | `#2A2823` | `cream-dark` | Dark backgrounds |
| Terracotta | `#B85C38` | `terracotta-DEFAULT` | Warmth, highlights |
| Terracotta Soft | `#C97C5D` | `terracotta-soft` | Soft warmth |

### Neutral Colors

For text, borders, and general use.

| Name | Hex | Tailwind Class | Usage |
|------|-----|---|---|
| Charcoal | `#2C2C2C` | `charcoal` | Primary text |
| Slate Gray | `#5A5A5A` | `slate-gray` | Secondary text |
| Light Gray | `#D4D4D4` | `light-gray` | Borders, dividers |
| Off White | `#FAFAFA` | `off-white` | Light background |
| True Black | `#000000` | `true-black` | Strong contrast |
| Light Text | `#F5F1E8` | `light-text` | Light theme text |

## Using Colors

### In Tailwind Classes

```html
<!-- Text color -->
<p class="text-heritage-green-DEFAULT">Green text</p>

<!-- Background color -->
<div class="bg-legacy-gold-DEFAULT">Gold background</div>

<!-- Border color -->
<div class="border-2 border-family-burgundy-DEFAULT">Burgundy border</div>

<!-- Hover state -->
<button class="bg-heritage-green-DEFAULT hover:bg-heritage-green-light">
  Click me
</button>

<!-- Dark mode -->
<div class="bg-off-white dark:bg-charcoal">
  Responsive to theme
</div>
```

## Typography

### Fonts

Two Google Fonts ensure beautiful typography across all screens.

#### Playfair Display

Used for headings and display text. Elegant serif font.

```typescript
// Configured in app/layout.tsx
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})
```

**Tailwind class:** `font-display`

**Available weights:**
- 400 (Regular)
- 600 (SemiBold)
- 700 (Bold)

**Usage:**
```html
<h1 class="font-display text-4xl font-bold">Main Heading</h1>
<h2 class="font-display text-2xl font-semibold">Section Title</h2>
```

#### Inter

Used for body text and UI elements. Neutral sans-serif font.

```typescript
// Configured in app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})
```

**Tailwind class:** `font-body`

**Available weights:**
- 400 (Regular)
- 500 (Medium)
- 600 (SemiBold)
- 700 (Bold)

**Usage:**
```html
<p class="font-body text-base">Regular body text</p>
<button class="font-body font-semibold">Medium weight button</button>
```

### Type Scale

Recommended text sizes for consistent hierarchy:

| Level | Size | Class | Usage |
|-------|------|-------|-------|
| H1 | 2.25rem (36px) | `text-4xl` | Page titles |
| H2 | 1.875rem (30px) | `text-3xl` | Section headings |
| H3 | 1.5rem (24px) | `text-2xl` | Subsections |
| H4 | 1.25rem (20px) | `text-xl` | Cards, highlights |
| Body | 1rem (16px) | `text-base` | Main content |
| Small | 0.875rem (14px) | `text-sm` | Captions, meta |
| Tiny | 0.75rem (12px) | `text-xs` | Footnotes |

### Typography Examples

```html
<!-- Heading with proper hierarchy -->
<h1 class="font-display text-4xl font-bold text-heritage-green-DEFAULT mb-4">
  Welcome to Family Hub
</h1>

<!-- Subtitle -->
<p class="font-body text-lg text-slate-gray mb-8">
  Connecting family since 1832
</p>

<!-- Body text -->
<p class="font-body text-base leading-relaxed text-charcoal">
  Lorem ipsum dolor sit amet...
</p>

<!-- Emphasis -->
<p class="font-body text-base">
  This is <strong class="font-semibold">important</strong> information.
</p>
```

## Dark Mode

Full dark mode support for all components. Toggle with the theme switcher.

### Implementation

Dark mode is controlled by `next-themes`:

```html
<!-- Light mode -->
<div class="bg-off-white text-charcoal">
  Light theme
</div>

<!-- Dark mode (applies when dark class on <html>) -->
<div class="bg-off-white dark:bg-charcoal dark:text-light-text">
  Responsive to theme
</div>
```

### Creating Dark Mode Components

Always provide dark variants:

```typescript
export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      {children}
    </div>
  )
}
```

### Testing Dark Mode

Use the theme toggle in the header:
- Click moon/sun icon
- Verify all components have proper dark mode colors
- Check contrast ratios for accessibility

## Spacing

Consistent spacing maintains visual rhythm.

| Tailwind | Pixels | Usage |
|----------|--------|-------|
| `p-1` | 4px | Tight spacing |
| `p-2` | 8px | Compact |
| `p-4` | 16px | Default padding |
| `p-6` | 24px | Generous |
| `p-8` | 32px | Large sections |

### Margin & Padding

```html
<!-- Padding -->
<div class="p-4">Padded box</div>
<div class="px-4 py-6">Horizontal/vertical</div>

<!-- Margin -->
<div class="m-4">Margin all sides</div>
<div class="mb-8">Margin bottom</div>

<!-- Combinations -->
<button class="px-6 py-3">Padded button</button>
<div class="mb-4 pb-4">Content with margin and padding</div>
```

## Shadows & Elevation

Create depth with shadows.

| Class | Usage |
|-------|-------|
| `shadow-sm` | Subtle cards |
| `shadow` | Default shadow |
| `shadow-md` | Elevated components |
| `shadow-lg` | Modals, overlays |

```html
<div class="bg-white shadow hover:shadow-lg transition-shadow">
  Elevated card
</div>
```

## Borders & Radius

### Border Radius

| Class | Pixels | Usage |
|-------|--------|-------|
| `rounded` | 4px | Small elements |
| `rounded-lg` | 8px | Cards, buttons |
| `rounded-xl` | 12px | Larger cards |
| `rounded-full` | 9999px | Avatars, badges |

### Borders

```html
<!-- Border color and width -->
<div class="border-2 border-heritage-green-DEFAULT rounded-lg">
  Bordered box
</div>

<!-- Specific sides -->
<div class="border-t-2 border-legacy-gold-DEFAULT">
  Top border only
</div>
```

## Components

### Buttons

```html
<!-- Primary button -->
<button class="bg-heritage-green-DEFAULT text-white px-6 py-3 rounded-lg hover:bg-heritage-green-light transition-colors">
  Primary
</button>

<!-- Secondary button -->
<button class="bg-family-burgundy-DEFAULT text-white px-6 py-3 rounded-lg hover:bg-family-burgundy-light transition-colors">
  Secondary
</button>

<!-- Outline button -->
<button class="border-2 border-heritage-green-DEFAULT text-heritage-green-DEFAULT px-6 py-3 rounded-lg hover:bg-heritage-green-light/10 transition-colors">
  Outline
</button>
```

### Cards

```html
<div class="bg-white dark:bg-gray-900 rounded-lg border border-light-gray dark:border-gray-800 p-6 shadow hover:shadow-lg transition-shadow">
  <h3 class="font-display text-xl font-semibold mb-2">Card Title</h3>
  <p class="text-slate-gray dark:text-muted-text">Card content</p>
</div>
```

## Responsive Design

Mobile-first approach with Tailwind breakpoints.

| Breakpoint | Width | Class Prefix |
|-----------|-------|---|
| Mobile | < 640px | (default) |
| Small | ≥ 640px | `sm:` |
| Medium | ≥ 768px | `md:` |
| Large | ≥ 1024px | `lg:` |
| Extra Large | ≥ 1280px | `xl:` |

### Examples

```html
<!-- Stack on mobile, grid on desktop -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>

<!-- Hide on mobile, show on desktop -->
<div class="hidden lg:block">Desktop only</div>

<!-- Different text sizes -->
<h1 class="text-2xl sm:text-3xl lg:text-4xl">Responsive heading</h1>
```

## Accessibility

Design system supports accessibility:

- ✅ Color contrast ratios meet WCAG AA standards
- ✅ Semantic HTML structure
- ✅ Keyboard navigation support
- ✅ Screen reader compatible
- ✅ Focus indicators visible

### Contrast Ratios

All text meets minimum WCAG AA standards (4.5:1 for normal text):

- Heritage Green on Off-white: ✅ Sufficient
- Charcoal on Off-white: ✅ Excellent
- Light Text on Charcoal: ✅ Excellent

## Design Tokens

All design system values are defined as Tailwind tokens in `tailwind.config.ts`:

```typescript
// tailwind.config.ts
export const colors = {
  heritage: { green: { DEFAULT: '#2D5016' } },
  legacy: { gold: { DEFAULT: '#C19A6B' } },
  // ... all colors
}
```

This ensures consistency across the entire project.

## Adding New Colors

To add a new color to the design system:

1. **Update `tailwind.config.ts`**
   ```typescript
   export const colors = {
     newColor: '#AABBCC'
   }
   ```

2. **Use in components**
   ```html
   <div class="text-newColor">Colored text</div>
   ```

3. **Document** in this file

## Resources

- **[Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors)** - Color customization
- **[Tailwind CSS Typography](https://tailwindcss.com/docs/font-size)** - Font documentation
- **[Google Fonts](https://fonts.google.com/)** - Font library
- **[WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)** - Accessibility
