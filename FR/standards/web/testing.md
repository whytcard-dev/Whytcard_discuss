# Normes de tests Web

## Philosophie des tests

- Tester tôt et souvent
- Automatiser les tests autant que possible
- Tester aux niveaux appropriés (unité, intégration, e2e)
- Écrire des tests maintenables et fiables
- Tester les chemins favorables et les cas limites
- Utiliser les tests pour prévenir les régressions
- Prioriser les tests en fonction de leur impact métier
- Traiter le code de test avec le même soin que le code de production

## Types de tests et couverture

### Tests unitaires

- **Cible** : Fonctions, composants et modules individuels
- **Objectif de couverture** : Plus de 80 % de la logique métier et des utilitaires
- **Outils** : Jest, Vitest, bibliothèque de tests React
- **Bonnes pratiques** :
- Suivre le modèle AAA (Arrange, Act, Assert)
- Une assertion par test lorsque cela est possible
- Simuler les dépendances externes
- Tester les cas limites et les conditions d'erreur
- Maintenir des tests rapides (< 100 ms) par test)
- Utiliser des noms de test descriptifs
- Isoler les tests les uns des autres

### Tests d'intégration

- **Cible** : Interactions entre composants et services
- **Objectif de couverture** : Flux utilisateur critiques et interactions entre composants
- **Outils** : Bibliothèque de tests React, MSW, Supertest
- **Bonnes pratiques** :
- Tester les compositions de composants
- Tester les soumissions de formulaires
- Simulation de réponses d'API
- Tester les changements d'état
- Vérifier les mises à jour du DOM
- Tester le routage et la navigation
- Utiliser des données de test réalistes

### Tests de bout en bout

- **Cible** : Terminer les flux utilisateur, de l'interface utilisateur au back-end
- **Objectif de couverture** : Chemins métier critiques et parcours utilisateur
- **Outils** : Cypress, Playwright
- **Bonnes pratiques** :
- Se concentrer sur les parcours utilisateur critiques
- Tester sur plusieurs navigateurs
- Utiliser des sélecteurs stables (data-testid)
- Configurer des environnements de test isolés
- Gérer efficacement les données de test
- Prendre des captures d'écran en cas d'échec
- Mettre en œuvre une logique de relance pour les tests instables

### Tests de régression visuelle

- **Cible** : Apparence et présentation de l'interface utilisateur
- **Objectif de couverture** : Composants et pages clés de l'interface utilisateur
- **Outils** : Percy, Chromatic, Playwright
- **Bonnes pratiques** :
- Prendre des captures d'écran de référence
- Tester sur différentes fenêtres d'affichage
- Ignorer le contenu dynamique
- Examiner attentivement les modifications visuelles
- Tester les modes clair/sombre
- Tester avec différentes longueurs de contenu
- Intégration au pipeline CI/CD

### Tests d'accessibilité

- **Cible** : Conformité aux WCAG et problèmes d'accessibilité
- **Objectif de couverture** : Tous les composants et pages destinés aux utilisateurs
- **Outils** : axe, Lighthouse, WAVE
- **Bonnes pratiques** :
- Tester la navigation au clavier
- Vérifier la compatibilité avec les lecteurs d'écran
- Vérifier le contraste des couleurs
- Gestion du focus des tests
- Vérifier les attributs ARIA
- Tester avec des technologies d'assistance
- Automatiser les vérifications d'accessibilité de base

### Tests de performance

- **Cible** : Temps de chargement des pages, performances de rendu
- **Objectif de couverture** : Pages clés et chemins utilisateur critiques
- **Outils** : Lighthouse, WebPageTest, k6
- **Bonnes pratiques** :
- Mesurer les Core Web Vitals
- Tester sur des appareils bas de gamme
- Simuler la limitation du réseau
- Surveiller la taille des bundles
- Tester avec des scénarios de mise en cache réalistes
- Mesurer le temps d'interaction
- Définir des budgets de performance

## Pratiques de test

### Organisation des tests

- Regrouper les tests de manière logique par fonctionnalité ou composant
- Utiliser des noms de fichiers et des descriptions de tests descriptifs
- Séparer les utilitaires et les composants de test
- Organiser les tests selon une hiérarchie reflétant la base de code
- Garder les fichiers de test proches du code testé
- Utiliser une dénomination cohérente Conventions
- Séparer les tests unitaires, d'intégration et de bout en bout

### Gestion des données de test

- Utiliser des usines ou des builders pour les données de test
- Éviter les données de test codées en dur
- Utiliser des données réalistes correspondant aux modèles de production
- Réinitialiser l'état des tests entre les tests
- Isoler les environnements de test
- Prendre en compte la confidentialité des données de test
- Utiliser des données aléatoires pour les cas limites

### Simulations et stubbing

- Simulation des dépendances externes (API, services)
- Utiliser des réponses de simulation réalistes
- Réinitialiser les simulations entre les tests
- Éviter les simulations excessives
- Simulation au niveau approprié
- Documenter le comportement des simulations
- Utiliser MSW pour la simulation des API

### Intégration continue

- Exécuter des tests à chaque pull request
- Implémenter l'exécution parallèle des tests
- Configurer les rapports et les tableaux de bord de test
- Configurer les notifications d'échec de test
- Implémenter des nouvelles tentatives de test pour les tests instables
- Mettre en cache les dépendances de test
- Exécuter différents types de tests aux étapes appropriées

## Développement piloté par les tests (TDD)

- Écrire des tests avant d'implémenter des fonctionnalités
- Suivre le cycle Rouge-Vert-Refactorisation
- Commencer par des cas de test simples
- Augmenter progressivement la complexité
- Utiliser les tests pour piloter la conception
- Refactoriser les tests au fur et à mesure de l'évolution du code
- Se concentrer sur le comportement, et non sur l'implémentation

## Maintenance des tests

- Revoir et mettre à jour régulièrement les tests
- Supprimer ou corriger les tests instables
- Refactoriser les tests en fonction des modifications du code
- Surveiller les performances des tests
- Analyser régulièrement la couverture des tests
- Documenter la stratégie de test
- Former les membres de l'équipe aux pratiques de test

## Tests spécialisés

### Tests API

- Tester tous les points de terminaison de l'API
- Vérifier les schémas de requête/réponse
- Tester l'authentification et l'autorisation
- Tester la gestion des erreurs et les codes d'état
- Valider la logique métier
- Tester la limitation du débit et les quotas
- Documenter les cas de test API

### Tests de gestion d'état

- Tester les transitions d'état
- Vérifier l'état initial
- Tester les réducteurs et les actions
- Tester Sélecteurs et états dérivés
- Simulation de dépendances externes
- Test des changements d'état asynchrones
- Vérification de la persistance de l'état

### Tests de formulaires

- Test des soumissions de formulaires
- Validation des entrées de formulaires
- Test des états d'erreur
- Test de la fonctionnalité de réinitialisation de formulaires
- Test de la logique conditionnelle de formulaires
- Vérification de l'accessibilité des éléments de formulaires
- Test du formulaire avec navigation au clavier

### Tests de sécurité

- Test des flux d'authentification
- Vérification des contrôles d'autorisation
- Test de vulnérabilités courantes (XSS, CSRF)
- Validation de la vérification de la sécurité des entrées
- Test de la sécurité du téléchargement de fichiers
- Vérification des en-têtes sécurisés
- Test de conformité au Top 10 de l'OWASP