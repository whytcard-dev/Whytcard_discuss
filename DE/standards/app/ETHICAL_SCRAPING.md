# Leitfaden für ethisches Scraping für WhytCard

## Einleitung

Web Scraping ist der Kern des WhytCard-Projekts, muss jedoch ethisch, verantwortungsvoll und legal durchgeführt werden. Dieser Leitfaden definiert die Grundsätze und Praktiken, um sicherzustellen, dass alle Scraping-Aktivitäten die Rechte der Website-Inhaber, geltende Gesetze und ethische Standards respektieren.

## Inhaltsverzeichnis

1. [Grundprinzipien](#fundamental-principles)
2. [Rechtliche Aspekte](#legal-aspects)
3. [Technische Best Practices](#technical-best-practices)
4. [Ressourcenschutz](#resource-respect)
5. [Schutz personenbezogener Daten](#personal-data-protection)
6. [Dokumentation und Transparenz](#documentation-and-transparency)
7. [Sonderfälle](#special-cases)
8. [Checkliste für ethisches Scraping](#ethical-scraping-checklist)

## Grundprinzipien

### Philosophie des ethischen Scrapings

Ethisches Scraping basiert auf drei Grundprinzipien:

1. **Respekt**: Respektieren Sie Website-Betreiber, ihre Nutzungsbedingungen und ihre Ressourcen.
2. **Verhältnismäßigkeit**: Nur notwendige Daten mit minimalen Auswirkungen extrahieren
3. **Transparenz**: Transparenz in Bezug auf die Identität des Bots und seine Scraping-Absichten

### WhytCards Werte in Bezug auf Scraping

Als WhytCard-Projekt verpflichten wir uns zu Folgendem:

– Die von uns scrapten Websites niemals schädigen
– Die expliziten und impliziten Regeln von Websites strikt einhalten
– Transparenz in Bezug auf unsere Identität und Ziele
– Verantwortungsvoller Umgang mit Daten im Einklang mit unserer Mission
– Priorisierung offizieller APIs, sofern verfügbar

## Rechtliche Aspekte

### Allgemeiner Rechtsrahmen

Web Scraping unterliegt verschiedenen Rechtsrahmen, die je nach Land unterschiedlich sind:

– **Urheberrecht**: Website-Inhalte sind grundsätzlich urheberrechtlich geschützt
– **Nutzungsbedingungen**: Die Nutzungsbedingungen von Websites können Scraping ausdrücklich verbieten
– **Datenschutz**: Gesetze wie die DSGVO in Europa schützen personenbezogene Daten
– **Unbefugter Zugriff**: In einigen Ländern wird der unbefugte Zugriff auf Computersysteme strafbar gemacht

### Wichtige Hinweise Rechtsprechung

Wichtige Gerichtsentscheidungen zum Thema Scraping:

- **hiQ Labs vs. LinkedIn** (USA): Festgestellt, dass das Scraping öffentlicher Daten nicht zwangsläufig illegal ist.
- **Ryanair vs. PR Aviation** (EU): Bestätigt, dass Nutzungsbedingungen Scraping vertraglich einschränken können.
- **QVC vs. Resultly** (USA): Betont die Wichtigkeit, Server nicht zu überlasten.

### Einhaltung der Gesetze für WhytCard

Um legal zu bleiben:

1. **Überprüfen Sie immer die Nutzungsbedingungen**, bevor Sie eine Website scrapen.
2. **Beachten Sie die Tags "noindex" und "nofollow"** in Meta-Tags.
3. **Umgehen Sie niemals technische Schutzmaßnahmen** (CAPTCHA, Zugriffsbeschränkungen).
4. **Dokumentieren Sie Ihre Vorgehensweise**, um Ihren guten Willen zu demonstrieren.
5. **Konsultieren Sie einen Anwalt**, wenn Sie Zweifel an der Rechtmäßigkeit eines Scraping-Vorgangs haben.

## Technische Best Practices

### Einhaltung der robots.txt-Datei

Die robots.txt-Datei definiert Zugriffsregeln für Roboter:

```python
from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse

def is_allowed(url, user_agent="WhytCardBot/1.0"):
"""Prüft, ob die URL gemäß robots.txt gescraped werden kann."""
rp = RobotFileParser()
rp.set_url(f"{urlparse(url).scheme}://{urlparse(url).netloc}/robots.txt")
rp.read()
return rp.can_fetch(user_agent, url)
```

### Korrekte Identifizierung

Verwenden Sie immer einen User-Agent, der Ihren Bot eindeutig identifiziert:

```python
headers = {
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot; bot@whytcard.com)', 
# Andere Header... 
} 
``` 

### Anfrageverzögerungen 

Implementieren Sie angemessene Verzögerungen zwischen Anfragen: 

```python 
import time 
import random 

def polite_request(url, session, min_delay=1, max_delay=3): 
"""Stellt eine Anfrage mit einer angemessenen Verzögerung zwischen den Anfragen.""" 
# Warten Sie auf eine zufällige Verzögerung 
delay = random.uniform(min_delay, max_delay) 
time.sleep(delay) 

# Stellen Sie die Anfrage 
response = session.get(url, headers=headers) 
return response 
``` 

### Fehlerbehandlung 

Beachten Sie HTTP-Fehlercodes und passen Sie Ihr Verhalten an Entsprechend:

```python
async def respectful_fetch(url, session):
""Ruft eine URL respektvoll ab."""

Versuch:
async mit session.get(url, headers=headers) als Antwort:
if response.status == 200:

return await response.text()
elif response.status == 429: # Zu viele Anfragen
# Länger warten vor erneutem Versuch
wait_time = int(response.headers.get('Retry-After', 60))
logger.info(f"Rate begrenzt, warte {wait_time} Sekunden")
await asyncio.sleep(wait_time)
return await respectful_fetch(url, session)
elif response.status in (403, 404):
# 403/404-Fehler nicht wiederholen
logger.warning(f"Zugriff verweigert oder nicht gefunden: {url}")
return None
else:
# Warten und erneut versuchen, falls andere Fehler auftreten
logger.warning(f"Fehler {response.status} für {url}, Wiederholung in 5 Sekunden")
await asyncio.sleep(5)
return await respectful_fetch(url, session)
except Exception as e:
logger.error(f"Ausnahme beim Abrufen von {url}: {str(e)}")
return None
```

## Ressourcenschonung

### Ratenbegrenzung

Passen Sie Ihre Anfragerate an die Größe und Ressourcen der Zielwebsite an:

- **Große kommerzielle Websites**: 1 Anfrage alle 1–3 Sekunden
- **Mittelgroße Websites**: 1 Anfrage alle 3–10 Sekunden
- **Kleine Websites**: 1 Anfrage alle 10–60 Sekunden Sekunden oder länger

### Scraping-Zeiträume

Bevorzugen Sie Zeiten mit geringem Datenverkehr für intensive Vorgänge:

- **Nebenzeiten**: Nachts oder am Wochenende bevorzugen
- **Spitzenzeiten vermeiden**: Scrapen Sie nicht während bekannter Spitzenzeiten
- **Anpassung**: Reduzieren Sie Ihre Rate, wenn Sie Verlangsamungen feststellen

### Minimierung der Auswirkungen

Techniken zur Reduzierung der Auswirkungen auf Zielserver:

1. **Intelligentes Caching**: Rufen Sie dieselbe Seite nicht mehrmals ab
2. **Selektivität**: Rufen Sie nur die Seiten ab, die Sie tatsächlich benötigen
3. **Komprimierung**: Fordern Sie komprimierte Antworten an, um die Bandbreite zu reduzieren
4. **Effiziente Paginierung**: Beachten Sie die Paginierungsstruktur der Website

## Schutz personenbezogener Daten

### Identifizierung personenbezogener Daten

Seien Sie vorsichtig bei der Erfassung von Daten:

- **Direkte Identifikationsdaten**: Namen, E-Mail-Adressen, Telefonnummern, Adressen
- **Indirekte Identifikationsdaten**: Benutzer IDs, Pseudonyme
- **Sensible Daten**: Politische Meinungen, Gesundheit, sexuelle Orientierung

### DSGVO-Grundsätze

Wenn Sie in Europa tätig sind oder Daten von Europäern erheben:

1. **Minimierung**: Nur unbedingt notwendige Daten erheben
2. **Zweck**: Daten nur für die vorgesehenen Zwecke verwenden
3. **Begrenzte Aufbewahrung**: Daten löschen, wenn sie nicht mehr benötigt werden
4. **Sicherheit**: Erfasste Daten vor unbefugtem Zugriff schützen

### Datenanonymisierung

Techniken zur Anonymisierung personenbezogener Daten:

```python
import hashlib
import re

def anonymize_email(email):
"""Anonymisiert eine E-Mail-Adresse."""
if not email:
return None

# Hash der E-Mail-Adresse
hashed = hashlib.sha256(email.encode()).hexdigest()[:10]
domain = email.split('@')[-1] 

return f"anon_{hashed}@{domain}" 

def anonymize_phone(phone): 
"""Anonymisiert eine Telefonnummer.""" 
if not phone: 
return None 

# Nur Ziffern behalten 
digits = re.sub(r'\D', '', phone) 

# Alle Ziffern außer den letzten beiden maskieren 
if len(digits) > 2: 
return "X" * (len(digits) - 2) + digits[-2:] 
return "X" * len(digits) 
``` 

## Dokumentation und Transparenz 

### Scraping-Aktivitäten dokumentieren 

Dokumentieren Sie Ihre Scraping-Aktivitäten stets: 

- **Zweck**: Warum werden diese Daten erhoben? 
- **Methode**: Wie werden sie erhoben? 
- **Speicherung**: Wo und wie werden die Daten gespeichert?
- **Verwendung**: Wie werden sie verwendet?
- **Löschung**: Wann werden sie gelöscht?

### Kontakt und Opt-out

Stellen Sie immer eine Kontaktmöglichkeit zur Verfügung:

1. **Informationsseite**: Erstellen Sie eine eigene Seite, die Ihren Bot erklärt (z. B. whytcard.com/bot).
2. **Kontakt-E-Mail**: Geben Sie eine E-Mail-Adresse in Ihrem User-Agent an.
3. **Opt-out-Mechanismus**: Erlauben Sie Websites, einen Ausschluss zu beantragen.

### Aktivitätsprotokollierung

Führen Sie detaillierte Protokolle Ihrer Scraping-Aktivitäten:

```python
import logging
from datetime import datetime

# Logger-Konfiguration
logging.basicConfig(
filename=f"scraping_log_{datetime.now().strftime('%Y%m%d')}.log",
level=logging.INFO
format='%(asctime)s - %(levelname)s - %(message)s'
)
def log_scraping_activity(url, success, data_points=0): 
""Protokolliert eine Scraping-Aktivität.""" 
logging.info(f"URL: {url}, Erfolg: {success}, Datenpunkte: {data_points}") 
``` 

## Sonderfälle 

### API vs. Scraping 

Prioritätsreihenfolge der Datenerfassung: 

1. **Offizielle APIs**: Offizielle APIs immer priorisieren, sofern vorhanden. 
2. **Öffentliche Datenfeeds**: RSS-, XML- oder JSON-Feeds verwenden, falls verfügbar. 
3. **Scraping**: Scraping nur als letztes Mittel einsetzen. 

### Websites mit Authentifizierung 

Für Websites, die eine Authentifizierung erfordern: 

- **Explizite Autorisierung**: Schriftliche Autorisierung der Website einholen. 
- **Einhaltung der Nutzungsbedingungen**: Sicherstellen, dass die Nutzungsbedingungen die automatisierte Nutzung zulassen. 
- **Einschränkungen**: Nutzungsbeschränkungen strikt einhalten. 

### Dynamische Inhalte (JavaScript) 

Für Websites, die viele JavaScript:

```python
from playwright.async_api import async_playwright

async def scrape_dynamic_content(url):
""Von JavaScript generierten Inhalt scrapen."""
async with async_playwright() as p:
browser = await p.chromium.launch(headless=True)
seite = await browser.new_page()

# User-Agent konfigurieren
await page.set_extra_http_headers({
'User-Agent': 'WhytCardBot/1.0 (+https://whytcard.com/bot)'
})

# Seite laden und warten, bis das Netzwerk frei ist

await page.goto(url)

await page.wait_for_load_state('networkidle')

# Inhalt extrahieren
inhalt = await page.content()

await browser.close() 
return content 
``` 

## Checkliste für ethisches Scraping

Überprüfen Sie vor jedem Scraping-Projekt die folgenden Punkte:

### Vorbereitung
- [ ] Nutzungsbedingungen der Zielseite prüfen
- [ ] robots.txt-Datei prüfen
- [ ] API oder Alternativen zum Scraping suchen
- [ ] Klare Definition der benötigten Daten
- [ ] Dokumentation des Scraping-Zwecks

### Technische Konfiguration
- [ ] Identifizierbarer und transparenter User-Agent
- [ ] Ratenbegrenzungsmechanismus
- [ ] Cache-System zur Vermeidung redundanter Anfragen
- [ ] Angemessene Behandlung von Fehlern und HTTP-Codes
- [ ] Aktivitätsprotokollierung

### Ausführung
- [ ] Überwachung der Performance der Zielseite
- [ ] Dynamische Ratenanpassung falls erforderlich
- [ ] Beachtung von Server-Hinweisen (429, Retry-After)
- [ ] Sofortiger Stopp Wenn ein Problem erkannt wird

### Nachbearbeitung
- [ ] Anonymisierung personenbezogener Daten
- [ ] Sichere Datenspeicherung
- [ ] Zeitlich begrenzte Aufbewahrung
- [ ] Dokumentation der erfassten Daten

## Fazit

Ethisches Scraping erfordert ein Gleichgewicht zwischen Datenzugriff und Respekt für die Rechte und Ressourcen von Website-Betreibern. Durch die Einhaltung dieser Grundsätze und Praktiken kann das WhytCard-Projekt notwendige Daten erfassen und gleichzeitig verantwortungsvoll und respektvoll vorgehen.

Bedenken Sie, dass ethisches Scraping nicht nur eine Frage der Rechtskonformität ist, sondern auch der Verantwortung gegenüber dem gesamten Web-Ökosystem. Respektvolles Scraping trägt zu einem offeneren und nachhaltigeren Web für alle bei.

---

Letzte Aktualisierung: 15.01.2025