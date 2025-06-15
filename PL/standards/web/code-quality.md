# Standardy jakości kodu

## Podstawowe zasady

- Pisanie czystego, łatwego w utrzymaniu i samodokumentującego się kodu
- Przestrzeganie zasad SOLID i DRY
- Utrzymywanie funkcji w małych rozmiarach i skupionych (pojedyncza odpowiedzialność)
- Stosowanie opisowego nazewnictwa zmiennych, funkcji i klas
- Utrzymywanie spójnego stylu kodu w całym projekcie
- Dokumentowanie złożonej logiki i publicznych interfejsów API
- Pisanie kodu dla ludzi, a nie tylko maszyn

## Standardy JavaScript/TypeScript

### Konfiguracja TypeScript

- Używanie trybu ścisłego (`"strict": true`)
- Włączanie wszystkich zalecanych opcji sprawdzania typów
- Skonfigurowanie prawidłowego rozwiązywania modułów
- Ustawienie odpowiedniej docelowej wersji ECMAScript
- Określanie wzorców dołączania/wykluczania
- Używanie aliasów ścieżek w celu zapewnienia czystszych importów

### Konwencje nazewnictwa

- **Zmienne/Funkcje**: camelCase (`getUserData`, `calculateTotal`) 
- **Klasy/Interfejsy/Typy**: PascalCase (`UserProfile`, `ApiResponse`) 
- **Stałe**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`, `API_URL`) 
- **Właściwości prywatne**: Użyj prefiksu `#` lub konwencji `_` (`#privateField`, `_privateMethod`) 
- **Zmienne logiczne**: Użyj prefiksów „is”, „has”, „can” (`isActive`, `hasPermission`) 
- **Pliki komponentów**: PascalCase z rozszerzeniem (`UserCard.tsx`) 
- **Pliki narzędziowe**: camelCase z rozszerzeniem (`formatDate.ts`) 

### Organizacja kodu 

- Jedna klasa/komponent na plik 
- Grupuj importy według zewnętrznych/wewnętrznych 
- Uporządkuj importy alfabetycznie 
- Użyj eksportów barrel (`index.ts`) dla powiązanych funkcji 
- Zorganizuj kod według funkcji/modułu 
- Utrzymuj pliki poniżej 400 wierszy (podziel, jeśli są większe) 
- Utrzymuj funkcje poniżej 50 wierszy 
- Maksymalne zagnieżdżenie: 3-4 poziomy w głąb 

### Najlepsze praktyki 

- Preferuj niezmienność (const, readonly, Object.freeze) 
- Używaj opcjonalnego łączenia łańcuchowego i łączenia nullish 
- Implementuj właściwą obsługę błędów 
- Unikaj jakiegokolwiek typu, chyba że jest to konieczne 
- Używaj strażników typów do sprawdzania typów w czasie wykonywania 
- Preferuj async/await nad surowymi obietnicami 
- Unikaj magicznych liczb i ciągów (używaj stałych) 
- Implementuj właściwe sprawdzanie null/undefined 
- Używaj wczesnych zwrotów, aby zmniejszyć zagnieżdżanie 

## Standardy React 

### Struktura komponentów 

- Preferuj komponenty funkcjonalne z hakami 
- Używaj nazwanych eksportów dla komponentów 
- Implementacja walidacji właściwości za pomocą TypeScript 
- Ekstrakcja złożonej logiki do niestandardowych haków 
- Utrzymanie komponentów skupionych na problemach interfejsu użytkownika 
- Implementacja właściwych granic błędów 
- Używanie React.memo w celu optymalizacji wydajności 
- Ekstrakcja komponentów wielokrotnego użytku 

### Zarządzanie stanem 

- Używanie lokalnego stanu dla danych specyficznych dla komponentu 
- Używanie kontekstu dla współdzielonego stanu między komponentami 
- Rozważenie zewnętrznego zarządzania stanem dla złożonych aplikacji 
- Utrzymanie stanu znormalizowanego i minimalnego 
- Implementacja właściwej inicjalizacji stanu 
- Używanie reduktorów dla złożonej logiki stanu 
- Unikanie drążenia właściwości (używanie kompozycji lub kontekstu) 

### Optymalizacja wydajności 

- Używanie React.memo dla czystych komponentów 
- Implementacja useMemo dla kosztownych obliczeń 
- Używanie useCallback do memoizacji funkcji 
- Wirtualizacja długich list (react-window, react-virtualized) 
- Implementacja właściwych tablic zależności w hakach 
- Unikanie niepotrzebnych ponownych renderowań 
- Używanie React Profiler w celu identyfikacji wąskich gardeł 

## Standardy testowania

### Testowanie jednostkowe

- Testowanie całej logiki biznesowej i narzędzi
- Używanie Jest lub Vitest jako narzędzia do uruchamiania testów
- Implementacja prawidłowego symulowania zależności
- Używanie biblioteki testowej do testowania komponentów
- Postępowanie zgodnie ze wzorcem AAA (Arrange, Act, Assert)
- Pisanie opisowych nazw testów
- Dążenie do uzyskania >80% pokrycia kodu
- Testowanie przypadków skrajnych i scenariuszy błędów

### Testowanie integracyjne

- Testowanie interakcji komponentów
- Testowanie przesyłania formularzy i przepływów użytkowników
- Używanie MSW do symulowania API
- Testowanie trasowania i nawigacji
- Weryfikowanie zmian stanu
- Testowanie przy użyciu realistycznych danych

### Testowanie kompleksowe

- Używanie Cypress lub Playwright
- Testowanie krytycznych ścieżek użytkownika
- Testowanie w wielu przeglądarkach
- Implementacja prawidłowej izolacji testów
- Używanie atrybutów danych dla selektorów testów
- Implementacja logiki ponawiania prób dla niestabilnych testów
- Testowanie dostępności

## Przegląd kodu Standardy

### Proces

- Cały kod musi zostać sprawdzony przed scaleniem
- Automatyczne kontrole muszą przejść przed przeglądem
- Używaj szablonów żądań ściągnięcia
- Utrzymuj małe i skoncentrowane żądania ściągnięcia
- Szybko odpowiadaj na komentarze do recenzji
- Rozwiązuj wszystkie komentarze przed scaleniem
- Rozbijaj zatwierdzenia przed scaleniem

### Lista kontrolna przeglądu

- Kod jest zgodny ze standardami projektu

- Testy są dołączone i przechodzą
- Dokumentacja jest aktualizowana
- Brak luk w zabezpieczeniach
- Rozważono implikacje wydajnościowe
- Spełnione wymagania dostępności
- Obsługiwane przypadki skrajne
- Brak zbędnego kodu lub zależności

## Narzędzia

### Linting i formatowanie

- ESLint z odpowiednimi regułami
- Prettier dla spójnego formatowania
- Husky dla haków przed zatwierdzeniem
- lint-staged dla przyrostowego lintingu
- Kompilator TypeScript do sprawdzania typów
- Stylelint dla CSS/SCSS

### Analiza statyczna

- SonarQube lub CodeClimate
- Monitorowanie metryk złożoności
- Wykrywanie duplikatów kodu
- Skanowanie luk w zabezpieczeniach
- Analiza rozmiaru pakietu
- Wykrywanie nieużywanego kodu

### Integracja CI/CD

- Uruchom wszystkie kontrole dla każdego PR
- Scalanie bloków, jeśli kontrole się nie powiodą
- Generowanie i publikowanie raportów pokrycia testowego
- Implementacja testów regresji wydajności
- Automatyzacja aktualizacji zależności
- Wdrażanie środowisk podglądu