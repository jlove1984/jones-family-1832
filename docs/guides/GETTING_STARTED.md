# Getting Started Guide

Get up and running with Jones Family Hub in 5 minutes.

## Prerequisites

- **Node.js** 18 or higher ([download](https://nodejs.org/))
- **pnpm** 8 or higher - install with: `npm install -g pnpm`
- **Git** for version control

Verify installation:
```bash
node --version  # Should be v18+
pnpm --version  # Should be 8+
```

## Quick Start (5 minutes)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd jones-family-hub
```

### 2. Install Dependencies

```bash
pnpm install
```

This creates a `node_modules/` directory and installs all required packages.

### 3. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add any required variables (for now, this is optional for development).

### 4. Start Development Server

```bash
pnpm dev
```

Or use VS Code task: `Ctrl+Shift+B` → "Dev: Jones Family Hub"

### 5. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

You should see the homepage with:
- Hero section with welcome message
- Countdown timer to reunion
- Feature cards
- Navigation header and footer

**That's it!** You're ready to start developing. 🎉

## Next Steps

### Learn the Project Structure
- Read [ARCHITECTURE.md](../ARCHITECTURE.md) to understand how the project is organized
- Check [docs/guides/COMPONENTS.md](./COMPONENTS.md) to see how to create components

### Start Developing
- Edit `app/(public)/page.tsx` to modify the homepage
- Create new components in `components/`
- Add new routes in `app/`
- Check the browser - hot reload updates automatically!

### Build for Production

```bash
pnpm build
pnpm start
```

## Common Tasks

### Add a New Page

1. Create directory: `app/[new-page]/`
2. Create file: `app/[new-page]/page.tsx`
3. Add route in navigation (header.tsx)

```typescript
// app/directory/page.tsx
export default function DirectoryPage() {
  return (
    <div>
      <h1>Family Directory</h1>
      {/* content */}
    </div>
  )
}
```

### Create a New Component

1. Create file: `components/[feature]/[component].tsx`
2. Define props interface
3. Export component

```typescript
// components/home/hero-section.tsx
export interface HeroSectionProps {
  title: string
}

export function HeroSection({ title }: HeroSectionProps) {
  return <section>{title}</section>
}
```

### Add a Dependency

```bash
pnpm add package-name
```

### Check for Errors

```bash
pnpm type-check  # TypeScript errors
pnpm lint        # Code quality
pnpm build       # Production build check
```

## Troubleshooting

### Port 3000 Already in Use

Kill the process using the port:

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

Then restart: `pnpm dev`

### Dependencies Not Installing

Clear cache and reinstall:

```bash
pnpm store prune
rm -rf node_modules
pnpm install
```

### Styles Not Showing

Ensure Tailwind CSS is working:

1. Check that HTML has proper classes
2. Rebuild: `pnpm build`
3. Clear Next.js cache: `rm -rf .next && pnpm dev`

### Build Fails

Try these steps:

```bash
# Clear everything
rm -rf .next node_modules pnpm-lock.yaml

# Reinstall
pnpm install

# Rebuild
pnpm build
```

## Development Workflow

### Daily Development

```bash
# 1. Start dev server
pnpm dev

# 2. Make changes (hot reload automatic)

# 3. Before committing, check quality
pnpm type-check
pnpm lint
pnpm build

# 4. If all pass, commit changes
git add .
git commit -m "feat: describe your changes"
```

### File Structure You'll Edit

Most development happens in:

- `app/(public)/page.tsx` - Homepage
- `app/[new-page]/` - New pages
- `components/` - Components
- `lib/utils.ts` - Utilities
- `types/index.ts` - Type definitions

## Available Scripts

```bash
pnpm dev         # Start development server (Turbopack)
pnpm build       # Create production build
pnpm start       # Start production server
pnpm lint        # Run ESLint
pnpm type-check  # Run TypeScript check
```

## IDE Setup (Recommended)

### VS Code Extensions

Install these extensions for the best experience:

- **ES7+ React/Redux/React-Native snippets** - dsznajder.es7-react-js-snippets
- **Tailwind CSS IntelliSense** - bradlc.vscode-tailwindcss
- **TypeScript Vue Plugin** - Vue.vscode-typescript-vue-plugin
- **Prettier** - esbenp.prettier-vscode

### VS Code Settings

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Git Basics

```bash
# Create a new branch
git checkout -b feature/my-feature

# Make changes, then:
git add .
git commit -m "feat: add my feature"
git push origin feature/my-feature

# Create a pull request on GitHub
```

See [GIT_WORKFLOW.md](./GIT_WORKFLOW.md) for detailed guidelines.

## Need Help?

- 📖 Check [docs/INDEX.md](../INDEX.md) for documentation index
- 🏗️ See [ARCHITECTURE.md](../ARCHITECTURE.md) for project structure
- 💻 Review [DEVELOPMENT.md](../DEVELOPMENT.md) for best practices
- 🔍 Check [guides/TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for issues

## What's Next?

Now that you're set up:

1. **Make a small change** - Edit the homepage to get comfortable
2. **Create a component** - Practice building React components
3. **Read ARCHITECTURE.md** - Understand how code is organized
4. **Review DEVELOPMENT.md** - Learn the coding standards
5. **Start contributing!**

Happy coding! 🚀
