# Internationalisatie (i18n) Standaarden

## Kernprincipes

- Ontwerp vanaf het begin voor een wereldwijd publiek
- Scheid content van code
- Ondersteun meerdere talen en landinstellingen
- Respecteer culturele verschillen en gevoeligheden
- Implementeer automatische taaldetectie
- Sta handmatige taalselectie toe
- Test met echte gebruikers uit doelmarkten

## Taal & Content

### Tekstbeheer

- Sla alle voor de gebruiker bestemde tekst op in bronbestanden
- Hardcodeer nooit tekstreeksen in componenten
- Gebruik unieke, beschrijvende sleutels voor tekstbronnen
- Organiseer vertalingen op functie of pagina
- Ondersteun meervoudsregels voor verschillende talen
- Verwerk genderspecifieke variaties
- Ondersteun talen die van rechts naar links (RTL) worden geschreven
- Implementeer fallback-mechanismen voor ontbrekende vertalingen

### Vertaalproces

- Bied context aan vertalers
- Voeg tijdelijke aanduidingen/variabele beschrijvingen toe
- Maak gebruik van professionele vertaaldiensten
- Implementeer vertaalgeheugensystemen
- Maak tekstuitbreiding mogelijk (sommige talen vereisen meer ruimte)
- Voeg screenshots toe voor context
- Implementeer een revisieproces voor vertalingen
- Ondersteun continue vertalingsupdates

### Inhoudelijke overwegingen

- Vermijd cultureel specifieke metaforen of idiomen
- Wees u bewust van kleursymboliek in verschillende culturen
- Houd rekening met verschillende naamformaten en adresnormen
- Respecteer culturele gevoeligheden en taboes
- Pas de content waar nodig aan voor lokale markten
- Gebruik cultureel neutrale beelden
- Houd rekening met leesrichting (LTR vs RTL)
- Vermijd straattaal en spreektaal

## Technische implementatie

### Framework & bibliotheken

- Gebruik bestaande i18n-bibliotheken:
- react-i18next / i18next (React)
- vue-i18n (Vue)
- angular/localize (Angular)
- next-intl (Next.js)
- Format.js (React)
- Implementeer correcte taaldetectie
- Ondersteun taalwisseling zonder pagina's opnieuw te laden
- Configureer fallback-talen
- Implementeer lazy loading voor vertalingen
- Cache vertalingen voor prestaties
- Ondersteun geneste vertaalsleutels
- Implementeer pluralisatie en opmaak

### Codestructuur

- Scheid vertaalbestanden per taal
- Gebruik JSON of YAML voor vertaalbronnen
- Implementeer naamruimten voor grote applicaties
- Houd vertaalsleutels georganiseerd en onderhoudbaar
- Volg consistente naamgevingsconventies voor sleutels
- Documenteer speciale opmaak of variabelen
- Implementeer typesafety voor vertaalsleutels (TypeScript)
- Ondersteun dynamische sleutelgeneratie indien nodig

### Opmaak

#### Datum & tijd

- Gebruik bibliotheken die internationale datumnotaties ondersteunen
- Geef datums weer in de door de gebruiker gewenste notatie
- Houd rekening met tijdzones en zomertijd
- Formatteer datums volgens lokale conventies
- Ondersteun verschillende kalendersystemen indien nodig
- Gebruik ISO-formaat voor gegevensuitwisseling
- Geef relatieve tijden op de juiste manier weer door Cultuur

#### Getallen & Valuta

- Formatteer getallen volgens de lokale conventies
- Gebruik de juiste decimalen en duizendtallen
- Formatteer valuta's met de juiste symbolen
- Positioneer valutasymbolen correct per landinstelling
- Ondersteun verschillende nummeringssystemen
- Formatteer percentages volgens landinstelling
- Houd rekening met wisselkoersen voor toepassingen in meerdere regio's

#### Adressen & Telefoonnummers

- Ondersteun verschillende adresformaten
- Ondersteun verschillende postcodeformaten
- Verwerk internationale telefoonnummers (E.164-formaat)
- Formatteer telefoonnummers volgens lokale conventies
- Ondersteun verschillende naamvolgordeconventies
- Houd rekening met eretitels en titels in verschillende culturen
- Valideer adressen volgens landspecifieke regels

## UI-overwegingen

### Lay-out & Ontwerp

- Ontwerp flexibele lay-outs die ruimte bieden aan tekstuitbreiding
- Ondersteun zowel LTR- als RTL-tekstrichtingen
- Implementeer ondersteuning voor bidirectionele (bidi) tekst
- Test lay-outs met langere tekstreeksen
- Vermijd Containers met vaste breedte voor tekst
- Houd rekening met variaties in lettergrootte tussen talen
- Test met daadwerkelijk vertaalde content, niet met lorem ipsum
- Implementeer taalspecifieke CSS indien nodig

### Typografie

- Gebruik lettertypen die meerdere talen ondersteunen
- Neem geschikte fallbacks voor lettertypen op
- Houd rekening met tekensets voor verschillende talen
- Ondersteun speciale tekens en diakritische tekens
- Pas regelhoogtes aan voor verschillende schriften
- Test de leesbaarheid in verschillende talen
- Houd rekening met verticale tekst voor sommige Oost-Aziatische talen
- Gebruik Unicode correct

### Navigatie en bedieningselementen

- Vertaal navigatie-items en bedieningselementen
- Pas de navigatie aan voor RTL-talen
- Houd rekening met culturele leespatronen
- Zorg ervoor dat pictogrammen cultureel neutraal zijn
- Test sneltoetsen voor verschillende toetsenbordindelingen
- Bied gelokaliseerde help en documentatie
- Vertaal foutmeldingen en meldingen
- Lokaliseer de zoekfunctionaliteit

## Testen en kwaliteitsborging

### Teststrategie

- Test met native speakers
- Controleer vertalingen in Context
- Test tekstuitbreiding en -afkapping
- Valideer datum-, getal- en valuta-opmaak
- Test RTL-layouts grondig
- Controleer de functionaliteit voor taalomschakeling
- Test met verschillende landinstellingen
- Implementeer geautomatiseerde i18n-tests

### Veelvoorkomende problemen

- Controleer op hardgecodeerde strings
- Controleer de juiste meervoudsvorm
- Zoek naar aaneengeschakelde strings
- Test op problemen met Unicode-verwerking
- Controleer sortering en collationering
- Controleer op culturele aannames in de logica
- Test met lange woorden en strings
- Controleer de verwerking van speciale tekens

### Tools & Automatisering

- Implementeer linting voor i18n-problemen
- Gebruik vertaalmanagementsystemen
- Automatiseer screenshotgeneratie voor context
- Implementeer pseudo-lokalisatie voor testen
- Gebruik geautomatiseerde tests voor lay-outproblemen
- Volg de vertaaldekking en -kwaliteit
- Implementeer CI/CD-controles voor i18n
- Controleer op ontbrekende vertalingen

## Juridisch & Compliance

- Onderzoek lokale wettelijke vereisten
- Pas privacybeleid aan voor verschillende regio's
- Houd rekening met de AVG en andere privacyregelgeving
- Pas de servicevoorwaarden aan voor lokale markten
- Wees op de hoogte van contentbeperkingen per land
- Houd rekening met toegankelijkheidsvereisten per regio
- Documenteer nalevingsmaatregelen
- Raadpleeg juridische experts voor belangrijke markten