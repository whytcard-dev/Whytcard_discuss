# Automazione della pipeline CI/CD

Questo documento fornisce configurazioni standardizzate della pipeline CI/CD per automatizzare i processi di build, test e deployment secondo gli standard di sviluppo web.

## Flusso di lavoro di GitHub Actions

### Pipeline di CI di base (GitHub Actions)

```yaml
nome: Pipeline di CI

on:
push:
branch: [ main, develop ]
pull_request:
branch: [ main, develop ]

jobs:
build-and-test:
runs-on: ubuntu-latest

steps:
- uses: actions/checkout@v3

- name: Installa Node.js
uses: actions/setup-node@v3
with:
node-version: '18'
cache: 'npm'

- name: Installa dipendenze
run: npm ci

- name: Lint
run: npm run lint

- name: Controllo del tipo
run: npm run type-check

- name: Test unitari
run: npm run test

- name: Build
run: npm run build

- name: Carica artefatti di build
uses: actions/upload-artifact@v3
with:
name: build-output
path: dist/
```

### Pipeline CI/CD completa (GitHub Actions)

```yaml
name: Pipeline CI/CD

on:
push:
branches: [ main, develop ]
pull_request:
branches: [ main, develop ]

jobs:
code-quality:
runs-on: ubuntu-latest
steps:
- uses: actions/checkout@v3

- name: Imposta Node.js
uses: actions/setup-node@v3
with:
node-version: '18'
cache: 'npm'

- nome: Installa dipendenze
run: npm ci

- nome: Lint
run: npm run lint

- nome: Controllo tipo
run: npm run type-check

- nome: Controllo stile codice
run: npm run format:check

- nome: Audit di sicurezza
run: npm audit --production

test: 
needs: code-quality
runs-on: ubuntu-latest
steps: 
- uses: actions/checkout@v3

- nome: Installa Node.js
uses: actions/setup-node@v3
with: 
node-version: '18'
cache: 'npm'

- nome: Installa dipendenze
run: npm ci

- nome: Test unitari
run: npm run test

- nome: Test di integrazione
run: npm run test:integrazione

- nome: Carica la copertura del test
usa: actions/upload-artifact@v3
con:
nome: test-coverage
percorso: coverage/

build:
necessita: test
in esecuzione: ubuntu-latest
passaggi:
- usa: actions/checkout@v3

- nome: Installa Node.js
usa: actions/setup-node@v3
con:
node-version: '18'
cache: 'npm'

- nome: Installa le dipendenze
esegui: npm ci

- nome: Build
esegui: npm run build

- nome: Carica gli artefatti della build
usa: actions/upload-artifact@v3
con:
nome: build-output
percorso: dist/

e2e-tests:
necessita: build
in esecuzione: ubuntu-latest
passaggi:
- usa: actions/checkout@v3

- nome: Installa Node.js
usa: actions/setup-node@v3
con:
node-version: '18'
cache: 'npm'

- nome: Installa dipendenze
esegui: npm ci

- nome: Scarica artefatti di build
usa: actions/download-artifact@v3
con:
nome: build-output
percorso: dist/

- nome: Test E2E
esegui: npm run test:e2e

- nome: Carica i risultati dei test E2E
usa: actions/upload-artifact@v3
con:
nome: e2e-test-results
percorso: e2e-results/

deploy-staging:
if: github.event_name == 'push' && github.ref == 'refs/heads/develop'
necessità: test e2e
esecuzione su: ubuntu-latest
ambiente: staging
passaggi:
- usi: actions/checkout@v3

- nome: Scarica gli artefatti di build
usi: actions/download-artifact@v3
con:
nome: output di build
percorso: dist/

- nome: Distribuisci in staging
esecuzione: |
# Aggiungi qui il tuo script di distribuzione
echo "Distribuzione in ambiente di staging"

deploy-production:
if: github.event_name == 'push' && github.ref == 'refs/heads/main'
needs: e2e-tests
runs-on: ubuntu-latest
environment: production
steps:
- uses: actions/checkout@v3

- name: Scarica gli artefatti di build
uses: actions/download-artifact@v3
with:
name: build-output
path: dist/

- name: Distribuisci in produzione
run: |
# Aggiungi qui il tuo script di distribuzione
echo "Distribuzione in ambiente di produzione"
```

