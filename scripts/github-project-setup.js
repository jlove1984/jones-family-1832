#!/usr/bin/env node

/**
 * Jones Family Hub - GitHub Project Setup Script
 * 
 * This script creates all milestones and issues for the Jones Family Hub project
 * based on the GitHub Project Implementation Plan.
 * 
 * Prerequisites:
 * - Node.js installed
 * - GitHub Personal Access Token with repo permissions
 * - npm install @octokit/rest
 * 
 * Usage:
 * node scripts/github-project-setup.js
 * 
 * Environment Variables:
 * - GITHUB_TOKEN: Your GitHub personal access token
 * - GITHUB_OWNER: Repository owner (default: your username)
 * - GITHUB_REPO: Repository name (default: jones-family-1832)
 */

require("dotenv").config();
const { Octokit } = require("@octokit/rest");

// Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.GITHUB_OWNER || "YOUR_USERNAME"; // Update this
const REPO = process.env.GITHUB_REPO || "jones-family-1832";

if (!GITHUB_TOKEN) {
  console.error("❌ Error: GITHUB_TOKEN environment variable is required");
  console.log("\nUsage:");
  console.log("  export GITHUB_TOKEN=your_token_here");
  console.log("  node scripts/github-project-setup.js");
  process.exit(1);
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

// Milestones Configuration
const milestones = [
  {
    title: "M0: Design System Foundation",
    description: "Implement complete design system including brand colors, typography, UI components, and light/dark theme support before building features.",
    due_on: "2026-02-10T00:00:00Z",
    state: "open"
  },
  {
    title: "M1: Project Setup & Infrastructure",
    description: "Set up Next.js project, database, authentication, and core infrastructure components.",
    due_on: "2026-02-24T00:00:00Z",
    state: "open"
  },
  {
    title: "M2: Authentication & User Management",
    description: "Implement Better Auth for user registration, login, password reset, and session management with role-based access control.",
    due_on: "2026-03-10T00:00:00Z",
    state: "open"
  },
  {
    title: "M3: Core Pages & Navigation",
    description: "Build homepage, navigation, footer, history page, contact form, and implement SEO and accessibility compliance.",
    due_on: "2026-03-24T00:00:00Z",
    state: "open"
  },
  {
    title: "M4: Family Directory (Protected)",
    description: "Create protected family directory with member profiles, search, filtering, and CSV import/export functionality.",
    due_on: "2026-04-14T00:00:00Z",
    state: "open"
  },
  {
    title: "M5: Achievements System",
    description: "Build achievement submission, approval workflow, display pages, and homepage integration.",
    due_on: "2026-05-05T00:00:00Z",
    state: "open"
  },
  {
    title: "M6: Gallery & Media Management",
    description: "Implement photo/video gallery with albums, lightbox viewer, upload functionality, and admin management interface.",
    due_on: "2026-05-26T00:00:00Z",
    state: "open"
  },
  {
    title: "M7: Reunion RSVP",
    description: "Create reunion information page, RSVP form, admin management, and countdown timer.",
    due_on: "2026-06-09T00:00:00Z",
    state: "open"
  },
  {
    title: "M8: Payments Integration",
    description: "Integrate Stripe for reunion dues payment processing, webhook handling, and payment history tracking.",
    due_on: "2026-06-23T00:00:00Z",
    state: "open"
  },
  {
    title: "M9: Birthday Feature",
    description: "Implement Facebook-style birthday feature with homepage widget, calendar view, wishes, and email notifications.",
    due_on: "2026-07-07T00:00:00Z",
    state: "open"
  },
  {
    title: "M10: Testing & Launch Preparation",
    description: "Comprehensive testing, performance optimization, security audit, cross-browser testing, and documentation.",
    due_on: "2026-07-21T00:00:00Z",
    state: "open"
  },
  {
    title: "M11: Deployment & Post-Launch",
    description: "Production deployment, user acceptance testing, launch communications, and post-launch monitoring.",
    due_on: "2026-08-04T00:00:00Z",
    state: "open"
  }
];

// Label Configuration
const labels = [
  // Priority Labels
  { name: "P0 - Critical", color: "d73a4a", description: "Must be completed for launch" },
  { name: "P1 - High", color: "fb8500", description: "Important features, needed for full functionality" },
  { name: "P2 - Medium", color: "ffb703", description: "Nice to have, can be deferred" },
  { name: "P3 - Low", color: "ffd60a", description: "Future enhancements" },
  
  // Type Labels
  { name: "design", color: "e91e63", description: "Design and UI work" },
  { name: "frontend", color: "0366d6", description: "Frontend development" },
  { name: "backend", color: "2ea44f", description: "Backend development" },
  { name: "database", color: "5319e7", description: "Database work" },
  { name: "infrastructure", color: "0e8a16", description: "Infrastructure and DevOps" },
  { name: "testing", color: "1d76db", description: "Testing and QA" },
  { name: "devops", color: "0e8a16", description: "CI/CD and deployment" },
  { name: "admin", color: "d876e3", description: "Admin features" },
  { name: "payments", color: "006b75", description: "Payment processing" },
  { name: "auth", color: "c2e0c6", description: "Authentication and authorization" },
  { name: "content", color: "fbca04", description: "Content management" },
  { name: "seo", color: "84b6eb", description: "SEO optimization" },
  { name: "accessibility", color: "5319e7", description: "Accessibility improvements" },
  { name: "performance", color: "d4c5f9", description: "Performance optimization" },
  { name: "security", color: "b60205", description: "Security enhancements" },
  { name: "documentation", color: "0075ca", description: "Documentation" },
  { name: "deployment", color: "1d76db", description: "Deployment tasks" },
  { name: "monitoring", color: "006b75", description: "Monitoring and logging" },
  { name: "launch", color: "e99695", description: "Launch preparation" },
  { name: "branding", color: "e91e63", description: "Brand identity" },
  { name: "api", color: "2ea44f", description: "API development" },
  { name: "email", color: "c5def5", description: "Email functionality" },
  { name: "setup", color: "0e8a16", description: "Project setup" }
];

/**
 * Create or update labels (idempotent)
 */
async function createLabels() {
  console.log("\n📋 Creating/updating labels...\n");
  
  // Get all existing labels first
  let existingLabels = [];
  try {
    const { data } = await octokit.issues.listLabelsForRepo({
      owner: OWNER,
      repo: REPO,
      per_page: 100
    });
    existingLabels = data;
  } catch (error) {
    console.log(`  ⚠ Could not fetch existing labels: ${error.message}`);
  }
  
  for (const label of labels) {
    const existing = existingLabels.find(l => l.name.toLowerCase() === label.name.toLowerCase());
    
    if (existing) {
      // Label exists, update it
      try {
        await octokit.issues.updateLabel({
          owner: OWNER,
          repo: REPO,
          name: existing.name, // Use existing name for case sensitivity
          new_name: label.name,
          color: label.color,
          description: label.description
        });
        console.log(`  ↻ Updated label: ${label.name}`);
      } catch (updateError) {
        console.error(`  ✗ Error updating label ${label.name}:`, updateError.message);
      }
    } else {
      // Label doesn't exist, create it
      try {
        await octokit.issues.createLabel({
          owner: OWNER,
          repo: REPO,
          name: label.name,
          color: label.color,
          description: label.description
        });
        console.log(`  ✓ Created label: ${label.name}`);
      } catch (error) {
        console.error(`  ✗ Error creating label ${label.name}:`, error.message);
      }
    }
  }
}

/**
 * Get or create milestones (idempotent)
 */
async function createMilestones() {
  console.log("\n🎯 Creating/updating milestones...\n");
  
  const createdMilestones = {};
  
  // First, get all existing milestones
  let existingMilestones = [];
  try {
    const { data } = await octokit.issues.listMilestones({
      owner: OWNER,
      repo: REPO,
      state: "all",
      per_page: 100
    });
    existingMilestones = data;
  } catch (error) {
    console.log(`  ⚠ Could not fetch existing milestones: ${error.message}`);
  }
  
  for (const milestone of milestones) {
    // Check if milestone already exists
    const existing = existingMilestones.find(m => m.title === milestone.title);
    
    if (existing) {
      // Milestone exists, update it
      try {
        await octokit.issues.updateMilestone({
          owner: OWNER,
          repo: REPO,
          milestone_number: existing.number,
          title: milestone.title,
          description: milestone.description,
          due_on: milestone.due_on,
          state: milestone.state
        });
        createdMilestones[milestone.title] = existing.number;
        console.log(`  ↻ Updated milestone: ${milestone.title} (ID: ${existing.number})`);
      } catch (error) {
        console.error(`  ✗ Error updating milestone ${milestone.title}:`, error.message);
        // Still use the existing milestone ID
        createdMilestones[milestone.title] = existing.number;
      }
    } else {
      // Milestone doesn't exist, create it
      try {
        const response = await octokit.issues.createMilestone({
          owner: OWNER,
          repo: REPO,
          title: milestone.title,
          description: milestone.description,
          due_on: milestone.due_on,
          state: milestone.state
        });
        
        createdMilestones[milestone.title] = response.data.number;
        console.log(`  ✓ Created milestone: ${milestone.title} (ID: ${response.data.number})`);
      } catch (error) {
        console.error(`  ✗ Error creating milestone ${milestone.title}:`, error.message);
      }
    }
  }
  
  return createdMilestones;
}

/**
 * Create sample issues (first few from each milestone)
 * Full issue creation should be done manually or with full data
 */
async function createSampleIssues(milestoneMap) {
  console.log("\n📝 Creating sample issues...\n");
  console.log("Note: Creating first issue from each milestone as examples.");
  console.log("Use the full data file or GitHub UI to create remaining issues.\n");
  
  const sampleIssues = [
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
- Icon files in correct formats

**Estimate:** 4 hours`,
      labels: ["design", "branding", "P0 - Critical"],
      milestone: "M0: Design System Foundation"
    },
    {
      title: "Initialize Next.js Project",
      body: `Set up the base Next.js 16 project with TypeScript and required configurations.

## Tasks
- [ ] Initialize Next.js 16 project with App Router
- [ ] Configure TypeScript with strict mode
- [ ] Set up Tailwind CSS 4.x
- [ ] Create project folder structure (/app, /components, /lib, /hooks, /actions, /types)
- [ ] Configure next.config.ts with image domains and security headers
- [ ] Set up ESLint and Prettier
- [ ] Initialize Git repository
- [ ] Create .env.example file

## Acceptance Criteria
- Project builds without errors
- TypeScript strict mode enabled
- Tailwind CSS working
- Folder structure matches technical design

**Estimate:** 4 hours`,
      labels: ["setup", "P0 - Critical"],
      milestone: "M1: Project Setup & Infrastructure"
    },
    {
      title: "Install & Configure Better Auth",
      body: `Set up Better Auth for authentication system.

## Tasks
- [ ] Install Better Auth package
- [ ] Configure auth options and providers
- [ ] Set up email/password authentication
- [ ] Configure session management with Redis
- [ ] Set up password hashing (bcrypt, 12 rounds)
- [ ] Create auth configuration file
- [ ] Configure HTTP-only cookies
- [ ] Set up CSRF protection

## Acceptance Criteria
- Better Auth configured
- Session management working
- Security measures in place

**Estimate:** 6 hours
**Dependencies:** Issue #3 (PostgreSQL Database), Issue #4 (Database Schema), Issue #5 (Redis Cache)`,
      labels: ["auth", "backend", "P0 - Critical"],
      milestone: "M2: Authentication & User Management"
    }
  ];
  
  for (const issue of sampleIssues) {
    try {
      const milestoneNumber = milestoneMap[issue.milestone];
      
      if (!milestoneNumber) {
        console.log(`  ⚠ Skipping issue "${issue.title}" - milestone not found`);
        continue;
      }
      
      const response = await octokit.issues.create({
        owner: OWNER,
        repo: REPO,
        title: issue.title,
        body: issue.body,
        labels: issue.labels,
        milestone: milestoneNumber
      });
      
      console.log(`  ✓ Created issue #${response.data.number}: ${issue.title}`);
    } catch (error) {
      console.error(`  ✗ Error creating issue "${issue.title}":`, error.message);
    }
  }
  
  console.log(`\n💡 Sample issues created. See docs/GITHUB_PROJECT_SETUP.md for complete issue list.`);
}

