# Standard di qualità del codice

## Principi fondamentali

- Scrivere codice pulito, manutenibile e autodocumentante
- Seguire i principi SOLID e DRY
- Mantenere le funzioni piccole e mirate (singola responsabilità)
- Utilizzare nomi descrittivi per variabili, funzioni e classi
- Mantenere uno stile del codice coerente in tutto il progetto
- Documentare la logica complessa e le API pubbliche
- Scrivere codice per gli esseri umani, non solo per le macchine

## Standard JavaScript/TypeScript

### Configurazione TypeScript

- Utilizzare la modalità strict (`"strict": true`)
- Abilitare tutte le opzioni di controllo dei tipi consigliate
- Configurare la corretta risoluzione del modulo
- Impostare la versione di destinazione ECMAScript appropriata
- Specificare i modelli di inclusione/esclusione
- Utilizzare alias di percorso per importazioni più pulite

### Convenzioni di denominazione

- **Variabili/Funzioni**: camelCase (`getUserData`, `calculateTotal`)
- **Classi/Interfacce/Tipi**: PascalCase (`UserProfile`, `ApiResponse`)
- **Costanti**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`, `API_URL`)
- **Proprietà private**: utilizzare il prefisso `#` o la convenzione `_` (`#privateField`, `_privateMethod`)
- **Variabili booleane**: utilizzare i prefissi "is", "has", "can" (`isActive`, `hasPermission`)
- **File dei componenti**: PascalCase con estensione (`UserCard.tsx`)
- **File di utilità**: camelCase con estensione (`formatDate.ts`)

### Organizzazione del codice

- Una classe/componente per file
- Raggruppare le importazioni per esterno/interno
- Ordinare le importazioni in ordine alfabetico
- Utilizzare esportazioni barrel (`index.ts`) per funzionalità correlate
- Organizzare il codice per funzionalità/modulo
- Mantenere i file sotto i 400 righe (dividi se più lunghe)
- Mantieni le funzioni sotto le 50 righe
- Annidamento massimo: 3-4 livelli di profondità

### Best Practice

- Preferisci l'immutabilità (const, readonly, Object.freeze)
- Usa il concatenamento opzionale e la coalescenza nullish
- Implementa una corretta gestione degli errori
- Evita qualsiasi tipo tranne quando necessario
- Usa le protezioni dei tipi per il controllo dei tipi a runtime
- Preferisci async/await alle promesse raw
- Evita numeri magici e stringhe (usa costanti)
- Implementa controlli null/undefined corretti
- Usa ritorni anticipati per ridurre l'annidamento

## Standard React

### Struttura dei componenti

- Preferisci componenti funzionali con hook
- Usa esportazioni denominate per i componenti
- Implementa la convalida delle prop con TypeScript
- Estrai la logica complessa in hook personalizzati
- Mantieni i componenti focalizzati sulle problematiche dell'interfaccia utente
- Implementa limiti di errore corretti
- Usa React.memo per l'ottimizzazione delle prestazioni
- Estrai riutilizzabile Componenti

### Gestione dello Stato

- Utilizzare lo stato locale per i dati specifici del componente
- Utilizzare il contesto per lo stato condiviso tra i componenti
- Considerare la gestione dello stato esterna per app complesse
- Mantenere lo stato normalizzato e minimale
- Implementare un'inizializzazione dello stato corretta
- Utilizzare reducer per logiche di stato complesse
- Evitare il drill delle prop (utilizzare composizione o contesto)

### Ottimizzazione delle prestazioni

- Utilizzare React.memo per componenti puri
- Implementare useMemo per calcoli complessi
- Utilizzare useCallback per la memorizzazione delle funzioni
- Virtualizzare liste lunghe (react-window, react-virtualized)
- Implementare array di dipendenze corretti negli hook
- Evitare ri-rendering non necessari
- Utilizzare React Profiler per identificare i colli di bottiglia

## Standard di test

### Test unitari

- Testare tutta la logica di business e le utility
- Utilizzare Jest o Vitest come test runner
- Implementare un mocking corretto delle dipendenze
- Utilizzare la libreria di test Per il test dei componenti
- Seguire il pattern AAA (Arrange, Act, Assert)
- Scrivere nomi di test descrittivi
- Puntare a una copertura del codice >80%
- Testare casi limite e scenari di errore

### Test di integrazione

- Testare le interazioni dei componenti
- Testare gli invii dei moduli e i flussi utente
- Utilizzare MSW per il mocking delle API
- Testare il routing e la navigazione
- Verificare i cambiamenti di stato
- Testare con dati realistici

### Test end-to-end

- Utilizzare Cypress o Playwright
- Testare i percorsi utente critici
- Testare su più browser
- Implementare un corretto isolamento dei test
- Utilizzare attributi dei dati per i selettori di test
- Implementare la logica di retry per i test instabili
- Testare l'accessibilità

## Standard di revisione del codice

### Processo

- Tutto il codice deve essere revisionato prima del merge
- I controlli automatici devono essere superati prima della revisione
- Utilizzare modelli di pull request
- Mantenere le richieste di pull brevi e mirate
- Rispondere tempestivamente ai commenti di revisione
- Risolvere tutti i commenti prima dell'unione
- Risolvere i commit prima dell'unione

### Checklist di revisione

- Il codice segue gli standard del progetto
- I test sono inclusi e superati
- La documentazione è aggiornata
- Nessuna vulnerabilità di sicurezza
- Implicazioni sulle prestazioni considerate
- Requisiti di accessibilità soddisfatti
- Casi limite gestiti
- Nessun codice o dipendenze non necessari

## Strumenti

### Linting e formattazione

- ESLint con regole appropriate
- Prettier per una formattazione coerente
- Husky per hook pre-commit
- Lint-staged per linting incrementale
- Compilatore TypeScript per il controllo dei tipi
- Stylelint per CSS/SCSS

### Analisi statica

- SonarQube o CodeClimate
- Monitoraggio delle metriche di complessità
- Rilevamento del codice duplicato
- Scansione delle vulnerabilità di sicurezza
- Analisi delle dimensioni del bundle
- Codice inutilizzato Rilevamento

### Integrazione CI/CD

- Esecuzione di tutti i controlli su ogni PR
- Unione dei blocchi in caso di fallimento dei controlli
- Generazione e pubblicazione di report sulla copertura dei test
- Implementazione di test di regressione delle prestazioni
- Automatizzazione degli aggiornamenti delle dipendenze
- Distribuzione di ambienti di anteprima