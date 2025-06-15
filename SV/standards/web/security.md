# Webbsäkerhetsstandarder

## Kärnsäkerhetsprinciper

- Djupgående försvar (flera säkerhetslager)

- Principen om minsta behörighet
- Säker genom design och standard
- Regelbunden säkerhetstestning och granskning
- Håll säkerhetsberoenden uppdaterade
- Misslyckas säkert (säkra standardinställningar)
- Fullständig medling (verifiera varje begäran)
- Säkerhetsutbildning för alla teammedlemmar

## Autentisering och auktorisering

### Autentisering

- Implementera starka lösenordspolicyer
- Minsta längd: 12 tecken
- Kräv kombinationer av tecken, siffror och symboler
- Kontrollera mot vanliga lösenordslistor
- Stöd för flerfaktorsautentisering (MFA)
- Använd säker sessionshantering
- Endast HTTP-cookies
- Säkerhetsflagga för HTTPS
- SameSite-attribut
- Lämplig utgångsdatum
- Implementera kontoutlåsning efter misslyckade försök
- Säkra lösenordsåterställningsflöden
- Använd säker lösenordslagring (bcrypt/Argon2)
- Överväg lösenordslösa alternativ (WebAuthn, magiska länkar)

### Auktorisering

- Implementera rollbaserad åtkomstkontroll (RBAC)
- Använd attributbaserad åtkomstkontroll för komplexa behörigheter
- Validera auktorisering vid varje begäran
- Implementera korrekta åtkomstkontroller
- Använd säker sessionshantering
- Implementera API-auktorisering (OAuth 2.0, JWT)
- Undvik direkta objektreferenser
- Logga alla fel i åtkomstkontrollen

## Dataskydd

### Känsliga data

- Identifiera och klassificera känsliga data
- Kryptera känsliga data i vila
- Använd TLS 1.3 för data under överföring
- Implementera korrekt nyckelhantering
- Minimera insamling av känsliga data
- Tillämpa principer för dataminimering
- Implementera säker dataradering
- Använd säker lagring för API-nycklar och hemligheter

### Inmatningsvalidering

- Validera all inmatning på serversidan
- Använd parametriserade frågor för databasåtkomst
- Implementera sanering av inmatningar
- Validera för korrekta datatyper, längd, format
- Använd tillåtelselistor istället för avslagslistor
- Implementera kontextspecifik utdatakodning
- Validera filuppladdningar (typ, storlek, innehåll)
- Implementera hastighetsbegränsning för indata

## Förebyggande av vanliga sårbarheter

### Injektionsförebyggande

- Använd parametriserade frågor/förberedda uttalanden
- Tillämpa ORM med korrekt escape
- Validera och sanera alla indata
- Implementera kontextmedveten utdatakodning
- Använd säkra API:er som undviker tolkinjektion

### XSS-förebyggande

- Implementera Content Security Policy (CSP)
- Använd automatisk utdatakodning
- Tillämpa kontextspecifik kodning
- Sanera HTML-indata
- Använd moderna ramverk med inbyggt XSS-skydd
- Validera URL:er i omdirigeringar
- Tillämpa HTTPOnly-flagga på känsliga cookies

### CSRF-förebyggande

- Implementera anti-CSRF-tokens
- Använd SameSite-cookieattribut
- Verifiera ursprungs- och referensrubriker
- Kräv omautentisering för känsliga åtgärder
- Använd korrekt CORS-konfiguration

### Säkerhet Rubriker

- Content-Security-Policy (CSP)
- X-Content-Type-Options: nosniff
- Strict-Transport-Security (HSTS)
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy
- Cache-Control-rubriker för känsliga data
- Clear-Site-Data för utloggning

## Infrastruktursäkerhet

### Serversäkerhet

- Håll serverprogramvaran uppdaterad
- Använd säkra serverkonfigurationer
- Implementera korrekta brandväggsregler
- Aktivera endast HTTPS (omdirigera HTTP till HTTPS)
- Konfigurera korrekta TLS-inställningar
- Inaktivera onödiga tjänster
- Använd säkerhetsfokuserade webbservermoduler
- Implementera hastighetsbegränsning och DDoS-skydd

### API-säkerhet

- Använd HTTPS för alla API-slutpunkter
- Implementera korrekt autentisering
- Tillämpa hastighetsbegränsning
- Validera nyttolaster för begäran
- Returnera lämpliga statuskoder
- Undvik att exponera känslig information i svar
- Använd API-nycklar för kommunikation mellan tjänster
- Dokumentera säkerhetskrav för API-konsumenter

### Beroendehantering

- Skanna regelbundet efter sårbara beroenden
- Använd låsfiler för att fästa beroendeversioner
- Implementera automatiserad sårbarhetsskanning
- Uppdatera beroenden omedelbart
- Minimera beroendeanvändning
- Verifiera beroendens integritet (kontrollsummor)
- Övervaka attacker i leveranskedjan
- Ha en sårbarhetshanteringsplan

## Säkerhetstestning

### Statisk analys

- Implementera automatiserade SAST-verktyg
- Integrera säkerhetslinning i CI/CD
- Skanna efter hårdkodade hemligheter
- Analysera kod för säkerhetsmönster
- Validera säkerhetskonfigurationer
- Kontrollera föråldrade beroenden
- Tillämpa säkra kodningsstandarder

### Dynamisk testning

- Utför regelbundna penetrationstester
- Implementera automatiserad DAST-skanning
- Använd interaktiva säkerhetstestningar av applikationer
- Genomför regelbundna sårbarhetsbedömningar
- Testa autentiserings- och auktoriseringsflöden
- Verifiera säkerhetsrubriker och konfigurationer
- Simulera vanliga attackscenarier

## Säkerhetsövervakning och respons

### Loggning och övervakning

- Implementera omfattande säkerhetsloggning
- Logga autentiseringshändelser
- Logga fel i åtkomstkontrollen
- Övervaka misstänkt aktivitet
- Implementera realtidsvarningar
- Använd centraliserad logghantering
- Säkerställ att loggarna är manipuleringssäkra
- Spara loggar under lämpliga tidsperioder

### Incidentrespons

- Utveckla en incidentresponsplan
- Definiera roller och ansvar
- Upprätta kommunikationsprotokoll
- Dokumentinneslutningsprocedurer
- Implementera forensiska analysfunktioner
- Genomför granskningar efter incidenter
- Öva på incidentresponsscenarier
- Upprätthåll kontakt med säkerhetsgemenskapen

## Efterlevnad och integritet

### Regelefterlevnad

- Identifiera tillämpliga regler (GDPR, CCPA, etc.)
- Implementera nödvändiga säkerhetskontroller
- Genomför regelbundna efterlevnadsbedömningar
- Dokumentera efterlevnadsåtgärder
- Utbilda teamet i efterlevnadskrav
- Implementera integritet genom design
- Underhåll nödvändig dokumentation

### Integritetsöverväganden

- Implementera tydliga Integritetspolicyer
- Inhämta korrekt samtycke för datainsamling
- Tillhandahålla mekanismer för dataåtkomst och radering
- Minimera datainsamling och -lagring
- Implementera dataportabilitet
- Genomföra konsekvensbedömningar för integritet
- Beakta integritet i alla designbeslut