## Pipeline CI/CD di GitLab

```yaml
fasi:
- validate
- test
- build
- e2e-test
- deploy

variabili:
NODE_VERSION: "18"

cache:
chiave: ${CI_COMMIT_REF_SLUG}
percorsi:
- node_modules/

qualità del codice:
fase: validate
immagine: node:${NODE_VERSION}
script:
- npm ci
- npm run lint
- npm run type-check
- npm run format:check
- npm audit --production

test unitari:
fase: test
immagine: node:${NODE_VERSION}
script:
- npm ci
- npm run test
artefatti:
percorsi:
- coverage/
scadenza: 1 settimana

integration-tests:
fase: test
immagine: node:${NODE_VERSION}
script:
- npm ci
- npm run test:integration
artefatti:
percorsi:
- integration-coverage/
scadenza: 1 settimana

build:
fase: build
immagine: node:${NODE_VERSION}
script:
- npm ci
- npm run build
artefatti:
percorsi:
- dist/
scadenza: 1 settimana

e2e-tests:
fase: e2e-test
immagine: cypress/browsers:node${NODE_VERSION}-chrome
script:
- npm ci
- npm run test:e2e
artefatti:
percorsi:
- e2e-results/ 
expire_in: 1 settimana 

deploy-staging: 
fase: deploy 
immagine: node:${NODE_VERSION} 
script: 
- echo "Distribuzione nell'ambiente di staging" 
# Aggiungi qui il tuo script di distribuzione 
environment: 
name: staging 
only: 
- develop 

deploy-production: 
fase: deploy 
immagine: node:${NODE_VERSION} 
script: 
- echo "Distribuzione nell'ambiente di produzione" 
# Aggiungi qui il tuo script di distribuzione 
environment: 
name: production 
only: 
- main 
when: manual 
``` 

## Pipeline Jenkins

```groovy
pipeline { 
agent { 
docker { 
immagine 'node:18' 
} 
} 

stages { 
stage('Install') { 
steps { 
sh 'npm ci' 
} 
} 

stage('Qualità del codice') { 
parallel { 
stage('Lint') { 
steps { 
sh 'npm esegui lint' 
} 
} 
stage('Controllo tipo') { 
steps { 
sh 'npm esegui controllo tipo' 
} 
} 
stage('Controllo formato') { 
steps { 
sh 'npm esegui controllo formato:' 
} 
} 
stage('Audit di sicurezza') { 
steps { 
sh 'npm audit --production' 
} 
} 
} 
} 

stage('Test') { 
parallel { 
stage('Test unitari') { 
steps { 
sh 'npm esegui test' 
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
reportName: 'Report di copertura'
]) 
} 
} 
} 
stage('Test di integrazione') { 
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
archiveArtifacts artefatti: 'dist/**/*', fingerprint: true 
} 
} 
} 

stage('Test E2E') { 
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
reportName: 'Report di test E2E' 
]) 
} 
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

## Pipeline di Azure DevOps

```yaml 
trigger: 
branch: 
include: 
- main 
- develop 

pool: 
vmImage: 'ubuntu-latest' 

variabili: 
nodeVersion: '18.x'

fasi:
- fase: Convalida
lavori:
- lavoro: CodeQuality
passaggi:
- attività: NodeTool@0
input:
versionSpec: $(nodeVersion)
displayName: 'Installa Node.js'

- script: npm ci
displayName: 'Installa dipendenze'

- script: npm run lint
displayName: 'Esegui linting'

- script: npm run type-check
displayName: 'Esegui controllo tipo'

- script: npm run format:check
displayName: 'Controlla formattazione codice'

- attività: npm@1
input:
comando: 'personalizzato'
customCommand: 'audit --production'
displayName: 'Audit di sicurezza'

- fase: Test
dependsOn: Convalida
lavori:
- lavoro: UnitTests
passaggi:
- attività: NodeTool@0
input:
versionSpec: $(nodeVersion)
displayName: 'Installa Node.js'

- script: npm ci
displayName: 'Installa dipendenze'

- script: npm run test
displayName: 'Esegui test unitari'

