# UI/UX-Designstandards

## Designprinzipien

- **Konsistenz**: Visuelle und funktionale Konsistenz auf der gesamten Website gewährleisten
- **Klarheit**: Übersichtliche Benutzeroberflächen gestalten, die die kognitive Belastung minimieren
- **Feedback**: Klares Feedback für alle Nutzerinteraktionen bereitstellen
- **Effizienz**: Schritte zur Aufgabenerledigung minimieren
- **Fehlertoleranz**: Nutzer können Aktionen rückgängig machen und Fehler beheben
- **Barrierefreiheit**: Design für Nutzer aller Fähigkeiten
- **Einfachheit**: Benutzeroberflächen einfach und intuitiv gestalten

## Visuelles Design

### Farbsystem

- Primär-, Sekundär- und Akzentfarben definieren
- Semantische Farben (Erfolg, Warnung, Fehler, Info) einbeziehen
- Ausreichende Kontrastverhältnisse sicherstellen (WCAG AA-Mindestwert: 4,5:1 für normalen Text)
- Farbvariablen für Hell- und Dunkelmodus definieren
- Farbpalette auf 5–7 Kernfarben mit Variationen beschränken
- Richtlinien und Bedeutung der Farbverwendung dokumentieren
- Test Farben für Barrierefreiheit bei Farbenblindheit

### Typografie

- Wählen Sie eine primäre Schriftart für die Benutzeroberfläche und eine sekundäre Schriftart für den Inhalt (falls erforderlich).
- Definieren Sie eine klare Schriftskala mit begrenzten Größen (z. B. 12, 14, 16, 18, 24, 30, 36, 48 Pixel).
- Achten Sie auf eine angemessene Zeilenhöhe (1,4–1,6 für Fließtext).
- Stellen Sie eine Mindestschriftgröße von 16 Pixel für Fließtext sicher.
- Definieren Sie Schriftstärken (normal, mittel, fett).
- Legen Sie einen angemessenen Buchstabenabstand fest.
- Stellen Sie sicher, dass der Text auf allen Hintergründen lesbar bleibt.
- Verwenden Sie relative Einheiten (rem/em) anstelle von Pixeln.

### Abstand & Layout

- Erstellen Sie eine einheitliche Abstandsskala (4 Pixel, 8 Pixel, 16 Pixel, 24 Pixel, 32 Pixel, 48 Pixel, 64 Pixel).
- Implementieren Sie einheitliche Innenabstände und Ränder.
- Verwenden Sie ein Raster. Systeme für Ausrichtung und Struktur
- Ausreichend Leerraum für gute Lesbarkeit einhalten
- Standardabstände zwischen Komponenten festlegen
- Angemessene Inhaltshierarchie sicherstellen
- Responsive Layoutmuster implementieren

### Bilder & Symbole

- Einheitlichen Stil und Größe der Symbole verwenden
- Erkennbare und aussagekräftige Symbole sicherstellen
- Textalternativen für Symbole bereitstellen
- Bilder für optimale Performance optimieren
- Responsive Bilder implementieren
- Einheitliche Bildseitenverhältnisse einhalten
- SVG für Symbole und einfache Illustrationen verwenden

## Komponenten & Muster

### Komponentenbibliothek

- Eine umfassende Komponentenbibliothek erstellen
- Komponentennutzung und -varianten dokumentieren
- Zugänglichkeit der Komponenten sicherstellen
- Responsive Komponenten erstellen
- Komponentenzustände definieren (Standard, Hover, Aktiv, Fokus, Deaktiviert)
- Einheitliche Animationsmuster implementieren
- Wiederverwendbare Muster für gängige UI-Anforderungen erstellen

### Navigation

- Klare und einheitliche Navigation implementieren
- Visuelle Hinweise für den aktuellen Standort bereitstellen
- Tastaturzugängliche Navigation sicherstellen
- Navigationselemente beschreibend gestalten
- Primäre Navigation einschränken bis 7±2 Elemente
- Sekundärnavigation für komplexe Websites bereitstellen
- Breadcrumbs für tiefe Navigationsstrukturen implementieren

### Formulare

- Zusammengehörige Formularfelder gruppieren
- Alle Formularfelder eindeutig beschriften
- Validierungsfehler inline anzeigen
- Pflichtfelder kennzeichnen
- Geeignete Eingabetypen verwenden
- Logische Tabulatorreihenfolge implementieren
- Hilfreiche Fehlermeldungen anzeigen
- Erfolgsbestätigung bereitstellen
- Status bei Formularfehlern beibehalten

