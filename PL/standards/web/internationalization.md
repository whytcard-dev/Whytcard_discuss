# Standardy internacjonalizacji (i18n) 

## Podstawowe zasady 

- Projektuj dla odbiorców z całego świata od samego początku 
- Oddzielaj treść od kodu 
- Wspieraj wiele języków i ustawień regionalnych 
- Szanuj różnice kulturowe i wrażliwość 
- Wdrażaj automatyczne wykrywanie języka 
- Umożliwiaj ręczny wybór języka 
- Testuj z prawdziwymi użytkownikami z rynków docelowych 

## Język i treść 

### Zarządzanie tekstem 

- Przechowuj cały tekst widoczny dla użytkownika w plikach zasobów 
- Nigdy nie koduj na stałe ciągów tekstowych w komponentach 
- Używaj unikalnych, opisowych kluczy dla zasobów tekstowych 
- Organizuj tłumaczenia według funkcji lub strony 
- Wspieraj reguły pluralizacji dla różnych języków 
- Obsługuj warianty specyficzne dla płci 
- Wspieraj języki pisane od prawej do lewej (RTL) 
- Wdrażaj mechanizmy zapasowe dla brakujących tłumaczeń 

### Proces tłumaczenia 

- Zapewnij kontekst dla tłumaczy 
- Dołącz opisy symboli zastępczych/zmiennych 
- Korzystaj z profesjonalnych usług tłumaczeniowych 
- Wdrażaj systemy pamięci tłumaczeniowej 
- Zezwól na rozszerzenie tekstu (niektóre języki wymagają więcej miejsca) 
- Dostarcz zrzuty ekranu dla kontekstu 
- Wdróż proces przeglądu tłumaczeń 
- Wspieraj ciągłe aktualizacje tłumaczeń 

### Zagadnienia dotyczące treści 

- Unikaj metafor lub idiomów specyficznych dla danej kultury 
- Bądź świadomy symboliki kolorów w różnych kulturach 
- Rozważ różne formaty nazw i standardy adresów 
- Szanuj wrażliwość kulturową i tabu 
- W razie potrzeby dostosuj treść do lokalnych rynków 
- Używaj neutralnych kulturowo obrazów 
- Rozważ kierunek czytania (LTR vs RTL) 
- Unikaj slangu i kolokwializmów 

## Implementacja techniczna 

### Framework i biblioteki 

- Używaj ustalonych bibliotek i18n: 
- react-i18next / i18next (React) 
- vue-i18n (Vue) 
- angular/localize (Angular) 
- next-intl (Next.js) 
- Format.js (React) 
- Implementacja prawidłowego wykrywania języka 
- Obsługa przełączania języków bez przeładowywania strony 
- Konfigurowanie języków zapasowych 
- Implementacja leniwego ładowania tłumaczeń 
- Buforowanie tłumaczeń w celu zwiększenia wydajności 
- Obsługa zagnieżdżonych kluczy tłumaczeń 
- Implementacja pluralizacji i formatowania 

### Struktura kodu 

- Oddzielanie plików tłumaczeń według języka 
- Używanie JSON lub YAML dla zasobów tłumaczeń 
- Implementacja przestrzeni nazw dla dużych aplikacji 
- Utrzymywanie uporządkowanych i łatwych w utrzymaniu kluczy tłumaczeń 
- Przestrzeganie spójnych konwencji nazewnictwa kluczy 
- Dokumentowanie specjalnego formatowania lub zmiennych 
- Implementacja bezpieczeństwa typu dla kluczy tłumaczeń (TypeScript) 
- Obsługa dynamicznego generowania kluczy w razie potrzeby 

### Formatowanie 

#### Data i godzina 

- Korzystanie z bibliotek obsługujących międzynarodowe formaty dat 
- Wyświetlanie dat w preferowanym przez użytkownika formacie 
- Uwzględnianie stref czasowych i czasu letniego 
- Formatowanie dat zgodnie z konwencjami lokalnymi 
- Obsługa różnych systemów kalendarzowych w razie potrzeby 
- Korzystanie z formatu ISO dla wymiana danych 
- Wyświetlanie względnych czasów w zależności od kultury 

#### Liczby i waluty 

