# Architecture globale de WhytCard

## Introduction

Ce document présente l'architecture globale du projet WhytCard, une plateforme open source de web scraping et d'entraînement à l'IA. L'architecture est conçue pour être modulaire, évolutive et maintenable, facilitant l'ajout de nouvelles fonctionnalités tout en garantissant la stabilité du système.

## Présentation

WhytCard est organisé selon une architecture client-serveur avec une séparation claire entre le front-end et le back-end. Cette séparation permet une évolution indépendante des deux composants et facilite le travail en équipe.

``` 
┌──────────────────┐ ┌────────────────┐ 
│ │ │ │ 
│ Frontend │◄────►│ Backend │ 
│ (Vue.js) │ │ (FastAPI) │ 
│ │ │ │ 
└──────────────────┘ └─────────────────┘ 
▲ 
│ 
▼ 
┌──────────────────┐ 
│ │ 
│ Scraping et │ 
│ Pipeline de données │ 
│ │ 
└──────────────────┘ 
▲ 
│ 
▼ 
┌─────────────────┐ 
│ │ 
│ Stockage │ 
│ │ 
└───────────────────┘ 
``` 

## Principal Composants

### 1. Frontend (Vue.js)

Le frontend est développé avec Vue.js et utilise Tailwind CSS pour le style. Il est responsable de l'interface utilisateur et de l'expérience utilisateur.

#### Fonctionnalités clés

- **Framework** : Vue.js 3 avec API de composition
- **Style** : Tailwind CSS
- **Animations** : Framer Motion
- **Internationalisation** : i18next avec détection automatique de la langue du navigateur
- **Routage** : Vue Router
- **Gestion des états** : Pinia

#### Structure

``` 
src/ 
├── components/ # Composants réutilisables
├── config/ # Configuration du frontend
├── i18n/ # Fichiers de traduction
├── router/ # Configuration des routes
├── views/ # Pages principales
└── main.js # Point d'entrée
``` 

### 2. Backend (FastAPI)

Le backend est développé avec FastAPI, une solution moderne et Framework Python hautes performances pour la création d'API. Il gère toutes les opérations serveur, l'accès aux données et la logique métier. #### Fonctionnalités clés

- **Framework** : FastAPI
- **Authentification** : JWT
- **Validation** : Pydantic
- **Documentation API** : Interface utilisateur Swagger intégrée

#### Structure

``` 
backend/ 
├── config/ # Configuration du backend
├── core/ # Logique métier principale
│ ├── api/ # Points de terminaison de l'API
│ └── schemas/ # Schémas Pydantic 
├── models/ # Modèles de données 
├── utils/ # Utilitaires 
└── main.py # Point d'entrée
``` 

### 3. Scraping et pipeline de données

Ce module est responsable de la collecte de données à partir de sources web et le transformer pour l'entraînement des modèles d'IA.

#### Fonctionnalités clés

- **Scraping** : Système asynchrone avec aiohttp et BeautifulSoup
- **Orchestration** : Gestion des tâches et des priorités
- **Transformation** : Nettoyage et normalisation des données
- **Cache** : Système de mise en cache pour éviter les requêtes redondantes

#### Structure

``` 
backend/ 
├── scraping/ 
│ ├── scrapers/ # Implémentations spécifiques pour différentes sources 
│ ├── utils/ # Utilitaires de scraping 
│ ├── orchestrator.py # Orchestrateur de tâches 
│ └── cache.py # Système de mise en cache 
└── datasets/ # Données collectées et transformées 
``` 

### 4. Stockage

Le système de stockage gère la persistance et l'accès aux données.

#### Options de stockage

- **Base de données** : PostgreSQL pour les données structurées
- **Stockage de fichiers** : Système de fichiers local ou compatible S3 pour les données volumineuses
- **Cache** : Redis pour le cache distribué

## Flux de données

### 1. Collecte de données

``` 
┌──────────────┐ ┌─────────────┐ ┌─────────────┐ 
│ │ │ │ │ │ 
│ Web │────►│ Scrapers │────►│ Cache │ 
│ Sources │ │ │ │ │ 
└──────────────┘ └─────────────┘ └──────────────┘ 
│ 
▼ 
┌──────────────┐ ┌─────────────┐ 
│ │ │ │ 
│ Processeurs │────►│ Stockage │ 
│ │ │ │ 
└─────────────┘ └─────────────┘ 
``` 

1. Les scrapers collectent des données à partir de sources web.
2. Les données sont mises en cache pour éviter les requêtes redondantes.
3. Les processeurs nettoient et transforment les données.
4. Les données transformées sont stockées pour une utilisation ultérieure.

