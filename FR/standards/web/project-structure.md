# Normes de structure de projet

## Organisation des répertoires

### Structure racine

``` 
project-root/ 
├── src/ # Code source
├── public/ # Ressources statiques
├── dist/ # Sortie de build (générée)
├── node_modules/ # Dépendances (générées)
├── tests/ # Fichiers de test
├── docs/ # Documentation
├── .github/ # Flux de travail et modèles GitHub
├── .vscode/ # Configuration VS Code
├── scripts/ # Scripts de build et utilitaires
├── package.json # Métadonnées du projet et Dépendances
├── tsconfig.json # Configuration TypeScript
├── .eslintrc.js # Configuration ESLint
├── .prettierrc # Configuration Prettier
├── .gitignore # Motifs d'ignorance Git
├── .env.example # Exemples de variables d'environnement
└── README.md # Documentation du projet
``` 

### Structure du répertoire source

``` 
src/ 
├── assets/ # Ressources statiques nécessitant un traitement
│ ├── images/ # Images
│ ├── fonts/ # Fichiers de polices
│ └── styles/ # Global styles
│ 
├── components/ # Composants d'interface utilisateur réutilisables
│ ├── common/ # Composants partagés entre fonctionnalités
│ ├── layout/ # Composants de mise en page
│ └── ui/ # Composants d'interface utilisateur de base
│ 
├── hooks/ # Hooks React personnalisés
│ 
├── pages/ # Composants de page / composants de route
│ 
├── features/ # Modules basés sur les fonctionnalités
│ ├── feature1/ # Fonctionnalité spécifique
│ │ ├── components/ # Composants spécifiques aux fonctionnalités
│ │ ├── hooks/ # Spécifique aux fonctionnalités hooks 
│ │ ├── api/ # Appels d'API spécifiques aux fonctionnalités 
│ │ ├── utils/ # Utilitaires spécifiques aux fonctionnalités 
│ │ ├── types/ # Types spécifiques aux fonctionnalités 
│ │ └── index.ts # Exportations de fonctionnalités 
│ └── feature2/ # Autre fonctionnalité 
│ 
├── services/ # Intégrations de services 
│ ├── api/ # Client et points de terminaison API 
│ ├── auth/ # Service d'authentification 
│ └── analytics/ # Service d'analyse 
│ 
├── store/ # État gestion
│ ├── slices/ # Tranches Redux ou fournisseurs de contexte
│ ├── actions/ # Créateurs d'actions
│ └── selectors/ # Sélecteurs d'état
│ 
├── utils/ # Fonctions utilitaires
│ ├── formatting/ # Utilitaires de formatage
│ ├── validation/ # Utilitaires de validation
│ └── helpers/ # Fonctions d'assistance
│ 
├── types/ # Définitions de types TypeScript
│ ├── api/ # Types de réponses API
│ ├── models/ # Types de modèles de données
│ └── common/ # Type commun Définitions
│ 
├── constants/ # Constantes de l'application
│ 
├── i18n/ # Internationalisation
│ ├── locales/ # Fichiers de traduction
│ └── config.ts # Configuration i18n
│ 
├── config/ # Configuration de l'application
│ ├── routes.ts # Définitions des routes
│ └── settings.ts # Paramètres de l'application
│ 
└── App.tsx # Composant principal de l'application
``` 

## Conventions de nommage

### Fichiers et répertoires

- **Composants React** : PascalCase avec extension
- `Button.tsx`, `UserProfile.tsx` 
- **Hooks** : camelCase avec préfixe « use » 
- `useAuth.ts`, `useFetch.ts` 
- **Utilitaires** : camelCase 
- `formatDate.ts`, `validateEmail.ts` 
- **Constantes** : UPPER_SNAKE_CASE 
- `API_ENDPOINTS.ts`, `ROUTE_PATHS.ts` 
- **Types/Interfaces** : PascalCase avec des noms descriptifs 
- `UserData.ts`, `ApiResponse.ts` 
- **Fichiers de test** : même nom que le fichier testé avec le suffixe « .test » ou « .spec » 
- `Button.test.tsx`, `formatDate.spec.ts` 

### Organisation des composants

- **Fichiers de composants** : Un composant par fichier
- **Structure du composant** : 
```tsx 
// Importations 
import React from 'react'; 
import './styles.css'; 

// Types 
interface ButtonProps { 
// ... 
} 

// Composant 
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => { 
// ... 
return ( 
// JSX 
); 
}; 

// Fonctions d'assistance spécifiques à ce composant
const helperFunction = () => { 
// ... 
}; ``` 

## Organisation des modules 

### Ordre d'importation 

1. Bibliothèques externes 
2. Modules internes 
3. Composants 
4. Hooks 
5. Utilitaires 
6. Types 
7. Ressources/styles 

Exemple : 
```tsx 
// Bibliothèques externes 
import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

// Modules internes 
import { API_ENDPOINTS } from '@/constants/api'; 
import { fetchData } from '@/services/api'; 

// Composants 
import { Button } from '@/components/ui'; 
import { Modal } from '@/components/common'; // Hooks
import { useAuth } from '@/hooks'; 

// Utilitaires
import { formatDate } from '@/utils/formatting'; 

// Types
import type { UserData } from '@/types'; 

// Ressources/styles
import './styles.css'; 
``` 

### Modèles d'exportation

- Utiliser des exportations nommées pour la plupart des composants et fonctions
- Utiliser des exportations en mode baril (index.ts) pour simplifier les importations
- Éviter les exportations par défaut, sauf pour les composants de page

Exemple d'exportation en mode baril : 
```tsx 
// components/ui/index.ts 
export * from './Button'; 
export * from './Input'; 
export * from './Card'; ``` 

## Fichiers de configuration 

### Variables d'environnement 

- Utiliser les fichiers `.env` pour la configuration spécifique à l'environnement 
- Inclure `.env.example` dans la documentation 
- Utiliser les fichiers spécifiques à l'environnement (`.env.development`, `.env.production`) 
- Ne jamais soumettre de valeurs sensibles au contrôle de version 

### Configuration TypeScript 

- Utiliser le mode strict 
- Configurer des alias de chemin pour des importations plus propres 
- Séparer les configurations pour les différents environnements si nécessaire 
- Documenter les choix de configuration non évidents 

### Gestion des paquets 

- Utiliser un fichier de verrouillage (package-lock.json, yarn.lock, pnpm-lock.yaml) 
- Documenter la version Node.js requise 
- Regrouper les dépendances de manière logique dans package.json 
- Séparer les dépendances de développement des dépendances de production 

## Documentation 

### Documentation du code 

- Documenter les fonctions et composants complexes 
- Utiliser JSDoc pour Documentation des fonctions
- Documenter les props des composants React
- Inclure des exemples de composants réutilisables
- Documenter les modèles de gestion d'état

### Documentation du projet

- Inclure un fichier README.md complet
- Documenter le processus de configuration et d'installation
- Inclure les instructions du workflow de développement
- Documenter le processus de build et de déploiement
- Tenir un fichier CHANGELOG.md pour l'historique des versions
- Inclure des directives de contribution

## Bonnes pratiques

- Regrouper les fichiers liés
- Conserver des fichiers de composants compacts et ciblés
- Séparer la logique métier des composants d'interface utilisateur
- Utiliser des alias de chemin pour éviter les chemins d'importation trop longs
- Maintenir une organisation cohérente des fichiers dans l'ensemble du projet
- Documenter la structure du projet pour les nouveaux membres de l'équipe
- Utiliser des générateurs de code pour assurer la cohérence, le cas échéant
- Revoir et refactoriser régulièrement la structure du projet