- Formatowanie liczb zgodnie z konwencjami regionalnymi 
- Używanie właściwych separatorów dziesiętnych i tysięcy 
- Formatowanie walut za pomocą odpowiednich symboli 
- Prawidłowe umieszczanie symboli walut zgodnie z lokalizacją 
- Obsługa różnych systemów numeracyjnych 
- Formatowanie procentów zgodnie z lokalizacją 
- Rozważanie kursów wymiany dla aplikacji wieloregionalnych 

#### Adresy i numery telefonów 

- Obsługa różnych formatów adresów 
- Obsługa różnych formatów kodów pocztowych 
- Obsługa międzynarodowych numerów telefonów (format E.164) 
- Formatowanie numerów telefonów zgodnie z lokalnymi konwencjami 
- Obsługa różnych konwencji kolejności nazw 
- Rozważanie tytułów honorowych i tytułów w różnych kulturach 
- Sprawdzanie adresów zgodnie z zasadami obowiązującymi w danym kraju 

## Rozważania dotyczące interfejsu użytkownika 

### Układ i projekt 

- Projektowanie elastycznych układów, które umożliwiają rozszerzenie tekstu 
- Obsługa kierunków tekstu LTR i RTL 
- Implementacja dwukierunkowa (bidi) obsługa tekstu 
- Testuj układy z dłuższymi ciągami tekstu 
- Unikaj kontenerów o stałej szerokości dla tekstu 
- Rozważ różnice w rozmiarach czcionek w różnych językach 
- Testuj z rzeczywistą przetłumaczoną treścią, a nie lorem ipsum 
- W razie potrzeby implementuj CSS specyficzny dla języka 

### Typografia 

- Używaj czcionek obsługujących wiele języków 
- Dołącz odpowiednie zapasowe czcionki 
- Rozważ zestawy znaków dla różnych języków 
- Obsługa znaków specjalnych i diakrytycznych 
- Dostosuj wysokości wierszy dla różnych skryptów 
- Testuj czytelność w różnych językach 
- Rozważ tekst pionowy dla niektórych języków wschodnioazjatyckich 
- Używaj Unicode prawidłowo 

### Nawigacja i kontrolki 

- Tłumacz elementy nawigacji i kontrolki 
- Dostosuj nawigację dla języków RTL 
- Weź pod uwagę kulturowe wzorce czytania 
- Upewnij się, że ikony są kulturowo neutralne 
- Testuj skróty klawiaturowe w różnych układach klawiatury 
- Zapewnij zlokalizowaną pomoc i dokumentację 
- Tłumacz komunikaty o błędach i powiadomienia 
- Lokalizuj funkcjonalność wyszukiwania 

## Testowanie i jakość Zapewnienie

### Strategia testowania

- Testuj z rodzimymi użytkownikami języka
- Weryfikacja tłumaczeń w kontekście
- Testowanie rozszerzania i skracania tekstu
- Weryfikacja formatowania daty, liczby i waluty
- Dokładne testowanie układów RTL
- Weryfikacja funkcjonalności przełączania języków
- Testowanie z różnymi ustawieniami regionalnymi
- Implementacja zautomatyzowanego testowania i18n

### Typowe problemy

- Sprawdzanie zakodowanych na stałe ciągów
- Weryfikacja prawidłowej liczby mnogiej
- Poszukiwanie połączonych ciągów
- Testowanie pod kątem problemów z obsługą Unicode
- Weryfikacja sortowania i zestawiania
- Sprawdzanie założeń kulturowych w logice
- Testowanie z długimi słowami i ciągami
- Weryfikacja obsługi znaków specjalnych

### Narzędzia i automatyzacja

- Implementacja lintingu dla problemów i18n
- Korzystanie z systemów zarządzania tłumaczeniami
- Automatyzacja generowania zrzutów ekranu dla kontekstu
- Implementacja pseudolokalizacji do testowania
- Korzystanie z automatycznego testowania dla problemów z układem
- Śledzenie zasięgu i jakości tłumaczenia
- Wdrożenie kontroli CI/CD dla i18n
- Monitorowanie brakujących tłumaczeń

## Kwestie prawne i zgodność

- Badanie lokalnych wymogów prawnych
- Dostosowanie zasad ochrony prywatności dla różnych regionów
- Rozważenie RODO i innych przepisów dotyczących prywatności
- Dostosowanie warunków korzystania z usługi dla lokalnych rynków
- Należy być świadomym ograniczeń treści w zależności od kraju
- Rozważenie wymogów dostępności w zależności od regionu
- Dokumentowanie środków zgodności
- Skonsultowanie się z ekspertami prawnymi dla kluczowych rynków