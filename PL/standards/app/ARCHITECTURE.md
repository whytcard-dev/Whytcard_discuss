# Globalna architektura WhytCard

## Wprowadzenie

Niniejszy dokument przedstawia globalną architekturę projektu WhytCard, platformy open-source do scrapowania stron internetowych i szkolenia AI. Architektura jest zaprojektowana tak, aby była modułowa, skalowalna i łatwa w utrzymaniu, umożliwiając łatwe dodawanie nowych funkcji przy jednoczesnym zapewnieniu stabilności systemu.

## Przegląd

WhytCard jest zorganizowany zgodnie z architekturą klient-serwer z wyraźnym rozdzieleniem między front-endem i back-endem. To rozdzielenie umożliwia niezależną ewolucję obu komponentów i ułatwia pracę zespołową.

``` 
┌────────────────┐ ┌─────────────────┐ 
│ │ │ │ 
│ Frontend │◄────►│ Backend │ 
│ (Vue.js) │ │ (FastAPI) │ 
│ │ │ │ 
└────────────────┘ └─────────────────┘──────────┘────────┘───────┘──────┘──────┘───────┘──────┘─────┐│││
│ Scraping i │
│ Kanał danych │
│ │ 
└─────────────────┘ 
▲ 
│ 
▼ 
┌────────────────┐ 
│ │ 
│ Przechowywanie │ 
│ │ 
└────────────────┘ 
``` 

## Główny Komponenty

### 1. Frontend (Vue.js)

Frontend jest rozwijany w Vue.js i używa Tailwind CSS do stylizacji. Jest odpowiedzialny za interfejs użytkownika i doświadczenie użytkownika.

#### Główne cechy 

- **Framework**: Vue.js 3 z Composition API 
- **Styl**: Tailwind CSS 
- **Animacje**: Framer Motion 
- **Internacjonalizacja**: i18next z automatycznym wykrywaniem języka przeglądarki 
- **Routing**: Vue Router 
- **Zarządzanie stanem**: Pinia 

#### Struktura 

``` 
src/ 
├── components/ # Komponenty wielokrotnego użytku 
├── config/ # Konfiguracja frontendu 
├── i18n/ # Pliki tłumaczeń 
├── router/ # Konfiguracja trasy 
├── views/ # Strony główne 
└── main.js # Punkt wejścia 
``` 

### 2. Backend (FastAPI)

Backend jest rozwijany przy użyciu FastAPI, nowoczesnego i wydajnego frameworka Python do tworzenia API. Obsługuje on wszystkie operacje serwera, dostęp do danych i logikę biznesową.

#### Główne cechy 

- **Struktura**: FastAPI 
- **Uwierzytelnianie**: JWT 
- **Walidacja**: Pydantic 
- **Dokumentacja API**: Zintegrowany interfejs użytkownika Swagger 

#### Struktura 

``` 
backend/ 
├── config/ # Konfiguracja zaplecza 
├── core/ # Główna logika biznesowa 
│ ├── api/ # Punkty końcowe API 
│ └── schemas/ # Schematy Pydantic 
├── models/ # Modele danych 
├── utils/ # Narzędzia 
└── main.py # Punkt wejścia 
``` 

### 3. Scraping i dane Pipeline

Ten moduł odpowiada za zbieranie danych ze źródeł internetowych i przekształcanie ich na potrzeby szkolenia modelu AI.

#### Główne cechy 

- **Scraping**: Asynchroniczny system z aiohttp i BeautifulSoup 
- **Orkiestracja**: Zarządzanie zadaniami i priorytetami 
- **Transformacja**: Czyszczenie i normalizacja danych 
- **Pamięć podręczna**: System pamięci podręcznej w celu uniknięcia zbędnych żądań 

#### Struktura 

``` 
backend/ 
├── scraping/ 
│ ├── scrapers/ # Specyficzne implementacje dla różnych źródeł 
│ ├── utils/ # Narzędzia do scrapowania 
│ ├── orchestrator.py # Koordynator zadań 
│ └── cache.py # System pamięci podręcznej 
└── datasets/ # Zebrane i przekształcone dane 
``` 

### 4. Przechowywanie

System przechowywania zarządza trwałością danych i dostępem.

#### Opcje przechowywania

- **Baza danych**: PostgreSQL dla danych strukturalnych
- **Przechowywanie plików**: Lokalny system plików lub zgodny z S3 dla dużych danych
- **Pamięć podręczna**: Redis dla rozproszonej pamięci podręcznej

## Przepływ danych

### 1. Zbieranie danych

``` 
┌──────────────┐ ┌────────────┐ ┌────────────┐ ┌─────────────┐ 
│ │ │ │ │ │ 
│ Sieć │────►│ Scrapersy │───►│ Pamięć podręczna │ 
│ Źródła │ │ │ │ │ │ 
└─────────────┘ └────────────┘ └────────────┘ 
│ 
▼ 
┌────────────┐ ┌─────────────┐ 
│ │ │ │ │ 
│ Procesory │───►│ Pamięć masowa │ 
│ │ │ │ 
└────────────┘ └────────────┘ 
``` 

1. Scrapery zbierają dane ze źródeł internetowych 
2. Dane są buforowane w celu uniknięcia zbędnych żądań 
3. Procesory czyszczą i przekształcają dane 
4. Przekształcone dane są przechowywane do późniejszego wykorzystania 

