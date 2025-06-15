# Normes de sécurité Web

## Principes fondamentaux de sécurité

- Défense en profondeur (plusieurs couches de sécurité)
- Principe du moindre privilège
- Sécurisé par conception et par défaut
- Tests et audits de sécurité réguliers
- Maintenir à jour les dépendances de sécurité
- Sécurité en cas d'échec (valeurs par défaut sécurisées)
- Médiation complète (vérification de chaque requête)
- Formation à la sécurité pour tous les membres de l'équipe

## Authentification et autorisation

### Authentification

- Mettre en œuvre des politiques de mots de passe robustes
- Longueur minimale : 12 caractères
- Exiger une combinaison de caractères, de chiffres et de symboles
- Vérifier les listes de mots de passe courantes
- Prise en charge de l'authentification multifacteur (MFA)
- Utiliser une gestion de session sécurisée
- Cookies HTTP uniquement
- Indicateur de sécurité pour HTTPS
- Attribut SameSite
- Expiration appropriée
- Verrouillage du compte après une tentative infructueuse
- Sécuriser les flux de réinitialisation des mots de passe
- Utiliser un stockage sécurisé des mots de passe (bcrypt/Argon2)
- Envisager des options sans mot de passe (WebAuthn, magic) Liens)

### Autorisation

- Mettre en œuvre un contrôle d'accès basé sur les rôles (RBAC)
- Utiliser un contrôle d'accès basé sur les attributs pour les autorisations complexes
- Valider l'autorisation à chaque requête
- Mettre en œuvre des contrôles d'accès appropriés
- Utiliser une gestion sécurisée des sessions
- Mettre en œuvre l'autorisation API (OAuth 2.0, JWT)
- Éviter les références directes aux objets
- Consigner tous les échecs de contrôle d'accès

## Protection des données

### Données sensibles

- Identifier et classer les données sensibles
- Chiffrer les données sensibles au repos
- Utiliser TLS 1.3 pour les données en transit
- Mettre en œuvre une gestion des clés appropriée
- Minimiser la collecte de données sensibles
- Appliquer les principes de minimisation des données
- Mettre en œuvre une suppression sécurisée des données
- Utiliser un stockage sécurisé pour les clés et secrets API

### Validation des entrées

- Valider toutes les entrées côté serveur
- Utiliser des requêtes paramétrées pour l'accès à la base de données
- Mettre en œuvre le nettoyage des entrées
- Valider les types, la longueur et le format des données
- Utiliser Listes d'autorisation au lieu de listes d'exclusion
- Implémentation d'un encodage de sortie contextuel
- Validation des téléchargements de fichiers (type, taille, contenu)
- Implémentation d'une limitation du débit pour les entrées

## Prévention des vulnérabilités courantes

### Prévention des injections

- Utilisation de requêtes/instructions préparées paramétrées
- Application d'un ORM avec un échappement approprié
- Validation et nettoyage de toutes les entrées
- Implémentation d'un encodage de sortie contextuel
- Utilisation d'API sécurisées évitant les injections d'interpréteur

### Prévention XSS

- Implémentation d'une politique de sécurité du contenu (CSP)
- Utilisation d'un encodage de sortie automatique
- Application d'un encodage contextuel
- Nettoyage des entrées HTML
- Utilisation de frameworks modernes avec protection XSS intégrée
- Validation des URL dans les redirections
- Application de l'indicateur HTTPOnly aux cookies sensibles

### Prévention CSRF

- Implémentation de jetons anti-CSRF
- Utilisation de l'attribut de cookie SameSite
- Vérification des en-têtes d'origine et de référent
- Exigence Réauthentification pour les actions sensibles
- Utiliser une configuration CORS appropriée

### En-têtes de sécurité

- Politique de sécurité du contenu (CSP)
- Options de type de contenu X : nosniff
- Sécurité stricte du transport (HSTS)
- Options X-Frame
- Politique de référencement
- Politique d'autorisations
- En-têtes de contrôle du cache pour les données sensibles
- Effacement des données du site pour la déconnexion

