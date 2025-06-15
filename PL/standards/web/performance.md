# Standardy wydajności sieci Web

## Cele wydajnościowe

- Wynik Lighthouse: 90+ dla wszystkich metryk
- Cele podstawowych wskaźników sieci Web:
- LCP (największe malowanie treści): < 2,5 s
- FID (opóźnienie pierwszego wejścia): < 100 ms
- CLS (skumulowane przesunięcie układu): < 0,1
- INP (interakcja do następnego malowania): < 200 ms
- Czas do interakcji: < 3 s
- Pierwsze malowanie treści: < 1,8 s
- Całkowita waga strony: < 1 MB (najlepiej < 500 KB)
- Żądania HTTP: < 50 na stronę

## Optymalizacja obrazu

- Używaj formatów WebP/AVIF z rozwiązaniami awaryjnymi dla starszych przeglądarek
- Implementuj responsywne obrazy z atrybutami `srcset` i `sizes`
- Obrazy z leniwym ładowaniem poniżej fold 
- Prawidłowo dostosuj rozmiar obrazów (unikaj wyświetlania dużych obrazów pomniejszonych za pomocą CSS) 
- Używaj CDN obrazów do dynamicznej zmiany rozmiaru, gdy jest to możliwe 
- Optymalizuj pliki SVG i usuwaj niepotrzebne metadane 
- Kompresuj wszystkie obrazy za pomocą narzędzi takich jak ImageOptim, TinyPNG lub Squoosh 
- Rozważ technikę rozmycia w celu progresywnego ładowania 

## Optymalizacja JavaScript 

- Implementuj podział kodu i dynamiczne importy 
- Odrocz niekrytyczny JavaScript 
- Używaj tree-shaking, aby wyeliminować martwy kod 
- Minimalizuj i kompresuj pliki JavaScript 
- Unikaj JavaScript blokującego renderowanie 
- Używaj web workerów do zadań intensywnie wykorzystujących procesor 
- Implementuj priorytetyzację żądań 
- Optymalizuj skrypty innych firm i używaj atrybutów async/defer 

## Optymalizacja CSS 

- Minimalizuj i wbudowuj krytyczny CSS 
- Usuń nieużywany CSS za pomocą narzędzi takich jak PurgeCSS 
- Unikaj importów CSS (zamiast tego używaj konkatenacji) 
- Używaj powstrzymywania CSS dla niezależnych komponenty 
- Optymalizacja selektorów CSS pod kątem wydajności 
- Rozważenie wpływu CSS-in-JS na wydajność 
- Używanie zmiennych CSS w celu lepszej obsługi 
- Implementacja podziału kodu CSS dla dużych aplikacji 

## Optymalizacja czcionek 

- Używanie czcionek systemowych, gdy jest to możliwe 
- Implementacja font-display: swap lub opcjonalnie 
- Podzbiór czcionek, aby zawierały tylko niezbędne znaki 
- Samodzielne hostowanie czcionek zamiast korzystania z usług stron trzecich 
- Wstępne ładowanie krytycznych czcionek 
- Używanie zmiennych czcionek dla wielu grubości/stylów 
- Ograniczenie wariantów czcionek (grubości, style) 

## Strategia buforowania 

- Implementacja efektywnych zasad buforowania 
- Długi bufor dla zasobów statycznych (ponad 1 rok) 
- Krótki bufor/brak buforowania dla HTML 
- Używanie wersjonowanych nazw plików lub ciągów zapytań w celu łamania bufora 
- Implementacja pracowników usług w celu obsługi trybu offline 
- Używanie localStorage/IndexedDB do buforowania po stronie klienta 
- Prawidłowa konfiguracja nagłówków bufora HTTP 
- Implementacja CDN buforowanie 

## Optymalizacja serwera 

- Włącz HTTP/2 lub HTTP/3 
- Wdróż kompresję po stronie serwera (Brotli/Gzip) 
- Użyj CDN do globalnego dostarczania treści 
- Zoptymalizuj odpowiedzi API (paginacja, wybór pól) 
- Wdróż przetwarzanie brzegowe dla dynamicznej treści 
- Skonfiguruj odpowiednie ustawienia CORS 
- Zoptymalizuj czas do pierwszego bajtu (TTFB) 
- Użyj wskazówek HTTP preconnect, prefetch i preload 

## Optymalizacja mobilna 

- Nadaj priorytet wydajności mobilnej (podejście mobile-first) 
- Zoptymalizuj cele dotykowe (min. 44×44px) 
- Zmniejsz obciążenie sieciowe dla urządzeń mobilnych 
- Wdróż wzorce projektowania responsywnego 
- Testuj na rzeczywistych urządzeniach mobilnych, a nie tylko emulatorach 
- Rozważ zmniejszenie ruchu dla animacji 
- Zoptymalizuj scenariusze offline/słabej łączności 

## Monitorowanie i testowanie 

- Wdróż monitorowanie rzeczywistych użytkowników (RUM) 
- Skonfiguruj syntetyczne monitorowanie krytycznych przepływów użytkowników 
- Użyj WebPageTest do szczegółowej analizy wydajności 
- Monitoruj podstawowe wskaźniki internetowe w Google Search Console 
- Skonfiguruj budżety wydajności i alerty 
- Przeprowadzaj regularne audyty wydajności 
- Wdrażaj testy A/B w celu poprawy wydajności 
- Używaj panelu Wydajność Chrome DevTools do profilowania 

## Zaawansowane techniki 

- Wdrażaj wskazówki dotyczące zasobów (wstępne łączenie, wstępne ładowanie, wstępne pobieranie) 
- Używaj obserwatora przecięcia do leniwego ładowania 
- Rozważ renderowanie po stronie serwera lub generowanie statycznej witryny 
- Wdrażaj wzorzec stale-while-revalidate 
- Używaj requestIdleCallback do zadań niekrytycznych 
- Rozważ mapy importu do ładowania modułów 
- Wdrażaj predykcyjne wstępne pobieranie na podstawie zachowania użytkownika 
- Używaj wskazówek dotyczących priorytetów dla krytycznych zasobów