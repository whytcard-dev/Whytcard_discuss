# Python-standaarden voor WhytCard

## Inleiding

Dit document definieert de standaarden en best practices die gevolgd moeten worden voor Python-ontwikkeling in het WhytCard-project. Deze regels zijn bedoeld om consistente, onderhoudbare en hoogwaardige code in de gehele codebase te garanderen.

## Inhoudsopgave

1. [Stijlconventies](#style-conventions)
2. [Codestructuur](#code-structure)
3. [Documentatie](#documentatie)
4. [Testen](#testen)
5. [Foutafhandeling](#foutafhandeling)
6. [Prestaties](#performance)
7. [Beveiliging](#security)
8. [Specificaties scraping](#scraping-specifics)
9. [Aanbevolen tools](#recommended-tools)

## Stijlconventies

### PEP 8

We volgen strikt [PEP 8](https://www.python.org/dev/peps/pep-0008/), de officiële Python-stijlgids, met enkele specifieke aanpassingen voor WhytCard.


### Inspringen en opmaak

- Gebruik **4 spaties** voor inspringen (geen tabs)
- Beperk alle regels tot **maximaal 88 tekens** (Black-standaard)
- Gebruik lege regels om functies en klassen te scheiden, evenals grote blokken code binnen functies
- Gebruik spaties rond operatoren en na komma's

```python
# Goed
def calculate_total(prijs, hoeveelheid=1):
totaal = prijs * hoeveelheid
retourneer totaal

# Slecht
def calculate_total(prijs, hoeveelheid = 1):
totaal=prijs*hoeveelheid
retourneer totaal
```

### Naamgevingsconventies

- **Modules en pakketten**: Korte namen in kleine letters, zonder onderstrepingstekens (`scraper.py`, `utils.py`)
- **Klassen**: CamelCase (`ScrapingConfig`, `DataProcessor`)
- **Functies en variabelen**: snake_case (`extract_data()`, `user_agent`)
- **Constanten**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `DEFAULT_TIMEOUT`)
- **"Privé" variabelen**: Voorafgegaan door een onderstrepingsteken (`_internal_cache`)
- **Beschrijvende namen**: Duidelijkheid staat boven beknoptheid

```python
# Goed
klasse UserDataProcessor:

def __init__(self):
self.MAX_BATCH_SIZE = 100
self._temp_storage = {}

def process_user_data(self, user_data):
pass

# Slecht
klasse Processor:

def __init__(self):
self.max = 100
self.temp = {}

def process(self, d):
pass
```

### Imports

- Organiseer imports in drie secties, gescheiden door een lege regel:

1. Standaardbibliotheekimports
2. Bibliotheekimports van derden
3. Lokale projectimports
- Elke sectie moet alfabetisch gesorteerd zijn
- Geef de voorkeur aan expliciete imports boven generieke imports

```python
# Goed
import os
import sys
from typing import Dict, List, Optional

import aiohttp
import bs4
from fastapi import HTTPException

from scraping.utils import URLUtils
from utils.logging import setup_logger

# Slecht
from scraping.utils import *
import aiohttp, bs4
import sys, os
```

## Codestructuur

### Module-indeling

- Elke module moet één, duidelijk gedefinieerde verantwoordelijkheid
- Gebruik pakketten om gerelateerde modules te organiseren
- Maak een `__init__.py`-bestand voor elk pakket, met een duidelijke weergave van de openbare API

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

### Klassen en functies

- Volg het principe van één verantwoordelijkheid (SRP)
- Beperk de functiegrootte tot maximaal 50 regels
- Beperk de klassegrootte tot maximaal 300 regels
- Gebruik statische methoden of standalone functies voor bewerkingen die niet afhankelijk zijn van Instantiestatus

```python
# Goed
klasse DataProcessor:

def process_data(self, data):
cleaned_data = self._clean_data(data)
return self._transform_data(cleaned_data)

def _clean_data(self, data):
# Logica voor opschonen
return washed_data

def _transform_data(self, data):
# Logica voor transformatie
return converted_data

# Slecht
klasse DataProcessor:

def process_data(self, data):
# 200 regels code die opschonen en transformeren combineren
return resultaat
```

### Statische typografie

- Gebruik typeannotaties voor alle functies en methoden
- Gebruik de `typing`-module voor complexe typen
- Documenteer uitzonderingen die kunnen optreden

```python
from typing import Dict, List, Optional, Union, Any

def fetch_data(url: str, timeout: Optional[int] = None) -> Dict[str, Any]:

"""
Haal gegevens op van de opgegeven URL.


Argumenten:

url: De URL om te raadplegen

timeout: Time-out in seconden

Retourneert:

Woordenboek met de opgehaalde gegevens

Retourneert:
HTTPException: Als de aanvraag mislukt
"""
# Implementatie
```

## Documentatie

### Docstrings

- Gebruik docstrings voor alle modules, klassen, methoden en functies

- Volg het Google-formaat voor docstrings
- Documentparameters, retourwaarden en uitzonderingen

```python
def extract_links(html: str, base_url: str) -> List[Dict[str, str]]:

"""
Extraheert alle links uit een HTML-bestand pagina met hun teksten en attributen.


Args:

html: HTML-inhoud van de pagina
base_url: Basis-URL om relatieve links op te lossen

Retourneert:

Lijst met woordenboeken met linkinformatie


Raises:

ValueError: Als de HTML ongeldig is
"""
```

### Opmerkingen

- Gebruik opmerkingen om het "waarom" uit te leggen, niet het "wat"
- Geef complexe of niet-intuïtieve code commentaar
- Vermijd verouderde of overbodige opmerkingen

```python
# Goed
# Gebruik een limiet van 5 seconden om frequente time-outs op trage sites te voorkomen
timeout = 5

# Slecht
# Stel de time-out in
timeout = 5
```

## Testen

### Teststructuur

- Gebruik pytest voor alle tests
- Organiseer tests in een structuur die de broncode weerspiegelt
- Geef testbestanden een naam met de `test_` prefix
- Geef testfuncties een naam met het `test_` prefix

``` 
scraping/ 
scraper.py 
utils.py 
tests/ 
scraping/ 
test_scraper.py 
test_utils.py 
``` 

### Testdekking

- Streef naar een testdekking van ten minste 80%
- Test alle kritieke codepaden
- Neem tests op voor randgevallen en foutcondities

```python
def test_scrape_url_success():

# Test het nominale geval

def test_scrape_url_timeout():

# Test het geval waarin de URL niet reageert

def test_scrape_url_invalid_url():
# Test met een ongeldige URL
``` 

### Asynchrone tests

- Gebruik `pytest-asyncio` voor het testen van asynchrone code
- Gebruik mocks voor netwerkaanroepen in tests

```python
import pytest

@pytest.mark.asyncio
async def test_async_function():
result = wait async_function()
assert result == expected_result
```

## Foutafhandeling

### Uitzonderingen

- Maak aangepaste uitzonderingen voor applicatiespecifieke fouten
- Gebruik standaard Python-uitzonderingen waar nodig
- Documenteer alle uitzonderingen die kunnen optreden

```python
class ScrapingException(Exception):
"""Basisuitzondering voor scraping-fouten."""
pass

class RateLimitException(ScrapingException):
"""Wordt gegenereerd wanneer een snelheidslimiet is bereikt."""
pass
```

### Foutafhandeling

- Gebruik try/except-blokken om fouten af te handelen op de juiste manier
- Vermijd het generiek afvangen van Exceptions
- Log fouten met voldoende context voor foutopsporing

```python
try:
result = wait scraper.scrape_url(url)
except RateLimitException:
logger.warning(f"Rate limit bereikt voor {url}, opnieuw proberen na vertraging")
wait asyncio.sleep(RATE_LIMIT_DELAY)
result = wait scraper.scrape_url(url)
except ScrapingException als e:
logger.error(f"Kan {url} niet scrapen: {str(e)}")
raise
```

## Prestaties

### Asynchroon

- Gebruik `asyncio` voor I/O-intensieve bewerkingen
- Gebruik `aiohttp` voor asynchrone HTTP-verzoeken
- Beperk het aantal gelijktijdige taken om te voorkomen overbelasting

```python
async def scrape_batch(urls: List[str], max_concurrent: int = 10):
semaphore = async.Semaphore(max_concurrent)

async def _scrape_with_semaphore(url):
async met semaphore:
return wait scrape_url(url)

tasks = [_scrape_with_semaphore(url) voor url in urls]
return wait asyncio.gather(*tasks, return_exceptions=True)
```

### Optimalisaties

- Gebruik geschikte datastructuren voor veelvoorkomende bewerkingen (woordenboeken voor frequente opzoekacties)
- Vermijd onnodige kopieën van grote hoeveelheden data
- Gebruik generators om grote hoeveelheden data te verwerken
- Cache dure berekeningen of requests

```python
# Generatoren gebruiken om grote datasets te verwerken
def process_large_dataset(file_path):
with open(file_path, 'r') as f:

for line in f:
yield process_line(line)
```

## Beveiliging

### Invoervalidatie

- Valideer altijd gebruikersinvoer
- Gebruik Pydantic voor gegevensvalidatie
- Vertrouw nooit externe gegevens

```python
from pydantic import BaseModel, HttpUrl, validator

class ScrapingRequest(BaseModel):
url: HttpUrl
diepte: int = 1

@validator('diepte')
def validate_depth(cls, v):
if v < 1 or v > 3:
raise ValueError('Diepte moet tussen 1 en 3 liggen')
return v 
``` 

### Geheimenbeheer

- Voeg nooit geheimen (wachtwoorden, API-sleutels) toe aan de broncode

- Gebruik omgevingsvariabelen of beveiligde configuratiebestanden
- Gebruik python-dotenv om omgevingsvariabelen te laden

```python 
import os 
from dotenv import load_dotenv 

load_dotenv() 

API_KEY = os.getenv("API_KEY") 
if not API_KEY: 
raise EnvironmentError("API_KEY environment variable is not set") 
``` 

## Details scrapen

### Robots.txt respecteren

- Respecteer altijd robots.txt-bestanden
- Implementeer vertragingen tussen verzoeken
- Identificeer uzelf correct met een geschikte user-agent

```python 
from urllib.robotparser import RobotFileParser 
from urllib.parse import urlparse

def can_fetch(url: str, user_agent: str) -> bool:
"""Controleert of de URL kan worden opgehaald volgens robots.txt."""
parser = RobotFileParser()
robots_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt"
parser.set_url(robots_url)
parser.read()
return parser.can_fetch(user_agent, url)
```

### Sessiebeheer

- HTTP-sessies hergebruiken om de prestaties te verbeteren
- Sessies correct sluiten na gebruik
- Asynchrone contexten gebruiken om resourceafsluiting te garanderen

```python
async def scrape_with_session():
async with aiohttp.ClientSession() als sessie:

# Gebruik de sessie voor alle verzoeken
result1 = wait fetch_url(sessie, url1)
result2 = wait fetch_url(sessie, url2)
# Sessie wordt hier automatisch gesloten
```

### HTML-parsing

- Gebruik `lxml` als parser voor BeautifulSoup voor betere prestaties

- Gebruik CSS- of XPath-selectors voor DOM-navigatie

- Behandel gevallen waarin verwachte elementen niet bestaan

```python
from bs4 import BeautifulSoup

def extract_title(html: str) -> Optional[str]:
soup = BeautifulSoup(html, "lxml")
title_tag = soup.find("title")
return title_tag.text if title_tag else None
```

## Aanbevolen tools

### Linting en opmaak

- **Black**: Automatische codeformatter
- **isort**: Automatische importsorteerder
- **flake8**: Linter om fouten en stijlproblemen te detecteren
- **mypy**: Statische typecontrole

### Aanbevolen configuratie

`pyproject.toml`-bestand:

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

`.flake8` bestand:

``` 
[flake8]
max-line-length = 88
extend-ignore = E203
exclude = .git,__pycache__,build,dist
``` 

### CI-integratie

Configureer deze tools in je CI-pijplijn om automatisch code te controleren:

```yaml
# Voorbeeld voor GitHub-acties
naam: Python Linting

on: [push, pull_request]

taken:

lint:
runs-on: ubuntu-latest
stappen:
- gebruikt: actions/checkout@v2
- naam: Python instellen
gebruikt: actions/setup-python@v2
met:

python-versie: '3.8'
- naam: Afhankelijkheden installeren
run: | python -m pip install --upgrade pip
pip install black isort flake8 mypy
- naam: Run linters
run: |
black --check . 
isort --check . 
flake8 . 
mypy . 
``` 

--- 

## Conclusie

Deze standaarden zijn ontworpen om de kwaliteit, onderhoudbaarheid en consistentie van de Python-code in het WhytCard-project te garanderen. Van alle bijdragers wordt verwacht dat zij deze richtlijnen volgen. Als u vragen of suggesties voor verbetering heeft, kunt u deze gerust met het team delen.

--- 

Laatst bijgewerkt: 2025-01-15