# WhytCard용 Python 표준

## 소개

이 문서는 WhytCard 프로젝트에서 Python 개발을 위해 따라야 할 표준과 모범 사례를 정의합니다. 이러한 규칙은 코드베이스 전체에서 일관성 있고 유지 관리가 용이하며 고품질의 코드를 보장하는 것을 목표로 합니다.

## 목차

1. [스타일 규칙](#style-conventions) 
2. [코드 구조](#code-structure) 
3. [문서](#documentation) 
4. [테스트](#testing) 
5. [오류 처리](#error-handling) 
6. [성능](#performance) 
7. [보안](#security) 
8. [스크래핑 세부 사항](#scraping-specifics) 
9. [권장 도구](#recommended-tools) 

## 스타일 규칙

### PEP 8

저희는 공식 Python 스타일 가이드인 [PEP 8](https://www.python.org/dev/peps/pep-0008/)을 엄격하게 준수하며, WhytCard에 맞게 일부 수정했습니다.

### 들여쓰기 및 서식

- 들여쓰기에는 **공백 4개**를 사용합니다(탭 사용 금지).
- 모든 줄은 **최대 88자**로 제한합니다(Black standard).
- 함수와 클래스, 그리고 함수 내의 긴 코드 블록을 구분할 때는 빈 줄을 사용합니다.
- 연산자와 쉼표 뒤에 공백을 사용합니다.

```python
# 좋음
def calculate_total(price, quantity=1): 
total = price * quantity 
return total 

# 나쁨
def calculate_total(price,quantity = 1): 
total=price*quantity 
return total 
``` 

### 명명 규칙

- **모듈 및 패키지**: 밑줄 없이 짧고 소문자 이름 사용(`scraper.py`, `utils.py`)
- **클래스**: CamelCase(`ScrapingConfig`, `DataProcessor`)
- **함수 및 변수**: snake_case (`extract_data()`, `user_agent`) 
- **상수**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `DEFAULT_TIMEOUT`) 
- **"개인" 변수**: 밑줄 접두사 사용 (`_internal_cache`) 
- **설명적인 이름**: 간결함보다 명확성 우선 

```python 
# 좋음 
class UserDataProcessor: 
def __init__(self): 
self.MAX_BATCH_SIZE = 100 
self._temp_storage = {} 

def process_user_data(self, user_data): 
pass 

# 나쁨 
class Processor: 
def __init__(self): 
self.max = 100 
self.temp = {} 

def process(self, d): 
pass 
``` 

### Imports 

- imports를 빈 줄로 구분된 세 섹션으로 구성합니다.
1. 표준 라이브러리 imports 
2. 타사 라이브러리 imports 
3. 로컬 프로젝트 imports 
- 각 섹션은 알파벳순으로 정렬해야 합니다.
- 일반 imports보다 명시적 imports를 선호합니다.

```python 
# 좋음 
import os 
import sys 
from typing import Dict, List, Optional 

import aiohttp 
import bs4 
from fastapi import HTTPException 

from scraping.utils import URLUtils 
from utils.logging import setup_logger 

# 나쁨 
from scraping.utils import * 
import aiohttp, bs4 
import sys, os 
``` 

## 코드 구조

### 모듈 구성

- 각 모듈은 명확하게 정의된 단일 역할을 가져야 합니다.
- 패키지를 사용하여 구성합니다. 관련 모듈
- 각 패키지에 대해 `__init__.py` 파일을 생성하여 공개 API를 명확하게 노출합니다.

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

### 클래스 및 함수

- 단일 책임 원칙(SRP)을 따릅니다.
- 함수 크기를 최대 50줄로 제한합니다.
- 클래스 크기를 최대 300줄로 제한합니다.
- 인스턴스 상태에 의존하지 않는 작업에는 정적 메서드 또는 독립 실행형 함수를 사용합니다.

```python
# 좋은
클래스 DataProcessor:
def process_data(self, data):
cleaned_data = self._clean_data(data)
return self._transform_data(cleaned_data)

def _clean_data(self, data):
# 정리 논리
return cleaned_data

def _transform_data(self, data):
# 변환 논리
return transformed_data

# 나쁜
클래스 DataProcessor:
def process_data(self, data):
# 정리와 변환을 혼합한 200줄의 코드
return result
``` 

### 정적 타이핑

- 모든 함수와 메서드에 타입 어노테이션을 사용하세요.
- 복잡한 타입에는 `typing` 모듈을 사용하세요.
- 발생할 수 있는 예외를 문서화하세요.

```python
from typing import Dict, List, Optional, Union, Any

def fetch_data(url: str, timeout: Optional[int] = None) -> Dict[str, Any]: 
""" 
지정된 URL에서 데이터를 가져옵니다.

인수: 
url: 쿼리할 URL
timeout: 제한 시간(초)

반환값: 
검색된 데이터가 포함된 사전

발생: 
HTTPException: 요청이 실패하는 경우
""" 
# 구현 
``` 

## 문서 

### Docstring 

- 모든 모듈, 클래스, 메서드 및 함수에 docstring을 사용합니다.
- Google docstring 형식을 따릅니다.
- 매개변수, 반환 값 및 예외를 문서화합니다.

```python
def extract_links(html: str, base_url: str) -> List[Dict[str, str]]: 
""" 
HTML 페이지에서 모든 링크를 텍스트 및 속성과 함께 추출합니다.

인수: 
html: HTML 콘텐츠 페이지
base_url: 상대 링크를 확인할 기준 URL

반환값: 
링크 정보가 포함된 사전 목록

발생 원인: 
ValueError: HTML이 유효하지 않은 경우
""" 
``` 

### 주석

- 주석은 "무엇"이 아닌 "이유"를 설명하는 데 사용합니다.
- 복잡하거나 직관적이지 않은 코드에 주석을 추가합니다.
- 오래되었거나 중복된 주석은 사용하지 않습니다.

```python
# 장점
# 느린 사이트에서 잦은 시간 초과를 방지하기 위해 5초 제한을 사용합니다.
timeout = 5

# 단점
# 시간 초과 설정
timeout = 5
``` 

## 테스트

### 테스트 구조

- 모든 테스트에 pytest를 사용합니다.
- 소스 코드를 반영하는 구조로 테스트를 구성합니다.
- 테스트 파일 이름은 `test_` 접두사로 지정합니다.
- 테스트 함수 이름은 `test_`로 지정합니다. 접두사

``` 
scraping/ 
scraper.py 
utils.py 
tests/ 
scraping/ 
test_scraper.py 
test_utils.py 
``` 

### 테스트 커버리지

- 최소 80%의 테스트 커버리지를 목표로 합니다.
- 모든 중요 코드 경로를 테스트합니다.
- 엣지 케이스 및 오류 조건에 대한 테스트를 포함합니다.

```python
def test_scrape_url_success(): 
# 명목상의 경우를 테스트합니다.

def test_scrape_url_timeout(): 
# URL이 응답하지 않는 경우를 테스트합니다.

def test_scrape_url_invalid_url(): 
# 유효하지 않은 URL로 테스트합니다.
``` 

### 비동기 테스트

- 비동기 코드 테스트에는 `pytest-asyncio`를 사용합니다.
- 네트워크 호출에는 모의 객체를 사용합니다. 테스트

```python
import pytest

@pytest.mark.asyncio
async def test_async_function(): 
result = await async_function() 
assert result == expected_result 
``` 

## 오류 처리

### 예외

- 애플리케이션별 오류에 대한 사용자 지정 예외를 생성합니다.
- 적절한 경우 표준 Python 예외를 사용합니다.
- 발생할 수 있는 모든 예외를 문서화합니다.

```python
class ScrapingException(Exception): 
"""오류 스크래핑에 대한 기본 예외입니다.""" 
pass 

class RateLimitException(ScrapingException): 
"""속도 제한에 도달하면 발생합니다.""" 
pass 
``` 

### 오류 처리

- try/except 블록을 사용하여 오류를 적절하게 처리합니다.
- Exception을 일반적으로 catch하지 않습니다.
- 충분한 맥락을 포함하여 오류를 로깅합니다. 디버깅

```python
try: 
result = await scraper.scrape_url(url) 
except RateLimitException: 
logger.warning(f"{url}의 속도 제한에 도달했습니다. 지연 후 다시 시도합니다.") 
await asyncio.sleep(RATE_LIMIT_DELAY) 
result = await scraper.scrape_url(url) 
except ScrapingException as e: 
logger.error(f"{url}: {str(e)} 스크래핑에 실패했습니다.") 
raise 
``` 

## 성능

### 비동기 

- I/O 집약적인 작업에는 `asyncio`를 사용하세요.
- 비동기 HTTP 요청에는 `aiohttp`를 사용하세요.
- 과부하를 방지하기 위해 동시 작업 수를 제한하세요.

```python
async def scrape_batch(urls: List[str], max_concurrent: int = 10):
semaphore = asyncio.Semaphore(max_concurrent)

async def _scrape_with_semaphore(url): 
async with semaphore: 
return await scrape_url(url) 

tasks = [_scrape_with_semaphore(url) for url in urls] 
return await asyncio.gather(*tasks, return_exceptions=True) 
``` 

### 최적화

- 일반적인 작업에 적합한 데이터 구조(빈번한 조회에는 사전)를 사용합니다.
- 대용량 데이터의 불필요한 복사를 방지합니다.
- 생성기를 사용하여 대용량 데이터를 처리합니다.
- 비용이 많이 드는 계산이나 요청을 캐시합니다.

```python
# 생성기를 사용하여 대용량 데이터 세트 처리
def process_large_dataset(file_path): 
with open(file_path, 'r') as f: 
for line in f: 
yield process_line(line) 
``` 

## 보안 

### 입력 검증 

- 사용자 입력은 항상 검증하세요.
- 데이터 검증에는 Pydantic을 사용하세요.
- 외부 데이터는 절대 신뢰하지 마세요.

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

### 비밀 관리 

- 소스 코드에 비밀(비밀번호, API 키)을 포함하지 마세요.
- 환경 변수 또는 보안 설정 파일을 사용하세요.
- python-dotenv를 사용하여 환경 변수를 로드하세요.

```python 
import os 
from dotenv import load_dotenv

load_dotenv() 

API_KEY = os.getenv("API_KEY") 
if not API_KEY: 
raise EnvironmentError("API_KEY 환경 변수가 설정되지 않았습니다") 
``` 

## 스크래핑 세부 사항

### robots.txt 준수

- 항상 robots.txt 파일을 준수합니다.
- 요청 간 지연을 구현합니다.
- 적절한 사용자 에이전트를 사용하여 자신을 올바르게 식별합니다.

```python
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse

def can_fetch(url: str, user_agent: str) -> bool: 
"""robots.txt에 따라 URL을 가져올 수 있는지 확인합니다.""" 
parser = RobotFileParser() 
robots_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt" 
parser.set_url(robots_url) 
parser.read() 
return parser.can_fetch(user_agent, url) 
``` 

### 세션 관리

- 성능 향상을 위해 HTTP 세션 재사용
- 사용 후 세션을 적절히 종료
- 리소스 종료를 보장하기 위해 비동기 컨텍스트 사용

```python 
async def scrape_with_session(): 
async with aiohttp.ClientSession() as session: 
# 모든 요청에 세션 사용
result1 = await fetch_url(session, url1) 
result2 = await fetch_url(session, url2) 
# 여기서 세션이 자동으로 종료됩니다.
``` 

### HTML 파싱

- 더 나은 성능을 위해 BeautifulSoup의 파서로 `lxml`을 사용하세요. 성능
- DOM 탐색에 CSS 또는 XPath 선택자 사용
- 예상 요소가 존재하지 않는 경우 처리

```python
from bs4 import BeautifulSoup

def extract_title(html: str) -> Optional[str]: 
soup = BeautifulSoup(html, "lxml") 
title_tag = soup.find("title") 
return title_tag.text if title_tag else None 
``` 

## 권장 도구

### 린팅 및 서식 지정

- **Black**: 자동 코드 포매터
- **isort**: 자동 가져오기 정렬 도구
- **flake8**: 오류 및 스타일 문제 감지용 린터
- **mypy**: 정적 유형 검사

### 권장 구성

`pyproject.toml` 파일: 

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

`.flake8` 파일: 

``` 
[flake8] 
max-line-length = 88 
extend-ignore = E203 
exclude = .git,__pycache__,build,dist 
``` 

### CI 통합

CI 파이프라인에서 다음 도구를 구성하여 코드를 자동으로 검사하세요. 

```yaml 
# GitHub Actions 예시
name: Python Linting

on: [push, pull_request] 

jobs: 
lint: 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v2 
- name: Python 설정 
uses: actions/setup-python@v2 
with: 
python-version: '3.8' 
- name: 종속성 설치 
run: | 
python -m pip install --upgrade pip 
pip install black isort flake8 mypy 
- name: linter 실행 
run: | 
black --check . 
isort --check . 
flake8 . 
mypy . 
``` 

--- 

## 결론

이 표준은 WhytCard 프로젝트에서 Python 코드의 품질, 유지 관리 용이성 및 일관성을 보장하기 위해 설계되었습니다. 모든 기여자는 이 지침을 따라야 합니다. 질문이나 개선 제안 사항이 있으시면 언제든지 팀에 공유해 주세요.

--- 

최종 업데이트: 2025년 1월 15일