# 🗓️ GitHub Project Implementation Plan

# Jones Family Hub - Implementation Plan

**Developer Availability:** 16 hours/week (solo developer)

**Estimated Total Duration:** 22-26 weeks (~5.5-6.5 months)

**Project Start:** Week of January 27, 2026

<aside>
🎨

**Design Integration:** This plan incorporates the complete UI/UX Design Specifications including light/dark theme support, brand identity implementation, and accessibility requirements.

</aside>

---

## Project Timeline Overview

| Milestone | Duration | Hours | Target Completion |
| --- | --- | --- | --- |
| M0: Design System Foundation | 2 weeks | 32h | Week 2 |
| M1: Project Setup & Infrastructure | 2 weeks | 32h | Week 4 |
| M2: Authentication & User Management | 3 weeks | 48h | Week 7 |
| M3: Core Pages & Navigation | 2 weeks | 32h | Week 9 |
| M4: Family Directory (Protected) | 3 weeks | 48h | Week 12 |
| M5: Achievements System | 3 weeks | 48h | Week 15 |
| M6: Gallery & Media Management | 3 weeks | 48h | Week 18 |
| M7: Reunion RSVP | 2 weeks | 32h | Week 20 |
| M8: Payments Integration | 2 weeks | 32h | Week 22 |
| M9: Birthday Feature | 2 weeks | 32h | Week 24 |
| M10: Testing & Launch Preparation | 2 weeks | 32h | Week 26 |
| M11: Deployment & Post-Launch | 1 week | 16h | Week 27 |

**Total Estimated Hours:** 432 hours

**Estimated Completion:** Early August 2026

---

## Milestone 0: Design System Foundation

**Duration:** 2 weeks | **Hours:** 32h | **Target:** Week 2 (Feb 10, 2026)

<aside>
🎨

**Design Focus:** This milestone implements the complete design system including brand colors, typography, UI components, and light/dark theme support before building features.

</aside>

### Issue #0.1: Logo Asset Preparation

**Priority:** `P0 - Critical` | **Label:** `design` `branding` | **Estimate:** 4h

**Description:**

Prepare all logo variations from existing Jones Family logo for web use.

**Tasks:**

- [ ]  Convert existing logo PNG to SVG format
- [ ]  Create white/inverted version for dark theme
- [ ]  Extract central shield for simplified logo version
- [ ]  Create favicon in multiple sizes (32×32, 16×16)
- [ ]  Create JF monogram icon mark
- [ ]  Create Apple Touch Icon (180×180)
- [ ]  Optimize all files for web
- [ ]  Document logo usage guidelines

**Acceptance Criteria:**

- All logo variations created
- Files optimized for web
- Both light and dark theme versions ready
- Icon files in correct formats

