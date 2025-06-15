# Przewodnik po etycznym scrapowaniu dla WhytCard

## Wprowadzenie

Scraping sieci jest sednem projektu WhytCard, ale musi być prowadzony w sposób etyczny, odpowiedzialny i zgodny z prawem. Niniejszy przewodnik definiuje zasady i praktyki, których należy przestrzegać, aby zapewnić, że wszystkie działania scrapingowe będą respektować prawa właścicieli witryn, obowiązujące przepisy i standardy etyczne.

## Spis treści 

1. [Podstawowe zasady](#fundamental-principles) 
2. [Aspekty prawne](#legal-aspects) 
3. [Najlepsze praktyki techniczne](#technical-best-practices) 
4. [Poszanowanie zasobów](#resource-respect) 
5. [Ochrona danych osobowych](#personal-data-protection) 
6. [Dokumentacja i przejrzystość](#documentation-and-transparency) 
7. [Przypadki szczególne](#special-cases) 
8. [Lista kontrolna etycznego scrapowania](#ethical-scraping-checklist) 

## Podstawowe zasady 

### Filozofia etycznego scrapowania 

Etyczne scrapowanie opiera się na trzech podstawowych zasadach: 

1. **Poszanowanie**: Szanuj właścicieli witryn, ich warunki użytkowania i ich zasoby 
2. **Proporcjonalność**: Wyodrębniaj tylko niezbędne dane przy minimalnym wpływie 
3. **Przejrzystość**: Bądź przejrzysty w kwestii tożsamości bota i intencji scrapowania 

### Wartości WhytCard dotyczące scrapowania 

Jako projekt WhytCard zobowiązujemy się do: 

- Nigdy nie szkodzić witrynom, które scrapujemy 
- Ściśle przestrzegać wyraźnych i dorozumianych zasad witryn 
- Bądź przejrzysty w kwestii naszej tożsamości i celów 
- Używaj danych odpowiedzialnie i zgodnie z naszą misją 
- Priorytetowo traktuj oficjalne interfejsy API, jeśli są dostępne 

## Aspekty prawne 

### Ogólne ramy prawne 

Scraping sieci podlega kilku ramom prawnym, które różnią się w zależności od kraju: 

- **Prawa autorskie**: Treść witryny jest ogólnie chroniona prawem autorskim 
- **Warunki użytkowania**: Warunki korzystania z witryny mogą wyraźnie zabraniać scrapowania 
- **Ochrona danych**: Przepisy takie jak RODO w Europie chronią dane osobowe 
- **Nieuprawniony dostęp**: Niektóre jurysdykcje kryminalizują nieuprawniony dostęp do systemów komputerowych 

### Znane orzecznictwo 

Niektóre ważne orzeczenia sądowe dotyczące scrapowania: 

- **hiQ Labs v. LinkedIn** (USA): Ustalono, że scrapowanie danych publicznych niekoniecznie jest nielegalne 
- **Ryanair v. PR Aviation** (UE): Potwierdzono, że warunki korzystania mogą umownie ograniczać scrapowanie 
- **QVC v. Resultly** (USA): Podkreślono znaczenie nieprzeciążania serwerów 

### Zgodność prawna WhytCard 

Aby zachować zgodność z prawem: 

1. **Zawsze sprawdzaj Warunki korzystania z usługi** przed scrapowaniem witryny 
2. **Przestrzegaj tagów „noindex” i „nofollow”** w meta tagach 
3. **Nigdy nie omijaj technicznych środków ochrony** (CAPTCHA, ograniczenia dostępu) 
4. **Dokumentuj swoje praktyki**, aby wykazać dobrą wiarę 
5. **Skonsultuj się z prawnikiem**, jeśli masz wątpliwości co do legalności operacji scrapowania 

## Najlepsze praktyki techniczne 

### Przestrzeganie pliku robots.txt 

Plik robots.txt definiuje reguły dostępu dla robotów: 

```python 
from urllib.robotparser import RobotFileParser 
from urllib.parse import urlparse 

def is_allowed(url, user_agent="WhytCardBot/1.0"): 
"""Sprawdza, czy adres URL można zeskrobać zgodnie z plikiem robots.txt.""" 
rp = RobotFileParser() 
rp.set_url(f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt") 
rp.read() 
return rp.can_fetch(user_agent, url) 
``` 

### Prawidłowa identyfikacja 

Zawsze używaj User-Agent, który wyraźnie identyfikuje Twojego bota: 

```python 
headers = { 
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot; bot@whytcard.com)', 
# Inne nagłówki... 
} 
``` 

### Opóźnienia żądań 

Wdrażaj rozsądne opóźnienia między żądaniami: 

```python 
import time 
import random 

def polite_request(url, session, min_delay=1, max_delay=3): 
"""Wykonuje żądanie z uprzejmym opóźnieniem między żądaniami.""" 
# Czekaj na losowe opóźnienie 
delay = random.uniform(min_delay, max_delay) 
time.sleep(delay) 

# Wykonaj żądanie 
response = session.get(url, headers=headers) 
return response 
``` 

### Obsługa błędów 

Szanuj kody błędów HTTP i odpowiednio dostosuj swoje zachowanie: 

```python 
async def respectful_fetch(url, session): 
"""Pobiera adres URL w sposób szanujący.""" 
try: 
async with session.get(url, headers=headers) as response: 
if response.status == 200: 
return await response.text() 
elif response.status == 429: # Zbyt wiele żądań 
# Poczekaj dłużej przed ponowieniem próby 
wait_time = int(response.headers.get('Retry-After', 60)) 
logger.info(f"Rate limited, waiting {wait_time} sekund") 
await asyncio.sleep(wait_time) 
return await respectful_fetch(url, session) 
elif response.status in (403, 404): 
# Nie ponawiaj błędów 403/404 
logger.warning(f"Dostęp zabroniony lub nie znaleziono: {url}") 
return None 
else: 
# Poczekaj i ponów próbę w przypadku innych błędów 
logger.warning(f"Błąd {response.status} dla {url}, ponawianie próby za 5s") 
await asyncio.sleep(5) 
return await respectful_fetch(url, session) 
except Exception as e: 
logger.error(f"Wyjątek podczas pobierania {url}: {str(e)}") 
return None 
``` 

## Szanowanie zasobów 

### Stawka Ograniczanie

Dostosuj częstotliwość żądań do rozmiaru i zasobów witryny docelowej:

- **Duże witryny komercyjne**: 1 żądanie co 1-3 sekundy
- **Witryny średniej wielkości**: 1 żądanie co 3-10 sekund
- **Małe witryny**: 1 żądanie co 10-60 sekund lub więcej

### Okresy scrapowania

Preferuj okresy o niskim ruchu w przypadku intensywnych operacji:

- **Godziny poza szczytem**: Preferuj noce lub weekendy
- **Unikaj szczytów**: Nie scrapuj w znanych okresach szczytowych
- **Bądź elastyczny**: Zmniejsz częstotliwość, jeśli wykryjesz spowolnienia

### Minimalizacja wpływu

Techniki zmniejszania wpływu na serwery docelowe:

1. **Inteligentne buforowanie**: Nie pobieraj tej samej strony wiele razy

2. **Selektywność**: Pobieraj tylko strony, których faktycznie potrzebujesz

3. **Kompresja**: Poproś o skompresowane odpowiedzi, aby zmniejszyć przepustowość 
4. **Efektywna paginacja**: Przestrzegaj struktury paginacji witryny 

## Ochrona danych osobowych 

### Identyfikacja danych osobowych 

Zachowaj czujność w kwestii typów zbieranych danych: 

- **Bezpośrednie dane identyfikacyjne**: Nazwy, adresy e-mail, telefony, adresy 
- **Pośrednie dane identyfikacyjne**: Identyfikatory użytkowników, pseudonimy 
- **Dane wrażliwe**: Poglądy polityczne, stan zdrowia, orientacja seksualna 

### Zasady RODO, których należy przestrzegać 

Jeśli działasz w Europie lub zbierasz dane od Europejczyków: 

1. **Minimalizacja**: Zbieraj tylko ściśle niezbędne dane 
2. **Cel**: Używaj danych tylko do zamierzonych celów 
3. **Ograniczone przechowywanie**: Usuń dane, gdy nie są już potrzebne 
4. **Bezpieczeństwo**: Chroń zebrane dane przed nieautoryzowanym dostępem 

### Anonimizacja danych 

Techniki anonimizuj dane osobowe: 

```python 
import hashlib 
import re 

def anonymize_email(email): 
"""Anonimizuje adres e-mail.""" 
if not email: 
return None 

# Zahaszuj adres e-mail 
hashlib.sha256(email.encode()).hexdigest()[:10] 
domain = email.split('@')[-1] 

return f"anon_{hashed}@{domain}" 

def anonymize_phone(phone): 
"""Anonimizuje numer telefonu.""" 
if not phone: 
return None 

# Zachowaj tylko cyfry 
digits = re.sub(r'\D', '', phone) 

# Zamaskuj wszystkie cyfry oprócz ostatnich 2 
if len(digits) > 2: 
return „X” * (len(cyfry) - 2) + cyfry[-2:] 
return „X” * len(cyfry) 
``` 

## Dokumentacja i przejrzystość 

### Dokumentowanie działań scrapingowych 

Zawsze dokumentuj swoje działania scrapingowe: 

- **Cel**: Dlaczego te dane są zbierane? 
- **Metoda**: W jaki sposób są zbierane? 
- **Przechowywanie**: Gdzie i jak są przechowywane? 
- **Użycie**: W jaki sposób będą wykorzystywane? 
- **Usunięcie**: Kiedy zostaną usunięte? 

### Kontakt i rezygnacja 

Zawsze zapewnij sposób na skontaktowanie się z Tobą: 

1. **Strona informacyjna**: Utwórz dedykowaną stronę wyjaśniającą działanie Twojego bota (np. whytcard.com/bot) 
2. **Adres e-mail kontaktowy**: Podaj adres e-mail w User-Agent 
3. **Mechanizm rezygnacji**: Zezwól witrynom na żądanie wykluczenia 

### Rejestrowanie aktywności 

Prowadź szczegółowe dzienniki swoich działań scrapowania: 

```python 
import logging 
from datetime import datetime 

# Konfiguracja rejestratora 
logging.basicConfig( 
filename=f"scraping_log_{datetime.now().strftime('%Y%m%d')}.log", 
level=logging.INFO, 
format='%(asctime)s - %(levelname)s - %(message)s' 
) 

def log_scraping_activity(url, success, data_points=0): 
"""Rejestruje aktywność scrapowania.""" 
logging.info(f"URL: {url}, Success: {success}, Data points: {data_points}") 
``` 

## Przypadki szczególne 

### API kontra scrapowanie 

Kolejność priorytetów w zbieraniu danych: 

1. **Oficjalne API**: Zawsze priorytetyzuj oficjalne API, jeśli istnieją 
2. **Publiczne kanały danych**: Używaj kanałów RSS, XML lub JSON, jeśli są dostępne 
3. **Scraping**: Używaj scrapowania tylko w ostateczności 

### Witryny z uwierzytelnianiem 

W przypadku witryn wymagających uwierzytelniania: 

- **Wyraźne upoważnienie**: Uzyskaj pisemne upoważnienie od witryny 
- **Przestrzeganie Warunków korzystania z usługi**: Upewnij się, że Warunki korzystania z usługi zezwalają na automatyczne korzystanie 
- **Ograniczenia**: Ściśle przestrzegaj ograniczeń użytkowania 

### Dynamiczna zawartość (JavaScript) 

Dla witryn korzystających z dużej ilości JavaScript: 

```python 
from playwright.async_api import async_playwright 

async def scrape_dynamic_content(url): 
"""Scrape content generated by JavaScript.""" 
async with async_playwright() as p: 
browser = await p.chromium.launch(headless=True) 
page = await browser.new_page() 

# Konfigurowanie User-Agent 
await page.set_extra_http_headers({ 
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot)' 
}) 

# Załaduj stronę i poczekaj, aż sieć będzie bezczynna 
await page.goto(url) 
await page.wait_for_load_state('networkidle') 

# Wyodrębnij zawartość 
content = await page.content() 

await browser.close() 
return content 
``` 

## Lista kontrolna etycznego scrapowania 

Przed każdym projektem scrapowania sprawdź następujące punkty: 

### Przygotowanie 
- [ ] Sprawdź Warunki korzystania z usługi witryny docelowej 
- [ ] Sprawdź plik robots.txt 
- [ ] Wyszukaj API lub alternatywy dla scrapowania 
- [ ] Jasna definicja niezbędnych danych 
- [ ] Dokumentacja celu scrapowania 

### Konfiguracja techniczna 
- [ ] Identyfikowalny i przejrzysty User-Agent 
- [ ] Mechanizm ograniczania szybkości 
- [ ] System pamięci podręcznej w celu uniknięcia zbędnych żądań 
- [ ] Odpowiednia obsługa błędów i kodów HTTP 
- [ ] Rejestrowanie aktywności 

### Wykonanie 
- [ ] Monitorowanie wydajności witryny docelowej
- [ ] Dynamiczna regulacja szybkości w razie potrzeby
- [ ] Poszanowanie wskazań serwera (429, Ponów próbę po)
- [ ] Natychmiastowe zatrzymanie w przypadku wykrycia problemu

### Post-processing
- [ ] Anonimizacja danych osobowych
- [ ] Bezpieczne przechowywanie danych
- [ ] Ograniczone czasowo przechowywanie
- [ ] Dokumentacja zebranych danych

## Wnioski

Etyczne scrapowanie to równowaga między dostępem do danych a poszanowaniem praw i zasobów właścicieli witryn. Przestrzegając tych zasad i praktyk, projekt WhytCard może zbierać niezbędne dane, zachowując jednocześnie odpowiedzialne i pełne szacunku podejście.

Pamiętaj, że etyka scrapowania to nie tylko kwestia zgodności z prawem, ale także odpowiedzialności wobec ekosystemu sieciowego jako całości. Szanujące scrapowanie przyczynia się do bardziej otwartej i zrównoważonej sieci dla wszystkich.

--- 

Ostatnia aktualizacja: 2025-01-15