# Standard Python per WhytCard

## Introduzione

Questo documento definisce gli standard e le best practice da seguire per lo sviluppo Python nel progetto WhytCard. Queste regole mirano a garantire un codice coerente, manutenibile e di alta qualità in tutta la base di codice.

## Indice

1. [Convenzioni di stile](#style-conventions)
2. [Struttura del codice](#code-structure)
3. [Documentazione](#documentation)
4. [Test](#testing)
5. [Gestione degli errori](#error-handling)
6. [Prestazioni](#performance)
7. [Sicurezza](#security)
8. [Specifiche di scraping](#scraping-specifics)
9. [Strumenti consigliati](#recommended-tools)

## Convenzioni di stile

### PEP 8

Seguiamo rigorosamente [PEP 8](https://www.python.org/dev/peps/pep-0008/), la guida di stile ufficiale di Python, con alcuni adattamenti specifici per WhytCard.

### Rientro e formattazione

- Utilizzare **4 spazi** per il rientro (senza tabulazioni)
- Limitare tutte le righe a un **massimo di 88 caratteri** (standard nero)
- Utilizzare righe vuote per separare funzioni e classi, nonché grandi blocchi di codice all'interno delle funzioni
- Utilizzare spazi intorno agli operatori e dopo le virgole

```python
# Corretto
def calculate_total(prezzo, quantità=1):
totale = prezzo * quantità
return totale

# Sbagliato
def calculate_total(prezzo, quantità = 1):
totale=prezzo*quantità
return totale
```

### Convenzioni di denominazione

- **Moduli e pacchetti**: Nomi brevi, in minuscolo, senza caratteri di sottolineatura (`scraper.py`, `utils.py`)
- **Classi**: CamelCase (`ScrapingConfig`, `DataProcessor`)
- **Funzioni e Variabili**: snake_case (`extract_data()`, `user_agent`)
- **Costanti**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `DEFAULT_TIMEOUT`)
- **Variabili "private"**: Precedute da un trattino basso (`_internal_cache`)
- **Nomi descrittivi**: Privilegiare la chiarezza rispetto alla brevità

```python
# Corretto
class UserDataProcessor:
def __init__(self):
self.MAX_BATCH_SIZE = 100
self._temp_storage = {}

def process_user_data(self, user_data):
superato

# Scorretto
class Processor:
def __init__(self):
self.max = 100
self.temp = {}

def process(self, d):
pass 
``` 

### Importazioni

- Organizzare le importazioni in tre sezioni separate da una riga vuota:
1. Importazioni di librerie standard
2. Importazioni di librerie di terze parti
3. Importazioni di progetti locali
- Ogni sezione dovrebbe essere ordinata alfabeticamente
- Preferire importazioni esplicite a importazioni generiche

```python
# Corretto
import os
import sys
from typing import Dict, List, Optional

import aiohttp
import bs4
from fastapi import HTTPException

from scraping.utils import URLUtils
from utils.logging import setup_logger

# Scorretto
from scraping.utils import *
import aiohttp, bs4
import sys, os
``` 

## Struttura del codice

### Organizzazione dei moduli

- Ogni modulo dovrebbe avere una responsabilità unica e ben definita
- Utilizzare i pacchetti per organizzare i moduli correlati
- Creare un File `__init__.py` per ogni pacchetto, che esponga chiaramente l'API pubblica

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

### Classi e funzioni

- Seguire il principio di responsabilità singola (SRP)
- Limitare la dimensione della funzione a un massimo di 50 righe
- Limitare la dimensione della classe a un massimo di 300 righe
- Utilizzare metodi statici o funzioni autonome per operazioni che non dipendono dallo stato dell'istanza

```python
# Buono
classe DataProcessor: 
def process_data(self, data): 
cleaned_data = self._clean_data(data) 
return self._transform_data(cleaned_data) 

def _clean_data(self, data): 
# Logica di pulizia 
return cleaned_data 

def _transform_data(self, data): 
# Logica di trasformazione 
return turned_data 

# Scorretto 
class DataProcessor: 
def process_data(self, data): 
# 200 righe di codice che combinano pulizia e trasformazione 
return result 
``` 

### Tipizzazione statica 

- Utilizzare annotazioni di tipo per tutte le funzioni e i metodi 
- Utilizzare il modulo `typing` per i tipi complessi 
- Documentare le eccezioni che potrebbero essere sollevate 

```python 
from typing import Dict, List, Optional, Union, Any 

def fetch_data(url: str, timeout: Optional[int] = Nessuno) -> Dict[str, Qualsiasi]:
"""
Recupera i dati dall'URL specificato.

Argomenti:
url: URL da interrogare
timeout: Timeout in secondi

Restituisce:
Dizionario contenente i dati recuperati

Genera:
HTTPException: Se la richiesta fallisce
"""
# Implementazione
```

## Documentazione

### Docstring

- Utilizza le docstring per tutti i moduli, classi, metodi e funzioni
- Segui il formato di Google per le docstring
- Parametri del documento, valori di ritorno ed eccezioni

```python
def extract_links(html: str, base_url: str) -> List[Dict[str, str]]:
"""
Estrae tutti i link da una pagina HTML con i relativi testi e attributi.

Argomenti:
html: Contenuto HTML di la pagina
base_url: URL di base per risolvere i link relativi

Restituisce:
Elenco di dizionari contenenti informazioni sui link

Genera:
ValueError: Se l'HTML non è valido
"""
```

### Commenti

- Usa i commenti per spiegare il "perché", non il "cosa"
- Commenta codice complesso o non intuitivo
- Evita commenti obsoleti o ridondanti

```python
# Corretto
# Usa un limite di 5 secondi per evitare timeout frequenti su siti lenti
timeout = 5

# Sbagliato
# Imposta il timeout
timeout = 5
```

## Test

### Struttura del test

- Usa pytest per tutti i test
- Organizza i test in una struttura che rispecchia il codice sorgente
- Assegna ai file di test il prefisso `test_`
- Assegna alle funzioni di test il prefisso `test_` prefisso

``` 
scraping/
scraper.py
utils.py
tests/
scraping/
test_scraper.py
test_utils.py
``` 

### Copertura dei test

- Puntare ad almeno l'80% di copertura dei test
- Testare tutti i percorsi di codice critici
- Includere test per casi limite e condizioni di errore

```python
def test_scrape_url_success():
# Testare il caso nominale

def test_scrape_url_timeout():
# Testare il caso in cui l'URL non risponde

def test_scrape_url_invalid_url():
# Testare con un URL non valido
``` 

### Test asincroni

- Utilizzare `pytest-asyncio` per testare il codice asincrono
- Utilizzare mock per le chiamate di rete in test

```python
import pytest

@pytest.mark.asyncio
async def test_async_function():
result = await async_function()
assert result == expected_result
```

## Gestione degli errori

### Eccezioni

- Crea eccezioni personalizzate per errori specifici dell'applicazione
- Utilizza le eccezioni standard di Python quando appropriato
- Documenta tutte le eccezioni che potrebbero essere sollevate

```python
class ScrapingException(Exception):
"""Eccezione di base per gli errori di scraping."""
pass

class RateLimitException(ScrapingException):
"""Generata al raggiungimento di un limite di frequenza."""
pass
```

### Gestione degli errori

- Utilizza blocchi try/except per gestire gli errori in modo appropriato
- Evita di intercettare le eccezioni in modo generico
- Registra gli errori con contesto sufficiente per debug

```python
try:
result = await scraper.scrape_url(url)
except RateLimitException:
logger.warning(f"Limite di velocità raggiunto per {url}, nuovo tentativo dopo il ritardo")
await asyncio.sleep(RATE_LIMIT_DELAY)
result = await scraper.scrape_url(url)
except ScrapingException as e:
logger.error(f"Impossibile eseguire lo scraping di {url}: {str(e)}")
raise
```

## Prestazioni

### Asincrono

- Utilizzare `asyncio` per operazioni che richiedono un intenso utilizzo di I/O
- Utilizzare `aiohttp` per richieste HTTP asincrone
- Limitare il numero di attività simultanee per evitare il sovraccarico

```python
async def scrape_batch(urls: List[str], max_concurrent: int = 10): 
semaphore = asyncio.Semaphore(max_concurrent) 

async def _scrape_with_semaphore(url): 
async with semaphore: 
return await scrape_url(url) 

tasks = [_scrape_with_semaphore(url) for url in urls] 
return await asyncio.gather(*tasks, return_Exceptions=True) 
``` 

### Ottimizzazioni

- Utilizzare strutture dati appropriate per le operazioni comuni (dizionari per ricerche frequenti)
- Evitare copie non necessarie di dati di grandi dimensioni
- Utilizzare generatori per elaborare grandi quantità di dati
- Memorizzare nella cache calcoli o richieste costosi

```python
# Utilizzo di generatori per elaborare dataset di grandi dimensioni
def process_large_dataset(file_path): 
with open(file_path, 'r') as f:
for line in f:
yield process_line(line)
```

## Sicurezza

### Validazione dell'input

- Convalida sempre l'input dell'utente
- Utilizza Pydantic per la convalida dei dati
- Non fidarti mai dei dati esterni

```python
from pydantic import BaseModel, HttpUrl, validator

class ScrapingRequest(BaseModel):
url: HttpUrl
depth: int = 1

@validator('depth')
def validate_depth(cls, v):
if v < 1 or v > 3:
raise ValueError('La profondità deve essere compresa tra 1 e 3')
return v
```

### Gestione dei segreti

- Non includere mai segreti (password, chiavi API) nel codice sorgente
- Utilizza variabili d'ambiente o configurazioni sicure file
- Usa python-dotenv per caricare le variabili d'ambiente

```python
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
if not API_KEY:
raise EnvironmentError("La variabile d'ambiente API_KEY non è impostata")
```

## Specifiche per lo scraping

### Rispetto del file robots.txt

- Rispetta sempre i file robots.txt
- Implementa ritardi tra le richieste
- Identificati correttamente con uno User-Agent appropriato

```python
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse

def can_fetch(url: str, user_agent: str) -> bool:
"""Controlla se l'URL può essere recuperato in base a in robots.txt."""
parser = RobotFileParser()
robots_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt"
parser.set_url(robots_url)
parser.read()
return parser.can_fetch(user_agent, url)
```

### Gestione delle sessioni

- Riutilizza le sessioni HTTP per migliorare le prestazioni
- Chiudi correttamente le sessioni dopo l'uso
- Utilizza contesti asincroni per garantire la chiusura delle risorse

```python
async def scrape_with_session():
async with aiohttp.ClientSession() as session:
# Utilizza la sessione per tutte le richieste
risultato1 = await fetch_url(session, url1)
risultato2 = await fetch_url(session, url2)
# La sessione viene chiusa automaticamente qui
```

### Analisi HTML

- Usa `lxml` come parser per BeautifulSoup per prestazioni migliori
- Usa selettori CSS o XPath per la navigazione DOM
- Gestisci i casi in cui gli elementi previsti non esistono

```python
from bs4 import BeautifulSoup

def extract_title(html: str) -> Optional[str]:
soup = BeautifulSoup(html, "lxml")
title_tag = soup.find("title")
return title_tag.text if title_tag else None
```

## Strumenti consigliati

### Linting e formattazione

- **Black**: Formattatore automatico del codice
- **isort**: Ordinatore automatico delle importazioni
- **flake8**: Linter per rilevare errori e problemi di stile
- **mypy**: Controllo statico dei tipi

### Configurazione consigliata

`pyproject.toml` file: 

```toml 
[tool.black] 
lunghezza-linea = 88 
versione-target = ['py38'] 
include = '\.pyi?$' 

[tool.isort] 
profilo = "black" 
lunghezza_linea = 88 

[tool.mypy] 
versione_python = "3.8" 
warn_return_any = true 
warn_unused_configs = true 
disallow_untyped_defs = true 
disallow_incomplete_defs = true 
``` 

`.flake8` file: 

``` 
[flake8] 
lunghezza-linea-massima = 88 
extend-ignore = E203 
exclude = .git,__pycache__,build,dist 
``` 

### Integrazione CI

Configura questi strumenti in la tua pipeline di CI per controllare automaticamente il codice:

```yaml
# Esempio per GitHub Actions
name: Python Linting

on: [push, pull_request]

jobs:
lint:
runs-on: ubuntu-latest
steps:
- uses: actions/checkout@v2
- name: Imposta Python
uses: actions/setup-python@v2
with:
python-version: '3.8'
- name: Installa le dipendenze
run: |
python -m pip install --upgrade pip
pip install black isort flake8 mypy
- name: Esegui linters
run: |
black --check .
isort --check .
flake8 .
mypy .
``` 

--- 

## Conclusione

Questi standard sono progettati per garantire la qualità, la manutenibilità e la coerenza del codice Python nel progetto WhytCard. Tutti i collaboratori sono tenuti a seguire queste linee guida. In caso di domande o suggerimenti per il miglioramento, non esitate a condividerli con il team.

--- 

Ultimo aggiornamento: 15/01/2025