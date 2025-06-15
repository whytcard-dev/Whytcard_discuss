# Automatisation du pipeline CI/CD

Ce document fournit des configurations de pipeline CI/CD standardisées pour automatiser les processus de création, de test et de déploiement conformément aux normes de développement web.

## Workflow des actions GitHub

### Pipeline d'intégration continue de base (actions GitHub)

```yaml 
name: Pipeline d'intégration continue

on: 
push: 
branches: [ main, develop ] 
pull_request: 
branches: [ main, develop ] 

jobs: 
build-and-test: 
runs-on: ubuntu-latest 

steps: 
- uses: actions/checkout@v3 

- name: Setup Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Install dependencies 
run: npm ci 

- name: Lint 
run: npm run lint 

- name: Type check 
run: npm run type-check 

- name: Unit Tests
Exécution : npm run test

- nom : Build
Exécution : npm run build

- nom : Télécharger les artefacts de build
Utilisation : actions/upload-artifact@v3
Avec :
Nom : build-output
Chemin : dist/
```

### Pipeline CI/CD complet (actions GitHub)

```yaml
Nom : Pipeline CI/CD

Activé :
Push :
Branches : [ main, develop ]
Pull_request :
Branches : [ main, develop ]

Tâches :
Qualité du code :
Exécution sur : ubuntu-latest
Étapes :
- Utilisation : actions/checkout@v3

- nom : Configurer Node.js
Utilisation : actions/setup-node@v3
Avec :
Version du nœud : '18'
Cache : 'npm'

- nom : Installer les dépendances
exécuter : npm ci

- nom : Lint
exécuter : npm run lint

- nom : Vérification de type
exécuter : npm run type-check

- nom : Vérification du style de code
exécuter : npm run format:check

- nom : Audit de sécurité
exécuter : npm audit --production

test : 
besoins : code-quality
exécutions : ubuntu-latest
étapes : 
- utilisations : actions/checkout@v3

- nom : Configurer Node.js
utilisations : actions/setup-node@v3
avec : 
version-node : '18' 
cache : 'npm'

- nom : Installer les dépendances
exécuter : npm ci

- nom : Tests unitaires
exécuter : npm run test

- nom : Tests d'intégration
exécuter : npm run test:integration

- nom : Télécharger la couverture de test
utilise : actions/upload-artifact@v3
avec :
nom : test-coverage
chemin : coverage/

build :
besoins : test
exécute sur : ubuntu-latest
étapes :
- utilisation : actions/checkout@v3

- nom : Configurer Node.js
utilise : actions/setup-node@v3
avec :
version-node : '18'
cache : 'npm'

- nom : Installer les dépendances
exécuter : npm ci

- nom : Build
exécuter : npm run build

- nom : Télécharger les artefacts de build
utilise : actions/upload-artifact@v3
avec :
nom : build-output
chemin : dist/

e2e-tests :
besoins : build
exécute sur : ubuntu-latest 
étapes : 
- utilisation : actions/checkout@v3 

- nom : Configuration de Node.js 
utilisation : actions/setup-node@v3 
avec : 
version-du-nœud : '18' 
cache : 'npm' 

- nom : Installation des dépendances 
exécution : npm ci 

- nom : Téléchargement des artefacts de build 
utilisation : actions/download-artifact@v3 
avec : 
nom : build-output 
chemin : dist/ 

- nom : Tests E2E 
exécution : npm run test:e2e 

- nom : Téléchargement des résultats des tests E2E 
utilisation : actions/upload-artifact@v3 
avec : 
nom : e2e-test-results 
chemin : e2e-results/ 

déploiement-staging : 
si : github.event_name == 'push' && github.ref == 'refs/heads/develop' 
besoins : e2e-tests 
exécution sur : ubuntu-latest 
environnement : staging 
étapes : 
- utilisations : actions/checkout@v3 

- nom : Télécharger les artefacts de build 
utilisations : actions/download-artifact@v3 
avec : 
nom : build-output 
chemin : dist/ 

- nom : Déployer vers le staging 
exécution : | # Ajoutez votre script de déploiement ici
echo "Déploiement vers l'environnement de test"

deploy-production: 
if: github.event_name == 'push' && github.ref == 'refs/heads/main' 
needs: e2e-tests 
runs-on: ubuntu-latest 
environment: production 
steps: 
- uses: actions/checkout@v3 

- name: Télécharger les artefacts de build 
uses: actions/download-artifact@v3 
with: 
name: build-output 
path: dist/ 

- name: Déployer en production 
run: | # Ajoutez votre script de déploiement ici
echo "Déploiement en production"
``` 

## Pipeline CI/CD GitLab