### Inhalt

- Überfliegbaren Inhalt mit eindeutigen Überschriften erstellen
- Aufzählungslisten für mehrere Elemente verwenden
- Absätze kurz halten (3-5 Zeilen)
- Aussagekräftige Unterüberschriften verwenden
- Eine angemessene Inhaltshierarchie implementieren
- Lesbarkeit sicherstellen (Flesch-Lese-Score)
- Einfache Sprache verwenden (Fachjargon vermeiden)

## Interaktionsdesign

### Mikrointeraktionen

- Dezente, zielgerichtete Animationen gestalten
- Animationen unter 300 ms für UI-Feedback halten
- Visuelles Feedback bereitstellen für alle Interaktionen
- Stellen Sie sicher, dass Animationen die Benutzerfreundlichkeit nicht beeinträchtigen
- Implementieren Sie einheitliche Übergangsmuster
- Lenken Sie die Aufmerksamkeit durch Animationen
- Beachten Sie die Präferenzen für reduzierte Bewegungsabläufe

### Zustände & Feedback

- Gestalten Sie alle Zustände interaktiver Elemente wie folgt:
- Standard
- Hover
- Fokus
- Aktiv
- Deaktiviert
- Geben Sie sofortiges Feedback zu Benutzeraktionen
- Zeigen Sie den Systemstatus deutlich an
- Verwenden Sie geeignete Ladeanzeigen
- Implementieren Sie Fehlerzustände, die die Auflösung steuern
- Gestalten Sie leere Zustände für Listen und Datenanzeigen

### Mobile & Touch

- Gestalten Sie Touch-Ziele (mindestens 44×44 Pixel)
- Berücksichtigen Sie Daumenzonen auf Mobilgeräten
- Implementieren Sie gestenbasierte Interaktionen konsistent
- Vermeiden Sie Hover-abhängige Interaktionen auf Mobilgeräten
- Gestalten Sie sowohl im Hoch- als auch im Querformat
- Stellen Sie sicher, dass die Tippziele ausreichend Abstand haben
- Optimieren Sie die Einhandbedienung, wenn möglich

## Benutzererfahrung

### Usability-Prinzipien

- Befolgen Sie anerkannte Designrichtlinien Muster
- Kognitive Belastung minimieren
- Wichtige Aktionen deutlich machen
- Klare Handlungsaufforderungen bereitstellen
- Vorhersehbare Benutzeroberflächen gestalten
- Inhalte nach Wichtigkeit priorisieren
- Unnötige Komplexität vermeiden

### Responsive Design

- Mobile-First-Designansatz implementieren
- Standard-Breakpoints definieren (z. B. 320px, 768px, 1024px, 1440px)
- Layouts für jeden Breakpoint entsprechend anpassen
- Touch-freundliche Benutzeroberflächen auf Mobilgeräten sicherstellen
- Auf echten Geräten testen, nicht nur auf Emulatoren
- Gerätefunktionen und -einschränkungen berücksichtigen
- Leistung für Mobilfunknetze optimieren

### Barrierefreiheit (WCAG)

- Mindestens die WCAG 2.1 AA-Standards einhalten
- Tastaturnavigation sicherstellen
- Ausreichenden Farbkontrast bereitstellen
- Geeignete ARIA-Attribute einbinden
- Barrierefreie Formulare erstellen
- Mit Screenreadern testen
- Textgrößenanpassung unterstützen bis zu 200 %
- Fokusindikatoren implementieren
- Alternativtext für Bilder bereitstellen
- Barrierefreie Datentabellen erstellen

## Forschung & Tests

### Nutzerforschung

- Nutzerinterviews und -umfragen durchführen
- Evidenzbasierte Personas erstellen
- Nutzerreisen abbilden
- Schwachstellen und Chancen identifizieren
- Annahmen mit echten Nutzern validieren
- Analysen zur Unterstützung von Designentscheidungen nutzen
- Kontinuierliche Feedbackmechanismen implementieren

### Usability-Tests

- Designs mit repräsentativen Nutzern testen
- Moderierte und unmoderierte Tests durchführen
- Auf verschiedenen Geräten und Browsern testen
- Aufgabenerledigungsraten messen
- Qualitatives Feedback einholen
- Basierend auf den Testergebnissen iterieren
- Mit unterstützenden Technologien testen