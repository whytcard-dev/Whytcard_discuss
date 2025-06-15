# Python-Standards für WhytCard

## Einleitung

Dieses Dokument definiert die Standards und Best Practices für die Python-Entwicklung im WhytCard-Projekt. Diese Regeln sollen konsistenten, wartbaren und qualitativ hochwertigen Code in der gesamten Codebasis gewährleisten.

## Inhaltsverzeichnis

1. [Stilkonventionen](#style-conventions)
2. [Codestruktur](#code-structure)
3. [Dokumentation](#documentation)
4. [Testen](#testing)
5. [Fehlerbehandlung](#error-handling)
6. [Leistung](#performance)
7. [Sicherheit](#security)
8. [Scraping-Besonderheiten](#scraping-specifics)
9. [Empfohlene Tools](#recommended-tools)

## Stilkonventionen

### PEP 8

Wir halten uns strikt an [PEP 8](https://www.python.org/dev/peps/pep-0008/), den offiziellen Python-Styleguide, mit einigen spezifischen Anpassungen für WhytCard.

### Einrückung und Formatierung

- Verwenden Sie **4 Leerzeichen** für die Einrückung (keine Tabulatoren).
- Begrenzen Sie alle Zeilen auf **maximal 88 Zeichen** (schwarzer Standard).
- Verwenden Sie Leerzeilen, um Funktionen und Klassen sowie große Codeblöcke innerhalb von Funktionen zu trennen.
- Verwenden Sie Leerzeichen um Operatoren und nach Kommas.

```python
# Gut
def calculate_total(price, quantity=1):
total = price * quantity
return total

# Schlecht
def calculate_total(price,quantity = 1):
total=price*quantity
return total
```

### Namenskonventionen

- **Module und Pakete**: Kurze, kleingeschriebene Namen ohne Unterstriche (`scraper.py`, `utils.py`)
- **Klassen**: CamelCase (`ScrapingConfig`, `DataProcessor`)
- **Funktionen und Variablen**: snake_case (`extract_data()`, `user_agent`)
- **Konstanten**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `DEFAULT_TIMEOUT`)
- **"Private" Variablen**: Mit einem Unterstrich versehen (`_internal_cache`)
- **Beschreibende Namen**: Klarheit ist wichtiger als Kürze

```python
# Gut
Klasse UserDataProcessor:

def __init__(self):
self.MAX_BATCH_SIZE = 100
self._temp_storage = {}

def process_user_data(self, user_data):
pass

# Schlecht
Klasse Processor:
def __init__(self):
self.max = 100
self.temp = {}

def process(self, d):
Pass 
``` 

### Importe 

- Importe in drei Abschnitte unterteilen, getrennt durch eine Leerzeile: 
1. Importe von Standardbibliotheken 
2. Importe von Drittanbieterbibliotheken 
3. Importe von lokalen Projekten 
- Jeder Abschnitt sollte alphabetisch sortiert sein.
- Explizite Importe sollten generischen Importen vorgezogen werden.

```python 
# Gut 
import os 
import sys 
from typing import Dict, List, Optional 

import aiohttp 
import bs4 
from fastapi import HTTPException 

from scraping.utils import URLUtils 
from utils.logging import setup_logger 

# Schlecht 
from scraping.utils import * 
import aiohttp, bs4 
import sys, os 
``` 

## Codestruktur 

### Modulorganisation 

- Jedes Modul sollte eine einzige, klar definierte Verantwortung haben.
- Pakete verwenden, um verwandte Module zu organisieren.
- Erstellen Eine `__init__.py`-Datei für jedes Paket, die die öffentliche API klar darstellt.

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

### Klassen und Funktionen

- Befolgen Sie das Single Responsibility Principle (SRP)
- Begrenzen Sie die Funktionsgröße auf maximal 50 Zeilen
- Begrenzen Sie die Klassengröße auf maximal 300 Zeilen
- Verwenden Sie statische Methoden oder eigenständige Funktionen für Operationen, die nicht vom Instanzstatus abhängen

```python
# Gut
Klasse DataProcessor:
def process_data(self, Daten): 
cleaned_data = self._clean_data(data) 
return self._transform_data(cleaned_data) 

def _clean_data(self, data): 
# Bereinigungslogik 
return cleaned_data 

def _transform_data(self, data): 
# Transformationslogik 
return transformed_data 

# Fehlerhaft 
Klasse DataProcessor: 
def process_data(self, data): 
# 200 Zeilen Code, die Bereinigung und Transformation mischen 
return result 
``` 

### Statische Typisierung 

- Typannotationen für alle Funktionen und Methoden verwenden 
- Das Modul `typing` für komplexe Typen verwenden 
- Eventuell auftretende Ausnahmen dokumentieren 

```python 
from typing import Dict, List, Optional, Union, Any 

def fetch_data(url: str, timeout: Optional[int] = None) -> Dict[str, Any]: 
""" 
Löscht Daten von der angegebenen URL.

Argumente:

url: Die abzufragende URL
timeout: Timeout in Sekunden

Rückgabewert:
Wörterbuch mit den abgerufenen Daten

Löst aus:
HTTPException: Wenn die Anfrage fehlschlägt
""" 
# Implementierung
``` 

## Dokumentation

### Docstrings

- Verwenden Sie Docstrings für alle Module, Klassen, Methoden und Funktionen.
- Beachten Sie das Google-Format für Docstrings.
- Dokumentieren Sie Parameter, Rückgabewerte und Ausnahmen.

```python
def extract_links(html: str, base_url: str) -> List[Dict[str, str]]:
"" 
Extrahiert alle Links einer HTML-Seite mit ihren Texten und Attributen.

Argumente:

html: HTML-Inhalt der Seite
base_url: Basis-URL zur Auflösung relativer Links Links


Gibt zurück:

Liste der Wörterbücher mit Linkinformationen


Löst aus:

ValueError: Wenn das HTML ungültig ist

""


### Kommentare

- Erklären Sie in Kommentaren das "Warum", nicht das "Was".
- Kommentieren Sie komplexen oder nicht intuitiven Code.
- Vermeiden Sie veraltete oder redundante Kommentare.




python

# Gut
# Verwenden Sie ein 5-Sekunden-Limit, um häufige Timeouts auf langsamen Websites zu vermeiden.

timeout = 5

# Schlecht
# Setzen Sie das Timeout.

timeout = 5


## Testen

### Teststruktur

- Verwenden Sie pytest für alle Tests.
- Organisieren Sie die Tests in einer Struktur, die den Quellcode widerspiegelt.
- Benennen Sie Testdateien mit dem Präfix `test_`.
- Benennen Sie Testfunktionen mit dem Präfix `test_`.



scraping/
scraper.py
utils.py 
tests/ 
scraping/ 
test_scraper.py 
test_utils.py 
``` 

### Testabdeckung 

- Mindestens 80 % Testabdeckung anstreben 
- Alle kritischen Codepfade testen 
- Tests für Randfälle und Fehlerzustände einbinden 

```python 
def test_scrape_url_success(): 
# Normalfall testen 

def test_scrape_url_timeout(): 
# Fall testen, in dem die URL nicht reagiert 

def test_scrape_url_invalid_url(): 
# Mit einer ungültigen URL testen 
``` 

### Asynchrone Tests 

- `pytest-asyncio` zum Testen von asynchronem Code verwenden 
- Mocks für Netzwerkaufrufe in Tests verwenden 

```python 
import pytest

@pytest.mark.asyncio
async def test_async_function():
Ergebnis = await async_function()
Assert Ergebnis == erwartetes Ergebnis
```

## Fehlerbehandlung

### Ausnahmen

- Erstellen Sie benutzerdefinierte Ausnahmen für anwendungsspezifische Fehler.
- Verwenden Sie gegebenenfalls Standard-Python-Ausnahmen.
- Dokumentieren Sie alle möglicherweise auftretenden Ausnahmen.

```python
class ScrapingException(Exception):
"""Basisausnahme für Scraping-Fehler."""
pass

class RateLimitException(ScrapingException):
"""Wird ausgelöst, wenn ein Ratenlimit erreicht ist."""
pass
```

### Fehlerbehandlung

- Verwenden Sie try/except-Blöcke, um Fehler angemessen zu behandeln.
- Vermeiden Sie das generische Abfangen von Ausnahmen.
- Protokollieren Sie Fehler mit ausreichend Kontext für das Debugging.

```python
try:

ergebnis = await scraper.scrape_url(url)
except RateLimitException:
logger.warning(f"Ratenlimit für {url} erreicht, Wiederholung nach Verzögerung")
await asyncio.sleep(RATE_LIMIT_DELAY)
result = await scraper.scrape_url(url)
except ScrapingException as e:
logger.error(f"Fehler beim Scrapen von {url}: {str(e)}")
raise
```

## Performance

### Asynchron

- `asyncio` für I/O-intensive Operationen verwenden
- `aiohttp` für asynchrone HTTP-Anfragen verwenden
- Anzahl gleichzeitiger Tasks begrenzen, um Überlastung zu vermeiden

```python
async def scrape_batch(urls: List[str], max_concurrent: int = 10):
semaphore = asyncio.Semaphore(max_concurrent)

async def _scrape_with_semaphore(url):
async with semaphore:
return await scrape_url(url)

tasks = [_scrape_with_semaphore(url) for url in urls]
return await asyncio.gather(*tasks, return_exceptions=True)


### Optimierungen

- Geeignete Datenstrukturen für häufige Operationen verwenden (Wörterbücher für häufige Suchvorgänge)
- Unnötige Kopien großer Datenmengen vermeiden
- Generatoren zur Verarbeitung großer Datenmengen verwenden
- Aufwändige Berechnungen oder Anfragen zwischenspeichern


python
# Generatoren zur Verarbeitung großer Datensätze verwenden

def process_large_dataset(file_path):

with open(file_path, 'r') as f:

for line in f:
yield process_line(line) 
``` 

## Sicherheit 

### Eingabevalidierung 

- Benutzereingaben immer validieren 
- Datenvalidierung mit Pydantic durchführen 
- Externen Daten niemals vertrauen 

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

### Geheimhaltung 

- Niemals geheime Informationen (Passwörter, API-Schlüssel) in den Quellcode einbinden 
- Umgebungsvariablen oder sichere Konfigurationsdateien verwenden 
- Umgebung mit python-dotenv laden Variablen

```python
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
wenn nicht API_KEY:
raise EnvironmentError("API_KEY-Umgebungsvariable ist nicht gesetzt")
```

## Scraping-Besonderheiten

### Robots.txt beachten

- Robots.txt-Dateien immer beachten
- Verzögerungen zwischen Anfragen implementieren
- Identifizieren Sie sich korrekt mit einem geeigneten User-Agent

```python
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse

def can_fetch(url: str, user_agent: str) -> bool:
"""Prüft, ob die URL gemäß robots.txt abgerufen werden kann."""
parser = RobotFileParser() 
robots_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt" 
parser.set_url(robots_url) 
parser.read() 
return parser.can_fetch(user_agent, url) 
``` 

### Sitzungsverwaltung 

- HTTP-Sitzungen wiederverwenden, um die Performance zu verbessern 
- Sitzungen nach Gebrauch ordnungsgemäß schließen 
- Asynchrone Kontexte verwenden, um das Schließen von Ressourcen sicherzustellen 

```python 
async def scrape_with_session(): 
async with aiohttp.ClientSession() as session: 
# Sitzung für alle Anfragen verwenden 
result1 = await fetch_url(session, url1) 
result2 = await fetch_url(session, url2) 
# Sitzung wird automatisch geschlossen hier
``` 

### HTML-Parsing

- Verwenden Sie `lxml` als Parser für BeautifulSoup für eine bessere Performance.
- Verwenden Sie CSS- oder XPath-Selektoren für die DOM-Navigation.
- Behandeln Sie Fälle, in denen erwartete Elemente nicht vorhanden sind.

```python
from bs4 import BeautifulSoup

def extract_title(html: str) -> Optional[str]:
soup = BeautifulSoup(html, "lxml")
title_tag = soup.find("title")
return title_tag.text if title_tag else None
``` 

## Empfohlene Tools

### Linting und Formatierung

- **Black**: Automatischer Code-Formatierer
- **isort**: Automatischer Import-Sortierer
- **flake8**: Linter zur Erkennung von Fehlern und Stilproblemen
- **mypy**: Statische Typprüfung

### Empfohlene Konfiguration

`pyproject.toml` Datei: 

```toml 
[tool.black] 
Zeilenlänge = 88 
Zielversion = ['py38'] 
Include = '\.pyi?$' 

[tool.isort] 
Profil = "black" 
Zeilenlänge = 88 

[tool.mypy] 
Python-Version = "3.8" 
Warn_Return_any = true 
Warn_Unused_Configs = true 
Disallow_Untyped_Defs = true 
Disallow_Incomplete_Defs = true 
``` 

`.flake8` Datei: 

``` 
[flake8] 
Maximale Zeilenlänge = 88 
Extend-Ignore = E203 
Exclude = .git,__pycache__,build,dist 
``` 

### CI-Integration 

Konfigurieren Sie diese Tools in Ihrer CI-Pipeline, um automatisch Prüfcode:

```yaml
# Beispiel für GitHub-Aktionen
Name: Python-Linting

bei: [push, pull_request]

Jobs:
Lint:
Läuft auf: ubuntu-latest
Schritte:
- Verwendet: actions/checkout@v2
- Name: Python einrichten
- Verwendet: actions/setup-python@v2
- Mit:
Python-Version: '3.8'
- Name: Abhängigkeiten installieren
Ausführen: |
python -m pip install --upgrade pip
pip install black isort flake8 mypy
- Name: Linter ausführen
Ausführen: |
black --check.
isort --check.
flake8.
mypy
``` 

--- 

## Fazit

Diese Standards sollen die Qualität, Wartbarkeit und Konsistenz des Python-Codes im WhytCard-Projekt sicherstellen. Von allen Mitwirkenden wird erwartet, dass sie diese Richtlinien einhalten. Bei Fragen oder Verbesserungsvorschlägen können Sie diese gerne an das Team weitergeben.

--- 

Letzte Aktualisierung: 15.01.2025