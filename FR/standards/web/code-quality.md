# Normes de qualité du code

## Principes fondamentaux

- Écrire du code propre, maintenable et auto-documenté
- Suivre les principes SOLID et DRY
- Utiliser des fonctions simples et ciblées (responsabilité unique)
- Nommer les variables, les fonctions et les classes de manière descriptive
- Maintenir un style de code cohérent dans tout le projet
- Documenter la logique complexe et les API publiques
- Écrire du code pour les humains, pas seulement pour les machines

## Normes JavaScript/TypeScript

### Configuration TypeScript

- Utiliser le mode strict (`"strict": true`)
- Activer toutes les options de vérification de type recommandées
- Configurer la résolution de module appropriée
- Définir la version cible d'ECMAScript appropriée
- Spécifier les modèles d'inclusion/exclusion
- Utiliser des alias de chemin pour des importations plus propres

### Conventions de nommage

- **Variables/Fonctions** : camelCase (`getUserData`, `calculateTotal`)
- **Classes/Interfaces/Types** : PascalCase (`UserProfile`, `ApiResponse`)
- **Constantes** : UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`, `API_URL`)
- **Propriétés privées** : Utiliser le préfixe `#` ou la convention `_` (`#privateField`, `_privateMethod`)
- **Variables booléennes** : Utiliser les préfixes « is », « has » et « can » (`isActive`, `hasPermission`)
- **Fichiers composants** : PascalCase avec l'extension (`UserCard.tsx`)
- **Fichiers utilitaires** : camelCase avec l'extension (`formatDate.ts`)

### Organisation du code

- Une classe/un composant par fichier
- Regrouper les importations par externe/interne
- Trier les importations par ordre alphabétique
- Utiliser les exports en mode baril (`index.ts`) pour les fonctionnalités associées
- Organiser le code par Fonctionnalité/module
- Limiter les fichiers à moins de 400 lignes (séparer s'ils sont plus volumineux)
- Limiter les fonctions à moins de 50 lignes
- Imbrication maximale : 3-4 niveaux

### Bonnes pratiques

- Privilégier l'immuabilité (const, lecture seule, Object.freeze)
- Utiliser le chaînage optionnel et la coalescence nulle
- Mettre en œuvre une gestion des erreurs appropriée
- Éviter tout type sauf si nécessaire
- Utiliser des protections de type pour la vérification de type à l'exécution
- Préférer async/await aux promesses brutes
- Éviter les nombres magiques et les chaînes (utiliser des constantes)
- Mettre en œuvre des vérifications null/undefined appropriées
- Utiliser des retours anticipés pour réduire l'imbrication

## Standards React

### Structure des composants

- Privilégier les composants fonctionnels avec des hooks
- Utiliser des exports nommés pour les composants
- Implémenter la validation des props avec TypeScript
- Extraire la logique complexe vers des hooks personnalisés
- Concentrez les composants sur les préoccupations de l'interface utilisateur
- Implémenter des limites d'erreur appropriées
- Utiliser React.memo pour les performances Optimisation
- Extraire des composants réutilisables

### Gestion des états

- Utiliser l'état local pour les données spécifiques aux composants
- Utiliser le contexte pour un état partagé entre les composants
- Envisager une gestion externe des états pour les applications complexes
- Maintenir un état normalisé et minimal
- Implémenter une initialisation d'état appropriée
- Utiliser des réducteurs pour une logique d'état complexe
- Éviter le forage des propriétés (utiliser la composition ou le contexte)

### Optimisation des performances

- Utiliser React.memo pour les composants purs
- Implémenter useMemo pour les calculs coûteux
- Utiliser useCallback pour la mémorisation des fonctions
- Virtualiser les longues listes (react-window, react-virtualized)
- Implémenter des tableaux de dépendances appropriés dans les hooks
- Éviter les rendus inutiles
- Utiliser React Profiler pour identifier les goulots d'étranglement

## Normes de test

### Tests unitaires

- Tester toute la logique métier et les utilitaires
- Utiliser Jest ou Vitest comme exécuteur de tests
- Implémenter un mocking approprié des dépendances
- Utiliser la bibliothèque de tests pour les composants Tests
- Suivre le modèle AAA (Arrange, Act, Assert)
- Rédiger des noms de tests descriptifs
- Viser une couverture de code supérieure à 80 %
- Tester les cas limites et les scénarios d'erreur

### Tests d'intégration

- Tester les interactions entre les composants
- Tester les soumissions de formulaires et les flux utilisateurs
- Utiliser MSW pour la simulation d'API
- Tester le routage et la navigation
- Vérifier les changements d'état
- Tester avec des données réalistes

### Tests de bout en bout

- Utiliser Cypress ou Playwright
- Tester les parcours utilisateurs critiques
- Tester sur plusieurs navigateurs
- Mettre en œuvre une isolation de test appropriée
- Utiliser des attributs de données pour les sélecteurs de test
- Mettre en œuvre une logique de nouvelle tentative pour les tests instables
- Tester l'accessibilité

## Normes de revue de code

### Processus

- Tout le code doit être revu avant fusion
- Les vérifications automatisées doivent être réussies avant revue
- Utiliser des modèles de pull request
- Réduire la taille des PR et les cibler
- Répondre rapidement aux commentaires de revue
- Résoudre tous les commentaires Avant la fusion
- Saisir les commits avant la fusion

### Liste de contrôle de vérification

- Le code respecte les standards du projet
- Les tests sont inclus et réussis
- La documentation est mise à jour
- Aucune faille de sécurité
- Les implications en termes de performances sont prises en compte
- Les exigences d'accessibilité sont respectées
- Les cas limites sont traités
- Aucun code ni dépendances inutiles

## Outillage

### Linting et formatage

- ESLint avec des règles appropriées
- Prettier pour un formatage cohérent
- Husky pour les hooks pré-commit
- Lint-staged pour un linting incrémental
- Compilateur TypeScript pour la vérification de type
- Stylelint pour CSS/SCSS

### Analyse statique

- SonarQube ou CodeClimate
- Surveillance des métriques de complexité
- Détection de code dupliqué
- Analyse des vulnérabilités de sécurité
- Analyse de la taille des bundles
- Détection de code inutilisé

### Intégration CI/CD

- Exécuter toutes les vérifications sur chaque PR
- Fusion de blocs en cas d'échec des vérifications
- Génération et publication de rapports de couverture des tests
- Mise en œuvre de tests de régression des performances
- Automatisation des mises à jour des dépendances
- Déploiement d'environnements de préversion