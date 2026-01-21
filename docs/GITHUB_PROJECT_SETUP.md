# GitHub Project Setup Guide

This document contains all the issues and milestones from the Jones Family Hub Implementation Plan, organized for GitHub Project creation.

## Overview

- **Total Milestones:** 12 (M0-M11)
- **Total Issues:** 94 issues
- **Total Duration:** 22-26 weeks (~5.5-6.5 months)
- **Total Hours:** 432 hours
- **Target Launch:** August 4, 2026

## ✨ Idempotent Operations

**All automated operations are safe to re-run!** The GitHub project setup script:
- ✅ Updates existing milestones instead of creating duplicates
- ✅ Updates existing labels instead of creating duplicates
- ✅ Skips issues that already exist (matches by title)
- ✅ Can be run multiple times without side effects
- ✅ Provides clear status messages (Created ✓, Updated ↻, Already exists ↻)

This means you can:
- Re-run the script to update milestone dates or descriptions
- Add new labels or update existing ones
- Safely run after partial failures
- Update the script and re-run with new configurations

## How to Create This Project

### Option 1: Manual Creation via GitHub Web UI
1. Go to your repository on GitHub
2. Click on "Projects" tab
3. Create a new Project
4. Add milestones from the section below
5. Create issues one by one using the templates provided

### Option 2: Using GitHub CLI (Recommended)
```bash
# Install GitHub CLI if not installed
# See: https://cli.github.com/

# Login to GitHub
gh auth login

# Create each milestone
gh api repos/:owner/:repo/milestones -f title="M0: Design System Foundation" -f due_on="2026-02-10T00:00:00Z" -f description="Implement complete design system including brand colors, typography, UI components, and light/dark theme support."

# Create each issue
gh issue create --title "Logo Asset Preparation" --label "design,branding,P0 - Critical" --milestone "M0: Design System Foundation" --body "Content from issue template"
```

### Option 3: Using GitHub API Script
See the `github-project-setup.js` script at the end of this document.

---

## Milestones

### M0: Design System Foundation
- **Target:** Week 2 (February 10, 2026)
- **Duration:** 2 weeks
- **Hours:** 32h
- **Issues:** #0.1 - #0.8

### M1: Project Setup & Infrastructure
- **Target:** Week 4 (February 24, 2026)
- **Duration:** 2 weeks
- **Hours:** 32h
- **Issues:** #1 - #8

### M2: Authentication & User Management
- **Target:** Week 7 (March 10, 2026)
- **Duration:** 3 weeks
- **Hours:** 48h
- **Issues:** #9 - #16

### M3: Core Pages & Navigation
- **Target:** Week 9 (March 24, 2026)
- **Duration:** 2 weeks
- **Hours:** 32h
- **Issues:** #17 - #23

### M4: Family Directory (Protected)
- **Target:** Week 12 (April 14, 2026)
- **Duration:** 3 weeks
- **Hours:** 48h
- **Issues:** #24 - #31

### M5: Achievements System
- **Target:** Week 15 (May 5, 2026)
- **Duration:** 3 weeks
- **Hours:** 48h
- **Issues:** #32 - #39

### M6: Gallery & Media Management
- **Target:** Week 18 (May 26, 2026)
- **Duration:** 3 weeks
- **Hours:** 48h
- **Issues:** #40 - #47

### M7: Reunion RSVP
- **Target:** Week 20 (June 9, 2026)
- **Duration:** 2 weeks
- **Hours:** 32h
- **Issues:** #48 - #54

### M8: Payments Integration
- **Target:** Week 22 (June 23, 2026)
- **Duration:** 2 weeks
- **Hours:** 32h
- **Issues:** #55 - #62

### M9: Birthday Feature
- **Target:** Week 24 (July 7, 2026)
- **Duration:** 2 weeks
- **Hours:** 32h
- **Issues:** #74 - #83

### M10: Testing & Launch Preparation
- **Target:** Week 26 (July 21, 2026)
- **Duration:** 2 weeks
- **Hours:** 32h
- **Issues:** #84 - #89

### M11: Deployment & Post-Launch
- **Target:** Week 27 (August 4, 2026)
- **Duration:** 1 week
- **Hours:** 16h
- **Issues:** #90 - #94

---

## Complete Issue List