### 2. Entraînement du modèle.

``` 
┌──────────────┐ ┌────────────────┐ ┌─────────────┐ 
│ │ │ │ │ │ │ 
│ Ensembles de données │────►│ Préprocesseur│────►│ Entraînement │ 
│ │ │ │ │ │ 
└──────────────┘ └──────────────┘ └─────────────┘ 
│ 
▼ 
┌──────────────┐ 
│ │ 
│ Modèles │ 
│ │ 
└──────────────┘ 
``` 

1. Les ensembles de données sont Extrait du stockage
2. Les données sont prétraitées pour l'entraînement
3. Les modèles sont entraînés sur les données prétraitées
4. Les modèles entraînés sont enregistrés

### 3. Utilisation du modèle

``` 
┌──────────────┐ ┌─────────────┐ ┌─────────────┐ 
│ │ │ │ │ │ 
│ API │────►│ Modèles │────►│ Réponse │ 
│ Requête │ │ │ │ │ 
└─────────────┘ └─────────────┘ └──────────────┘ 
``` 

1. Une requête API est reçue.
2. Des modèles appropriés sont utilisés pour traiter la requête.
3. Une réponse est générée et renvoyée.

## Communication entre les composants

### API REST

La communication entre le front-end et le back-end s'effectue principalement via une API REST. Les points de terminaison sont organisés de manière logique et documentés avec l'interface utilisateur Swagger.

### WebSockets

Pour les fonctionnalités nécessitant des mises à jour en temps réel (comme le suivi des tâches de scraping), les WebSockets permettent une communication bidirectionnelle.

### File d'attente de messages

Pour les tâches asynchrones et de longue durée, une file d'attente de messages (comme RabbitMQ ou Redis Pub/Sub) permet de découpler les composants et de garantir la fiabilité.

## Déploiement

### Options de déploiement

WhytCard peut être déployé de plusieurs manières :

1. **Application de bureau** : Utilisation de Tauri pour créer une application de bureau multiplateforme
2. **Déploiement cloud** : Déploiement sur des services cloud comme AWS, GCP ou Azure
3. **Auto-hébergement** : Installation sur un serveur personnel ou d'entreprise

### Architecture de déploiement

``` 
┌──────────────────┐ ┌──────────────────┐ 
│ │ │ │ 
│ Frontend │◄────►│ Passerelle API │ 
│ (Statique) │ │ │ 
└──────────────────┘ └──────────────────┘ 
▲ 
│ 
▼ 
┌──────────────────┐ 
│ │ 
│ API back-end │ 
│ │ 
└──────────────────┘ 
▲ 
│ 
▼ 
┌───────────────────┐ ┌──────────────────┐ 
│ │ │ │ 
│ Base de données │ │ Stockage de fichiers │ 
│ │ │ │ 
└───────────────────┘ └──────────────────┘ 
``` 

## Sécurité

### Principes de sécurité

1. **Défense en profondeur** : Plusieurs couches de sécurité
2. **Principe du moindre privilège** : Accès minimal nécessaire
3. **Validation des entrées** : Toutes les entrées utilisateur sont validées
4. **Protection des données** : Chiffrement des données sensibles

### Mesures de sécurité

- **Authentification** : JWT avec rotation des jetons
- **Autorisation** : Contrôle d'accès basé sur les rôles
- **Protection contre les attaques courantes** : XSS, CSRF, injection SQL
- **Audit** : Journalisation des actions importantes

## Évolutivité

L'architecture est conçue pour être évolutive horizontalement et verticalement :

- **Microservices** : Les composants peuvent être déployés indépendamment
- **Mise en cache** : Utilisation de caches multi-niveaux
- **Équilibrage de charge** : Répartition du trafic entre plusieurs instances
- **Partitionnement** : Séparation des données pour améliorer les performances

## Surveillance et observabilité

- **Journalisation** : Journalisation centralisée avec ELK Stack ou équivalent
- **Métriques** : Collecte de métriques avec Prometheus
- **Traçage** : Suivi des requêtes avec OpenTelemetry
- **Alertes** : Alertes basées sur des seuils prédéfinis

## Conclusion

L’architecture de WhytCard est conçue pour être robuste, évolutive et maintenable. La séparation claire des responsabilités entre les différents composants permet une évolution indépendante et facilite le travail en équipe. Les choix technologiques ont été effectués en tenant compte des besoins actuels et futurs du projet, ainsi que des meilleures pratiques du secteur.

Cette architecture sera régulièrement revue et mise à jour pour s’adapter aux nouveaux besoins et aux évolutions technologiques.

--- 

Dernière mise à jour : 15/01/2025