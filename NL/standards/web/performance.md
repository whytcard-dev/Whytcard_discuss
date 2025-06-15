# Webprestatienormen

## Prestatiedoelen

- Lighthouse-score: 90+ voor alle statistieken
- Doelstellingen voor kernwebvitals:

- LCP (grootste contentvolle weergave): < 2,5 s
- FID (eerste invoervertraging): < 100 ms
- CLS (cumulatieve lay-outverschuiving): < 0,1
- INP (interactie tot volgende weergave): < 200 ms
- Tijd tot interactie: < 3 s
- Eerste contentvolle weergave: < 1,8 s
- Totale paginagrootte: < 1 MB (idealiter < 500 KB)
- HTTP-verzoeken: < 50 per pagina

## Afbeeldingsoptimalisatie

- Gebruik WebP/AVIF-formaten met fallbacks voor oudere browsers
- Implementeer responsieve afbeeldingen met de kenmerken `srcset` en `sizes`
- Lazy load afbeeldingen onder de vouw
- Geef afbeeldingen de juiste grootte (vermijd het weergeven van grote afbeeldingen) (verkleind via CSS)
- Gebruik indien mogelijk een afbeeldings-CDN voor dynamische formaataanpassing
- Optimaliseer SVG's en verwijder onnodige metadata
- Comprimeer alle afbeeldingen met tools zoals ImageOptim, TinyPNG of Squoosh
- Overweeg de blur-up-techniek voor progressief laden

## JavaScript-optimalisatie

- Implementeer codesplitsing en dynamische import
- Stel niet-kritieke JavaScript uit
- Gebruik tree-shaking om dode code te verwijderen
- Minimaliseer en comprimeer JavaScript-bestanden
- Vermijd render-blokkerende JavaScript
- Gebruik webworkers voor CPU-intensieve taken
- Implementeer prioritering van aanvragen
- Optimaliseer scripts van derden en gebruik async/defer-attributen

## CSS-optimalisatie

- Minimaliseer en inline kritieke CSS
- Verwijder ongebruikte CSS met tools zoals PurgeCSS
- Vermijd CSS-import (gebruik in plaats daarvan concatenatie)
- Gebruik CSS-containment voor onafhankelijke componenten
- Optimaliseer CSS-selectors voor prestaties
- Houd rekening met CSS-in-JS-prestaties Implicaties
- Gebruik CSS-variabelen voor beter onderhoud
- Implementeer CSS-codesplitsing voor grote applicaties

## Lettertypeoptimalisatie

- Gebruik systeemlettertypen waar mogelijk
- Implementeer lettertypeweergave: swap of optioneel
- Subset lettertypen om alleen de benodigde tekens op te nemen
- Host lettertypen zelf in plaats van gebruik te maken van services van derden
- Laad kritieke lettertypen vooraf
- Gebruik variabele lettertypen voor meerdere diktes/stijlen
- Beperk lettertypevariaties (diktes, stijlen)

## Cachingstrategie

- Implementeer effectief cachebeleid
- Lange cache voor statische assets (1 jaar of langer)
- Korte/geen cache voor HTML
- Gebruik versiegebonden bestandsnamen of queryreeksen voor cachebusting
- Implementeer serviceworkers voor offline ondersteuning
- Gebruik localStorage/IndexedDB voor client-side caching
- Configureer HTTP-cacheheaders correct
- Implementeer CDN-caching

## Serveroptimalisatie

- Schakel HTTP/2 of HTTP/3 in
- Implementeer server-side compressie (Brotli/Gzip)
- Gebruik CDN voor wereldwijde contentlevering
- Optimaliseer API-reacties (paginering, veldselectie)
- Implementeer edge computing voor dynamische content
- Configureer de juiste CORS-instellingen
- Optimaliseer de Time to First Byte (TTFB)
- Gebruik HTTP preconnect, prefetch en preload hints

## Mobiele optimalisatie

- Geef prioriteit aan mobiele prestaties (mobile-first benadering)
- Optimaliseer touch targets (minimaal 44 × 44 px)
- Verminder de netwerkbelasting voor mobiele apparaten
- Implementeer responsieve ontwerppatronen
- Test op echte mobiele apparaten, niet alleen op emulators
- Overweeg verminderde beweging voor animaties
- Optimaliseer voor offline/slechte connectiviteitsscenario's

## Monitoring & Testen

- Implementeer Real User Monitoring (RUM)
- Stel synthetische monitoring in voor kritieke gebruikersstromen
- Gebruik WebPageTest voor gedetailleerde prestatieanalyse
- Monitor Core Web Vitals in Google Search Console
- Stel prestatiebudgetten en waarschuwingen in
- Voer regelmatig Prestatieaudits
- Implementeer A/B-testen voor prestatieverbeteringen
- Gebruik het Prestatiepaneel van Chrome DevTools voor profilering

## Geavanceerde technieken

- Implementeer resourcehints (preconnect, preload, prefetch)
- Gebruik intersection observer voor lazy loading
- Overweeg server-side rendering of het genereren van statische sites
- Implementeer het stale-while-revalidate-patroon
- Gebruik requestIdleCallback voor niet-kritieke taken
- Overweeg import maps voor het laden van modules
- Implementeer predictieve prefetching op basis van gebruikersgedrag
- Gebruik prioriteithints voor kritieke resources