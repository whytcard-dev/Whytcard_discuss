# Standard di sicurezza web

## Principi fondamentali di sicurezza

- Difesa in profondità (livelli di sicurezza multipli)
- Principio del privilegio minimo
- Sicurezza per progettazione e impostazione predefinita
- Test e audit di sicurezza regolari
- Mantenere aggiornate le dipendenze di sicurezza
- Fail safe (impostazioni predefinite sicure)
- Mediazione completa (verifica di ogni richiesta)
- Formazione sulla sicurezza per tutti i membri del team

## Autenticazione e autorizzazione

### Autenticazione

- Implementare policy per password complesse
- Lunghezza minima: 12 caratteri
- Richiedere una combinazione di caratteri, numeri e simboli
- Confrontare con gli elenchi di password più comuni
- Supportare l'autenticazione a più fattori (MFA)
- Utilizzare la gestione sicura delle sessioni
- Cookie solo HTTP
- Flag sicuro per HTTPS
- Attributo SameSite
- Scadenza appropriata
- Implementare il blocco dell'account dopo tentativi falliti
- Flussi di reimpostazione sicura della password
- Utilizzare un archivio sicuro delle password (bcrypt/Argon2)
- Valutare opzioni senza password (WebAuthn, link magici)

### Autorizzazione

- Implementare il controllo degli accessi basato sui ruoli (RBAC)
- Utilizzare il controllo degli accessi basato sugli attributi per permessi complessi
- Convalidare l'autorizzazione a ogni richiesta
- Implementare controlli di controllo degli accessi adeguati
- Utilizzare una gestione sicura delle sessioni
- Implementare l'autorizzazione API (OAuth 2.0, JWT)
- Evitare riferimenti diretti agli oggetti
- Registrare tutti gli errori di controllo degli accessi

## Protezione dei dati

### Dati sensibili

- Identificare e classificare i dati sensibili
- Crittografare i dati sensibili a riposo
- Utilizzare TLS 1.3 per i dati in transito
- Implementare una corretta gestione delle chiavi
- Ridurre al minimo la raccolta di dati sensibili
- Applicare i principi di minimizzazione dei dati
- Implementare l'eliminazione sicura dei dati
- Utilizzare un archivio sicuro per chiavi API e segreti

### Convalida dell'input

- Convalidare tutti gli input lato server
- Utilizzare query parametriche per l'accesso al database
- Implementare l'input Sanificazione
- Convalidare tipi di dati, lunghezza e formato corretti
- Utilizzare liste consentite anziché liste negate
- Implementare la codifica dell'output specifica per il contesto
- Convalidare i caricamenti di file (tipo, dimensione, contenuto)
- Implementare la limitazione della velocità per gli input

## Prevenzione delle vulnerabilità comuni

### Prevenzione delle iniezioni

- Utilizzare query parametriche/istruzioni preparate
- Applicare ORM con escape appropriato
- Convalidare e sanificare tutti gli input
- Implementare la codifica dell'output contestuale
- Utilizzare API sicure che evitino l'iniezione dell'interprete

### Prevenzione XSS

- Implementare la Content Security Policy (CSP)
- Utilizzare la codifica automatica dell'output
- Applicare la codifica specifica per il contesto
- Sanificare l'input HTML
- Utilizzare framework moderni con protezione XSS integrata
- Convalidare gli URL nei reindirizzamenti
- Applicare il flag HTTPOnly ai cookie sensibili

### CSRF Prevenzione

- Implementare token anti-CSRF
- Utilizzare l'attributo cookie SameSite
- Verificare le intestazioni di origine e referrer
- Richiedere la riautenticazione per le azioni sensibili
- Utilizzare una configurazione CORS corretta

### Intestazioni di sicurezza

- Content-Security-Policy (CSP)
- X-Content-Type-Options: nosniff
- Strict-Transport-Security (HSTS)
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy
- Intestazioni Cache-Control per i dati sensibili
- Clear-Site-Data per la disconnessione

