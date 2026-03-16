# 📘 Technical Design Document (1)

# Technical Design Document

**Project:** Jones Family Hub ([JonesFamily1832.com](http://JonesFamily1832.com))

**Version:** 2.0

**Last Updated:** January 20, 2026

---

## 1. Executive Summary

Jones Family Hub is a comprehensive family heritage and reunion platform serving the Jones family (1832-present) with 500+ members across multiple generations. The platform centralizes communication, events, media archives, and genealogical records while providing secure access to family directory information.

**Technology Stack:** Next.js 16 · React 19 · TypeScript · PostgreSQL · Vercel · Tailwind CSS. *Confirm Next.js and React version numbers against current releases at implementation time; update this document if different.*

**Primary Stakeholders:** Jones Family Reunion Committee, Coordinators, Elders, Descendants

---

## 2. System Objectives

| Objective | Description |
| --- | --- |
| Heritage Preservation | Store family history, storytelling, and legacy documentation |
| Reunion Management | Schedule, RSVP, lodging, and event coordination |
| Secure Directory | Member directory with access control and self-service updates |
| Achievement Recognition | Highlight family milestones across generations |
| Media Archive | Preserve photos and videos from reunions and family history |
| Payment Processing | Electronic collection of reunion dues and donations |
| Scalability | Support growth across branches, generations, and features |

---

## 3. Functional Requirements

### 3.1 Public Features

**Homepage**

- Family brand identity and mission statement
- Countdown timer to Reunion 2027
- Latest 3 achievements displayed dynamically
- **Upcoming birthdays widget** (today + next 7 days)
- Quick navigation CTAs (Reunion, Payments, Achievements, Directory, Gallery)

**Family History**

- Chronological lineage from 1832 to present; content source: static markdown/MDX or CMS (see Section 4.4). No DB schema for narrative content; timeline data may be derived from structured content or static pages.
- Image-rich storytelling sections
- Optional timeline visualization

**Reunion 2027**

- Event details (dates, location, theme, policies) — sourced from `reunion_content` table or CMS/markdown (see Section 4.4)
- Travel and lodging recommendations
- Daily itinerary with times and locations
- Public RSVP form with attendance counter
- PDF-printable event flyer

**Photo/Video Gallery**

- Unlimited albums with year/category filters
- Lightbox viewing with download capability
- Slideshow autoplay mode

**Contact Form**

- Categorized inquiries (Directory, Reunion, Payments, Media)
- Submissions stored in `contact_submissions` table; category-to-recipient mapping via env config (e.g. `CONTACT_EMAIL_DIRECTORY`, `CONTACT_EMAIL_REUNION`). Email sent to designated committee address per category; storage retained for follow-up and audit.

### 3.2 Authenticated Features

**Family Directory** *(Login Required)*

| Element | Details |
| --- | --- |
| Fields | Name, Branch, Email, Phone, City/State, Household Members, Photo |
| Features | Search by name, location, branch; Self-service profile editing |
| Admin Tools | Bulk CSV import/export |

**Achievements System**

| Feature | Details |
| --- | --- |
| Submission Form | Name, Category, Date, Details, Photo |
| Categories | New Baby, Graduation, Wedding, Promotion, Military, Memorial |
| Display | Grid/timeline view with filtering by category, year, alphabetical |
| Workflow | Submit → Admin Review → Approval → Publish |

**Dues & Payments**

- Payment tiers: Adult, Youth, Senior, Optional Donation
- Processors: **Phase 1: Stripe only.** PayPal and optional CashApp QR deferred to Phase 2.
- Admin CSV export for reporting

**Birthday Feature** *(Public & Authenticated)*

| Feature | Details |
| --- | --- |
| Display | Homepage widget showing today's birthdays + next 7 days |
| Visibility | Public view shows name + age; authenticated view shows profile photo |
| Notifications | Authenticated users receive email reminder for birthdays (opt-in) |
| Privacy | Members can hide their birthday in profile settings |
| Calendar View | Dedicated /birthdays page with monthly calendar view (auth required) |

---

## 4. Technical Architecture

### 4.1 Stack Overview

**Core Framework**

- Next.js 16.x (App Router) + React 19
- TypeScript (strict mode)
- Tailwind CSS 4.x

**Infrastructure**

- Hosting: Vercel (Edge Network + Serverless)
- Database: PostgreSQL (Vercel Postgres)
- Media: Vercel Blob Storage
- Cache: Redis (Vercel KV)

**Key Services**

- Authentication: Better Auth
- Payments: Stripe API v2024-01 (Phase 1; PayPal/CashApp deferred to Phase 2)
- Email: Resend or Nodemailer
- Forms: React Hook Form + Zod
- Logging: Better Stack (log aggregation, alerting, optional Web Vitals)

**Design System**

Theme tokens, typography (Playfair Display, Inter, Fira Code), component patterns, and light/dark theme implementation are defined in the **UI/UX Design Specifications & Brand Kit**. Implementation must follow that document for visual consistency and WCAG 2.1 AA accessibility.

### 4.2 System Architecture

```

```

┌─────────────────────────────────────────────────────────┐

│  Client Layer (Next.js App Router + React + Tailwind)  │

└───────────────────────┬─────────────────────────────────┘

│

┌───────────────────────▼─────────────────────────────────┐

│  Application Layer                                      │

│  • Server Components  • API Routes  • Middleware (Auth) │

└───────────────────────┬─────────────────────────────────┘

│

┌───────────────────────▼─────────────────────────────────┐

│  Service Layer                                          │

│  • Auth  • Payments  • Email  • Storage                 │

└───────────────────────┬─────────────────────────────────┘

│

┌───────────────────────▼─────────────────────────────────┐

│  Data Layer                                             │

│  • PostgreSQL  • Vercel Blob  • Redis Cache             │

└─────────────────────────────────────────────────────────┘

```
### 4.3 Project Structure
```

/app

├── (auth)                    # Auth route group

│   ├── login/

│   └── register/

├── (protected)               # Protected routes group

│   ├── directory/

│   ├── achievements/

│   └── dashboard/

├── api/                      # API routes

│   ├── achievements/

│   ├── payments/

│   ├── reunion/              # reunion/[year]/rsvp, reunion/[year]/attendees, etc.

│   └── contact/

├── reunion/

├── gallery/

├── history/

├── layout.tsx                # Root layout

├── page.tsx                  # Homepage

└── globals.css

/components

├── ui/                       # Reusable UI components

├── features/                 # Feature-specific components

│   ├── achievements/

│   ├── gallery/

│   ├── directory/

│   └── reunion/

└── layouts/                  # Layout components

/lib

├── db/                       # Database client & queries

├── auth/                     # Auth configuration

├── validations/              # Zod schemas

└── utils.ts                  # Utility functions

/hooks                          # Custom React hooks

/actions                        # Server actions

/types                          # TypeScript type definitions

/public                         # Static assets

├── images/

└── fonts/

next.config.ts

tailwind.config.ts

tsconfig.json

```

```

```jsx
/app
  ├── (auth)              # Login, register
  ├── (protected)         # Directory, achievements, dashboard
  ├── api/                # Achievements, payments, reunion (RSVP under reunion), contact
  ├── reunion/
  ├── gallery/
  ├── history/
  ├── layout.tsx
  └── page.tsx

/components
  ├── ui/                 # Reusable components
  ├── features/           # Feature-specific (achievements, gallery, etc.)
  └── layouts/

/lib
  ├── db/                 # Database client & queries
  ├── auth/               # Auth configuration
  ├── validations/        # Zod schemas
  └── utils.ts

/hooks                    # Custom React hooks
/actions                  # Server actions
/types                    # TypeScript definitions
/public                   # Static assets
```

### 4.4 Database Schema

**Users**

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'member',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Family Members**

```sql
CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  branch VARCHAR(100),
  phone VARCHAR(20),
  city VARCHAR(100),
  state VARCHAR(50),
  household_size INT DEFAULT 1,
  profile_photo_url TEXT,
  bio TEXT,
  birth_date DATE,
  birth_year INT,
  show_birthday BOOLEAN DEFAULT true,
  birthday_email_notifications BOOLEAN DEFAULT true,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Achievements**

```sql
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_member_id UUID REFERENCES family_members(id),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT,
  achievement_date DATE NOT NULL,
  photo_url TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  submitted_by UUID REFERENCES users(id),
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_achievements_status ON achievements(status);
CREATE INDEX idx_achievements_category ON achievements(category);
CREATE INDEX idx_achievements_date ON achievements(achievement_date DESC);
```

**Gallery Albums & Media**

```sql
CREATE TABLE gallery_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  year INT,
  category VARCHAR(50),
  cover_photo_url TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE gallery_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID REFERENCES gallery_albums(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  media_type VARCHAR(20) NOT NULL,
  caption TEXT,
  uploaded_by UUID REFERENCES users(id),
  file_size BIGINT,
  width INT,
  height INT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_gallery_media_album ON gallery_media(album_id);
```

**Birthdays**

```sql
CREATE TABLE birthday_wishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
  from_user_id UUID REFERENCES users(id),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_birthday_wishes_member ON birthday_wishes(family_member_id);
CREATE INDEX idx_family_members_birth_date ON family_members(birth_date);
```

**Reunion RSVPs**

```sql
CREATE TABLE reunion_rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  reunion_year INT NOT NULL,
  attending BOOLEAN DEFAULT false,
  adults_count INT DEFAULT 1,
  children_count INT DEFAULT 0,
  dietary_restrictions TEXT,
  lodging_needed BOOLEAN DEFAULT false,
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, reunion_year)
);
```

**Reunion Content** *(source of truth for GET /api/reunion/[year])*

```sql
CREATE TABLE reunion_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reunion_year INT NOT NULL,
  content_key VARCHAR(100) NOT NULL,
  content_value TEXT,
  content_type VARCHAR(50) DEFAULT 'text',
  sort_order INT DEFAULT 0,
  updated_by UUID REFERENCES users(id),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(reunion_year, content_key)
);
CREATE INDEX idx_reunion_content_year ON reunion_content(reunion_year);
```

Use `content_key` for: `event_dates`, `location`, `theme`, `policies`, `travel_lodging`, `itinerary` (JSON or text), `flyer_url`, etc. Alternative: store editable content in markdown/CMS and serve via API; if so, document that decision and omit this table.

**Contact Submissions**

```sql
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(50) NOT NULL,
  sender_name VARCHAR(255),
  sender_email VARCHAR(255) NOT NULL,
  subject VARCHAR(500),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_contact_submissions_category ON contact_submissions(category);
