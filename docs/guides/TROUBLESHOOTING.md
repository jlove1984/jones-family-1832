# Troubleshooting Guide

Common issues and solutions when developing Jones Family Hub.

## Table of Contents

- [Development Issues](#development-issues)
- [Build & Compilation](#build--compilation)
- [Styling & Appearance](#styling--appearance)
- [Database & Environment](#database--environment)
- [Git & Version Control](#git--version-control)

## Development Issues

### Port 3000 Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**

Windows:
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
pnpm dev
```

macOS/Linux:
```bash
lsof -ti:3000 | xargs kill -9
pnpm dev
```

Or use a different port:
```bash
pnpm dev -- -p 3001
```

### Hot Reload Not Working

**Problem:** Changes not reflected when saving files

**Solution:**

1. Restart dev server
   ```bash
   # Ctrl+C to stop
   pnpm dev
   ```

2. Clear Next.js cache
   ```bash
   rm -rf .next
   pnpm dev
   ```

3. Check file path - ensure it's in `app/`, `components/`, or `lib/`

### Module Not Found

**Problem:** `Error: Module not found: Can't resolve '@/components/...'`

**Solution:**

1. Verify file exists
   ```bash
   # Check file location
   ls components/your-file.tsx
   ```

2. Check path alias in `tsconfig.json`
   ```json
   {
     "paths": {
       "@/*": ["./*"]
     }
   }
   ```

3. Restart dev server

4. Clear cache
   ```bash
   rm -rf node_modules/.vite
   ```

## Build & Compilation

### Build Fails

**Problem:** `pnpm build` fails with errors

**Solution:**

```bash
# Step 1: Check TypeScript
pnpm type-check

# Step 2: Fix type errors shown

# Step 3: Try build again
pnpm build

# If still failing, try clean rebuild
rm -rf .next
pnpm build
```

### Type Errors After Update

**Problem:** TypeScript errors after updating dependencies

**Solution:**

```bash
# Update dependencies safely
pnpm update

# Check for type errors
pnpm type-check

# If errors, downgrade specific package
pnpm add --save-exact [package-name]@[version]
```

### Build Takes Too Long

**Problem:** Build is very slow

**Solution:**

1. Check what's slow
   ```bash
   pnpm build --debug
   ```

2. Clear cache
   ```bash
   rm -rf .next node_modules
   pnpm install
   ```

3. Use Turbopack in dev (already configured)
   ```bash
   pnpm dev --turbopack
   ```

## Styling & Appearance

### Tailwind Classes Not Applied

**Problem:** Tailwind styles not showing

**Solutions:**

1. **Verify class name is in content paths**
   ```typescript
   // tailwind.config.ts
   content: [
     './app/**/*.{js,ts,jsx,tsx,mdx}',
     './components/**/*.{js,ts,jsx,tsx,mdx}',
   ]
   ```

2. **Check that styles are from file in content paths**
   ```bash
   # If in src/, move to app/ or components/
   ```

3. **Rebuild CSS**
   ```bash
   rm -rf .next
   pnpm dev
   ```

4. **Verify class names are static**
   ```typescript
   // ✅ Good - static class
   className="text-red-500"
   
   // ❌ Bad - dynamic class won't be generated
   className={`text-${color}-500`}
   ```

### Dark Mode Not Working

**Problem:** Dark mode classes not applying

**Solutions:**

1. **Check `suppressHydrationWarning` on `<html>`**
   ```tsx
   // app/layout.tsx
   <html suppressHydrationWarning>
   ```

2. **Verify ThemeProvider is wrapping app**
   ```tsx
   <ThemeProvider>
     <main>{children}</main>
   </ThemeProvider>
   ```

3. **Check Tailwind config has dark mode**
   ```typescript
   // tailwind.config.ts
   darkMode: 'class'
   ```

4. **Test toggle**
   - Click theme toggle in header
   - Inspect `<html>` element
   - Should have `class="dark"`

### Colors Look Wrong

**Problem:** Colors don't match design system

**Solutions:**

1. **Check color is defined in Tailwind config**
   ```bash
   # Search tailwind.config.ts for color name
   ```

2. **Verify correct class name**
   ```typescript
   // ✅ Correct
   className="text-heritage-green-DEFAULT"
   
   // ❌ Wrong
   className="text-heritage-green"
   ```

3. **Check for color conflicts**
   ```bash
   # Rebuild Tailwind
   rm -rf .next
   pnpm dev
   ```

### Responsive Design Issues

**Problem:** Layout not responsive on mobile

**Solutions:**

1. **Use mobile-first approach**
   ```typescript
   // ✅ Good
   className="grid-cols-1 md:grid-cols-2"
   
   // ❌ Backwards
   className="md:grid-cols-1 grid-cols-2"
   ```

2. **Test actual device sizes**
   - Don't rely on browser resize
   - Use `sm:`, `md:`, `lg:` prefixes

3. **Check viewport meta tag**
   ```tsx
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   ```

## Database & Environment

### Database Connection Failed

**Problem:** `Error: connect ECONNREFUSED`

**Solutions:**

1. **Check DATABASE_URL is set**
   ```bash
   echo $DATABASE_URL
   ```

2. **Verify PostgreSQL is running**
   ```bash
   # macOS
   brew services list | grep postgres
   
   # Windows - check Services or use WSL
   ```

3. **Start PostgreSQL**
   ```bash
   # macOS
   brew services start postgresql
   ```

4. **Check connection string format**
   ```
   postgresql://user:password@localhost:5432/dbname
   ```

### Environment Variable Not Loading

**Problem:** `.env.local` variables not accessible

**Solutions:**

1. **Restart dev server**
   ```bash
   # Stop: Ctrl+C
   pnpm dev
   ```

2. **Verify file exists and is readable**
   ```bash
   ls -la .env.local
   cat .env.local
   ```

3. **Check variable format (no spaces)**
   ```env
   # ✅ Correct
   DATABASE_URL=postgresql://...
   
   # ❌ Wrong
   DATABASE_URL = postgresql://...
   ```

4. **Verify variable name is correct**
   - Private: No prefix (`DATABASE_URL`)
   - Public: `NEXT_PUBLIC_*` prefix

### Missing Required Environment Variable

**Problem:** `Error: process.env.DATABASE_URL is undefined`

**Solution:**

1. Create `.env.local`
   ```bash
   cp .env.example .env.local
   ```

2. Add missing variable
   ```env
   DATABASE_URL=postgresql://localhost:5432/jones_family
   ```

3. Restart dev server

4. For production, add to deployment platform

## Git & Version Control

### Git Merge Conflict

**Problem:** Conflict when merging branches

**Solutions:**

1. **View conflicts**
   ```bash
   git status
   git diff
   ```

2. **Open file and resolve**
   ```
   <<<<<<< HEAD
   Your changes
   =======
   Their changes
   >>>>>>> branch-name
   ```

3. **Choose which version to keep and remove markers**

4. **Complete merge**
   ```bash
   git add .
   git commit -m "feat: resolve merge conflict"
   ```

### Changes Accidentally Committed

**Problem:** Committed file to wrong branch

**Solutions:**

**If not pushed yet:**
```bash
git reset --soft HEAD~1
# Changes are back in staging, can commit elsewhere
```

**If already pushed:**
```bash
# Revert the commit
git revert <commit-hash>
git push origin branch-name
```

### Lost Commits

**Problem:** Commits seem to have disappeared

**Solution:**

```bash
# See all commits (including abandoned ones)
git reflog

# Return to lost commit
git checkout <commit-hash>

# Create new branch from it
git checkout -b recovered-branch
```

### Accidentally Deleted Files

**Problem:** `git rm` or deleted files not tracked

**Solution:**

```bash
# Restore deleted files
git restore <filename>

# Or from specific commit
git restore --source=HEAD~1 <filename>
```

## Performance Issues

### Slow Build Time

**Problem:** `pnpm build` takes too long

**Solutions:**

1. **Analyze build**
   ```bash
   pnpm build --debug
   ```

2. **Check for large components**
   - Look for heavy imports
   - Use dynamic imports for large components

3. **Update dependencies**
   ```bash
   pnpm update
   ```

### Slow Development Server

**Problem:** `pnpm dev` is slow or laggy

**Solutions:**

1. **Clear cache**
   ```bash
   rm -rf .next node_modules/.cache
   ```

2. **Reduce file watching**
   - Check for large `node_modules/` in watched directories

3. **Use Turbopack** (already configured)
   ```bash
   pnpm dev --turbopack
   ```

## Browser Issues

### React DevTools Not Showing Components

**Problem:** React DevTools can't inspect components

**Solutions:**

1. **Install React DevTools**
   - [Chrome Extension](https://chrome.google.com/webstore/detail/react-developer-tools)
   - [Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

2. **Verify React is in strict mode**
   - Check in React DevTools
   - Restart dev server

### Console Shows Hydration Errors

**Problem:** `Error: Hydration failed`

**Solutions:**

1. **Check for `suppressHydrationWarning`**
   ```tsx
   <html suppressHydrationWarning>
   ```

2. **Check for browser-only code**
   ```typescript
   // ❌ Wrong - runs on server
   const isDark = window.localStorage.getItem('theme')
   
   // ✅ Correct - only on client
   if (typeof window !== 'undefined') {
     const isDark = window.localStorage.getItem('theme')
   }
   ```

3. **Use 'use client' if needed**
   ```typescript
   'use client'
   // Component code
   ```

## Getting Help

If you can't find a solution:

1. **Check this troubleshooting guide** - You're reading it!
2. **Search docs** - Check [docs/INDEX.md](../INDEX.md)
3. **Review [DEVELOPMENT.md](../DEVELOPMENT.md)** - Coding patterns
4. **Search GitHub issues** - Others may have faced it
5. **Create a new issue** - Describe the problem clearly

### Bug Report Template

```markdown
## Description
What's the problem?

## Steps to Reproduce
1. ...
2. ...
3. ...

## Expected Behavior
What should happen?

## Actual Behavior
What actually happened?

## Environment
- OS: Windows/macOS/Linux
- Node version: 18.x
- pnpm version: 8.x
- Branch: main/feature-x

## Logs
```
Error output here
```
```

## Resources

- **[DEVELOPMENT.md](../DEVELOPMENT.md)** - Development guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment issues
- **[ENVIRONMENT.md](./ENVIRONMENT.md)** - Environment setup
- **[Next.js Docs](https://nextjs.org/docs)** - Official docs
- **[GitHub Issues](https://github.com/)** - Project issues