```yaml

Étapes :
- valider
- tester
- construire
- e2e-test
- déployer

Variables :
NODE_VERSION : "18"

cache :
clé : ${CI_COMMIT_REF_SLUG}
chemins :
- node_modules/

qualité du code :
étape : valider
image : node:${NODE_VERSION}
script :
- npm ci
- npm run lint
- npm run type-check
- npm run format:check
- npm audit --production

Tests unitaires :
étape : tester
image : node:${NODE_VERSION}
script :
- npm ci
- npm run test
Artefacts : 
Chemins : 
- coverage/ 
Expiration dans : 1 semaine 

Tests d’intégration : 
Étape : test 
Image : node:${NODE_VERSION} 
Script : 
- npm ci 
- npm run test:integration 
Artefacts : 
Chemins : 
- integration-coverage/ 
Expiration dans : 1 semaine 

Build : 
Étape : build 
Image : node:${NODE_VERSION} 
Script : 
- npm ci 
- npm run build 
Artefacts : 
Chemins : 
- dist/ 
Expiration dans : 1 semaine 

Tests e2e : 
Étape : e2e-test 
Image : cypress/browsers:node${NODE_VERSION}-chrome 
Script : 
- npm ci 
- npm run test:e2e 
Artefacts : 
Chemins : 
- e2e-results/
expiration_dans : 1 semaine

deploy-staging : 
stage : deploy 
image : node : ${NODE_VERSION} 
script : 
- echo « Déploiement vers l'environnement de test » 
# Ajoutez votre script de déploiement ici 
environment : 
name : staging 
only : 
- develop 

deploy-production : 
stage : deploy 
image : node : ${NODE_VERSION} 
script : 
- echo « Déploiement vers l'environnement de production » 
# Ajoutez votre script de déploiement ici 
environment : 
name : production 
only : 
- main 
when : manual 
``` 

## Pipeline Jenkins 

```groovy 
pipeline { 
agent { 
docker { 
image 'node:18' 
} 
} 

stages { 
stage('Install') { 
steps { 
sh 'npm ci' 
} 
} 

stage('Qualité du code') { 
parallèle { 
stage('Peluche') { 
étapes { 
sh 'npm run lint' 
} 
} 
stage('Vérification du type') { 
étapes { 
sh 'npm run type-check' 
} 
} 
stage('Vérification du format') { 
étapes { 
sh 'npm run format:check' 
} 
} 
stage('Audit de sécurité') { 
étapes { 
sh 'npm audit --production' 
} 
} 
} 
} 

stage('Test') { 
parallèle { 
stage('Tests unitaires') { 
étapes { 
sh 'npm run test' 
} 
post { 
always { 
junit 'junit-reports/*.xml' 
publishHTML(target: [ 
allowMissing: false, 
alwaysLinkToLastBuild: false, 
keepAll: true, 
reportDir: 'coverage', 
reportFiles: 'index.html', 
reportName: 'Rapport de couverture' 
]) 
} 
} 
} 
stage('Tests d'intégration') { 
steps { 
sh 'npm run test:integration' 
} 
} 
} 
} 

stage('Build') { 
steps { 
sh 'npm run build' 
} 
post { 
success { 
archiveArtifacts artifacts: 'dist/**/*', fingerprint: true 
} 
} 
} 

stage('Tests E2E') { 
steps { 
sh 'npm run test:e2e' 
} 
post { 
always { 
publishHTML(target: [ 
allowMissing: false, 
alwaysLinkToLastBuild: false, 
keepAll: true, 
reportDir: 'e2e-results', 
reportFiles: 'index.html', 
reportName: 'Rapport de test E2E' 
]) 
} 
} 
} 

post { 
always { 
cleanWs() 
} 
} 
} 
``` 

## Azure DevOps Pipeline 