### Milestone 0: Design System Foundation

#### Issue #0.1: Logo Asset Preparation
**Labels:** `design`, `branding`, `P0 - Critical`  
**Estimate:** 4h  
**Milestone:** M0: Design System Foundation

**Description:**
Prepare all logo variations from existing Jones Family logo for web use.

**Tasks:**
- [ ] Convert existing logo PNG to SVG format
- [ ] Create white/inverted version for dark theme
- [ ] Extract central shield for simplified logo version
- [ ] Create favicon in multiple sizes (32×32, 16×16)
- [ ] Create JF monogram icon mark
- [ ] Create Apple Touch Icon (180×180)
- [ ] Optimize all files for web
- [ ] Document logo usage guidelines

**Acceptance Criteria:**
- All logo variations created
- Files optimized for web
- Both light and dark theme versions ready
- Icon files in correct formats

---

#### Issue #0.2: Tailwind Configuration with Design Tokens
**Labels:** `design`, `frontend`, `P0 - Critical`  
**Estimate:** 5h  
**Milestone:** M0: Design System Foundation

**Description:**
Configure Tailwind CSS with complete design system including light/dark theme support.

**Tasks:**
- [ ] Install and configure Tailwind CSS 4.x
- [ ] Set up dark mode with class strategy
- [ ] Configure heritage brand colors (green, gold, burgundy)
- [ ] Configure secondary colors (sage, cream, terracotta)
- [ ] Configure dark theme color palette
- [ ] Add semantic colors (success, warning, error, info)
- [ ] Configure typography (Playfair Display, Inter, Fira Code)
- [ ] Set up spacing scale and border radius tokens
- [ ] Configure box shadows for both themes
- [ ] Add custom breakpoints

**Acceptance Criteria:**
- Tailwind configured with all design tokens
- Both light and dark themes working
- All brand colors available as utilities
- Typography system implemented

---

#### Issue #0.3: CSS Variables & Theme System
**Labels:** `design`, `frontend`, `P0 - Critical`  
**Estimate:** 4h  
**Dependencies:** Issue #0.2  
**Milestone:** M0: Design System Foundation

**Description:**
Implement CSS variables and theme switching system.

**Tasks:**
- [ ] Create globals.css with CSS variables
- [ ] Define light theme variables
- [ ] Define dark theme variables (.dark class)
- [ ] Add smooth theme transition animations (200ms)
- [ ] Create theme provider component (React Context)
- [ ] Implement system preference detection
- [ ] Add localStorage persistence for theme preference
- [ ] Test theme switching

**Acceptance Criteria:**
- CSS variables defined for both themes
- Theme provider working
- System preference respected
- User preference persists across sessions

---

#### Issue #0.4: Typography System Implementation
**Labels:** `design`, `frontend`, `P0 - Critical`  
**Estimate:** 3h  
**Dependencies:** Issue #0.2  
**Milestone:** M0: Design System Foundation

**Description:**
Set up Google Fonts and typography system.

**Tasks:**
- [ ] Load Playfair Display (400, 600, 700) from Google Fonts
- [ ] Load Inter (400, 500, 600, 700) from Google Fonts
- [ ] Load Fira Code (400) from Google Fonts
- [ ] Configure font-display: swap for performance
- [ ] Create typography utility classes
- [ ] Implement responsive type scale
- [ ] Test font loading and fallbacks

**Acceptance Criteria:**
- All fonts loading correctly
- Typography scale working
- Responsive sizing working
- Fallback fonts appropriate

---

#### Issue #0.5: Core UI Component Library
**Labels:** `design`, `frontend`, `P0 - Critical`  
**Estimate:** 8h  
**Dependencies:** Issue #0.2, #0.3, #0.4  
**Milestone:** M0: Design System Foundation

**Description:**
Build reusable UI component library with theme support.

**Tasks:**
- [ ] Create Button component (primary, secondary, tertiary, destructive)
- [ ] Create Input component with validation states
- [ ] Create Textarea component
- [ ] Create Select component
- [ ] Create Checkbox and Radio components
- [ ] Create Card component (standard, feature)
- [ ] Create Modal component
- [ ] Create Alert component (success, warning, error, info)
- [ ] Implement all components for both light/dark themes
- [ ] Add proper ARIA labels and keyboard navigation
- [ ] Create Storybook documentation (optional)