## Sécurité de l'infrastructure

### Sécurité du serveur

- Maintenir le logiciel serveur à jour
- Utiliser des configurations de serveur sécurisées
- Mettre en œuvre des règles de pare-feu appropriées
- Activer uniquement HTTPS (rediriger HTTP vers HTTPS)
- Configurer les paramètres TLS appropriés
- Désactiver les services inutiles
- Utiliser des modules de serveur web axés sur la sécurité
- Mettre en œuvre la limitation du débit et la protection DDoS

### Sécurité des API

- Utiliser HTTPS pour tous les points de terminaison des API
- Mettre en œuvre une authentification appropriée
- Appliquer la limitation de débit
- Valider les charges utiles des requêtes
- Renvoyer les codes d'état appropriés
- Éviter d'exposer des informations sensibles dans les réponses
- Utiliser des clés API pour la communication interservices
- Documenter les exigences de sécurité pour les consommateurs d'API

### Gestion des dépendances

- Analyser régulièrement les dépendances vulnérables
- Utiliser des fichiers de verrouillage pour identifier les versions des dépendances
- Mettre en œuvre une analyse automatisée des vulnérabilités
- Mettre à jour rapidement les dépendances
- Minimiser l'utilisation des dépendances
- Vérifier l'intégrité des dépendances (sommes de contrôle)
- Surveiller les attaques de la chaîne d'approvisionnement
- Établir un plan de réponse aux vulnérabilités

## Tests de sécurité

### Analyse statique

- Mettre en œuvre des outils SAST automatisés
- Intégrer le linting de sécurité dans les CI/CD
- Rechercher les secrets codés en dur
- Analyser le code pour détecter les anti-modèles de sécurité
- Valider les configurations de sécurité
- Vérifier les dépendances obsolètes
- Appliquer des normes de codage sécurisé

### Tests dynamiques

- Effectuer des tests d'intrusion réguliers
- Mettre en œuvre une analyse DAST automatisée
- Utiliser des tests de sécurité applicatifs interactifs
- Réaliser des évaluations régulières des vulnérabilités
- Tester les flux d'authentification et d'autorisation
- Vérifier les en-têtes et les configurations de sécurité
- Simuler des scénarios d'attaque courants

## Surveillance et réponse à la sécurité

### Journalisation et surveillance

- Mettre en œuvre une journalisation de sécurité complète
- Enregistrer les événements d'authentification
- Enregistrer les défaillances du contrôle d'accès
- Surveiller les activités suspectes
- Mettre en œuvre des alertes en temps réel
- Utiliser une gestion centralisée des journaux
- S'assurer que les journaux sont inviolables
- Conserver les journaux pendant des durées appropriées

### Réponse aux incidents

- Élaborer un plan de réponse aux incidents
- Définir les rôles et les responsabilités
- Établir des protocoles de communication
- Documenter les procédures de confinement
- Mettre en œuvre des capacités d'analyse forensique
- Effectuer des analyses post-incident
- Pratiquer des scénarios de réponse aux incidents
- Rester en contact avec la communauté de sécurité

### Conformité et confidentialité

### Conformité réglementaire

- Identifier les réglementations applicables (RGPD, CCPA, etc.)
- Mettre en œuvre les mesures de sécurité requises Contrôles
- Effectuer des évaluations de conformité régulières
- Documenter les mesures de conformité
- Former l'équipe aux exigences de conformité
- Intégrer la protection de la vie privée dès la conception
- Tenir à jour la documentation requise

### Considérations relatives à la confidentialité

- Mettre en œuvre des politiques de confidentialité claires
- Obtenir le consentement préalable pour la collecte de données
- Fournir des mécanismes d'accès et de suppression des données
- Minimiser la collecte et la conservation des données
- Mettre en œuvre la portabilité des données
- Réaliser des analyses d'impact sur la vie privée
- Tenir compte de la confidentialité dans toutes les décisions de conception