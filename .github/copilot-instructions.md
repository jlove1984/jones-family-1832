# Jones Family Hub - Project Instructions

## Project Overview
Jones Family Hub (JonesFamily1832.com) - A family heritage and reunion platform serving 500+ members across multiple generations.

## Technology Stack
- **Framework:** Next.js 16+ with App Router & Turbopack
- **UI Library:** React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4.x with custom design tokens
- **Authentication:** Better Auth (to be configured)
- **Database:** PostgreSQL with Prisma (to be configured)
- **Payments:** Stripe (to be configured)
- **Theme:** next-themes with dark mode support ✅ Implemented
- **Fonts:** Playfair Display (headings), Inter (body)

## Project Setup Status - ✅ COMPLETE

- [x] Next.js project scaffolded with App Router
- [x] TypeScript strict mode configured
- [x] Tailwind CSS with custom design system
- [x] Dark mode support (next-themes)
- [x] Root layout with theme provider
- [x] Homepage with countdown timer
- [x] Responsive header & footer components
- [x] Theme toggle component
- [x] Development task configured
- [x] **Comprehensive documentation structure** ✅ NEW
- [x] GitHub templates (issues & PRs) ✅ NEW
- [x] Contributing guidelines ✅ NEW

## 📚 Documentation Structure

Complete documentation is in `/docs` directory:

### Core Documentation
- **[docs/INDEX.md](./docs/INDEX.md)** - Documentation roadmap and navigation hub
- **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Project structure and organization
- **[docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md)** - Development standards and patterns
- **[docs/API.md](./docs/API.md)** - API endpoints documentation
- **[docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md)** - Colors, typography, design tokens

### Developer Guides
- **[docs/guides/GETTING_STARTED.md](./docs/guides/GETTING_STARTED.md)** - 5-minute setup
- **[docs/guides/COMPONENTS.md](./docs/guides/COMPONENTS.md)** - Component patterns
- **[docs/guides/GIT_WORKFLOW.md](./docs/guides/GIT_WORKFLOW.md)** - Git conventions
- **[docs/guides/ENVIRONMENT.md](./docs/guides/ENVIRONMENT.md)** - Environment setup
- **[docs/guides/DEPLOYMENT.md](./docs/guides/DEPLOYMENT.md)** - Production deployment
- **[docs/guides/TROUBLESHOOTING.md](./docs/guides/TROUBLESHOOTING.md)** - Common issues

### Community Guidelines
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute
- **[SECURITY.md](./SECURITY.md)** - Security policy
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and roadmap

## Design System Reference

**Primary Colors:**
- Heritage Green: #2D5016 (heritage, trust, stability)
- Legacy Gold: #C19A6B (prestige, tradition, warmth)
- Family Burgundy: #6B2E2E (connection, warmth, heritage)

**Typography:**
- Headings: Playfair Display (elegant, timeless)
- Body: Inter (clean, readable, modern)

**Features:** Dark mode support, responsive design, accessibility built-in

## Project Structure
```
jones-family-1832/
├── app/                     # Next.js App Router with route groups
│   ├── (auth)/             # Authentication routes
│   ├── (protected)/        # Protected/authenticated routes
│   ├── (public)/           # Public pages
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout with theme support
│   ├── page.tsx            # Homepage
│   └── globals.css         # Design tokens & custom CSS
├── components/             # React components
│   ├── layout/             # Header, Footer
│   ├── providers/          # ThemeProvider
│   └── ui/                 # Reusable UI components
├── docs/                   # 📖 Complete documentation
│   ├── guides/             # Implementation guides
│   └── *.md                # Reference documentation
├── lib/                    # Utility functions & helpers
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
└── .github/                # GitHub templates & workflows

## Key Features Implemented
✅ Homepage with countdown timer and feature cards
✅ Responsive navigation header with theme toggle
✅ Dark mode support (light/dark themes)
✅ Footer with family links
✅ Custom Tailwind design system
✅ Typography system with web fonts
✅ Type-safe development environment
✅ API health check endpoint
✅ Professional documentation
✅ GitHub issue/PR templates

## Development Workflow

**Start development:**
```bash
pnpm dev
```
Or use "Dev: Jones Family Hub" task in VS Code (Ctrl+Shift+B)

**Available scripts:**
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking
- `pnpm format` - Format code with Prettier

**Documentation for development:**
1. New to project? → [Getting Started](./docs/guides/GETTING_STARTED.md)
2. Building components? → [Components Guide](./docs/guides/COMPONENTS.md)
3. Code standards? → [Development Guide](./docs/DEVELOPMENT.md)
4. Project structure? → [Architecture](./docs/ARCHITECTURE.md)
5. Problems? → [Troubleshooting](./docs/guides/TROUBLESHOOTING.md)

## Deployment

**Production deployment guide:** [docs/guides/DEPLOYMENT.md](./docs/guides/DEPLOYMENT.md)

Supported platforms:
- Vercel (recommended, seamless Next.js integration)
- Docker containers
- Node.js compatible platforms (Railway, AWS, Azure, GCP)

## Next Development Phases

**Phase 1: Database & Auth** (In Progress)
1. Configure PostgreSQL connection
2. Set up Prisma schema
3. Implement Better Auth integration
4. Create protected routes

**Phase 2: Core Features**
1. Member directory with search
2. Family tree visualization
3. Birthday calendar
4. Achievement system

**Phase 3: Reunion Management**
1. RSVP system
2. Event scheduling
3. Photo gallery
4. Event chat/messaging

**Phase 4: Payments & Integrations**
1. Stripe payment processing
2. Email notifications
3. SMS reminders
4. Social media sharing

## Code Standards & Best Practices

Follow these guides for consistency:
- **TypeScript:** Use strict mode, add type annotations
- **Components:** See [Component Guidelines](./docs/guides/COMPONENTS.md)
- **Styling:** Use Tailwind classes, follow design system
- **Git:** Follow [Git Workflow](./docs/guides/GIT_WORKFLOW.md) conventions
- **Commits:** Use conventional commits (feat:, fix:, docs:, etc.)
- **Code Review:** Check [Contributing](./CONTRIBUTING.md) guide

## Quick References

- 📖 [Main README](./README.md) - Project overview
- 📚 [Documentation Index](./docs/INDEX.md) - All documentation
- 🏗️ [Architecture](./docs/ARCHITECTURE.md) - Project structure
- 💻 [Development](./docs/DEVELOPMENT.md) - Coding standards
- 🎨 [Design System](./docs/DESIGN_SYSTEM.md) - Colors and tokens
- 🚀 [Deployment](./docs/guides/DEPLOYMENT.md) - Deploy to production
- 🔧 [Troubleshooting](./docs/guides/TROUBLESHOOTING.md) - Common issues
- 🤝 [Contributing](./CONTRIBUTING.md) - How to contribute
- 🔒 [Security](./SECURITY.md) - Security policy
