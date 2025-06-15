# Python-standarder för WhytCard

## Introduktion

Detta dokument definierar standarder och bästa praxis att följa för Python-utveckling i WhytCard-projektet. Dessa regler syftar till att säkerställa konsekvent, underhållbar och högkvalitativ kod i hela kodbasen.

## Innehållsförteckning

1. [Stilkonventioner](#stilkonventioner)
2. [Kodstruktur](#kodstruktur)
3. [Dokumentation](#dokumentation)
4. [Testning](#testning)
5. [Felhantering](#felhantering)
6. [Prestanda](#prestanda)
7. [Säkerhet](#säkerhet)
8. [Skrapningsspecifikationer](#skrapningsspecifikationer)
9. [Rekommenderade verktyg](#rekommenderade-verktyg)

## Stilkonventioner

### PEP 8

Vi följer strikt [PEP 8](https://www.python.org/dev/peps/pep-0008/), den officiella Python-stilguiden, med några specifika anpassningar för WhytCard.

### Indrag och formatering

- Använd **4 mellanslag** för indrag (inga tabbar)
- Begränsa alla rader till **maximalt 88 tecken** (Black standard)
- Använd tomma rader för att separera funktioner och klasser, samt stora kodblock inom funktioner
- Använd mellanslag runt operatorer och efter kommatecken

```python
# Bra
def calculate_total(price, quantity=1):
total = price * quantity
return total

# Dåligt
def calculate_total(price,quantity = 1):
total=price*quantity
return total
```

### Namngivningskonventioner

- **Moduler och paket**: Korta namn med gemener, utan understreck (`scraper.py`, `utils.py`)
- **Klasser**: CamelCase (`ScrapingConfig`, `DataProcessor`)
- **Funktioner och variabler**: snake_case (`extract_data()`, `user_agent`) 
- **Konstanter**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `DEFAULT_TIMEOUT`) 
- **"Privata" variabler**: Prefixerade med ett understreck (`_internal_cache`) 
- **Beskrivande namn**: Prioriterar tydlighet framför korthet 

```python 
# Bra 
class UserDataProcessor: 
def __init__(self): 
self.MAX_BATCH_SIZE = 100 
self._temp_storage = {} 

def process_user_data(self, user_data): 
pass 

# Dålig 
class Processor: 
def __init__(self): 
self.max = 100 
self.temp = {} 

def process(self, d): 
pass 
``` 

### Importer

- Organisera importer i tre sektioner separerade med en tom rad:
1. Standardbiblioteksimporter
2. Importer av tredjepartsbibliotek
3. Lokala projektimporter

- Varje sektion ska sorteras alfabetiskt

- Föredra explicit import framför generisk import

```python
# Bra
import os 
import sys 
från att skriva import Dict, List, Optional

import aiohttp 
import bs4 
från fastapi import HTTPException

från scraping.utils import URLUtils
från utils.logging import setup_logger

# Dåligt
från scraping.utils import *
import aiohttp, bs4
import sys, os 
```

## Kodstruktur

### Modulorganisation

- Varje modul ska ha ett enda, väldefinierat ansvar
- Använd paket för att organisera relaterade moduler
- Skapa en `__init__.py`-fil för varje paket, vilket tydligt exponerar det publika API:et

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

### Klasser och funktioner

- Följ principen om enskilt ansvar (SRP)
- Begränsa funktionsstorleken till maximalt 50 rader
- Begränsa klassstorleken till maximalt 300 rader
- Använd statiska metoder eller fristående funktioner för operationer som inte är beroende av instansens tillstånd

```python
# Bra
class DataProcessor:
def process_data(self, data):
cleaned_data = self._clean_data(data) 
returnera self._transform_data(cleaned_data) 
def _clean_data(self, data): 
# Rengöringslogik 
returnera cleaned_data 
def _transform_data(self, data): 
# Transformationslogik 
returnera transformed_data 

# Felaktig 
klass DataProcessor: 
def process_data(self, data): 
# 200 rader kod som blandar rengöring och transformation 
returnera resultat 
``` 

### Statisk typning 

- Använd typanteckningar för alla funktioner och metoder 
- Använd `typing`-modulen för komplexa typer 
- Dokumentundantag som kan uppstå 

```python 
från att skriva importera Dict, List, Optional, Union, Any 

def fetch_data(url: str, timeout: Optional[int] = None) -> Dict[str, Any]: 
""" 
Hämtar data från den angivna URL:en. 

Argument: url: URL:en att fråga 
timeout: Timeout i sekunder 

Returnerar: Ordbok som innehåller hämtad data 

Ökningar: 
HTTPException: Om begäran misslyckas 
""" 
# Implementering 
``` 

## Dokumentation 

### Docstrings 

- Använd docstrings för alla moduler, klasser, metoder och funktioner 
- Följ Googles format för docstrings 
- Dokumentparametrar, returvärden och undantag 

```python 
def extract_links(html: str, base_url: str) -> List[Dict[str, str]]: 
""" 
Extraherar alla länkar från en HTML-sida med deras texter och attribut. 

Argument: 
html: HTML-innehåll på sidan 
base_url: Bas-URL för att matcha relativa länkar 

Returnerar: 
Lista över ordböcker som innehåller länkinformation 

Ökningar: 
ValueError: Om HTML-koden är ogiltig 
""" 
``` 

### Kommentarer 

- Använd kommentarer för att förklara "varför", inte "vad" 
- Kommentera komplex eller icke-intuitiv kod 
- Undvik föråldrad eller redundant kommentar 

```python 
# Bra 
# Använd en 5-sekundersgräns för att undvika frekventa timeouts på långsamma webbplatser 
timeout = 5 

# Dålig 
# Ställ in timeouten 
timeout = 5 
``` 

## Testning 

### Teststruktur 

- Använd pytest för alla tester 
- Organisera tester i en struktur som speglar källkoden 
- Namnge testfiler med prefixet `test_` 
- Namnge testfunktioner med prefixet `test_` 

``` 
scraping/ 
scraper.py 
utils.py 
tests/ 
scraping/ 
test_scraper.py 
test_utils.py 
``` 

### Testtäckning 

- Sikta på minst 80 % testtäckning 

- Testa alla kritiska kodvägar 

- Inkludera tester för kantfall och felvillkor 

```python 
def test_scrape_url_success(): 
# Testa det nominella fallet 

def test_scrape_url_timeout(): 
# Testa fallet där URL:en inte svarar 

def test_scrape_url_invalid_url(): 
# Testa med en ogiltig URL 
``` 

### Asynkrona tester 

- Använd `pytest-asyncio` för att testa asynkron kod 
- Använd mock-tester för nätverksanrop i tester 

```python 
import pytest 

@pytest.mark.asyncio 
async def test_async_function(): 
result = await async_function() 
assert result == expected_result 
``` 

## Felhantering 

### Undantag 

- Skapa anpassade undantag för applikationsspecifika fel 
- Använd standard Python-undantag när det är lämpligt 
- Dokumentera alla undantag som kan uppstå 

```python 
class ScrapingException(Exception): 
"""Basundantag för skrapningsfel.""" 
pass 

class RateLimitException(ScrapingException): 
"""Uppstår när en hastighetsgräns uppnås.""" 
pass 
``` 

### Felhantering 

- Använd try/except-block för att hantera fel på lämpligt sätt 
- Undvik att fånga undantag generiskt 
- Logga fel med tillräckligt med kontext för felsökning 

```python 
try: 
result = await scraper.scrape_url(url) 
except RateLimitException: 
logger.warning(f"Hastighetsgräns uppnådd för {url}, försöker igen efter fördröjning") 
await asyncio.sleep(RATE_LIMIT_DELAY) 
resultat = await scraper.scrape_url(url) 
except ScrapingException as e: 
logger.error(f"Misslyckades med att skrapa {url}: {str(e)}") 
raise 
``` 

## Prestanda 

### Asynkron 

- Använd `asyncio` för I/O-intensiva operationer 
- Använd `aiohttp` för asynkrona HTTP-förfrågningar 
- Begränsa antalet samtidiga uppgifter för att undvika överbelastning 

```python 
async def scrape_batch(urls: List[str], max_concurrent: int = 10): 
semaphore = asyncio.Semaphore(max_concurrent) 

async def _scrape_with_semaphore(url): 
async with semaphore: 
return await scrape_url(url) 

tasks = [_scrape_with_semaphore(url) för url i urls] 
returnera await asyncio.gather(*tasks, return_exceptions=True) 
``` 

### Optimeringar 

- Använd lämpliga datastrukturer för vanliga operationer (ordböcker för frekventa uppslagningar) 
- Undvik onödiga kopior av stora datamängder 
- Använd generatorer för att bearbeta stora mängder data 
- Cacha dyra beräkningar eller förfrågningar 

```python 
# Använd generatorer för att bearbeta stora datamängder 
def process_large_dataset(file_path): 
with open(file_path, 'r') as f: 
for line in f: 
yield process_line(line) 
``` 

## Säkerhet 

### Inmatningsvalidering 

- Validera alltid användarinmatning 
- Använd Pydantic för datavalidering 
- Lita aldrig på externa data 

```python 
från pydantic import BaseModel, HttpUrl, validator 

class ScrapingRequest(BaseModel): 
url: HttpUrl 
depth: int = 1 

@validator('djup') 
def validate_depth(cls, v): 
if v < 1 or v > 3: 
raise ValueError('Djup måste vara mellan 1 och 3') 
return v 
``` 

### Hemlighetshantering 

- Inkludera aldrig hemligheter (lösenord, API-nycklar) i källkoden 
- Använd miljövariabler eller säkra konfigurationsfiler 
- Använd python-dotenv för att ladda miljövariabler 

```python 
import os 
from dotenv import load_dotenv 

load_dotenv() 

API_KEY = os.getenv("API_KEY") 
if not API_KEY: 
raise EnvironmentError("API_KEY miljövariabeln är inte set") 
``` 

## Skrapningsspecifikationer 

### Respektera robots.txt 

- Respektera alltid robots.txt-filer 
- Implementera fördröjningar mellan förfrågningar 
- Identifiera dig själv korrekt med en lämplig användaragent 

```python 
från urllib.robotparser import RobotFileParser 
från urllib.parse import urlparse 

def can_fetch(url: str, user_agent: str) -> bool: 
"""Kontrollerar om URL:en kan hämtas enligt robots.txt.""" 
parser = RobotFileParser() 
robots_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt" 
parser.set_url(robots_url) 
parser.read() 
return parser.can_fetch(user_agent, url) 
``` 

### Sessionshantering 

- Återanvänd HTTP-sessioner för att förbättra prestanda 
- Stäng sessioner korrekt efter användning 
- Använd asynkrona kontexter för att säkerställa resursstängning 

```python 
async def scrape_with_session(): 
async with aiohttp.ClientSession() as session: 
# Använd sessionen för alla förfrågningar 
result1 = await fetch_url(session, url1) 
result2 = await fetch_url(session, url2) 
# Sessionen stängs automatiskt här 
``` 

### HTML-parsning 

- Använd `lxml` som parser för BeautifulSoup för bättre prestanda 
- Använd CSS- eller XPath-väljare för DOM-navigering 
- Hantera fall där förväntade element inte finns 

```python 
från bs4 import BeautifulSoup 

def extract_title(html: str) -> Valfritt[str]: 
soup = BeautifulSoup(html, "lxml") 
title_tag = soup.find("title") 
return title_tag.text if title_tag else None 
``` 

## Rekommenderade verktyg 

### Linting och formatering 

- **Black**: Automatisk kodformatering 
- **isort**: Automatisk importsortering 
- **flake8**: Linter för att upptäcka fel och stilproblem 
- **mypy**: Statisk typkontroll 

### Rekommenderad konfiguration 

`pyproject.toml` fil: 

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
warn_return_any = sant 
warn_unused_configs = sant 
disallow_untyped_defs = sant 
disallow_incomplete_defs = sant 
``` 

`.flake8` fil: 

``` 
[flake8] 
max-line-length = 88 
extend-ignore = E203 
exclude = .git,__pycache__,build,dist 
``` 

### CI-integration 

Konfigurera dessa verktyg i din CI-pipeline för att automatiskt kontrollera kod: 

```yaml 
# Exempel på GitHub-åtgärder 
namn: Python Linting 

på: [push, pull_request] 

jobs: 
lint: 
runs-on: ubuntu-latest 
steg: 
- använder: actions/checkout@v2 
- namn: Konfigurera Python 
använder: actions/setup-python@v2 
med: 
python-version: '3.8' 
- namn: Installera beroenden 
run: | 
python -m pip install --upgrade pip 
pip install black isort flake8 mypy 
- namn: Kör linters 
run: | 
black --check . 
isort --check . 
flake8 . 
mypy . 
``` 

--- 

## Slutsats 

Dessa standarder är utformade för att säkerställa kvalitet, underhållbarhet och konsekvens av Python-kod i WhytCard-projektet. Alla bidragsgivare förväntas följa dessa riktlinjer. Om du har frågor eller förslag till förbättringar är du välkommen att dela dem med teamet. 

--- 

Senast uppdaterad: 2025-01-15