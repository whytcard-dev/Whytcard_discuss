# Web-Teststandards

## Testphilosophie

- Frühzeitig und häufig testen
- Tests möglichst automatisieren
- Auf geeigneten Ebenen testen (Unit, Integration, E2E)
- Wartbare und zuverlässige Tests schreiben
- Sowohl Happy Paths als auch Randfälle testen
- Regressionen durch Tests vermeiden
- Tests nach Geschäftsauswirkungen priorisieren
- Testcode mit der gleichen Sorgfalt behandeln wie Produktionscode

## Testarten und -abdeckung

### Unit-Tests

- **Ziel**: Einzelne Funktionen, Komponenten und Module
- **Zielabdeckung**: Über 80 % der Geschäftslogik und Dienstprogramme
- **Tools**: Jest, Vitest, React Testing Library
- **Best Practices**:
- AAA-Muster (Arrange, Act, Assert) befolgen
- Wenn möglich eine Assertion pro Test
- Externe Abhängigkeiten simulieren
- Randfälle und Fehlerbedingungen testen
- Tests schnell halten (< 100 ms pro Test)
- Verwenden Beschreibende Testnamen
- Tests voneinander isolieren

### Integrationstests

- **Ziel**: Interaktionen zwischen Komponenten und Diensten
- **Abdeckungsziel**: Kritische Benutzerabläufe und Komponenteninteraktionen
- **Tools**: React Testing Library, MSW, Supertest
- **Best Practices**:
- Komponentenzusammensetzungen testen
- Formularübermittlungen testen
- API-Antworten simulieren
- Statusänderungen testen
- DOM-Updates überprüfen
- Routing und Navigation testen
- Realistische Testdaten verwenden

### End-to-End-Tests

- **Ziel**: Vollständige Benutzerabläufe von der Benutzeroberfläche bis zum Backend
- **Abdeckungsziel**: Kritische Geschäftspfade und Benutzerreisen
- **Tools**: Cypress, Playwright
- **Best Practices**:
- Fokus auf kritische Benutzerreisen
- In mehreren Browsern testen
- Stabile Selektoren (data-testid) verwenden
- Isolierte Testumgebungen einrichten
- Testdaten verwalten Effektiv 
- Screenshots bei Fehlern erstellen 
- Wiederholungslogik für fehlerhafte Tests implementieren 

### Visuelle Regressionstests 

- **Ziel**: Erscheinungsbild und Layout der Benutzeroberfläche 
- **Abdeckungsziel**: Wichtige UI-Komponenten und -Seiten 
- **Tools**: Percy, Chromatic, Playwright 
- **Best Practices**: 
- Basis-Screenshots erstellen 
- In verschiedenen Ansichtsfenstern testen 
- Dynamische Inhalte ignorieren 
- Visuelle Änderungen sorgfältig prüfen 
- Hell-/Dunkel-Modi testen 
- Mit unterschiedlichen Inhaltslängen testen 
- In CI/CD-Pipeline integrieren 

### Barrierefreiheitstests 

- **Ziel**: WCAG-Konformität und Barrierefreiheitsprobleme 
- **Abdeckungsziel**: Alle benutzerorientierten Komponenten und Seiten 
- **Tools**: axe, Lighthouse, WAVE 
- **Best Practices**: 
- Tastaturnavigation testen 
- Screenreader-Kompatibilität prüfen 
- Farbkontrast prüfen 
- Fokusmanagement testen 
- ARIA-Attribute prüfen

- Mit assistiven Technologien testen
- Grundlegende Barrierefreiheitsprüfungen automatisieren

### Performancetests

- **Ziel**: Seitenladezeiten, Rendering-Performance
- **Abdeckungsziel**: Schlüsselseiten und kritische Benutzerpfade
- **Tools**: Lighthouse, WebPageTest, k6
- **Best Practices**:
- Messung der wichtigsten Web-Vitalwerte
- Test auf Low-End-Geräten
- Netzwerkdrosselung simulieren
- Bundle-Größe überwachen
- Test mit realistischen Caching-Szenarien
- Interaktive Zeit messen
- Performance-Budgets festlegen

