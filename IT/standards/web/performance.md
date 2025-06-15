# Standard di prestazioni web

## Obiettivi di prestazioni

- Punteggio Lighthouse: 90+ per tutte le metriche
- Obiettivi Core Web Vitals:
- LCP (Largest Contentful Paint): < 2,5 s
- FID (First Input Delay): < 100 ms
- CLS (Cumulative Layout Shift): < 0,1
- INP (Interaction to Next Paint): < 200 ms
- Tempo per l'interattività: < 3 s
- First Contentful Paint: < 1,8 s
- Peso totale della pagina: < 1 MB (idealmente < 500 KB)
- Richieste HTTP: < 50 per pagina

## Ottimizzazione delle immagini

- Utilizzare formati WebP/AVIF con fallback per i browser meno recenti
- Implementare immagini responsive con attributi `srcset` e `sizes`
- Caricamento lazy delle immagini sotto la piega
- Dimensioni appropriate delle immagini (evitare di servire immagini di grandi dimensioni ridimensionate tramite CSS)
- Utilizzare un CDN per immagini per il ridimensionamento dinamico quando possibile
- Ottimizzare gli SVG e rimuovere i metadati non necessari
- Comprimere tutte le immagini con strumenti come ImageOptim, TinyPNG o Squoosh
- Considerare la tecnica di blur-up per il caricamento progressivo

## Ottimizzazione JavaScript

- Implementare la suddivisione del codice e le importazioni dinamiche
- Differire il codice JavaScript non critico
- Utilizzare il tree-shaking per eliminare il codice inutilizzato
- Minimizzare e comprimere i file JavaScript
- Evitare il rendering di codice JavaScript che blocca
- Utilizzare web worker per attività che richiedono molta CPU
- Implementare la prioritizzazione delle richieste
- Ottimizzare gli script di terze parti e utilizzare gli attributi async/defer

## Ottimizzazione CSS

- Minimizzare e incorporare il CSS critico
- Rimuovere il CSS non utilizzato con strumenti come PurgeCSS
- Evitare le importazioni CSS (utilizzare invece la concatenazione)
- Utilizzare il contenimento CSS per i componenti indipendenti
- Ottimizzare i selettori CSS per le prestazioni
- Considerare le prestazioni CSS-in-JS Implicazioni
- Utilizzare variabili CSS per una migliore manutenibilità
- Implementare la suddivisione del codice CSS per applicazioni di grandi dimensioni

## Ottimizzazione dei font

- Utilizzare i font di sistema quando possibile
- Implementare font-display: swap o facoltativo
- Sottoinsiemi di font per includere solo i caratteri necessari
- Hosting autonomo dei font invece di utilizzare servizi di terze parti
- Precaricare i font critici
- Utilizzare font variabili per più pesi/stili
- Limitare le varianti dei font (pesi, stili)

## Strategia di caching

- Implementare policy di cache efficaci
- Cache lunga per risorse statiche (1 anno+)
- Cache corta/nessuna cache per HTML
- Utilizzare nomi di file versionati o stringhe di query per il busting della cache
- Implementare service worker per il supporto offline
- Utilizzare localStorage/IndexedDB per il caching lato client
- Configurare correttamente le intestazioni della cache HTTP
- Implementare il caching CDN

## Ottimizzazione del server

- Abilitare HTTP/2 o HTTP/3
- Implementare Compressione lato server (Brotli/Gzip)
- Utilizzare CDN per la distribuzione globale dei contenuti
- Ottimizzare le risposte API (paginazione, selezione dei campi)
- Implementare l'edge computing per i contenuti dinamici
- Configurare le impostazioni CORS appropriate
- Ottimizzare il Time to First Byte (TTFB)
- Utilizzare suggerimenti HTTP per preconnessione, prefetch e precaricamento

## Ottimizzazione per dispositivi mobili

- Dare priorità alle prestazioni mobile (approccio mobile-first)
- Ottimizzare i touch target (min. 44×44px)
- Ridurre il payload di rete per i dispositivi mobili
- Implementare modelli di progettazione responsive
- Eseguire test su dispositivi mobili reali, non solo su emulatori
- Considerare la riduzione del movimento per le animazioni
- Ottimizzare per scenari offline/connettività scarsa

## Monitoraggio e test

- Implementare il Real User Monitoring (RUM)
- Impostare il monitoraggio sintetico per i flussi utente critici
- Utilizzare WebPageTest per un'analisi dettagliata delle prestazioni
- Monitorare i Core Web Vitals in Google Search Console
- Impostare i budget per le prestazioni e Avvisi
- Eseguire audit delle prestazioni regolari
- Implementare test A/B per migliorare le prestazioni
- Utilizzare il pannello Prestazioni di Chrome DevTools per la profilazione

## Tecniche avanzate

- Implementare suggerimenti sulle risorse (preconnessione, precaricamento, precaricamento)
- Utilizzare l'osservatore di intersezione per il caricamento differito
- Considerare il rendering lato server o la generazione di siti statici
- Implementare il pattern stale-while-revalidate
- Utilizzare requestIdleCallback per attività non critiche
- Considerare le mappe di importazione per il caricamento dei moduli
- Implementare il precaricamento predittivo in base al comportamento dell'utente
- Utilizzare suggerimenti di priorità per le risorse critiche