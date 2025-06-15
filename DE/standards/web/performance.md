# Web-Performance-Standards

## Performance-Ziele

- Lighthouse Score: 90+ für alle Metriken
- Core Web Vitals-Ziele:
- LCP (Largest Contentful Paint): < 2,5 s
- FID (First Input Delay): < 100 ms
- CLS (Cumulative Layout Shift): < 0,1
- INP (Interaction to Next Paint): < 200 ms
- Zeit bis zur Interaktion: < 3 s
- First Contentful Paint: < 1,8 s
- Gesamtseitengröße: < 1 MB (idealerweise < 500 KB)
- HTTP-Anfragen: < 50 pro Seite

## Bildoptimierung

- Verwendung von WebP/AVIF-Formaten mit Fallbacks für ältere Browser
- Implementierung responsiver Bilder mit den Attributen `srcset` und `sizes`
- Lazy Load von Bildern unterhalb des Falzes
- Angemessene Bildgröße (Vermeidung von verkleinerten Bildern über CSS)
- Verwenden Sie nach Möglichkeit ein Bild-CDN für dynamische Größenanpassung.
- SVGs optimieren und unnötige Metadaten entfernen.
- Alle Bilder mit Tools wie ImageOptim, TinyPNG oder Squoosh komprimieren.
- Blur-Up-Technik für progressives Laden verwenden.

## JavaScript-Optimierung

- Code-Splitting und dynamische Importe implementieren.
- Nicht-kritisches JavaScript verschieben.
- Tree-Shaking verwenden, um toten Code zu entfernen.
- JavaScript-Dateien minimieren und komprimieren.
- Render-blockierendes JavaScript vermeiden.
- Web-Worker für CPU-intensive Aufgaben verwenden.
- Anfragepriorisierung implementieren.
- Drittanbieter-Skripte optimieren und asynchrone/verzögerte Attribute verwenden.

## CSS-Optimierung

- Kritisches CSS minimieren und inline einfügen.
- Nicht verwendetes CSS mit Tools wie PurgeCSS entfernen.
- CSS-Importe vermeiden (stattdessen Verkettung verwenden).
- CSS-Containment für unabhängige Komponenten verwenden.
- CSS-Selektoren für bessere Performance optimieren.
- Performance-Auswirkungen von CSS-in-JS berücksichtigen.
- CSS-Variablen für bessere Wartbarkeit verwenden.
- CSS-Code implementieren. Aufteilung für große Anwendungen

## Schriftartenoptimierung

- Systemschriftarten nach Möglichkeit verwenden
- Font-Display: Swap oder optional implementieren
- Schriftarten so unterteilen, dass nur die benötigten Zeichen enthalten sind
- Schriftarten selbst hosten, anstatt Dienste von Drittanbietern zu nutzen
- Kritische Schriftarten vorladen
- Variable Schriftarten für verschiedene Schriftstärken/-stile verwenden
- Schriftvariationen (Schriftstärken, -stile) begrenzen

## Caching-Strategie

- Effektive Cache-Richtlinien implementieren
- Langer Cache für statische Assets (über 1 Jahr)
- Kurzer/kein Cache für HTML
- Versionierte Dateinamen oder Abfragezeichenfolgen für Cache-Busting verwenden
- Service-Worker für Offline-Support implementieren
- LocalStorage/IndexedDB für clientseitiges Caching verwenden
- HTTP-Cache-Header korrekt konfigurieren
- CDN-Caching implementieren

## Serveroptimierung

- HTTP/2 oder HTTP/3 aktivieren
- Serverseitige Komprimierung (Brotli/Gzip) implementieren
- CDN für globale Inhaltsbereitstellung nutzen
- Optimieren API-Antworten (Paginierung, Feldauswahl)
- Edge Computing für dynamische Inhalte implementieren
- Korrekte CORS-Einstellungen konfigurieren
- Time to First Byte (TTFB) optimieren
- HTTP-Preconnect-, Prefetch- und Preload-Hinweise verwenden

## Mobile-Optimierung

- Mobile Performance priorisieren (Mobile-First-Ansatz)
- Touch-Ziele optimieren (mindestens 44 x 44 Pixel)
- Netzwerklast für Mobilgeräte reduzieren
- Responsive Design Patterns implementieren
- Auf echten Mobilgeräten testen, nicht nur auf Emulatoren
- Reduzierte Bewegung für Animationen berücksichtigen
- Für Offline-Szenarien/Szenarien mit schlechter Konnektivität optimieren

## Monitoring & Testing

- Real User Monitoring (RUM) implementieren
- Synthetisches Monitoring für kritische Nutzerströme einrichten
- WebPageTest für detaillierte Performance-Analysen nutzen
- Core Web Vitals in der Google Search Console überwachen
- Performance-Budgets und -Warnungen einrichten
- Regelmäßige Performance-Audits durchführen
- A/B-Tests zur Performance-Verbesserung implementieren
- Chrome DevTools nutzen Performance-Panel für Profiling

## Fortgeschrittene Techniken

- Implementieren Sie Ressourcenhinweise (Preconnect, Preload, Prefetch)
- Nutzen Sie den Intersection Observer für Lazy Loading
- Erwägen Sie serverseitiges Rendering oder die Generierung statischer Webseiten
- Implementieren Sie das Stale-While-Revalidate-Muster
- Nutzen Sie requestIdleCallback für nicht-kritische Aufgaben
- Nutzen Sie Import-Maps für das Laden von Modulen
- Implementieren Sie Prefetching basierend auf dem Nutzerverhalten
- Nutzen Sie Prioritätshinweise für kritische Ressourcen