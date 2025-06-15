# Architettura globale di WhytCard

## Introduzione

Questo documento presenta l'architettura globale del progetto WhytCard, una piattaforma open source di web scraping e formazione basata sull'intelligenza artificiale. L'architettura è progettata per essere modulare, scalabile e manutenibile, consentendo l'aggiunta di nuove funzionalità in modo semplice e garantendo al contempo la stabilità del sistema.

## Panoramica

WhytCard è organizzato secondo un'architettura client-server con una netta separazione tra frontend e backend. Questa separazione consente l'evoluzione indipendente di entrambi i componenti e facilita il lavoro di squadra.

``` 
┌──────────────────┐ ┌─────────────────┐ 
│ │ │ │ 
│ Frontend │◄─────►│ Backend │ 
│ (Vue.js) │ │ (FastAPI) │ 
│ │ │ │ 
└─────────────────┘ └────────────────┘ 
│ 
▲ 
│ 
▼ 
┌───────────────────┐ 
│ │ 
│ Scraping e │ 
│ Pipeline dati │ 
│ │ 
└──────────────────┘ 
▲ 
│ 
▼ 
┌─────────────────┐ 
│ │ 
│ Deposito │ 
│ │ 
└────────────────────┘ 
``` 

## Principale Componenti

### 1. Frontend (Vue.js)

Il frontend è sviluppato con Vue.js e utilizza Tailwind CSS per lo stile. È responsabile dell'interfaccia utente e dell'esperienza utente.

#### Caratteristiche principali

- **Framework**: Vue.js 3 con API di composizione
- **Stile**: Tailwind CSS
- **Animazioni**: Framer Motion
- **Internazionalizzazione**: i18next con rilevamento automatico della lingua del browser
- **Routing**: Vue Router
- **Gestione dello stato**: Pinia

#### Struttura

``` 
src/ 
├── components/ # Componenti riutilizzabili
├── config/ # Configurazione del frontend
├── i18n/ # File di traduzione
├── router/ # Configurazione del routing
├── views/ # Pagine principali
└── main.js # Punto di ingresso
``` 

### 2. Backend (FastAPI)

Il Il backend è sviluppato con FastAPI, un framework Python moderno e ad alte prestazioni per la creazione di API. Gestisce tutte le operazioni del server, l'accesso ai dati e la logica di business.

#### Funzionalità principali

- **Framework**: FastAPI
- **Autenticazione**: JWT
- **Convalida**: Pydantic
- **Documentazione API**: Interfaccia utente Swagger integrata

#### Struttura

``` 
backend/ 
├── config/ # Configurazione del backend
├── core/ # Logica di business principale
│ ├── api/ # Endpoint API
│ └── schemas/ # Schemi Pydantic
├── models/ # Modelli di dati
├── utils/ # Utilità
└── main.py # Punto di ingresso
``` 

### 3. Scraping e pipeline dati

Questo modulo è responsabile della raccolta di dati da fonti web e della loro trasformazione per l'addestramento di modelli di intelligenza artificiale.

#### Caratteristiche principali

- **Scraping**: Sistema asincrono con aiohttp e BeautifulSoup
- **Orchestrazione**: Gestione di task e priorità
- **Trasformazione**: Pulizia e normalizzazione dei dati
- **Cache**: Sistema di caching per evitare richieste ridondanti

#### Struttura

``` 
backend/ 
├── scraping/ 
│ ├── scrapers/ # Implementazioni specifiche per diverse fonti
│ ├── utils/ # Utilità di scraping
│ ├── orchestrator.py # Task orchestrator
│ └── cache.py # Sistema di caching
└── datasets/ # Dati raccolti e trasformati
``` 

### 4. Storage

Lo storage Il sistema gestisce la persistenza e l'accesso ai dati.

#### Opzioni di archiviazione

- **Database**: PostgreSQL per dati strutturati
- **Archiviazione file**: File system locale o compatibile con S3 per dati di grandi dimensioni
- **Cache**: Redis per cache distribuita

## Flusso di dati

### 1. Raccolta dati

``` 
┌─────────────┐ ┌──────────────┐ ┌──────────────┐ │ │ │ │ │ 
│ Web │────►│ Scraper │────►│ Cache │ 
│ Fonti │ │ │ │ 
└─────────────┘ └─────────────┘ └─────────────┘ 
│ 
▼ 
┌─────────────┐ ┌─────────────┐ 
│ │ │ │ 
│ Processori │────►│ Archiviazione │ 
│ │ │ 
└────────────┘ └─────────────┘ 
``` 

1. Gli scraper raccolgono dati da fonti web
2. I dati vengono memorizzati nella cache per evitare richieste ridondanti
3. I processori puliscono e trasformano i dati
4. I dati trasformati vengono archiviati per un utilizzo successivo

