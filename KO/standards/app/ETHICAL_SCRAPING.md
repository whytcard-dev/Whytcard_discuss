# WhytCard 윤리적 스크래핑 가이드

## 소개

웹 스크래핑은 WhytCard 프로젝트의 핵심이지만, 윤리적이고 책임감 있으며 합법적인 방식으로 수행되어야 합니다. 이 가이드는 모든 스크래핑 활동이 웹사이트 소유자의 권리, 관련 법률 및 윤리 기준을 준수하도록 보장하기 위해 따라야 할 원칙과 관행을 정의합니다.

## 목차

1. [기본 원칙](#fundamental-principles)
2. [법적 측면](#legal-aspects)
3. [기술 모범 사례](#technical-best-practices)
4. [자원 존중](#resource-respect)
5. [개인 정보 보호](#personal-data-protection)
6. [문서화 및 투명성](#documentation-and-transparency)
7. [특수 사례](#special-cases)
8. [윤리적 스크래핑 체크리스트](#ethical-scraping-checklist)

## 기본 원칙

### 윤리적 스크래핑 철학

윤리적 스크래핑은 세 가지 기본 원칙을 기반으로 합니다.

1. **존중**: 존중 웹사이트 소유자, 이용 약관 및 리소스
2. **비례성**: 최소한의 영향으로 필요한 데이터만 추출합니다.
3. **투명성**: 봇의 신원과 스크래핑 의도를 투명하게 밝힙니다.

### WhytCard의 스크래핑 관련 가치

WhytCard 프로젝트는 다음을 약속합니다.

- 스크래핑하는 웹사이트에 해를 끼치지 않습니다.
- 웹사이트의 명시적 및 묵시적 규칙을 엄격히 준수합니다.
- WhytCard의 신원과 목표를 투명하게 밝힙니다.
- 책임감 있게 데이터를 사용하고 사명에 부합합니다.
- 공식 API가 제공되는 경우 우선적으로 사용합니다.

## 법적 측면

### 일반 법적 체계

웹 스크래핑은 국가마다 다른 여러 법적 체계의 적용을 받습니다.

- **저작권**: 웹사이트 콘텐츠는 일반적으로 저작권으로 보호됩니다.
- **이용 약관**: 웹사이트 서비스 약관에서 스크래핑을 명시적으로 금지할 수 있습니다.
- **데이터 보호**: 유럽의 GDPR과 같은 법률은 개인 데이터를 보호합니다.
- **무단 접근**: 일부 관할권에서는 컴퓨터 시스템에 대한 무단 접근을 범죄로 규정합니다.

### 주요 판례법

스크래핑 관련 주요 법원 판결:

- **hiQ Labs 대 LinkedIn** (미국): 공개 데이터 스크래핑이 반드시 불법인 것은 아니라는 점을 입증했습니다.
- **Ryanair 대 PR Aviation** (EU): 이용 약관이 계약상 스크래핑을 제한할 수 있음을 확인했습니다.
- **QVC 대 Resultly** (미국): 서버 과부하 방지의 중요성을 강조했습니다.

### WhytCard의 법률 준수

합법성을 유지하려면 다음을 수행하세요.

1. 사이트를 스크래핑하기 전에 **항상 이용 약관을 확인하세요**
2. 메타 태그의 **"noindex" 및 "nofollow"** 태그를 준수하세요.
3. **기술적 보호 조치(CAPTCHA, 접근 제한)를 절대 우회하지 마세요**
4. **실행 내용을 문서화하여** 선의를 입증하세요.
5. 적법성에 대해 의문이 있는 경우 **변호사와 상담하세요** 스크래핑 작업

## 기술 모범 사례

### robots.txt 존중

robots.txt 파일은 로봇의 접근 규칙을 정의합니다.

```python
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse

def is_allowed(url, user_agent="WhytCardBot/1.0"): 
"""robots.txt에 따라 URL을 스크래핑할 수 있는지 확인합니다.""" 
rp = RobotFileParser() 
rp.set_url(f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt") 
rp.read() 
return rp.can_fetch(user_agent, url) 
``` 

### 적절한 식별

항상 사용자를 명확하게 식별하는 사용자 에이전트를 사용하십시오. bot: 

```python 
headers = { 
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot; bot@whytcard.com)', 
# 다른 헤더... 
} 
``` 

### 요청 지연 

요청 사이에 적절한 지연을 구현합니다. 

```python 
import time 
import random 

def polite_request(url, session, min_delay=1, max_delay=3): 
"""요청 사이에 적절한 지연을 적용하여 요청을 수행합니다.""" 
# 무작위 지연을 기다립니다. 
delay = random.uniform(min_delay, max_delay) 
time.sleep(delay) 

# 요청 생성 
response = session.get(url, headers=headers) 
return response 
``` 

### 오류 처리

HTTP 오류 코드를 존중하고 그에 따라 동작을 조정하세요.

```python
async def respectful_fetch(url, session): 
"""존중하는 방식으로 URL을 가져옵니다.""" 
try: 
async with session.get(url, headers=headers) as response: 
if response.status == 200: 
return await response.text() 
elif response.status == 429: # 요청이 너무 많습니다. 
# 재시도하기 전에 더 오래 기다립니다. 
wait_time = int(response.headers.get('Retry-After', 60)) 
logger.info(f"속도 제한됨, {wait_time}초 동안 대기") 
await asyncio.sleep(wait_time) 
return await respectful_fetch(url, session) 
elif response.status in (403, 404): 
# 재시도하지 않습니다. 403/404 오류
logger.warning(f"액세스가 거부되었거나 찾을 수 없음: {url}") 
return None 
else: 
# 다른 오류가 발생할 때까지 대기 후 재시도 
logger.warning(f"{url}에 대한 {response.status} 오류, 5초 후에 재시도합니다") 
await asyncio.sleep(5) 
return await respectful_fetch(url, session) 
except Exception as e: 
logger.error(f"{url}을 가져오는 동안 예외가 발생했습니다: {str(e)}") 
return None 
``` 

## 리소스 존중 

### 속도 제한 

대상 사이트의 크기와 리소스에 맞게 요청 속도를 조정하세요.

- **대규모 상업 사이트**: 1~3초마다 요청 1개
- **중규모 사이트**: 3~10초마다 요청 1개
- **소규모 사이트**: 10~60초마다 요청 1개 초 이상

### 스크래핑 기간

집중적인 작업에는 트래픽이 적은 시간대를 선호합니다.

- **피크 시간이 아닌 시간**: 야간이나 주말을 선호합니다.
- **피크 시간 피하기**: 알려진 피크 시간에는 스크래핑하지 않습니다.
- **적응력 유지**: 속도 저하가 감지되면 속도를 낮춥니다.

### 영향 최소화

대상 서버에 미치는 영향을 줄이는 기술:

1. **스마트 캐싱**: 동일한 페이지를 여러 번 검색하지 않습니다.
2. **선택성**: 실제로 필요한 페이지만 검색합니다.
3. **압축**: 대역폭을 줄이기 위해 압축된 응답을 요청합니다.
4. **효율적인 페이지 매김**: 사이트의 페이지 매김 구조를 준수합니다.

## 개인 정보 보호

### 개인 정보 식별

수집하는 데이터 유형에 주의를 기울이십시오.

- **직접 식별 데이터**: 이름, 이메일, 전화번호, 주소
- **간접 식별 데이터**: 사용자 ID, 가명
- **민감한 데이터**: 정치적 견해, 건강, 성적 지향

### GDPR 준수 원칙

유럽에서 사업을 운영하거나 유럽인으로부터 데이터를 수집하는 경우:

1. **최소화**: 엄격하게 필요한 데이터만 수집
2. **목적**: 의도된 목적으로만 데이터 사용
3. **제한된 보관**: 더 이상 필요하지 않은 데이터 삭제
4. **보안**: 수집된 데이터를 무단 액세스로부터 보호

### 데이터 익명화

개인 데이터를 익명화하는 기술:

```python
import hashlib
import re

def anonymize_email(email): 
"""이메일 주소를 익명화합니다.""" 
if not email: 
return None 

# 이메일 주소 해시
hashed = hashlib.sha256(email.encode()).hexdigest()[:10] 
domain = email.split('@')[-1] 

return f"anon_{hashed}@{domain}" 

def anonymize_phone(phone): 
"""전화번호를 익명화합니다.""" 
if not phone: 
return None 

# 숫자만 유지 
digits = re.sub(r'\D', '', phone) 

# 마지막 두 자리를 제외한 모든 숫자를 마스크합니다 
if len(digits) > 2: 
return "X" * (len(digits) - 2) + digits[-2:] 
return "X" * len(digits) 
``` 

## 문서화 및 투명성

### 스크래핑 활동 문서화

스크래핑 활동을 항상 문서화하세요.

- **목적**: 이 데이터는 왜 수집됩니까?
- **방법**: 어떻게 수집됩니까?
- **저장**: 어디에 어떻게 저장됩니까?
- **사용**: 어떻게 사용됩니까?
- **삭제**: 언제 삭제됩니까?

### 연락처 및 수신 거부

연락할 수 있는 방법을 항상 제공하세요.

1. **정보 페이지**: 봇에 대한 설명을 제공하는 전용 페이지를 만드세요(예: whytcard.com/bot)
2. **연락처 이메일**: 사용자 에이전트에 이메일 주소를 입력하세요.
3. **수신 거부 메커니즘**: 사이트에서 제외를 요청할 수 있도록 허용하세요.

### 활동 로깅

스크래핑 활동에 대한 자세한 로그를 유지하세요.

```python
import logging
from datetime import datetime

# 로거 구성
logging.basicConfig( 
filename=f"scraping_log_{datetime.now().strftime('%Y%m%d')}.log", 
level=logging.INFO, 
format='%(asctime)s - %(levelname)s - %(message)s' 
) 

def log_scraping_activity(url, success, data_points=0): 
"""스크래핑 활동을 기록합니다.""" 
logging.info(f"URL: {url}, Success: {success}, Data points: {data_points}") 
``` 

## 특수 사례 

### API vs 스크래핑 

데이터 수집 우선순위: 

1. **공식 API**: 공식 API가 있는 경우 항상 우선적으로 처리합니다.
2. **공개 데이터 피드**: RSS, XML 또는 JSON 피드가 있는 경우 사용합니다.
3. **스크래핑**: 스크래핑은 최후의 수단으로만 사용합니다.

### 인증이 필요한 사이트

인증이 필요한 사이트의 경우:

- **명시적 승인**: 사이트의 서면 승인을 받습니다.
- **서비스 약관 준수**: 서비스 약관에서 자동화된 사용을 허용하는지 확인합니다.
- **제한 사항**: 사용 제한을 엄격히 준수합니다.

### 동적 콘텐츠 (자바스크립트)

자바스크립트를 많이 사용하는 사이트의 경우:

```python
from playwright.async_api import async_playwright

async def scrape_dynamic_content(url): 
"""자바스크립트로 생성된 콘텐츠를 스크래핑합니다.""" 
async with async_playwright() as p: 
browser = await p.chromium.launch(headless=True) 
page = await browser.new_page() 

# User-Agent 구성 
await page.set_extra_http_headers({ 
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot)' 
}) 

# 페이지를 로드하고 네트워크가 유휴 상태가 될 때까지 기다립니다.
await page.goto(url) 
await page.wait_for_load_state('networkidle') 

# 콘텐츠 추출 
content = await page.content() 

await browser.close() 
return content 
``` 

## 윤리적 스크래핑 체크리스트

각 스크래핑 프로젝트를 시작하기 전에 다음 사항을 확인하세요.

### 준비
- [ ] 대상 사이트의 서비스 약관 확인
- [ ] robots.txt 파일 확인
- [ ] 스크래핑 API 또는 대안 검색
- [ ] 필요한 데이터의 명확한 정의
- [ ] 스크래핑 목적 문서화

### 기술적 구성
- [ ] 식별 가능하고 투명한 사용자 에이전트
- [ ] 속도 제한 메커니즘
- [ ] 중복 요청을 방지하기 위한 캐시 시스템
- [ ] 오류 및 HTTP 코드의 적절한 처리
- [ ] 활동 로깅

### 실행
- [ ] 대상 사이트 성능 모니터링
- [ ] 필요한 경우 동적 속도 조정
- [ ] 서버 표시(429, (재시도 후)
- [ ] 문제 감지 시 즉시 중단

### 사후 처리
- [ ] 개인 정보 익명화
- [ ] 안전한 데이터 저장
- [ ] 기간 제한 보관
- [ ] 수집된 데이터 문서화

## 결론

윤리적인 스크래핑은 데이터 접근과 웹사이트 소유자의 권리 및 자원 존중 사이의 균형을 의미합니다. 이러한 원칙과 관행을 준수함으로써 WhytCard 프로젝트는 책임감 있고 존중하는 접근 방식을 유지하면서 필요한 데이터를 수집할 수 있습니다.

스크래핑 윤리는 단순히 법률 준수의 문제가 아니라 웹 생태계 전체에 대한 책임의 문제임을 기억하십시오. 존중하는 스크래핑은 모두를 위한 더욱 개방적이고 지속 가능한 웹을 만드는 데 기여합니다.

--- 

최종 업데이트: 2025년 1월 15일