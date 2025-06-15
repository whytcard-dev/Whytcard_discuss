# Projektstrukturstandards

## Verzeichnisorganisation

### Stammstruktur

``` 
project-root/
├── src/ # Quellcode
├── public/ # Statische Assets
├── dist/ # Build-Ausgabe (generiert)
├── node_modules/ # Abhängigkeiten (generiert)
├── tests/ # Testdateien
├── docs/ # Dokumentation
├── .github/ # GitHub-Workflows und -Vorlagen
├── .vscode/ # VS Code-Konfiguration
├── scripts/ # Build- und Utility-Skripte
├── package.json # Projektmetadaten und -abhängigkeiten
├── tsconfig.json # TypeScript-Konfiguration 
├── .eslintrc.js # ESLint-Konfiguration 
├── .prettierrc # Prettier-Konfiguration 
├── .gitignore # Git-Ignoriermuster 
├── .env.example # Beispielumgebungsvariablen 
└── README.md # Projektdokumentation 
``` 

### Quellverzeichnisstruktur 

``` 
src/ 
├── assets/ # Statische Assets, die verarbeitet werden müssen 
│ ├── images/ # Bilder 
│ ├── fonts/ # Schriftdateien 
│ └── styles/ # Globale Stile 
│ 
├── components/ # Wiederverwendbar UI-Komponenten
│ ├── common/ # Gemeinsame Komponenten für alle Features
│ ├── layout/ # Layout-Komponenten
│ └── ui/ # Grundlegende UI-Komponenten
│ 
├── hooks/ # Benutzerdefinierte React-Hooks
│ 
├── pages/ # Seitenkomponenten / Routenkomponenten
│ 
├── features/ # Feature-basierte Module
│ ├── feature1/ # Spezifisches Feature
│ │ ├── components/ # Feature-spezifische Komponenten
│ │ ├── hooks/ # Feature-spezifische Hooks
│ │ ├── api/ # Feature-spezifische API calls 
│ │ ├── utils/ # Featurespezifische Dienstprogramme 
│ │ ├── types/ # Featurespezifische Typen 
│ │ └── index.ts # Featureexporte 
│ └── feature2/ # Weiteres Feature 
│ 
├── services/ # Serviceintegrationen 
│ ├── api/ # API-Client und -Endpunkte 
│ ├── auth/ # Authentifizierungsdienst 
│ └── analytics/ # Analysedienst 
│ 
├── store/ # Statusverwaltung 
│ ├── slices/ # Redux-Slices oder Kontextanbieter 
│ ├── actions/ # Aktionsersteller 
│ └── selectors/ # Statusselektoren 
│ 
├── utils/ # Hilfsfunktionen 
│ ├── formatting/ # Formatierungshilfsprogramme 
│ ├── validation/ # Validierungshilfsprogramme 
│ └── helpers/ # Hilfsfunktionen 
│ 
├── types/ # TypeScript-Typdefinitionen 
│ ├── api/ # API-Antworttypen 
│ ├── models/ # Datenmodelltypen 
│ └── common/ # Gemeinsame Typdefinitionen 
│ 
├── constants/ # Anwendung Konstanten 
│ 
├── i18n/ # Internationalisierung 
│ ├── locales/ # Übersetzungsdateien 
│ └── config.ts # i18n-Konfiguration 
│ 
├── config/ # App-Konfiguration 
│ ├── routes.ts # Routendefinitionen 
│ └── settings.ts # App-Einstellungen 
│ 
└── App.tsx # Hauptanwendungskomponente 
``` 

## Namenskonventionen 

### Dateien und Verzeichnisse 

- **React-Komponenten**: PascalCase mit Erweiterung 
- `Button.tsx`, `UserProfile.tsx` 
- **Hooks**: camelCase mit 'use' Präfix
- `useAuth.ts`, `useFetch.ts`
- **Dienstprogramme**: camelCase
- `formatDate.ts`, `validateEmail.ts`
- **Konstanten**: UPPER_SNAKE_CASE
- `API_ENDPOINTS.ts`, `ROUTE_PATHS.ts`
- **Typen/Schnittstellen**: PascalCase mit beschreibenden Namen
- `UserData.ts`, `ApiResponse.ts`
- **Testdateien**: Derselbe Name wie die zu testende Datei mit der Endung `.test` oder `.spec`
- `Button.test.tsx`, `formatDate.spec.ts`

