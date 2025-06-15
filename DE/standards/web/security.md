# Web-Sicherheitsstandards

## Grundlegende Sicherheitsprinzipien

- Mehrstufige Verteidigung (mehrere Sicherheitsebenen)
- Prinzip der geringsten Privilegien
- Sicherheit durch Design und Standard
- Regelmäßige Sicherheitstests und -audits
- Aktuelle Sicherheitsabhängigkeiten
- Ausfallsicher (sichere Standardeinstellungen)
- Vollständige Mediation (jede Anfrage überprüfen)
- Sicherheitsschulung für alle Teammitglieder

## Authentifizierung und Autorisierung

### Authentifizierung

- Implementierung sicherer Passwortrichtlinien
- Mindestlänge: 12 Zeichen
- Kombination aus Buchstaben, Zahlen und Sonderzeichen erforderlich
- Abgleich mit gängigen Passwortlisten
- Unterstützung von Multi-Faktor-Authentifizierung (MFA)
- Verwendung eines sicheren Sitzungsmanagements
- Nur-HTTP-Cookies
- Sicherheitskennzeichen für HTTPS
- SameSite-Attribut
- Angemessenes Ablaufdatum
- Implementierung einer Kontosperrung nach fehlgeschlagenen Versuchen
- Sichere Passwort-Reset-Flows
- Verwendung eines sicheren Passwortspeichers (bcrypt/Argon2)
- Erwägung passwortloser Optionen (WebAuthn, magic Links)

### Autorisierung

- Rollenbasierte Zugriffskontrolle (RBAC) implementieren
- Attributbasierte Zugriffskontrolle für komplexe Berechtigungen verwenden
- Autorisierung bei jeder Anfrage validieren
- Korrekte Zugriffskontrollprüfungen implementieren
- Sichere Sitzungsverwaltung verwenden
- API-Autorisierung (OAuth 2.0, JWT) implementieren
- Direkte Objektreferenzen vermeiden
- Alle Zugriffskontrollfehler protokollieren

## Datenschutz

### Sensible Daten

- Sensible Daten identifizieren und klassifizieren
- Sensible Daten im Ruhezustand verschlüsseln
- TLS 1.3 für Daten während der Übertragung verwenden
- Korrektes Schlüsselmanagement implementieren
- Erfassung sensibler Daten minimieren
- Grundsätze der Datenminimierung anwenden
- Sichere Datenlöschung implementieren
- Sichere Speicherung von API-Schlüsseln und -Geheimnissen verwenden

### Eingabevalidierung

- Alle Eingaben serverseitig validieren
- Parametrisierte Abfragen für den Datenbankzugriff verwenden
- Eingabebereinigung implementieren
- Auf korrekte Datentypen prüfen Länge, Format
- Verwendung von Allowlists statt Denylists
- Implementierung einer kontextspezifischen Ausgabekodierung
- Validierung von Datei-Uploads (Typ, Größe, Inhalt)
- Implementierung einer Ratenbegrenzung für Eingaben

## Prävention häufiger Sicherheitslücken

### Prävention von Injection

- Verwendung parametrisierter Abfragen/vorbereiteter Anweisungen
- Anwendung von ORM mit korrektem Escape-Zeichen
- Validierung und Bereinigung aller Eingaben
- Implementierung einer kontextsensitiven Ausgabekodierung
- Verwendung sicherer APIs, die Interpreter-Injection vermeiden

### XSS-Prävention

- Implementierung einer Content Security Policy (CSP)
- Verwendung einer automatischen Ausgabekodierung
- Anwendung einer kontextspezifischen Kodierung
- Bereinigung der HTML-Eingabe
- Verwendung moderner Frameworks mit integriertem XSS-Schutz
- Validierung von URLs in Weiterleitungen
- Verwendung des HTTPOnly-Flags für sensible Cookies

### CSRF-Prävention

- Implementierung von Anti-CSRF-Token
- Verwendung von SameSite-Cookies Attribut
- Ursprungs- und Referrer-Header überprüfen
- Erneute Authentifizierung für sensible Aktionen erforderlich
- Korrekte CORS-Konfiguration verwenden

### Sicherheits-Header

- Content-Security-Policy (CSP)
- X-Content-Type-Options: nosniff
- Strict-Transport-Security (HSTS)
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy
- Cache-Control-Header für sensible Daten
- Clear-Site-Data für die Abmeldung

