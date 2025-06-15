# Standardy Pythona dla WhytCard

## Wprowadzenie

Niniejszy dokument definiuje standardy i najlepsze praktyki, których należy przestrzegać podczas tworzenia kodu Python w projekcie WhytCard. Zasady te mają na celu zapewnienie spójnego, łatwego w utrzymaniu i wysokiej jakości kodu w całej bazie kodu.

## Spis treści 

1. [Konwencje stylów](#style-conventions) 
2. [Struktura kodu](#code-structure) 
3. [Dokumentacja](#documentation) 
4. [Testowanie](#testing) 
5. [Obsługa błędów](#error-handling) 
6. [Wydajność](#performance) 
7. [Bezpieczeństwo](#security) 
8. [Szczegóły scrapowania](#scraping-specifics) 
9. [Zalecane narzędzia](#recommended-tools) 

## Konwencje stylów 

### PEP 8 

Ściśle przestrzegamy [PEP 8](https://www.python.org/dev/peps/pep-0008/), oficjalnego przewodnika po stylach Pythona, z pewnymi konkretnymi dostosowaniami dla WhytCard. 

### Wcięcia i formatowanie

- Użyj **4 spacji** do wcięć (bez tabulatorów)
- Ogranicz wszystkie wiersze do **maksymalnie 88 znaków** (czarny standard)
- Użyj pustych wierszy do oddzielenia funkcji i klas, a także dużych bloków kodu w funkcjach
- Użyj spacji wokół operatorów i po przecinkach

```python
# Dobrze 
def calculated_total(price, quantity=1): 
total = price * quantity 
return total 

# Źle 
def calculated_total(price,quantity = 1): 
total=price*quantity 
return total 
``` 

### Konwencje nazewnictwa

- **Moduły i pakiety**: Krótkie, małe litery, bez podkreśleń (`scraper.py`, `utils.py`) 
- **Klasy**: CamelCase (`ScrapingConfig`, `DataProcessor`) 
- **Funkcje i zmienne**: snake_case (`extract_data()`, `user_agent`) 
- **Stałe**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `DEFAULT_TIMEOUT`) 
- **Zmienne „prywatne”**: Przedrostek z podkreśleniem (`_internal_cache`) 
- **Nazwy opisowe**: Priorytet przejrzystości nad zwięzłością 

```python 
# Dobra 
klasa UserDataProcessor: 
def __init__(self): 
self.MAX_BATCH_SIZE = 100 
self._temp_storage = {} 

def process_user_data(self, user_data): 
pass 

# Zła 
klasa Processor: 
def __init__(self): 
self.max = 100 
self.temp = {} 

def process(self, d): 
pass 
``` 

### Importy 

- Zorganizuj importy w trzy sekcje oddzielone pustą linią: 
1. Standardowe importy bibliotek 
2. Importy bibliotek innych firm 
3. Lokalne importy projektów 
- Każda sekcja powinna być posortowana alfabetycznie 
- Preferuj jawne importy nad importami generycznymi 

```python 
# Dobrze 
import os 
import sys 
from typing import Dict, List, Optional 

import aiohttp 
import bs4 
from fastapi import HTTPException 

from scraping.utils import URLUtils 
from utils.logging import setup_logger 

# Źle 
from scraping.utils import * 
import aiohttp, bs4 
import sys, os 
``` 

## Struktura kodu 

### Moduł Organizacja

- Każdy moduł powinien mieć pojedynczą, dobrze zdefiniowaną odpowiedzialność
- Użyj pakietów do organizowania powiązanych modułów
- Utwórz plik `__init__.py` dla każdego pakietu, wyraźnie ujawniając publiczny interfejs API

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

### Klasy i funkcje

- Postępuj zgodnie z zasadą pojedynczej odpowiedzialności (SRP)
- Ogranicz rozmiar funkcji do maksymalnie 50 wierszy
- Ogranicz rozmiar klasy do maksymalnie 300 wiersze 
- Użyj metod statycznych lub samodzielnych funkcji dla operacji, które nie zależą od stanu instancji 

```python 
# Dobra 
klasa DataProcessor: 
def process_data(self, data): 
cleaned_data = self._clean_data(data) 
return self._transform_data(cleaned_data) 

def _clean_data(self, data): 
# Logika czyszczenia 
return cleaned_data 

def _transform_data(self, data): 
# Logika transformacji 
return transformed_data 

# Zła 
klasa DataProcessor: 
def process_data(self, data): 
# 200 wierszy kodu łączących czyszczenie i transformację 
return result 
``` 

### Typowanie statyczne 

- Użyj adnotacji typu dla wszystkich funkcji i metod 
- Użyj modułu `typing` dla typów złożonych 
- Dokumentuj wyjątki, które mogą być raised 

```python 
from typing import Dict, List, Optional, Union, Any 

def fetch_data(url: str, timeout: Optional[int] = None) -> Dict[str, Any]: 
""" 
Pobiera dane z określonego adresu URL. 

Argumenty: 
url: Adres URL do zapytania 
timeout: Limit czasu w sekundach 

Zwraca: 
Słownik zawierający pobrane dane 

Podnosi: 
HTTPException: Jeśli żądanie się nie powiedzie 
""" 
# Implementacja 
``` 

## Dokumentacja 

### Docstrings 

- Użyj docstrings dla wszystkich modułów, klas, metod i funkcji 
- Postępuj zgodnie z formatem Google dla docstrings 
- Parametry dokumentu, wartości zwracane i wyjątki 

```python 
def extract_links(html: str, base_url: str) -> List[Dict[str, str]]: 
""" 
Wyodrębnia wszystkie linki ze strony HTML wraz z ich tekstami i atrybutami. 

Argumenty: 
html: zawartość HTML strony 
base_url: adres URL bazowy do rozwiązywania linków 

Zwraca: 
Lista słowników zawierających informacje o linkach 

Podnosi: 
ValueError: jeśli kod HTML jest nieprawidłowy 
""" 
``` 

### Komentarze 

- Użyj komentarzy, aby wyjaśnić „dlaczego”, a nie „co” 
- Skomentuj złożony lub nieintuicyjny kod 
- Unikaj przestarzałych lub zbędnych komentarzy 

```python 
# Dobrze 
# Użyj 5-sekundowego limitu, aby uniknąć częstych przekroczeń limitu czasu na wolnych stronach 
timeout = 5 

# Źle 
# Ustaw limit czasu 
timeout = 5 
``` 

## Testowanie 

### Test Struktura

- Użyj pytest do wszystkich testów
- Zorganizuj testy w strukturze odzwierciedlającej kod źródłowy
- Nazwij pliki testowe prefiksem `test_`
- Nazwij funkcje testowe prefiksem `test_`

``` 
scraping/ 
scraper.py 
utils.py 
tests/ 
scraping/ 
test_scraper.py 
test_utils.py 
``` 

### Pokrycie testem

- Dąż do uzyskania co najmniej 80% pokrycia testem
- Przetestuj wszystkie krytyczne ścieżki kodu

- Dołącz testy dla przypadków skrajnych i warunków błędów

```python

def test_scrape_url_success():
# Przetestuj przypadek nominalny


def test_scrape_url_timeout():
# Przetestuj przypadek, w którym adres URL nie odpowiada

def test_scrape_url_invalid_url(): 
# Test z nieprawidłowym adresem URL 
``` 

### Testy asynchroniczne 

- Użyj `pytest-asyncio` do testowania kodu asynchronicznego 
- Użyj atrap wywołań sieciowych w testach 

```python 
import pytest 

@pytest.mark.asyncio 
async def test_async_function(): 
result = await async_function() 
assert result == expected_result 
``` 

## Obsługa błędów 

### Wyjątki 

- Utwórz niestandardowe wyjątki dla błędów specyficznych dla aplikacji 
- Użyj standardowych wyjątków Pythona, gdy jest to właściwe 
- Udokumentuj wszystkie wyjątki, które mogą zostać zgłoszone 

```python 
class ScrapingException(Exception): 
"""Wyjątek podstawowy dla błędów scrapowania.""" 
pass 

class RateLimitException(ScrapingException): 
"""Podniesiony gdy osiągnięty zostanie limit szybkości.""" 
pass 
``` 

### Obsługa błędów 

- Użyj bloków try/except, aby odpowiednio obsługiwać błędy 
- Unikaj wychwytywania wyjątków generycznych 
- Rejestruj błędy z wystarczającym kontekstem do debugowania 

```python 
try: 
result = await scraper.scrape_url(url) 
except RateLimitException: 
logger.warning(f"Osiągnięto limit szybkości dla {url}, ponawianie próby po opóźnieniu") 
await asyncio.sleep(RATE_LIMIT_DELAY) 
result = await scraper.scrape_url(url) 
except ScrapingException as e: 
logger.error(f"Nie udało się zeskrobać {url}: {str(e)}") 
raise 
``` 

## Wydajność 

### Asynchroniczne 

- Użyj `asyncio` w przypadku intensywnego wejścia/wyjścia operacje 
- Użyj `aiohttp` dla asynchronicznych żądań HTTP 
- Ogranicz liczbę równoczesnych zadań, aby uniknąć przeciążenia 

```python 
async def scrape_batch(urls: List[str], max_concurrent: int = 10): 
semaphore = asyncio.Semaphore(max_concurrent) 

async def _scrape_with_semaphore(url): 
async with semaphore: 
return await scrape_url(url) 

tasks = [_scrape_with_semaphore(url) for url in urls] 
return await asyncio.gather(*tasks, return_exceptions=True) 
``` 

### Optymalizacje 

- Użyj odpowiednich struktur danych dla typowych operacji (słowniki dla częstych wyszukiwań) 
- Unikaj niepotrzebnych kopii dużych danych 
- Użyj generatory do przetwarzania dużych ilości danych 
- Buforowanie kosztownych obliczeń lub żądań 

```python 
# Używanie generatorów do przetwarzania dużych zestawów danych 
def process_large_dataset(file_path): 
with open(file_path, 'r') as f: 
for line in f: 
yield process_line(line) 
``` 

## Bezpieczeństwo 

### Walidacja danych wejściowych 

- Zawsze sprawdzaj poprawność danych wejściowych użytkownika 
- Używaj Pydantic do sprawdzania poprawności danych 
- Nigdy nie ufaj danym zewnętrznym 

```python 
from pydantic import BaseModel, HttpUrl, validator 

class ScrapingRequest(BaseModel): 
url: HttpUrl 
depth: int = 1 

@validator('depth') 
def validate_depth(cls, v): 
if v < 1 or v > 3: 
raise ValueError('Głębokość musi być pomiędzy 1 i 3') 
return v 
``` 

### Zarządzanie sekretami 

- Nigdy nie umieszczaj sekretów (haseł, kluczy API) w kodzie źródłowym 
- Używaj zmiennych środowiskowych lub bezpiecznych plików konfiguracyjnych 
- Używaj python-dotenv do ładowania zmiennych środowiskowych 

```python 
import os 
from dotenv import load_dotenv 

load_dotenv() 

API_KEY = os.getenv("API_KEY") 
if not API_KEY: 
raise EnvironmentError("Zmienna środowiskowa API_KEY nie jest ustawiona") 
``` 

## Szczegóły scrapowania 

### Szanowanie pliku robots.txt 

- Zawsze szanuj pliki robots.txt 
- Wdrażaj opóźnienia między żądaniami 
- Prawidłowo identyfikuj się za pomocą odpowiedniego User-Agent 

```python 
from urllib.robotparser import RobotFileParser 
from urllib.parse import urlparse 

def can_fetch(url: str, user_agent: str) -> bool: 
"""Sprawdza, czy adres URL można pobrać zgodnie z plikiem robots.txt.""" 
parser = RobotFileParser() 
robots_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt" 
parser.set_url(robots_url) 
parser.read() 
return parser.can_fetch(user_agent, url) 
``` 

### Zarządzanie sesjami 

- Ponowne wykorzystanie sesji HTTP w celu zwiększenia wydajności 
- Prawidłowe zamykanie sesji po użyj 
- Użyj asynchronicznych kontekstów, aby zapewnić zamknięcie zasobów 

```python 
async def scrape_with_session(): 
async with aiohttp.ClientSession() as session: 
# Użyj sesji dla wszystkich żądań 
result1 = await fetch_url(session, url1) 
result2 = await fetch_url(session, url2) 
# Sesja jest tutaj automatycznie zamykana 
``` 

### Analiza składniowa HTML 

- Użyj `lxml` jako parsera dla BeautifulSoup w celu uzyskania lepszej wydajności 
- Użyj selektorów CSS lub XPath do nawigacji DOM 
- Obsługuj przypadki, w których oczekiwane elementy nie istnieją 

```python 
from bs4 import BeautifulSoup 

def extract_title(html: str) -> Optional[str]: 
soup = BeautifulSoup(html, "lxml") 
title_tag = soup.find("title") 
return title_tag.text if title_tag else None 
``` 

## Polecane narzędzia 

### Linting i formatowanie 

- **Black**: Automatyczny formater kodu 
- **isort**: Automatyczny sorter importu 
- **flake8**: Linter wykrywający błędy i problemy ze stylem 
- **mypy**: Statyczne sprawdzanie typów 

### Zalecana konfiguracja 

plik `pyproject.toml`: 

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

plik `.flake8`: 

``` 
[flake8] 
max-line-length = 88 
extend-ignore = E203 
exclude = .git,__pycache__,build,dist 
``` 

### Integracja CI 

Skonfiguruj te narzędzia w swoim procesie CI, aby automatycznie sprawdzać kod: 

```yaml 
# Przykład akcji GitHub 
name: Python Linting 

on: [push, pull_request] 

jobs: 
lint: 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v2 
- name: Konfigurowanie Pythona 
uses: actions/setup-python@v2 
with: 
python-version: '3.8' 
- name: Zainstaluj zależności 
run: | 
python -m pip install --upgrade pip 
pip install black isort flake8 mypy 
- name: Uruchom linters 
run: | 
black --check . 
isort --check . 
flake8 . 
mypy . 
``` 

--- 

## Wnioski 

Standardy te mają na celu zapewnienie jakości, łatwości utrzymania i spójności kodu Pythona w projekcie WhytCard. Oczekuje się, że wszyscy współpracownicy będą przestrzegać tych wytycznych. Jeśli masz pytania lub sugestie dotyczące ulepszeń, podziel się nimi z zespołem. 

--- 

Ostatnia aktualizacja: 2025-01-15