```yaml 
trigger: 
branches: 
include: 
- main 
- develop 

pool: 
vmImage: 'ubuntu-latest' 

variables: 
nodeVersion: '18.x' 

Étapes :
- étape : Valider
Tâches :
- tâche : CodeQuality
Étapes :
- tâche : NodeTool@0
Entrées :
versionSpec : $(nodeVersion)
Nom d’affichage : Installer Node.js

- script : npm ci
Nom d’affichage : Installer les dépendances

- script : npm run lint
Nom d’affichage : Exécuter le linting

- script : npm run type-check
Nom d’affichage : Exécuter la vérification du type

- script : npm run format:check
Nom d’affichage : Vérifier le formatage du code

- tâche : npm@1
Entrées :
commande : Personnalisé
Commande personnalisée : Audit --production
Nom d’affichage : Audit de sécurité

- étape : Test
dependsOn : Valider
Tâches :
- tâche : UnitTests
étapes :
- tâche : NodeTool@0
entrées :
versionSpec : $(nodeVersion)
displayName : 'Installer Node.js'

- script : npm ci
displayName : 'Installer les dépendances'

- script : npm run test
displayName : 'Exécuter les tests unitaires'

- tâche : PublishTestResults@2
entrées :
testResultsFormat : 'JUnit'
testResultsFiles : '**/junit-*.xml'
mergeTestResults : true
testRunTitle : 'Tests unitaires'
displayName : 'Publier les résultats des tests'

- tâche : PublishCodeCoverageResults@1
entrées :
codeCoverageTool : 'Cobertura'
summaryFileLocation : '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml' 
reportDirectory: '$(System.DefaultWorkingDirectory)/coverage' 
displayName: 'Publier la couverture du code' 

- stage: Build 
dependsOn: Test 
jobs: 
- job: BuildApp 
steps: 
- task: NodeTool@0 
inputs: 
versionSpec: $(nodeVersion) 
displayName: 'Installer Node.js' 

- script: npm ci 
displayName: 'Installer les dépendances' 

- script: npm run build 
displayName: 'Créer l'application' 

- task: CopyFiles@2 
inputs: 
sourceFolder: '$(System.DefaultWorkingDirectory)/dist' 
contents: '**' 
targetFolder: '$(Build.ArtifactStagingDirectory)' 
displayName: 'Copier les fichiers de build' 

- task: PublishBuildArtifacts@1 
inputs: 
pathToPublish: '$(Build.ArtifactStagingDirectory)' 
artifactName: 'drop' 
displayName: 'Publier les artefacts de build' 

- stage: E2ETest 
dependsOn: Build 
jobs: 
- job: E2ETests 
steps: 
- task: NodeTool@0 
inputs: 
versionSpec: $(nodeVersion) 
displayName: 'Installer Node.js' 

- script: npm ci 
displayName: 'Installer les dépendances' 

- task: DownloadBuildArtifacts@0 
inputs: 
buildType: 'current' 
downloadType: 'single' 
artifactName: 'drop' 
downloadPath: '$(System.DefaultWorkingDirectory)/dist' 
displayName: 'Télécharger les artefacts de build' 

- script: npm run test:e2e 
displayName: 'Exécuter les tests E2E' 

- task: PublishTestResults@2 
inputs: 
testResultsFormat: 'JUnit' 
testResultsFiles: '**/e2e-*.xml' 
mergeTestResults: true 
testRunTitle: 'Tests E2E' 
displayName: 'Publier les résultats des tests E2E' 

- stage: DeployStaging 
dependsOn: E2ETest 
condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/develop')) 
jobs: 
- deployment: DeployStaging 
environment: staging 
Stratégie : 
runOnce : 
déploiement : 
étapes : 
- script : echo « Déploiement vers l'environnement de test » 
displayName : « Déployer vers l'environnement de test » 

- étape : DeployProduction 
dependsOn : E2ETest 
condition : and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main')) 
tâches : 
- déploiement : DeployProduction 
environnement : production 
Stratégie : 
runOnce : 
déploiement : 
étapes : 
- script : echo « Déploiement vers l'environnement de production » 
displayName : « Déployer vers la production » 
``` 

## Bonnes pratiques pour les pipelines CI/CD

1. **Fail Fast** : Exécutez d'abord des vérifications rapides comme le linting et la vérification de type pour obtenir un retour rapide.
2. **Exécution parallèle** : Exécutez des tâches indépendantes en parallèle pour réduire la durée du pipeline.
3. **Mise en cache** : Mettez en cache les dépendances pour accélérer Builds
4. **Artefacts** : Partage des artefacts de build entre les tâches pour éviter les reconstructions
5. **Séparation des environnements** : Utilisation d'environnements différents pour le pré-production et la production
6. **Approbation manuelle** : Exigence d'approbation manuelle pour les déploiements en production
7. **Notifications** : Configuration de notifications en cas d'échec du pipeline
8. **Gestion des secrets** : Utilisation de méthodes sécurisées pour gérer les secrets et les identifiants
9. **Gestion des versions** : Inclusion des informations de version dans les artefacts de build
10. **Surveillance** : Surveillance des performances du pipeline et optimisation si nécessaire

## Liste de contrôle d'implémentation

- [ ] Configuration du référentiel de contrôle de version
- [ ] Configuration de la plateforme CI/CD de votre choix
- [ ] Création d'une configuration de pipeline de base
- [ ] Ajout de contrôles qualité du code
- [ ] Configuration des exécuteurs de tests
- [ ] Configuration du processus de build
- [ ] Configuration des environnements de déploiement
- [ ] Configuration des notifications
- [ ] Documentation de l'utilisation et de la maintenance du pipeline
- [ ] Formation de l'équipe sur le flux de travail CI/CD
