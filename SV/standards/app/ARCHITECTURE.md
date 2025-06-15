# WhytCards globala arkitektur

## Introduktion

Detta dokument presenterar den globala arkitekturen för WhytCard-projektet, en plattform med öppen källkod för webbskrapning och AI-utbildning. Arkitekturen är utformad för att vara modulär, skalbar och underhållbar, vilket möjliggör enkelt tillägg av nya funktioner samtidigt som systemstabilitet säkerställs.

## Översikt

WhytCard är organiserat enligt en klient-server-arkitektur med en tydlig separation mellan frontend och backend. Denna separation möjliggör oberoende utveckling av båda komponenterna och underlättar lagarbete.

``` 
┌───────────────────┐ ┌───────────────────┐ 
│ │ │ 
│ Frontend │◄─────►│ Backend │ 
│ (Vue.js) │ │ (FastAPI) │ 
│ │ │ │ 
└──────────────────┘ └──────────────────┘ ▲ │ ▼ ┌───────────────────┐ │ │ │ Skrapning & │ │ Datapipeline │ │ │ └─────────────────┘ ▲ │ ▼ ┌───────────────────┐ │ │ │ │ └───────────────┘ 
``` 

## Huvudmeny Komponenter 

### 1. Frontend (Vue.js) 

Frontend-gränssnittet är utvecklat med Vue.js och använder Tailwind CSS för styling. Det ansvarar för användargränssnittet och användarupplevelsen. 

#### Viktiga funktioner

- **Ramverk**: Vue.js 3 med Composition API
- **Stilering**: Tailwind CSS
- **Animationer**: Framer Motion
- **Internationalisering**: i18next med automatisk språkigenkänning i webbläsaren
- **Routing**: Vue Router
- **Tillståndshantering**: Pinia

#### Struktur

``` 
src/ 
├── komponenter/ # Återanvändbara komponenter
├── config/ # Frontend-konfiguration
├── i18n/ # Översättningsfiler
├── router/ # Ruttkonfiguration
├── vyer/ # Huvudsidor
└── main.js # Ingångspunkt
``` 

### 2. Backend (FastAPI)

Backenden är utvecklad med FastAPI, ett modernt och högpresterande Python-ramverk för att skapa API:er. Det hanterar all serverdrift, dataåtkomst och affärslogik. #### Viktiga funktioner

- **Ramverk**: FastAPI
- **Autentisering**: JWT
- **Validering**: Pydantic
- **API-dokumentation**: Integrerat Swagger-gränssnitt

#### Struktur

```
backend/
├── config/ # Backend-konfiguration
├── core/ # Huvudsaklig affärslogik
│ ├── api/ # API-slutpunkter
│ └── scheman/ # Pydantic-scheman
├── modeller/ # Datamodeller
├── verktyg/ # Verktyg
└── main.py # Ingångspunkt
```

### 3. Skrapning och datapipeline

Denna modul ansvarar för att samla in data från webbkällor och transformera den för AI modellträning. #### Viktiga funktioner

- **Scraping**: Asynkront system med aiohttp och BeautifulSoup
- **Orkestrering**: Uppgifts- och prioritetshantering
- **Transformation**: Datarensning och normalisering
- **Cache**: Cachningssystem för att undvika redundanta förfrågningar

#### Struktur

``` 
backend/ 
├── scraping/ 
│ ├── scrapers/ # Specifika implementeringar för olika källor
│ ├── utils/ # Skrapningsverktyg
│ ├── orchestrator.py # Uppgiftsorkestrator
│ └── cache.py # Cachningssystem
└── dataset/ # Insamlad och transformerad data
``` 

### 4. Lagring

Lagringssystemet hanterar datapersistens och åtkomst.

#### Lagringsalternativ

- **Databas**: PostgreSQL för strukturerad data
- **Fillagring**: Lokalt filsystem eller S3-kompatibelt för stora datamängder
- **Cache**: Redis för distribuerad cache

## Dataflöde

### 1. Datainsamling

```
┌───────────────┐ ┌────────────┐ ┌────────────┐ 
│ │ │ │ │ │ 
│ Webb │─────►│ Skrapor │─────►│ Cache │ 
│ Källor │ │ │ │ │ 
└─────────────┘ └────────────┘ └────────────┘ └────────────┘┘ 
│ 
▼ 
┌─────────────┐ ┌──────────────┐ │ │ │ │ │ Processorer │────►│ Lagring │ │ │ │ │ └───────────┘ └─────────────┘ 
``` 

