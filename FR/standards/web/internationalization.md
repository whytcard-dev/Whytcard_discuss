# Normes d'internationalisation (i18n)

## Principes fondamentaux

- Concevoir pour un public international dès le départ
- Séparer le contenu du code
- Prise en charge de plusieurs langues et paramètres régionaux
- Respecter les différences et sensibilités culturelles
- Mettre en œuvre la détection automatique de la langue
- Autoriser la sélection manuelle de la langue
- Tester auprès d'utilisateurs réels des marchés cibles

## Langue et contenu

### Gestion du texte

- Stocker tout le texte accessible aux utilisateurs dans des fichiers de ressources
- Ne jamais coder en dur les chaînes de texte des composants
- Utiliser des clés descriptives uniques pour les ressources textuelles
- Organiser les traductions par fonctionnalité ou par page
- Prendre en charge les règles de pluralisation pour différentes langues
- Gérer les variations spécifiques au genre
- Prendre en charge les langues s'écrivant de droite à gauche (RTL)
- Mettre en œuvre des mécanismes de secours pour les traductions manquantes

### Processus de traduction

- Fournir du contexte aux traducteurs
- Inclure des descriptions d'espaces réservés/variables
- Faire appel à des services de traduction professionnels
- Mettre en œuvre des systèmes de mémoire de traduction
- Permettre l'extension du texte (certaines langues nécessitent plus d'espace)
- Fournir des captures d'écran Contexte
- Mettre en place un processus de révision des traductions
- Soutenir les mises à jour continues des traductions

### Considérations relatives au contenu

- Éviter les métaphores et expressions idiomatiques spécifiques à une culture
- Tenir compte du symbolisme des couleurs selon les cultures
- Tenir compte des différents formats de noms et normes d'adresse
- Respecter les sensibilités et les tabous culturels
- Adapter le contenu aux marchés locaux si nécessaire
- Utiliser une imagerie culturellement neutre
- Tenir compte du sens de lecture (de gauche à droite ou de droite à gauche)
- Éviter l'argot et les expressions familières

## Mise en œuvre technique

### Framework et bibliothèques

- Utiliser les bibliothèques i18n établies :
- react-i18next / i18next (React)
- vue-i18n (Vue)
- angular/localize (Angular)
- next-intl (Next.js)
- Format.js (React)
- Mettre en place une détection de langue appropriée
- Permettre le changement de langue sans rechargement de page
- Configurer les langues de secours
- Mettre en œuvre Chargement différé des traductions
- Mise en cache des traductions pour des performances optimales
- Prise en charge des clés de traduction imbriquées
- Implémentation de la pluralisation et du formatage

### Structure du code

- Séparation des fichiers de traduction par langue
- Utilisation de JSON ou YAML pour les ressources de traduction
- Implémentation d'espaces de noms pour les applications volumineuses
- Organisation et maintenance des clés de traduction
- Respect des conventions de nommage cohérentes pour les clés
- Documentation des formats ou variables spécifiques
- Implémentation de la sécurité des types pour les clés de traduction (TypeScript)
- Prise en charge de la génération dynamique de clés si nécessaire

### Formatage

#### Date et heure

- Utilisation de bibliothèques prenant en charge les formats de date internationaux
- Affichage des dates au format préféré de l'utilisateur
- Prise en compte des fuseaux horaires et de l'heure d'été
- Format des dates selon les conventions locales
- Prise en charge de différents systèmes de calendrier si nécessaire
- Utilisation du format ISO pour l'échange de données
- Affichage des heures relatives en fonction de la culture

#### Nombres et devises

- Format des nombres selon les conventions locales
- Utilisation de séparateurs décimaux et de milliers appropriés
- Format des devises avec les formats appropriés Symboles
- Positionnement correct des symboles monétaires selon les paramètres régionaux
- Prise en charge de différents systèmes de numérotation
- Formatage des pourcentages selon les paramètres régionaux
- Prise en compte des taux de change pour les applications multirégionales

#### Adresses et numéros de téléphone

- Prise en charge de différents formats d'adresses
- Prise en charge de divers formats de codes postaux
- Gestion des numéros de téléphone internationaux (format E.164)
- Formatage des numéros de téléphone selon les conventions locales
- Prise en charge de différentes conventions d'ordre des noms
- Prise en compte des titres honorifiques et des titres selon les cultures
- Validation des adresses selon les règles spécifiques à chaque pays

## Considérations relatives à l'interface utilisateur

### Mise en page et conception

- Concevoir des mises en page flexibles qui prennent en charge l'expansion du texte
- Prise en charge des sens de texte gauche à droite et droit à gauche
- Prise en charge du texte bidirectionnel (bidirectionnel)
- Test des mises en page avec des chaînes de texte plus longues
- Éviter les conteneurs de largeur fixe
- Tenir compte des variations de taille de police selon les langues
- Test avec du contenu traduit réel, et non du Lorem Ipsum
- Implémenter des CSS spécifiques à la langue si nécessaire

### Typographie

- Utiliser des polices compatibles avec plusieurs langues
- Inclure des polices de secours appropriées
- Tenir compte des jeux de caractères pour différentes langues
- Prendre en charge les caractères spéciaux et les signes diacritiques
- Ajuster la hauteur des lignes pour différentes écritures
- Tester la lisibilité entre les langues
- Tenir compte du texte vertical pour certaines langues d'Asie de l'Est
- Utiliser correctement Unicode

### Navigation et commandes

- Traduire les éléments et commandes de navigation
- Adapter la navigation aux langues de droite à gauche
- Tenir compte des habitudes de lecture culturelles
- S'assurer que les icônes sont culturellement neutres
- Tester les raccourcis clavier sur différentes configurations de clavier
- Fournir une aide et une documentation localisées
- Traduire les messages d'erreur et les notifications
- Localiser la fonctionnalité de recherche

## Tests et assurance qualité

### Stratégie de test

- Tester avec des locuteurs natifs
- Vérifier les traductions en contexte
- Tester l'expansion et la troncature du texte
- Valider le formatage des dates, des nombres et des devises
- Tester minutieusement les configurations de droite à gauche
- Vérifier la fonctionnalité de changement de langue
- Tester avec différents paramètres régionaux
- Mettre en œuvre une recherche automatisée Tests i18n

### Problèmes courants

- Vérification des chaînes codées en dur
- Vérification de la pluralisation correcte
- Recherche de chaînes concaténées
- Test des problèmes de gestion Unicode
- Vérification du tri et de l'assemblage
- Vérification des hypothèses culturelles dans la logique
- Test avec des mots longs et des chaînes
- Vérification de la gestion des caractères spéciaux

### Outils et automatisation

- Implémentation de l'analyse syntaxique pour les problèmes i18n
- Utilisation de systèmes de gestion de la traduction
- Automatisation de la génération de captures d'écran pour le contexte
- Implémentation de la pseudo-localisation pour les tests
- Utilisation de tests automatisés pour les problèmes de mise en page
- Suivi de la couverture et de la qualité des traductions
- Mise en œuvre de contrôles CI/CD pour i18n
- Surveillance des traductions manquantes

## Juridique et conformité

- Recherche des exigences légales locales
- Adaptation des politiques de confidentialité aux différentes régions
- Prise en compte du RGPD et des autres réglementations en matière de confidentialité
- Adaptation des conditions d'utilisation aux marchés locaux
- Connaissance des restrictions de contenu par pays
- Prise en compte des exigences d'accessibilité par région
- Conformité des documents Mesures
- Consulter des experts juridiques pour les marchés clés