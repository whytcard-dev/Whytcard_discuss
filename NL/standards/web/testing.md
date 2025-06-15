# Webteststandaarden

## Testfilosofie

- Test vroeg en test vaak
- Automatiseer tests waar mogelijk
- Test op de juiste niveaus (unit, integratie, e2e)
- Schrijf onderhoudbare en betrouwbare tests
- Test zowel 'happy paths' als 'edge cases'
- Gebruik tests om regressies te voorkomen
- Prioriteer tests op basis van de impact op de business
- Behandel testcode met dezelfde zorg als productiecode

## Testtypen en -dekking

### Unittesten

- **Doel**: Individuele functies, componenten en modules
- **Dekkingsdoel**: Meer dan 80% van de bedrijfslogica en hulpprogramma's
- **Tools**: Jest, Vitest, React Testbibliotheek
- **Best practices**:
- Volg het AAA-patroon (Arrange, Act, Assert)
- Eén assertie per test indien mogelijk
- Mock externe afhankelijkheden
- Test edge cases en foutcondities
- Houd tests snel (< 100 ms per test)

- Gebruik beschrijvende testnamen
- Isoleer tests van elkaar

### Integratietesten

- **Doel**: Interacties tussen componenten en services
- **Dekkingsdoel**: Kritieke gebruikersstromen en componentinteracties
- **Tools**: React Testing Library, MSW, Supertest
- **Best Practices**:

- Test componentcomposities
- Test formulierinzendingen
- Mock API-reacties
- Test statuswijzigingen
- Verifieer DOM-updates
- Test routing en navigatie
- Gebruik realistische testgegevens

### End-to-end testen

- **Doel**: Complete gebruikersstromen van gebruikersinterface tot backend
- **Dekkingsdoel**: Kritieke bedrijfspaden en gebruikersreizen
- **Tools**: Cypress, Playwright
- **Best Practices**:
- Focus op kritieke gebruikersreizen
- Test op meerdere browsers
- Gebruik stabiele selectors (data-testid)
- Stel geïsoleerde testomgevingen in
- Beheer testgegevens effectief
- Maak screenshots bij fouten
- Implementeer retry-logica voor onbetrouwbare tests

### Visuele regressietesten

- **Doel**: Uiterlijk en lay-out van de gebruikersinterface
- **Dekkingsdoel**: Belangrijke componenten en pagina's van de gebruikersinterface
- **Hulpmiddelen**: Percy, Chromatic, Playwright
- **Best practices**:
- Maak screenshots van de basislijn
- Test met verschillende viewports
- Negeer dynamische content
- Bekijk visuele wijzigingen zorgvuldig
- Test lichte/donkere modi
- Test met verschillende contentlengtes
- Integreer met de CI/CD-pijplijn

### Toegankelijkheidstesten

- **Doel**: WCAG-naleving en toegankelijkheidsproblemen
- **Dekkingsdoel**: Alle gebruikersgerichte componenten en pagina's
- **Hulpmiddelen**: Axe, Lighthouse, WAVE
- **Best Praktijken**:

- Test toetsenbordnavigatie
- Controleer compatibiliteit met schermlezers
- Controleer kleurcontrast
- Test focusbeheer
- Controleer ARIA-kenmerken
- Test met ondersteunende technologieën
- Automatiseer basistoegankelijkheidscontroles

### Prestatietesten

- **Doel**: Laadtijden van pagina's, weergaveprestaties
- **Dekkingsdoel**: Belangrijke pagina's en kritieke gebruikerspaden
- **Hulpmiddelen**: Lighthouse, WebPageTest, k6
- **Best practices**:
- Meet kernwebvitals
- Test op low-end apparaten
- Simuleer netwerkbeperking
- Monitor bundelgrootte
- Test met realistische cachescenario's
- Meet tijd tot interactie
- Stel prestatiebudgetten in

## Testpraktijken

### Testorganisatie

- Groepeer tests logisch op functie of component
- Gebruik beschrijvende bestandsnamen en testbeschrijvingen
- Scheid testhulpprogramma's en fixtures
- Organiseer tests in een hiërarchie die de codebase weerspiegelt
- Houd testbestanden dicht bij de code die ze testen
- Gebruik consistente naamgevingsconventies
- Scheid unit-, integratie- en e2e-tests

### Testgegevensbeheer

- Gebruik fabrieken of builders voor testgegevens
- Vermijd hardgecodeerde testgegevens
- Gebruik realistische gegevens die overeenkomen met productiepatronen
- Reset de teststatus tussen tests
- Isoleer testomgevingen
- Houd rekening met gegevensprivacy in testgegevens
- Gebruik seeded random data voor edge cases

### Mocking & Stubbing

- Mock externe afhankelijkheden (API's, services)
- Gebruik realistische mock-reacties
- Reset mocks tussen tests
- Vermijd overmatig mocken
- Mock op het juiste niveau
- Documenteer mock-gedrag
- Gebruik MSW voor API-mocken

### Continue integratie

- Voer tests uit op elke pull-request
- Implementeer parallelle testuitvoering
- Stel testrapportage en dashboards in
- Configureer meldingen voor testfouten
- Implementeer testpogingen voor Onbetrouwbare tests
- Cache testafhankelijkheden
- Voer verschillende testtypen uit in de juiste fasen

## Test-Driven Development (TDD)

- Schrijf tests voordat u functies implementeert
- Volg de Rood-Groen-Refactor-cyclus
- Begin met eenvoudige testcases
- Voeg stapsgewijs complexiteit toe
- Gebruik tests om het ontwerp te sturen
- Refactor tests naarmate de code evolueert
- Focus op gedrag, niet op implementatie

## Testonderhoud

- Controleer en update tests regelmatig
- Verwijder of herstel onbetrouwbare tests
- Refactor tests met codewijzigingen
- Monitor testprestaties
- Analyseer regelmatig de testdekking
- Documenteer teststrategie
- Train teamleden in testpraktijken

## Gespecialiseerd testen

### API-testen

- Test alle API-eindpunten
- Verifieer aanvraag-/responsschema's
- Test authenticatie en autorisatie
- Test foutafhandeling en statuscodes
- Valideer bedrijfslogica
- Test snelheidsbeperkingen en quota's
- Documenteer API-test gevallen

### Statusbeheertesten

- Test statusovergangen
- Verifieer de beginstatus
- Test reducers en acties
- Test selectoren en afgeleide status
- Mock externe afhankelijkheden
- Test asynchrone statuswijzigingen
- Verifieer statuspersistentie

### Formuliertesten

- Test formulierinzendingen
- Valideer formulierinvoer
- Test foutstatussen
- Test functionaliteit voor het resetten van formulieren
- Test voorwaardelijke formulierlogica
- Verifieer toegankelijkheid van formulierelementen
- Test formulier met toetsenbordnavigatie

### Beveiligingstesten

- Test authenticatiestromen
- Verifieer autorisatiecontroles
- Test op veelvoorkomende kwetsbaarheden (XSS, CSRF)
- Valideer invoeropschoning
- Test beveiliging van bestandsuploads
- Verifieer beveiligde headers
- Test op OWASP Top 10