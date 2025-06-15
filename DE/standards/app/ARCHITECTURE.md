# Globale Architektur von WhytCard

## Einleitung

Dieses Dokument stellt die globale Architektur des WhytCard-Projekts vor, einer Open-Source-Plattform für Web Scraping und KI-Training. Die Architektur ist modular, skalierbar und wartungsfreundlich konzipiert. Dies ermöglicht die einfache Erweiterung neuer Funktionen und gewährleistet gleichzeitig die Systemstabilität.

## Übersicht

WhytCard basiert auf einer Client-Server-Architektur mit einer klaren Trennung zwischen Frontend und Backend. Diese Trennung ermöglicht die unabhängige Weiterentwicklung beider Komponenten und erleichtert die Teamarbeit.

``` 
┌─────────────────┐ ┌─────────────────┐ 
│ │ │ │ 
│ Frontend │◄────►│ Backend │ 
│ (Vue.js) │ │ (FastAPI) │ 
│ │ │ │ 
└────────────────┘ └────────────────┘ 
▲ 
│ 
▼ 
┌──────────────────┐ 
│ │ 
│ Scraping & │ 
│ Datenpipeline │ 
│ │ 
└────────────────┘ 
▲ 
│ 
▼ 
┌──────────────────┐ 
│ │ 
│ Speicher │ 
│ │ 
└────────────────┘ 
``` 

## Haupt Komponenten

### 1. Frontend (Vue.js)

Das Frontend wurde mit Vue.js entwickelt und nutzt Tailwind CSS für das Styling. Es ist für die Benutzeroberfläche und das Nutzererlebnis verantwortlich.

#### Hauptfunktionen

- **Framework**: Vue.js 3 mit Composition API
- **Styling**: Tailwind CSS
- **Animationen**: Framer Motion
- **Internationalisierung**: i18next mit automatischer Browser-Spracherkennung
- **Routing**: Vue Router
- **Statusverwaltung**: Pinia

#### Struktur

``` 
src/
├── components/ # Wiederverwendbare Komponenten
├── config/ # Frontend-Konfiguration
├── i18n/ # Übersetzungsdateien
├── router/ # Routenkonfiguration
├── views/ # Hauptseiten
└── main.js # Einstiegspunkt
``` 

### 2. Backend (FastAPI)

Das Backend wird mit FastAPI entwickelt, einer Modernes und leistungsstarkes Python-Framework zur Erstellung von APIs. Es übernimmt alle Serveroperationen, den Datenzugriff und die Geschäftslogik.

#### Hauptfunktionen

- **Framework**: FastAPI
- **Authentifizierung**: JWT
- **Validierung**: Pydantic
- **API-Dokumentation**: Integrierte Swagger-Benutzeroberfläche

#### Struktur

``` 
backend/
├── config/ # Backend-Konfiguration
├── core/ # Hauptgeschäftslogik
│ ├── api/ # API-Endpunkte
│ └── schemas/ # Pydantic-Schemata
├── models/ # Datenmodelle
├── utils/ # Dienstprogramme
└── main.py # Einstiegspunkt
``` 

### 3. Scraping & Datenpipeline

Dieses Modul sammelt Daten aus Webquellen und transformiert sie Es dient dem Training von KI-Modellen.

#### Hauptfunktionen

- **Scraping**: Asynchrones System mit aiohttp und BeautifulSoup
- **Orchestrierung**: Aufgaben- und Prioritätsverwaltung
- **Transformation**: Datenbereinigung und -normalisierung
- **Cache**: Caching-System zur Vermeidung redundanter Anfragen

#### Struktur

``` 
backend/
├── scraping/
│ ├── scrapers/ # Spezifische Implementierungen für verschiedene Quellen
│ ├── utils/ # Scraping-Dienstprogramme
│ ├── orchestrator.py # Aufgaben-Orchestrierung
│ └── cache.py # Caching-System
└── datasets/ # Erfasste und transformierte Daten
``` 

### 4. Speicher

Das Speichersystem verwaltet die Datenpersistenz und den Zugriff.

#### Speicheroptionen

- **Datenbank**: PostgreSQL für strukturierte Daten
- **Dateispeicher**: Lokales Dateisystem oder S3-kompatibel für große Datenmengen
- **Cache**: Redis für verteilten Cache

## Datenfluss

### 1. Datenerfassung

``` 
┌──────────────┐ ┌─────────────┐ ┌─────────────┐ 
│ │ │ │ │ 
│ Web │────►│ Scraper │────►│ Cache │ 
│ Quellen │ │ │ │ │ 
└──────────────┘ └────────────┘ └─────────────┘ 
│ 
▼ 
┌─────────────┐ ┌──────────────┐ 
│ │ │ │ 
│ Prozessoren │────►│ Speicher │ 
│ │ │ │ 
└────────────┘ └─────────────┘ 
``` 

1. Scraper sammeln Daten aus Webquellen.
2. Daten werden zwischengespeichert, um redundante Anfragen zu vermeiden.
3. Prozessoren bereinigen und transformieren die Daten.
4. Transformierte Daten werden zur späteren Verwendung gespeichert.

### 2. Modelltraining

