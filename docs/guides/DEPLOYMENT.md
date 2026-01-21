# Deployment Guide

Instructions for deploying Jones Family Hub to production environments.

## Supported Platforms

### Vercel (Recommended)

Vercel is the creators of Next.js and provides the best experience for Next.js apps.

#### Prerequisites
- Vercel account ([sign up free](https://vercel.com))
- Git repository pushed to GitHub, GitLab, or Bitbucket

#### Deployment Steps

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your repository
   - Click "Import"

2. **Configure Environment Variables**
   - Add all required `.env` variables in Vercel dashboard
   - Settings → Environment Variables

3. **Deploy**
   - Vercel automatically deploys on push to main branch
   - Watch deployment progress in Vercel dashboard

#### Required Environment Variables

```env
# Database
DATABASE_URL=postgresql://...

# Authentication
BETTER_AUTH_SECRET=your-secret-key

# Stripe (if payment enabled)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
```

#### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records with Vercel nameservers

### Other Platforms

#### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Copy source
COPY . .

# Build
RUN pnpm build

# Expose port
EXPOSE 3000

# Start server
CMD ["pnpm", "start"]
```

Build and run:
```bash
docker build -t jones-family-hub .
docker run -p 3000:3000 jones-family-hub
```

#### Railway

1. Push repository to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "New Project" → Select GitHub repository
4. Add environment variables
5. Deploy automatically

#### AWS/Azure/Google Cloud

See platform-specific Next.js deployment guides:
- [AWS](https://aws.amazon.com/getting-started/projects/next-js/)
- [Azure](https://azure.microsoft.com/en-us/blog/how-to-deploy-next-js-applications-to-azure-app-service/)
- [Google Cloud](https://cloud.google.com/solutions/deploy-nextjs-to-cloud-run)

## Pre-Deployment Checklist

Before deploying to production:

```bash
# 1. Verify build succeeds
pnpm build

# 2. Check all tests pass
pnpm type-check
pnpm lint

# 3. Test production build locally
pnpm start

# 4. Check environment variables are set
# Review .env.example and ensure all are configured

# 5. Verify database connection
# Test DATABASE_URL in production environment

# 6. Run performance audit
# Check lighthouse scores

# 7. Security audit
# Run `npm audit` to check for vulnerabilities
```

## Environment Variables

### Development

Create `.env.local`:
```env
DATABASE_URL=postgresql://localhost:5432/jones_family
BETTER_AUTH_SECRET=dev-secret
```

### Production

Set in deployment platform:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ Yes |
| `BETTER_AUTH_SECRET` | Authentication secret | ✅ Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key | ❌ No |
| `STRIPE_SECRET_KEY` | Stripe secret key | ❌ No |
| `NEXT_PUBLIC_API_URL` | API base URL | ❌ No |

### Secret Management

**Never commit secrets to version control:**

```bash
# ❌ Wrong - Secrets in file
echo "DATABASE_URL=postgres://..." >> .env

# ✅ Correct - Add to .gitignore
echo ".env.local" >> .gitignore

# ✅ Correct - Set in deployment platform
# Use Vercel/Railway/Docker secret management
```

## Database Setup

### PostgreSQL Connection

1. **Create database**
   ```bash
   psql -U postgres
   CREATE DATABASE jones_family;
   ```

2. **Run migrations** (when implemented)
   ```bash
   pnpm migrate:prod
   ```

3. **Set connection string**
   ```
   DATABASE_URL=postgresql://user:password@host:5432/jones_family
   ```

### Backup & Recovery

**Backup database:**
```bash
pg_dump -U postgres -h host jones_family > backup.sql
```

**Restore database:**
```bash
psql -U postgres -h host -d jones_family < backup.sql
```

## Monitoring

### Health Check

The `/api/health` endpoint can be used for monitoring:

```bash
# Check server health
curl https://jonesfamily1832.com/api/health
```

### Vercel Analytics

1. Go to Project Settings → Analytics
2. Enable Web Analytics
3. View performance metrics

### Error Tracking (Future)

When implemented, integrate error tracking:
- Sentry
- Rollbar
- LogRocket

## CI/CD Pipeline (Future)

Automated deployment workflow:

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install & Build
        run: |
          pnpm install
          pnpm build
          pnpm type-check
      - name: Deploy
        run: vercel deploy --prod
```

## Performance Optimization

### Build Optimization

The app uses several optimizations:

- **Turbopack** - Fast build with `next dev --turbopack`
- **Image optimization** - Next.js Image component
- **Font loading** - System fonts optimized with `display: 'swap'`
- **Code splitting** - Dynamic imports for heavy components

### Runtime Optimization

- **Caching headers** - Set for static assets
- **Database connection pooling** - Reuse database connections
- **API response caching** - Cache stable data

### Monitoring Performance

```bash
# Build analysis
pnpm build --analyze

# Lighthouse audit
npx lighthouse https://jonesfamily1832.com
```

## Rollback Strategy

If something breaks in production:

1. **Quick fix**
   ```bash
   # Make fix locally
   git commit -m "fix: ..."
   git push origin main
   # Vercel auto-deploys
   ```

2. **Revert to previous**
   ```bash
   git revert <commit>
   git push origin main
   ```

3. **Manual rollback**
   - Go to Vercel dashboard
   - Select previous deployment
   - Click "Promote to Production"

## SSL/TLS Certificates

### Vercel

Automatically provides free SSL certificates for all deployments.

### Custom Domain

1. Enable HTTPS in domain settings
2. Vercel auto-configures Let's Encrypt

### Self-Hosted

```bash
# Using certbot for Let's Encrypt
certbot certonly --standalone -d jonesfamily1832.com
```

## Logging

### Development

```bash
pnpm dev  # Logs output to console
```

### Production

Check logs in Vercel:
- Project → Deployments → Logs
- Real-time log streaming available

## Support & Troubleshooting

See [guides/TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues.

## Deployment Timeline

- **Dev branch** → Automatic preview deployments
- **Main branch** → Automatic production deployment
- **Releases** → Manual promotion with approval

## Rollout Strategy

1. **Small rollout** - Deploy to canary environment first
2. **Gradual rollout** - Increase traffic percentage
3. **Full rollout** - When confident, go to 100%
4. **Monitor** - Watch metrics for 24 hours
5. **Success** - Deployment complete

## Cost Estimation

### Vercel
- Free tier sufficient for hobby projects
- Production tier: ~$20/month starting

### Database (PostgreSQL)
- Supabase: Free tier includes 500MB
- AWS RDS: Starting ~$15/month
- Heroku Postgres: Starting ~$7/month

### Other Services
- Stripe: 2.9% + $0.30 per transaction
- Sendgrid (email): Free tier includes 100/day

## Resources

- **[Vercel Docs](https://vercel.com/docs)** - Vercel deployment
- **[Next.js Deployment](https://nextjs.org/docs/deployment)** - Deployment patterns
- **[Environment Variables](./ENVIRONMENT.md)** - Configuration guide
- **[Troubleshooting](./TROUBLESHOOTING.md)** - Common issues