## Testpraktiken

### Testorganisation

- Tests logisch nach Funktion oder Komponente gruppieren
- Aussagekräftige Dateinamen und Testbeschreibungen verwenden
- Test-Utilities und Fixtures trennen
- Tests in einer Hierarchie organisieren, die die Codebasis widerspiegelt
- Testdateien nah am getesteten Code halten
- Einheitliche Namenskonventionen verwenden
- Unit-, Integrations- und e2e-Tests

### Testdatenmanagement

- Nutzung von Factorys oder Buildern für Testdaten
- Vermeidung von fest codierten Testdaten
- Verwendung realistischer Daten, die den Produktionsmustern entsprechen
- Zurücksetzen des Teststatus zwischen den Tests
- Isolierung von Testumgebungen
- Datenschutz in Testdaten berücksichtigen
- Verwendung von gesäten Zufallsdaten für Grenzfälle

### Mocking & Stubbing

- Mocking externer Abhängigkeiten (APIs, Dienste)
- Verwendung realistischer Mocking-Antworten
- Mockings zwischen den Tests zurücksetzen
- Vermeidung übermäßigen Mockings
- Mocking auf der entsprechenden Ebene
- Dokumentation des Mock-Verhaltens
- Verwendung von MSW für API-Mocking

### Kontinuierliche Integration

- Durchführung von Tests bei jedem Pull Request
- Implementierung paralleler Testausführung
- Einrichtung von Testberichten und Dashboards
- Konfiguration von Benachrichtigungen bei Testfehlern
- Implementierung von Testwiederholungen für instabile Tests
- Cachen von Testabhängigkeiten
- Durchführung verschiedener Testtypen in geeigneten Phasen

## Testgetriebene Entwicklung (TDD)

- Schreiben Sie Tests, bevor Sie Funktionen implementieren
- Folgen Sie dem Rot-Grün-Refactoring-Zyklus
- Beginnen Sie mit einfachen Testfällen
- Steigern Sie schrittweise die Komplexität
- Nutzen Sie Tests, um das Design voranzutreiben
- Refactoring-Tests während der Code-Entwicklung
- Konzentrieren Sie sich auf das Verhalten, nicht auf die Implementierung

## Testwartung

- Regelmäßige Überprüfung und Aktualisierung von Tests
- Entfernen oder beheben Sie fehlerhafte Tests
- Refactoring-Tests mit Code-Änderungen
- Überwachen Sie die Testleistung
- Analysieren Sie regelmäßig die Testabdeckung
- Dokumentieren Sie die Teststrategie
- Schulen Sie Teammitglieder in Testpraktiken

## Spezialisierte Tests

### API-Tests

- Testen Sie alle API-Endpunkte
- Überprüfen Sie die Anfrage-/Antwortschemata
- Testen Sie Authentifizierung und Autorisierung
- Testen Sie Fehlerbehandlung und Statuscodes
- Validieren Sie die Geschäftslogik
- Testen Sie Ratenbegrenzungen und Kontingente
- Dokumentieren Sie API-Testfälle

### Zustandsmanagement-Tests

- Testen Sie Zustandsübergänge
- Überprüfen Sie den Anfangszustand
- Testen Sie Reducer und Aktionen
- Testen von Selektoren und abgeleiteten Zuständen
- Simulieren externer Abhängigkeiten
- Testen asynchroner Zustandsänderungen
- Überprüfen der Zustandspersistenz

### Formulartests

- Testen von Formulareinreichungen
- Validieren von Formulareingaben
- Testen von Fehlerzuständen
- Testen der Formularrücksetzfunktion
- Testen der bedingten Formularlogik
- Überprüfen der Erreichbarkeit von Formularelementen
- Testen von Formularen mit Tastaturnavigation

### Sicherheitstests

- Testen von Authentifizierungsabläufen
- Überprüfen von Autorisierungsprüfungen
- Testen auf gängige Sicherheitslücken (XSS, CSRF)
- Validieren der Eingabebereinigung
- Testen der Datei-Upload-Sicherheit
- Überprüfen sicherer Header
- Testen anhand der OWASP Top 10