```

Category-to-recipient mapping: use environment variables (e.g. `CONTACT_EMAIL_DIRECTORY`, `CONTACT_EMAIL_REUNION`, `CONTACT_EMAIL_PAYMENTS`, `CONTACT_EMAIL_MEDIA`) or a small config table. Email is sent to the mapped address; submission is stored for audit and follow-up.

**Payments**

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  stripe_payment_intent_id VARCHAR(255) UNIQUE,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  payment_type VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  reunion_year INT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
```

Phase 1: only Stripe; `stripe_payment_intent_id` is the sole payment-provider identifier. For Phase 2 (PayPal/CashApp), add `payment_provider VARCHAR(50)` and provider-specific id columns.

**Audit Log** *(optional; for admin-action audit trail)*

```sql
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  resource_id VARCHAR(255),
  details JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_audit_log_actor ON audit_log(actor_id);
CREATE INDEX idx_audit_log_created ON audit_log(created_at DESC);
```

### 4.4.1 Roles and Permission Matrix

**Roles** (stored in `users.role`): `member` | `admin`

| Resource / Action | member | admin |
| --- | --- | --- |
| View directory | Yes (own + visible members) | Yes |
| Edit own profile | Yes | Yes |
| CSV import/export directory | No | Yes |
| Submit achievement | Yes | Yes |
| Approve/reject/delete achievement | No | Yes |
| View gallery, upload media | Yes | Yes |
| Create album, delete media | No | Yes |
| Edit album (PATCH) | No | Yes |
| Submit RSVP | Yes | Yes |
| View attendees list | No | Yes |
| Create payment (Stripe) | Yes | Yes |
| View own payment history | Yes | Yes |
| Export payments report | No | Yes |
| Reunion content CRUD | No | Yes |
| View contact submissions | No | Yes |