1. Skrapor samlar in data från webbkällor 
2. Data cachas för att undvika redundanta förfrågningar 
3. Processorer rensar och transformerar data 
4. Transformerad data lagras för senare användning 

### 2. Modellträning 

``` 
┌───────────────┐ ┌─────────────┐ ┌─────────────┐ 
│ │ │ │ │ │ 
│ Dataset │─────►│ Förprocessor│────►│ Träning │ 
│ │ │ │ │ 
└────────────┘ └───────────┘┘─ ... └─────────────┘ │ ▼ ┌──────────────┐ │ │ │ Modeller │ │ │ └────────────┘ 
``` 

1. Datauppsättningar extraheras från lagring 
2. Data förbehandlas för träning 
3. Modeller tränas på den förbehandlade datan 
4. Tränade modeller sparas 

### 3. Modell Användning 

``` 
┌───────────────┐ ┌─────────────┐ ┌─────────────┐ 
│ │ │ │ │ 
│ API │────►│ Modeller │────►│ Svar │ 
│ Begäran │ │ │ │ │ 
└─────────────┘ └─────────────┘ └─────────────┘ 
``` 

1. En API-begäran tas emot 
2. Lämpliga modeller används för att bearbeta begäran 
3. Ett svar genereras och returneras 

## Kommunikation mellan komponenter 

### REST API 

Kommunikation mellan frontend och backend sker primärt via ett REST API. Slutpunkter är logiskt organiserade och dokumenterade med Swagger UI. 

### WebSockets

För funktioner som kräver realtidsuppdateringar (som att spåra skrapningsuppgifter) används WebSockets för att möjliggöra dubbelriktad kommunikation.

### Meddelandekö

För asynkrona och långvariga uppgifter används en meddelandekö (som RabbitMQ eller Redis Pub/Sub) för att frikoppla komponenter och säkerställa tillförlitlighet.

## Distribution 

### Distributionsalternativ 

WhytCard kan distribueras på flera sätt: 

1. **Skrivbordsapplikation**: Använda Tauri för att skapa en plattformsoberoende skrivbordsapplikation 
2. **Molndistribution**: Distribution på molntjänster som AWS, GCP eller Azure 
3. **Självhosting**: Installation på en personlig server eller företagsserver 

### Distributionsarkitektur 

``` 
┌────────────────────┐ ┌─────────────────┐ 
│ │ │ │ 
│ Frontend │◄─────►│ API-gateway │ 
│ (Statisk) │ │ │ 
└──────────────────┘ └───────────────────┘ ▲ │ ▼ 
┌─────────────────┐ │ │ │ Backend-API │ │ │ └─────────────────┘ ▲ │ ▼ ┌───────────────────┐ ┌─────────────────┐ │ │ │ │ │ Databas │ │ Fillagring │ │ │ │ │ └──────────────────┘ └────────────────┘ 
``` 

## Säkerhet

### Säkerhetsprinciper

1. **Djupgående försvar**: Flera säkerhetslager

2. **Principen om minsta behörighet**: Minimalt nödvändig åtkomst

3. **Validering av indata**: Alla användarinmatningar valideras

4. **Dataskydd**: Kryptering av känsliga data

### Säkerhetsåtgärder

- **Autentisering**: JWT med tokenrotation
- **Auktorisering**: Rollbaserad åtkomstkontroll
- **Skydd mot vanliga attacker**: XSS, CSRF, SQL-injektion
- **Granskning**: Loggning av viktiga åtgärder

## Skalbarhet

Arkitekturen är utformad för att vara horisontellt och vertikalt skalbar:

- **Mikrotjänster**: Komponenter kan distribueras oberoende
- **Cachning**: Användning av flernivåcacher
- **Lastbalansering**: Trafikfördelning mellan flera instanser
- **Partitionering**: Dataseparation för att förbättra prestanda

## Övervakning och observerbarhet

- **Loggning**: Centraliserad loggning med ELK Stack eller motsvarande
- **Mätvärden**: Mätvärdeninsamling med Prometheus
- **Spårning**: Förfrågningsspårning med OpenTelemetry
- **Varningar**: Varningar baserade på fördefinierade tröskelvärden

## Slutsats

WhytCards arkitektur är utformad för att vara robust, skalbar och underhållbar. Den tydliga ansvarsfördelningen mellan olika komponenter möjliggör oberoende utveckling och underlättar lagarbete. Teknikval gjordes med hänsyn till nuvarande och framtida projektbehov, samt bästa praxis i branschen.

Denna arkitektur kommer att ses över och uppdateras regelbundet för att anpassa sig till nya behov och teknisk utveckling.

--

Senast uppdaterad: 2025-01-15