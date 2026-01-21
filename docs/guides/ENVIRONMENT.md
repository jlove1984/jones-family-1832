# Environment Setup

Configure environment variables for local development and production.

## What Are Environment Variables?

Environment variables are key-value pairs stored outside your code that change behavior based on the environment. They're essential for:
- Keeping secrets out of version control
- Different configurations per environment (dev/prod)
- Sensitive information (API keys, database URLs)

## Getting Started

### 1. Create `.env.local`

Copy the example file:
```bash
cp .env.example .env.local
```

### 2. Edit `.env.local`

Open the file and fill in your configuration:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/jones_family"

# Authentication Secret
BETTER_AUTH_SECRET="your-super-secret-key"

# Stripe (optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# Optional API URL
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 3. Never Commit `.env.local`

The file is already in `.gitignore` and won't be committed.

## Environment Variables Reference

### Database

#### `DATABASE_URL` (Required)

PostgreSQL connection string for the database.

**Format:**
```
postgresql://username:password@host:port/database
```

**Examples:**

Development (Local):
```
postgresql://postgres:password@localhost:5432/jones_family
```

Production (Cloud):
```
postgresql://user123:secure_pwd@db.example.com:5432/jones_family
```

**Getting your connection string:**
- **Local PostgreSQL:** `psql` → `\conninfo` shows current connection
- **Heroku:** Settings → Database URL
- **Railway:** Variables → copy DATABASE_URL
- **Supabase:** Project Settings → Database → URI

### Authentication

#### `BETTER_AUTH_SECRET` (Required)

Secret key for authentication encryption. Generate a strong random string:

```bash
# Generate a secure secret
openssl rand -base64 32
# or
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Use this in:**
- Development: Any strong random string
- Production: Use platform's secret generator

### Payment Processing (Optional)

#### `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

Stripe public key (safe to expose in frontend).

**Get from:** Stripe Dashboard → Developers → API Keys

**Format:**
```
pk_test_...  (development)
pk_live_...  (production)
```

#### `STRIPE_SECRET_KEY`

Stripe secret key (keep private, server-only).

**Get from:** Stripe Dashboard → Developers → API Keys

**Format:**
```
sk_test_...  (development)
sk_live_...  (production)
```

### Optional Variables

#### `NEXT_PUBLIC_API_URL`

Base URL for API requests. Useful if frontend and backend are on different domains.

**Examples:**
```env
# Development
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Production
NEXT_PUBLIC_API_URL="https://jonesfamily1832.com"
```

## Public vs. Private Variables

### Public Variables

Prefixed with `NEXT_PUBLIC_` and exposed to browser:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**Safe to expose:**
- API keys meant for frontend
- Configuration values
- Feature flags

**Accessible in browser as:**
```typescript
console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
```

### Private Variables

NOT prefixed and only available on server:

```env
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_secret_...
BETTER_AUTH_SECRET=secret_key
```

**Never exposed to browser**

**Accessible only in:**
- API routes (`app/api/`)
- Server components
- Server-side utilities

## Setup by Environment

### Local Development

Create `.env.local` with:

```env
# Local development database
DATABASE_URL="postgresql://postgres:password@localhost:5432/jones_family"

# Any secure secret for auth
BETTER_AUTH_SECRET="dev-secret-key-change-in-production"

# Optional - Use test Stripe keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
```

### Production (Vercel)

1. Go to Vercel Project Settings
2. Select "Environment Variables"
3. Add each variable:
   - `DATABASE_URL` → Production database URL
   - `BETTER_AUTH_SECRET` → Strong secret (use `openssl rand -base64 32`)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → Live Stripe key
   - `STRIPE_SECRET_KEY` → Live Stripe secret

4. Select which environments: Production, Preview, Development
5. Save

### Production (Docker/Self-Hosted)

Pass environment variables when starting:

```bash
docker run \
  -e DATABASE_URL="postgresql://..." \
  -e BETTER_AUTH_SECRET="secret" \
  -e STRIPE_SECRET_KEY="sk_..." \
  jones-family-hub
```

Or create `.env` file:

```bash
# .env (production)
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=secret
STRIPE_SECRET_KEY=sk_...

# Start with env file
node server.js --env-file=.env
```

## Getting Database Connection Strings

### PostgreSQL (Local)

Install PostgreSQL, then:

```bash
# Start PostgreSQL (macOS)
brew services start postgresql

# Start PostgreSQL (Windows)
# Use PostgreSQL installer or WSL

# Connect and create database
psql -U postgres
CREATE DATABASE jones_family;

# Connection string
postgresql://postgres:password@localhost:5432/jones_family
```

### Supabase (Free Cloud)

1. Go to [supabase.com](https://supabase.com)
2. Create project
3. Go to Settings → Database → URI
4. Copy connection string with your password

### Railway (Easy)

1. Create project on [railway.app](https://railway.app)
2. Add PostgreSQL plugin
3. Copy `DATABASE_URL` variable

### AWS RDS

1. Create RDS instance
2. Get endpoint from AWS console
3. Format: `postgresql://user:pass@endpoint:5432/dbname`

### Heroku Postgres

1. Add Postgres addon: `heroku addons:create heroku-postgresql:hobby-dev`
2. Get URL: `heroku config | grep DATABASE_URL`

## Troubleshooting Environment Variables

### Variables Not Loading

```bash
# Restart dev server
pnpm dev

# Verify file exists
ls -la .env.local

# Check file format (no spaces around =)
DATABASE_URL=postgresql://...  # ✅ Correct
DATABASE_URL = postgresql://...  # ❌ Wrong
```

### Connection String Issues

**Invalid format:**
```
DATABASE_URL=postgres://user:pass@host/db  # Missing port
```

**Correct format:**
```
DATABASE_URL=postgresql://user:pass@host:5432/db
```

### Wrong Environment Loaded

```bash
# Check which variables are loaded
console.log(process.env.DATABASE_URL)

# During build, check with
node -e "console.log(process.env.DATABASE_URL)"
```

### Public Variable Not Accessible

```bash
# ❌ Private - won't expose
SECRET_KEY=...

# ✅ Public - exposed to browser
NEXT_PUBLIC_API_URL=...
```

## Best Practices

✅ **Do:**
- Use strong secrets (32+ characters)
- Keep `.env.local` in `.gitignore`
- Use different secrets per environment
- Rotate secrets regularly
- Use platform secret managers
- Document required variables

❌ **Don't:**
- Commit `.env.local` to git
- Share secrets in code/comments
- Use weak secrets
- Use production secrets for development
- Expose private keys in frontend
- Log sensitive values

## Environment Variable Template

```env
# Database (Required)
DATABASE_URL=postgresql://

# Authentication (Required)
BETTER_AUTH_SECRET=

# Stripe (Optional - for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# API (Optional)
NEXT_PUBLIC_API_URL=http://localhost:3000

# Email (Future - Optional)
SENDGRID_API_KEY=

# Monitoring (Future - Optional)
SENTRY_DSN=
```

## Quick Links

- **[Getting Started Guide](./GETTING_STARTED.md)** - Project setup
- **[Deployment Guide](./DEPLOYMENT.md)** - Production deployment
- **[Troubleshooting](./TROUBLESHOOTING.md)** - Common issues

## Support

For help:
1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Review [docs/INDEX.md](../INDEX.md)
3. Create an issue on GitHub
