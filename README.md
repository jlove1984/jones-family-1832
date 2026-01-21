# Jones Family Hub

A comprehensive family heritage and reunion platform serving 500+ members across multiple generations.

**Website:** [JonesFamily1832.com](https://jonesfamily1832.com)

## Quick Start

Get up and running in 5 minutes:

```bash
# 1. Clone and setup
git clone <repository-url>
cd jones-family-hub
pnpm install

# 2. Environment setup
cp .env.example .env.local

# 3. Start development
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app running!

**For detailed setup instructions:** See [Getting Started Guide](./docs/guides/GETTING_STARTED.md)

## 📚 Documentation

Complete documentation is organized in the `/docs` directory:

| Guide | Purpose |
|-------|---------|
| **[Documentation Index](./docs/INDEX.md)** | Complete documentation roadmap |
| **[Getting Started](./docs/guides/GETTING_STARTED.md)** | 5-minute setup guide |
| **[Architecture](./docs/ARCHITECTURE.md)** | Project structure and organization |
| **[Development Guide](./docs/DEVELOPMENT.md)** | Coding standards and best practices |
| **[Component Guidelines](./docs/guides/COMPONENTS.md)** | How to create React components |
| **[API Documentation](./docs/API.md)** | API endpoints and usage |
| **[Design System](./docs/DESIGN_SYSTEM.md)** | Colors, typography, and tokens |
| **[Deployment Guide](./docs/guides/DEPLOYMENT.md)** | Deploy to production |
| **[Environment Setup](./docs/guides/ENVIRONMENT.md)** | Configure environment variables |
| **[Git Workflow](./docs/guides/GIT_WORKFLOW.md)** | Git and commit conventions |
| **[Troubleshooting](./docs/guides/TROUBLESHOOTING.md)** | Common issues and solutions |

## 🚀 Tech Stack

- **Framework:** [Next.js 16+](https://nextjs.org/) with App Router
- **UI Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling:** [Tailwind CSS 4.x](https://tailwindcss.com/)
- **Database:** PostgreSQL (via Prisma)
- **Authentication:** Better Auth
- **Payments:** Stripe

## ✨ Key Features

- ✅ Responsive homepage with hero section
- ✅ Reunion countdown timer
- ✅ Feature cards showcase
- ✅ Dark/light theme support
- ✅ Mobile-first responsive design
- ✅ TypeScript strict mode
- ✅ Health check API endpoint
- 🔄 Family directory (in progress)
- 🔄 Member profiles (in progress)
- 🔄 Photo gallery (in progress)
- 🔄 RSVP system (in progress)

## 🎯 Available Scripts

```bash
pnpm dev         # Start development server (Turbopack)
pnpm build       # Create production build
pnpm start       # Start production server
pnpm lint        # Run ESLint
pnpm type-check  # Run TypeScript compiler
```

## 📁 Project Structure

```
jones-family-hub/
├── docs/                    # 📚 Complete documentation
├── app/                     # 🚀 Next.js App Router
│   ├── (public)/           # Public pages
│   ├── api/                # API routes
│   └── globals.css         # Global styles
├── components/              # ⚛️  React components
│   ├── layout/             # Shared layouts
│   ├── home/               # Home page components
│   └── ui/                 # Reusable UI components
├── lib/                     # 🛠️ Utilities
├── types/                   # 🔤 TypeScript definitions
├── public/                  # 📦 Static assets
├── .github/                 # 🐙 GitHub configuration
├── CONTRIBUTING.md          # 🤝 Contributing guide
├── SECURITY.md              # 🔒 Security policy
└── CHANGELOG.md             # 📝 Version history
```

## 🏗️ Architecture

The project follows Next.js best practices with:

- **Route Groups** - Organized pages without URL changes
- **Component Structure** - Feature-based organization
- **Centralized Types** - Single source of truth for TypeScript
- **Path Aliases** - Clean imports with `@/`
- **Design System** - Tailwind tokens for consistency

See [Architecture Guide](./docs/ARCHITECTURE.md) for details.

## 🎨 Design System

### Colors
- **Heritage Green** (`#2D5016`) - Primary brand color
- **Legacy Gold** (`#C19A6B`) - Accent color
- **Family Burgundy** (`#6B2E2E`) - Secondary color
- View all colors in [Design System](./docs/DESIGN_SYSTEM.md)

### Typography
- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)
- Optimized font loading with `display: 'swap'`

### Dark Mode
- Built-in with `next-themes`
- Toggle in header
- Proper contrast for accessibility

## 🤝 Contributing

We welcome contributions! Please see [Contributing Guide](./CONTRIBUTING.md) for:

- How to report bugs
- How to request features
- Code contribution guidelines
- Development workflow
- Pull request process

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Verify quality: `pnpm build && pnpm type-check && pnpm lint`
5. Create a pull request

See [Git Workflow Guide](./docs/guides/GIT_WORKFLOW.md) for detailed instructions.

## 🔒 Security

We take security seriously. See [Security Policy](./SECURITY.md) for:

- How to report vulnerabilities
- Security best practices
- Data protection measures
- Incident response

**Do not open public GitHub issues for security vulnerabilities.**

## 📋 Checklist for New Developers

- [ ] Read [Getting Started Guide](./docs/guides/GETTING_STARTED.md)
- [ ] Read [Architecture Guide](./docs/ARCHITECTURE.md)
- [ ] Read [Development Guide](./docs/DEVELOPMENT.md)
- [ ] Run `pnpm dev` and verify it works
- [ ] Make a small test change
- [ ] Read [Contributing Guide](./CONTRIBUTING.md)

## 🆘 Need Help?

1. **Setup issues?** → [Getting Started Guide](./docs/guides/GETTING_STARTED.md)
2. **Code questions?** → [Development Guide](./docs/DEVELOPMENT.md)
3. **Common problems?** → [Troubleshooting Guide](./docs/guides/TROUBLESHOOTING.md)
4. **Project structure?** → [Architecture Guide](./docs/ARCHITECTURE.md)
5. **Can't find answer?** → Check [Documentation Index](./docs/INDEX.md)

## 📊 Status

| Check | Status |
|-------|--------|
| Build | ✅ Passing |
| Type Check | ✅ Passing |
| Lint | ✅ Passing |
| Documentation | ✅ Complete |
| Setup | ✅ Easy |

## 📄 License

© 2026 Jones Family. All rights reserved.

## 🎉 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [React](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- All contributors and community members

---

**Need more information?** Check the [complete documentation](./docs/INDEX.md).

**Want to contribute?** See the [contributing guide](./CONTRIBUTING.md).

**Have questions?** Check the [troubleshooting guide](./docs/guides/TROUBLESHOOTING.md).
