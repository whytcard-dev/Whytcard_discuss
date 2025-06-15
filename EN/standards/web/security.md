# Web Security Standards

## Core Security Principles

- Defense in depth (multiple security layers)
- Principle of least privilege
- Secure by design and default
- Regular security testing and auditing
- Keep security dependencies updated
- Fail securely (safe defaults)
- Complete mediation (verify every request)
- Security education for all team members

## Authentication & Authorization

### Authentication

- Implement strong password policies
  - Minimum length: 12 characters
  - Require combination of characters, numbers, symbols
  - Check against common password lists
- Support multi-factor authentication (MFA)
- Use secure session management
  - HTTP-only cookies
  - Secure flag for HTTPS
  - SameSite attribute
  - Appropriate expiration
- Implement account lockout after failed attempts
- Secure password reset flows
- Use secure password storage (bcrypt/Argon2)
- Consider passwordless options (WebAuthn, magic links)

### Authorization

- Implement role-based access control (RBAC)
- Use attribute-based access control for complex permissions
- Validate authorization on every request
- Implement proper access control checks
- Use secure session handling
- Implement API authorization (OAuth 2.0, JWT)
- Avoid direct object references
- Log all access control failures

## Data Protection

### Sensitive Data

- Identify and classify sensitive data
- Encrypt sensitive data at rest
- Use TLS 1.3 for data in transit
- Implement proper key management
- Minimize collection of sensitive data
- Apply data minimization principles
- Implement secure data deletion
- Use secure storage for API keys and secrets

### Input Validation

- Validate all input on the server side
- Use parameterized queries for database access
- Implement input sanitization
- Validate for proper data types, length, format
- Use allowlists instead of denylists
- Implement context-specific output encoding
- Validate file uploads (type, size, content)
- Implement rate limiting for inputs

## Common Vulnerabilities Prevention

### Injection Prevention

- Use parameterized queries/prepared statements
- Apply ORM with proper escaping
- Validate and sanitize all inputs
- Implement context-aware output encoding
- Use safe APIs that avoid interpreter injection

### XSS Prevention

- Implement Content Security Policy (CSP)
- Use automatic output encoding
- Apply context-specific encoding
- Sanitize HTML input
- Use modern frameworks with built-in XSS protection
- Validate URLs in redirects
- Apply HTTPOnly flag to sensitive cookies

### CSRF Prevention

- Implement anti-CSRF tokens
- Use SameSite cookie attribute
- Verify origin and referrer headers
- Require re-authentication for sensitive actions
- Use proper CORS configuration

### Security Headers

- Content-Security-Policy (CSP)
- X-Content-Type-Options: nosniff
- Strict-Transport-Security (HSTS)
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy
- Cache-Control headers for sensitive data
- Clear-Site-Data for logout

## Infrastructure Security

### Server Security

- Keep server software updated
- Use secure server configurations
- Implement proper firewall rules
- Enable HTTPS only (redirect HTTP to HTTPS)
- Configure proper TLS settings
- Disable unnecessary services
- Use security-focused web server modules
- Implement rate limiting and DDoS protection

### API Security

- Use HTTPS for all API endpoints
- Implement proper authentication
- Apply rate limiting
- Validate request payloads
- Return appropriate status codes
- Avoid exposing sensitive information in responses
- Use API keys for service-to-service communication
- Document security requirements for API consumers

### Dependency Management

- Regularly scan for vulnerable dependencies
- Use lockfiles to pin dependency versions
- Implement automated vulnerability scanning
- Update dependencies promptly
- Minimize dependency usage
- Verify dependency integrity (checksums)
- Monitor for supply chain attacks
- Have a vulnerability response plan

## Security Testing

### Static Analysis

- Implement automated SAST tools
- Integrate security linting in CI/CD
- Scan for hardcoded secrets
- Analyze code for security anti-patterns
- Validate security configurations
- Check for outdated dependencies
- Enforce secure coding standards

### Dynamic Testing

- Perform regular penetration testing
- Implement automated DAST scanning
- Use interactive application security testing
- Conduct regular vulnerability assessments
- Test authentication and authorization flows
- Verify security headers and configurations
- Simulate common attack scenarios

## Security Monitoring & Response

### Logging & Monitoring

- Implement comprehensive security logging
- Log authentication events
- Log access control failures
- Monitor for suspicious activity
- Implement real-time alerting
- Use centralized log management
- Ensure logs are tamper-resistant
- Retain logs for appropriate time periods

### Incident Response

- Develop an incident response plan
- Define roles and responsibilities
- Establish communication protocols
- Document containment procedures
- Implement forensic analysis capabilities
- Conduct post-incident reviews
- Practice incident response scenarios
- Maintain contact with security community

## Compliance & Privacy

### Regulatory Compliance

- Identify applicable regulations (GDPR, CCPA, etc.)
- Implement required security controls
- Conduct regular compliance assessments
- Document compliance measures
- Train team on compliance requirements
- Implement privacy by design
- Maintain required documentation

### Privacy Considerations

- Implement clear privacy policies
- Obtain proper consent for data collection
- Provide data access and deletion mechanisms
- Minimize data collection and retention
- Implement data portability
- Conduct privacy impact assessments
- Consider privacy in all design decisions 