### 2. Addestramento del modello

``` 
┌─────────────┐ ┌──────────────┐ ┌─────────────┐ 
│ │ │ │ │ │ 
│ Set di dati │────►│ Preprocessore │────►│ Formazione │ 
│ │ │ │ │ │ 
└────────────┘ └─────────────┘ └────────────┘ 
│ 
▼ 
┌──────────────┐ 
│ │ 
│ Modelli │ 
│ │ 
└───────────────┘ 
``` 

1. I set di dati sono Estratti dall'archivio
2. I dati vengono preelaborati per l'addestramento
3. I modelli vengono addestrati sui dati preelaborati
4. I modelli addestrati vengono salvati

### 3. Utilizzo del modello

``` 
┌─────────────┐ ┌───────────────┐ ┌──────────────┐ │ │ │ │ │ │ 
│ API │────►│ Modelli │────►│ Risposta │ 
│ Richiesta │ │ │ │ │ 
└─────────────┘ └─────────────┘ └─────────────┘ 
``` 

1. Viene ricevuta una richiesta API
2. Vengono utilizzati modelli appropriati per elaborare richiesta
3. Viene generata e restituita una risposta

## Comunicazione tra i componenti

### API REST

La comunicazione tra frontend e backend avviene principalmente tramite un'API REST. Gli endpoint sono organizzati logicamente e documentati con Swagger UI.

### WebSocket

Per le funzionalità che richiedono aggiornamenti in tempo reale (come il tracciamento delle attività di scraping), i WebSocket vengono utilizzati per abilitare la comunicazione bidirezionale.

### Coda messaggi

Per le attività asincrone e di lunga durata, viene utilizzata una coda messaggi (come RabbitMQ o Redis Pub/Sub) per disaccoppiare i componenti e garantire l'affidabilità.

## Distribuzione

### Opzioni di distribuzione

WhytCard può essere distribuito in diversi modi:

1. **Applicazione desktop**: Utilizzo di Tauri per creare un'applicazione desktop multipiattaforma
2. **Distribuzione cloud**: Distribuzione su servizi cloud come AWS, GCP o Azure
3. **Self-hosting**: Installazione su un server personale o aziendale

### Architettura di distribuzione

``` 
┌─────────────────┐ ┌──────────────────┐ 
│ │ │ 
│ Frontend │◄────►│ Gateway API │ 
│ (Statico) │ │ │ 
└─────────────────┘ └─────────────────┘ 
▲ 
│ 
▼ 
┌──────────────────┐ 
│ │ 
│ API backend │ 
│ │ 
└─────────────────┘ 
▲ 
│ 
▼ 
┌──────────────────┐ ┌──────────────────┐ 
│ │ │ │ 
│ Database │ │ Archiviazione file 
│ │ │ 
└───────────────────┘ └─────────────────┘ 
``` 

## Sicurezza

### Principi di sicurezza

1. **Difesa in profondità**: Più livelli di sicurezza
2. **Principio del privilegio minimo**: Accesso minimo necessario
3. **Convalida dell'input**: Tutti gli input degli utenti vengono convalidati
4. **Protezione dei dati**: Crittografia dei dati sensibili

### Misure di sicurezza

- **Autenticazione**: JWT con rotazione dei token
- **Autorizzazione**: Controllo degli accessi basato sui ruoli
- **Protezione contro gli attacchi comuni**: XSS, CSRF, SQL injection
- **Audit**: Registrazione delle azioni importanti

## Scalabilità

L'architettura è progettata per essere scalabile orizzontalmente e verticalmente:

- **Microservizi**: I componenti possono essere distribuiti in modo indipendente
- **Memorizzazione nella cache**: Utilizzo di cache multilivello
- **Bilanciamento del carico**: Distribuzione del traffico tra più istanze
- **Partizionamento**: Separazione dei dati per migliorare le prestazioni

## Monitoraggio e Osservabilità

- **Logging**: Logging centralizzato con ELK Stack o equivalente
- **Metriche**: Raccolta di metriche con Prometheus
- **Tracciamento**: Monitoraggio delle richieste con OpenTelemetry
- **Avvisi**: Avvisi basati su soglie predefinite

## Conclusione

L'architettura di WhytCard è progettata per essere robusta, scalabile e manutenibile. La chiara separazione delle responsabilità tra i diversi componenti consente un'evoluzione indipendente e facilita il lavoro di squadra. Le scelte tecnologiche sono state effettuate tenendo conto delle esigenze attuali e future del progetto, nonché delle best practice del settore.

Questa architettura verrà regolarmente rivista e aggiornata per adattarsi alle nuove esigenze e agli sviluppi tecnologici.

--- 

Ultimo aggiornamento: 15/01/2025