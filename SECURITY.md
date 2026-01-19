# Security Policy

## Supported Versions

Currently supported versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 0.0.x   | :white_check_mark: |

## Security Status

### Last Audit: 2026-01-19

#### Resolved Vulnerabilities ✅

The following security vulnerabilities have been fixed:

1. **React Router (High)** - XSS via Open Redirects
   - **Status**: Fixed ✅
   - **CVE**: GHSA-2w69-qvjg-hvjx
   - **Action**: Updated `react-router-dom` to 6.30.2+

2. **React Router (Moderate)** - External Redirect via Untrusted Paths
   - **Status**: Fixed ✅
   - **CVE**: GHSA-9jcx-v3wj-wh4m
   - **Action**: Updated `react-router` to 6.30.2+

3. **glob (High)** - Command Injection via CLI
   - **Status**: Fixed ✅
   - **CVE**: GHSA-5j98-mcp5-4vw2
   - **Action**: Updated to glob 10.5.0+

4. **js-yaml (Moderate)** - Prototype Pollution
   - **Status**: Fixed ✅
   - **CVE**: GHSA-mh29-5h37-fv8m
   - **Action**: Updated to js-yaml 4.1.1+

#### Known Issues (Not Critical) ⚠️

1. **esbuild (Moderate)** - Development Server CORS Issue
   - **Status**: Accepted Risk ⚠️
   - **CVE**: GHSA-67mh-4wv8-2f99
   - **Severity**: Moderate
   - **Impact**: Only affects development server, not production
   - **Affected**: esbuild <=0.24.2 (transitive dependency via vite)
   - **Mitigation**: This vulnerability only affects the development server and does not impact production builds. The development server should only be used in trusted local environments.
   - **Resolution Plan**: Will be resolved when upgrading to Vite 7.x (breaking change)

2. **Vite (Low)** - File Serving Issues
   - **Status**: Accepted Risk ⚠️
   - **Severity**: Low
   - **Impact**: Development server file access control
   - **Mitigation**: Only affects development environment, not production

## Best Practices

### Code Security

- ✅ **Type Safety**: All code uses TypeScript with strict mode
- ✅ **Input Validation**: Forms validated with Zod schemas
- ✅ **No XSS**: React's built-in XSS protection
- ✅ **Secure Dependencies**: Regular dependency audits

### Authentication & Authorization

- ✅ **JWT Tokens**: Secure token-based authentication via Supabase
- ✅ **Row Level Security (RLS)**: Database-level access control
- ✅ **Session Management**: Secure session handling
- ✅ **Password Security**: Handled by Supabase Auth

### Data Protection

- ✅ **HTTPS Only**: All production traffic over HTTPS
- ✅ **Environment Variables**: Sensitive data in env vars, not code
- ✅ **No Secrets in Repo**: All credentials excluded from version control
- ✅ **Data Encryption**: Database encryption at rest (Supabase)

### API Security

- ✅ **Rate Limiting**: Supabase provides built-in rate limiting
- ✅ **CORS Configuration**: Properly configured CORS policies
- ✅ **Input Sanitization**: All user inputs validated and sanitized

## Reporting a Vulnerability

If you discover a security vulnerability, please follow these steps:

### 1. Do Not Publish

**Please do not** create a public GitHub issue for the vulnerability.

### 2. Report Privately

Send details to: **security@example.com** (Replace with actual security contact)

Include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### 3. Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: 1-3 days
  - High: 3-7 days
  - Medium: 7-14 days
  - Low: 14-30 days

### 4. Disclosure Policy

- We follow responsible disclosure practices
- Coordinated public disclosure after fix is deployed
- Credit given to reporter (if desired)

## Security Updates

### Staying Updated

To stay informed about security updates:

1. Watch this repository for security advisories
2. Subscribe to release notifications
3. Run `npm audit` regularly in your fork

### Updating Dependencies

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities (non-breaking)
npm audit fix

# Fix all vulnerabilities (may include breaking changes)
npm audit fix --force

# Update all dependencies
npm update
```

### Regular Maintenance

We perform security audits:

- Before each release
- Monthly scheduled audits
- When notified of vulnerabilities
- After significant dependency updates

## Security Checklist for Contributors

When contributing code, ensure:

- [ ] No hardcoded secrets or credentials
- [ ] User input is validated and sanitized
- [ ] Proper error handling (no sensitive data in errors)
- [ ] Authentication checks for protected routes
- [ ] Database queries use parameterized statements
- [ ] File uploads are validated and size-limited
- [ ] HTTPS used for all external API calls
- [ ] Dependencies are up to date and audited

## Development Security

### Local Development

- Use `.env.local` for local secrets (never commit)
- Keep development database separate from production
- Use test data, not production data
- Run behind firewall or VPN when testing sensitive features

### CI/CD Security

- Secrets stored in GitHub Secrets (or similar)
- Environment variables injected at build/deploy time
- No secrets in build logs
- Automated security scanning in CI pipeline

## Production Security

### Deployment Checklist

- [ ] Environment variables configured
- [ ] HTTPS enabled and enforced
- [ ] Database RLS policies active
- [ ] Authentication configured correctly
- [ ] CORS policies restrictive
- [ ] Error reporting configured (no sensitive data)
- [ ] Backup system in place
- [ ] Monitoring and alerting active

### Monitoring

We monitor for:

- Unusual authentication patterns
- Failed login attempts
- Unauthorized access attempts
- Performance anomalies
- Error rate spikes

## Compliance

### Data Privacy

- GDPR considerations for EU users
- Data retention policies documented
- User data export/deletion capabilities
- Privacy policy published

### Standards

- Following OWASP Top 10 guidelines
- Regular security best practices review
- Code review for security issues
- Penetration testing (as needed)

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Supabase Security Best Practices](https://supabase.com/docs/guides/security)
- [React Security Best Practices](https://react.dev/learn/securing-your-react-app)
- [npm Security Best Practices](https://docs.npmjs.com/security-best-practices)

## Contact

For security-related questions or concerns:

- **Email**: security@example.com
- **GitHub Security Advisory**: [Create Advisory](https://github.com/Krosebrook/enterprise-profile-studio/security/advisories/new)

---

Last Updated: 2026-01-19
