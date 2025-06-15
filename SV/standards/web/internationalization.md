# Internationaliseringsstandarder (i18n)

## Kärnprinciper

- Designa för en global publik från början
- Separera innehåll från kod
- Stödja flera språk och språkinställningar
- Respektera kulturella skillnader och känsligheter
- Implementera automatisk språkidentifiering
- Tillåt manuellt språkval
- Testa med riktiga användare från målmarknader

## Språk och innehåll

### Texthantering

- Lagra all användarvänlig text i resursfiler
- Hårdkoda aldrig textsträngar i komponenter
- Använd unika, beskrivande nycklar för textresurser
- Organisera översättningar efter funktion eller sida
- Stödja pluraliseringsregler för olika språk
- Hantera könsspecifika variationer
- Stödja höger-till-vänster (RTL) språk
- Implementera reservmekanismer för saknade översättningar

### Översättningsprocess

- Ge kontext för översättare
- Inkludera platshållar-/variabelbeskrivningar
- Använd professionella översättningstjänster
- Implementera översättningsminnessystem
- Tillåt textexpansion (vissa språk kräver mer utrymme)
- Tillhandahåll skärmdumpar för kontext
- Implementera en granskningsprocess för översättningar
- Stödja kontinuerliga översättningsuppdateringar

### Innehållsöverväganden

- Undvik kulturellt specifika metaforer eller idiom
- Var medveten om färgsymbolik mellan kulturer
- Överväg olika namnformat och ta hänsyn till standarder
- Respektera kulturell känslighet och tabun
- Anpassa innehåll för lokala marknader vid behov
- Använd kulturellt neutrala bilder
- Överväg läsriktning (LTR vs RTL)
- Undvik slang och vardagliga uttryck

## Teknisk implementering

### Ramverk och bibliotek

- Använd etablerade i18n-bibliotek:
- react-i18next / i18next (React)
- vue-i18n (Vue)
- angular/localize (Angular)
- next-intl (Next.js)
- Format.js (React)
- Implementera korrekt språkdetektering
- Stödja språkbyte utan att sidan laddas om
- Konfigurera reservspråk
- Implementera lazy loading för översättningar
- Cachelagra översättningar för prestanda
- Stöd för kapslade översättningsnycklar
- Implementera pluralisering och formatering

### Kodstruktur

- Separera översättningsfiler efter språk
- Använd JSON eller YAML för översättningsresurser
- Implementera namnrymder för stora applikationer
- Håll översättningsnycklar organiserade och underhållbara
- Följ konsekventa namngivningskonventioner för nycklar
- Dokumentera specialformatering eller variabler
- Implementera typsäkerhet för översättningsnycklar (TypeScript)
- Stöd för dynamisk nyckelgenerering vid behov

### Formatering

#### Datum och tid

- Använd bibliotek som stöder internationella datumformat
- Visa datum i användarens föredragna format
- Beakta tidszoner och sommartid
- Formatera datum enligt lokala konventioner
- Stöd olika kalendersystem vid behov
- Använd ISO-format för datautbyte
- Visa relativa tider på lämpligt sätt efter kultur

#### Tal och valuta

- Formatera tal enligt lokala konventioner
- Använd korrekta decimal- och tusentalsavgränsare
- Formatera valutor med lämpliga symboler
- Placera valutasymboler korrekt efter språk
- Stöd för olika numreringssystem
- Formatera procentsatser enligt språk
- Överväg växelkurser för tillämpningar i flera regioner

#### Adresser och telefonnummer

- Stöd för olika adressformat
- Anpassa olika postnummerformat
- Hantera internationella telefonnummer (E.164-format)
- Formatera telefonnummer enligt lokala konventioner
- Stöd för olika namnordningskonventioner
- Överväg hedersbeteckningar och titlar över olika kulturer
- Validera adresser enligt landsspecifika regler

## Överväganden gällande användargränssnitt

### Layout och design

- Designa flexibla layouter som möjliggör textexpansion
- Stöd för både LTR- och RTL-textriktningar
- Implementera stöd för dubbelriktad (bidi) text
- Testa layouter med längre textsträngar
- Undvik behållare med fast bredd för text
- Överväg variationer i teckenstorlek mellan språk
- Testa med faktiskt översatt innehåll, inte lorem ipsum
- Implementera språkspecifik CSS vid behov

### Typografi

- Använd teckensnitt som stöder flera språk
- Inkludera lämpligt teckensnitt Reservalternativ
- Överväg teckenuppsättningar för olika språk
- Stöd specialtecken och diakritiska tecken
- Justera radhöjder för olika skrifttyper
- Testa läsbarhet över olika språk
- Överväg vertikal text för vissa östasiatiska språk
- Använd Unicode korrekt

### Navigering och kontroller

- Översätt navigeringsobjekt och kontroller
- Justera navigering för RTL-språk
- Beakta kulturella läsmönster
- Se till att ikoner är kulturellt neutrala
- Testa kortkommandon för olika tangentbordslayouter
- Tillhandahåll lokaliserad hjälp och dokumentation
- Översätt felmeddelanden och aviseringar
- Lokalisera sökfunktioner

## Testning och kvalitetssäkring

### Teststrategi

- Testa med modersmålstalare
- Verifiera översättningar i sitt sammanhang
- Testa textutvidgning och trunkering
- Validera datum-, nummer- och valutaformatering
- Testa RTL-layouter noggrant
- Verifiera språkväxlingsfunktionalitet
- Testa med olika språkinställningar
- Implementera automatiserad i18n-testning

### Vanliga problem

- Kontrollera hårdkodade strängar
- Verifiera korrekt pluralisering
- Leta efter sammanfogade strängar
- Testa problem med Unicode-hantering
- Verifiera sortering och sortering
- Kontrollera kulturella antaganden i logiken
- Testa med långa ord och strängar
- Verifiera hantering av specialtecken

### Verktyg och automatisering

- Implementera linting för i18n-problem
- Använd översättningshanteringssystem
- Automatisera generering av skärmdumpar för kontext
- Implementera pseudolokalisering för testning
- Använd automatiserad testning för layoutproblem
- Spåra översättningstäckning och kvalitet
- Implementera CI/CD-kontroller för i18n
- Övervaka saknade översättningar

## Juridik och efterlevnad

- Undersök lokala juridiska krav
- Anpassa integritetspolicyer för olika regioner
- Beakta GDPR och andra integritetsregler
- Anpassa användarvillkor för lokala marknader
- Var medveten om innehållsbegränsningar per land
- Beakta tillgänglighetskrav per region
- Åtgärder för dokumentefterlevnad
- Konsultera juridiska experter för viktiga marknader