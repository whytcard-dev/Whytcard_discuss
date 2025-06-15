# Python Standards for WhytCard

## Introduction

This document defines the standards and best practices to follow for Python development in the WhytCard project. These rules aim to ensure consistent, maintainable, and high-quality code throughout the codebase.

## Table of Contents

1. [Style Conventions](#style-conventions)
2. [Code Structure](#code-structure)
3. [Documentation](#documentation)
4. [Testing](#testing)
5. [Error Handling](#error-handling)
6. [Performance](#performance)
7. [Security](#security)
8. [Scraping Specifics](#scraping-specifics)
9. [Recommended Tools](#recommended-tools)

## Style Conventions

### PEP 8

We strictly follow [PEP 8](https://www.python.org/dev/peps/pep-0008/), the official Python style guide, with some specific adaptations for WhytCard.

### Indentation and Formatting

- Use **4 spaces** for indentation (no tabs)
- Limit all lines to a **maximum of 88 characters** (Black standard)
- Use blank lines to separate functions and classes, as well as large blocks of code within functions
- Use spaces around operators and after commas

```python
# Good
def calculate_total(price, quantity=1):
    total = price * quantity
    return total

# Bad
def calculate_total(price,quantity = 1):
    total=price*quantity
    return total
```

### Naming Conventions

- **Modules and packages**: Short, lowercase names, without underscores (`scraper.py`, `utils.py`)
- **Classes**: CamelCase (`ScrapingConfig`, `DataProcessor`)
- **Functions and variables**: snake_case (`extract_data()`, `user_agent`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `DEFAULT_TIMEOUT`)
- **"Private" variables**: Prefixed with an underscore (`_internal_cache`)
- **Descriptive names**: Prioritize clarity over brevity

```python
# Good
class UserDataProcessor:
    def __init__(self):
        self.MAX_BATCH_SIZE = 100
        self._temp_storage = {}
    
    def process_user_data(self, user_data):
        pass

# Bad
class Processor:
    def __init__(self):
        self.max = 100
        self.temp = {}
    
    def process(self, d):
        pass
```

### Imports

- Organize imports into three sections separated by a blank line:
  1. Standard library imports
  2. Third-party library imports
  3. Local project imports
- Each section should be alphabetically sorted
- Prefer explicit imports over generic imports

```python
# Good
import os
import sys
from typing import Dict, List, Optional

import aiohttp
import bs4
from fastapi import HTTPException

from scraping.utils import URLUtils
from utils.logging import setup_logger

# Bad
from scraping.utils import *
import aiohttp, bs4
import sys, os
```

## Code Structure

### Module Organization

- Each module should have a single, well-defined responsibility
- Use packages to organize related modules
- Create an `__init__.py` file for each package, clearly exposing the public API

```python
# scraping/__init__.py
from .scraper import AdvancedScraper, ScrapingConfig, ScrapingMode
from .utils import URLUtils, ContentExtractor

__all__ = [
    "AdvancedScraper", 
    "ScrapingConfig", 
    "ScrapingMode",
    "URLUtils",
    "ContentExtractor"
]
```

### Classes and Functions

- Follow the Single Responsibility Principle (SRP)
- Limit function size to a maximum of 50 lines
- Limit class size to a maximum of 300 lines
- Use static methods or standalone functions for operations that don't depend on instance state

```python
# Good
class DataProcessor:
    def process_data(self, data):
        cleaned_data = self._clean_data(data)
        return self._transform_data(cleaned_data)
        
    def _clean_data(self, data):
        # Cleaning logic
        return cleaned_data
        
    def _transform_data(self, data):
        # Transformation logic
        return transformed_data

# Bad
class DataProcessor:
    def process_data(self, data):
        # 200 lines of code mixing cleaning and transformation
        return result
```

### Static Typing

- Use type annotations for all functions and methods
- Use the `typing` module for complex types
- Document exceptions that may be raised

```python
from typing import Dict, List, Optional, Union, Any

def fetch_data(url: str, timeout: Optional[int] = None) -> Dict[str, Any]:
    """
    Fetches data from the specified URL.
    
    Args:
        url: The URL to query
        timeout: Timeout in seconds
        
    Returns:
        Dictionary containing the retrieved data
        
    Raises:
        HTTPException: If the request fails
    """
    # Implementation
```

## Documentation

### Docstrings

- Use docstrings for all modules, classes, methods, and functions
- Follow the Google format for docstrings
- Document parameters, return values, and exceptions

```python
def extract_links(html: str, base_url: str) -> List[Dict[str, str]]:
    """
    Extracts all links from an HTML page with their texts and attributes.
    
    Args:
        html: HTML content of the page
        base_url: Base URL to resolve relative links
        
    Returns:
        List of dictionaries containing link information
        
    Raises:
        ValueError: If the HTML is invalid
    """
```

### Comments

- Use comments to explain the "why", not the "what"
- Comment complex or non-intuitive code
- Avoid outdated or redundant comments

```python
# Good
# Use a 5-second limit to avoid frequent timeouts on slow sites
timeout = 5

# Bad
# Set the timeout
timeout = 5
```

## Testing

### Test Structure

- Use pytest for all tests
- Organize tests in a structure mirroring the source code
- Name test files with the `test_` prefix
- Name test functions with the `test_` prefix

```
scraping/
  scraper.py
  utils.py
tests/
  scraping/
    test_scraper.py
    test_utils.py
```

### Test Coverage

- Aim for at least 80% test coverage
- Test all critical code paths
- Include tests for edge cases and error conditions

```python
def test_scrape_url_success():
    # Test the nominal case
    
def test_scrape_url_timeout():
    # Test the case where the URL doesn't respond
    
def test_scrape_url_invalid_url():
    # Test with an invalid URL
```

### Asynchronous Tests

- Use `pytest-asyncio` for testing asynchronous code
- Use mocks for network calls in tests

```python
import pytest

@pytest.mark.asyncio
async def test_async_function():
    result = await async_function()
    assert result == expected_result
```

## Error Handling

### Exceptions

- Create custom exceptions for application-specific errors
- Use standard Python exceptions when appropriate
- Document all exceptions that may be raised

```python
class ScrapingException(Exception):
    """Base exception for scraping errors."""
    pass

class RateLimitException(ScrapingException):
    """Raised when a rate limit is reached."""
    pass
```

### Error Handling

- Use try/except blocks to handle errors appropriately
- Avoid catching Exception generically
- Log errors with enough context for debugging

```python
try:
    result = await scraper.scrape_url(url)
except RateLimitException:
    logger.warning(f"Rate limit reached for {url}, retrying after delay")
    await asyncio.sleep(RATE_LIMIT_DELAY)
    result = await scraper.scrape_url(url)
except ScrapingException as e:
    logger.error(f"Failed to scrape {url}: {str(e)}")
    raise
```

## Performance

### Asynchronous

- Use `asyncio` for I/O-intensive operations
- Use `aiohttp` for asynchronous HTTP requests
- Limit the number of concurrent tasks to avoid overload

```python
async def scrape_batch(urls: List[str], max_concurrent: int = 10):
    semaphore = asyncio.Semaphore(max_concurrent)
    
    async def _scrape_with_semaphore(url):
        async with semaphore:
            return await scrape_url(url)
    
    tasks = [_scrape_with_semaphore(url) for url in urls]
    return await asyncio.gather(*tasks, return_exceptions=True)
```

### Optimizations

- Use appropriate data structures for common operations (dictionaries for frequent lookups)
- Avoid unnecessary copies of large data
- Use generators to process large amounts of data
- Cache expensive calculations or requests

```python
# Using generators to process large datasets
def process_large_dataset(file_path):
    with open(file_path, 'r') as f:
        for line in f:
            yield process_line(line)
```

## Security

### Input Validation

- Always validate user input
- Use Pydantic for data validation
- Never trust external data

```python
from pydantic import BaseModel, HttpUrl, validator

class ScrapingRequest(BaseModel):
    url: HttpUrl
    depth: int = 1
    
    @validator('depth')
    def validate_depth(cls, v):
        if v < 1 or v > 3:
            raise ValueError('Depth must be between 1 and 3')
        return v
```

### Secret Management

- Never include secrets (passwords, API keys) in source code
- Use environment variables or secure configuration files
- Use python-dotenv to load environment variables

```python
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
if not API_KEY:
    raise EnvironmentError("API_KEY environment variable is not set")
```

## Scraping Specifics

### Respecting robots.txt

- Always respect robots.txt files
- Implement delays between requests
- Properly identify yourself with an appropriate User-Agent

```python
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse

def can_fetch(url: str, user_agent: str) -> bool:
    """Checks if the URL can be fetched according to robots.txt."""
    parser = RobotFileParser()
    robots_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt"
    parser.set_url(robots_url)
    parser.read()
    return parser.can_fetch(user_agent, url)
```

### Session Management

- Reuse HTTP sessions to improve performance
- Properly close sessions after use
- Use asynchronous contexts to ensure resource closure

```python
async def scrape_with_session():
    async with aiohttp.ClientSession() as session:
        # Use the session for all requests
        result1 = await fetch_url(session, url1)
        result2 = await fetch_url(session, url2)
    # Session is automatically closed here
```

### HTML Parsing

- Use `lxml` as the parser for BeautifulSoup for better performance
- Use CSS or XPath selectors for DOM navigation
- Handle cases where expected elements don't exist

```python
from bs4 import BeautifulSoup

def extract_title(html: str) -> Optional[str]:
    soup = BeautifulSoup(html, "lxml")
    title_tag = soup.find("title")
    return title_tag.text if title_tag else None
```

## Recommended Tools

### Linting and Formatting

- **Black**: Automatic code formatter
- **isort**: Automatic import sorter
- **flake8**: Linter to detect errors and style issues
- **mypy**: Static type checking

### Recommended Configuration

`pyproject.toml` file:

```toml
[tool.black]
line-length = 88
target-version = ['py38']
include = '\.pyi?$'

[tool.isort]
profile = "black"
line_length = 88

[tool.mypy]
python_version = "3.8"
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = true
disallow_incomplete_defs = true
```

`.flake8` file:

```
[flake8]
max-line-length = 88
extend-ignore = E203
exclude = .git,__pycache__,build,dist
```

### CI Integration

Configure these tools in your CI pipeline to automatically check code:

```yaml
# Example for GitHub Actions
name: Python Linting

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.8'
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install black isort flake8 mypy
    - name: Run linters
      run: |
        black --check .
        isort --check .
        flake8 .
        mypy .
```

---

## Conclusion

These standards are designed to ensure quality, maintainability, and consistency of Python code in the WhytCard project. All contributors are expected to follow these guidelines. If you have questions or suggestions for improvement, please feel free to share them with the team.

---

Last updated: 2025-01-15 