**Resolving "admin":** Middleware and API checks `user.role === 'admin'` (or equivalent from session). No separate permission flags in Phase 1.

### 4.4.2 Dashboard Scope

The **Dashboard** (`/dashboard`, under `(protected)`) aggregates: current user's RSVP status, payment history summary, profile completeness, and quick links to Directory, Achievements, and Gallery. No dashboard-specific API beyond existing endpoints (`/api/reunion/[year]/rsvp`, `/api/payments/history`, directory profile). Optional: `GET /api/dashboard/summary` returning RSVP status, last payment, and profile flags.

### 4.5 API Endpoints

**Authentication**

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Authenticate
- `POST /api/auth/logout` - End session
- `GET /api/auth/session` - Current session
- `POST /api/auth/forgot-password` - Reset password flow

**Directory** *(Auth Required)*

- `GET /api/directory` - List members
- `GET /api/directory/[id]` - Get profile
- `PATCH /api/directory/[id]` - Update own profile
- `GET /api/directory/search?q={query}` - Search

**Achievements**

- `GET /api/achievements` - List approved (public)
- `GET /api/achievements?status=pending` - List pending (admin)
- `POST /api/achievements` - Submit (auth required)
- `PATCH /api/achievements/[id]` - Update (admin)
- `POST /api/achievements/[id]/approve` - Approve (admin)
- `DELETE /api/achievements/[id]` - Delete (admin)

