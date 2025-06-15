# Standardy bezpieczeństwa sieci Web

## Podstawowe zasady bezpieczeństwa

- Obrona w głąb (wiele warstw bezpieczeństwa)
- Zasada najmniejszych uprawnień
- Bezpieczeństwo w fazie projektowania i domyślnie
- Regularne testowanie i audytowanie bezpieczeństwa
- Aktualizowanie zależności bezpieczeństwa
- Bezpieczne awarie (bezpieczne ustawienia domyślne)
- Zakończenie mediacji (weryfikacja każdego żądania)
- Edukacja w zakresie bezpieczeństwa dla wszystkich członków zespołu

## Uwierzytelnianie i autoryzacja

### Uwierzytelnianie

- Wdrożenie silnych zasad haseł

- Minimalna długość: 12 znaków

- Wymaganie kombinacji znaków, cyfr, symboli

- Sprawdzanie na podstawie popularnych list haseł

- Obsługa uwierzytelniania wieloskładnikowego (MFA)
- Korzystanie z bezpiecznego zarządzania sesjami

- Pliki cookie tylko HTTP

- Bezpieczna flaga dla HTTPS

- Atrybut SameSite

- Odpowiednie wygaśnięcie
- Wdrożenie blokady konta po nieudanych próbach
- Bezpieczne przepływy resetowania hasła
- Korzystanie z bezpiecznego przechowywania haseł (bcrypt/Argon2) 
- Rozważ opcje bezhasłowe (WebAuthn, magiczne linki) 

### Autoryzacja 

- Wdrażaj kontrolę dostępu opartą na rolach (RBAC) 
- Używaj kontroli dostępu opartej na atrybutach dla złożonych uprawnień 
- Sprawdzaj autoryzację przy każdym żądaniu 
- Wdrażaj właściwe kontrole kontroli dostępu 
- Używaj bezpiecznego przetwarzania sesji 
- Wdrażaj autoryzację API (OAuth 2.0, JWT) 
- Unikaj bezpośrednich odwołań do obiektów 
- Rejestruj wszystkie niepowodzenia kontroli dostępu 

## Ochrona danych 

### Dane poufne 

- Identyfikuj i klasyfikuj dane poufne 
- Szyfruj dane poufne w spoczynku 
- Używaj TLS 1.3 dla danych w tranzycie 
- Wdrażaj właściwe zarządzanie kluczami 
- Minimalizuj gromadzenie danych poufnych 
- Stosuj zasady minimalizacji danych 
- Wdrażaj bezpieczne usuwanie danych 
- Używaj bezpiecznego przechowywania kluczy API i sekretów 

### Walidacja danych wejściowych 

- Sprawdzaj wszystkie dane wejściowe na serwerze side 
- Użyj sparametryzowanych zapytań do dostępu do bazy danych 
- Wdróż oczyszczanie danych wejściowych 
- Sprawdź poprawność typów danych, długości i formatu 
- Użyj list dozwolonych zamiast list zabronionych 
- Wdróż kodowanie danych wyjściowych zależne od kontekstu 
- Sprawdź poprawność przesłanych plików (typ, rozmiar, zawartość) 
- Wdróż ograniczenie szybkości przesyłania danych wejściowych 

## Zapobieganie powszechnym lukom w zabezpieczeniach 

### Zapobieganie wstrzyknięciom 

- Użyj sparametryzowanych zapytań/przygotowanych instrukcji 
- Zastosuj ORM z odpowiednim escapingiem 
- Sprawdź poprawność i oczyść wszystkie dane wejściowe 
- Wdróż kodowanie danych wyjściowych zależne od kontekstu 
- Użyj bezpiecznych interfejsów API, które zapobiegają wstrzykiwaniu interpretera 

### Zapobieganie XSS 

- Wdróż zasady bezpieczeństwa treści (CSP) 
- Użyj automatycznego kodowania danych wyjściowych 
- Zastosuj kodowanie zależne od kontekstu 
- Oczyść dane wejściowe HTML 
- Użyj nowoczesnych struktur z wbudowaną ochroną XSS 
- Sprawdź poprawność adresów URL w przekierowaniach 
- Zastosuj Flaga HTTPOnly dla wrażliwych plików cookie

### Zapobieganie CSRF

- Wdrażanie tokenów anty-CSRF
- Używanie atrybutu pliku cookie SameSite
- Weryfikacja nagłówków pochodzenia i referrer
- Wymaganie ponownego uwierzytelnienia dla wrażliwych działań
- Używanie prawidłowej konfiguracji CORS

### Nagłówki bezpieczeństwa

- Content-Security-Policy (CSP)
- X-Content-Type-Options: nosniff
- Strict-Transport-Security (HSTS)
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy
- Nagłówki Cache-Control dla wrażliwych danych
- Clear-Site-Data w celu wylogowania

