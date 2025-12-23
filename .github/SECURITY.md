# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of Rolls & Responders seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do Not Open a Public Issue

Please **do not** report security vulnerabilities through public GitHub issues.

### 2. Report Privately

Instead, please report them via:

- **GitHub Security Advisories**: [Report a vulnerability](https://github.com/joris-decombe/rolls-and-responders-app/security/advisories/new)
- **Email**: Create a private security advisory on GitHub (preferred)

### 3. Include Details

Please include the following information:

- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### 4. What to Expect

- **Acknowledgment**: We'll acknowledge your report within 48 hours
- **Investigation**: We'll investigate and determine the severity
- **Fix**: We'll work on a fix and release timeline
- **Credit**: We'll credit you in the release notes (unless you prefer to remain anonymous)

## Security Update Process

When a security vulnerability is confirmed:

1. We'll create a security advisory
2. Develop and test a fix
3. Release a patch version (e.g., 1.0.1)
4. Publish a security advisory with details
5. Update affected users through release notes

## Security Best Practices for Users

When deploying Rolls & Responders:

### 1. Keep Updated

Always use the latest version:

```bash
git pull origin main
npm install
npm run build
```

### 2. Secure Deployment

- Serve the application over HTTPS
- Use appropriate Content Security Policy headers
- Sanitize any custom scenario content
- Review scenario data before running exercises

### 3. Data Privacy

- Player names and session data are stored in browser localStorage
- No data is transmitted to external servers
- Clear browser data after sensitive exercises
- Be mindful of PII in custom scenarios

### 4. Access Control

- Control who can access the facilitator console
- Use separate browser windows/tabs for facilitator and player views
- Ensure facilitator information isn't visible to participants
- Clear localStorage after exercises: `localStorage.removeItem('rr_gamestate')`

## Known Limitations

### localStorage Security

This application uses browser localStorage for state management:

- Data persists in the browser
- Can be viewed through browser developer tools
- Not encrypted in browser storage
- Suitable for training scenarios, not production incident data

### No Server-Side Storage

- All game state is client-side only
- No authentication or authorization
- Suitable for controlled training environments
- Not designed for public internet deployment

## Security Scope

### In Scope

- Client-side vulnerabilities (XSS, injection, etc.)
- Data handling in scenario content
- Build process security
- Dependency vulnerabilities

### Out of Scope

- Social engineering attacks
- Physical security
- DDoS attacks on self-hosted deployments
- Issues in third-party scenario content not maintained by us

## Dependencies

We use automated tools to monitor dependencies:

- **Dependabot**: Automated dependency updates
- **npm audit**: Regular security audits
- **CI/CD**: Automated security checks on all PRs

Check current dependency status:

```bash
npm audit
```

## Responsible Disclosure

We follow coordinated vulnerability disclosure principles:

1. **Report** vulnerabilities privately
2. **Wait** for our acknowledgment and fix
3. **Coordinate** public disclosure timing
4. **Credit** will be given to reporters

We ask for at least **90 days** before public disclosure to allow time for a fix and user updates.

## Contact

For security concerns:

- **Security Advisories**: [GitHub Security](https://github.com/joris-decombe/rolls-and-responders-app/security)
- **General Issues**: [GitHub Issues](https://github.com/joris-decombe/rolls-and-responders-app/issues)

## License and Attribution

This application is based on NCSC NZ Rolls & Responders, licensed under Creative Commons Attribution 4.0. Security fixes maintain this license.

---

*Last updated: December 2025*
