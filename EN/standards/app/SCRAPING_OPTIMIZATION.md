# Scraping Optimization Guide

## Introduction

Web scraping is a fundamental component of the WhytCard project, but it can be resource-intensive and present performance challenges. This guide outlines strategies and best practices for optimizing scraping operations to maximize efficiency while minimizing resource usage and impact on target websites.

## Table of Contents

1. [Fundamental Principles](#fundamental-principles)
2. [Distributed Architecture](#distributed-architecture)
3. [HTTP Request Optimization](#http-request-optimization)
4. [Parallelization and Concurrency](#parallelization-and-concurrency)
5. [HTML Parsing Optimization](#html-parsing-optimization)
6. [Resource Management](#resource-management)
7. [Monitoring and Profiling](#monitoring-and-profiling)
8. [Specialized Techniques](#specialized-techniques)

## Fundamental Principles

### Efficiency vs. Politeness

Scraping optimization must balance two sometimes conflicting goals:

1. **Efficiency**: Maximizing data collection speed and resource utilization
2. **Politeness**: Minimizing impact on target websites and respecting their resources

Always prioritize being a good web citizen over pure performance when these goals conflict.

### Key Metrics

When optimizing scraping operations, focus on these key metrics:

- **Pages per minute**: Rate of page collection
- **CPU usage**: Processing overhead
- **Memory usage**: RAM consumption
- **Network efficiency**: Bandwidth utilization
- **Error rate**: Failed requests percentage
- **Target server impact**: Load placed on scraped sites

## Distributed Architecture

### Task Distribution

For large-scale scraping, distribute tasks across multiple workers:

```python
# Example using Celery for distributed scraping
from celery import Celery

app = Celery('scraping_tasks', broker='redis://localhost:6379/0')

@app.task
def scrape_url(url):
    # Scraping logic
    return result

# Dispatch tasks
urls = ["https://example1.com", "https://example2.com", "https://example3.com"]
results = [scrape_url.delay(url) for url in urls]
```

### Load Balancing

Implement load balancing to distribute requests across multiple IP addresses or instances:

```python
class LoadBalancer:
    def __init__(self, proxies):
        self.proxies = proxies
        self.current_index = 0
        
    def get_next_proxy(self):
        proxy = self.proxies[self.current_index]
        self.current_index = (self.current_index + 1) % len(self.proxies)
        return proxy
```

### Proxy Rotation

Use proxy rotation to avoid IP-based rate limiting:

```python
async def fetch_with_proxy_rotation(url, proxy_manager, session):
    max_retries = 3
    retry_count = 0
    
    while retry_count < max_retries:
        proxy = proxy_manager.get_next_proxy()
        try:
            async with session.get(url, proxy=proxy, timeout=30) as response:
                if response.status == 200:
                    return await response.text()
                elif response.status == 429:  # Too Many Requests
                    # Mark this proxy as rate-limited
                    proxy_manager.mark_rate_limited(proxy)
                    retry_count += 1
                else:
                    retry_count += 1
        except Exception as e:
            # Mark this proxy as failed
            proxy_manager.mark_failed(proxy)
            retry_count += 1
    
    raise Exception(f"Failed to fetch {url} after {max_retries} retries")
```

## HTTP Request Optimization

### Connection Pooling

Reuse HTTP connections to reduce overhead:

```python
async def scrape_with_connection_pooling():
    # Create a single session for multiple requests
    async with aiohttp.ClientSession() as session:
        tasks = []
        for url in urls:
            tasks.append(fetch(url, session))
        
        return await asyncio.gather(*tasks)

async def fetch(url, session):
    async with session.get(url) as response:
        return await response.text()
```

### HTTP/2 Support

Use HTTP/2 when available to benefit from multiplexing:

```python
import httpx

async def fetch_with_http2():
    async with httpx.AsyncClient(http2=True) as client:
        response = await client.get("https://example.com")
        return response.text
```

### Compression

Request compressed responses to reduce bandwidth usage:

```python
headers = {
    'Accept-Encoding': 'gzip, deflate, br',
    'User-Agent': 'WhytCardBot/1.0'
}

async def fetch_with_compression(url, session):
    async with session.get(url, headers=headers) as response:
        return await response.text()
```

### Request Optimization

Only request what you need:

```python
# Only request necessary headers
headers = {
    'Accept': 'text/html',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'User-Agent': 'WhytCardBot/1.0'
}

# Use HEAD requests to check resources before GET
async def check_before_download(url, session):
    async with session.head(url) as response:
        if response.status == 200 and response.headers.get('Content-Type') == 'text/html':
            return await fetch_full_page(url, session)
        return None
```

## Parallelization and Concurrency

### Asynchronous Scraping

Use asynchronous programming to handle multiple requests concurrently:

```python
import asyncio
import aiohttp

async def scrape_all(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [scrape_one(url, session) for url in urls]
        return await asyncio.gather(*tasks, return_exceptions=True)

async def scrape_one(url, session):
    try:
        async with session.get(url, timeout=30) as response:
            if response.status == 200:
                html = await response.text()
                return parse_html(html)
            else:
                return None
    except Exception as e:
        logger.error(f"Error scraping {url}: {e}")
        return None
```

### Controlled Concurrency

Limit concurrency to avoid overwhelming resources:

```python
async def scrape_with_semaphore(urls, max_concurrent=10):
    semaphore = asyncio.Semaphore(max_concurrent)
    
    async def _scrape_with_limit(url):
        async with semaphore:
            return await scrape_url(url)
    
    async with aiohttp.ClientSession() as session:
        tasks = [_scrape_with_limit(url) for url in urls]
        return await asyncio.gather(*tasks, return_exceptions=True)
```

### Domain-specific Rate Limiting

Apply different rate limits to different domains:

```python
from urllib.parse import urlparse
import time
import asyncio

class DomainRateLimiter:
    def __init__(self):
        # Domain -> {last_request_time, requests_per_minute}
        self.domains = {}
        self.default_rpm = 30  # Default: 30 requests per minute
    
    def set_domain_limit(self, domain, rpm):
        if domain not in self.domains:
            self.domains[domain] = {"last_request_time": 0, "rpm": rpm}
        else:
            self.domains[domain]["rpm"] = rpm
    
    async def wait_if_needed(self, url):
        domain = urlparse(url).netloc
        
        if domain not in self.domains:
            self.domains[domain] = {"last_request_time": 0, "rpm": self.default_rpm}
        
        domain_info = self.domains[domain]
        min_interval = 60.0 / domain_info["rpm"]
        
        current_time = time.time()
        elapsed = current_time - domain_info["last_request_time"]
        
        if elapsed < min_interval:
            wait_time = min_interval - elapsed
            await asyncio.sleep(wait_time)
        
        self.domains[domain]["last_request_time"] = time.time()
```

## HTML Parsing Optimization

### Parser Selection

Choose the most efficient parser for your needs:

```python
from bs4 import BeautifulSoup

# lxml is much faster than html.parser
html = response.text
soup = BeautifulSoup(html, 'lxml')
```

### Targeted Extraction

Use targeted selectors instead of parsing the entire document:

```python
# Instead of parsing everything
soup = BeautifulSoup(html, 'lxml')
links = soup.find_all('a')

# Use CSS selectors for targeted extraction
links = soup.select('div.content a.external')

# Or use more specific find methods
content_div = soup.find('div', class_='content')
if content_div:
    links = content_div.find_all('a', class_='external')
```

### Streaming Parsing

For large documents, use streaming parsers:

```python
from lxml import etree

def stream_parse_large_xml(file_path):
    """Parse a large XML file without loading it entirely into memory."""
    context = etree.iterparse(file_path, events=('end',), tag='item')
    
    for event, elem in context:
        # Process the element
        process_element(elem)
        
        # Clear element to free memory
        elem.clear()
        
        # Also eliminate now-empty references from the root node to elem
        while elem.getprevious() is not None:
            del elem.getparent()[0]
    
    del context
```

### Regular Expressions for Simple Cases

For very simple extractions, regex can be faster:

```python
import re

def extract_all_emails(text):
    """Extract all emails from text using regex."""
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    return re.findall(email_pattern, text)
```

## Resource Management

### Memory Management

Implement strategies to minimize memory usage:

```python
def process_large_dataset(file_path):
    """Process a large dataset with minimal memory usage."""
    # Use generators instead of lists
    with open(file_path, 'r') as f:
        for line in f:
            yield process_line(line)

def scrape_with_memory_limit(urls, batch_size=100):
    """Scrape URLs in batches to limit memory usage."""
    for i in range(0, len(urls), batch_size):
        batch = urls[i:i+batch_size]
        results = scrape_batch(batch)
        process_and_save_results(results)
        # Free memory
        results = None
```

### Disk Caching

Cache responses to disk to avoid redundant requests:

```python
import os
import hashlib
import pickle

class DiskCache:
    def __init__(self, cache_dir='./cache'):
        self.cache_dir = cache_dir
        os.makedirs(cache_dir, exist_ok=True)
    
    def _get_cache_path(self, url):
        """Generate a file path for caching the URL content."""
        url_hash = hashlib.md5(url.encode()).hexdigest()
        return os.path.join(self.cache_dir, url_hash)
    
    def get(self, url):
        """Retrieve content from cache if it exists."""
        cache_path = self._get_cache_path(url)
        if os.path.exists(cache_path):
            with open(cache_path, 'rb') as f:
                return pickle.load(f)
        return None
    
    def set(self, url, content):
        """Store content in cache."""
        cache_path = self._get_cache_path(url)
        with open(cache_path, 'wb') as f:
            pickle.dump(content, f)
```

### Incremental Processing

Process data incrementally to avoid memory spikes:

```python
def incremental_scrape_and_process(urls):
    """Scrape and process URLs incrementally."""
    for url in urls:
        html = scrape_url(url)
        if html:
            data = extract_data(html)
            process_data(data)
            save_data(data)
            # Free memory
            html = None
            data = None
```

## Monitoring and Profiling

### Performance Metrics

Track key performance metrics:

```python
import time
from dataclasses import dataclass
from typing import Dict, List

@dataclass
class ScrapingMetrics:
    start_time: float = 0
    end_time: float = 0
    urls_processed: int = 0
    successful_requests: int = 0
    failed_requests: int = 0
    bytes_downloaded: int = 0
    domain_stats: Dict[str, Dict] = None
    
    def __post_init__(self):
        if self.domain_stats is None:
            self.domain_stats = {}
    
    def start(self):
        self.start_time = time.time()
    
    def stop(self):
        self.end_time = time.time()
    
    def add_request(self, url, success, size=0):
        from urllib.parse import urlparse
        
        domain = urlparse(url).netloc
        
        if domain not in self.domain_stats:
            self.domain_stats[domain] = {
                'requests': 0,
                'successful': 0,
                'failed': 0,
                'bytes': 0
            }
        
        self.urls_processed += 1
        self.domain_stats[domain]['requests'] += 1
        
        if success:
            self.successful_requests += 1
            self.domain_stats[domain]['successful'] += 1
            self.bytes_downloaded += size
            self.domain_stats[domain]['bytes'] += size
        else:
            self.failed_requests += 1
            self.domain_stats[domain]['failed'] += 1
    
    def get_summary(self):
        duration = self.end_time - self.start_time if self.end_time > 0 else time.time() - self.start_time
        
        return {
            'duration_seconds': duration,
            'urls_processed': self.urls_processed,
            'successful_requests': self.successful_requests,
            'failed_requests': self.failed_requests,
            'success_rate': self.successful_requests / max(1, self.urls_processed),
            'requests_per_second': self.urls_processed / max(1, duration),
            'bytes_downloaded': self.bytes_downloaded,
            'download_rate_kbps': (self.bytes_downloaded / 1024) / max(1, duration),
            'domain_stats': self.domain_stats
        }
```

### Profiling

Profile your code to identify bottlenecks:

```python
import cProfile
import pstats
import io

def profile_function(func, *args, **kwargs):
    """Profile a function and print stats."""
    pr = cProfile.Profile()
    pr.enable()
    
    result = func(*args, **kwargs)
    
    pr.disable()
    s = io.StringIO()
    ps = pstats.Stats(pr, stream=s).sort_stats('cumulative')
    ps.print_stats(20)  # Print top 20 functions by cumulative time
    print(s.getvalue())
    
    return result

# Usage
profile_function(scrape_batch, urls)
```

### Logging

Implement detailed logging for analysis:

```python
import logging
import time

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='scraping.log'
)

logger = logging.getLogger('scraper')

async def scrape_with_logging(url, session):
    start_time = time.time()
    logger.info(f"Starting request to {url}")
    
    try:
        async with session.get(url) as response:
            duration = time.time() - start_time
            size = len(await response.read())
            
            logger.info(
                f"Completed {url} - Status: {response.status}, "
                f"Size: {size} bytes, Time: {duration:.2f}s"
            )
            
            return await response.text()
    except Exception as e:
        duration = time.time() - start_time
        logger.error(f"Failed {url} - Error: {str(e)}, Time: {duration:.2f}s")
        raise
```

## Specialized Techniques

### Headless Browsers for JavaScript-heavy Sites

Use headless browsers for sites requiring JavaScript:

```python
from playwright.async_api import async_playwright

async def scrape_js_site(url):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        # Set timeout
        page.set_default_timeout(30000)
        
        # Navigate and wait for network idle
        await page.goto(url, wait_until='networkidle')
        
        # Extract content
        content = await page.content()
        
        # Close browser
        await browser.close()
        
        return content
```

### Intelligent Crawling

Implement intelligent crawling strategies:

```python
class PriorityCrawler:
    def __init__(self):
        self.visited = set()
        self.queue = []  # (priority, url) tuples
    
    def add_url(self, url, priority=0):
        if url not in self.visited:
            import heapq
            heapq.heappush(self.queue, (-priority, url))  # Negative for max-heap
    
    async def crawl(self, session, max_urls=100):
        results = {}
        count = 0
        
        import heapq
        while self.queue and count < max_urls:
            _, url = heapq.heappop(self.queue)
            
            if url in self.visited:
                continue
                
            self.visited.add(url)
            count += 1
            
            try:
                html = await self.fetch_url(url, session)
                results[url] = html
                
                # Extract and prioritize new links
                new_urls = self.extract_links(html, url)
                for new_url, priority in new_urls:
                    self.add_url(new_url, priority)
            except Exception as e:
                logger.error(f"Error crawling {url}: {e}")
        
        return results
    
    def extract_links(self, html, base_url):
        # Extract links and assign priorities based on relevance
        # Return list of (url, priority) tuples
        pass
```

### Content-based Throttling

Adjust scraping speed based on content type:

```python
async def adaptive_scrape(url, session):
    """Adapt scraping behavior based on content type."""
    # First make a HEAD request to check content type
    async with session.head(url) as head_response:
        content_type = head_response.headers.get('Content-Type', '')
        content_length = int(head_response.headers.get('Content-Length', 0))
        
        # Adjust behavior based on content
        if 'text/html' in content_type:
            # Standard HTML page
            await asyncio.sleep(1)  # Standard delay
        elif 'application/json' in content_type:
            # API endpoint - can be faster
            await asyncio.sleep(0.5)
        elif content_length > 1000000:
            # Large file - be more cautious
            await asyncio.sleep(5)
        else:
            # Default behavior
            await asyncio.sleep(2)
        
        # Now make the actual request
        async with session.get(url) as response:
            return await response.text()
```

## Conclusion

Optimizing scraping operations is a balance between performance, resource usage, and ethical considerations. By implementing the techniques in this guide, you can create efficient scraping systems that collect data effectively while minimizing impact on target websites and your own resources.

Remember that the most efficient scraper is one that:

1. Only collects what it needs
2. Respects the target website's resources
3. Uses computational resources efficiently
4. Handles errors gracefully
5. Adapts to changing conditions

Always monitor your scraping operations and be prepared to adjust your approach based on performance metrics and feedback from target websites.

---

Last updated: 2025-01-15 