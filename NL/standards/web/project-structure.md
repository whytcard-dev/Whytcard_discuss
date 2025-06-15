# Projectstructuurstandaarden

## Directory-organisatie

### Rootstructuur

``` 
project-root/ 
├── src/ # Broncode
├── public/ # Statische assets
├── dist/ # Build-uitvoer (gegenereerd)
├── node_modules/ # Afhankelijkheden (gegenereerd)
├── tests/ # Testbestanden
├── docs/ # Documentatie
├── .github/ # GitHub-workflows en -sjablonen
├── .vscode/ # VS Code-configuratie
├── scripts/ # Build- en utilityscripts
├── package.json # Projectmetadata en Afhankelijkheden
├── tsconfig.json # TypeScript-configuratie
├── .eslintrc.js # ESLint-configuratie
├── .prettierrc # Prettier-configuratie
├── .gitignore # Git-negeerpatronen
├── .env.example # Voorbeeldomgevingsvariabelen
└── README.md # Projectdocumentatie

``` 

### Bronmapstructuur

``` 
src/ 
├── assets/ # Statische assets die verwerking vereisen
│ ├── images/ # Afbeeldingen
│ ├── fonts/ # Lettertypebestanden
│ └── styles/ # Globaal stijlen
│ 
├── componenten/ # Herbruikbare UI-componenten
│ ├── common/ # Gedeelde componenten over functies heen
│ ├── layout/ # Lay-outcomponenten
│ └── ui/ # Basis UI-componenten
│ 
├── hooks/ # Aangepaste React-hooks
│ 
├── pages/ # Paginacomponenten / routecomponenten
│ 
├── features/ # Functiegebaseerde modules
│ ├── feature1/ # Specifieke functie
│ │ ├── componenten/ # Functiespecifieke componenten
│ │ ├── hooks/ # Functiespecifieke hooks
│ │ ├── api/ # Functiespecifieke API-aanroepen
│ │ ├── utils/ # Functiespecifieke hulpprogramma's
│ │ ├── types/ # Functiespecifieke typen
│ │ └── index.ts # Functie-exporten
│ └── feature2/ # Een andere functie
│ 
├── services/ # Service-integraties
│ ├── api/ # API-client en eindpunten
│ ├── auth/ # Authenticatieservice
│ └── analytics/ # Analyseservice
│ 
├── store/ # Statusbeheer
│ ├── slices/ # Redux slices of contextproviders
│ ├── actions/ # Actiemakers
│ └── selectors/ # Statusselectors
│ 
├── utils/ # Hulpprogramma's
│ ├── formatting/ # Opmaakhulpprogramma's
│ ├── validation/ # Validationhulpprogramma's
│ └── helpers/ # Hulpprogramma's
│ 
├── types/ # TypeScript-typedefinities
│ ├── api/ # API-responstypen
│ ├── models/ # Gegevensmodeltypen
│ └── common/ # Algemeen type definities
│ 
├── constanten/ # Applicatieconstanten
│ 
├── i18n/ # Internationalisatie
│ ├── locales/ # Vertaalbestanden
│ └── config.ts # i18n-configuratie
│ 
├── config/ # App-configuratie
│ ├── routes.ts # Routedefinities
│ └── settings.ts # App-instellingen
│ 
└── App.tsx # Hoofdcomponent van de applicatie
``` 

## Naamgevingsconventies

### Bestanden en mappen

- **React-componenten**: PascalCase met extensie
- `Button.tsx`, `UserProfile.tsx`
- **Hooks**: camelCase met het voorvoegsel 'use'
- `useAuth.ts`, `useFetch.ts`
- **Hulpprogramma's**: camelCase
- `formatDate.ts`, `validateEmail.ts`
- **Constanten**: UPPER_SNAKE_CASE
- `API_ENDPOINTS.ts`, `ROUTE_PATHS.ts`
- **Typen/Interfaces**: PascalCase met beschrijvende namen
- `UserData.ts`, `ApiResponse.ts`
- **Testbestanden**: Dezelfde naam als het geteste bestand met het achtervoegsel `.test` of `.spec`
- `Button.test.tsx`, `formatDate.spec.ts`

### Componentorganisatie

- **Component Bestanden**: Eén component per bestand
- **Componentstructuur**:

``tsx
// Imports
import React van 'react';
import './styles.css';

// Types
interface ButtonProps { 
// ... 
} 

// Component
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => { 
// ... 
return ( 
// JSX 
); 
}; 

// Hulpfuncties specifiek voor dit component
const helperFunction = () => { 
// ... 
}; ``` 

## Module-indeling

### Importvolgorde

1. Externe bibliotheken
2. Interne modules
3. Componenten
4. Hooks
5. Hulpprogramma's
6. Typen
7. Assets/stijlen

Voorbeeld:

```tsx
// Externe bibliotheken
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Interne modules
import { API_ENDPOINTS } from '@/constants/api';
import { fetchData } from '@/services/api';

// Componenten
import { Button } from '@/components/ui';
import { Modal } from '@/components/common';


// Hooks
import { useAuth } from '@/hooks';

// Hulpprogramma's
import { formatDate } from '@/utils/formatting';

// Types
import type { UserData } from '@/types';

// Assets/styles
import './styles.css';
``` 

### Exportpatronen

- Gebruik benoemde exports voor de meeste componenten en functies
- Gebruik barrel-exports (index.ts) om imports te vereenvoudigen
- Vermijd standaard exports, behalve voor paginacomponenten

Voorbeeld barrel-export:

```tsx
// components/ui/index.ts
export * from './Button';
export * from './Input';
export * from './Card';
``` 

## Configuratiebestanden

### Omgevingsvariabelen

- Gebruik `.env`-bestanden voor omgevingsspecifieke configuratie
- Voeg `.env.example` toe aan de documentatie
- Gebruik omgevingsspecifieke bestanden (`.env.development`, `.env.production`)
- Leg nooit gevoelige waarden vast in versiebeheer

### TypeScript-configuratie

- Gebruik de strikte modus
- Configureer padaliassen voor schonere imports
- Scheid configuraties voor verschillende omgevingen indien nodig
- Documenteer niet-voor-de-hand-liggende configuratiekeuzes

### Pakketbeheer

- Gebruik een lockbestand (package-lock.json, yarn.lock, pnpm-lock.yaml)
- Documenteer de vereiste Node.js-versie
- Groepeer afhankelijkheden logisch in package.json
- Scheid dev-afhankelijkheden van productie-afhankelijkheden

## Documentatie

### Codedocumentatie

- Documenteer complexe functies en componenten
- Gebruik JSDoc voor functiedocumentatie
- Documentprops voor React-componenten
- Voorbeelden van herbruikbare componenten
- Patronen voor documentstatusbeheer

### Projectdocumentatie

- Een uitgebreide README.md toevoegen
- Het installatie- en configuratieproces documenteren
- Instructies voor de ontwikkelworkflow opnemen
- Het build- en implementatieproces documenteren
- Een CHANGELOG.md bijhouden voor de versiegeschiedenis
- Richtlijnen voor bijdragen opnemen

## Best practices

- Gerelateerde bestanden groeperen
- Componentbestanden klein en overzichtelijk houden
- Bedrijfslogica scheiden van UI-componenten
- Padaliassen gebruiken om diepe importpaden te voorkomen
- Een consistente bestandsorganisatie binnen het project behouden
- Projectstructuur documenteren voor nieuwe teamleden
- Codegenerators gebruiken voor consistentie indien van toepassing
- Projectstructuur periodiek controleren en herstructureren