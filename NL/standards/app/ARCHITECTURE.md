# Globale architectuur van WhytCard

## Inleiding

Dit document presenteert de wereldwijde architectuur van het WhytCard-project, een open-source webscraping- en AI-trainingsplatform. De architectuur is modulair, schaalbaar en onderhoudbaar ontworpen, waardoor nieuwe functies eenvoudig kunnen worden toegevoegd en de stabiliteit van het systeem wordt gewaarborgd.

## Overzicht

WhytCard is georganiseerd volgens een client-serverarchitectuur met een duidelijke scheiding tussen de frontend en de backend. Deze scheiding maakt onafhankelijke ontwikkeling van beide componenten mogelijk en vergemakkelijkt teamwork.

``` 
┌────────────────┐ ┌────────────────┐ 
│ │ │ 
│ Frontend │◄────►│ Backend │ 
│ (Vue.js) │ │ (FastAPI) │ 
│ │ │ │ 
└────────────────┘ └────────────────┘────────────────┘ 
▲ 
│ 
▼ 
┌────────────────┐ 
│ 
│ Scraping & │ 
│ Datapijplijn │ 
│ │ 
└────────────────┘ 
▲ 
│ 
▼ 
┌────────────────┐ 
│ 
│ Opslag │ 
│ 
└─────────────────┘ 
``` 

## Hoofd Componenten

### 1. Frontend (Vue.js)

De frontend is ontwikkeld met Vue.js en gebruikt Tailwind CSS voor de styling. Deze is verantwoordelijk voor de gebruikersinterface en gebruikerservaring.

#### Belangrijkste kenmerken

- **Framework**: Vue.js 3 met Composition API
- **Styling**: Tailwind CSS
- **Animaties**: Framer Motion
- **Internationalisatie**: i18next met automatische browsertaaldetectie
- **Routing**: Vue Router
- **Statusbeheer**: Pinia

#### Structuur

``` 
src/ 
├── components/ # Herbruikbare componenten
├── config/ # Frontendconfiguratie
├── i18n/ # Vertaalbestanden
├── router/ # Routeconfiguratie
├── views/ # Hoofdpagina's
└── main.js # Toegangspunt
``` 

### 2. Backend (FastAPI)

De De backend is ontwikkeld met FastAPI, een modern en krachtig Python-framework voor het creëren van API's. Het verwerkt alle serverbewerkingen, gegevenstoegang en bedrijfslogica.

#### Belangrijkste functies

- **Framework**: FastAPI
- **Authenticatie**: JWT
- **Validatie**: Pydantic
- **API-documentatie**: Geïntegreerde Swagger-gebruikersinterface

#### Structuur

``` 
backend/ 
├── config/ # Backendconfiguratie
├── core/ # Belangrijkste bedrijfslogica
│ ├── api/ # API-eindpunten
│ └── schema's/ # Pydantic-schema's
├── modellen/ # Datamodellen
├── utils/ # Hulpprogramma's
└── main.py # Toegangspunt
``` 

### 3. Scraping & Datapijplijn

Deze module is verantwoordelijk voor Gegevens verzamelen uit webbronnen en deze transformeren voor AI-modeltraining.

#### Belangrijkste kenmerken

- **Scraping**: Asynchroon systeem met aiohttp en BeautifulSoup
- **Orkestratie**: Taak- en prioriteitenbeheer
- **Transformatie**: Gegevensopschoning en -normalisatie
- **Cache**: Cachesysteem om redundante verzoeken te voorkomen

#### Structuur

``` 
backend/ 
├── scraping/ 
│ ├── scrapers/ # Specifieke implementaties voor verschillende bronnen
│ ├── utils/ # Hulpprogramma's voor scraping
│ ├── orchestrator.py # Taakorchestrator
│ └── cache.py # Cachesysteem
└── datasets/ # Verzamelde en getransformeerde gegevens
``` 

### 4. Opslag

Het opslagsysteem Beheert de persistentie en toegang tot gegevens.

#### Opslagopties

- **Database**: PostgreSQL voor gestructureerde data
- **Bestandsopslag**: Lokaal bestandssysteem of S3-compatibel voor grote hoeveelheden data
- **Cache**: Redis voor gedistribueerde cache

## Gegevensstroom

### 1. Gegevensverzameling

``` 
┌─────────────┐ ┌────────────┐ ┌────────────┐ 
│ │ │ │ │ 
│ Web │────►│ Scrapers │────►│ Cache │ 
│ Bronnen │ │ │ │ 
└─────────────┘ └─────────────┘ └────────────┘ 
│ 
▼ 
┌────────────┐ ┌─────────────┐ 
│ │ │ 
│ Processors │────►│ Opslag │ 
│ │ │ 
└─────────────┘ └────────────┘ 
``` 

1. Scrapers verzamelen gegevens uit webbronnen
2. Gegevens worden gecached om redundante verzoeken te voorkomen
3. Processoren schonen de gegevens op en transformeren deze
4. Getransformeerde gegevens worden opgeslagen voor later gebruik

