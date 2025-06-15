# Projektstrukturstandarder

## Katalogorganisation

### Rotstruktur

```
project-root/
├── src/ # Källkod
├── public/ # Statiska resurser
├── dist/ # Byggresultat (genererat)
├── node_modules/ # Beroenden (genererat)
├── tests/ # Testfiler
├── docs/ # Dokumentation
├── .github/ # GitHub-arbetsflöden och mallar
├── .vscode/ # VS Code-konfiguration
├── skript/ # Bygg- och verktygsskript
├── package.json # Projektmetadata och beroenden
├── tsconfig.json # TypeScript-konfiguration 
├── .eslintrc.js # ESLint-konfiguration 
├── .prettierrc # Prettier-konfiguration 
├── .gitignore # Git ignore patterns 
├── .env.example # Exempel på miljövariabler 
└── README.md # Projektdokumentation 
``` 

### Källkatalogstruktur 

``` 
src/ 
├── assets/ # Statiska tillgångar som kräver bearbetning 
│ ├── images/ # Bilder 
│ ├── fonts/ # Teckensnittsfiler 
│ └── styles/ # Globala stilar 
│ 
├── components/ # Återanvändbara UI-komponenter 
│ ├── gemensamt/ # Delade komponenter över funktioner 
│ ├── layout/ # Layoutkomponenter 
│ └── ui/ # Grundläggande UI-komponenter 
│ 
├── hooks/ # Anpassade React-hooks 
│ 
├── sidor/ # Sidkomponenter / ruttkomponenter 
│ 
├── funktioner/ # Funktionsbaserade moduler 
│ ├── funktion1/ # Specifik funktion 
│ │ ├── komponenter/ # Funktionsspecifika komponenter 
│ │ ├── hooks/ # Funktionsspecifika hooks 
│ │ ├── api/ # Funktionsspecifika API-anrop 
│ │ ├── verktyg/ # Funktionsspecifika verktyg 
│ │ ├── typer/ # Funktionsspecifika typer 
│ │ └── index.ts # Funktionsexporter 
│ └── feature2/ # En annan funktion 
│ 
├── tjänster/ # Tjänsteintegrationer 
│ ├── api/ # API-klient och slutpunkter 
│ ├── aut/ # Autentiseringstjänst 
│ └── analys/ # Analystjänst 
│ 
├── store/ # Tillståndshantering 
│ ├── skivor/ # Redux-skivor eller kontextleverantörer 
│ ├── åtgärder/ # Åtgärd skapare 
│ └── selektorer/ # Tillståndsselekter 
│ 
├── verktyg/ # Verktygsfunktioner 
│ ├── formatering/ # Formateringsverktyg 
│ ├── validering/ # Valideringsverktyg 
│ └── hjälpfunktioner/ # Hjälpfunktioner 
│ 
├── typer/ # TypeScript-typdefinitioner 
│ ├── api/ # API-svarstyper 
│ ├── modeller/ # Datamodelltyper 
│ └── vanliga/ # Vanliga typdefinitioner 
│ 
├── konstanter/ # Applikationskonstanter 
│ 
├── i18n/ # Internationalisering 
│ ├── språk/ # Översättningsfiler 
│ └── config.ts # i18n-konfiguration 
│ 
├── config/ # Appkonfiguration 
│ ├── routes.ts # Ruttdefinitioner 
│ └── settings.ts # Appinställningar 
│ 
└── App.tsx # Huvudkomponent i applikationen 
``` 

## Namngivningskonventioner 

### Filer och kataloger 

- **React-komponenter**: PascalCase med tillägget 
- `Button.tsx`, `UserProfile.tsx` 
- **Hooks**: camelCase med prefixet 'use' 
- `useAuth.ts`, `useFetch.ts` 
- **Verktyg**: camelCase 
- `formatDate.ts`, `validateEmail.ts` 
- **Konstanter**: UPPER_SNAKE_CASE 
- `API_ENDPOINTS.ts`, `ROUTE_PATHS.ts` 
- **Typer/Gränssnitt**: PascalCase med beskrivande namn 
- `UserData.ts`, `ApiResponse.ts` 
- **Testfiler**: Samma namn som filen som testas med suffixet `.test` eller `.spec` 
- `Button.test.tsx`, `formatDate.spec.ts` 