**Gallery**

- `GET /api/gallery/albums` - List albums
- `GET /api/gallery/albums/[id]` - Get album details
- `POST /api/gallery/albums` - Create (admin)
- `PATCH /api/gallery/albums/[id]` - Update album title, description, cover (admin)
- `POST /api/gallery/upload` - Upload media (auth)
- `DELETE /api/gallery/media/[id]` - Delete (admin)

**Reunion**

- `GET /api/reunion/[year]` - Get details
- `POST /api/reunion/[year]/rsvp` - Submit RSVP (auth)
- `GET /api/reunion/[year]/attendees` - Get count
- `GET /api/reunion/[year]/attendees/list` - List (admin)

**Payments**

- `POST /api/payments/create-intent` - Create payment (auth). Body: `{ amount, paymentType, reunionYear? }`. Returns `{ clientSecret }` for Stripe Elements.
- `POST /api/payments/webhook` - Stripe webhook. Verify signature with `STRIPE_WEBHOOK_SECRET`; process idempotently by `payment_intent.id` (ignore duplicate events); return 2xx quickly; log and retry on transient failures per Stripe retry policy.
- `GET /api/payments/history` - User history (auth)
- `GET /api/payments/report` - Export CSV (admin)

**Contact**

- `POST /api/contact` - Submit form (public). Body: `{ category, senderName, senderEmail, subject?, message }`. Responds 201 or 400 with validation errors.

**Health**

- `GET /api/health` - Returns 200 and `{ status: 'ok', db?: 'ok', redis?: 'ok' }` when app and optional dependencies are up. Used by CI/CD and monitoring.

**Birthdays**

- `GET /api/birthdays/upcoming` - Get upcoming birthdays (7 days)
- `GET /api/birthdays/today` - Get today's birthdays
- `GET /api/birthdays/month?month={month}&year={year}` - Get month view
- `POST /api/birthdays/[id]/wish` - Post birthday wish (auth)
- `GET /api/birthdays/[id]/wishes` - Get wishes for member

**API contract (critical endpoints):** Use consistent error format: `{ error: string, code?: string }` with HTTP status 4xx/5xx. Auth endpoints return 401 for invalid credentials, 409 for duplicate email on register. Full request/response shapes can be maintained in OpenAPI or in-code types.

---

## 5. Security & Performance

### 5.1 Security Measures

| Layer | Implementation |
| --- | --- |
| Authentication | bcrypt (12 rounds), HTTP-only cookies |
| Authorization | Role-based access control (RBAC) |
| Input Validation | Zod schemas for all inputs |
| SQL Injection | Parameterized queries via ORM |
| XSS Prevention | React auto-escaping, CSP headers |
| CSRF Protection | SameSite cookies, CSRF tokens |
| Rate Limiting | 100 req/min per IP (unauthenticated); 200 req/min per authenticated user; 20 req/min for sensitive paths (e.g. payments, directory export) via Edge Middleware |
| File Upload | Type validation, size limits (10MB images, 500MB video) |
| Encryption | TLS 1.3 in transit. At rest: rely on provider encryption (Vercel Postgres, Vercel Blob). No application-level field encryption in Phase 1; sensitive PII in DB is protected by access control and DB-level encryption. |

### 5.2 Performance Targets

