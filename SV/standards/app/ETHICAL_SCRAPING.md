# Etisk skrapningsguide för WhytCard

## Introduktion

Webbskrapning är kärnan i WhytCard-projektet, men det måste utföras på ett etiskt, ansvarsfullt och lagligt sätt. Denna guide definierar de principer och praxis som ska följas för att säkerställa att all skrapning respekterar webbplatsägares rättigheter, tillämpliga lagar och etiska standarder.

## Innehållsförteckning

1. [Grundläggande principer](#fundamental-principles) 
2. [Juridiska aspekter](#legal-aspects) 
3. [Tekniska bästa praxis](#technical-best-practices) 
4. [Resursrespekt](#resource-respect) 
5. [Skydd av personuppgifter](#personal-data-protection) 
6. [Dokumentation och transparens](#documentation-and-transparency) 
7. [Särskilda fall](#special-cases) 
8. [Checklista för etisk skrapning](#ethical-scraping-checklista) 

## Grundläggande principer

### Etisk skrapningsfilosofi

Etisk skrapning bygger på tre grundläggande principer:

1. **Respekt**: Respektera webbplatsägare, deras användarvillkor och deras resurser
2. **Proportionalitet**: Extrahera endast nödvändig data med minimal påverkan
3. **Transparens**: Var transparent om botens identitet och scraping-avsikter

### WhytCards värderingar gällande scraping

Som WhytCard-projektet åtar vi oss att:

- Aldrig skada de webbplatser vi scrapar
- Strikt respektera webbplatsernas explicita och implicita regler
- Var transparenta om vår identitet och våra mål
- Använda data ansvarsfullt och i enlighet med vårt uppdrag
- Prioritera officiella API:er när de är tillgängliga

## Juridiska aspekter

### Allmän rättslig ram

Webbskrapning omfattas av flera rättsliga ramverk som varierar beroende på land:

- **Upphovsrätt**: Webbplatsinnehåll är generellt skyddat av upphovsrätt
- **Användarvillkor**: Webbplatsens användarvillkor kan uttryckligen förbjuda scraping
- **Dataskydd**: Lagar som GDPR i Europa skyddar personuppgifter
- **Obehörig åtkomst**: Vissa jurisdiktioner kriminaliserar obehörig åtkomst till datorsystem

### Anmärkningsvärd rättspraxis

Några viktiga domstolsbeslut gällande scraping:

- **hiQ Labs v. LinkedIn** (USA): Fastställde att scraping offentlig data är inte nödvändigtvis olagliga
- **Ryanair v. PR Aviation** (EU): Bekräftade att användarvillkoren kan begränsa scraping kontraktuellt
- **QVC v. Resultly** (USA): Betonade vikten av att inte överbelasta servrar

### Juridisk efterlevnad för WhytCard

För att förbli laglig:

1. **Kontrollera alltid användarvillkoren** innan du scrapar en webbplats
2. **Respektera taggarna "noindex" och "nofollow"** i metataggar
3. **Kringgå aldrig tekniska skyddsåtgärder** (CAPTCHA, åtkomstbegränsningar)
4. **Dokumentera dina metoder** för att visa god tro
5. **Konsultera en advokat** om du är osäker på lagligheten av en scraping-operation

## Tekniska bästa praxis

### Respektera robots.txt

Robots.txt-filen definierar åtkomstregler för robotar:

```python
from urllib.robotparser import
RobotFileParser
from urllib.parse import urlparse 

def is_allowed(url, user_agent="WhytCardBot/1.0"): 
"""Kontrollerar om URL:en kan skrapas enligt robots.txt.""" 
rp = RobotFileParser() 
rp.set_url(f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt") 
rp.read() 
return rp.can_fetch(user_agent, url) 
``` 

### Korrekt identifiering 

Använd alltid en användaragent som tydligt identifierar din bot: 

```python 
headers = { 
'Användaragent': 'WhytCardBot/1.0 (+https://whytcard.com/bot; bot@whytcard.com)', 
# Andra rubriker... 
} 
``` 

### Begäran Fördröjningar

Implementera rimliga fördröjningar mellan förfrågningar:

```python
import time
import random

def polite_request(url, session, min_delay=1, max_delay=3):

""Gör en förfrågan med en artig fördröjning mellan förfrågningarna."""

# Vänta på en slumpmässig fördröjning
delay = random.uniform(min_delay, max_delay)
time.sleep(delay)

# Gör förfrågan
response = session.get(url, headers=headers)

return response

```

### Felhantering

Respektera HTTP-felkoder och anpassa ditt beteende därefter:

```python
async def respectful_fetch(url, session):

""Hämtar en URL på ett respektfullt sätt."""
try:
async with session.get(url, headers=headers) as response:
if response.status == 200: 
returnera await response.text() 
elif response.status == 429: # För många förfrågningar 
# Vänta längre innan du försöker igen 
wait_time = int(response.headers.get('Försök igen', 60)) 
logger.info(f"Begränsad hastighet, väntar {wait_time} sekunder") 
await asyncio.sleep(wait_time) 
returnera await respectful_fetch(url, session) 
elif response.status in (403, 404): 
# Försök inte igen vid 403/404-fel 
logger.warning(f"Åtkomst nekad eller hittades inte: {url}") 
returnera Ingen 
annars: 
# Vänta och försök igen för andra fel 
logger.warning(f"Fel {response.status} för {url}, försöker igen om 5 sekunder") 
await asyncio.sleep(5) 
returnera await respectful_fetch(url, session) 
except Exception as e: 
logger.error(f"Undantag vid hämtning av {url}: {str(e)}") 
returnera Ingen 
``` 

## Resursrespekt 

### Hastighetsbegränsning 

Anpassa din förfrågningshastighet till målwebbplatsens storlek och resurser: 

- **Stora kommersiella webbplatser**: 1 förfrågan var 1-3:e sekund 
- **Medelstora webbplatser**: 1 förfrågan var 3-10:e sekund 
- **Små webbplatser**: 1 förfrågan var 10-60:e sekund eller mer 

### Skrapningsperioder 

Föredra perioder med låg trafik för intensiv drift: 

- **Lågtrafik**: Föredra nätter eller helger 
- **Undvik toppar**: Skrapa inte under kända toppperioder 
- **Var anpassningsbar**: Minska din hastighet om du upptäcker avmattningar 

### Minimering av påverkan 

Tekniker för att minska påverkan på mål servrar:

1. **Smart cachning**: Hämta inte samma sida flera gånger
2. **Selektivitet**: Hämta bara sidor du faktiskt behöver
3. **Komprimering**: Begär komprimerade svar för att minska bandbredden
4. **Effektiv paginering**: Respektera webbplatsens pagineringsstruktur

## Skydd av personuppgifter

### Identifiering av personuppgifter

Var uppmärksam på vilka typer av data du samlar in:

- **Direkta identifieringsuppgifter**: Namn, e-postadresser, telefonnummer, adresser
- **Indirekta identifieringsuppgifter**: Användar-ID:n, pseudonymer
- **Känsliga uppgifter**: Politiska åsikter, hälsa, sexuell läggning

### GDPR-principer att respektera

Om du är verksam i Europa eller samlar in data från européer:

1. **Minimering**: Samla endast in absolut nödvändiga uppgifter
2. **Syfte**: Använd endast data för avsedda ändamål
3. **Begränsad lagring**: Radera data när de inte längre behövs
4. **Säkerhet**: Skydda insamlade data mot obehörig åtkomst åtkomst 

### Dataanonymisering 

Tekniker för att anonymisera personuppgifter: 

```python 
import hashlib 
import re 

def anonymize_email(email): 
"""Anonymiserar en e-postadress.""" 
if not email: 
return None 

# Hasha e-postadressen 
hashed = hashlib.sha256(email.encode()).hexdigest()[:10] 
domain = email.split('@')[-1] 

return f"anon_{hashed}@{domain}" 

def anonymize_phone(phone): 
"""Anonymiserar ett telefonnummer.""" 
if not phone: 
return None 

# Behåll endast siffror 
digits = re.sub(r'\D', '', phone) 

# Maskera alla siffror utom de sista 2 
if len(siffror) > 2: 
return "X" * (len(siffror) - 2) + siffror[-2:] 
return "X" * len(siffror) 
``` 

## Dokumentation och transparens 

### Dokumentation av skrapningsaktiviteter 

Dokumentera alltid dina skrapningsaktiviteter: 

- **Syfte**: Varför samlas dessa data in? 
- **Metod**: Hur samlas de in? 
- **Lagring**: Var och hur lagras de? 
- **Användning**: Hur kommer de att användas? 
- **Radering**: När kommer de att raderas? 

### Kontakt och avanmälan

Ange alltid ett sätt att kontakta dig:

1. **Informationssida**: Skapa en dedikerad sida som förklarar din bot (t.ex. whytcard.com/bot)

2. **Kontakt-e-postadress**: Ange en e-postadress i din användaragent

3. **Mekanism för avanmälan**: Tillåt webbplatser att begära exkludering

### Aktivitetsloggning

Håll detaljerade loggar över dina scraping-aktiviteter:

```python
import logging
from datetime
import datetime

# Loggerkonfiguration

logging.basicConfig(
filename=f"scraping_log_{datetime.now().strftime('%Y%m%d')}.log",
level=logging.INFO,
format='%(asctime)s - %(levelname)s - %(message)s'
)

def log_scraping_activity(url, success, data_points=0): 
"""Loggar en skrapningsaktivitet.""" 
logging.info(f"URL: {url}, Framgång: {success}, Datapunkter: {data_points}") 
``` 

## Specialfall 

### API vs Skrapning 

Prioritetsordning för datainsamling: 

1. **Officiella API:er**: Prioritera alltid officiella API:er när de finns 
2. **Offentliga dataflöden**: Använd RSS-, XML- eller JSON-flöden om tillgängliga 
3. **Skrapning**: Använd endast skrapning som en sista utväg 

### Webbplatser med autentisering 

För webbplatser som kräver autentisering: 

- **Explicit auktorisering**: Inhämta skriftlig auktorisering från webbplatsen 
- **Respektera användarvillkoren**: Se till att användarvillkoren tillåter automatiserad användning 
- **Begränsningar**: Respektera användningsbegränsningarna strikt 

### Dynamiskt innehåll (JavaScript) 

För webbplatser som använder mycket JavaScript: 

```python 
från playwright.async_api import async_playwright 

async def scrape_dynamic_content(url): 
"""Skrapa innehåll genererat av JavaScript.""" 
async med async_playwright() som p: 
webbläsare = await p.chromium.launch(headless=True) 
sida = await webbläsare.new_page() 

# Konfigurera användaragent 
await page.set_extra_http_headers({ 
'Användaragent': 'WhytCardBot/1.0 (+https://whytcard.com/bot)' 
}) 

# Ladda sidan och vänta tills nätverket är inaktivt 
await page.goto(url) 
await page.wait_for_load_state('networkidle') 

# Extrahera innehåll 
content = await page.content() 

await webbläsare.close() 
returnera innehåll 
``` 

## Checklista för etisk skrapning 

Kontrollera följande punkter före varje skrapningsprojekt: 

### Förberedelse 
- [ ] Kontrollera målwebbplatsens användarvillkor 
- [ ] Kontrollera robots.txt-filen 
- [ ] Sök efter API eller alternativ till skrapning 
- [ ] Tydlig definition av nödvändiga data 
- [ ] Dokumentation av skrapningsändamålet 

### Teknisk konfiguration 
- [ ] Identifierbar och transparent användaragent 
- [ ] Hastighetsbegränsningsmekanism 
- [ ] Cachesystem för att undvika redundanta förfrågningar 
- [ ] Lämplig hantering av fel och HTTP-koder 
- [ ] Aktivitetsloggning 

### Utförande 
- [ ] Övervakning av målwebbplatsens prestanda 
- [ ] Dynamisk hastighetsjustering vid behov 
- [ ] Respekt för serverindikationer (429, Återförsök efter) 
- [ ] Omedelbart stopp om ett problem upptäcks 

### Efterbehandling 
- [ ] Anonymisering av personuppgifter
- [ ] Säker datalagring
- [ ] Tidsbegränsad lagring
- [ ] Dokumentation av insamlad data

## Slutsats

Etisk scraping är en balans mellan dataåtkomst och respekt för webbplatsägares rättigheter och resurser. Genom att följa dessa principer och praxis kan WhytCard-projektet samla in nödvändig data samtidigt som man upprätthåller ett ansvarsfullt och respektfullt tillvägagångssätt.

Kom ihåg att scraping-etik inte bara handlar om lagefterlevnad, utan också om ansvar gentemot webbekosystemet som helhet. Respektfull scraping bidrar till en mer öppen och hållbar webb för alla.

--- 

Senast uppdaterad: 2025-01-15