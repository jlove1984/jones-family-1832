# Git Workflow

Standard Git workflow for contributing to Jones Family Hub.

## Branch Naming Convention

Use descriptive branch names following this pattern:

```
[type]/[description]
```

### Types

| Type | Purpose | Example |
|------|---------|---------|
| `feature/` | New feature | `feature/family-directory` |
| `fix/` | Bug fix | `fix/dark-mode-toggle` |
| `refactor/` | Code refactoring | `refactor/component-extraction` |
| `docs/` | Documentation | `docs/setup-guide` |
| `test/` | Tests | `test/button-component` |
| `perf/` | Performance | `perf/image-optimization` |
| `chore/` | Maintenance | `chore/update-dependencies` |

### Examples

✅ **Good:**
- `feature/add-member-search`
- `fix/form-validation-error`
- `docs/api-documentation`
- `perf/optimize-bundle-size`

❌ **Bad:**
- `my-feature`
- `fix`
- `update`
- `stuff`

## Commit Messages

Follow conventional commits format:

```
[type]([scope]): [description]

[optional body]

[optional footer]
```

### Type

Same as branch type:
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation
- `test:` - Tests
- `perf:` - Performance
- `chore:` - Maintenance

### Scope (Optional)

What part of code:
- `api` - API endpoints
- `ui` - UI components
- `auth` - Authentication
- `db` - Database

### Description

Short, imperative mood:
- ✅ "add member search"
- ❌ "added member search"
- ❌ "adds member search"

### Examples

```bash
# Simple feature
git commit -m "feat: add member search functionality"

# With scope
git commit -m "feat(api): add members endpoint"

# Bug fix
git commit -m "fix(ui): correct dark mode toggle persistence"

# With detailed message
git commit -m "refactor(components): extract feature card

Separate component into smaller, reusable parts.
Improves maintainability and testability."
```

## Gated Commits

Before committing, run the **gate** so only passing code is committed:

```bash
pnpm run gate
```

The gate runs `type-check`. If it fails, fix issues before committing. Run `pnpm run lint` and `pnpm run build` as needed for a full check.

**Workflow:** Make a logical unit of changes → run `pnpm run gate` → if pass, `git add` and `git commit`. Repeat for the next unit.

## Workflow Steps

### 1. Update Main Branch

```bash
git checkout main
git pull origin main
```

### 2. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes

Edit files as needed:
```bash
# Check status
git status

# Stage changes
git add .

# Commit with message
git commit -m "feat: your feature description"
```

### 4. Multiple Commits

Make logical commits:

```bash
# Bad - Everything in one commit
git add .
git commit -m "feat: add directory, search, and filters"

# Good - Logical commits
git add components/directory/
git commit -m "feat: add directory component"

git add lib/search.ts
git commit -m "feat: add search utility"

git add features/filters/
git commit -m "feat: add filter functionality"
```

### 5. Push Branch

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

1. Go to GitHub repository
2. Click "New Pull Request"
3. Select your branch
4. Fill in title and description
5. Click "Create Pull Request"

### 7. Code Review

- Reviewers comment on code
- Address feedback with new commits
- Push changes: `git push origin feature/your-feature-name`

### 8. Merge

When approved:

```bash
# Update with main (if needed)
git checkout main
git pull origin main
git checkout feature/your-feature-name
git rebase main

# Push if rebased
git push origin feature/your-feature-name -f
```

Then click "Merge" on GitHub.

### 9. Cleanup

Delete local and remote branches:

```bash
# Delete local branch
git branch -d feature/your-feature-name

# Delete remote branch
git push origin --delete feature/your-feature-name
```

## Pull Request Guidelines

### PR Title

```
[Type] Brief description

feat: Add member search functionality
fix: Resolve dark mode toggle persistence
docs: Update installation guide
```

### PR Description

```markdown
## Description
What does this PR do? Why?

## Changes
- Added member search component
- Integrated with API
- Added loading states

## Testing
How to test these changes

## Checklist
- [x] Tests pass
- [x] TypeScript strict mode
- [x] No console errors
- [x] Dark mode tested
- [x] Mobile responsive
```

### PR Checklist

Before requesting review, ensure:

```bash
# Build succeeds
pnpm build

# Type check passes
pnpm type-check

# Linting passes
pnpm lint

# Tests pass
pnpm test

# No console errors or logs
```

## Collaboration Tips

### Avoid Conflicts

1. **Keep branches short-lived** - Merge within 1-2 days
2. **Communicate** - Tell team about planned changes
3. **Rebase regularly** - Stay updated with main
4. **Review others' PRs** - Help move work forward

### Handling Conflicts

If conflicts occur:

```bash
# Update branch with main
git checkout main
git pull origin main

git checkout feature/your-branch
git rebase main

# Resolve conflicts in editor
# Then:
git add .
git rebase --continue
git push origin feature/your-branch -f
```

### Undo Mistakes

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Undo after push (create reverse commit)
git revert <commit-sha>
git push origin branch-name
```

## Code Review Etiquette

### As Author

- ✅ Create focused, small PRs
- ✅ Write clear PR descriptions
- ✅ Respond to feedback promptly
- ✅ Don't take criticism personally
- ❌ Don't request review unfinished work

### As Reviewer

- ✅ Be constructive and helpful
- ✅ Review within 24 hours if possible
- ✅ Approve when satisfied
- ✅ Acknowledge good work
- ❌ Don't demand changes without reason
- ❌ Don't review code you can't understand

## Example Workflow

```bash
# 1. Start
git checkout main
git pull origin main

# 2. Create branch
git checkout -b feature/add-directory

# 3. Make changes
echo "// New code" >> components/directory.tsx
git add components/directory.tsx
git commit -m "feat(ui): add directory component"

# 4. Push
git push origin feature/add-directory

# 5. Create PR on GitHub
# ... create PR ...

# 6. Address feedback
echo "// Fix based on review" >> components/directory.tsx
git add components/directory.tsx
git commit -m "feat(ui): address review feedback"
git push origin feature/add-directory

# 7. Merge on GitHub

# 8. Cleanup
git checkout main
git pull origin main
git branch -d feature/add-directory
```

## Useful Git Commands

```bash
# See all branches
git branch -a

# See commits on branch
git log --oneline main..feature/branch

# Squash commits before merge
git rebase -i main

# See who changed what
git blame file.tsx

# Find which branch has commit
git branch --contains <commit>

# Cherry pick commit
git cherry-pick <commit>

# Stash work temporarily
git stash
git stash pop
```

## Resources

- **[Conventional Commits](https://www.conventionalcommits.org/)** - Standard format
- **[Git Documentation](https://git-scm.com/doc)** - Official Git docs
- **[GitHub Flow](https://guides.github.com/introduction/flow/)** - GitHub workflow guide
- **[DEVELOPMENT.md](../DEVELOPMENT.md)** - Code standards