| Metric | Target |
| --- | --- |
| Page Load | < 2.5s on broadband |
| API Response | < 500ms (p95) |
| Database Queries | < 100ms (p95) |
| Image Optimization | WebP, lazy loading, blur placeholders |
| Code Splitting | Route-based + dynamic imports |
| Caching | Redis (5 min), CDN (1 year for media) |

### 5.3 Authentication Flow

```

```

User Login

↓

Validate Credentials

↓ (valid)

Generate Session Token

↓

Store in Redis (7 day TTL)

↓

Set HTTP-only Cookie

↓

Return User Profile

```

```

**Middleware Protection:** Validates session on protected routes, refreshes if < 24h remaining

### 5.4 Account and Data Lifecycle

- **Account deletion:** Provide flow for member to request account (and linked family_member) deletion. On confirmation: anonymize or delete user and related rows per policy; retain payments for finance audit with user id removed or pseudonymized. To be finalized with committee.
- **Data export:** Authenticated user may request a copy of their data (profile, RSVPs, payment history, achievements). Delivered as download or email within 30 days. To be defined with committee.
- **Retention:** Contact submissions and payment records retained per committee/finance policy (e.g. 7 years for payments). Define exact retention in operations runbook.

---

## 6. Non-Functional Requirements

| Category | Requirement |
| --- | --- |
| Accessibility | WCAG 2.1 AA compliant |
| Scalability | Support 500+ members, 20+ years of galleries |
| Availability | 99.9% uptime |
| Backup | Weekly automated + manual before events |
| Browser Support | Modern browsers (last 2 versions) |
| Mobile Responsive | Full functionality on all screen sizes |

---

## 7. Testing Strategy

**Coverage Requirements**

- Unit Tests: 80% (Jest)
- Integration Tests: Critical flows (auth, payments, RSVP)
- E2E Tests: Core journeys (Playwright)
- Accessibility: WCAG 2.1 AA (axe-core)

**Key Test Scenarios**

- Authentication: Login, registration, session management
- Directory: View, search, update, access control
- Achievements: Submit, approve, display, filter
- Payments: Success/failure flows, webhook handling
- Gallery: Upload, albums, lightbox viewing
- RSVP: Submit, update, attendance tracking

---

## 8. Deployment & CI/CD

```
Git Push to main
       │
       ▼
  GitHub Actions Triggered
       │
       ├─ Run Tests (Jest + Playwright)
       ├─ Type Check (tsc)
       ├─ Lint (ESLint)
       └─ Build Verification
       │
       ▼
  All Checks Pass?
       │
       ├─ No ──► Block Deploy, Notify Team
       │
       ▼ Yes
  Vercel Auto-Deploy
       │
       ├─ Build Next.js App
       ├─ Run Database Migrations
       ├─ Deploy to Edge Network
       └─ Invalidate CDN Cache
       │
       ▼
  Production Live
       │
       ▼
  Post-Deploy Checks
       ├─ GET /api/health returns 200
       ├─ Smoke tests
       └─ Rollback if failure (see below)
```

```jsx
Git Push to main
    ↓
GitHub Actions
    • Run tests (Jest + Playwright)
    • Type check (tsc)
    • Lint (ESLint)
    • Build verification
    ↓
All Pass → Vercel Deploy
    • Build Next.js
    • Run migrations
    • Deploy to Edge
    • Invalidate CDN
    ↓
Post-Deploy Checks
    • GET /api/health
    • Smoke tests
    • Rollback if needed
```

**Health endpoint:** `GET /api/health` returns 200 and `{ status: 'ok', db?: 'ok', redis?: 'ok' }`. CI and monitoring call this after deploy. If DB/Redis checks are included, document timeout (e.g. 5s).

**Monitoring and alerting:** Monitor at least: (1) uptime/availability (e.g. Vercel or external ping to /api/health), (2) server errors (5xx), (3) payment webhook failures. Configure alerts for P1 (site down, payment failures). **Better Stack** is used for log aggregation and alerting (see below). Document alert recipients in runbook.

**Better Stack logging:** Application log aggregation and monitoring use **Better Stack** (formerly Logtail). Integration: (1) Vercel integration or Log Drains (Vercel Pro) to collect runtime/function logs automatically; (2) optional `@logtail/next` in the Next.js app for structured logs, error capture, and Web Vitals. Send request errors (4xx/5xx), security-relevant events (login failure, permission denied), and payment webhook outcomes to Better Stack. Use log levels (debug, info, warn, error) and structured context where applicable. Configure P1 alerts (site down, payment failures) in Better Stack; document alert recipients in the operations runbook.

