# Ethical Scraping Guide for WhytCard

## Introduction

Web scraping is at the core of the WhytCard project, but it must be conducted in an ethical, responsible, and legal manner. This guide defines the principles and practices to follow to ensure that all scraping activities respect the rights of website owners, applicable laws, and ethical standards.

## Table of Contents

1. [Fundamental Principles](#fundamental-principles)
2. [Legal Aspects](#legal-aspects)
3. [Technical Best Practices](#technical-best-practices)
4. [Resource Respect](#resource-respect)
5. [Personal Data Protection](#personal-data-protection)
6. [Documentation and Transparency](#documentation-and-transparency)
7. [Special Cases](#special-cases)
8. [Ethical Scraping Checklist](#ethical-scraping-checklist)

## Fundamental Principles

### Ethical Scraping Philosophy

Ethical scraping is based on three fundamental principles:

1. **Respect**: Respect website owners, their terms of use, and their resources
2. **Proportionality**: Extract only necessary data with minimal impact
3. **Transparency**: Be transparent about the bot's identity and scraping intentions

### WhytCard's Values Regarding Scraping

As the WhytCard project, we commit to:

- Never harm the websites we scrape
- Strictly respect explicit and implicit rules of websites
- Be transparent about our identity and objectives
- Use data responsibly and in accordance with our mission
- Prioritize official APIs when available

## Legal Aspects

### General Legal Framework

Web scraping is subject to several legal frameworks that vary by country:

- **Copyright**: Website content is generally protected by copyright
- **Terms of Use**: Website ToS may explicitly prohibit scraping
- **Data Protection**: Laws like GDPR in Europe protect personal data
- **Unauthorized Access**: Some jurisdictions criminalize unauthorized access to computer systems

### Notable Case Law

Some important court decisions regarding scraping:

- **hiQ Labs v. LinkedIn** (USA): Established that scraping public data is not necessarily illegal
- **Ryanair v. PR Aviation** (EU): Confirmed that terms of use can contractually limit scraping
- **QVC v. Resultly** (USA): Emphasized the importance of not overloading servers

### Legal Compliance for WhytCard

To stay legal:

1. **Always check ToS** before scraping a site
2. **Respect "noindex" and "nofollow"** tags in meta tags
3. **Never circumvent technical protection measures** (CAPTCHA, access limitations)
4. **Document your practices** to demonstrate good faith
5. **Consult a lawyer** if in doubt about the legality of a scraping operation

## Technical Best Practices

### Respecting robots.txt

The robots.txt file defines access rules for robots:

```python
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse

def is_allowed(url, user_agent="WhytCardBot/1.0"):
    """Checks if the URL can be scraped according to robots.txt."""
    rp = RobotFileParser()
    rp.set_url(f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt")
    rp.read()
    return rp.can_fetch(user_agent, url)
```

### Proper Identification

Always use a User-Agent that clearly identifies your bot:

```python
headers = {
    'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot; bot@whytcard.com)',
    # Other headers...
}
```

### Request Delays

Implement reasonable delays between requests:

```python
import time
import random

def polite_request(url, session, min_delay=1, max_delay=3):
    """Makes a request with a polite delay between requests."""
    # Wait for a random delay
    delay = random.uniform(min_delay, max_delay)
    time.sleep(delay)
    
    # Make the request
    response = session.get(url, headers=headers)
    return response
```

### Error Handling

Respect HTTP error codes and adapt your behavior accordingly:

```python
async def respectful_fetch(url, session):
    """Fetches a URL in a respectful manner."""
    try:
        async with session.get(url, headers=headers) as response:
            if response.status == 200:
                return await response.text()
            elif response.status == 429:  # Too Many Requests
                # Wait longer before retrying
                wait_time = int(response.headers.get('Retry-After', 60))
                logger.info(f"Rate limited, waiting {wait_time} seconds")
                await asyncio.sleep(wait_time)
                return await respectful_fetch(url, session)
            elif response.status in (403, 404):
                # Don't retry 403/404 errors
                logger.warning(f"Access denied or not found: {url}")
                return None
            else:
                # Wait and retry for other errors
                logger.warning(f"Error {response.status} for {url}, retrying in 5s")
                await asyncio.sleep(5)
                return await respectful_fetch(url, session)
    except Exception as e:
        logger.error(f"Exception while fetching {url}: {str(e)}")
        return None
```

## Resource Respect

### Rate Limiting

Adapt your request rate to the size and resources of the target site:

- **Large commercial sites**: 1 request every 1-3 seconds
- **Medium-sized sites**: 1 request every 3-10 seconds
- **Small sites**: 1 request every 10-60 seconds or more

### Scraping Periods

Favor low-traffic periods for intensive operations:

- **Off-peak hours**: Prefer nights or weekends
- **Avoid peaks**: Don't scrape during known peak periods
- **Be adaptive**: Reduce your rate if you detect slowdowns

### Impact Minimization

Techniques to reduce impact on target servers:

1. **Smart caching**: Don't retrieve the same page multiple times
2. **Selectivity**: Only retrieve pages you actually need
3. **Compression**: Request compressed responses to reduce bandwidth
4. **Efficient pagination**: Respect the site's pagination structure

## Personal Data Protection

### Identifying Personal Data

Be vigilant about the types of data you collect:

- **Direct identification data**: Names, emails, phones, addresses
- **Indirect identification data**: User IDs, pseudonyms
- **Sensitive data**: Political opinions, health, sexual orientation

### GDPR Principles to Respect

If you operate in Europe or collect data from Europeans:

1. **Minimization**: Only collect strictly necessary data
2. **Purpose**: Only use data for intended purposes
3. **Limited retention**: Delete data when no longer needed
4. **Security**: Protect collected data against unauthorized access

### Data Anonymization

Techniques to anonymize personal data:

```python
import hashlib
import re

def anonymize_email(email):
    """Anonymizes an email address."""
    if not email:
        return None
    
    # Hash the email address
    hashed = hashlib.sha256(email.encode()).hexdigest()[:10]
    domain = email.split('@')[-1]
    
    return f"anon_{hashed}@{domain}"

def anonymize_phone(phone):
    """Anonymizes a phone number."""
    if not phone:
        return None
    
    # Keep only digits
    digits = re.sub(r'\D', '', phone)
    
    # Mask all digits except the last 2
    if len(digits) > 2:
        return "X" * (len(digits) - 2) + digits[-2:]
    return "X" * len(digits)
```

## Documentation and Transparency

### Documenting Scraping Activities

Always document your scraping activities:

- **Purpose**: Why is this data being collected?
- **Method**: How is it being collected?
- **Storage**: Where and how is it stored?
- **Usage**: How will it be used?
- **Deletion**: When will it be deleted?

### Contact and Opt-out

Always provide a way to contact you:

1. **Information page**: Create a dedicated page explaining your bot (e.g., whytcard.com/bot)
2. **Contact email**: Provide an email address in your User-Agent
3. **Opt-out mechanism**: Allow sites to request exclusion

### Activity Logging

Maintain detailed logs of your scraping activities:

```python
import logging
from datetime import datetime

# Logger configuration
logging.basicConfig(
    filename=f"scraping_log_{datetime.now().strftime('%Y%m%d')}.log",
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def log_scraping_activity(url, success, data_points=0):
    """Logs a scraping activity."""
    logging.info(f"URL: {url}, Success: {success}, Data points: {data_points}")
```

## Special Cases

### API vs Scraping

Priority order for data collection:

1. **Official APIs**: Always prioritize official APIs when they exist
2. **Public data feeds**: Use RSS, XML, or JSON feeds if available
3. **Scraping**: Only use scraping as a last resort

### Sites with Authentication

For sites requiring authentication:

- **Explicit authorization**: Obtain written authorization from the site
- **ToS respect**: Ensure the ToS allow automated use
- **Limitations**: Strictly respect usage limitations

### Dynamic Content (JavaScript)

For sites using a lot of JavaScript:

```python
from playwright.async_api import async_playwright

async def scrape_dynamic_content(url):
    """Scrape content generated by JavaScript."""
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        # Configure User-Agent
        await page.set_extra_http_headers({
            'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot)'
        })
        
        # Load the page and wait for network to be idle
        await page.goto(url)
        await page.wait_for_load_state('networkidle')
        
        # Extract content
        content = await page.content()
        
        await browser.close()
        return content
```

## Ethical Scraping Checklist

Before each scraping project, check the following points:

### Preparation
- [ ] Check target site's ToS
- [ ] Check robots.txt file
- [ ] Search for API or alternatives to scraping
- [ ] Clear definition of necessary data
- [ ] Documentation of scraping purpose

### Technical Configuration
- [ ] Identifiable and transparent User-Agent
- [ ] Rate limiting mechanism
- [ ] Cache system to avoid redundant requests
- [ ] Appropriate handling of errors and HTTP codes
- [ ] Activity logging

### Execution
- [ ] Monitoring of target site performance
- [ ] Dynamic rate adjustment if needed
- [ ] Respect for server indications (429, Retry-After)
- [ ] Immediate stop if a problem is detected

### Post-processing
- [ ] Anonymization of personal data
- [ ] Secure data storage
- [ ] Time-limited retention
- [ ] Documentation of collected data

## Conclusion

Ethical scraping is a balance between data access and respecting the rights and resources of website owners. By following these principles and practices, the WhytCard project can collect necessary data while maintaining a responsible and respectful approach.

Remember that scraping ethics is not just a matter of legal compliance, but also of responsibility towards the web ecosystem as a whole. Respectful scraping contributes to a more open and sustainable web for everyone.

---

Last updated: 2025-01-15 