# Ethische scrapinggids voor WhytCard

## Inleiding

Webscraping vormt de kern van het WhytCard-project, maar moet op een ethische, verantwoorde en legale manier worden uitgevoerd. Deze gids definieert de principes en procedures die moeten worden gevolgd om ervoor te zorgen dat alle scrapingactiviteiten de rechten van website-eigenaren, de toepasselijke wetgeving en ethische normen respecteren.

## Inhoudsopgave

1. [Fundamentele principes](#fundamentele-principes)
2. [Juridische aspecten](#juridische-aspecten)
3. [Technische best practices](#technische-best practices)
4. [Respect voor bronnen](#respect voor bronnen)
5. [Bescherming van persoonsgegevens](#bescherming-van-persoonsgegevens)
6. [Documentatie en transparantie](#documentatie-en-transparantie)
7. [Speciale gevallen](#speciale-gevallen)
8. [Checklist voor ethisch scrapen](#checklist-ethisch-scraping)

## Fundamentele principes

### Filosofie van ethisch scrapen

Ethisch scrapen is gebaseerd op drie fundamentele principes:

1. **Respect**: Respecteer website-eigenaren, hun gebruiksvoorwaarden en hun bronnen.
2. **Proportionaliteit**: Alleen noodzakelijke gegevens extraheren met minimale impact
3. **Transparantie**: Transparant zijn over de identiteit en scrapintenties van de bot

### WhytCard's waarden met betrekking tot scraping

Als WhytCard-project verbinden we ons ertoe om:

- Nooit schade toe te brengen aan de websites die we scrapen
- De expliciete en impliciete regels van websites strikt te respecteren
- Transparant zijn over onze identiteit en doelstellingen
- Gegevens verantwoord en in overeenstemming met onze missie te gebruiken
- Officiële API's prioriteit te geven indien beschikbaar

## Juridische aspecten

### Algemeen juridisch kader

Webscraping is onderworpen aan verschillende juridische kaders die per land verschillen:

- **Auteursrecht**: Website-inhoud is over het algemeen auteursrechtelijk beschermd
- **Gebruiksvoorwaarden**: De algemene voorwaarden van de website kunnen scraping expliciet verbieden
- **Gegevensbescherming**: Wetten zoals de AVG in Europa beschermen persoonsgegevens
- **Ongeautoriseerde toegang**: In sommige rechtsgebieden is ongeautoriseerde toegang tot computers strafbaar systemen

### Belangrijke jurisprudentie

Enkele belangrijke rechterlijke uitspraken met betrekking tot scraping:

- **hiQ Labs v. LinkedIn** (VS): Vastgesteld dat het scrapen van openbare gegevens niet per se illegaal is.
- **Ryanair v. PR Aviation** (EU): Bevestigd dat gebruiksvoorwaarden scraping contractueel kunnen beperken.
- **QVC v. Resultly** (VS): Benadrukt het belang van het niet overbelasten van servers.

### Wettelijke naleving voor WhytCard

Om legaal te blijven:

1. **Controleer altijd de gebruiksvoorwaarden** voordat u een site scrapt.
2. **Respecteer de tags "noindex" en "nofollow"** in metatags.
3. **Omzeil nooit technische beschermingsmaatregelen** (CAPTCHA, toegangsbeperkingen)
4. **Documenteer uw werkwijze** om te goeder trouw aan te tonen.
5. **Raadpleeg een advocaat** bij twijfel over de rechtmatigheid van een scrapingoperatie.

## Technische best practices

### Robots.txt respecteren

De Het robots.txt-bestand definieert de toegangsregels voor robots:

```python
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse

def is_allowed(url, user_agent="WhytCardBot/1.0"):

"""Controleert of de URL kan worden gescraped volgens robots.txt."""
rp = RobotFileParser()
rp.set_url(f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt")
rp.read()
return rp.can_fetch(user_agent, url)
```

### Juiste identificatie

Gebruik altijd een user-agent die je bot duidelijk identificeert:

```python
headers = {
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot; bot@whytcard.com)',

# Andere headers... 
} 
``` 

### Verzoekvertragingen

Implementeer redelijke vertragingen tussen verzoeken:

```python 
import time 
import random 

def rude_request(url, session, min_delay=1, max_delay=3):
"""Maakt een verzoek met een beleefde vertraging tussen verzoeken.""" 
# Wacht op een willekeurige vertraging
delay = random.uniform(min_delay, max_delay)
time.sleep(delay)

# Maak het verzoek aan
response = session.get(url, headers=headers)
return response 
``` 

### Foutafhandeling

Respecteer HTTP-foutcodes en pas je gedrag aan dienovereenkomstig:

```python
async def respectful_fetch(url, session):
"""Haal een URL op een respectvolle manier op."""
try:

async met session.get(url, headers=headers) als respons:

if response.status == 200:
return wait response.text()
elif response.status == 429: # Te veel verzoeken
# Wacht langer voordat u opnieuw probeert
wait_time = int(response.headers.get('Retry-After', 60))
logger.info(f"Rate limited, waiting {wait_time} seconds")
wait asyncio.sleep(wait_time)
return wait respectful_fetch(url, session)
elif response.status in (403, 404):

# 403/404-fouten niet opnieuw proberen
logger.warning(f"Toegang geweigerd of niet gevonden: {url}")
return None
else:
# Wacht en probeer opnieuw voor andere fouten
logger.warning(f"Fout {response.status} voor {url}, opnieuw proberen over 5 seconden")
wait asyncio.sleep(5)
return wait respectful_fetch(url, session)
except Exception as e:
logger.error(f"Uitzondering tijdens het ophalen van {url}: {str(e)}")
return None
```

## Resource Respect

### Snelheidsbeperking

Pas uw verzoeksnelheid aan de grootte en resources van de doelsite aan:

- **Grote commerciële sites**: 1 verzoek elke 1-3 seconden
- **Middelgrote sites**: 1 verzoek elke 3-10 seconden
- **Kleine sites**: 1 verzoek elke 10-60 seconden of meer

### Scrapingperiodes

Geef de voorkeur aan periodes met weinig verkeer voor intensieve bewerkingen:

- **Daluren**: Geef de voorkeur aan nachten of weekenden
- **Vermijd pieken**: Scrap niet tijdens bekende piekperiodes
- **Wees adaptief**: Verlaag uw tarief als u vertragingen detecteert

### Impactminimalisatie

Technieken om de impact op doelservers te verminderen:

1. **Slimme caching**: Haal dezelfde pagina niet meerdere keren op
2. **Selectiviteit**: Haal alleen pagina's op die u daadwerkelijk nodig hebt
3. **Compressie**: Vraag gecomprimeerde antwoorden aan om de bandbreedte te verminderen
4. **Efficiënte paginering**: Respecteer de pagineringstructuur van de site

## Bescherming van persoonsgegevens

### Identificerende persoonsgegevens

Wees waakzaam met de soorten gegevens die u verzamelt:

- **Directe identificatiegegevens**: Namen, e-mailadressen, telefoonnummers, adressen
- **Indirecte identificatiegegevens**: Gebruikers-ID's, Pseudoniemen
- **Gevoelige gegevens**: Politieke opvattingen, gezondheid, seksuele geaardheid

### AVG-principes om te respecteren

Als u in Europa actief bent of gegevens van Europeanen verzamelt:

1. **Minimalisatie**: Verzamel alleen strikt noodzakelijke gegevens
2. **Doel**: Gebruik gegevens alleen voor de beoogde doeleinden
3. **Beperkte bewaartermijn**: Verwijder gegevens wanneer deze niet langer nodig zijn
4. **Beveiliging**: Bescherm verzamelde gegevens tegen ongeautoriseerde toegang

### Gegevensanonimisering

Technieken om persoonsgegevens te anonimiseren:

```python
import hashlib
import re

def anonymize_email(email):

""Anonimiseert een e-mailadres."""
if not email:
return None

# Hash het e-mailadres
hashed = hashlib.sha256(email.encode()).hexdigest()[:10]
domain = email.split('@')[-1] 

return f"anon_{hashed}@{domein}" 

def anonymize_phone(telefoon): 
"""Anonimiseert een telefoonnummer.""" 
if not phone: 
return None 

# Behoud alleen cijfers 
digits = re.sub(r'\D', '', telefoon) 

# Maskeer alle cijfers behalve de laatste 2 
if len(cijfers) > 2: 
return "X" * (len(cijfers) - 2) + digits[-2:] 
return "X" * len(cijfers) 
``` 

## Documentatie en transparantie 

### Scrapingactiviteiten documenteren 

Documenteer uw scrapingactiviteiten altijd: 

- **Doel**: Waarom worden deze gegevens verzameld? 
- **Methode**: Hoe worden ze verzameld? 
- **Opslag**: Waar en hoe wordt het opgeslagen?

- **Gebruik**: Hoe wordt het gebruikt?
- **Verwijdering**: Wanneer wordt het verwijderd?

### Contact en afmelden

Bied altijd een manier om contact met u op te nemen:

1. **Informatiepagina**: Maak een speciale pagina met uitleg over uw bot (bijv. whytcard.com/bot)
2. **Contact e-mailadres**: Geef een e-mailadres op in uw user-agent
3. **Afmeldmechanisme**: Sta sites toe om uitsluiting aan te vragen

### Activiteitenregistratie

Houd gedetailleerde logboeken bij van uw scrapactiviteiten:

```python
import logging
from datetime import datetime

# Loggerconfiguratie
logging.basicConfig( 
filename=f"scraping_log_{datetime.now().strftime('%Y%m%d')}.log", 
level=logging.INFO, 
format='%(asctime)s - %(levelname)s - %(message)s' 
)

def log_scraping_activity(url, success, data_points=0):
"""Logt een scrapingactiviteit."""
logging.info(f"URL: {url}, Succes: {success}, Datapunten: {data_points}")
```

## Speciale gevallen

### API vs scraping

Prioriteitsvolgorde voor gegevensverzameling:

1. **Officiële API's**: Geef altijd prioriteit aan officiële API's wanneer deze beschikbaar zijn.
2. **Openbare datafeeds**: Gebruik RSS-, XML- of JSON-feeds indien beschikbaar.
3. **Scraping**: Gebruik scraping alleen als laatste redmiddel.

### Sites met authenticatie

Voor sites die authenticatie vereisen:

- **Expliciete autorisatie**: Verkrijg schriftelijke toestemming van de site.
- **Respect voor gebruiksvoorwaarden**: Zorg ervoor dat de gebruiksvoorwaarden geautomatiseerd gebruik toestaan.
- **Beperkingen**: Respecteer strikt de gebruiksbeperkingen.

### Dynamische inhoud (JavaScript)

Voor sites die veel JavaScript gebruiken:

```python
from playwright.async_api import async_playwright

async def scrape_dynamic_content(url):
"""Schraap inhoud gegenereerd door JavaScript."""
async met async_playwright() als p:

browser = wait p.chromium.launch(headless=True)
page = wait browser.new_page()

# Configureer User-Agent
wait page.set_extra_http_headers({ 
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot)'
})

# Laad de pagina en wacht tot het netwerk inactief is
wait page.goto(url)
wait page.wait_for_load_state('networkidle')

# Inhoud extraheren
content = wait page.content()

wait browser.close()
return content
```

## Checklist voor ethisch scrapen

Controleer vóór elk scrapproject de volgende punten:

### Voorbereiding
- [ ] Controleer de gebruiksvoorwaarden van de doelsite
- [ ] Controleer het robots.txt-bestand
- [ ] Zoek naar API of alternatieven voor scrapen
- [ ] Duidelijke definitie van de benodigde gegevens
- [ ] Documentatie van het scrapdoel

### Technische configuratie
- [ ] Identificeerbare en transparante user-agent
- [ ] Snelheidsbeperkend mechanisme
- [ ] Cachesysteem om redundante verzoeken te voorkomen
- [ ] Correcte afhandeling van fouten en HTTP-codes
- [ ] Activiteitenregistratie

### Uitvoering
- [ ] Monitoring van de prestaties van de doelsite
- [ ] Dynamische snelheidsaanpassing indien nodig
- [ ] Respect voor serverindicaties (429, Opnieuw proberen-na)
- [ ] Onmiddellijke stopzetting bij detectie van een probleem

### Nabewerking
- [ ] Anonimisering van persoonsgegevens
- [ ] Veilige gegevensopslag
- [ ] Tijdsgebonden bewaring
- [ ] Documentatie van verzamelde gegevens

## Conclusie

Ethisch scrapen is een evenwicht tussen gegevenstoegang en het respecteren van de rechten en middelen van website-eigenaren. Door deze principes en werkwijzen te volgen, kan het WhytCard-project de benodigde gegevens verzamelen en tegelijkertijd een verantwoordelijke en respectvolle aanpak hanteren.

Onthoud dat ethiek bij scrapen niet alleen een kwestie is van naleving van de wet, maar ook van verantwoordelijkheid ten opzichte van het webecosysteem als geheel. Respectvol scrapen draagt bij aan een opener en duurzamer web voor iedereen.

--- 

Laatst bijgewerkt: 2025-01-15