``` 
┌──────────────┐ ┌───────────────┐ ┌─────────────┐ 
│ │ │ │ │ │ 
│ Datensätze │────►│ Präprozessor │────►│ Training │ 
│ │ │ │ │ │ 
└────────────┘ └────────────┘ └────────────┘ 
│ 
▼ 
┌───────────────┐ 
│ │ 
│ Modelle │ 
│ │ 
└────────────┘ 
``` 

1. Datensätze werden extrahiert aus dem Speicher
2. Daten werden für das Training vorverarbeitet
3. Modelle werden mit den vorverarbeiteten Daten trainiert
4. Trainierte Modelle werden gespeichert

### 3. Modellnutzung

``` 
┌──────────────┐ ┌─────────────┐ ┌─────────────┐ 
│ │ │ │ │ │ 
│ API │────►│ Modelle │────►│ Antwort │ 
│ Anfrage │ │ │ │ 
└─────────────┘ └─────────────┘ └─────────────┘ 
``` 

1. Eine API-Anfrage wird empfangen.
2. Geeignete Modelle werden zur Bearbeitung der Anfrage verwendet.
3. Eine Antwort wird generiert und zurückgegeben.

## Kommunikation zwischen Komponenten

### REST-API

Die Kommunikation zwischen Frontend und Backend erfolgt primär über eine REST-API. Endpunkte sind logisch organisiert und mit der Swagger-Benutzeroberfläche dokumentiert.

### WebSockets

Für Funktionen, die Echtzeit-Updates erfordern (z. B. das Tracking von Scraping-Aufgaben), werden WebSockets verwendet, um die bidirektionale Kommunikation zu ermöglichen.

### Nachrichtenwarteschlange

Für asynchrone und lang andauernde Aufgaben wird eine Nachrichtenwarteschlange (wie RabbitMQ oder Redis Pub/Sub) verwendet, um Komponenten zu entkoppeln und die Zuverlässigkeit zu gewährleisten.

## Bereitstellung

### Bereitstellungsoptionen

WhytCard kann auf verschiedene Arten bereitgestellt werden:

1. **Desktop-Anwendung**: Mit Tauri eine plattformübergreifende Desktop-Anwendung erstellen
2. **Cloud-Bereitstellung**: Bereitstellung auf Cloud-Diensten wie AWS, GCP oder Azure
3. **Selbsthosting**: Installation auf einem privaten oder Firmenserver

### Bereitstellungsarchitektur

```
┌─────────────────┐ ┌──────────────────┐
│ │ │ │ 
│ Frontend │◄────►│ API-Gateway │ 
│ (Statisch) │ │ │ 
└─────────────────┘ └────────────────┘ 
▲ 
│ 
▼ 
┌─────────────────┐ 
│ │ 
│ Backend-API │ 
│ │ 
└────────────────┘ 
▲ 
│ 
▼ 
┌───────────────────┐ ┌─────────────────┐ 
│ │ │ │ 
│ Datenbank │ │ Dateispeicher │ 
│ │ │ │ 
└─────────────────┘ └────────────────┘ 
``` 

## Sicherheit

### Sicherheitsprinzipien

1. **Tiefenverteidigung**: Mehrere Sicherheitsebenen
2. **Prinzip der geringsten Privilegien**: Minimal notwendiger Zugriff
3. **Eingabevalidierung**: Alle Benutzereingaben werden validiert
4. **Datenschutz**: Verschlüsselung sensibler Daten

### Sicherheitsmaßnahmen

- **Authentifizierung**: JWT mit Token-Rotation
- **Autorisierung**: Rollenbasierte Zugriffskontrolle
- **Schutz vor gängigen Angriffen**: XSS, CSRF, SQL-Injection
- **Audit**: Protokollierung wichtiger Aktionen

## Skalierbarkeit

Die Architektur ist horizontal und vertikal skalierbar:

- **Microservices**: Komponenten können unabhängig voneinander eingesetzt werden
- **Caching**: Verwendung mehrstufiger Caches
- **Load Balancing**: Verteilung des Datenverkehrs auf mehrere Instanzen
- **Partitionierung**: Datentrennung zur Leistungssteigerung

## Überwachung und Beobachtbarkeit

- **Logging**: Zentralisiertes Logging mit ELK Stack oder einem gleichwertigen System
- **Metriken**: Metrikerfassung mit Prometheus
- **Tracing**: Anfrageverfolgung mit OpenTelemetry
- **Alerting**: Alarme basierend auf vordefinierten Schwellenwerten

## Fazit

Die Architektur von WhytCard ist robust, skalierbar und wartbar. Die klare Trennung der Verantwortlichkeiten zwischen den verschiedenen Komponenten ermöglicht eine unabhängige Weiterentwicklung und erleichtert die Teamarbeit. Die Technologieauswahl wurde unter Berücksichtigung aktueller und zukünftiger Projektanforderungen sowie bewährter Branchenpraktiken getroffen.

Diese Architektur wird regelmäßig überprüft und aktualisiert, um sie an neue Anforderungen und technologische Entwicklungen anzupassen.

---

Letzte Aktualisierung: 15.01.2025