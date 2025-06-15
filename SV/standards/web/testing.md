# Webbteststandarder

## Testfilosofi

- Testa tidigt och testa ofta
- Automatisera tester där det är möjligt
- Testa på lämpliga nivåer (enhet, integration, e2e)
- Skriv underhållbara och tillförlitliga tester
- Testa både lyckliga vägar och kantfall
- Använd testning för att förhindra regressioner
- Prioritera tester baserat på affärspåverkan
- Behandla testkod med samma omsorg som produktionskod

## Testtyper och täckning

### Enhetstestning

- **Mål**: Enskilda funktioner, komponenter och moduler
- **Täckningsmål**: 80%+ av affärslogik och verktyg
- **Verktyg**: Jest, Vitest, React Testing Library
- **Bästa praxis**:
- Följ AAA-mönstret (Arrange, Act, Assert)
- En assertion per test när det är möjligt
- Simulera externa beroenden
- Testa kantfall och felvillkor
- Håll testerna snabba (< 100ms per test)
- Använd beskrivande testnamn
- Isolera tester från varandra

### Integrationstestning

- **Mål**: Interaktioner mellan komponenter och tjänster
- **Täckningsmål**: Kritiska användarflöden och komponentinteraktioner
- **Verktyg**: React Testing Library, MSW, Supertest
- **Bästa praxis**:
- Testkomponentkompositioner
- Inskickade testformulär
- Mock API-svar
- Ändringar i testtillstånd
- Verifiera DOM-uppdateringar
- Testrouting och navigering
- Använd realistisk testdata

### End-to-End-testning

- **Mål**: Kompletta användarflöden från användargränssnitt till backend
- **Täckningsmål**: Kritiska affärsvägar och användarresor
- **Verktyg**: Cypress, Playwright
- **Bästa praxis**:
- Fokusera på kritiska användarresor
- Testa på flera webbläsare
- Använd stabila selektorer (data-testid)
- Konfigurera isolerade testmiljöer
- Hantera testdata effektivt
- Ta skärmdumpar av fel
- Implementera Försök igen med logik för ojämna tester

### Visuell regressionstestning

- **Mål**: Utseende och layout för användargränssnitt
- **Täckningsmål**: Viktiga komponenter och sidor i användargränssnittet
- **Verktyg**: Percy, Chromatic, Playwright
- **Bästa praxis**:
- Ta baslinjeskärmdumpar
- Testa över olika visningsportar
- Ignorera dynamiskt innehåll
- Granska visuella ändringar noggrant
- Testa ljusa/mörka lägen
- Testa med olika innehållslängder
- Integrera med CI/CD-pipeline

### Tillgänglighetstestning

- **Mål**: WCAG-efterlevnad och tillgänglighetsproblem
- **Täckningsmål**: Alla användarvänliga komponenter och sidor
- **Verktyg**: axe, Lighthouse, WAVE
- **Bästa praxis**:
- Testa tangentbordsnavigering
- Verifiera skärmläsarkompatibilitet
- Kontrollera färgkontrast
- Testa fokushantering
- Verifiera ARIA-attribut
- Testa med hjälpmedel
- Automatisera grundläggande tillgänglighet kontroller 

### Prestandatestning 

- **Mål**: Sidladdningstider, renderingsprestanda 
- **Täckningsmål**: Viktiga sidor och kritiska användarvägar 
- **Verktyg**: Lighthouse, WebPageTest, k6 
- **Bästa praxis**: 
- Mät Core Web Vitals 
- Testa på enklare enheter 
- Simulera nätverksbegränsning 
- Övervaka paketstorlek 
- Testa med realistiska cachningsscenarier 
- Mät tid till interaktiv 
- Sätt prestandabudgetar 

## Testpraxis 

### Testorganisation 

- Gruppera tester logiskt efter funktion eller komponent 
- Använd beskrivande filnamn och testbeskrivningar 
- Separera testverktyg och fixturer 
- Organisera tester i en hierarki som speglar kodbasen 
- Håll testfiler nära koden de testar 
- Använd konsekventa namngivningskonventioner 
- Separera enhets-, integrations- och e2e-tester 

### Testdatahantering 

- Använd fabriker eller byggare för testdata 
- Undvik hårdkodad testdata 
- Använd realistiska data som matchar produktionsmönster
- Återställ testtillstånd mellan tester
- Isolera testmiljöer
- Beakta datasekretess i testdata
- Använd seedad slumpmässig data för kantfall

### Mocking & Stubbing

- Mocka externa beroenden (API:er, tjänster)
- Använd realistiska mock-svar
- Återställ mock-test mellan tester
- Undvik överdriven mocking
- Mocka på lämplig nivå
- Dokumentera mock-beteende
- Använd MSW för API-mocking

### Kontinuerlig integration

- Kör tester på varje pull-request
- Implementera parallell testkörning
- Konfigurera testrapportering och dashboards
- Konfigurera meddelanden om testfel
- Implementera testförsök för ostabila tester
- Cachelagra testberoenden
- Kör olika testtyper i lämpliga skeden

## Testdriven utveckling (TDD)

- Skriv tester innan du implementerar funktioner
- Följ Röd-Grön-Refactor-cykeln
- Börja med enkla testfall
- Lägg till komplexitet stegvis
- Använd tester för att driva design
- Omstrukturera tester allt eftersom koden utvecklas
- Fokusera på beteende, inte implementering

## Testunderhåll

- Regelbundet granska och uppdatera tester
- Ta bort eller åtgärda ojämna tester
- Omstrukturera tester med kodändringar
- Övervaka testprestanda
- Analysera testtäckning regelbundet
- Dokumentera teststrategi
- Utbilda teammedlemmar i testpraxis

## Specialiserad testning

### API-testning

- Testa alla API-slutpunkter
- Verifiera begäran/svarsscheman
- Testautentisering och auktorisering
- Testa felhantering och statuskoder
- Validera affärslogik
- Testa hastighetsbegränsningar och kvoter
- Dokumentera API-testfall

### Testning av tillståndshantering

- Testa tillståndsövergångar
- Verifiera initialt tillstånd
- Testa reducerare och åtgärder
- Testa väljare och härlett tillstånd
- Skanna externa beroenden
- Testa asynkrona tillståndsändringar
- Verifiera tillståndsbeständighet

### Formulärtestning

- Testa formulärinlämningar
- Validera formulär indata
- Testa feltillstånd
- Testa formulärets återställningsfunktion
- Testa villkorlig formulärlogik
- Verifiera tillgänglighet för formulärelement
- Testa formulär med tangentbordsnavigering

### Säkerhetstestning

- Testa autentiseringsflöden
- Verifiera auktoriseringskontroller
- Testa mot vanliga sårbarheter (XSS, CSRF)
- Validera sanering av indata
- Testa säkerheten för filuppladdning
- Verifiera säkra rubriker
- Testa mot OWASP Topp 10