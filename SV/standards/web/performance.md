# Webbprestandastandarder

## Prestandamål

- Lighthouse-poäng: 90+ för alla mätvärden
- Kärnmål för Web Vitals:
- LCP (Largest Contentful Paint): < 2,5 s
- FID (First Input Delay): < 100 ms
- CLS (Cumulative Layout Shift): < 0,1
- INP (Interaction to Next Paint): < 200 ms
- Tid till interaktivitet: < 3 s
- First Contentful Paint: < 1,8 s
- Total sidvikt: < 1 MB (helst < 500 KB)
- HTTP-förfrågningar: < 50 per sida

## Bildoptimering

- Använd WebP/AVIF-format med reservfunktioner för äldre webbläsare
- Implementera responsiva bilder med attributen `srcset` och `sizes`
- Ladda bilder under vikningen utan att behöva ladda dem
- Anpassa storleken på bilderna (undvik att visa stora bilder som är nedskalade via CSS)
- Använd bild-CDN för Dynamisk storleksändring när det är möjligt
- Optimera SVG:er och ta bort onödiga metadata
- Komprimera alla bilder med verktyg som ImageOptim, TinyPNG eller Squoosh
- Överväg oskärpa-teknik för progressiv inläsning

## JavaScript-optimering

- Implementera koddelning och dynamisk import
- Skjut upp icke-kritisk JavaScript
- Använd trädskakning för att eliminera död kod
- Minimera och komprimera JavaScript-filer
- Undvik renderingsblockerande JavaScript
- Använd webbarbetare för CPU-intensiva uppgifter
- Implementera prioritering av förfrågningar
- Optimera tredjepartsskript och använd async/defer-attribut

## CSS-optimering

- Minimera och infoga kritisk CSS
- Ta bort oanvänd CSS med verktyg som PurgeCSS
- Undvik CSS-import (använd sammanfogning istället)
- Använd CSS-inneslutning för oberoende komponenter
- Optimera CSS-väljare för prestanda
- Överväg prestandakonsekvenser för CSS-i-JS
- Använd CSS-variabler för bättre underhåll
- Implementera CSS-koddelning för stora applikationer

## Teckensnitt Optimering

- Använd systemteckensnitt när det är möjligt
- Implementera font-display: swap eller valfritt
- Delmängd av teckensnitt för att endast inkludera nödvändiga tecken
- Självvärda teckensnitt istället för att använda tredjepartstjänster
- Förladda kritiska teckensnitt
- Använd variabla teckensnitt för flera vikter/stilar
- Begränsa teckensnittsvariationer (vikter, stilar)

## Cachningsstrategi

- Implementera effektiva cachepolicyer
- Lång cache för statiska tillgångar (1 år+)
- Kort/ingen cache för HTML
- Använd versionerade filnamn eller frågesträngar för cache-busting
- Implementera service workers för offline-support
- Använd localStorage/IndexedDB för klientsidescachning
- Konfigurera HTTP-cachehuvuden korrekt
- Implementera CDN-cachning

## Serveroptimering

- Aktivera HTTP/2 eller HTTP/3
- Implementera serversideskomprimering (Brotli/Gzip)
- Använd CDN för global innehållsleverans
- Optimera API-svar (sidning, fältval)
- Implementera edge computing för dynamiskt innehåll
- Konfigurera korrekta CORS-inställningar
- Optimera tid till första byte (TTFB)
- Använd HTTP-föranslutning, förhämtning och förladdningshintar

## Mobiloptimering

- Prioritera mobilprestanda (mobil-first-strategi)
- Optimera pekskärmar (minst 44×44px)
- Minska nätverksnyttolasten för mobila enheter
- Implementera responsiva designmönster
- Testa på faktiska mobila enheter, inte bara emulatorer
- Överväg minskad rörelse för animationer
- Optimera för scenarier med offline/dålig anslutning

## Övervakning och testning

- Implementera övervakning av verklig användare (RUM)
- Konfigurera syntetisk övervakning för kritiska användarflöden
- Använd WebPageTest för detaljerad prestandaanalys
- Övervaka Core Web Vitals i Google Search Console
- Konfigurera prestandabudgetar och aviseringar
- Genomför regelbundna prestandagranskningar
- Implementera A/B-testning för prestandaförbättringar
- Använd Chrome DevTools prestandapanel för profilering

## Avancerade tekniker

- Implementera resurshintar (föranslutning, förladdning, förhämtning)
- Använd intersection observer för lat loading (lat inläsning)
- Överväg serversidesrendering eller generering av statisk webbplats
- Implementera stale-while-revalidate-mönster
- Använd requestIdleCallback för icke-kritiska uppgifter
- Överväg importmappningar för moduledläsning
- Implementera prediktiv förhämtning baserat på användarbeteende
- Använd prioritetstips för kritiska resurser