- attività: PublishTestResults@2
input:
testResultsFormat: 'JUnit'
testResultsFiles: '**/junit-*.xml'
mergeTestResults: true
testRunTitle: 'Test unitari'
displayName: 'Pubblica risultati test'

- attività: PublishCodeCoverageResults@1
input:
codeCoverageTool: 'Cobertura'
summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml'
reportDirectory: '$(System.DefaultWorkingDirectory)/coverage'
displayName: 'Pubblica la copertura del codice'

- stage: Build
dependsOn: Test
jobs:
- job: BuildApp
steps:
- task: NodeTool@0
inputs:
versionSpec: $(nodeVersion)
displayName: 'Installa Node.js'

- script: npm ci
displayName: 'Installa dipendenze'

- script: npm run build
displayName: 'Compila l'applicazione'

- task: CopyFiles@2
inputs:
sourceFolder: '$(System.DefaultWorkingDirectory)/dist'
contents: '**'
targetFolder: '$(Build.ArtifactStagingDirectory)'
displayName: 'Copia file di build'

- task: PublishBuildArtifacts@1
input: 
pathToPublish: '$(Build.ArtifactStagingDirectory)'
artifactName: 'drop'
displayName: 'Pubblica artefatti di build'

- stage: E2ETest
dependsOn: Build
jobs: 
- job: E2ETests
steps: 
- task: NodeTool@0
input: 
versionSpec: $(nodeVersion)
displayName: 'Installa Node.js'

- script: npm ci
displayName: 'Installa dipendenze'

- task: DownloadBuildArtifacts@0
input: 
buildType: 'current'
downloadType: 'single'
artifactName: 'drop'
downloadPath: '$(System.DefaultWorkingDirectory)/dist'
displayName: 'Scarica artefatti di build'

- script: npm run test:e2e
displayName: 'Esegui test E2E'

- task: PublishTestResults@2
input:
testResultsFormat: 'JUnit'
testResultsFiles: '**/e2e-*.xml'
mergeTestResults: true
testRunTitle: 'Test E2E'
displayName: 'Pubblica risultati test E2E'

- stage: DeployStaging
dependsOn: E2ETest
condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/develop'))
jobs:
- deployment: DeployStaging
environment: staging
strategia:
runOnce:
deploy:
passaggi:
- script: echo "Distribuzione in ambiente di staging"
displayName: 'Distribuzione in staging'

- fase: DeployProduction
dependsOn: E2ETest
condizione: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
lavori:
- deployment: DeployProduction
ambiente: produzione
strategia:
runOnce:
deploy:
passaggi:
- script: echo "Distribuzione in ambiente di produzione"
displayName: 'Distribuzione in produzione'
```

## Best practice per pipeline CI/CD

1. **Fail Fast**: eseguire prima controlli rapidi come linting e controllo dei tipi per fornire un feedback rapido
2. **Esecuzione parallela**: eseguire lavori indipendenti in parallelo per ridurre la durata della pipeline
3. **Memorizzazione nella cache**: Dipendenze nella cache per velocizzare le build
4. **Artefatti**: condividere gli artefatti di build tra i job per evitare la ricostruzione
5. **Separazione degli ambienti**: utilizzare ambienti diversi per lo staging e la produzione
6. **Approvazione manuale**: richiedere l'approvazione manuale per le distribuzioni in produzione
7. **Notifiche**: impostare le notifiche per gli errori della pipeline
8. **Gestione dei segreti**: utilizzare metodi sicuri per gestire segreti e credenziali
9. **Versioning**: includere le informazioni sulla versione negli artefatti di build
10. **Monitoraggio**: monitorare le prestazioni della pipeline e ottimizzarle secondo necessità

## Checklist di implementazione

- [ ] Impostare il repository di controllo versione
- [ ] Configurare la piattaforma CI/CD preferita
- [ ] Creare la configurazione di base della pipeline
- [ ] Aggiungere controlli di qualità del codice
- [ ] Configurare i test runner
- [ ] Impostare il processo di build
- [ ] Configurare gli ambienti di distribuzione
- [ ] Impostare le notifiche
- [ ] Utilizzo e manutenzione della pipeline dei documenti
- [ ] Formazione del team sul flusso di lavoro CI/CD