## Bezpieczeństwo infrastruktury

### Bezpieczeństwo serwera

- Aktualizowanie oprogramowania serwera
- Używanie bezpiecznych konfiguracji serwera
- Wdrażanie prawidłowych reguł zapory
- Włączanie tylko HTTPS (przekierowywanie HTTP do HTTPS)
- Skonfiguruj odpowiednie ustawienia TLS
- Wyłącz niepotrzebne usługi
- Użyj modułów serwera WWW skoncentrowanych na bezpieczeństwie
- Wdróż ograniczenie przepustowości i ochronę przed atakami DDoS

### Bezpieczeństwo API

- Użyj protokołu HTTPS dla wszystkich punktów końcowych API
- Wdróż odpowiednie uwierzytelnianie
- Zastosuj ograniczenie przepustowości
- Sprawdź poprawność ładunków żądań
- Zwróć odpowiednie kody stanu
- Unikaj ujawniania poufnych informacji w odpowiedziach
- Użyj kluczy API do komunikacji między usługami
- Udokumentuj wymagania bezpieczeństwa dla odbiorców API

### Zarządzanie zależnościami

- Regularnie skanuj pod kątem podatnych zależności
- Użyj plików blokady, aby przypiąć wersje zależności
- Wdróż automatyczne skanowanie podatności
- Szybko aktualizuj zależności
- Zminimalizuj wykorzystanie zależności
- Weryfikuj integralność zależności (sumy kontrolne)
- Monitoruj ataki na łańcuch dostaw
- Miej plan reagowania na podatności

## Testowanie bezpieczeństwa

### Analiza statyczna

- Wdróż zautomatyzowane narzędzia SAST
- Zintegruj zabezpieczenia linting w CI/CD 
- Skanowanie w poszukiwaniu zakodowanych na stałe sekretów 
- Analiza kodu pod kątem antywzorców bezpieczeństwa 
- Sprawdzanie konfiguracji bezpieczeństwa 
- Sprawdzanie nieaktualnych zależności 
- Egzekwowanie standardów bezpiecznego kodowania 

### Testowanie dynamiczne 

- Wykonywanie regularnych testów penetracyjnych 
- Implementacja automatycznego skanowania DAST 
- Korzystanie z interaktywnych testów bezpieczeństwa aplikacji 
- Przeprowadzanie regularnych ocen podatności 
- Testowanie przepływów uwierzytelniania i autoryzacji 
- Weryfikowanie nagłówków i konfiguracji zabezpieczeń 
- Symulowanie typowych scenariuszy ataków 

## Monitorowanie i reagowanie na zagrożenia 

### Rejestrowanie i monitorowanie 

- Implementacja kompleksowego rejestrowania zagrożeń 
- Rejestrowanie zdarzeń uwierzytelniania 
- Rejestrowanie awarii kontroli dostępu 
- Monitorowanie podejrzanej aktywności 
- Implementacja alertów w czasie rzeczywistym 
- Korzystanie z centralnego zarządzania dziennikami 
- Zapewnienie odporności dzienników na manipulacje 
- Przechowywanie dzienników przez odpowiednie okresy czasu 

### Reagowanie na incydenty 

- Opracowanie planu reagowania na incydenty 
- Definiowanie ról i obowiązki 
- Ustal protokoły komunikacyjne 
- Procedury przechowywania dokumentów 
- Wdrożenie możliwości analizy kryminalistycznej 
- Przeprowadzenie przeglądów poincydentalnych 
- Ćwiczenie scenariuszy reagowania na incydenty 
- Utrzymywanie kontaktu ze społecznością ds. bezpieczeństwa 

## Zgodność i prywatność 

### Zgodność z przepisami 

- Identyfikacja obowiązujących przepisów (RODO, CCPA itp.) 
- Wdrożenie wymaganych kontroli bezpieczeństwa 
- Przeprowadzenie regularnych ocen zgodności 
- Dokumentowanie środków zgodności 
- Szkolenie zespołu w zakresie wymogów zgodności 
- Wdrożenie prywatności w fazie projektowania 
- Prowadzenie wymaganej dokumentacji 

### Zagadnienia dotyczące prywatności 

- Wdrożenie jasnych zasad prywatności 
- Uzyskanie odpowiedniej zgody na gromadzenie danych 
- Zapewnienie mechanizmów dostępu do danych i ich usuwania 
- Zminimalizowanie gromadzenia i przechowywania danych 
- Wdrożenie przenoszenia danych 
- Przeprowadzenie oceny wpływu na prywatność 
- Uwzględnienie prywatności we wszystkich decyzjach projektowych