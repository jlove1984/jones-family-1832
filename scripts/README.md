# GitHub Project Creation Guide

## ✨ Idempotent Operations

**All operations are safe to re-run!** The automated script:
- Updates existing milestones instead of creating duplicates
- Updates existing labels instead of creating duplicates  
- Skips issues that already exist (checks by title)
- Can be run multiple times without side effects

## Quick Setup (Automated)

### Prerequisites
```bash
# Install Node.js dependencies
npm install @octokit/rest

# Set GitHub token
export GITHUB_TOKEN="your_github_personal_access_token"
```

### Run Automated Setup
```bash
# Update owner/repo in scripts/github-project-setup.js
# Then run:
node scripts/github-project-setup.js
```

This creates:
- ✅ All 12 milestones with due dates
- ✅ All 26 labels (priority + type)
- ✅ Sample issues from each milestone

---

## Manual Setup (GitHub CLI)

### 1. Install GitHub CLI
```bash
# macOS
brew install gh

# Windows
winget install GitHub.cli

# Linux
sudo apt install gh
```

### 2. Authenticate
```bash
gh auth login
```

### 3. Create Labels
```bash
# Priority labels
gh label create "P0 - Critical" --color d73a4a --description "Must be completed for launch"
gh label create "P1 - High" --color fb8500 --description "Important features"
gh label create "P2 - Medium" --color ffb703 --description "Nice to have"
gh label create "P3 - Low" --color ffd60a --description "Future enhancements"

# Type labels
gh label create "design" --color e91e63
gh label create "frontend" --color 0366d6
gh label create "backend" --color 2ea44f
gh label create "database" --color 5319e7
gh label create "infrastructure" --color 0e8a16
gh label create "testing" --color 1d76db
gh label create "auth" --color c2e0c6
gh label create "payments" --color 006b75
# Add remaining labels...
```

### 4. Create Milestones
```bash
# M0: Design System Foundation
gh api repos/:owner/:repo/milestones \
  -f title="M0: Design System Foundation" \
  -f due_on="2026-02-10T00:00:00Z" \
  -f description="Implement complete design system"

# M1: Project Setup & Infrastructure
gh api repos/:owner/:repo/milestones \
  -f title="M1: Project Setup & Infrastructure" \
  -f due_on="2026-02-24T00:00:00Z" \
  -f description="Set up Next.js project and infrastructure"

# Create remaining milestones...
```

### 5. Create Issues
```bash
# Example: Issue #0.1
gh issue create \
  --title "Logo Asset Preparation" \
  --label "design,branding,P0 - Critical" \
  --milestone "M0: Design System Foundation" \
  --body "$(cat <<'EOF'
Prepare all logo variations from existing Jones Family logo for web use.

## Tasks
- [ ] Convert existing logo PNG to SVG format
- [ ] Create white/inverted version for dark theme
- [ ] Extract central shield for simplified logo version
- [ ] Create favicon in multiple sizes (32×32, 16×16)
- [ ] Create JF monogram icon mark
- [ ] Create Apple Touch Icon (180×180)
- [ ] Optimize all files for web
- [ ] Document logo usage guidelines

## Acceptance Criteria
- All logo variations created
- Files optimized for web
- Both light and dark theme versions ready
- Icon files in correct formats

**Estimate:** 4 hours
EOF
)"
```

---

## Issue Creation Template

Use this template for creating issues manually in GitHub web UI:

### Title
```
[Clear, action-oriented title]
```

### Labels
```
[type], [priority], [additional tags]
Example: design, frontend, P0 - Critical
```

### Milestone
```
[Select appropriate milestone: M0-M11]
```

### Body Format
```markdown
[Brief description of what needs to be done]

## Tasks
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3
...

## Acceptance Criteria
- Criteria 1
- Criteria 2
- Criteria 3

**Estimate:** X hours
**Dependencies:** [List any blocking issues]
```

---

## Complete Issue Reference

See **[docs/GITHUB_PROJECT_SETUP.md](./docs/GITHUB_PROJECT_SETUP.md)** for:
- Full list of all 94 issues
- Complete issue descriptions
- All acceptance criteria
- Dependencies mapping
- Milestone groupings

---

## Project Board Setup

### 1. Create Project
1. Go to repository → Projects tab
2. Click "New project"
3. Select "Board" template
4. Name: "Jones Family Hub Implementation"

### 2. Configure Columns
Create these columns:
1. **📋 Backlog** - All planned issues
2. **🎯 Ready** - No blocking dependencies
3. **⚡ In Progress** - Currently being worked on
4. **👀 In Review** - PR open, awaiting review
5. **✅ Done** - Completed and merged