### 2. Szkolenie modelu 

``` 
┌─────────────┐ ┌─────────────┐ ┌────────────┐ 
│ │ │ │ │ │ │ 
│ Zestawy danych │────►│ Preprocesor│────►│ Szkolenie │ 
│ │ │ │ │ │ │ 
└────────────┘ └────────────┘ └─────────────┘ 
│ 
▼ 
┌─────────────┐ 
│ │ 
│ Modele │ 
│ │ 
└─────────────┘ 
``` 

1. Zestawy danych są wyodrębnione z magazynu

2. Dane są wstępnie przetworzone do treningu

3. Modele są trenowane na wstępnie przetworzonych danych

4. Wytrenowane modele są zapisywane

### 3. Użycie modelu

``` 
┌─────────────┐ ┌────────────┐ ┌────────────┐ 
│ │ │ │ │ │ 
│ API │────►│ Modele │────►│ Odpowiedź │ 
│ Żądanie │ │ │ │ │ 
└─────────────┘ └───────────┘ └────────────┘ 
``` 

1. Otrzymano żądanie API 
2. Do przetworzenia używane są odpowiednie modele request 
3. Generowana i zwracana jest odpowiedź 

## Komunikacja między komponentami 

### REST API 

Komunikacja między front-endem a back-endem odbywa się głównie za pośrednictwem REST API. Punkty końcowe są logicznie zorganizowane i udokumentowane za pomocą Swagger UI. 

### WebSockets 

W przypadku funkcji wymagających aktualizacji w czasie rzeczywistym (takich jak śledzenie zadań scrapowania) WebSockets są używane w celu umożliwienia komunikacji dwukierunkowej. 

### Kolejka komunikatów 

W przypadku zadań asynchronicznych i długotrwałych kolejka komunikatów (taka jak RabbitMQ lub Redis Pub/Sub) jest używana w celu oddzielenia komponentów i zapewnienia niezawodności. 

## Wdrożenie

### Opcje wdrożenia

WhytCard można wdrożyć na kilka sposobów:

1. **Aplikacja na komputer**: Używanie Tauri do tworzenia wieloplatformowej aplikacji na komputer

2. **Wdrożenie w chmurze**: Wdrożenie w usługach w chmurze, takich jak AWS, GCP lub Azure

3. **Samodzielne hostowanie**: Instalacja na serwerze osobistym lub firmowym

### Architektura wdrożenia

``` 
┌─────────────────┐ ┌────────────────┐ 
│ │ │ │ │ 
│ Frontend │◄────►│ Brama API │ 
│ (Statyczna) │ │ │ 
└────────────────┘ └────────────────┘ 
▲ 
│ 
▼ 
┌────────────────┐ 
│ │ 
│ API zaplecza │ 
│ │ 
└────────────────┘ 
▲ 
│ 
▼ 
┌────────────────┐ ┌─────────────────┐ 
│ │ │ │ 
│ Baza danych │ │ Przechowywanie plików │ 
│ │ │ │ 
└────────────────┘ └────────────────┘ 
``` 

## Bezpieczeństwo 

### Zasady bezpieczeństwa 

1. **Obrona w głąb**: Wiele warstw bezpieczeństwa 
2. **Zasada najmniejszych uprawnień**: Minimalny wymagany dostęp 
3. **Walidacja danych wejściowych**: Wszystkie dane wejściowe użytkownika są weryfikowane 
4. **Ochrona danych**: Szyfrowanie poufnych danych 

### Środki bezpieczeństwa 

- **Uwierzytelnianie**: JWT z rotacją tokenów 
- **Autoryzacja**: Kontrola dostępu oparta na rolach 
- **Ochrona przed typowymi atakami**: XSS, CSRF, wstrzykiwanie SQL 
- **Audyt**: Rejestrowanie ważnych działań 

## Skalowalność 

Architektura jest zaprojektowany tak, aby był skalowalny poziomo i pionowo: 

- **Mikrousługi**: Komponenty mogą być wdrażane niezależnie 
- **Buforowanie**: Wykorzystanie pamięci podręcznej wielopoziomowej 
- **Równoważenie obciążenia**: Dystrybucja ruchu pomiędzy wieloma instancjami 
- **Partycjonowanie**: Separacja danych w celu poprawy wydajności 

## Monitorowanie i obserwowalność 

- **Rejestrowanie**: Centralne rejestrowanie za pomocą ELK Stack lub równoważnego 
- **Metryki**: Zbieranie metryk za pomocą Prometheus 
- **Śledzenie**: Śledzenie żądań za pomocą OpenTelemetry 
- **Alerty**: Alerty oparte na wstępnie zdefiniowanych progach 

## Wnioski 

Architektura WhytCard jest zaprojektowana tak, aby była solidna, skalowalna i łatwa w utrzymaniu. Wyraźny podział odpowiedzialności pomiędzy różnymi komponentami umożliwia niezależną ewolucję i ułatwia pracę zespołową. Wybory technologiczne zostały dokonane z uwzględnieniem bieżących i przyszłych potrzeb projektu, a także najlepszych praktyk branżowych. 

Ta architektura będzie regularnie przeglądana i aktualizowana w celu dostosowania do nowych potrzeb i rozwoju technologicznego. 

--- 

Ostatnia aktualizacja: 2025-01-15