**Reference:** [🎨 UI/UX Design Specifications & Brand Kit](https://www.notion.so/UI-UX-Design-Specifications-Brand-Kit-79d74b0c44704a00bdb883fd50c2377d?pvs=21)

---

### Issue #0.2: Tailwind Configuration with Design Tokens

**Priority:** `P0 - Critical` | **Label:** `design` `frontend` | **Estimate:** 5h

**Description:**

Configure Tailwind CSS with complete design system including light/dark theme support.

**Tasks:**

- [ ]  Install and configure Tailwind CSS 4.x
- [ ]  Set up dark mode with class strategy
- [ ]  Configure heritage brand colors (green, gold, burgundy)
- [ ]  Configure secondary colors (sage, cream, terracotta)
- [ ]  Configure dark theme color palette
- [ ]  Add semantic colors (success, warning, error, info)
- [ ]  Configure typography (Playfair Display, Inter, Fira Code)
- [ ]  Set up spacing scale and border radius tokens
- [ ]  Configure box shadows for both themes
- [ ]  Add custom breakpoints

**Acceptance Criteria:**

- Tailwind configured with all design tokens
- Both light and dark themes working
- All brand colors available as utilities
- Typography system implemented

**Reference:** [🎨 UI/UX Design Specifications & Brand Kit](https://www.notion.so/UI-UX-Design-Specifications-Brand-Kit-79d74b0c44704a00bdb883fd50c2377d?pvs=21)

---

### Issue #0.3: CSS Variables & Theme System

**Priority:** `P0 - Critical` | **Label:** `design` `frontend` | **Estimate:** 4h

**Dependencies:** Issue #0.2

**Description:**

Implement CSS variables and theme switching system.

**Tasks:**

- [ ]  Create globals.css with CSS variables
- [ ]  Define light theme variables
- [ ]  Define dark theme variables (.dark class)
- [ ]  Add smooth theme transition animations (200ms)
- [ ]  Create theme provider component (React Context)
- [ ]  Implement system preference detection
- [ ]  Add localStorage persistence for theme preference
- [ ]  Test theme switching

**Acceptance Criteria:**

- CSS variables defined for both themes
- Theme provider working
- System preference respected
- User preference persists across sessions

**Reference:** [🎨 UI/UX Design Specifications & Brand Kit](https://www.notion.so/UI-UX-Design-Specifications-Brand-Kit-79d74b0c44704a00bdb883fd50c2377d?pvs=21)

---

### Issue #0.4: Typography System Implementation

**Priority:** `P0 - Critical` | **Label:** `design` `frontend` | **Estimate:** 3h

**Dependencies:** Issue #0.2

**Description:**

Set up Google Fonts and typography system.

**Tasks:**

- [ ]  Load Playfair Display (400, 600, 700) from Google Fonts
- [ ]  Load Inter (400, 500, 600, 700) from Google Fonts
- [ ]  Load Fira Code (400) from Google Fonts
- [ ]  Configure font-display: swap for performance
- [ ]  Create typography utility classes
- [ ]  Implement responsive type scale
- [ ]  Test font loading and fallbacks

**Acceptance Criteria:**

- All fonts loading correctly
- Typography scale working
- Responsive sizing working
- Fallback fonts appropriate

**Reference:** [🎨 UI/UX Design Specifications & Brand Kit](https://www.notion.so/UI-UX-Design-Specifications-Brand-Kit-79d74b0c44704a00bdb883fd50c2377d?pvs=21)

---

### Issue #0.5: Core UI Component Library

**Priority:** `P0 - Critical` | **Label:** `design` `frontend` | **Estimate:** 8h

**Dependencies:** Issue #0.2, #0.3, #0.4

**Description:**

Build reusable UI component library with theme support.

**Tasks:**

- [ ]  Create Button component (primary, secondary, tertiary, destructive)
- [ ]  Create Input component with validation states
- [ ]  Create Textarea component
- [ ]  Create Select component
- [ ]  Create Checkbox and Radio components
- [ ]  Create Card component (standard, feature)
- [ ]  Create Modal component
- [ ]  Create Alert component (success, warning, error, info)
- [ ]  Implement all components for both light/dark themes
- [ ]  Add proper ARIA labels and keyboard navigation
- [ ]  Create Storybook documentation (optional)

**Acceptance Criteria:**

- All core components created
- Components work in both themes
- Accessibility guidelines met (WCAG 2.1 AA)
- Components documented

**Reference:** [🎨 UI/UX Design Specifications & Brand Kit](https://www.notion.so/UI-UX-Design-Specifications-Brand-Kit-79d74b0c44704a00bdb883fd50c2377d?pvs=21)

---

### Issue #0.6: Layout Components

**Priority:** `P1 - High` | **Label:** `design` `frontend` | **Estimate:** 4h

**Dependencies:** Issue #0.5

**Description:**

Create layout and container components.

**Tasks:**

- [ ]  Create Container component with max-width
- [ ]  Create responsive Grid component (12-col desktop, 8-col tablet, 4-col mobile)
- [ ]  Create Stack component for vertical spacing
- [ ]  Create Section component with spacing system
- [ ]  Implement responsive breakpoints
- [ ]  Test on multiple screen sizes

**Acceptance Criteria:**

- Layout components working
- Responsive behavior correct
- Spacing system consistent

**Reference:** [🎨 UI/UX Design Specifications & Brand Kit](https://www.notion.so/UI-UX-Design-Specifications-Brand-Kit-79d74b0c44704a00bdb883fd50c2377d?pvs=21)

---

### Issue #0.7: Theme Toggle Component

**Priority:** `P1 - High` | **Label:** `design` `frontend` | **Estimate:** 3h

**Dependencies:** Issue #0.3, #0.5

**Description:**

Create theme toggle button with sun/moon icons.

**Tasks:**

- [ ]  Install Lucide React icons library
- [ ]  Create ThemeToggle component
- [ ]  Add sun icon for light theme
- [ ]  Add moon icon for dark theme
- [ ]  Implement smooth icon transition
- [ ]  Add keyboard shortcut (Ctrl/Cmd + Shift + D)
- [ ]  Add tooltip
- [ ]  Make accessible

**Acceptance Criteria:**

- Theme toggle working
- Icons change appropriately
- Keyboard shortcut working
- Accessible via keyboard and screen reader

**Reference:** [🎨 UI/UX Design Specifications & Brand Kit](https://www.notion.so/UI-UX-Design-Specifications-Brand-Kit-79d74b0c44704a00bdb883fd50c2377d?pvs=21)

---

### Issue #0.8: Iconography System

**Priority:** `P2 - Medium` | **Label:** `design` `frontend` | **Estimate:** 2h

**Dependencies:** Issue #0.2

**Description:**

Set up icon system with Lucide Icons.

**Tasks:**

- [ ]  Install Lucide React icons
- [ ]  Create Icon wrapper component
- [ ]  Define icon sizes (sm: 16px, md: 24px, lg: 32px, xl: 48px)
- [ ]  Set stroke width to 2px
- [ ]  Configure icon colors for themes
- [ ]  Document feature icons from design spec

**Acceptance Criteria:**

- Icon system working
- Icons render in both themes
- Size variants working

**Reference:** [🎨 UI/UX Design Specifications & Brand Kit](https://www.notion.so/UI-UX-Design-Specifications-Brand-Kit-79d74b0c44704a00bdb883fd50c2377d?pvs=21)

---

## Milestone 1: Project Setup & Infrastructure

**Duration:** 2 weeks | **Hours:** 32h | **Target:** Week 4 (Feb 24, 2026)

### Issue #1: Initialize Next.js Project

**Priority:** `P0 - Critical` | **Label:** `setup` | **Estimate:** 4h

**Description:**

Set up the base Next.js 16 project with TypeScript and required configurations.

**Tasks:**

- [ ]  Initialize Next.js 16 project with App Router
- [ ]  Configure TypeScript with strict mode
- [ ]  Set up Tailwind CSS 4.x
- [ ]  Create project folder structure (/app, /components, /lib, /hooks, /actions, /types)
- [ ]  Configure next.config.ts with image domains and security headers
- [ ]  Set up ESLint and Prettier
- [ ]  Initialize Git repository
- [ ]  Create .env.example file

**Acceptance Criteria:**

- Project builds without errors
- TypeScript strict mode enabled
- Tailwind CSS working
- Folder structure matches technical design

---

### Issue #2: Configure Vercel Project & Environment

**Priority:** `P0 - Critical` | **Label:** `infrastructure` | **Estimate:** 3h

**Description:**

Set up Vercel project and connect GitHub repository.

**Tasks:**

- [ ]  Create Vercel project
- [ ]  Connect GitHub repository
- [ ]  Configure automatic deployments
- [ ]  Set up preview deployments for pull requests
- [ ]  Configure custom domain ([jonesfamily1832.com](http://jonesfamily1832.com))
- [ ]  Enable Vercel Analytics

**Acceptance Criteria:**

- Automatic deployments working
- Preview URLs generated for PRs
- Custom domain configured with SSL

---

### Issue #3: Set Up PostgreSQL Database

**Priority:** `P0 - Critical` | **Label:** `database` | **Estimate:** 5h

**Description:**

Provision PostgreSQL database and set up ORM.

**Tasks:**

- [ ]  Provision Vercel Postgres database
- [ ]  Install and configure Prisma ORM
- [ ]  Create initial schema file from technical design
- [ ]  Set up database connection pooling
- [ ]  Configure environment variables for database
- [ ]  Test database connection
- [ ]  Set up database backup strategy

**Acceptance Criteria:**

- Database provisioned and accessible
- Prisma schema created with all tables
- Connection working from local environment

---

### Issue #4: Database Schema Implementation

**Priority:** `P0 - Critical` | **Label:** `database` | **Estimate:** 6h

**Dependencies:** Issue #3

**Description:**

Implement all database tables and relationships from technical design.

**Tasks:**

- [ ]  Create users table schema
- [ ]  Create family_members table schema
- [ ]  Create achievements table with indexes
- [ ]  Create gallery_albums and gallery_media tables
- [ ]  Create reunion_rsvps table
- [ ]  Create payments table
- [ ]  Create birthday_wishes table
- [ ]  Add birthday fields to family_members table
- [ ]  Define all foreign key relationships
- [ ]  Add database indexes for performance
- [ ]  Run initial migration
- [ ]  Create seed data for development

**Acceptance Criteria:**

- All tables created successfully
- Relationships working correctly
- Indexes applied
- Seed data populates successfully

---

### Issue #5: Set Up Redis Cache (Vercel KV)

**Priority:** `P1 - High` | **Label:** `infrastructure` | **Estimate:** 3h

**Description:**

Configure Redis for session management and caching.

**Tasks:**

- [ ]  Provision Vercel KV (Redis)
- [ ]  Install Redis client library
- [ ]  Create cache utility functions
- [ ]  Configure session storage
- [ ]  Test cache read/write operations
- [ ]  Set up cache invalidation patterns

**Acceptance Criteria:**

- Redis instance provisioned
- Cache utilities working
- Session storage tested

---

### Issue #6: Configure Vercel Blob Storage

**Priority:** `P1 - High` | **Label:** `infrastructure` | **Estimate:** 3h

**Description:**

Set up media storage for images and videos.

**Tasks:**

- [ ]  Enable Vercel Blob Storage
- [ ]  Install @vercel/blob package
- [ ]  Create upload utility functions
- [ ]  Configure file size limits (10MB images, 500MB videos)
- [ ]  Set up file type validation
- [ ]  Test file upload/retrieval

**Acceptance Criteria:**

- Blob storage configured
- Upload utilities working
- Size and type restrictions enforced

---

### Issue #7: Set Up CI/CD Pipeline

**Priority:** `P1 - High` | **Label:** `devops` | **Estimate:** 4h

**Description:**

Create GitHub Actions workflow for automated testing and deployment.

**Tasks:**

- [ ]  Create GitHub Actions workflow file
- [ ]  Configure test running (Jest)
- [ ]  Add TypeScript type checking
- [ ]  Add linting step
- [ ]  Configure build verification
- [ ]  Set up deployment notifications
- [ ]  Add branch protection rules

**Acceptance Criteria:**

- CI pipeline runs on every PR
- Tests, type checks, and linting automated
- Failed checks block deployment

---

### Issue #8: Navigation & Footer Components

**Priority:** `P1 - High` | **Label:** `frontend` `design` | **Estimate:** 5h

**Dependencies:** Milestone 0 (Design System)

**Description:**

Create header navigation and footer with theme support.

**Tasks:**

- [ ]  Build Header component with logo
- [ ]  Style for both light and dark themes
- [ ]  Add navigation placeholder (auth links added in M2)
- [ ]  Integrate ThemeToggle component
- [ ]  Build Footer component
- [ ]  Add responsive mobile menu structure
- [ ]  Test across breakpoints

**Acceptance Criteria:**

- Header and footer created
- Both themes styled correctly
- Logo displays properly in each theme
- Mobile responsive

**Reference:** [🎨 UI/UX Design Specifications & Brand Kit](https://www.notion.so/UI-UX-Design-Specifications-Brand-Kit-79d74b0c44704a00bdb883fd50c2377d?pvs=21)

---

## Milestone 2: Authentication & User Management

**Duration:** 3 weeks | **Hours:** 48h | **Target:** Week 7 (Mar 10, 2026)

### Issue #9: Install & Configure Better Auth

**Priority:** `P0 - Critical` | **Label:** `auth` | **Estimate:** 6h

**Dependencies:** Issue #3, #4, #5

**Description:**

Set up Better Auth for authentication system.

**Tasks:**

- [ ]  Install Better Auth package
- [ ]  Configure auth options and providers
- [ ]  Set up email/password authentication
- [ ]  Configure session management with Redis
- [ ]  Set up password hashing (bcrypt, 12 rounds)
- [ ]  Create auth configuration file
- [ ]  Configure HTTP-only cookies
- [ ]  Set up CSRF protection

**Acceptance Criteria:**

- Better Auth configured
- Session management working
- Security measures in place

---

### Issue #10: Build Registration Flow

**Priority:** `P0 - Critical` | **Label:** `auth` `frontend` | **Estimate:** 8h

**Dependencies:** Issue #9

**Description:**

Create user registration pages and API endpoints.

**Tasks:**

- [ ]  Create registration page UI
- [ ]  Build registration form with React Hook Form
- [ ]  Create Zod validation schema for registration
- [ ]  Implement POST /api/auth/register endpoint
- [ ]  Add email uniqueness validation
- [ ]  Create user in database
- [ ]  Send welcome email (optional for MVP)
- [ ]  Add form error handling
- [ ]  Implement rate limiting for registration

**Acceptance Criteria:**

- Users can register with email/password
- Form validation working
- Duplicate email prevented
- User created in database

---

### Issue #11: Build Login Flow

**Priority:** `P0 - Critical` | **Label:** `auth` `frontend` | **Estimate:** 6h

**Dependencies:** Issue #9

**Description:**

Create login pages and authentication flow.

**Tasks:**

- [ ]  Create login page UI
- [ ]  Build login form with validation
- [ ]  Implement POST /api/auth/login endpoint
- [ ]  Validate credentials
- [ ]  Create session token
- [ ]  Store session in Redis
- [ ]  Set HTTP-only cookie
- [ ]  Implement "Remember Me" option
- [ ]  Add rate limiting for login attempts

**Acceptance Criteria:**

- Users can log in successfully
- Session created and stored
- Brute force protection working
- Invalid credentials handled gracefully

---

### Issue #12: Build Password Reset Flow

**Priority:** `P1 - High` | **Label:** `auth` `frontend` | **Estimate:** 6h

**Dependencies:** Issue #9

**Description:**

Implement forgot password and reset password functionality.

**Tasks:**

- [ ]  Create forgot password page
- [ ]  Implement POST /api/auth/forgot-password endpoint
- [ ]  Generate secure reset token
- [ ]  Store token with expiration (1 hour)
- [ ]  Send password reset email
- [ ]  Create reset password page with token validation
- [ ]  Implement POST /api/auth/reset-password endpoint
- [ ]  Update password and invalidate token

**Acceptance Criteria:**

- Users can request password reset
- Reset email sent with secure link
- Password can be reset successfully
- Expired tokens rejected

---

### Issue #13: Implement Auth Middleware

**Priority:** `P0 - Critical` | **Label:** `auth` `backend` | **Estimate:** 6h

**Dependencies:** Issue #9

**Description:**

Create middleware to protect routes and validate sessions.

**Tasks:**

- [ ]  Create auth middleware file
- [ ]  Check session cookie on protected routes
- [ ]  Validate session token in Redis
- [ ]  Implement token refresh logic (< 24h remaining)
- [ ]  Redirect to login if unauthorized
- [ ]  Add role-based access control (RBAC)
- [ ]  Protect /api routes requiring authentication
- [ ]  Create getSession utility function

**Acceptance Criteria:**

- Protected routes require authentication
- Unauthenticated users redirected to login
- Sessions refresh automatically
- RBAC working for admin routes

---

### Issue #14: Build User Dashboard

**Priority:** `P1 - High` | **Label:** `frontend` | **Estimate:** 6h

**Dependencies:** Issue #13

**Description:**

Create basic user dashboard/profile page.

**Tasks:**

- [ ]  Create dashboard route (/dashboard)
- [ ]  Build dashboard layout
- [ ]  Display user profile information
- [ ]  Add logout functionality
- [ ]  Show quick links to key features
- [ ]  Create profile settings page
- [ ]  Allow users to update email and password
- [ ]  Add profile photo upload

**Acceptance Criteria:**

- Dashboard accessible after login
- User information displayed
- Logout working correctly
- Profile updates functional

---

### Issue #15: Logout & Session Management

**Priority:** `P1 - High` | **Label:** `auth` | **Estimate:** 3h

**Dependencies:** Issue #9

**Description:**

Implement logout functionality and session cleanup.

**Tasks:**

- [ ]  Create POST /api/auth/logout endpoint
- [ ]  Delete session from Redis
- [ ]  Clear HTTP-only cookie
- [ ]  Redirect to homepage
- [ ]  Add logout button to navigation
- [ ]  Implement session timeout (7 days)
- [ ]  Test session cleanup

**Acceptance Criteria:**

- Users can logout successfully
- Session cleaned from Redis
- Cookie cleared from browser

---

### Issue #16: Auth Testing Suite

**Priority:** `P1 - High` | **Label:** `testing` | **Estimate:** 7h

**Dependencies:** Issues #10-15

**Description:**

Create comprehensive tests for authentication system.

**Tasks:**

- [ ]  Write unit tests for registration
- [ ]  Write unit tests for login
- [ ]  Write unit tests for password reset
- [ ]  Write integration tests for auth flow
- [ ]  Test middleware protection
- [ ]  Test session management
- [ ]  Test rate limiting
- [ ]  Test RBAC

**Acceptance Criteria:**

- All auth flows tested
- Test coverage > 80%
- Edge cases handled

---

## Milestone 3: Core Pages & Navigation

**Duration:** 2 weeks | **Hours:** 32h | **Target:** Week 9 (Mar 24, 2026)

### Issue #17: Enhanced Navigation with Auth State

**Priority:** `P0 - Critical` | **Label:** `frontend` | **Estimate:** 4h

**Dependencies:** Issue #13, #0.5

**Description:**

Enhance navigation with authentication state and user menu.

**Tasks:**

- [ ]  Add authentication-based link visibility
- [ ]  Create user menu dropdown component
- [ ]  Add user profile photo to nav
- [ ]  Implement mobile menu with slide-in animation
- [ ]  Add active link highlighting with theme colors
- [ ]  Test responsive behavior
- [ ]  Ensure keyboard navigation works

**Acceptance Criteria:**

- Auth state controls navigation links
- User menu working
- Mobile menu functional with animations
- Accessible via keyboard

**Reference:** [🎨 UI/UX Design Specifications & Brand Kit](https://www.notion.so/UI-UX-Design-Specifications-Brand-Kit-79d74b0c44704a00bdb883fd50c2377d?pvs=21)

---

### Issue #18: Build Homepage with Brand Identity

**Priority:** `P0 - Critical` | **Label:** `frontend` `design` | **Estimate:** 10h

**Dependencies:** Issue #17, Milestone 0

**Description:**

Create homepage implementing complete brand identity and design system.

**Tasks:**

- [ ]  Build hero section with family logo and mission statement
- [ ]  Implement brand color scheme (Heritage Green, Legacy Gold)
- [ ]  Add family values section (Heritage, Unity, Growth, Trust)
- [ ]  Implement reunion countdown timer with date-fns
- [ ]  Create CTA button section with primary/secondary button styles
- [ ]  Display latest 3 achievements with card components
- [ ]  **Add upcoming birthdays widget (today + next 7 days)**
- [ ]  Add feature cards for key sections (Directory, Gallery, etc.)
- [ ]  Optimize family logo with Next.js Image component
- [ ]  Add smooth scroll animations
- [ ]  Ensure both light/dark themes look great
- [ ]  Test responsive layout on all breakpoints

**Acceptance Criteria:**

- Homepage loads in < 2.5s
- Brand identity clearly presented
- Both themes styled beautifully
- Countdown timer working
- Latest achievements displayed
- Fully responsive and accessible

**Reference:** [🎨 UI/UX Design Specifications & Brand Kit](https://www.notion.so/UI-UX-Design-Specifications-Brand-Kit-79d74b0c44704a00bdb883fd50c2377d?pvs=21)

---

### Issue #19: Build Family History Page

**Priority:** `P1 - High` | **Label:** `frontend` `content` | **Estimate:** 6h

**Description:**

Create family history/our story page.

**Tasks:**

- [ ]  Create /history route
- [ ]  Build page layout
- [ ]  Add chronological content structure
- [ ]  Implement timeline visualization (optional)
- [ ]  Add historical images
- [ ]  Make content editable via CMS or markdown
- [ ]  Add responsive design
- [ ]  Optimize for performance

**Acceptance Criteria:**

- History page accessible
- Content well-structured
- Images optimized
- Mobile-friendly

---

### Issue #20: Build Contact Form

**Priority:** `P1 - High` | **Label:** `frontend` `backend` | **Estimate:** 5h

**Description:**

Create contact form with email submission.

**Tasks:**

- [ ]  Create /contact route
- [ ]  Build contact form UI
- [ ]  Add form validation with Zod
- [ ]  Create inquiry type dropdown
- [ ]  Implement POST /api/contact endpoint
- [ ]  Set up email service (Resend)
- [ ]  Send email to committee
- [ ]  Add success/error notifications
- [ ]  Implement rate limiting

**Acceptance Criteria:**

- Contact form working
- Emails sent successfully
- Form validation working
- Rate limiting in place

---

### Issue #21: Build Footer Component

**Priority:** `P2 - Medium` | **Label:** `frontend` | **Estimate:** 3h

**Description:**

Create site footer with links and information.

**Tasks:**

- [ ]  Build footer component
- [ ]  Add quick links
- [ ]  Add social media links
- [ ]  Add copyright information
- [ ]  Add contact information
- [ ]  Make responsive
- [ ]  Match site design system

**Acceptance Criteria:**

- Footer appears on all pages
- Links working correctly
- Mobile-friendly

---

### Issue #22: SEO & Meta Tags Setup

**Priority:** `P2 - Medium` | **Label:** `seo` | **Estimate:** 3h

**Description:**

Optimize site for search engines.

**Tasks:**

- [ ]  Add metadata to all pages
- [ ]  Create sitemap.xml
- [ ]  Create robots.txt
- [ ]  Add Open Graph tags
- [ ]  Add Twitter Card tags
- [ ]  Optimize page titles and descriptions
- [ ]  Add structured data (JSON-LD)
- [ ]  Test with Google Search Console

**Acceptance Criteria:**

- All pages have proper meta tags
- Sitemap generated
- SEO best practices followed

---

### Issue #23: Accessibility Audit & Compliance

**Priority:** `P1 - High` | **Label:** `accessibility` `design` | **Estimate:** 4h

**Dependencies:** Milestone 0

**Description:**

Ensure WCAG 2.1 AA compliance per design specifications.

**Tasks:**

- [ ]  Run axe-core accessibility tests
- [ ]  Verify all color contrast ratios meet 4.5:1 (text) and 3:1 (UI components)
- [ ]  Test contrast in both light and dark themes
- [ ]  Add proper ARIA labels to all interactive components
- [ ]  Ensure keyboard navigation with visible focus indicators (2px outline)
- [ ]  Test with screen reader (NVDA/JAWS)
- [ ]  Verify semantic HTML structure
- [ ]  Add alt text to all meaningful images including logo
- [ ]  Test with prefers-reduced-motion
- [ ]  Ensure minimum touch targets of 44px × 44px

**Acceptance Criteria:**

- WCAG 2.1 AA compliant in both themes
- All approved color combinations from design spec tested
- No critical accessibility issues
- Keyboard navigation working perfectly
- Screen reader friendly

**Reference:** [🎨 UI/UX Design Specifications & Brand Kit](https://www.notion.so/UI-UX-Design-Specifications-Brand-Kit-79d74b0c44704a00bdb883fd50c2377d?pvs=21)

---

## Milestone 4: Family Directory (Protected)

**Duration:** 3 weeks | **Hours:** 48h | **Target:** Week 12 (Apr 14, 2026)

### Issue #24: Database Setup for Family Members

**Priority:** `P0 - Critical` | **Label:** `database` `backend` | **Estimate:** 3h

**Dependencies:** Issue #4

**Description:**

Create database queries and actions for family members.

**Tasks:**

- [ ]  Create Prisma queries for family_members table
- [ ]  Build server action to fetch all visible members
- [ ]  Build server action to fetch single member
- [ ]  Build server action to update member profile
- [ ]  Build server action for search functionality
- [ ]  Implement pagination for large datasets
- [ ]  Add caching for directory listing

**Acceptance Criteria:**

- All CRUD operations working
- Pagination implemented
- Search functionality working

---

### Issue #25: Build Directory Listing Page

**Priority:** `P0 - Critical` | **Label:** `frontend` | **Estimate:** 8h

**Dependencies:** Issue #24, #13

**Description:**

Create protected directory page with member listing.

**Tasks:**

- [ ]  Create /directory route (protected)
- [ ]  Build grid/list layout for members
- [ ]  Display member cards (photo, name, branch, city)
- [ ]  Implement search functionality
- [ ]  Add filters (branch, location)
- [ ]  Show only visible members (is_visible=true)
- [ ]  Implement pagination
- [ ]  Make responsive

**Acceptance Criteria:**

- Directory requires authentication
- Members displayed in grid
- Search and filters working
- Pagination functional

---

### Issue #26: Build Member Profile Page

**Priority:** `P1 - High` | **Label:** `frontend` | **Estimate:** 6h

**Dependencies:** Issue #24

**Description:**

Create detailed member profile view.

**Tasks:**

- [ ]  Create /directory/[id] route
- [ ]  Build profile layout
- [ ]  Display all member information
- [ ]  Show profile photo
- [ ]  Display bio and family information
- [ ]  Add contact information (if visible)
- [ ]  Make responsive
- [ ]  Add back to directory link

**Acceptance Criteria:**

- Profile page accessible from directory
- All information displayed correctly
- Mobile-friendly

---

### Issue #27: Build Profile Editing Feature

**Priority:** `P1 - High` | **Label:** `frontend` `backend` | **Estimate:** 8h

**Dependencies:** Issue #24, #26

**Description:**

Allow users to edit their own family member profile.

**Tasks:**

- [ ]  Create profile edit form
- [ ]  Pre-populate form with existing data
- [ ]  Add form validation with Zod
- [ ]  Implement PATCH /api/directory/[id] endpoint
- [ ]  Verify user can only edit own profile
- [ ]  Add profile photo upload
- [ ]  Handle form submission and errors
- [ ]  Show success notification

**Acceptance Criteria:**

- Users can edit own profile
- Cannot edit other profiles
- Photo upload working
- Changes saved to database

---

### Issue #28: CSV Import Feature (Admin)

**Priority:** `P1 - High` | **Label:** `backend` `admin` | **Estimate:** 8h

**Dependencies:** Issue #24

**Description:**

Create admin tool to bulk import family members from CSV.

**Tasks:**

- [ ]  Create admin CSV upload page
- [ ]  Parse CSV file
- [ ]  Validate CSV data
- [ ]  Map CSV columns to database fields
- [ ]  Handle duplicate entries
- [ ]  Create users and family_members records
- [ ]  Generate temporary passwords
- [ ]  Send welcome emails
- [ ]  Show import report

**Acceptance Criteria:**

- Admin can upload CSV
- Data validated and imported
- Users created successfully
- Error handling for bad data

---

### Issue #29: CSV Export Feature (Admin)

**Priority:** `P2 - Medium` | **Label:** `backend` `admin` | **Estimate:** 4h

**Dependencies:** Issue #24

**Description:**

Allow admin to export directory to CSV.

**Tasks:**

- [ ]  Create export button on directory page
- [ ]  Implement GET /api/directory/export endpoint
- [ ]  Fetch all family members
- [ ]  Format data as CSV
- [ ]  Generate downloadable file
- [ ]  Include all relevant fields
- [ ]  Add export to audit log

**Acceptance Criteria:**

- Admin can export directory
- CSV contains all member data
- File downloads successfully

---

### Issue #30: Directory API Endpoints

**Priority:** `P0 - Critical` | **Label:** `backend` | **Estimate:** 5h

**Dependencies:** Issue #24

**Description:**

Implement all directory-related API endpoints.

**Tasks:**

- [ ]  Implement GET /api/directory (list all)
- [ ]  Implement GET /api/directory/[id] (single member)
- [ ]  Implement PATCH /api/directory/[id] (update)
- [ ]  Implement GET /api/directory/search (search)
- [ ]  Add authentication checks
- [ ]  Add authorization checks (own profile only)
- [ ]  Implement rate limiting
- [ ]  Add request validation

**Acceptance Criteria:**

- All endpoints working
- Authentication enforced
- Authorization checks in place

---

### Issue #31: Directory Testing Suite

**Priority:** `P1 - High` | **Label:** `testing` | **Estimate:** 6h

**Dependencies:** Issues #24-30

**Description:**

Create tests for directory feature.

**Tasks:**

- [ ]  Write unit tests for directory queries
- [ ]  Write integration tests for directory API
- [ ]  Test authorization (can only edit own profile)
- [ ]  Test search functionality
- [ ]  Test CSV import/export
- [ ]  Test pagination
- [ ]  Write E2E tests for directory flow

**Acceptance Criteria:**

- All directory features tested
- Test coverage > 80%
- Authorization tests passing

---

## Milestone 5: Achievements System

**Duration:** 3 weeks | **Hours:** 48h | **Target:** Week 15 (May 5, 2026)

### Issue #32: Build Achievements Submission Form

**Priority:** `P0 - Critical` | **Label:** `frontend` | **Estimate:** 6h

**Dependencies:** Issue #13

**Description:**

Create form for family members to submit achievements.

**Tasks:**

- [ ]  Create /achievements/submit route (protected)
- [ ]  Build submission form
- [ ]  Add category dropdown (Baby, Graduation, Wedding, etc.)
- [ ]  Add date picker for achievement date
- [ ]  Add description textarea
- [ ]  Add photo upload
- [ ]  Create Zod validation schema
- [ ]  Handle form submission

**Acceptance Criteria:**

- Form accessible to authenticated users
- All fields validate correctly
- Photo upload working
- Submission creates pending achievement

---

### Issue #33: Achievements API Endpoints

**Priority:** `P0 - Critical` | **Label:** `backend` | **Estimate:** 6h

**Dependencies:** Issue #4

**Description:**

Implement all achievements-related API endpoints.

**Tasks:**

- [ ]  Implement GET /api/achievements (public, approved only)
- [ ]  Implement GET /api/achievements?status=pending (admin)
- [ ]  Implement POST /api/achievements (submit)
- [ ]  Implement PATCH /api/achievements/[id] (admin update)
- [ ]  Implement DELETE /api/achievements/[id] (admin)
- [ ]  Implement POST /api/achievements/[id]/approve (admin)
- [ ]  Add filtering by category and year
- [ ]  Add authentication and authorization

**Acceptance Criteria:**

- All endpoints functional
- Public can view approved achievements
- Only admins can approve/delete

---

### Issue #34: Build Achievements Display Page

**Priority:** `P0 - Critical` | **Label:** `frontend` | **Estimate:** 8h

**Dependencies:** Issue #33

**Description:**

Create public page displaying approved achievements.

**Tasks:**

- [ ]  Create /achievements route (public)
- [ ]  Build grid layout for achievement cards
- [ ]  Display photo, title, category, date, description
- [ ]  Add category filter
- [ ]  Add year filter
- [ ]  Add sorting (recent, alphabetical)
- [ ]  Implement pagination
- [ ]  Make responsive

**Acceptance Criteria:**

- Achievements displayed publicly
- Filters and sorting working
- Only approved achievements shown
- Mobile-friendly

---

### Issue #35: Build Admin Approval Interface

**Priority:** `P0 - Critical` | **Label:** `frontend` `admin` | **Estimate:** 8h

**Dependencies:** Issue #33

**Description:**

Create admin panel for reviewing and approving achievements.

**Tasks:**

- [ ]  Create /admin/achievements route (admin only)
- [ ]  Display pending achievements
- [ ]  Show achievement details and photo
- [ ]  Add approve button
- [ ]  Add reject/delete button
- [ ]  Add edit functionality
- [ ]  Show approval history
- [ ]  Add bulk actions

**Acceptance Criteria:**

- Admin can view pending achievements
- Approve/reject functional
- Only accessible to admins

---

### Issue #36: Achievements Timeline View

**Priority:** `P2 - Medium` | **Label:** `frontend` | **Estimate:** 6h

**Dependencies:** Issue #34

**Description:**

Create alternative timeline view for achievements.

**Tasks:**

- [ ]  Design timeline layout
- [ ]  Build timeline component
- [ ]  Group achievements by year
- [ ]  Add chronological ordering
- [ ]  Make interactive (expand/collapse)
- [ ]  Add toggle between grid and timeline views
- [ ]  Make responsive

**Acceptance Criteria:**

- Timeline view working
- Toggle between views functional
- Mobile-friendly

---

### Issue #37: Email Notifications for Achievements

**Priority:** `P2 - Medium` | **Label:** `backend` | **Estimate:** 4h

**Dependencies:** Issue #33

**Description:**

Send email notifications for achievement status changes.

**Tasks:**

- [ ]  Create email template for submission confirmation
- [ ]  Create email template for approval notification
- [ ]  Send email when achievement submitted
- [ ]  Send email when achievement approved
- [ ]  Send email when achievement rejected
- [ ]  Add email preferences (optional)

**Acceptance Criteria:**

- Emails sent on submission and approval
- Templates professional and branded

---

### Issue #38: Integrate Achievements on Homepage

**Priority:** `P1 - High` | **Label:** `frontend` | **Estimate:** 3h

**Dependencies:** Issue #33, #18

**Description:**

Display latest 3 achievements on homepage.

**Tasks:**

- [ ]  Fetch latest 3 approved achievements
- [ ]  Create achievement preview cards
- [ ]  Add to homepage below hero section
- [ ]  Link to full achievements page
- [ ]  Add "View All" CTA
- [ ]  Make responsive

**Acceptance Criteria:**

- Latest 3 achievements shown on homepage
- Links to achievements page working
- Updates automatically

---

### Issue #39: Achievements Testing Suite

**Priority:** `P1 - High` | **Label:** `testing` | **Estimate:** 7h

**Dependencies:** Issues #32-38

**Description:**

Create comprehensive tests for achievements system.

**Tasks:**

- [ ]  Write unit tests for achievement queries
- [ ]  Write integration tests for API endpoints
- [ ]  Test submission flow
- [ ]  Test approval flow
- [ ]  Test filtering and sorting
- [ ]  Test admin authorization
- [ ]  Write E2E tests for full workflow

**Acceptance Criteria:**

- All features tested
- Test coverage > 80%
- Approval workflow tested

---

## Milestone 6: Gallery & Media Management

**Duration:** 3 weeks | **Hours:** 48h | **Target:** Week 18 (May 26, 2026)

### Issue #40: Gallery Albums Database & API

**Priority:** `P0 - Critical` | **Label:** `backend` | **Estimate:** 5h

**Dependencies:** Issue #4, #6

**Description:**

Implement album and media management APIs.

**Tasks:**

- [ ]  Implement GET /api/gallery/albums (list all)
- [ ]  Implement GET /api/gallery/albums/[id] (single album with media)
- [ ]  Implement POST /api/gallery/albums (create, admin)
- [ ]  Implement PATCH /api/gallery/albums/[id] (update, admin)
- [ ]  Implement DELETE /api/gallery/albums/[id] (delete, admin)
- [ ]  Add filtering by year and category
- [ ]  Add authorization checks

**Acceptance Criteria:**

- All album endpoints working
- Only admins can create/edit/delete
- Public can view albums

---

### Issue #41: Media Upload API

**Priority:** `P0 - Critical` | **Label:** `backend` | **Estimate:** 8h

**Dependencies:** Issue #6, #40

**Description:**

Implement media upload functionality.

**Tasks:**

- [ ]  Implement POST /api/gallery/upload endpoint
- [ ]  Handle file upload to Vercel Blob
- [ ]  Validate file types (images, videos)
- [ ]  Enforce size limits (10MB images, 500MB videos)
- [ ]  Generate thumbnails for images
- [ ]  Extract image dimensions
- [ ]  Store media metadata in database
- [ ]  Support bulk uploads
- [ ]  Add progress tracking

**Acceptance Criteria:**

- File upload working
- Size limits enforced
- Metadata stored correctly
- Bulk upload supported

---

### Issue #42: Build Gallery Landing Page

**Priority:** `P0 - Critical` | **Label:** `frontend` | **Estimate:** 6h

**Dependencies:** Issue #40

**Description:**

Create main gallery page showing all albums.

**Tasks:**

- [ ]  Create /gallery route
- [ ]  Build album grid layout
- [ ]  Display album cover photos
- [ ]  Show album title, year, photo count
- [ ]  Add filters (year, category)
- [ ]  Make responsive
- [ ]  Optimize image loading

**Acceptance Criteria:**

- Gallery page displays all albums
- Filters working
- Mobile-friendly
- Images optimized

---

### Issue #43: Build Album Detail Page with Lightbox

**Priority:** `P0 - Critical` | **Label:** `frontend` | **Estimate:** 10h

**Dependencies:** Issue #40, #41

**Description:**

Create album page with lightbox viewer.

**Tasks:**

- [ ]  Create /gallery/[id] route
- [ ]  Build photo grid layout
- [ ]  Integrate yet-another-react-lightbox
- [ ]  Add lightbox navigation (prev/next)
- [ ]  Support video playback in lightbox
- [ ]  Add download button
- [ ]  Add captions display
- [ ]  Implement lazy loading
- [ ]  Add slideshow mode (optional)
- [ ]  Make responsive

**Acceptance Criteria:**

- Album displays all photos/videos
- Lightbox working smoothly
- Download enabled
- Responsive on mobile

---

### Issue #44: Admin Album Management Interface

**Priority:** `P1 - High` | **Label:** `frontend` `admin` | **Estimate:** 8h

**Dependencies:** Issue #40, #41

**Description:**

Create admin interface for managing albums.

**Tasks:**

- [ ]  Create /admin/gallery route
- [ ]  Build album creation form
- [ ]  Build album edit form
- [ ]  Add bulk photo upload interface
- [ ]  Show upload progress
- [ ]  Allow setting cover photo
- [ ]  Add photo deletion
- [ ]  Add photo reordering
- [ ]  Show album statistics

**Acceptance Criteria:**

- Admin can create/edit albums
- Bulk upload working
- Cover photo can be set
- Photos can be reordered

---

### Issue #45: Media Deletion API

**Priority:** `P1 - High` | **Label:** `backend` | **Estimate:** 4h

**Dependencies:** Issue #40, #41

**Description:**

Implement media deletion with cleanup.

**Tasks:**

- [ ]  Implement DELETE /api/gallery/media/[id] endpoint
- [ ]  Delete file from Vercel Blob
- [ ]  Delete database record
- [ ]  Update album cover if deleted photo was cover
- [ ]  Add authorization check (admin only)
- [ ]  Add confirmation step

**Acceptance Criteria:**

- Admin can delete photos/videos
- Files removed from storage
- Database cleaned up

---

### Issue #46: Gallery Performance Optimization

**Priority:** `P1 - High` | **Label:** `performance` | **Estimate:** 5h

**Dependencies:** Issues #42-45

**Description:**

Optimize gallery for performance.

**Tasks:**

- [ ]  Implement image lazy loading
- [ ]  Add blur placeholders
- [ ]  Optimize thumbnail generation
- [ ]  Implement pagination for large albums
- [ ]  Add caching for album listings
- [ ]  Optimize Vercel Blob CDN settings
- [ ]  Test load times
- [ ]  Add loading skeletons

**Acceptance Criteria:**

- Gallery loads quickly
- Images lazy load
- Pagination working for large albums

---

### Issue #47: Gallery Testing Suite

**Priority:** `P1 - High` | **Label:** `testing` | **Estimate:** 6h

**Dependencies:** Issues #40-46

**Description:**

Create tests for gallery system.

**Tasks:**

- [ ]  Write unit tests for gallery queries
- [ ]  Write integration tests for upload API
- [ ]  Test file validation and size limits
- [ ]  Test album CRUD operations
- [ ]  Test admin authorization
- [ ]  Write E2E tests for viewing gallery
- [ ]  Test lightbox functionality

**Acceptance Criteria:**

- All gallery features tested
- Upload validation tested
- Test coverage > 80%

---

## Milestone 7: Reunion RSVP

**Duration:** 2 weeks | **Hours:** 32h | **Target:** Week 20 (June 9, 2026)

### Issue #48: Reunion Content Management

**Priority:** `P0 - Critical` | **Label:** `frontend` `content` | **Estimate:** 6h

**Description:**

Create reunion 2027 information page.

**Tasks:**

- [ ]  Create /reunion route
- [ ]  Build page layout
- [ ]  Add event overview section
- [ ]  Add dates, location, theme
- [ ]  Add travel and lodging info
- [ ]  Add daily itinerary
- [ ]  Add policies section
- [ ]  Make content editable (CMS or markdown)
- [ ]  Make responsive

**Acceptance Criteria:**

- Reunion page displays all information
- Content well-organized
- Mobile-friendly

---

### Issue #49: RSVP Form & API

**Priority:** `P0 - Critical` | **Label:** `frontend` `backend` | **Estimate:** 8h

**Dependencies:** Issue #13, #48

**Description:**

Create RSVP form and submission system.

**Tasks:**

- [ ]  Build RSVP form on reunion page
- [ ]  Add attending yes/no radio buttons
- [ ]  Add adult count input
- [ ]  Add children count input
- [ ]  Add dietary restrictions textarea
- [ ]  Add lodging needed checkbox
- [ ]  Add special requests textarea
- [ ]  Create Zod validation schema
- [ ]  Implement POST /api/reunion/[year]/rsvp endpoint
- [ ]  Handle create and update (upsert)

**Acceptance Criteria:**

- Form accessible to authenticated users
- Users can submit RSVP
- Users can update existing RSVP
- Data stored correctly

---

### Issue #50: RSVP Status Display

**Priority:** `P1 - High` | **Label:** `frontend` | **Estimate:** 4h

**Dependencies:** Issue #49

**Description:**

Show user's existing RSVP and attendance count.

**Tasks:**

- [ ]  Fetch user's existing RSVP
- [ ]  Pre-populate form if RSVP exists
- [ ]  Show confirmation message after submission
- [ ]  Display total attendance count (public)
- [ ]  Add "Edit RSVP" functionality
- [ ]  Show RSVP deadline

**Acceptance Criteria:**

- Users see existing RSVP
- Form pre-populated correctly
- Attendance count displayed

---

### Issue #51: Admin RSVP Management

**Priority:** `P1 - High` | **Label:** `frontend` `admin` | **Estimate:** 6h

**Dependencies:** Issue #49

**Description:**

Create admin interface for viewing all RSVPs.

**Tasks:**

- [ ]  Create /admin/reunion/rsvps route
- [ ]  Display all RSVPs in table format
- [ ]  Show name, attending status, counts, special requests
- [ ]  Add filtering (attending yes/no, lodging needed)
- [ ]  Add sorting
- [ ]  Show summary statistics
- [ ]  Add export to CSV functionality

**Acceptance Criteria:**

- Admin can view all RSVPs
- Filters and sorting working
- Export to CSV functional

---

### Issue #52: RSVP Email Notifications

**Priority:** `P2 - Medium` | **Label:** `backend` | **Estimate:** 3h

**Dependencies:** Issue #49

**Description:**

Send email confirmations for RSVPs.

**Tasks:**

- [ ]  Create RSVP confirmation email template
- [ ]  Send email when RSVP submitted
- [ ]  Send email when RSVP updated
- [ ]  Include reunion details in email
- [ ]  Add to admin notification list

**Acceptance Criteria:**

- Confirmation emails sent
- Template includes all details
- Admin notified of new RSVPs

---

### Issue #53: Reunion Countdown Timer

**Priority:** `P2 - Medium` | **Label:** `frontend` | **Estimate:** 3h

**Dependencies:** Issue #18, #48

**Description:**

Add countdown timer to homepage and reunion page.

**Tasks:**

- [ ]  Create countdown component using date-fns
- [ ]  Calculate days/hours/minutes to reunion
- [ ]  Add to homepage hero section
- [ ]  Add to reunion page header
- [ ]  Update in real-time
- [ ]  Make responsive

**Acceptance Criteria:**

- Countdown displays correctly
- Updates automatically
- Visible on homepage and reunion page

---

### Issue #54: RSVP Testing Suite

**Priority:** `P1 - High` | **Label:** `testing` | **Estimate:** 5h

**Dependencies:** Issues #48-53

**Description:**

Create tests for RSVP system.

**Tasks:**

- [ ]  Write unit tests for RSVP queries
- [ ]  Write integration tests for RSVP API
- [ ]  Test form validation
- [ ]  Test upsert logic (create vs update)
- [ ]  Test admin authorization
- [ ]  Write E2E tests for RSVP flow

**Acceptance Criteria:**

- All RSVP features tested
- Test coverage > 80%
- Edge cases handled

---

## Milestone 8: Payments Integration

**Duration:** 2 weeks | **Hours:** 32h | **Target:** Week 22 (June 23, 2026)

### Issue #55: Stripe Account Setup

**Priority:** `P0 - Critical` | **Label:** `payments` `infrastructure` | **Estimate:** 3h

**Description:**

Set up Stripe account and integration.

**Tasks:**

- [ ]  Create Stripe account
- [ ]  Configure business information
- [ ]  Set up test mode
- [ ]  Install Stripe SDK
- [ ]  Configure API keys in environment
- [ ]  Set up webhook endpoints
- [ ]  Test connection

**Acceptance Criteria:**

- Stripe account created
- API keys configured
- Connection working in test mode

---

### Issue #56: Payment Products & Pricing

**Priority:** `P0 - Critical` | **Label:** `payments` `backend` | **Estimate:** 4h

**Dependencies:** Issue #55

**Description:**

Configure payment products and pricing tiers.

**Tasks:**

- [ ]  Create Stripe products (Adult, Youth, Senior, Donation)
- [ ]  Set prices for each tier
- [ ]  Store product IDs in environment variables
- [ ]  Create pricing display component
- [ ]  Add product descriptions

**Acceptance Criteria:**

- All products created in Stripe
- Prices configured correctly
- Product IDs stored securely

---

### Issue #57: Build Payments Page

**Priority:** `P0 - Critical` | **Label:** `frontend` | **Estimate:** 8h

**Dependencies:** Issue #55, #56

**Description:**

Create payments page for reunion dues.

**Tasks:**

- [ ]  Create /payments route (protected)
- [ ]  Display payment products with prices
- [ ]  Add quantity selectors for each tier
- [ ]  Calculate total amount
- [ ]  Add Stripe Elements for card input
- [ ]  Style card input to match site
- [ ]  Add submit payment button
- [ ]  Show loading state during processing
- [ ]  Make responsive

**Acceptance Criteria:**

- Payments page displays products
- Card input working
- Total calculated correctly
- Mobile-friendly

---

### Issue #58: Payment Processing API

**Priority:** `P0 - Critical` | **Label:** `backend` `payments` | **Estimate:** 8h

**Dependencies:** Issue #55, #56

**Description:**

Implement payment processing with Stripe.

**Tasks:**

- [ ]  Implement POST /api/payments/create-intent endpoint
- [ ]  Create Stripe PaymentIntent
- [ ]  Return client secret to frontend
- [ ]  Handle payment confirmation
- [ ]  Store payment in database
- [ ]  Associate payment with user
- [ ]  Handle payment failures
- [ ]  Add idempotency keys
- [ ]  Implement retry logic

**Acceptance Criteria:**

- Payments process successfully
- Payment records stored
- Failures handled gracefully

---

### Issue #59: Stripe Webhook Handler

**Priority:** `P0 - Critical` | **Label:** `backend` `payments` | **Estimate:** 5h

**Dependencies:** Issue #55, #58

**Description:**

Handle Stripe webhooks for payment events.

**Tasks:**

- [ ]  Implement POST /api/payments/webhook endpoint
- [ ]  Verify webhook signature
- [ ]  Handle payment_intent.succeeded event
- [ ]  Handle payment_intent.failed event
- [ ]  Update payment status in database
- [ ]  Send confirmation email
- [ ]  Log all webhook events
- [ ]  Test with Stripe CLI

**Acceptance Criteria:**

- Webhooks verified correctly
- Payment status updated
- Confirmation emails sent

---

### Issue #60: Payment History Page

**Priority:** `P1 - High` | **Label:** `frontend` | **Estimate:** 4h

**Dependencies:** Issue #58

**Description:**

Show users their payment history.

**Tasks:**

- [ ]  Create /payments/history route (protected)
- [ ]  Fetch user's payments from database
- [ ]  Display in table format (date, type, amount, status)
- [ ]  Add receipt download links
- [ ]  Show payment method
- [ ]  Make responsive

**Acceptance Criteria:**

- Users can view payment history
- All payments displayed correctly
- Mobile-friendly

---

### Issue #61: Admin Payment Reports

**Priority:** `P1 - High` | **Label:** `admin` `backend` | **Estimate:** 5h

**Dependencies:** Issue #58

**Description:**

Create admin reporting for all payments.

**Tasks:**

- [ ]  Create /admin/payments route
- [ ]  Display all payments in table
- [ ]  Show summary statistics (total collected, by tier)
- [ ]  Add date range filters
- [ ]  Add status filters
- [ ]  Implement GET /api/payments/report endpoint
- [ ]  Export to CSV functionality
- [ ]  Show charts/graphs (optional)

**Acceptance Criteria:**

- Admin can view all payments
- Summary statistics accurate
- Export to CSV working

---

### Issue #62: Payment Testing Suite

**Priority:** `P0 - Critical` | **Label:** `testing` `payments` | **Estimate:** 6h

**Dependencies:** Issues #55-61

**Description:**

Create comprehensive tests for payment system.

**Tasks:**

- [ ]  Write unit tests for payment logic
- [ ]  Write integration tests with Stripe test mode
- [ ]  Test webhook handling
- [ ]  Test payment success flow
- [ ]  Test payment failure flow
- [ ]  Test webhook signature verification
- [ ]  Write E2E tests for payment flow

**Acceptance Criteria:**

- All payment scenarios tested
- Webhook handling tested
- Test coverage > 80%

---

## Milestone 9: Birthday Feature

**Duration:** 2 weeks | **Hours:** 32h | **Target:** Week 24 (June 23, 2026)

<aside>
🎂

**Feature Overview:** Implement Facebook-style birthday feature with homepage widget, calendar view, and birthday wishes. Integrates design specifications from UI/UX doc including theme support and celebratory styling.

</aside>

### Issue #74: Birthday Database Schema Updates

**Priority:** `P0 - Critical` | **Label:** `database` `backend` | **Estimate:** 3h

**Dependencies:** Issue #4

**Description:**

Update database schema to support birthday feature.

**Tasks:**

- [ ]  Add birth_date field to family_members table
- [ ]  Add show_birthday boolean field (default true)
- [ ]  Add birthday_email_notifications boolean field (default true)
- [ ]  Create birthday_wishes table with foreign keys
- [ ]  Add index on birth_date for performance
- [ ]  Add index on birthday_[wishes.family](http://wishes.family)_member_id
- [ ]  Run migration
- [ ]  Update Prisma schema

**Acceptance Criteria:**

- Schema updated successfully
- Indexes created for performance
- Existing data preserved

**Reference:** [📘 Technical Design Document (1)](https://www.notion.so/Technical-Design-Document-1-2eedfd535e21805fa274e2a0c9fccb1b?pvs=21)

---

### Issue #75: Birthday API Endpoints

**Priority:** `P0 - Critical` | **Label:** `backend` `api` | **Estimate:** 6h

**Dependencies:** Issue #74

**Description:**

Implement API endpoints for birthday functionality.

**Tasks:**

- [ ]  Implement GET /api/birthdays/upcoming (next 7 days)
- [ ]  Implement GET /api/birthdays/today
- [ ]  Implement GET /api/birthdays/month?month={month}&year={year}
- [ ]  Implement POST /api/birthdays/[id]/wish (auth required)
- [ ]  Implement GET /api/birthdays/[id]/wishes
- [ ]  Add privacy filtering (respect show_birthday setting)
- [ ]  Add authentication checks
- [ ]  Implement caching for birthday queries (5 min)
- [ ]  Add request validation with Zod

**Acceptance Criteria:**

- All endpoints working correctly
- Privacy settings respected
- Caching implemented
- Only authenticated users can post wishes

**Reference:** [📘 Technical Design Document (1)](https://www.notion.so/Technical-Design-Document-1-2eedfd535e21805fa274e2a0c9fccb1b?pvs=21)

---

### Issue #76: Birthday Widget Component

**Priority:** `P0 - Critical` | **Label:** `frontend` `design` | **Estimate:** 6h

**Dependencies:** Issue #91, Milestone 0 (Design System)

**Description:**

Create birthday widget for homepage following design specifications.

**Tasks:**

- [ ]  Create BirthdayWidget component
- [ ]  Implement Feature Card style (Cream/Dark Cream background)
- [ ]  Add 🎂 birthday cake icon (32px)
- [ ]  Create BirthdayEntry card component
- [ ]  Display profile photo (48px circle, Heritage Green border)
- [ ]  Show name (Inter SemiBold 16px) and age
- [ ]  Differentiate today's birthdays (Legacy Gold left border)
- [ ]  Add "View All Birthdays" CTA (secondary button)
- [ ]  Implement both light and dark theme styles
- [ ]  Add hover effects (scale 1.02)
- [ ]  Link to profile on click
- [ ]  Make responsive

**Acceptance Criteria:**

- Widget displays today + next 7 days birthdays
- Design matches specifications for both themes
- Clicking entry navigates to profile
- "View All" links to calendar page
- Mobile responsive

**Reference:** [🎨 UI/UX Design Specifications & Brand Kit](https://www.notion.so/UI-UX-Design-Specifications-Brand-Kit-79d74b0c44704a00bdb883fd50c2377d?pvs=21)

---

### Issue #77: Integrate Birthday Widget on Homepage

**Priority:** `P0 - Critical` | **Label:** `frontend` | **Estimate:** 2h

**Dependencies:** Issue #76, #18

**Description:**

Add birthday widget to homepage between achievements and feature cards.

**Tasks:**

- [ ]  Import BirthdayWidget component
- [ ]  Place after reunion countdown, before achievements
- [ ]  Fetch upcoming birthdays on page load
- [ ]  Handle empty state (no upcoming birthdays)
- [ ]  Add proper spacing (2xl/48px section spacing)
- [ ]  Test responsive layout

**Acceptance Criteria:**

- Widget appears on homepage
- Loads birthday data correctly
- Empty state handled gracefully
- Maintains homepage performance (< 2.5s load)

---

### Issue #78: Birthday Calendar Page

**Priority:** `P1 - High` | **Label:** `frontend` `design` | **Estimate:** 8h

**Dependencies:** Issue #91, Milestone 0

**Description:**

Create dedicated birthday calendar page with monthly view.

**Tasks:**

- [ ]  Create /birthdays route (protected)
- [ ]  Build month/year selector with prev/next arrows
- [ ]  Create 7-column calendar grid
- [ ]  Implement calendar cells with day numbers
- [ ]  Add Heritage Green dot indicator (8px) for birthdays
- [ ]  Highlight today with Heritage Green border (2px)
- [ ]  Apply Cream/Medium Gray hover states
- [ ]  Create birthday popover modal (max-width 400px)
- [ ]  Display multiple birthdays per day in popover
- [ ]  Add "Send Wish" action per person
- [ ]  Style for both light and dark themes
- [ ]  Make responsive (stack on mobile)
- [ ]  Add keyboard navigation

**Acceptance Criteria:**

- Calendar displays correctly for any month/year
- Birthday indicators show on correct dates
- Popover shows birthday details
- Both themes styled per design spec
- Mobile-friendly
- Accessible via keyboard

**Reference:** [🎨 UI/UX Design Specifications & Brand Kit](https://www.notion.so/UI-UX-Design-Specifications-Brand-Kit-79d74b0c44704a00bdb883fd50c2377d?pvs=21)

---

### Issue #79: Birthday Wish Functionality

**Priority:** `P1 - High` | **Label:** `frontend` `backend` | **Estimate:** 5h

**Dependencies:** Issue #91, #78

**Description:**

Implement birthday wish posting and display.

**Tasks:**

- [ ]  Create BirthdayWishCard component
- [ ]  Style with Standard card + Legacy Gold left border (3px)
- [ ]  Show author profile photo (32px) and name
- [ ]  Display message (Inter Regular 14px, line-height 1.6)
- [ ]  Add timestamp (Inter Regular 12px, Slate Gray)
- [ ]  Create wish submission form with textarea
- [ ]  Add character limit (500 characters)
- [ ]  Implement POST to /api/birthdays/[id]/wish
- [ ]  Display wishes on profile page or in popover
- [ ]  Add loading and error states
- [ ]  Send notification to birthday person (optional)

**Acceptance Criteria:**

- Users can post birthday wishes
- Wishes display with proper styling
- Author information shown
- Timestamps formatted correctly
- Validation working

**Reference:** [🎨 UI/UX Design Specifications & Brand Kit](https://www.notion.so/UI-UX-Design-Specifications-Brand-Kit-79d74b0c44704a00bdb883fd50c2377d?pvs=21)

---

### Issue #80: Birthday Notification Badge

**Priority:** `P2 - Medium` | **Label:** `frontend` `design` | **Estimate:** 3h

**Dependencies:** Issue #91, #17

**Description:**

Add birthday notification badge to navigation menu.

**Tasks:**

- [ ]  Create notification badge component
- [ ]  Style as 20px circle with Terracotta background
- [ ]  Use White text, Inter Bold 12px
- [ ]  Display count of today's birthdays
- [ ]  Add subtle pulse animation on new birthday
- [ ]  Position on navigation menu (near user profile or birthdays link)
- [ ]  Link to birthday calendar page on click
- [ ]  Update count in real-time (or on page load)
- [ ]  Make accessible with ARIA label

**Acceptance Criteria:**

- Badge displays when there are birthdays today
- Count accurate
- Animation subtle and smooth
- Clicking navigates to calendar
- Accessible

**Reference:** [🎨 UI/UX Design Specifications & Brand Kit](https://www.notion.so/UI-UX-Design-Specifications-Brand-Kit-79d74b0c44704a00bdb883fd50c2377d?pvs=21)

---

### Issue #81: Birthday Email Notifications

**Priority:** `P2 - Medium` | **Label:** `backend` `email` | **Estimate:** 4h

**Dependencies:** Issue #74, #75

**Description:**

Implement email notifications for birthdays.

**Tasks:**

- [ ]  Create birthday reminder email template
- [ ]  Design with brand colors and logo
- [ ]  Set up daily cron job (runs at 6 AM user timezone)
- [ ]  Query users with birthday_email_notifications = true
- [ ]  Find birthdays happening today
- [ ]  Send reminder email with list of today's birthdays
- [ ]  Include links to send wishes
- [ ]  Add unsubscribe option
- [ ]  Test email delivery
- [ ]  Log sent emails

**Acceptance Criteria:**

- Emails sent daily to opted-in users
- Template branded and professional
- Only includes visible birthdays
- Unsubscribe link working
- Respects user preferences

---

### Issue #82: Birthday Privacy Settings

**Priority:** `P1 - High` | **Label:** `frontend` `backend` | **Estimate:** 3h

**Dependencies:** Issue #74, #27

**Description:**

Add birthday privacy controls to profile settings.

**Tasks:**

- [ ]  Add birthday visibility toggle to profile edit form
- [ ]  Add email notification preference toggle
- [ ]  Update PATCH /api/directory/[id] to handle new fields
- [ ]  Add explanatory text for privacy options
- [ ]  Update profile settings UI
- [ ]  Validate settings on backend
- [ ]  Test privacy filtering

**Acceptance Criteria:**

- Users can hide/show birthday
- Users can opt in/out of email reminders
- Settings persist correctly
- Privacy respected across all features

---

### Issue #83: Birthday Testing Suite

**Priority:** `P1 - High` | **Label:** `testing` | **Estimate:** 5h

**Dependencies:** Issues #74-82

**Description:**

Create comprehensive tests for birthday feature.

**Tasks:**

- [ ]  Write unit tests for birthday queries
- [ ]  Write integration tests for birthday API endpoints
- [ ]  Test privacy filtering (show_birthday = false)
- [ ]  Test date calculations (upcoming, today, month view)
- [ ]  Test birthday wish posting and retrieval
- [ ]  Test email notification logic
- [ ]  Test edge cases (leap year birthdays, timezone handling)
- [ ]  Write E2E tests for birthday widget and calendar

**Acceptance Criteria:**

- All birthday features tested
- Privacy filtering verified
- Edge cases handled
- Test coverage > 80%

---

## Milestone 10: Testing & Launch Preparation

**Duration:** 2 weeks | **Hours:** 32h | **Target:** Week 26 (July 21, 2026)

### Issue #84: Comprehensive Integration Testing

**Priority:** `P0 - Critical` | **Label:** `testing` | **Estimate:** 8h

**Description:**

Perform full integration testing across all features.

**Tasks:**

- [ ]  Test complete user registration and login flow
- [ ]  Test directory access and editing
- [ ]  Test achievement submission and approval
- [ ]  Test gallery viewing and uploads
- [ ]  Test RSVP submission and editing
- [ ]  Test payment processing end-to-end
- [ ]  Test admin functions
- [ ]  Fix any bugs found

**Acceptance Criteria:**

- All features working together
- No critical bugs
- User flows smooth

---

### Issue #85: End-to-End Testing with Playwright

**Priority:** `P0 - Critical` | **Label:** `testing` | **Estimate:** 8h

**Description:**

Create E2E tests for critical user journeys.

**Tasks:**

- [ ]  Set up Playwright
- [ ]  Write test for registration and login
- [ ]  Write test for viewing and editing directory
- [ ]  Write test for submitting achievement
- [ ]  Write test for viewing gallery
- [ ]  Write test for RSVP submission
- [ ]  Write test for payment processing
- [ ]  Run tests in CI pipeline

**Acceptance Criteria:**

- All critical paths have E2E tests
- Tests passing consistently
- Integrated into CI/CD

---

### Issue #86: Performance Audit & Optimization

**Priority:** `P0 - Critical` | **Label:** `performance` `design` | **Estimate:** 7h

**Description:**

Audit and optimize site performance per technical requirements.

**Tasks:**

- [ ]  Run Lighthouse audits on all pages
- [ ]  Measure Core Web Vitals (target: page load < 2.5s)
- [ ]  Optimize logo and family crest images (WebP with JPEG fallback)
- [ ]  Implement lazy loading with blur placeholders
- [ ]  Reduce JavaScript bundle size
- [ ]  Implement code splitting for admin features
- [ ]  Optimize font loading (font-display: swap)
- [ ]  Optimize database queries with connection pooling
- [ ]  Add caching headers (ISR with 1 hour revalidation)
- [ ]  Test theme switching performance (200ms transition)
- [ ]  Test on slow connections (3G)
- [ ]  Optimize CSS (remove unused Tailwind classes)

**Acceptance Criteria:**

- All pages load < 2.5s per technical spec
- Lighthouse performance score > 90
- Core Web Vitals passing
- Theme switching smooth
- Logo optimized for web

**Reference:** [📘 Technical Design Document (1)](https://www.notion.so/Technical-Design-Document-1-2eedfd535e21805fa274e2a0c9fccb1b?pvs=21)

---

### Issue #87: Security Audit

**Priority:** `P0 - Critical` | **Label:** `security` | **Estimate:** 5h

**Description:**

Perform security audit and fix vulnerabilities.

**Tasks:**

- [ ]  Run security scan with npm audit
- [ ]  Check for exposed API keys
- [ ]  Verify all authentication checks
- [ ]  Test authorization on protected routes
- [ ]  Verify CSRF protection
- [ ]  Test rate limiting
- [ ]  Review input validation
- [ ]  Fix any vulnerabilities found

**Acceptance Criteria:**

- No critical security issues
- All protected routes secured
- Input validation working

---

### Issue #88: Cross-Browser & Device Testing

**Priority:** `P1 - High` | **Label:** `testing` | **Estimate:** 4h

**Description:**

Test site across browsers and devices.

**Tasks:**

- [ ]  Test on Chrome (desktop & mobile)
- [ ]  Test on Firefox
- [ ]  Test on Safari (desktop & mobile)
- [ ]  Test on Edge
- [ ]  Test on various screen sizes
- [ ]  Test on tablets
- [ ]  Fix any compatibility issues

**Acceptance Criteria:**

- Site working on all major browsers
- Responsive on all screen sizes
- No layout breaking issues

---

### Issue #89: Documentation & User Guide

**Priority:** `P1 - High` | **Label:** `documentation` | **Estimate:** 5h

**Description:**

Create documentation for users and admins.

**Tasks:**

- [ ]  Write user guide for family members
- [ ]  Write admin guide for committee members
- [ ]  Document how to submit achievements
- [ ]  Document how to RSVP
- [ ]  Document how to make payments
- [ ]  Document how to view birthdays and send wishes
- [ ]  Create admin video tutorials (optional)
- [ ]  Create FAQ page

**Acceptance Criteria:**

- User guide complete
- Admin guide complete
- FAQ page created

---

## Milestone 11: Deployment & Post-Launch

**Duration:** 1 week | **Hours:** 16h | **Target:** Week 27 (August 4, 2026)

### Issue #90: Pre-Launch Checklist

**Priority:** `P0 - Critical` | **Label:** `deployment` | **Estimate:** 4h

**Description:**

Complete all pre-launch tasks.

**Tasks:**

- [ ]  Run all database migrations in production
- [ ]  Configure all environment variables in Vercel
- [ ]  Verify SSL certificate active
- [ ]  Confirm DNS configured for custom domain
- [ ]  Switch Stripe to live mode
- [ ]  Configure webhooks in Stripe live mode
- [ ]  Verify email service (Resend) in production
- [ ]  Create admin accounts
- [ ]  Import initial family data
- [ ]  Test backup and restore
- [ ]  Configure monitoring and alerts

**Acceptance Criteria:**

- All checklist items completed
- Production environment ready
- Monitoring active

---

### Issue #91: Production Deployment

**Priority:** `P0 - Critical` | **Label:** `deployment` | **Estimate:** 3h

**Dependencies:** Issue #90

**Description:**

Deploy to production and verify.

**Tasks:**

- [ ]  Deploy to production via Vercel
- [ ]  Run post-deploy health checks
- [ ]  Verify all pages loading
- [ ]  Test critical functionality
- [ ]  Verify database connections
- [ ]  Test payment processing
- [ ]  Monitor error logs
- [ ]  Have rollback plan ready

**Acceptance Criteria:**

- Site live on custom domain
- All features working in production
- No critical errors

---

### Issue #92: User Acceptance Testing

**Priority:** `P0 - Critical` | **Label:** `testing` | **Estimate:** 4h

**Dependencies:** Issue #91

**Description:**

Conduct UAT with family committee members.

**Tasks:**

- [ ]  Invite committee members to test
- [ ]  Provide testing instructions
- [ ]  Gather feedback
- [ ]  Document bugs and issues
- [ ]  Prioritize fixes
- [ ]  Deploy hotfixes if needed
- [ ]  Get final approval

**Acceptance Criteria:**

- UAT completed
- Critical issues fixed
- Committee approval obtained

---

### Issue #93: Launch Communications

**Priority:** `P1 - High` | **Label:** `launch` | **Estimate:** 3h

**Dependencies:** Issue #92

**Description:**

Announce launch to family members.

**Tasks:**

- [ ]  Draft launch announcement email
- [ ]  Include getting started guide
- [ ]  Send to all family members
- [ ]  Post on social media (if applicable)
- [ ]  Provide support contact information
- [ ]  Monitor for questions and issues

**Acceptance Criteria:**

- Launch announced
- Family members notified
- Support channels ready

---

### Issue #94: Post-Launch Monitoring

**Priority:** `P0 - Critical` | **Label:** `monitoring` | **Estimate:** 3h

**Dependencies:** Issue #91

**Description:**

Monitor site for first week post-launch.

**Tasks:**

- [ ]  Monitor error rates
- [ ]  Track user registrations
- [ ]  Monitor performance metrics
- [ ]  Check payment processing
- [ ]  Review user feedback
- [ ]  Address urgent issues
- [ ]  Document common questions

**Acceptance Criteria:**

- No critical issues
- Site stable
- Users successfully onboarding

---

## Development Guidelines

### Weekly Planning

- **Weekly capacity:** 16 hours
- **Sprint duration:** 1-2 weeks depending on milestone
- **Buffer time:** ~20% for unexpected issues

### Issue Estimates

- **Small (S):** 1-3 hours
- **Medium (M):** 4-6 hours
- **Large (L):** 7-10 hours
- **Extra Large (XL):** 11+ hours (break down if possible)

### Priority Labels

- **P0 - Critical:** Must be completed for launch
- **P1 - High:** Important features, needed for full functionality
- **P2 - Medium:** Nice to have, can be deferred
- **P3 - Low:** Future enhancements

### Issue Dependencies

- Review dependencies before starting work
- Complete prerequisite issues first
- Update issue status when blockers resolved

### Testing Requirements

- Write tests as you build features
- Maintain > 80% test coverage
- All PRs must pass CI checks

---

## Risk Management

### Potential Risks

1. **Scope creep:** Stick to defined requirements, defer enhancements to Phase 2
2. **Third-party API issues:** Have backup plans for Stripe, Vercel services
3. **Time overruns:** Build buffer time into estimates, prioritize ruthlessly
4. **Family data migration:** Test CSV import thoroughly before launch
5. **Payment issues:** Test extensively in Stripe test mode

### Contingency Plans

- If running behind schedule, defer P2 and P3 issues
- Focus on core features: Auth, Directory, Achievements, Gallery
- Payments and RSVP can be added in Phase 1.5 if needed
- Keep stakeholders informed of timeline changes

---

## Post-Launch Roadmap (Phase 2)

**After initial launch, consider these enhancements:**

- **M11: Analytics & Insights** (2 weeks)
    - User engagement tracking
    - Payment analytics dashboard
    - RSVP trends
- **M12: Advanced Features** (3 weeks)
    - Live-stream reunion page
    - Genealogy tree explorer
    - AI-powered photo tagging
- **M13: Mobile App** (8-10 weeks)
    - React Native app
    - Directory and messaging
    - Push notifications
- **M14: Family Store** (4 weeks)
    - Merchandise catalog
    - E-commerce integration
    - Order fulfillment

---

## Related Documentation

<aside>
📚

**Key Reference Documents:**

- [📘 Jones Family Hub - Executive Summary](https://www.notion.so/Jones-Family-Hub-Executive-Summary-2c4dfd535e21804e84a0eb33ba7063af?pvs=21) - Software Requirements Specification
- [📘 Technical Design Document (1)](https://www.notion.so/Technical-Design-Document-1-2eedfd535e21805fa274e2a0c9fccb1b?pvs=21) - System Architecture & Technical Specs
- [🎨 UI/UX Design Specifications & Brand Kit](https://www.notion.so/UI-UX-Design-Specifications-Brand-Kit-79d74b0c44704a00bdb883fd50c2377d?pvs=21) - Complete Design System
</aside>

---

**Questions or Issues?**

Contact: Jermond Love ([jermlove@gmail.com](mailto:jermlove@gmail.com))

**GitHub Project:** [Create project board using these issues]

**Start Date:** Week of January 27, 2026

**Target Launch:** August 4, 2026 (Week 27)