### 2. Modeltraining

``` 
┌─────────────┐ ┌────────────┐ ┌────────────┐ 
│ │ │ │ │ │ 
│ Datasets │────►│ Preprocessor│────►│ Training │ 
│ │ │ │ │ │ 
└────────────┘ └────────────┘ └────────────┘──────────┘ 
│ 
▼ 
┌────────────┐ 
│ 
│ Modellen │ 
│ 
└──────────────┘ 
``` 

1. Datasets zijn Geëxtraheerd uit de opslag
2. Gegevens worden voorbewerkt voor training
3. Modellen worden getraind met de voorbewerkte gegevens
4. Getrainde modellen worden opgeslagen

### 3. Modelgebruik

``` 
┌─────────────┐ ┌────────────┐ ┌────────────┐ 
│ │ │ │ │ 
│ API │────►│ Modellen │────►│ Reactie │ 
│ Aanvraag │ │ │ │ 
└────────────┘ └────────────┘ └────────────┘ 
``` 

1. Een API-aanvraag wordt ontvangen.
2. Geschikte modellen worden gebruikt om de verzoek
3. Er wordt een antwoord gegenereerd en geretourneerd

## Communicatie tussen componenten

### REST API

De communicatie tussen de frontend en de backend verloopt voornamelijk via een REST API. Eindpunten zijn logisch georganiseerd en gedocumenteerd met Swagger UI.

### WebSockets

Voor functies die realtime updates vereisen (zoals het volgen van scraptaken), worden WebSockets gebruikt om bidirectionele communicatie mogelijk te maken.

### Berichtenwachtrij

Voor asynchrone en langlopende taken wordt een berichtenwachtrij (zoals RabbitMQ of Redis Pub/Sub) gebruikt om componenten te ontkoppelen en de betrouwbaarheid te garanderen.

## Implementatie

### Implementatieopties

WhytCard kan op verschillende manieren worden geïmplementeerd:

1. **Desktopapplicatie**: Tauri gebruiken om een platformonafhankelijke desktopapplicatie te maken
2. **Cloudimplementatie**: Implementatie op cloudservices zoals AWS, GCP of Azure
3. **Zelfhosting**: Installatie op een persoonlijke of bedrijfsserver

### Implementatiearchitectuur

``` 
┌────────────────┐ ┌────────────────┐ 
│ │ │ │ 
│ Frontend │◄────►│ API-gateway │ 
│ (Statisch) │ │ 
└─────────────────┘ └────────────────┘ 
▲ 
│ 
▼ 
┌────────────────┐ 
│ │ 
│ Backend-API │ 
│ 
└──────────────────┘ 
▲ 
│ 
▼ 
┌────────────────┐ ┌───────────────┐ 
│ │ │ │ 
│ Database │ │ Bestandsopslag │ 
│ │ │ 
└─────────────────┘ └────────────────┘ 
``` 

## Beveiliging

### Beveiligingsprincipes

1. **Defensie in de diepte**: Meerdere beveiligingslagen
2. **Principe van de minste rechten**: Minimaal noodzakelijke toegang
3. **Invoervalidatie**: Alle gebruikersinvoer wordt gevalideerd
4. **Gegevensbescherming**: Versleuteling van gevoelige gegevens

### Beveiligingsmaatregelen

- **Authenticatie**: JWT met tokenrotatie
- **Autorisatie**: Rolgebaseerde toegangscontrole
- **Bescherming tegen veelvoorkomende aanvallen**: XSS, CSRF, SQL-injectie
- **Audit**: Logging van belangrijke acties

## Schaalbaarheid

De architectuur is ontworpen om horizontaal en verticaal schaalbaar te zijn:

- **Microservices**: Componenten kunnen onafhankelijk worden geïmplementeerd
- **Caching**: Gebruik van caches op meerdere niveaus
- **Load balancing**: Verkeersverdeling over meerdere instanties
- **Partitionering**: Gegevensscheiding om de prestaties te verbeteren

## Monitoring en Observatie

- **Logging**: Gecentraliseerde logging met ELK Stack of equivalent
- **Metrics**: Verzameling van metrics met Prometheus
- **Tracing**: Verzoektracking met OpenTelemetry
- **Alerting**: Waarschuwingen op basis van vooraf gedefinieerde drempels

## Conclusie

De architectuur van WhytCard is ontworpen om robuust, schaalbaar en onderhoudbaar te zijn. De duidelijke scheiding van verantwoordelijkheden tussen verschillende componenten maakt onafhankelijke ontwikkeling mogelijk en vergemakkelijkt teamwork. Bij de technologische keuzes is rekening gehouden met de huidige en toekomstige projectbehoeften en met best practices uit de sector.

Deze architectuur zal regelmatig worden herzien en bijgewerkt om aan te passen aan nieuwe behoeften en technologische ontwikkelingen.

--- 

Laatst bijgewerkt: 15-01-2025