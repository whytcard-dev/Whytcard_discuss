# Codekwaliteitsnormen

## Kernprincipes

- Schrijf schone, onderhoudbare en zelfdocumenterende code
- Volg de SOLID- en DRY-principes
- Houd functies klein en gericht (één verantwoordelijkheid)
- Gebruik beschrijvende naamgeving voor variabelen, functies en klassen
- Handhaaf een consistente codestijl binnen het project
- Documenteer complexe logica en openbare API's
- Schrijf code voor mensen, niet alleen voor machines

## JavaScript/TypeScript-normen

### TypeScript-configuratie

- Gebruik de strict-modus (`"strict": true`)
- Schakel alle aanbevolen opties voor typecontrole in
- Configureer de juiste moduleresolutie
- Stel de juiste doelversie van ECMAScript in
- Specificeer include/exclude-patronen
- Gebruik padaliassen voor nettere imports

### Naamgevingsconventies

- **Variabelen/Functies**: camelCase (`getUserData`, `calculateTotal`)
- **Klassen/Interfaces/Typen**: PascalCase (`UserProfile`, `ApiResponse`)
- **Constanten**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`, `API_URL`)
- **Privé-eigenschappen**: Gebruik het voorvoegsel `#` of de conventie `_` (`#privateField`, `_privateMethod`)
- **Booleaanse variabelen**: Gebruik de voorvoegsels "is", "has", "can" (`isActive`, `hasPermission`)
- **Componentbestanden**: PascalCase met de extensie (`UserCard.tsx`)
- **Hulpbestanden**: camelCase met de extensie (`formatDate.ts`)

### Code-organisatie

- Eén klasse/component per bestand
- Groepeer imports op extern/intern
- Sorteer imports alfabetisch
- Gebruik barrel-exports (`index.ts`) voor gerelateerde functionaliteit
- Organiseer code op functie/module
- Houd bestanden onder de 400 regels (splitsen indien groter)
- Houd functies onder de 50 regels
- Maximale nesting: 3-4 niveaus diep

### Aanbevolen procedures

- Geef de voorkeur aan onveranderlijkheid (const, readonly, Object.freeze)
- Gebruik optionele chaining en nullish coalescing
- Implementeer correcte foutafhandeling
- Vermijd elk type, behalve wanneer nodig
- Gebruik type guards voor runtime typecontrole
- Geef de voorkeur aan async/await boven raw promises
- Vermijd magische getallen en strings (gebruik constanten)
- Implementeer correcte null/undefined-controles
- Gebruik early returns om nesting te verminderen

## React-standaarden

### Componentstructuur

- Geef de voorkeur aan functionele componenten met hooks
- Gebruik benoemde exports voor componenten
- Implementeer prop-validatie met TypeScript
- Extraheer complexe logica naar aangepaste hooks
- Houd componenten gefocust over UI-problemen
- Implementeer de juiste foutgrenzen
- Gebruik React.memo voor prestatieoptimalisatie
- Extraheer herbruikbare componenten

### Statusbeheer

- Gebruik de lokale status voor componentspecifieke gegevens
- Gebruik context voor gedeelde status tussen componenten
- Overweeg extern statusbeheer voor complexe apps
- Houd de status genormaliseerd en minimaal
- Implementeer de juiste statusinitialisatie
- Gebruik reducers voor complexe statuslogica
- Vermijd prop drill (gebruik compositie of context)

### Prestatieoptimalisatie

- Gebruik React.memo voor pure componenten
- Implementeer useMemo voor dure berekeningen
- Gebruik useCallback voor functiememoisatie
- Virtualiseer lange lijsten (react-window, react-virtualized)
- Implementeer de juiste afhankelijkheidsarrays in hooks
- Vermijd onnodige re-renders
- Gebruik React Profiler om knelpunten te identificeren

## Teststandaarden

### Unittesten

- Test alle bedrijfslogica en hulpprogramma's
- Gebruik Jest of Vitest als testrunner
- Implementeer correcte mocking van afhankelijkheden
- Gebruik de testbibliotheek voor componenttesten
- Volg het AAA-patroon (Arrange, Act, Assert)
- Schrijf beschrijvende testnamen
- Streef naar >80% codedekking
- Test edge cases en foutscenario's

### Integratietesten

- Test componentinteracties
- Test formulierinzendingen en gebruikersstromen
- Gebruik MSW voor API-mocking
- Test routing en navigatie
- Controleer statuswijzigingen
- Test met realistische data

### End-to-end testen

- Gebruik Cypress of Playwright
- Test kritische gebruikerservaringen
- Test op meerdere browsers
- Implementeer correcte testisolatie
- Gebruik data-attributen voor testselectoren
- Implementeer retry-logica voor onbetrouwbare tests
- Test de toegankelijkheid

## Codereviewstandaarden

### Proces

- Alle code moet worden beoordeeld voordat deze wordt samengevoegd
- Geautomatiseerde controles moeten slagen vóór de review
- Gebruik pull request-sjablonen
- Houd PR's klein en gericht
- Reageer snel op reviewcommentaren
- Los alle opmerkingen op vóór het samenvoegen
- Squash commits vóór het samenvoegen

### Reviewchecklist

- Code volgt projectstandaarden
- Tests zijn opgenomen en slagen
- Documentatie is bijgewerkt
- Geen beveiligingskwetsbaarheden
- Prestatie-implicaties overwogen
- Voldoet aan toegankelijkheidsvereisten
- Edge cases afgehandeld
- Geen onnodige code of afhankelijkheden

## Tooling

### Linting en opmaak

- ESLint met de juiste regels
- Mooier voor consistente opmaak
- Ruwer voor pre-commit hooks
- lint-staged voor incrementele linting
- TypeScript-compiler voor typecontrole
- Stylelint voor CSS/SCSS

### Statische analyse

- SonarQube of CodeClimate
- Monitoring van complexiteitsmetrieken
- Detectie van dubbele code
- Scannen op beveiligingskwetsbaarheden
- Analyse van bundelgrootte
- Detectie van ongebruikte code

### CI/CD-integratie

- Voer alle controles uit op elke PR
- Blokkeer samenvoeging als controles mislukken
- Genereer en publiceer testdekkingsrapporten
- Implementeer prestatieregressietests
- Automatiseer afhankelijkheidsupdates
- Implementeer preview-omgevingen