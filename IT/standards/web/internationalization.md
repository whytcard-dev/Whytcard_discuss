# Standard di Internazionalizzazione (i18n)

## Principi Fondamentali

- Progettare per un pubblico globale fin dall'inizio
- Separare il contenuto dal codice
- Supportare più lingue e impostazioni locali
- Rispettare le differenze e le sensibilità culturali
- Implementare il rilevamento automatico della lingua
- Consentire la selezione manuale della lingua
- Testare con utenti reali provenienti da mercati target

## Lingua e Contenuto

### Gestione del Testo

- Memorizzare tutto il testo rivolto all'utente in file di risorse
- Non codificare mai stringhe di testo nei componenti
- Utilizzare chiavi descrittive univoche per le risorse di testo
- Organizzare le traduzioni per funzionalità o pagina
- Supportare le regole di pluralizzazione per diverse lingue
- Gestire le varianti specifiche per genere
- Supportare le lingue da destra a sinistra (RTL)
- Implementare meccanismi di fallback per le traduzioni mancanti

### Processo di Traduzione

- Fornire contesto ai traduttori
- Includere descrizioni segnaposto/variabili
- Utilizzare servizi di traduzione professionali
- Implementare sistemi di memoria di traduzione
- Consentire l'espansione del testo (alcune lingue richiedono più spazio)
- Fornire screenshot per il contesto
- Implementare un processo di revisione per le traduzioni
- Supportare aggiornamenti continui delle traduzioni

### Considerazioni sui contenuti

- Evitare metafore o modi di dire culturalmente specifici
- Essere consapevoli del simbolismo dei colori nelle diverse culture
- Considerare diversi formati di nomi e standard di indirizzo
- Rispettare la sensibilità e i tabù culturali
- Adattare i contenuti ai mercati locali quando necessario
- Utilizzare immagini culturalmente neutre
- Considerare la direzione di lettura (LTR vs RTL)
- Evitare slang e colloquialismi

## Implementazione tecnica

### Framework e librerie

- Utilizzare librerie i18n consolidate:
- react-i18next / i18next (React)
- vue-i18n (Vue)
- angular/localize (Angular)
- next-intl (Next.js)
- Format.js (React)
- Implementare il rilevamento della lingua corretto
- Supportare il cambio di lingua senza ricaricamento della pagina
- Configurare le lingue di fallback
- Implementare il caricamento differito per le traduzioni
- Memorizzare le traduzioni nella cache per migliorare le prestazioni
- Supportare chiavi di traduzione nidificate
- Implementare la pluralizzazione e la formattazione

### Struttura del codice

- Separare i file di traduzione per lingua
- Utilizzare JSON o YAML per le risorse di traduzione
- Implementare namespace per applicazioni di grandi dimensioni
- Mantenere le chiavi di traduzione organizzate e gestibili
- Seguire convenzioni di denominazione coerenti per le chiavi
- Documentare formattazioni o variabili speciali
- Implementare la sicurezza dei tipi per le chiavi di traduzione (TypeScript)
- Supportare la generazione dinamica di chiavi quando necessario

### Formattazione

#### Data e ora

- Utilizzare librerie che supportano formati di data internazionali
- Visualizzare le date nel formato preferito dall'utente
- Considerare i fusi orari e l'ora legale
- Formattare le date in base alle convenzioni locali
- Supportare diversi sistemi di calendario quando necessario
- Utilizzare il formato ISO per lo scambio di dati
- Visualizzare l'ora relativa in modo appropriato cultura

#### Numeri e valute

- Formattare i numeri in base alle convenzioni locali
- Utilizzare separatori decimali e delle migliaia appropriati
- Formattare le valute con simboli appropriati
- Posizionare correttamente i simboli di valuta in base alle impostazioni locali
- Supportare diversi sistemi di numerazione
- Formattare le percentuali in base alle impostazioni locali
- Considerare i tassi di cambio per applicazioni multi-regione

#### Indirizzi e numeri di telefono

- Supportare diversi formati di indirizzo
- Supportare diversi formati di codice postale
- Gestire numeri di telefono internazionali (formato E.164)
- Formattare i numeri di telefono in base alle convenzioni locali
- Supportare diverse convenzioni di ordinamento dei nomi
- Considerare onorificenze e titoli in base alle diverse culture
- Convalidare gli indirizzi in base alle regole specifiche di ciascun paese

## Considerazioni sull'interfaccia utente

### Layout e design

- Progettare layout flessibili che consentano l'espansione del testo
- Supportare sia la direzione del testo LTR che RTL
- Implementare il supporto del testo bidirezionale (bidi)
- Testare i layout con stringhe di testo più lunghe
- Evitare la larghezza fissa Contenitori per il testo
- Considerare le variazioni di dimensione del carattere nelle diverse lingue
- Eseguire test con contenuti tradotti effettivi, non con Lorem Ipsum
- Implementare CSS specifici per la lingua quando necessario

### Tipografia

- Utilizzare font che supportano più lingue
- Includere fallback appropriati per i font
- Considerare set di caratteri per diverse lingue
- Supportare caratteri speciali e segni diacritici
- Regolare l'altezza delle righe per diversi alfabeti
- Testare la leggibilità nelle diverse lingue
- Considerare il testo verticale per alcune lingue dell'Asia orientale
- Utilizzare correttamente Unicode

### Navigazione e controlli

- Tradurre elementi e controlli di navigazione
- Regolare la navigazione per le lingue RTL (Regolazione della lingua di partenza)
- Considerare i modelli di lettura culturali
- Assicurarsi che le icone siano culturalmente neutre
- Testare le scorciatoie da tastiera nei diversi layout di tastiera
- Fornire assistenza e documentazione localizzate
- Tradurre messaggi di errore e notifiche
- Localizzare la funzionalità di ricerca

## Test e garanzia della qualità

### Strategia di test

- Testare con madrelingua
- Verificare le traduzioni nel contesto
- Test Espansione e troncamento del testo
- Convalida della formattazione di data, numero e valuta
- Testa accuratamente i layout RTL
- Verifica della funzionalità di cambio lingua
- Test con diverse impostazioni locali
- Implementa test i18n automatizzati

### Problemi comuni

- Verifica della presenza di stringhe hardcoded
- Verifica della corretta pluralizzazione
- Cerca stringhe concatenate
- Verifica di problemi di gestione Unicode
- Verifica di ordinamento e collazione
- Verifica di presupposti culturali nella logica
- Test con parole e stringhe lunghe
- Verifica della gestione dei caratteri speciali

### Strumenti e automazione

- Implementa il linting per i problemi i18n
- Utilizza sistemi di gestione delle traduzioni
- Automatizza la generazione di screenshot per il contesto
- Implementa la pseudo-localizzazione per i test
- Utilizza test automatizzati per i problemi di layout
- Monitora la copertura e la qualità della traduzione
- Implementa controlli CI/CD per i18n
- Monitora le traduzioni mancanti

## Legale e conformità

- Ricerca di informazioni legali locali Requisiti
- Adattare le policy sulla privacy alle diverse regioni
- Considerare il GDPR e altre normative sulla privacy
- Adattare i termini di servizio ai mercati locali
- Essere consapevoli delle restrizioni sui contenuti per paese
- Considerare i requisiti di accessibilità per regione
- Documentare le misure di conformità
- Consultare esperti legali per i mercati chiave