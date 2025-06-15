# Standard di struttura del progetto

## Organizzazione delle directory

### Struttura radice

``` 
project-root/
├── src/ # Codice sorgente
├── public/ # Risorse statiche
├── dist/ # Output di build (generato)
├── node_modules/ # Dipendenze (generate)
├── tests/ # File di test
├── docs/ # Documentazione
├── .github/ # Flussi di lavoro e modelli GitHub
├── .vscode/ # Configurazione di VS Code
├── scripts/ # Script di build e utilità
├── package.json # Metadati del progetto e dipendenze
├── tsconfig.json # Configurazione TypeScript
├── .eslintrc.js # Configurazione ESLint
├── .prettierrc # Configurazione Prettier
├── .gitignore # Pattern di ignoranza Git
├── .env.example # Variabili d'ambiente di esempio
└── README.md # Documentazione del progetto
``` 

### Struttura della directory sorgente

``` 
src/
├── assets/ # Risorse statiche che richiedono elaborazione
│ ├── images/ # Immagini
│ ├── fonts/ # File di font
│ └── styles/ # Globale stili
│ 
├── componenti/ # Componenti UI riutilizzabili
│ ├── comuni/ # Componenti condivisi tra le funzionalità
│ ├── layout/ # Componenti di layout
│ └── ui/ # Componenti UI di base
│ 
├── hooks/ # Hook React personalizzati
│ 
├── pagine/ # Componenti di pagina / componenti di percorso
│ 
├── funzionalità/ # Moduli basati sulle funzionalità
│ ├── funzionalità1/ # Funzionalità specifica
│ │ ├── componenti/ # Componenti specifici delle funzionalità
│ │ ├── ganci/ # Hook specifici delle funzionalità
│ │ ├── api/ # Chiamate API specifiche per funzionalità
│ │ ├── utils/ # Utilità specifiche per funzionalità
│ │ ├── types/ # Tipi specifici per funzionalità
│ │ └── index.ts # Esportazioni di funzionalità
│ └── feature2/ # Altra funzionalità
│ 
├── services/ # Integrazioni di servizi
│ ├── api/ # Client API ed endpoint
│ ├── auth/ # Servizio di autenticazione
│ └── analytics/ # Servizio di analisi
│ 
├── store/ # Gestione dello stato
│ ├── slice/ # Slice Redux o provider di contesto
│ ├── actions/ # Creatori di azioni
│ └── selectors/ # Selettori di stato
│ 
├── utils/ # Funzioni di utilità
│ ├── formatting/ # Utilità di formattazione
│ ├── validation/ # Utilità di convalida
│ └── helpers/ # Funzioni di supporto
│ 
├── types/ # Definizioni di tipo TypeScript
│ ├── api/ # Tipi di risposta API
│ ├── models/ # Tipi di modello di dati
│ └── common/ # Tipo comune definizioni
│ 
├── costanti/ # Costanti dell'applicazione
│ 
├── i18n/ # Internazionalizzazione
│ ├── locales/ # File di traduzione
│ └── config.ts # Configurazione i18n
│ 
├── config/ # Configurazione dell'app
│ ├── routes.ts # Definizioni delle rotte
│ └── settings.ts # Impostazioni dell'app
│ 
└── App.tsx # Componente principale dell'applicazione
``` 

## Convenzioni di denominazione

### File e directory

- **Componenti React**: PascalCase con estensione
- `Button.tsx`, `UserProfile.tsx`
- **Hook**: camelCase con prefisso 'use'
- `useAuth.ts`, `useFetch.ts`
- **Utilità**: camelCase
- `formatDate.ts`, `validateEmail.ts`
- **Costanti**: UPPER_SNAKE_CASE
- `API_ENDPOINTS.ts`, `ROUTE_PATHS.ts`
- **Tipi/Interfacce**: PascalCase con nomi descrittivi
- `UserData.ts`, `ApiResponse.ts`
- **File di test**: Stesso nome del file in fase di test con suffisso `.test` o `.spec`
- `Button.test.tsx`, `formatDate.spec.ts`

### Organizzazione dei componenti

- **File dei componenti**: Un componente per file
- **Struttura dei componenti**:
```tsx
// Importa
import React from 'react'; 
import './styles.css'; 

// Tipi 
interfaccia ButtonProps { 
// ... 
} 

// Componente 
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => { 
// ... 
return ( 
// JSX 
); 
}; 

// Funzioni helper specifiche di questo componente 
const helperFunction = () => { 
// ... 
}; 
``` 

## Organizzazione dei moduli

### Ordine di importazione

1. Librerie esterne
2. Moduli interni
3. Componenti
4. Hook
5. Utility
6. Tipi
7. Asset/stili

Esempio:
```tsx
// Librerie esterne
import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

// Moduli interni
import { API_ENDPOINTS } from '@/constants/api';
import { fetchData } from '@/services/api';

// Componenti
import { Button } from '@/components/ui';
import { Modal } from '@/components/common';

// Hooks
import { useAuth } from '@/hooks';

// Utilità
import { formatDate } from '@/utils/formatting';

// Tipi
import type { UserData } from '@/types';

// Risorse/stili
import './styles.css';
```

### Modelli di esportazione

- Utilizzare esportazioni con nome per la maggior parte dei componenti e delle funzioni
- Utilizzare esportazioni barrel (index.ts) per semplificare le importazioni
- Evitare esportazioni predefinite, ad eccezione dei componenti di pagina

Esempio di esportazione barrel:
```tsx
// componenti/ui/index.ts
export * from './Button';
export * from './Input';
export * from './Card';
``` 

## File di configurazione

### Variabili d'ambiente

- Utilizzare file `.env` per la configurazione specifica dell'ambiente
- Includere `.env.example` con la documentazione
- Utilizzare file specifici dell'ambiente (`.env.development`, `.env.production`)
- Non inviare mai valori sensibili al controllo di versione

### Configurazione TypeScript

- Utilizzare la modalità strict
- Configurare alias di percorso per importazioni più pulite
- Separare le configurazioni per ambienti diversi, se necessario
- Documentare le scelte di configurazione non ovvie

### Gestione dei pacchetti

- Utilizzare un file di lock (package-lock.json, yarn.lock, pnpm-lock.yaml)
- Documentare la versione richiesta di Node.js
- Raggruppare le dipendenze in modo logico in package.json
- Separare le dipendenze di sviluppo da quelle di produzione

## Documentazione

### Documentazione del codice

- Documentare funzioni complesse e Componenti
- Utilizzare JSDoc per la documentazione delle funzioni
- Documentare le proprietà per i componenti React
- Includere esempi di componenti riutilizzabili
- Documentare i modelli di gestione dello stato

### Documentazione del progetto

- Includere un file README.md completo
- Documentare il processo di configurazione e installazione
- Includere le istruzioni per il flusso di lavoro di sviluppo
- Documentare il processo di build e deployment
- Mantenere un file CHANGELOG.md per la cronologia delle versioni
- Includere le linee guida per i contributi

## Best Practice

- Raggruppare i file correlati
- Mantenere i file dei componenti piccoli e mirati
- Separare la logica di business dai componenti dell'interfaccia utente
- Utilizzare alias di percorso per evitare percorsi di importazione complessi
- Mantenere un'organizzazione dei file coerente in tutto il progetto
- Documentare la struttura del progetto per i nuovi membri del team
- Utilizzare generatori di codice per garantire la coerenza, ove applicabile
- Rivedere e rielaborare periodicamente la struttura del progetto