### Komponentorganisation 

- **Komponentfiler**: En komponent per fil 
- **Komponentstruktur**: 
```tsx 
// Importerar 
importera React från 'react'; 
importera './styles.css'; 

// Typer 
interface ButtonProps { 
// ... 
} 

// Komponent 
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => { 
// ... 
return ( 
// JSX 
); 
}; 

// Hjälpfunktioner specifika för denna komponent 
const helperFunction = () => { 
// ... 
}; 
``` 

## Modulorganisation 

### Importordning 

1. Externa bibliotek 
2. Interna moduler 
3. Komponenter 
4. Hooks 
5. Verktyg 
6. Typer 
7. Tillgångar/stilar 

Exempel: 
```tsx 
// Externa bibliotek 
import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

// Interna moduler 
import { API_ENDPOINTS } från '@/constants/api'; 
import { fetchData } från '@/services/api'; 

// Komponenter 
import { Button } från '@/components/ui'; 
import { Modal } från '@/components/common'; 

// Hooks 
import { useAuth } från '@/hooks'; 

// Verktyg 
import { formatDate } från '@/utils/formatting'; 

// Typer 
import type { UserData } från '@/types'; 

// Tillgångar/stilar 
import './styles.css'; 
``` 

### Exportmönster 

- Använd namngivna exporter för de flesta komponenter och funktioner 
- Använd barrel-exporter (index.ts) för att förenkla importer 
- Undvik standardexporter förutom för sidkomponenter 

Exempel på barrel-export: 
```tsx 
// components/ui/index.ts 
export * from './Button'; 
export * from './Input'; 
export * from './Card'; 
``` 

## Konfigurationsfiler 

### Miljövariabler 

- Använd `.env`-filer för miljöspecifik konfiguration 
- Inkludera `.env.example` i dokumentationen 
- Använd miljöspecifika filer (`.env.development`, `.env.production`) 
- Spara aldrig känsliga värden i versionshantering 

### TypeScript-konfiguration 

- Använd strict-läge 

- Konfigurera sökvägsalias för renare importer 
- Separera konfigurationer för olika miljöer vid behov 
- Dokumentera icke-uppenbara konfigurationsval 

### Pakethantering 

- Använd en låsfil (package-lock.json, yarn.lock, pnpm-lock.yaml) 
- Dokumentera obligatorisk Node.js-version 
- Gruppera beroenden logiskt i package.json 
- Separera utvecklingsberoenden från produktionsberoenden 

## Dokumentation 

### Koddokumentation 

- Dokumentera komplexa funktioner och komponenter 
- Använd JSDoc för funktionsdokumentation 
- Dokumentera props för React komponenter
- Inkludera exempel på återanvändbara komponenter
- Mönster för dokumenthantering

### Projektdokumentation

- Inkludera en omfattande README.md
- Processen för dokumentkonfiguration och installation
- Inkludera instruktioner för utvecklingsarbetsflödet
- Processen för dokumentbyggande och distribution
- Underhåll en CHANGELOG.md för versionshistorik
- Inkludera riktlinjer för bidragande

## Bästa praxis

- Gruppera relaterade filer
- Håll komponentfilerna små och fokuserade
- Separera affärslogik från UI-komponenter
- Använd sökvägsalias för att undvika djupa importsökvägar
- Upprätthåll konsekvent filorganisation i hela projektet
- Dokumentera projektstruktur för nya teammedlemmar
- Använd kodgeneratorer för konsekvens när det är tillämpligt
- Granska och omstrukturera projektstrukturen regelbundet