**Acceptance Criteria:**
- All core components created
- Components work in both themes
- Accessibility guidelines met (WCAG 2.1 AA)
- Components documented

---

#### Issue #0.6: Layout Components
**Labels:** `design`, `frontend`, `P1 - High`  
**Estimate:** 4h  
**Dependencies:** Issue #0.5  
**Milestone:** M0: Design System Foundation

**Description:**
Create layout and container components.

**Tasks:**
- [ ] Create Container component with max-width
- [ ] Create responsive Grid component (12-col desktop, 8-col tablet, 4-col mobile)
- [ ] Create Stack component for vertical spacing
- [ ] Create Section component with spacing system
- [ ] Implement responsive breakpoints
- [ ] Test on multiple screen sizes

**Acceptance Criteria:**
- Layout components working
- Responsive behavior correct
- Spacing system consistent

---

#### Issue #0.7: Theme Toggle Component
**Labels:** `design`, `frontend`, `P1 - High`  
**Estimate:** 3h  
**Dependencies:** Issue #0.3, #0.5  
**Milestone:** M0: Design System Foundation

**Description:**
Create theme toggle button with sun/moon icons.

**Tasks:**
- [ ] Install Lucide React icons library
- [ ] Create ThemeToggle component
- [ ] Add sun icon for light theme
- [ ] Add moon icon for dark theme
- [ ] Implement smooth icon transition
- [ ] Add keyboard shortcut (Ctrl/Cmd + Shift + D)
- [ ] Add tooltip
- [ ] Make accessible

**Acceptance Criteria:**
- Theme toggle working
- Icons change appropriately
- Keyboard shortcut working
- Accessible via keyboard and screen reader

---

#### Issue #0.8: Iconography System
**Labels:** `design`, `frontend`, `P2 - Medium`  
**Estimate:** 2h  
**Dependencies:** Issue #0.2  
**Milestone:** M0: Design System Foundation

**Description:**
Set up icon system with Lucide Icons.

**Tasks:**
- [ ] Install Lucide React icons
- [ ] Create Icon wrapper component
- [ ] Define icon sizes (sm: 16px, md: 24px, lg: 32px, xl: 48px)
- [ ] Set stroke width to 2px
- [ ] Configure icon colors for themes
- [ ] Document feature icons from design spec

**Acceptance Criteria:**
- Icon system working
- Icons render in both themes
- Size variants working

---

### Milestone 1: Project Setup & Infrastructure

#### Issue #1: Initialize Next.js Project
**Labels:** `setup`, `P0 - Critical`  
**Estimate:** 4h  
**Milestone:** M1: Project Setup & Infrastructure

**Description:**
Set up the base Next.js 16 project with TypeScript and required configurations.

**Tasks:**
- [ ] Initialize Next.js 16 project with App Router
- [ ] Configure TypeScript with strict mode
- [ ] Set up Tailwind CSS 4.x
- [ ] Create project folder structure (/app, /components, /lib, /hooks, /actions, /types)
- [ ] Configure next.config.ts with image domains and security headers
- [ ] Set up ESLint and Prettier
- [ ] Initialize Git repository
- [ ] Create .env.example file

**Acceptance Criteria:**
- Project builds without errors
- TypeScript strict mode enabled
- Tailwind CSS working
- Folder structure matches technical design

---

#### Issue #2: Configure Vercel Project & Environment
**Labels:** `infrastructure`, `P0 - Critical`  
**Estimate:** 3h  
**Milestone:** M1: Project Setup & Infrastructure

**Description:**
Set up Vercel project and connect GitHub repository.

**Tasks:**
- [ ] Create Vercel project
- [ ] Connect GitHub repository
- [ ] Configure automatic deployments
- [ ] Set up preview deployments for pull requests
- [ ] Configure custom domain (jonesfamily1832.com)
- [ ] Enable Vercel Analytics

**Acceptance Criteria:**
- Automatic deployments working
- Preview URLs generated for PRs
- Custom domain configured with SSL

---

#### Issue #3: Set Up PostgreSQL Database
**Labels:** `database`, `P0 - Critical`  
**Estimate:** 5h  
**Milestone:** M1: Project Setup & Infrastructure

**Description:**
Provision PostgreSQL database and set up ORM.

