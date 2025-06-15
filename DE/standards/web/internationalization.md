# Internationalisierungsstandards (i18n)

## Grundprinzipien

– Design von Anfang an für ein globales Publikum
– Inhalt und Code trennen
– Mehrere Sprachen und Gebietsschemas unterstützen
– Kulturelle Unterschiede und Besonderheiten berücksichtigen
– Automatische Spracherkennung implementieren
– Manuelle Sprachauswahl ermöglichen
– Mit echten Nutzern aus den Zielmärkten testen

## Sprache & Inhalt

### Textverwaltung

– Alle benutzerbezogenen Texte in Ressourcendateien speichern
– Textstrings niemals fest in Komponenten codieren
– Eindeutige, beschreibende Schlüssel für Textressourcen verwenden
– Übersetzungen nach Funktion oder Seite organisieren
– Pluralisierungsregeln für verschiedene Sprachen unterstützen
– Geschlechtsspezifische Variationen berücksichtigen
– Rechts-nach-links-Sprachen unterstützen
– Fallback-Mechanismen für fehlende Übersetzungen implementieren

### Übersetzungsprozess

– Kontext für Übersetzer bereitstellen
– Platzhalter-/Variablenbeschreibungen einfügen
– Professionelle Übersetzungsdienste nutzen
– Translation-Memory-Systeme implementieren
– Texterweiterungen zulassen (in einigen Sprachen) (Benötigen mehr Platz)
- Screenshots für den Kontext bereitstellen
- Einen Überprüfungsprozess für Übersetzungen implementieren
- Kontinuierliche Aktualisierungen der Übersetzungen unterstützen

### Inhaltliche Überlegungen

- Kulturspezifische Metaphern oder Redewendungen vermeiden
- Farbsymbolik in verschiedenen Kulturen beachten
- Unterschiedliche Namensformate und Adressstandards berücksichtigen
- Kulturelle Sensibilitäten und Tabus respektieren
- Inhalte bei Bedarf an lokale Märkte anpassen
- Kulturneutrale Bilder verwenden
- Leserichtung beachten (LTR vs. RTL)
- Umgangssprache und Slang vermeiden

## Technische Umsetzung

### Framework & Bibliotheken

- Etablierte i18n-Bibliotheken verwenden:
- react-i18next / i18next (React)
- vue-i18n (Vue)
- angular/localize (Angular)
- next-intl (Next.js)
- Format.js (React)
- Eine geeignete Spracherkennung implementieren
- Sprachwechsel ohne Seitenneuladen unterstützen
- Fallback-Sprachen konfigurieren
- Lazy Loading für Übersetzungen implementieren
- Übersetzungen für höhere Performance zwischenspeichern
- Verschachtelte Übersetzungsschlüssel unterstützen
- Pluralisierung und Formatierung implementieren

### Codestruktur

- Übersetzungsdateien nach Sprachen trennen
- JSON oder YAML für Übersetzungsressourcen verwenden
- Namespaces für große Anwendungen implementieren
- Übersetzungsschlüssel übersichtlich und wartungsfreundlich halten
- Einheitliche Namenskonventionen für Schlüssel einhalten
- Spezielle Formatierungen oder Variablen dokumentieren
- Typsicherheit für Übersetzungsschlüssel implementieren (TypeScript)
- Dynamische Schlüsselgenerierung bei Bedarf unterstützen

### Formatierung

#### Datum & Uhrzeit

- Bibliotheken verwenden, die internationale Datumsformate unterstützen
- Datumsangaben im bevorzugten Format des Benutzers anzeigen
- Zeitzonen und Sommerzeit berücksichtigen
- Datumsangaben gemäß lokalen Konventionen formatieren
- Verschiedene Kalendersysteme bei Bedarf unterstützen
- ISO-Format für den Datenaustausch verwenden
- Relative Zeitangaben kulturgerecht anzeigen

#### Zahlen & Währung

- Zahlen entsprechend den lokalen Konventionen formatieren
- Dezimal- und Tausendertrennzeichen verwenden
- Währungen mit entsprechenden Symbolen formatieren
- Währungssymbole je nach Gebietsschema korrekt positionieren
- Verschiedene Nummerierungssysteme unterstützen
- Prozentsätze entsprechend dem Gebietsschema formatieren
- Wechselkurse für Anwendungen in mehreren Regionen berücksichtigen

