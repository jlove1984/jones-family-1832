# Security Policy

## Reporting Security Issues

**Do not open public GitHub issues for security vulnerabilities.**

If you discover a security vulnerability, please email the maintainers directly with details. We will respond within 48 hours.

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if known)

## Security Best Practices

### For Developers

- ✅ Never commit secrets, API keys, or passwords
- ✅ Use environment variables for sensitive data
- ✅ Validate and sanitize all user input
- ✅ Keep dependencies updated
- ✅ Follow OWASP guidelines
- ✅ Use TypeScript strict mode
- ✅ Enable security headers in production

### For Users

- ✅ Use strong passwords
- ✅ Enable two-factor authentication (when available)
- ✅ Keep software updated
- ✅ Report suspicious activity
- ✅ Use HTTPS only

## Dependency Management

### Updating Dependencies

```bash
# Check for vulnerabilities
npm audit
pnpm update

# Review and test
pnpm build
pnpm type-check
pnpm test
```

### Known Vulnerabilities

We monitor and update dependencies regularly. If you find a vulnerability:

1. Check npm audit
2. Update the dependency
3. Test thoroughly
4. Report if not fixable

## Authentication & Authorization

- All authentication will use Better Auth
- Passwords are hashed with industry standards
- No sensitive data stored in localStorage
- Sessions expire after inactivity
- CSRF protection enabled

## Data Protection

### Database

- PostgreSQL with encryption in transit
- Connection strings use environment variables
- No secrets in code
- Regular backups maintained
- Access control implemented

### Personal Data

- Collected data used only for family hub
- GDPR compliant
- Users can request data deletion
- No data sold to third parties

## Production Security

### HTTPS

- SSL/TLS certificates on all connections
- Security headers configured
- HSTS enabled

### API Security

- Rate limiting on endpoints
- Input validation on all routes
- CORS properly configured
- Authentication required for sensitive endpoints

### Monitoring

- Error tracking enabled
- Security headers monitored
- Access logs reviewed
- Automated alerts for anomalies

## Incident Response

If a security incident occurs:

1. **Identify** - Quickly assess the issue
2. **Contain** - Limit the impact
3. **Notify** - Inform affected users
4. **Fix** - Apply security patch
5. **Review** - Prevent future incidents
6. **Document** - Update security measures

## Compliance

- GDPR compliant for EU users
- CCPA compliant for California users
- Industry security standards followed
- Regular security audits performed

## Bug Bounty

Currently, this is a family project without a formal bug bounty program. However, we appreciate security research and responsible disclosure.

## Contact

For security concerns, contact the maintainers directly rather than opening public issues.

---

Last Updated: January 2026