### 3. Add Issues to Board
```bash
# Add all issues to project
gh project item-add [PROJECT_NUMBER] --owner [OWNER] --url [ISSUE_URL]
```

### 4. Set Up Automation
- Auto-move to "In Progress" when assigned
- Auto-move to "In Review" when PR created
- Auto-move to "Done" when PR merged

---

## Issue Numbering Convention

The implementation plan uses this numbering:

- **M0:** Issues #0.1 - #0.8 (Design System)
- **M1:** Issues #1 - #8 (Project Setup)
- **M2:** Issues #9 - #16 (Authentication)
- **M3:** Issues #17 - #23 (Core Pages)
- **M4:** Issues #24 - #31 (Family Directory)
- **M5:** Issues #32 - #39 (Achievements)
- **M6:** Issues #40 - #47 (Gallery)
- **M7:** Issues #48 - #54 (Reunion RSVP)
- **M8:** Issues #55 - #62 (Payments)
- **M9:** Issues #74 - #83 (Birthday Feature)
- **M10:** Issues #84 - #89 (Testing & Launch Prep)
- **M11:** Issues #90 - #94 (Deployment)

**Note:** Issues #63-73 are reserved for future use or can be renumbered.

---

## Workflow Example

### Creating Issue #0.1 via CLI
```bash
gh issue create \
  --title "Logo Asset Preparation" \
  --label "design,branding,P0 - Critical" \
  --milestone "M0: Design System Foundation" \
  --body-file .github/issue-templates/logo-assets.md
```

### Creating Issue via Web UI
1. Go to Issues → New Issue
2. Copy template from docs/GITHUB_PROJECT_SETUP.md
3. Fill in title, labels, milestone
4. Paste and customize body
5. Create issue

---

## Verification Checklist

After setup, verify:

- [ ] All 12 milestones created with due dates
- [ ] All 26 labels created
- [ ] Priority labels (P0-P3) exist
- [ ] Type labels (design, frontend, etc.) exist
- [ ] Sample issues created successfully
- [ ] Issues assigned to correct milestones
- [ ] Dependencies documented in issue bodies
- [ ] Project board created
- [ ] Columns configured
- [ ] Automation rules set up

---

## Next Steps After Setup

1. **Review Milestones:** Ensure due dates align with team capacity
2. **Assign Issues:** Assign yourself or team members to issues
3. **Set Dependencies:** Update issue descriptions with blockers
4. **Start M0:** Begin with Design System Foundation milestone
5. **Track Progress:** Use project board to monitor completion
6. **Update Regularly:** Keep issue status and project board current

---

## Helpful Commands

### List all milestones
```bash
gh api repos/:owner/:repo/milestones
```

### List all labels
```bash
gh label list
```

### List all issues
```bash
gh issue list --limit 100
```

### List issues by milestone
```bash
gh issue list --milestone "M0: Design System Foundation"
```

### List issues by label
```bash
gh issue list --label "P0 - Critical"
```

### Close completed issue
```bash
gh issue close [ISSUE_NUMBER]
```

---

## Troubleshooting

### "Already exists" messages
- ✅ This is normal and expected! The script is idempotent.
- ✅ It updates existing items instead of creating duplicates.
- ✅ Safe to re-run after partial failures.

### Re-running the script
```bash
# Safe to run multiple times
node scripts/github-project-setup.js

# The script will:
# - Update existing milestones with new dates/descriptions
# - Update existing labels with new colors/descriptions
# - Skip issues that already exist (by title match)
```

### "Permission denied" error
- Check your GitHub token has `repo` permissions
- Ensure you're authenticated: `gh auth status`

### "Milestone not found" error
- Verify milestone exists: `gh api repos/:owner/:repo/milestones`
- Check spelling matches exactly

### "Label not found" error
- Create label first: `gh label create "label-name"`
- Check label list: `gh label list`

### Rate limit errors
- GitHub API has rate limits
- Wait a few minutes between bulk operations
- Use `gh api rate_limit` to check status

---

## Support & Resources

- **Documentation:** [docs/GITHUB_PROJECT_SETUP.md](./docs/GITHUB_PROJECT_SETUP.md)
- **GitHub CLI Docs:** https://cli.github.com/manual/
- **GitHub API Docs:** https://docs.github.com/en/rest
- **Octokit.js Docs:** https://octokit.github.io/rest.js/

---

**Last Updated:** January 20, 2026  
**Script Version:** 1.0.0