### Komponentenorganisation

- **Komponentendateien**: Eine Komponente pro Datei
- **Komponentenstruktur**:
```tsx
// Importe
import React from 'react'; 
import './styles.css'; 

// Typen 
interface ButtonProps { 
// ... 
} 

// Komponente 
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => { 
// ... 
return ( 
// JSX 
); 
}; 

// Komponentenspezifische Hilfsfunktionen 
const helperFunction = () => { 
// ... 
}; 
``` 

## Modulorganisation 

### Importreihenfolge 

1. Externe Bibliotheken 
2. Interne Module 
3. Komponenten 
4. Hooks 
5. Dienstprogramme 
6. Typen 
7. Assets/Stile 

Beispiel: 
```tsx 
// Externe Bibliotheken 
import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

// Interne Module 
import { API_ENDPOINTS } from '@/constants/api'; 
import { fetchData } from '@/services/api'; 

// Komponenten 
import { Button } from '@/components/ui'; 
import { Modal } from '@/components/common'; 

// Hooks 
import { useAuth } from '@/hooks'; 

// Dienstprogramme 
import { formatDate } from '@/utils/formatting'; 

// Typen 
import type { UserData } from '@/types'; 

// Assets/Stile 
import './styles.css'; 
``` 

### Exportmuster 

- Benannte Exporte für die meisten Komponenten und Funktionen verwenden 
- Barrel-Exporte (index.ts) verwenden, um Importe zu vereinfachen 
- Standardexporte außer für Seitenkomponenten vermeiden 

Beispiel für einen Barrel-Export: 
```tsx 
// components/ui/index.ts 
export * from './Button'; 
export * from './Input'; 
export * from './Card'; 
``` 

## Konfigurationsdateien

### Umgebungsvariablen

- Verwenden Sie `.env`-Dateien für umgebungsspezifische Konfigurationen.
- Fügen Sie `.env.example` in die Dokumentation ein.
- Verwenden Sie umgebungsspezifische Dateien (`.env.development`, `.env.production`).
- Übergeben Sie niemals sensible Werte an die Versionskontrolle.

### TypeScript-Konfiguration

- Verwenden Sie den strikten Modus.
- Konfigurieren Sie Pfadaliase für sauberere Importe.
- Separate Konfigurationen für verschiedene Umgebungen, falls erforderlich.
- Dokumentieren Sie nicht offensichtliche Konfigurationsoptionen.

### Paketverwaltung

- Verwenden Sie eine Sperrdatei (package-lock.json, yarn.lock, pnpm-lock.yaml).
- Dokumentieren Sie die erforderliche Node.js-Version.
- Gruppieren Sie Abhängigkeiten logisch in package.json.
- Trennen Sie Entwicklungs- von Produktionsabhängigkeiten.

## Dokumentation

### Codedokumentation

- Dokumentieren Sie komplexe Funktionen und Komponenten.
- Verwenden Sie JSDoc für Funktionen. Dokumentation
- Dokumentieren Sie Props für React-Komponenten
- Fügen Sie Beispiele für wiederverwendbare Komponenten hinzu
- Dokumentieren Sie Muster für die Zustandsverwaltung

### Projektdokumentation

- Fügen Sie eine umfassende README.md hinzu
- Dokumentieren Sie den Einrichtungs- und Installationsprozess
- Fügen Sie Anweisungen zum Entwicklungs-Workflow hinzu
- Dokumentieren Sie den Erstellungs- und Bereitstellungsprozess
- Führen Sie eine CHANGELOG.md für den Versionsverlauf
- Fügen Sie Richtlinien für Beiträge hinzu

## Best Practices

- Gruppieren Sie zusammengehörige Dateien
- Halten Sie Komponentendateien klein und fokussiert
- Trennen Sie Geschäftslogik von UI-Komponenten
- Verwenden Sie Pfadaliase, um tiefe Importpfade zu vermeiden
- Sorgen Sie für eine konsistente Dateiorganisation im gesamten Projekt
- Dokumentieren Sie die Projektstruktur für neue Teammitglieder
- Nutzen Sie gegebenenfalls Codegeneratoren für Konsistenz
- Überprüfen und refaktorieren Sie die Projektstruktur regelmäßig