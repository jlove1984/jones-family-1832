# 🚀 Quick Start: GitHub Project Setup

## TL;DR - Get Started in 2 Minutes

```bash
# 1. Install Dependencies
pnpm setup:install
# or: pnpm add -D @octokit/rest dotenv

# 2. Configure Environment
cp .env.example .env
# Edit .env and add your GitHub token and username

# 3. Run Setup
pnpm setup:github
# or: node scripts/github-project-setup.js
```

**Result:** Creates 12 milestones, 26 labels, and sample issues!

**✨ Safe to re-run!** The script is idempotent - it updates existing items instead of creating duplicates.

---

## What Gets Created

### ✅ Milestones (12)
- M0: Design System Foundation → Feb 10, 2026
- M1: Project Setup & Infrastructure → Feb 24, 2026
- M2: Authentication & User Management → Mar 10, 2026
- M3: Core Pages & Navigation → Mar 24, 2026
- M4: Family Directory (Protected) → Apr 14, 2026
- M5: Achievements System → May 5, 2026
- M6: Gallery & Media Management → May 26, 2026
- M7: Reunion RSVP → Jun 9, 2026
- M8: Payments Integration → Jun 23, 2026
- M9: Birthday Feature → Jul 7, 2026
- M10: Testing & Launch Preparation → Jul 21, 2026
- M11: Deployment & Post-Launch → Aug 4, 2026

### ✅ Labels (26)
**Priority:** P0-Critical, P1-High, P2-Medium, P3-Low  
**Types:** design, frontend, backend, database, infrastructure, testing, devops, admin, payments, auth, content, seo, accessibility, performance, security, documentation, deployment, monitoring, launch, branding, api, email, setup

### ✅ Sample Issues (3+)
Creates first issue from M0, M1, M2 as examples

---

## Option A: Automated (Recommended)

### Prerequisites
- Node.js installed
- GitHub account with repo access
- GitHub Personal Access Token

### Steps

1. **Get GitHub Token**
   ```
   Go to: GitHub → Settings → Developer Settings → Personal Access Tokens
   Create token with 'repo' permissions
   Copy the token (starts with 'ghp_')
   ```

2. **Install Dependencies**
   ```bash
   pnpm setup:install
   # or: pnpm add -D @octokit/rest dotenv
   ```

3. **Configure Environment**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env file and update:
   # - GITHUB_TOKEN=your_actual_token_here
   # - GITHUB_OWNER=your-github-username
   # - GITHUB_REPO=jones-family-1832
   ```

4. **Run Setup**
   ```bash
   pnpm setup:github
   ```

5. **Verify**
   ```
   Visit: https://github.com/your-username/jones-family-1832/milestones
   Visit: https://github.com/your-username/jones-family-1832/issues
   ```

---

## Option B: GitHub CLI

### Prerequisites
- GitHub CLI installed (`gh`)

### Steps

1. **Install GitHub CLI**
   ```bash
   # macOS
   brew install gh
   
   # Windows
   winget install GitHub.cli
   ```

2. **Authenticate**
   ```bash
   gh auth login
   ```

3. **Create Milestones**
   ```bash
   gh api repos/:owner/:repo/milestones \
     -f title="M0: Design System Foundation" \
     -f due_on="2026-02-10T00:00:00Z" \
     -f description="Implement complete design system"
   
   # Repeat for all 12 milestones...
   ```

4. **Create Labels**
   ```bash
   gh label create "P0 - Critical" --color d73a4a
   gh label create "P1 - High" --color fb8500
   # Create remaining labels...
   ```

5. **Create Issues**
   ```bash
   gh issue create \
     --title "Logo Asset Preparation" \
     --label "design,branding,P0 - Critical" \
     --milestone "M0: Design System Foundation" \
     --body-file .github/issue-templates/logo-prep.md
   ```

---

## Option C: Manual (GitHub Web UI)

### Steps

1. **Create Labels**
   - Go to: Repository → Issues → Labels
   - Click "New label"
   - Create all 26 labels (see list in scripts/README.md)

2. **Create Milestones**
   - Go to: Repository → Issues → Milestones
   - Click "New milestone"
   - Create all 12 milestones with due dates

3. **Create Issues**
   - Go to: Repository → Issues → New issue
   - Copy template from docs/GITHUB_PROJECT_SETUP.md
   - Fill in title, labels, milestone, description
   - Create all 94 issues

---

## What to Do After Setup

### 1. Create Project Board
```
Repository → Projects → New project
- Select "Board" template
- Add columns: Backlog, Ready, In Progress, In Review, Done
```

### 2. Add Issues to Project
```
- Link all issues to project board
- Set up automation rules
- Configure column triggers
```

### 3. Start Development
```
- Begin with M0: Design System Foundation
- Assign yourself to first issue
- Create feature branch
- Start coding!
```

---

## Troubleshooting

### "Authentication failed"
```bash
# Check token
echo $GITHUB_TOKEN

# Re-authenticate
gh auth login
```

### "Repository not found"
```bash
# Verify repo exists
gh repo view your-username/jones-family-1832

# Check OWNER and REPO in script
```

### "Milestone not found"
```bash
# List existing milestones
gh api repos/:owner/:repo/milestones

# Verify spelling matches exactly
```

### "Rate limit exceeded"
```bash
# Check rate limit
gh api rate_limit

# Wait a few minutes between operations
```

---

## Files Created

| File | Purpose |
|------|---------|
| `docs/GITHUB_PROJECT_SETUP.md` | Complete setup guide with all 94 issues |
| `scripts/github-project-setup.js` | Automation script (Node.js) |
| `scripts/README.md` | CLI examples and manual instructions |
| `scripts/IMPLEMENTATION_SUMMARY.md` | Project overview and metrics |
| `scripts/github-issues-data.json` | Structured data for import |
| `scripts/issues-export.csv` | Spreadsheet-compatible export |

---

## Complete Issue List

See **[docs/GITHUB_PROJECT_SETUP.md](../docs/GITHUB_PROJECT_SETUP.md)** for:
- All 94 issue templates
- Complete task checklists
- Acceptance criteria
- Dependencies
- Time estimates

---

## Timeline

```
Jan 27, 2026  →  Start (M0: Design System)
Feb 10, 2026  →  M0 Complete
Feb 24, 2026  →  M1 Complete (Project Setup)
Mar 10, 2026  →  M2 Complete (Authentication)
Mar 24, 2026  →  M3 Complete (Core Pages)
Apr 14, 2026  →  M4 Complete (Directory)
May 05, 2026  →  M5 Complete (Achievements)
May 26, 2026  →  M6 Complete (Gallery)
Jun 09, 2026  →  M7 Complete (RSVP)
Jun 23, 2026  →  M8 Complete (Payments)
Jul 07, 2026  →  M9 Complete (Birthdays)
Jul 21, 2026  →  M10 Complete (Testing)
Aug 04, 2026  →  M11 Complete (LAUNCH! 🚀)
```

---

## Need Help?

- 📖 **Full Guide:** [docs/GITHUB_PROJECT_SETUP.md](../docs/GITHUB_PROJECT_SETUP.md)
- 🔧 **Troubleshooting:** [docs/guides/TROUBLESHOOTING.md](../docs/guides/TROUBLESHOOTING.md)
- 💬 **Contact:** jermlove@gmail.com

---

**Ready to build! 🚀**
