# Guida allo scraping etico per WhytCard

## Introduzione

Il web scraping è al centro del progetto WhytCard, ma deve essere condotto in modo etico, responsabile e legale. Questa guida definisce i principi e le pratiche da seguire per garantire che tutte le attività di scraping rispettino i diritti dei proprietari dei siti web, le leggi applicabili e gli standard etici.

## Indice

1. [Principi fondamentali](#principi-fondamentali)
2. [Aspetti legali](#aspetti-legali)
3. [Migliori pratiche tecniche](#migliori-pratiche-tecniche)
4. [Rispetto delle risorse](#rispettare-risorse)
5. [Protezione dei dati personali](#protezione-dei-dati-personali)
6. [Documentazione e trasparenza](#documentazione-e-trasparenza)
7. [Casi speciali](#casi-speciali)
8. [Checklist per lo scraping etico](#checklist-etico-scraping)

## Principi fondamentali

### Filosofia dello scraping etico

Lo scraping etico si basa su tre principi fondamentali:

1. **Rispetto**: Rispettare i proprietari dei siti web, i loro termini di utilizzo e le loro Risorse
2. **Proporzionalità**: Estrarre solo i dati necessari con un impatto minimo
3. **Trasparenza**: Essere trasparenti sull'identità del bot e sulle intenzioni di scraping

### I valori di WhytCard in merito allo scraping

Come progetto WhytCard, ci impegniamo a:

- Non danneggiare mai i siti web che eseguiamo
- Rispettare rigorosamente le regole esplicite e implicite dei siti web
- Essere trasparenti sulla nostra identità e sui nostri obiettivi
- Utilizzare i dati in modo responsabile e in conformità con la nostra missione
- Dare priorità alle API ufficiali quando disponibili

## Aspetti legali

### Quadro giuridico generale

Il web scraping è soggetto a diversi quadri giuridici che variano a seconda del paese:

- **Copyright**: Il contenuto del sito web è generalmente protetto da copyright
- **Termini di utilizzo**: I Termini di servizio del sito web potrebbero vietare esplicitamente lo scraping
- **Protezione dei dati**: Leggi come il GDPR in Europa proteggono i dati personali
- **Accesso non autorizzato**: Alcune giurisdizioni puniscono come reato l'accesso non autorizzato ai computer sistemi

### Giurisprudenza rilevante

Alcune importanti decisioni giudiziarie in materia di scraping:

- **hiQ Labs contro LinkedIn** (USA): ha stabilito che lo scraping di dati pubblici non è necessariamente illegale
- **Ryanair contro PR Aviation** (UE): ha confermato che i termini d'uso possono limitare contrattualmente lo scraping
- **QVC contro Resultly** (USA): ha sottolineato l'importanza di non sovraccaricare i server

### Conformità legale per WhytCard

Per rimanere nella legalità:

1. **Controllare sempre i Termini di Servizio** prima di effettuare lo scraping di un sito
2. **Rispettare i tag "noindex" e "nofollow"** nei meta tag
3. **Non eludere mai le misure tecniche di protezione** (CAPTCHA, limitazioni di accesso)
4. **Documentare le proprie pratiche** per dimostrare buona fede
5. **Consultare un avvocato** in caso di dubbi sulla legalità di un'operazione di scraping

## Buone pratiche tecniche

### Rispetto robots.txt

Il file robots.txt definisce le regole di accesso per i robot:

```python
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse

def is_allowed(url, user_agent="WhytCardBot/1.0"):
"""Controlla se l'URL può essere scansionato in base a robots.txt."""
rp = RobotFileParser()
rp.set_url(f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt")
rp.read()
return rp.can_fetch(user_agent, url)
```

### Identificazione corretta

Utilizza sempre uno User-Agent che identifichi chiaramente il tuo bot:

```python
headers = { 
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot; bot@whytcard.com)', 
# Altre intestazioni... 
} 
``` 

### Ritardi nelle richieste

Implementa ritardi ragionevoli tra le richieste: 

```python 
import time 
import random 

def polite_request(url, session, min_delay=1, max_delay=3): 
"""Effettua una richiesta con un ritardo "polite" tra le richieste.""" 
# Attendi un ritardo casuale 
delay = random.uniform(min_delay, max_delay) 
time.sleep(delay) 

# Esegue la richiesta 
response = session.get(url, headers=headers) 
return response 
``` 

### Gestione degli errori

Rispetta i codici di errore HTTP e adatta il tuo comportamento di conseguenza:

```python
async def respectful_fetch(url, session):
"""Recupera un URL in modo rispettoso."""
try:
async con session.get(url, headers=headers) come response:
if response.status == 200:
return await response.text()
elif response.status == 429: # Troppe richieste
# Attendi più a lungo prima di riprovare
wait_time = int(response.headers.get('Retry-After', 60))
logger.info(f"Velocità limitata, attesa di {wait_time} secondi")
await asyncio.sleep(wait_time)
return await respectful_fetch(url, session)
elif response.status in (403, 404):
# Non riprovare Errori 403/404
logger.warning(f"Accesso negato o non trovato: {url}")
return None
else:
# Attendi e riprova per altri errori
logger.warning(f"Errore {response.status} per {url}, nuovo tentativo tra 5 secondi")
await asyncio.sleep(5)
return await respectful_fetch(url, session)
except Exception as e:
logger.error(f"Eccezione durante il recupero di {url}: {str(e)}")
return None
```

## Rispetto delle risorse

### Limitazione della velocità

Adatta la velocità di richiesta alle dimensioni e alle risorse del sito di destinazione:

- **Siti commerciali di grandi dimensioni**: 1 richiesta ogni 1-3 secondi
- **Siti di medie dimensioni**: 1 richiesta ogni 3-10 secondi
- **Siti di piccole dimensioni**: 1 richiesta ogni 10-60 secondi o più

### Periodi di scraping

Preferisci periodi di basso traffico per operazioni intensive:

- **Orari non di punta**: Preferisci notti o fine settimana
- **Evita i picchi**: Non effettuare scraping durante i periodi di punta noti
- **Sii adattabile**: Riduci la velocità se rilevi rallentamenti

### Minimizzazione dell'impatto

Tecniche per ridurre l'impatto sui server di destinazione:

1. **Memorizzazione nella cache intelligente**: Non recuperare la stessa pagina più volte
2. **Selettività**: Recupera solo le pagine effettivamente necessarie
3. **Compressione**: Richiedi risposte compresse per ridurre la larghezza di banda
4. **Paginazione efficiente**: Rispetta la struttura di paginazione del sito

## Protezione dei dati personali

### Identificazione dei dati personali

Sii vigile sui tipi di dati che raccogli:

- **Dati di identificazione diretta**: Nomi, email, telefoni, indirizzi
- **Dati di identificazione indiretta**: ID utente, pseudonimi
- **Dati sensibili**: opinioni politiche, salute, orientamento sessuale

### Principi GDPR da rispettare

Se operi in Europa o raccogli dati da cittadini europei:

1. **Minimizzazione**: Raccogli solo i dati strettamente necessari
2. **Scopo**: Utilizza i dati solo per gli scopi previsti
3. **Conservazione limitata**: Elimina i dati quando non sono più necessari
4. **Sicurezza**: Proteggi i dati raccolti da accessi non autorizzati

### Anonimizzazione dei dati

Tecniche per anonimizzare i dati personali:

```python
import hashlib
import re

def anonymize_email(email):
"""Anonimizza un indirizzo email."""
if not email:
return None

# Esegui l'hash dell'indirizzo email
hashed = hashlib.sha256(email.encode()).hexdigest()[:10]
domain = email.split('@')[-1]

return f"anon_{hashed}@{domain}"

def anonymize_phone(telefono):
"""Rende anonimo un numero di telefono."""
if not phone:
return None

# Mantieni solo le cifre
cifre = re.sub(r'\D', '', telefono)

# Maschera tutte le cifre tranne le ultime 2
if len(cifre) > 2:
return "X" * (len(cifre) - 2) + cifre[-2:]
return "X" * len(cifre)
```

## Documentazione e trasparenza

### Documentazione delle attività di scraping

Documenta sempre le tue attività di scraping:

- **Scopo**: Perché vengono raccolti questi dati?
- **Metodo**: Come vengono raccolti?
- **Conservazione**: Dove e come viene conservata?
- **Utilizzo**: Come verrà utilizzata?
- **Eliminazione**: Quando verrà eliminata?

### Contatti e Opt-out

Fornisci sempre un modo per contattarti:

1. **Pagina informativa**: Crea una pagina dedicata che descriva il tuo bot (ad esempio, whytcard.com/bot)
2. **Email di contatto**: Inserisci un indirizzo email nel tuo User-Agent
3. **Meccanismo di Opt-out**: Consenti ai siti di richiedere l'esclusione

### Registrazione delle attività

Mantieni registri dettagliati delle tue attività di scraping:

```python
import logging
from datetime import datetime

# Configurazione del logger
logging.basicConfig(
filename=f"scraping_log_{datetime.now().strftime('%Y%m%d')}.log",
level=logging.INFO,
format='%(asctime)s - %(levelname)s - %(message)s'
)

def log_scraping_activity(url, success, data_points=0): 
"""Registra un'attività di scraping.""" 
logging.info(f"URL: {url}, Success: {success}, Data points: {data_points}") 
``` 

## Casi speciali

### API vs Scraping

Ordine di priorità per la raccolta dati:

1. **API ufficiali**: dare sempre priorità alle API ufficiali quando esistono
2. **Feed di dati pubblici**: utilizzare feed RSS, XML o JSON, se disponibili
3. **Scraping**: utilizzare lo scraping solo come ultima risorsa

### Siti con autenticazione

Per i siti che richiedono l'autenticazione:

- **Autorizzazione esplicita**: ottenere l'autorizzazione scritta dal sito
- **Rispetto dei Termini di servizio**: assicurarsi che i Termini di servizio consentano l'uso automatizzato
- **Limitazioni**: rispettare rigorosamente le limitazioni di utilizzo

### Contenuto dinamico (JavaScript)

Per i siti che utilizzano molto JavaScript:

```python
from playwright.async_api import async_playwright

async def scrape_dynamic_content(url):
"""Estrarre contenuti generati da JavaScript."""
async con async_playwright() come p:
browser = await p.chromium.launch(headless=True)
page = await browser.new_page()

# Configura User-Agent
await page.set_extra_http_headers({ 
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot)'
})

# Carica la pagina e attendi che la rete sia inattiva
await page.goto(url)
await page.wait_for_load_state('networkidle')

# Estrazione contenuto
content = await page.content()

await browser.close()
return content
```

## Checklist per lo scraping etico

Prima di ogni progetto di scraping, verificare i seguenti punti:

### Preparazione
- [ ] Verificare i Termini di servizio del sito di destinazione
- [ ] Verificare il file robots.txt
- [ ] Cercare API o alternative allo scraping
- [ ] Definizione chiara dei dati necessari
- [ ] Documentazione dello scopo dello scraping

### Configurazione tecnica
- [ ] User-Agent identificabile e trasparente
- [ ] Meccanismo di limitazione della velocità
- [ ] Sistema di cache per evitare richieste ridondanti
- [ ] Gestione appropriata di errori e codici HTTP
- [ ] Registrazione delle attività

### Esecuzione
- [ ] Monitoraggio del sito di destinazione Prestazioni
- [ ] Adeguamento dinamico della velocità, se necessario
- [ ] Rispetto delle indicazioni del server (429, Retry-After)
- [ ] Arresto immediato in caso di rilevamento di un problema

### Post-elaborazione
- [ ] Anonimizzazione dei dati personali
- [ ] Archiviazione sicura dei dati
- [ ] Conservazione a tempo limitato
- [ ] Documentazione dei dati raccolti

## Conclusione

Lo scraping etico rappresenta un equilibrio tra l'accesso ai dati e il rispetto dei diritti e delle risorse dei proprietari dei siti web. Seguendo questi principi e pratiche, il progetto WhytCard può raccogliere i dati necessari mantenendo un approccio responsabile e rispettoso.

Ricorda che l'etica dello scraping non è solo una questione di conformità legale, ma anche di responsabilità nei confronti dell'ecosistema web nel suo complesso. Uno scraping rispettoso contribuisce a un web più aperto e sostenibile per tutti.

--- 

Ultimo aggiornamento: 15/01/2025