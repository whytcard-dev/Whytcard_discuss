# Codequalitätsstandards

## Grundprinzipien

- Schreiben Sie sauberen, wartungsfreundlichen und selbstdokumentierenden Code.
- Befolgen Sie die SOLID- und DRY-Prinzipien.
- Halten Sie Funktionen klein und fokussiert (Einzelverantwortung).
- Verwenden Sie beschreibende Namen für Variablen, Funktionen und Klassen.
- Achten Sie auf einen konsistenten Codestil im gesamten Projekt.
- Dokumentieren Sie komplexe Logik und öffentliche APIs.
- Schreiben Sie Code für Menschen, nicht nur für Maschinen.

## JavaScript/TypeScript-Standards

### TypeScript-Konfiguration

- Verwenden Sie den strikten Modus („strict“: true).
- Aktivieren Sie alle empfohlenen Typprüfungsoptionen.
- Konfigurieren Sie die korrekte Modulauflösung.
- Legen Sie die entsprechende ECMAScript-Zielversion fest.
- Geben Sie Einschluss-/Ausschlussmuster an.
- Verwenden Sie Pfadaliase für sauberere Importe.

### Namenskonventionen

- **Variablen/Funktionen**: camelCase (`getUserData`, `calculateTotal`)
- **Klassen/Schnittstellen/Typen**: PascalCase (`UserProfile`, `ApiResponse`)
- **Konstanten**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`, `API_URL`)
- **Private Eigenschaften**: Verwenden Sie das Präfix `#` oder die Konvention `_` (`#privateField`, `_privateMethod`)
- **Boolesche Variablen**: Verwenden Sie die Präfixe "is", "has", "can" (`isActive`, `hasPermission`)
- **Komponentendateien**: PascalCase mit Erweiterung (`UserCard.tsx`)
- **Dienstprogrammdateien**: camelCase mit Erweiterung (`formatDate.ts`)

### Code-Organisation

- Eine Klasse/Komponente pro Datei
- Importe nach extern/intern gruppieren
- Importe alphabetisch sortieren
- Barrel-Exporte (`index.ts`) für verwandte Funktionen verwenden
- Code organisieren nach Feature/Modul
- Dateien unter 400 Zeilen halten (bei größeren teilen)
- Funktionen unter 50 Zeilen halten
- Maximale Verschachtelung: 3-4 Ebenen tief

### Best Practices

- Unveränderlichkeit bevorzugen (const, readonly, Object.freeze)
- Optionale Verkettung und Nullish-Koaleszenz verwenden
- Korrekte Fehlerbehandlung implementieren
- Typen vermeiden, außer wenn nötig
- Typwächter für die Laufzeittypprüfung verwenden
- Async/Await gegenüber einfachen Promises bevorzugen
- Magische Zahlen und Strings vermeiden (Konstanten verwenden)
- Korrekte Null-/Undefiniert-Prüfungen implementieren
- Frühe Rückgaben verwenden, um Verschachtelung zu reduzieren

## React-Standards

### Komponentenstruktur

- Funktionale Komponenten mit Hooks bevorzugen
- Benannte Exporte für Komponenten verwenden
- Prop-Validierung mit TypeScript implementieren
- Komplexe Logik in benutzerdefinierte Hooks extrahieren
- Komponenten auf UI-Aspekte konzentrieren
- Korrekte Fehlergrenzen implementieren
- Verwenden React.memo zur Performance-Optimierung
- Wiederverwendbare Komponenten extrahieren

### Zustandsverwaltung

- Lokalen Zustand für komponentenspezifische Daten verwenden
- Kontext für gemeinsamen Zustand zwischen Komponenten verwenden
- Externe Zustandsverwaltung für komplexe Anwendungen in Betracht ziehen
- Normalisierten und minimalen Zustand halten
- Korrekte Zustandsinitialisierung implementieren
- Reducer für komplexe Zustandslogik verwenden
- Prop Drilling vermeiden (Komposition oder Kontext verwenden)

### Performance-Optimierung

- React.memo für reine Komponenten verwenden
- useMemo für aufwendige Berechnungen implementieren
- useCallback für Funktions-Memoisierung verwenden
- Lange Listen virtualisieren (react-window, react-virtualized)
- Korrekte Abhängigkeits-Arrays in Hooks implementieren
- Unnötige Neu-Renderings vermeiden
- React Profiler zur Identifizierung von Engpässen verwenden

## Teststandards

### Unit-Tests

- Die gesamte Geschäftslogik und alle Dienstprogramme testen
- Jest oder Vitest als Test-Runner verwenden
- Korrektes Mocking implementieren Abhängigkeiten
- Testbibliothek für Komponententests verwenden
- AAA-Muster (Arrange, Act, Assert) befolgen
- Aussagekräftige Testnamen verwenden
- Codeabdeckung von >80 % anstreben
- Randfälle und Fehlerszenarien testen

### Integrationstests

- Komponenteninteraktionen testen
- Formularübermittlungen und Benutzerabläufe testen
- MSW für API-Mocking verwenden
- Routing und Navigation testen
- Statusänderungen überprüfen
- Mit realistischen Daten testen

### End-to-End-Tests

- Cypress oder Playwright verwenden
- Kritische Benutzerreisen testen
- In mehreren Browsern testen
- Geeignete Testisolierung implementieren
- Datenattribute für Testselektionen verwenden
- Wiederholungslogik für fehlerhafte Tests implementieren
- Zugänglichkeit testen

### Standards für Code-Reviews

### Prozess

- Der gesamte Code muss vor dem Mergen überprüft werden
- Automatisierte Prüfungen müssen vor dem Review erfolgreich sein
- Pull-Request-Vorlagen verwenden
- PRs klein halten und Fokussiert
- Reagieren Sie zeitnah auf Review-Kommentare
- Klären Sie alle Kommentare vor dem Merge
- Squashen Sie Commits vor dem Merge

### Review-Checkliste

- Der Code entspricht den Projektstandards
- Tests sind vorhanden und erfolgreich
- Die Dokumentation ist aktualisiert
- Keine Sicherheitslücken
- Performance-Einbußen berücksichtigt
- Barrierefreiheitsanforderungen erfüllt
- Randfälle berücksichtigt
- Kein unnötiger Code oder Abhängigkeiten

## Tools

### Linting und Formatierung

- ESLint mit entsprechenden Regeln
- Prettier für konsistente Formatierung
- Husky für Pre-Commit-Hooks
- Lint-Staged für inkrementelles Linting
- TypeScript-Compiler zur Typprüfung
- Stylelint für CSS/SCSS

### Statische Analyse

- SonarQube oder CodeClimate
- Überwachung von Komplexitätsmetriken
- Erkennung von doppeltem Code
- Scannen von Sicherheitslücken
- Analyse der Bundle-Größe
- Ungenutzter Code Erkennung

### CI/CD-Integration

– Alle Prüfungen für jeden PR durchführen
– Zusammenführung blockieren, wenn Prüfungen fehlschlagen
– Testabdeckungsberichte erstellen und veröffentlichen
– Performance-Regressionstests implementieren
– Abhängigkeitsaktualisierungen automatisieren
– Vorschauumgebungen bereitstellen