#### Adressen & Telefonnummern

- Verschiedene Adressformate unterstützen
- Verschiedene Postleitzahlenformate berücksichtigen
- Internationale Telefonnummern verarbeiten (E.164-Format)
- Telefonnummern entsprechend den lokalen Konventionen formatieren
- Unterschiedliche Namensreihenfolge berücksichtigen
- Anredeformen und Titel kulturübergreifend berücksichtigen
- Adressen nach länderspezifischen Regeln validieren

## UI-Überlegungen

### Layout & Design

- Flexible Layouts gestalten, die Texterweiterungen berücksichtigen
- Sowohl LTR- als auch RTL-Textrichtungen unterstützen
- Bidirektionale Textunterstützung implementieren
- Layouts mit längeren Textzeichenfolgen testen
- Textcontainer mit fester Breite vermeiden
- Schriftart berücksichtigen Größenabweichungen zwischen Sprachen
- Testen Sie mit tatsächlich übersetzten Inhalten, nicht mit Lorem Ipsum
- Implementieren Sie bei Bedarf sprachspezifisches CSS

### Typografie

- Verwenden Sie Schriftarten, die mehrere Sprachen unterstützen
- Integrieren Sie geeignete Schriftarten-Fallbacks
- Berücksichtigen Sie Zeichensätze für verschiedene Sprachen
- Unterstützen Sie Sonderzeichen und diakritische Zeichen
- Passen Sie die Zeilenhöhen für verschiedene Schriften an
- Testen Sie die Lesbarkeit in verschiedenen Sprachen
- Erwägen Sie vertikale Texte für einige ostasiatische Sprachen
- Verwenden Sie Unicode korrekt

### Navigation & Bedienelemente

- Übersetzen Sie Navigationselemente und Bedienelemente
- Passen Sie die Navigation für RTL-Sprachen an
- Berücksichtigen Sie kulturelle Lesegewohnheiten
- Stellen Sie sicher, dass die Symbole kulturneutral sind
- Testen Sie Tastaturkürzel für verschiedene Tastaturlayouts
- Stellen Sie lokalisierte Hilfe und Dokumentation bereit
- Übersetzen Sie Fehlermeldungen und Benachrichtigungen
- Lokalisieren Sie die Suchfunktion

## Testen & Qualitätssicherung

### Teststrategie

- Testen Sie mit Muttersprachlern
- Überprüfen Sie Übersetzungen im Kontext
- Testen Sie Texterweiterungen und -kürzungen
- Validieren Datums-, Zahlen- und Währungsformatierung
- RTL-Layouts gründlich testen
- Sprachumschaltung prüfen
- Mit verschiedenen Gebietsschemaeinstellungen testen
- Automatisierte i18n-Tests implementieren

### Häufige Probleme

- Auf fest codierte Zeichenfolgen prüfen
- Korrekte Pluralisierung prüfen
- Auf verkettete Zeichenfolgen achten
- Auf Unicode-Verarbeitung prüfen
- Sortierung und Kollation prüfen
- Auf kulturelle Annahmen in der Logik prüfen
- Mit langen Wörtern und Zeichenfolgen testen
- Umgang mit Sonderzeichen prüfen

### Tools & Automatisierung

- Linting für i18n-Probleme implementieren
- Übersetzungsmanagementsysteme nutzen
- Screenshot-Generierung für Kontext automatisieren
- Pseudolokalisierung für Tests implementieren
- Automatisierte Tests für Layoutprobleme nutzen
- Übersetzungsabdeckung und -qualität verfolgen
- CI/CD-Prüfungen für i18n implementieren
- Auf fehlende Übersetzungen achten

## Recht & Compliance

- Lokale rechtliche Anforderungen recherchieren
- Datenschutz anpassen Richtlinien für verschiedene Regionen
- DSGVO und andere Datenschutzbestimmungen berücksichtigen
- Nutzungsbedingungen an lokale Märkte anpassen
- Inhaltsbeschränkungen je nach Land beachten
- Barrierefreiheitsanforderungen je nach Region berücksichtigen
- Compliance-Maßnahmen dokumentieren
- Rechtsexperten für wichtige Märkte konsultieren