/**
 * Main execution
 */
async function main() {
  console.log("=".repeat(60));
  console.log("Jones Family Hub - GitHub Project Setup");
  console.log("=".repeat(60));
  console.log(`\nRepository: ${OWNER}/${REPO}`);
  console.log(`Total Milestones: ${milestones.length}`);
  console.log(`Total Labels: ${labels.length}`);
  
  try {
    // Verify repository access
    await octokit.repos.get({ owner: OWNER, repo: REPO });
    console.log("✓ Repository access verified");
    
    // Create labels
    await createLabels();
    
    // Create milestones
    const milestoneMap = await createMilestones();
    
    // Create sample issues
    await createSampleIssues(milestoneMap);
    
    console.log("\n" + "=".repeat(60));
    console.log("✅ Project setup complete!");
    console.log("=".repeat(60));
    console.log("\nNext steps:");
    console.log("1. Visit https://github.com/" + OWNER + "/" + REPO + "/milestones");
    console.log("2. Visit https://github.com/" + OWNER + "/" + REPO + "/issues");
    console.log("3. Create remaining issues using GitHub UI or API");
    console.log("4. Set up GitHub Project board");
    console.log("\nDocumentation: docs/GITHUB_PROJECT_SETUP.md\n");
    
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    if (error.status === 401) {
      console.error("\nAuthentication failed. Please check your GITHUB_TOKEN.");
    } else if (error.status === 404) {
      console.error(`\nRepository not found. Please check OWNER and REPO values.`);
      console.error(`Current: ${OWNER}/${REPO}`);
    }
    process.exit(1);
  }
}

// Run the script
main();