## Sicurezza dell'infrastruttura

### Sicurezza del server

- Mantenere aggiornato il software del server
- Utilizzare configurazioni server sicure
- Implementare regole firewall corrette
- Abilitare solo HTTPS (reindirizzare HTTP a HTTPS)
- Configurare le impostazioni TLS corrette
- Disabilitare i servizi non necessari
- Utilizzare Moduli server web incentrati sulla sicurezza
- Implementare la limitazione della velocità e la protezione DDoS

### Sicurezza API

- Utilizzare HTTPS per tutti gli endpoint API
- Implementare un'autenticazione adeguata
- Applicare la limitazione della velocità
- Convalidare i payload delle richieste
- Restituire codici di stato appropriati
- Evitare di esporre informazioni sensibili nelle risposte
- Utilizzare chiavi API per la comunicazione tra servizi
- Documentare i requisiti di sicurezza per i consumatori API

### Gestione delle dipendenze

- Eseguire regolarmente la scansione per individuare dipendenze vulnerabili
- Utilizzare file di lock per bloccare le versioni delle dipendenze
- Implementare la scansione automatizzata delle vulnerabilità
- Aggiornare le dipendenze tempestivamente
- Ridurre al minimo l'utilizzo delle dipendenze
- Verificare l'integrità delle dipendenze (checksum)
- Monitorare gli attacchi alla catena di approvvigionamento
- Avere un piano di risposta alle vulnerabilità

## Test di sicurezza

### Analisi statica

- Implementare strumenti SAST automatizzati
- Integrare il linting di sicurezza in CI/CD
- Eseguire la scansione per elementi hardcoded segreti
- Analizzare il codice per individuare anti-pattern di sicurezza
- Convalidare le configurazioni di sicurezza
- Verificare la presenza di dipendenze obsolete
- Applicare standard di codifica sicuri

### Test dinamici

- Eseguire test di penetrazione regolari
- Implementare scansioni DAST automatizzate
- Utilizzare test di sicurezza interattivi delle applicazioni
- Condurre valutazioni regolari delle vulnerabilità
- Testare i flussi di autenticazione e autorizzazione
- Verificare le intestazioni e le configurazioni di sicurezza
- Simulazione di scenari di attacco comuni

## Monitoraggio e risposta alla sicurezza

### Registrazione e monitoraggio

- Implementare una registrazione completa della sicurezza
- Registrare gli eventi di autenticazione
- Registrare gli errori del controllo degli accessi
- Monitorare le attività sospette
- Implementare avvisi in tempo reale
- Utilizzare la gestione centralizzata dei log
- Assicurarsi che i log siano a prova di manomissione
- Conservare i log per periodi di tempo appropriati

### Risposta agli incidenti

- Sviluppare un piano di risposta agli incidenti
- Definire ruoli e responsabilità
- Stabilire protocolli di comunicazione
- Documentare Procedure di contenimento
- Implementare capacità di analisi forense
- Condurre revisioni post-incidente
- Esercitarsi in scenari di risposta agli incidenti
- Mantenere i contatti con la community di sicurezza

## Conformità e privacy

### Conformità normativa

- Identificare le normative applicabili (GDPR, CCPA, ecc.)
- Implementare i controlli di sicurezza richiesti
- Condurre valutazioni di conformità regolari
- Documentare le misure di conformità
- Formare il team sui requisiti di conformità
- Implementare la privacy by design
- Gestire la documentazione richiesta

### Considerazioni sulla privacy

- Implementare policy sulla privacy chiare
- Ottenere il consenso appropriato per la raccolta dei dati
- Fornire meccanismi di accesso e cancellazione dei dati
- Ridurre al minimo la raccolta e la conservazione dei dati
- Implementare la portabilità dei dati
- Condurre valutazioni dell'impatto sulla privacy
- Considerare la privacy in tutte le decisioni di progettazione