**Rollback:** On post-deploy failure: (1) Revert deployment in Vercel to previous production deployment. (2) If a DB migration was run, do not auto-rollback migrations; prefer additive migrations and forward fixes. If a destructive migration was required, restore from backup and document procedure in runbook.

**Migrations policy:** Prefer additive, backward-compatible migrations (new columns nullable, new tables). Avoid destructive changes in a release that ships the same day. If a rollback script exists, keep it in version control and runbook.

**Logging and audit:** Application logs (request errors 4xx/5xx, security-relevant events such as login failure and permission denied) are sent to **Better Stack** for aggregation, search, and alerting. Audit trail: record admin actions (achievement approve/reject, payment export, directory export, gallery delete, reunion content update) in the `audit_log` table (actor_id, action, resource_type, resource_id, timestamp) or equivalent for compliance and support; optionally also emit these events to Better Stack for a single view.

**Required Environment Variables**

- `DATABASE_URL`, `REDIS_URL`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `BLOB_READ_WRITE_TOKEN`
- `AUTH_SECRET`
- `RESEND_API_KEY`
- Contact form: `CONTACT_EMAIL_DIRECTORY`, `CONTACT_EMAIL_REUNION`, `CONTACT_EMAIL_PAYMENTS`, `CONTACT_EMAIL_MEDIA` (or single `CONTACT_EMAIL_DEFAULT`)
- Logging: `BETTER_STACK_SOURCE_TOKEN` (or `LOGTAIL_SOURCE_TOKEN`) for Better Stack log ingestion when using the SDK

---

## 9. Background Jobs

**Birthday email reminders:** Send opt-in birthday reminders (per `family_members.birthday_email_notifications`) via a scheduled job. Use **Vercel Cron** (or equivalent) to trigger a serverless function daily (e.g. 8:00 AM user timezone or fixed UTC). Job: query members with `birth_date` = tomorrow and `birthday_email_notifications = true`, send reminder email to configured recipients. Template and copy defined in implementation.

---

## 10. Maintenance & Support

**Regular Maintenance**

- Weekly database backups (30-day retention)
- Monthly dependency updates
- Quarterly performance audits
- Annual security testing

**Support Priority Levels**

- **P1 - Critical:** Site down, payment failures (2h response)
- **P2 - High:** Feature broken, data issues (24h response)
- **P3 - Medium:** Minor bugs, UI issues (72h response)
- **P4 - Low:** Feature requests, enhancements (2 week response)

---

## 11. Future Roadmap (Phase 2-3)

- Live-stream reunion capability
- Family merchandise store
- Interactive genealogy tree explorer
- AI-powered photo tagging
- React Native mobile app
- Elder voice recordings archive

---

## 12. Success Criteria

| ID | Criteria |
| --- | --- |
| AC-1 | Homepage loads in < 2.5s on broadband (stretch target < 2s where possible) |
| AC-2 | Secure online payment processing functional |
| AC-3 | Directory access restricted to authenticated members |
| AC-4 | Achievements auto-publish after admin approval |
| AC-5 | Media uploads complete without timeout (< 500MB/batch) |
| AC-6 | Zero breaking changes from dependency updates |

---

## 13. Launch Checklist

**Pre-Launch**

- [ ]  Database migrations tested
- [ ]  Environment variables configured
- [ ]  SSL certificate active
- [ ]  Domain DNS configured
- [ ]  Stripe webhooks configured (live mode)
- [ ]  Email service verified
- [ ]  Admin accounts created
- [ ]  Initial data imported
- [ ]  Backup strategy tested
- [ ]  Monitoring configured

**Post-Launch**

- [ ]  Smoke tests passed
- [ ]  Performance within targets
- [ ]  Security scan completed
- [ ]  User acceptance testing
- [ ]  Admin training completed
- [ ]  Support contact published

---

## 14. Approval

| Role | Name | Status |
| --- | --- | --- |
| Lead Architect | *AI-Generated* | ☐ Approved |
| Reunion Committee Chair | _ | ☐ Approved |
| Finance Lead | _ | ☐ Approved |
| Website Admin | _ | ☐ Approved |