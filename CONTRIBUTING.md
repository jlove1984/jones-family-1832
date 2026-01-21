# Contributing Guide

Thank you for your interest in contributing to Jones Family Hub! This guide will help you make meaningful contributions to the project.

## Code of Conduct

Be respectful, inclusive, and helpful to all community members.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Follow [docs/guides/GETTING_STARTED.md](./docs/guides/GETTING_STARTED.md)** to set up
4. **Read [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md)** for code standards
5. **Start developing!**

## Ways to Contribute

### Report Bugs

Found an issue? Submit a detailed bug report:

1. Go to GitHub Issues
2. Click "New Issue"
3. Choose "Bug Report" template
4. Describe the problem and how to reproduce it
5. Include environment info (OS, Node version, etc.)

### Request Features

Have an idea? Share it!

1. Go to GitHub Issues
2. Click "New Issue"
3. Choose "Feature Request" template
4. Explain the feature and why it would be useful

### Improve Documentation

Documentation improvements help everyone:

1. Find documentation that needs improvement
2. Create a branch: `docs/improve-setup-guide`
3. Make changes in `/docs` directory
4. Follow [GIT_WORKFLOW.md](./docs/guides/GIT_WORKFLOW.md)
5. Submit pull request

### Write Code

Contributing code is welcome! Follow these steps:

1. **Find something to work on**
   - Look for issues labeled `good-first-issue`
   - Ask in the issue before starting
   - Discuss large changes first

2. **Create a feature branch**
   ```bash
   git checkout -b feature/description-of-feature
   ```

3. **Follow development standards**
   - [DEVELOPMENT.md](./docs/DEVELOPMENT.md) - Code standards
   - [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Project structure
   - [guides/COMPONENTS.md](./docs/guides/COMPONENTS.md) - Component patterns

4. **Write tests** (when implemented)
   - Add tests in `__tests__/` directory
   - Run: `pnpm test`

5. **Check code quality**
   ```bash
   pnpm type-check   # TypeScript
   pnpm lint         # ESLint
   pnpm build        # Build test
   ```

6. **Commit with conventional messages**
   ```bash
   git commit -m "feat: add feature description"
   git commit -m "fix: fix issue description"
   git commit -m "docs: update guide"
   ```

   See [GIT_WORKFLOW.md](./docs/guides/GIT_WORKFLOW.md) for details

7. **Push to your fork**
   ```bash
   git push origin feature/description
   ```

8. **Create Pull Request**
   - Write clear title and description
   - Link related issues
   - Request review

## Development Workflow

### Local Setup

```bash
# Clone and setup
git clone <your-fork>
cd jones-family-hub
pnpm install
cp .env.example .env.local

# Start development
pnpm dev
```

### Before Submitting PR

```bash
# Check everything works
pnpm type-check   # TypeScript errors
pnpm lint         # Code style
pnpm build        # Production build

# If all pass, you're ready!
```

### Code Review Process

1. **Automated checks**
   - TypeScript strict mode
   - ESLint linting
   - Build verification

2. **Human review**
   - Code quality
   - Consistency with standards
   - Testing coverage

3. **Feedback**
   - Address comments respectfully
   - Respond to all feedback
   - Push new commits (don't force push)

4. **Merge**
   - Reviewer approves
   - All checks pass
   - Merge to main

## Development Standards

### Code Style

- **TypeScript** - Strict mode enabled
- **Formatting** - Prettier (auto on save)
- **Linting** - ESLint rules
- **Naming** - Clear, consistent names

See [DEVELOPMENT.md](./docs/DEVELOPMENT.md) for details.

### Component Patterns

- One component per file
- Props interfaces defined
- JSDoc comments for complex code
- Tailwind CSS for styling
- Dark mode support

See [guides/COMPONENTS.md](./docs/guides/COMPONENTS.md) for examples.

### File Structure

- `app/` - Pages and routes
- `components/` - React components
- `lib/` - Utilities
- `types/` - Type definitions

See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for details.

## Pull Request Guidelines

### Title Format

```
[Type] Brief description

feat: Add new feature
fix: Fix issue
docs: Update documentation
refactor: Improve code structure
perf: Improve performance
```

### Description Template

```markdown
## Description
What does this PR do?

## Changes
- Change 1
- Change 2
- Change 3

## Related Issues
Closes #123

## Testing
How to test these changes

## Checklist
- [x] TypeScript strict mode
- [x] No console errors
- [x] Dark mode tested
- [x] Mobile responsive
- [x] Build passes
```

## Commit Message Guidelines

Follow conventional commits:

```
feat: add member search
fix: correct form validation
refactor: extract component
docs: update readme
test: add button tests
```

See [guides/GIT_WORKFLOW.md](./docs/guides/GIT_WORKFLOW.md) for full details.

## Documentation

All new features should include documentation:

1. **Code comments** - Explain non-obvious logic
2. **JSDoc comments** - For public functions/components
3. **README** - If significantly changes setup
4. **Guides** - If adds new area (e.g., database queries)

## Running Tests

When tests are implemented:

```bash
pnpm test                    # Run all tests
pnpm test --watch           # Watch mode
pnpm test component.test.tsx # Specific test
```

Write tests for:
- Components
- Utilities
- API routes
- Complex logic

## Performance Considerations

When contributing, think about:

- **Bundle size** - Avoid large dependencies
- **Runtime performance** - Optimize queries
- **Build time** - Don't slow down the build
- **Images** - Always use Next.js Image component
- **Fonts** - Load optimized fonts

## Accessibility

Ensure accessibility for all users:

- ✅ Semantic HTML
- ✅ Keyboard navigation
- ✅ ARIA labels
- ✅ Color contrast
- ✅ Screen reader friendly

## Security

Keep security in mind:

- ❌ Never commit secrets
- ❌ Don't expose private keys
- ✅ Validate user input
- ✅ Use environment variables
- ✅ Follow OWASP guidelines

## Getting Help

- **Questions?** Open a discussion
- **Confused?** Review relevant docs
- **Stuck?** Ask in the issue
- **Found a bug?** Report it immediately

## Recognition

Contributors are valued! We recognize:

- Bug reports
- Feature suggestions
- Documentation improvements
- Code contributions
- Community support

Thank you for making Jones Family Hub better! 🎉

## Resources

- **[DEVELOPMENT.md](./docs/DEVELOPMENT.md)** - Development guidelines
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Project structure
- **[GIT_WORKFLOW.md](./docs/guides/GIT_WORKFLOW.md)** - Git standards
- **[COMPONENTS.md](./docs/guides/COMPONENTS.md)** - Component patterns
- **[docs/INDEX.md](./docs/INDEX.md)** - Documentation index