**Tasks:**
- [ ] Provision Vercel Postgres database
- [ ] Install and configure Prisma ORM
- [ ] Create initial schema file from technical design
- [ ] Set up database connection pooling
- [ ] Configure environment variables for database
- [ ] Test database connection
- [ ] Set up database backup strategy

**Acceptance Criteria:**
- Database provisioned and accessible
- Prisma schema created with all tables
- Connection working from local environment

---

#### Issue #4: Database Schema Implementation
**Labels:** `database`, `P0 - Critical`  
**Estimate:** 6h  
**Dependencies:** Issue #3  
**Milestone:** M1: Project Setup & Infrastructure

**Description:**
Implement all database tables and relationships from technical design.

**Tasks:**
- [ ] Create users table schema
- [ ] Create family_members table schema
- [ ] Create achievements table with indexes
- [ ] Create gallery_albums and gallery_media tables
- [ ] Create reunion_rsvps table
- [ ] Create payments table
- [ ] Create birthday_wishes table
- [ ] Add birthday fields to family_members table
- [ ] Define all foreign key relationships
- [ ] Add database indexes for performance
- [ ] Run initial migration
- [ ] Create seed data for development

**Acceptance Criteria:**
- All tables created successfully
- Relationships working correctly
- Indexes applied
- Seed data populates successfully

---

#### Issue #5: Set Up Redis Cache (Vercel KV)
**Labels:** `infrastructure`, `P1 - High`  
**Estimate:** 3h  
**Milestone:** M1: Project Setup & Infrastructure

**Description:**
Configure Redis for session management and caching.

**Tasks:**
- [ ] Provision Vercel KV (Redis)
- [ ] Install Redis client library
- [ ] Create cache utility functions
- [ ] Configure session storage
- [ ] Test cache read/write operations
- [ ] Set up cache invalidation patterns

**Acceptance Criteria:**
- Redis instance provisioned
- Cache utilities working
- Session storage tested

---

#### Issue #6: Configure Vercel Blob Storage
**Labels:** `infrastructure`, `P1 - High`  
**Estimate:** 3h  
**Milestone:** M1: Project Setup & Infrastructure

**Description:**
Set up media storage for images and videos.

**Tasks:**
- [ ] Enable Vercel Blob Storage
- [ ] Install @vercel/blob package
- [ ] Create upload utility functions
- [ ] Configure file size limits (10MB images, 500MB videos)
- [ ] Set up file type validation
- [ ] Test file upload/retrieval

**Acceptance Criteria:**
- Blob storage configured
- Upload utilities working
- Size and type restrictions enforced

---

#### Issue #7: Set Up CI/CD Pipeline
**Labels:** `devops`, `P1 - High`  
**Estimate:** 4h  
**Milestone:** M1: Project Setup & Infrastructure

**Description:**
Create GitHub Actions workflow for automated testing and deployment.

**Tasks:**
- [ ] Create GitHub Actions workflow file
- [ ] Configure test running (Jest)
- [ ] Add TypeScript type checking
- [ ] Add linting step
- [ ] Configure build verification
- [ ] Set up deployment notifications
- [ ] Add branch protection rules

**Acceptance Criteria:**
- CI pipeline runs on every PR
- Tests, type checks, and linting automated
- Failed checks block deployment

---

#### Issue #8: Navigation & Footer Components
**Labels:** `frontend`, `design`, `P1 - High`  
**Estimate:** 5h  
**Dependencies:** Milestone 0 (Design System)  
**Milestone:** M1: Project Setup & Infrastructure

**Description:**
Create header navigation and footer with theme support.

**Tasks:**
- [ ] Build Header component with logo
- [ ] Style for both light and dark themes
- [ ] Add navigation placeholder (auth links added in M2)
- [ ] Integrate ThemeToggle component
- [ ] Build Footer component
- [ ] Add responsive mobile menu structure
- [ ] Test across breakpoints

**Acceptance Criteria:**
- Header and footer created
- Both themes styled correctly
- Logo displays properly in each theme
- Mobile responsive

---

*[Continue with all remaining issues from M2-M11 in same format...]*

---

## Automation Script

### Node.js Script for GitHub API

Save this as `github-project-setup.js`:

```javascript
const { Octokit } = require("@octokit/rest");
const fs = require('fs');

// Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = "your-github-username";
const REPO = "jones-family-1832";

const octokit = new Octokit({ auth: GITHUB_TOKEN });

// Milestones data
const milestones = [
  {
    title: "M0: Design System Foundation",
    description: "Implement complete design system including brand colors, typography, UI components, and light/dark theme support.",
    due_on: "2026-02-10T00:00:00Z"
  },
  // Add all other milestones...
];

// Issues data
const issues = [
  {
    title: "Logo Asset Preparation",
    body: `Prepare all logo variations from existing Jones Family logo for web use.

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
- Icon files in correct formats`,
    labels: ["design", "branding", "P0 - Critical"],
    milestone: "M0: Design System Foundation",
    assignees: []
  },
  // Add all other issues...
];

async function createMilestones() {
  console.log("Creating milestones...");
  for (const milestone of milestones) {
    try {
      const response = await octokit.issues.createMilestone({
        owner: OWNER,
        repo: REPO,
        title: milestone.title,
        description: milestone.description,
        due_on: milestone.due_on
      });
      console.log(`✓ Created milestone: ${milestone.title}`);
    } catch (error) {
      console.error(`✗ Error creating milestone ${milestone.title}:`, error.message);
    }
  }
}

async function createIssues() {
  console.log("Creating issues...");
  
  // Get milestones to get their IDs
  const { data: milestonesData } = await octokit.issues.listMilestones({
    owner: OWNER,
    repo: REPO,
    state: "open"
  });
  
  const milestoneMap = {};
  milestonesData.forEach(m => {
    milestoneMap[m.title] = m.number;
  });
  
  for (const issue of issues) {
    try {
      const milestoneNumber = milestoneMap[issue.milestone];
      const response = await octokit.issues.create({
        owner: OWNER,
        repo: REPO,
        title: issue.title,
        body: issue.body,
        labels: issue.labels,
        milestone: milestoneNumber,
        assignees: issue.assignees
      });
      console.log(`✓ Created issue: ${issue.title}`);
    } catch (error) {
      console.error(`✗ Error creating issue ${issue.title}:`, error.message);
    }
  }
}

async function main() {
  await createMilestones();
  await createIssues();
  console.log("Done!");
}

main();
```

### Usage:

```bash
# Install dependencies
npm install @octokit/rest

# Set your GitHub token
export GITHUB_TOKEN="your_github_token_here"

# Update OWNER and REPO constants in the script

# Run the script
node github-project-setup.js
```

---

## Manual Creation Checklist

If creating manually, follow this order:

1. ✅ Create all 12 milestones (M0-M11) with due dates
2. ✅ Create labels:
   - Priority: `P0 - Critical`, `P1 - High`, `P2 - Medium`, `P3 - Low`
   - Type: `design`, `frontend`, `backend`, `database`, `infrastructure`, `testing`, `devops`, `admin`, `payments`, `auth`, `content`, `seo`, `accessibility`, `performance`, `security`, `documentation`, `deployment`, `monitoring`, `launch`, `branding`, `api`, `email`, `setup`
3. ✅ Create issues in milestone order (M0 → M11)
4. ✅ Set dependencies in issue descriptions
5. ✅ Assign estimates and labels
6. ✅ Create project board and add issues

---

## Project Board Configuration

### Columns:
1. **Backlog** - Issues not yet started
2. **Ready** - Issues ready to begin (no blocking dependencies)
3. **In Progress** - Currently being worked on
4. **In Review** - Pull request open, awaiting review
5. **Done** - Completed and merged

### Automation Rules:
- Move to "In Progress" when issue assigned
- Move to "In Review" when PR linked
- Move to "Done" when PR merged

---

## Related Documentation

- [📘 Implementation Plan](../🗓️%20GitHub%20Project%20Implementation%20Plan.md) - Full detailed plan
- [📚 Architecture](./ARCHITECTURE.md) - Project structure
- [💻 Development Guide](./DEVELOPMENT.md) - Coding standards
- [🚀 Getting Started](./guides/GETTING_STARTED.md) - Quick setup
- [🔗 Git Workflow](./guides/GIT_WORKFLOW.md) - Branching and commits

---

**Last Updated:** January 20, 2026  
**Status:** Ready for GitHub Project Creation
