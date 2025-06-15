# Normes de performance Web

## Objectifs de performance

- Score Lighthouse : 90+ pour tous les indicateurs
- Objectifs Core Web Vitals :
- LCP (Largest Contentful Paint) : < 2,5 s
- FID (First Input Delay) : < 100 ms
- CLS (Cumulative Layout Shift) : < 0,1
- INP (Interaction to Next Paint) : < 200 ms
- Délai d'interactivité : < 3 s
- First Contentful Paint : < 1,8 s
- Poids total de la page : < 1 Mo (idéalement < 500 Ko)
- Requêtes HTTP : < 50 par page

## Optimisation des images

- Utiliser les formats WebP/AVIF avec des solutions de secours pour les anciens navigateurs
- Implémenter des images responsives avec les attributs « srcset » et « sizes »
- Charger les images en différé sous la ligne de flottaison
- Dimensionner correctement les images (éviter de diffuser des images volumineuses) (réduction via CSS)
- Utiliser le CDN d'images pour un redimensionnement dynamique lorsque cela est possible
- Optimiser les fichiers SVG et supprimer les métadonnées inutiles
- Compresser toutes les images avec des outils comme ImageOptim, TinyPNG ou Squoosh
- Envisager la technique de floutage pour un chargement progressif

## Optimisation JavaScript

- Mettre en œuvre le fractionnement de code et les importations dynamiques
- Différer le JavaScript non critique
- Utiliser le tree-shaking pour éliminer le code mort
- Minifier et compresser les fichiers JavaScript
- Éviter le JavaScript bloquant le rendu
- Utiliser des web workers pour les tâches gourmandes en ressources processeur
- Mettre en œuvre la priorisation des requêtes
- Optimiser les scripts tiers et utiliser les attributs async/defer

## Optimisation CSS

- Minimiser et intégrer les CSS critiques
- Supprimer les CSS inutilisés avec des outils comme PurgeCSS
- Éviter les importations CSS (privilégier la concaténation)
- Utiliser le confinement CSS pour les composants indépendants
- Optimiser les sélecteurs CSS pour les performances
- Tenir compte des performances CSS dans JS Implications
- Utiliser des variables CSS pour une meilleure maintenabilité
- Implémenter le fractionnement du code CSS pour les applications volumineuses

## Optimisation des polices

- Utiliser les polices système lorsque cela est possible
- Implémenter font-display: swap ou optional
- Sous-ensembles de polices pour n'inclure que les caractères nécessaires
- Auto-héberger les polices au lieu d'utiliser des services tiers
- Précharger les polices critiques
- Utiliser des polices variables pour plusieurs graisses/styles
- Limiter les variations de polices (graisses, styles)

## Stratégie de mise en cache

- Mettre en place des politiques de cache efficaces
- Cache long pour les ressources statiques (1 an et plus)
- Cache court/inexistant pour le HTML
- Utiliser des noms de fichiers versionnés ou des chaînes de requête pour le contournement du cache
- Implémenter des service workers pour le support hors ligne
- Utiliser localStorage/IndexedDB pour la mise en cache côté client
- Configurer correctement les en-têtes de cache HTTP
- Implémenter la mise en cache CDN

## Optimisation du serveur

- Activer HTTP/2 ou HTTP/3
- Implémenter la compression côté serveur (Brotli/Gzip)
- Utiliser un CDN pour la diffusion de contenu mondial
- Optimiser les réponses API (pagination, sélection de champs)
- Mettre en œuvre l'informatique de pointe pour le contenu dynamique
- Configurer les paramètres CORS appropriés
- Optimiser le temps de réponse au premier octet (TTFB)
- Utiliser les indications de préconnexion, de prélecture et de préchargement HTTP

## Optimisation mobile

- Prioriser les performances mobiles (approche mobile-first)
- Optimiser les cibles tactiles (minimum 44×44px)
- Réduire la charge utile réseau pour les appareils mobiles
- Mettre en œuvre des modèles de conception réactifs
- Tester sur des appareils mobiles réels, et pas seulement sur des émulateurs
- Envisager une réduction des mouvements pour les animations
- Optimiser les scénarios hors ligne/de faible connectivité

## Surveillance et tests

- Mettre en œuvre la surveillance des utilisateurs réels (RUM)
- Mettre en place une surveillance synthétique pour les flux d'utilisateurs critiques
- Utiliser WebPageTest pour une analyse détaillée des performances
- Surveiller les Core Web Vitals dans la Search Console Google
- Définir des budgets de performance et Alertes
- Réaliser des audits de performance réguliers
- Mettre en œuvre des tests A/B pour améliorer les performances
- Utiliser le panneau Performances de Chrome DevTools pour le profilage

## Techniques avancées

- Mettre en œuvre des conseils sur les ressources (préconnexion, préchargement, prélecture)
- Utiliser l'observateur d'intersection pour le chargement différé
- Envisager le rendu côté serveur ou la génération de sites statiques
- Mettre en œuvre le modèle stale-while-revalidate
- Utiliser requestIdleCallback pour les tâches non critiques
- Envisager des cartes d'importation pour le chargement des modules
- Mettre en œuvre une prélecture prédictive basée sur le comportement des utilisateurs
- Utiliser des conseils de priorité pour les ressources critiques