## Infrastruktursicherheit

### Serversicherheit

- Serversoftware aktuell halten
- Sichere Serverkonfigurationen verwenden
- Korrekte Firewall-Regeln implementieren
- Nur HTTPS aktivieren (HTTP auf HTTPS umleiten)
- Korrekte TLS-Einstellungen konfigurieren
- Unnötige Dienste deaktivieren
- Sicherheitsorientierte Webserver-Module verwenden
- Ratenbegrenzung und DDoS-Schutz implementieren

### API Sicherheit

- HTTPS für alle API-Endpunkte verwenden
- Korrekte Authentifizierung implementieren
- Ratenbegrenzung anwenden
- Anfrage-Payloads validieren
- Geeignete Statuscodes zurückgeben
- Sensible Informationen in Antworten vermeiden
- API-Schlüssel für die Kommunikation zwischen Diensten verwenden
- Sicherheitsanforderungen für API-Nutzer dokumentieren

### Abhängigkeitsmanagement

- Regelmäßig nach anfälligen Abhängigkeiten suchen
- Sperrdateien verwenden, um Abhängigkeitsversionen zu fixieren
- Automatisierte Schwachstellen-Scans implementieren
- Abhängigkeiten zeitnah aktualisieren
- Abhängigkeitsnutzung minimieren
- Abhängigkeitsintegrität (Prüfsummen) überprüfen
- Auf Angriffe in der Lieferkette achten
- Einen Plan zur Reaktion auf Schwachstellen erstellen

## Sicherheitstests

### Statische Analyse

- Automatisierte SAST-Tools implementieren
- Sicherheits-Linting in CI/CD integrieren
- Nach fest codierten Geheimnissen suchen
- Code auf Sicherheits-Anti-Patterns analysieren
- Sicherheitskonfigurationen validieren
- Auf veraltete Abhängigkeiten prüfen
- Sichere Programmierstandards durchsetzen

### Dynamisches Testen

– Regelmäßige Penetrationstests durchführen
– Automatisierte DAST-Scans implementieren
– Interaktive Anwendungssicherheitstests nutzen
– Regelmäßige Schwachstellenanalysen durchführen
– Authentifizierungs- und Autorisierungsabläufe testen
– Sicherheitsheader und -konfigurationen überprüfen
– Gängige Angriffsszenarien simulieren

## Sicherheitsüberwachung und -reaktion

### Protokollierung und Überwachung

– Umfassende Sicherheitsprotokollierung implementieren
– Authentifizierungsereignisse protokollieren
– Zugriffskontrollfehler protokollieren
– Auf verdächtige Aktivitäten achten
– Echtzeit-Warnmeldungen implementieren
– Zentralisierte Protokollverwaltung nutzen
– Manipulationssichere Protokolle sicherstellen
– Protokolle für angemessene Zeiträume aufbewahren

### Reaktion auf Vorfälle

– Einen Reaktionsplan für Vorfälle entwickeln
– Rollen und Verantwortlichkeiten definieren
– Kommunikationsprotokolle einrichten
– Verfahren zur Dokumentierung der Sicherheitseindämmung
– Forensische Analysefunktionen implementieren
– Nachträgliche Überprüfungen nach Vorfällen durchführen
– Szenarien für die Reaktion auf Vorfälle üben
– Kontakt zum Sicherheitspersonal halten Community

## Compliance & Datenschutz

### Einhaltung gesetzlicher Vorschriften

- Geltende Vorschriften (DSGVO, CCPA usw.) ermitteln
- Erforderliche Sicherheitskontrollen implementieren
- Regelmäßige Compliance-Bewertungen durchführen
- Compliance-Maßnahmen dokumentieren
- Team in den Compliance-Anforderungen schulen
- Datenschutz durch Technikgestaltung umsetzen
- Erforderliche Dokumentation pflegen

### Datenschutzaspekte

- Klare Datenschutzrichtlinien implementieren
- Einholung der Einwilligung zur Datenerhebung
- Mechanismen für Datenzugriff und -löschung bereitstellen
- Datenerhebung und -speicherung minimieren
- Datenportabilität implementieren
- Datenschutz-Folgenabschätzungen durchführen
- Datenschutz bei allen Designentscheidungen berücksichtigen