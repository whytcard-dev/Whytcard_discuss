# Kodkvalitetsstandarder

## Kärnprinciper

- Skriv ren, underhållbar och självdokumenterande kod
- Följ SOLID- och DRY-principerna
- Håll funktionerna små och fokuserade (enkelt ansvar)
- Använd beskrivande namngivning för variabler, funktioner och klasser
- Bibehåll konsekvent kodstil i hela projektet
- Dokumentera komplex logik och publika API:er
- Skriv kod för människor, inte bara maskiner

## JavaScript/TypeScript-standarder

### TypeScript-konfiguration

- Använd strict-läge ("strict": true")
- Aktivera alla rekommenderade typkontrollalternativ
- Konfigurera korrekt modulupplösning
- Ställ in lämplig mål-ECMAScript-version
- Ange inkluderings-/exkluderingsmönster
- Använd sökvägsalias för renare importer

### Namngivningskonventioner

- **Variabler/Funktioner**: camelCase (`getUserData`, `calculateTotal`)
- **Klasser/Gränssnitt/Typer**: PascalCase (`UserProfile`, `ApiResponse`) 
- **Konstanter**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`, `API_URL`) 
- **Privata egenskaper**: Använd prefixet `#` eller `_` (`#privateField`, `_privateMethod`) 
- **Booleska variabler**: Använd prefixen "is", "has", "can" (`isActive`, `hasPermission`) 
- **Komponentfiler**: PascalCase med tillägget (`UserCard.tsx`) 
- **Verktygsfiler**: camelCase med tillägget (`formatDate.ts`) 

### Kodorganisation 

- En klass/komponent per fil 
- Gruppera importer efter extern/intern 
- Ordna importer alfabetiskt 
- Använd barrel-exporter (`index.ts`) för relaterad funktionalitet 
- Organisera kod efter funktion/modul 
- Håll filer under 400 rader (dela upp om de är större) 
- Behåll funktioner under 50 rader
- Maximal kapsling: 3-4 nivåer djup

### Bästa praxis

- Föredra immutabilitet (const, readonly, Object.freeze)
- Använd valfri kedjekoppling och null-koalescing
- Implementera korrekt felhantering
- Undvik alla typer utom när det är nödvändigt
- Använd type guards för typkontroll under körning
- Föredra async/await framför råa löften
- Undvik magiska tal och strängar (använd konstanter)
- Implementera korrekta null-/odefinierade kontroller
- Använd tidiga returer för att minska kapsling

## React Standards

### Komponentstruktur

- Föredra funktionella komponenter med hooks
- Använd namngivna exporter för komponenter
- Implementera prop-validering med TypeScript
- Extrahera komplex logik till anpassade hooks
- Håll komponenter fokuserade på UI-problem
- Implementera korrekta felgränser
- Använd React.memo för prestandaoptimering
- Extrahera återanvändbara komponenter

### Tillståndshantering

- Använd lokalt tillstånd för komponentspecifik data
- Använd kontext för delat tillstånd över komponenter
- Överväg extern tillståndshantering för komplexa appar
- Håll tillståndet normaliserat och minimalt
- Implementera korrekt tillståndsinitiering
- Använd reducers för komplex tillståndslogik
- Undvik prop drilling (använd komposition eller kontext)

### Prestandaoptimering

- Använd React.memo för rena komponenter
- Implementera useMemo för dyra beräkningar
- Använd useCallback för funktionsmemoisering
- Virtualisera långa listor (react-window, react-virtualized)
- Implementera korrekta beroendematriser i hooks
- Undvik onödiga omrenderingar
- Använd React Profiler för att identifiera flaskhalsar

## Teststandarder

### Enhetstestning

- Testa all affärslogik och verktyg
- Använd Jest eller Vitest som testkörare
- Implementera korrekt mocking av beroenden
- Använd Testing Library för komponenttestning
- Följ AAA-mönstret (Arrange, Act, Assert)
- Skriv beskrivande testnamn
- Sikta på >80 % kodtäckning
- Testa kantfall och fel scenarier

### Integrationstestning

- Interaktioner med testkomponenter
- Inskickade testformulär och användarflöden
- Använd MSW för API-mockning
- Testrouting och navigering
- Verifiera tillståndsändringar
- Testa med realistiska data

### End-to-End-testning

- Använd Cypress eller Playwright
- Testa kritiska användarresor
- Testa på flera webbläsare
- Implementera korrekt testisolering
- Använd dataattribut för testväljare
- Implementera återförsökslogik för ojämna tester
- Testtillgänglighet

## Kodgranskningsstandarder

### Process

- All kod måste granskas före sammanslagning
- Automatiserade kontroller måste godkännas före granskning
- Använd pull request-mallar
- Håll PR:erna små och fokuserade
- Svara på granskningskommentarer omedelbart
- Lös alla kommentarer före sammanslagning
- Squash-commits före sammanslagning

### Granskningschecklista

- Koden följer projektstandarder
- Tester ingår och godkänns
- Dokumentationen är uppdaterad
- Inga säkerhetsproblem
- Prestandakonsekvenser beaktas
- Tillgänglighetskrav uppfyllda
- Kantfall hanterade
- Ingen onödig kod eller beroenden

## Verktyg

### Linting och formatering

- ESLint med lämpliga regler
- Snyggare för konsekvent formatering
- Husky för pre-commit-hooks
- lint-staged för inkrementell linting
- TypeScript-kompilator för typkontroll
- Stylelint för CSS/SCSS

### Statisk analys

- SonarQube eller CodeClimate
- Övervakning av komplexitetsmått
- Detektering av duplicerad kod
- Skanning av säkerhetssårbarheter
- Analys av paketstorlek
- Detektering av oanvänd kod

### CI/CD-integration

- Kör alla kontroller på varje PR
- Blockera sammanslagning om kontroller misslyckas
- Generera och publicera testtäckningsrapporter
- Implementera prestandaregressionstestning
- Automatisera beroendeuppdateringar
- Distribuera förhandsgranskningsmiljöer