# Automatisering av CI/CD-pipeline

Detta dokument tillhandahåller standardiserade CI/CD-pipelinekonfigurationer för att automatisera bygg-, test- och distributionsprocesser enligt webbutvecklingsstandarder.

## GitHub Actions Workflow

### Grundläggande CI Pipeline (GitHub Actions)

```yaml
namn: CI Pipeline

på:
push:
branches:[main,develop]
pull_request:
branches:[main,develop]

jobs:
build-and-test:
runs-on:ubuntu-latest

steps:
-uses: actions/checkout@v3

-name: Setup Node.js
uses: actions/setup-node@v3
with:
node-version: '18'
cache: 'npm'

-name: Installera beroenden
run: npm ci

-name: Lint
run: npm run lint

-name: Typkontroll
run: npm run type-check

-name: Enhetstester
run: npm kör test 

- namn: Bygg 
kör: npm kör bygg 

- namn: Ladda upp byggartefakter 
använder: actions/upload-artefakt@v3 
med: 
namn: bygg-utdata 
sökväg: dist/ 
``` 

### Komplett CI/CD-pipeline (GitHub-åtgärder) 

```yaml 
namn: CI/CD-pipeline 

på: 
push: 
branches: [ main, develop ] 
pull_request: 
branches: [ main, develop ] 

jobs: 
code-quality: 
runs-on: ubuntu-latest 
steg: 
- använder: actions/checkout@v3 

- namn: Konfigurera Node.js 
använder: actions/setup-node@v3 
med: 
nod-version: '18' 
cache: 'npm' 

- namn: Installera beroenden 
kör: npm ci 

- namn: Lint 
run: npm run lint 

- namn: Typkontroll 
run: npm run type-check 

- namn: Kodstilkontroll 
run: npm run format:check 

- namn: Säkerhetsrevision 
run: npm audit --production 

test: 
behov: kodkvalitet 
körs på: ubuntu-senaste 
steg: 
- använder: actions/checkout@v3 

- namn: Konfigurera Node.js 
använder: actions/setup-node@v3 
med: 
nodversion: '18' 
cache: 'npm' 

- namn: Installera beroenden 
run: npm ci 

- namn: Enhetstester 
run: npm run test 

- namn: Integrationstester 
run: npm run test:integration 

- namn: Ladda upp testtäckning 
använder: actions/upload-artefakt@v3 
med: 
namn: test-täckning 
sökväg: täckning/ 

build: behöver: test körs-på: ubuntu-senaste 
steg: - använder: actions/checkout@v3 

- namn: Konfigurera Node.js använder: actions/setup-node@v3 
med: nod-version: '18' cache: 'npm' 

- namn: Installera beroenden 
kör: npm ci 

- namn: Bygg 
kör: npm kör bygg 

- namn: Ladda upp byggartefakter 
använder: actions/upload-artefakt@v3 
med: namn: bygg-utgång sökväg: dist/ 

e2e-tests: behöver: bygg körs-på: ubuntu-senaste steg: - använder: actions/checkout@v3 

- namn: Konfigurera Node.js använder: actions/setup-node@v3 med: nodversion: '18' cache: 'npm' 
- namn: Installera beroenden kör: npm ci 
- namn: Ladda ner byggartefakter använder: actions/download-artefakt@v3 med: namn: bygg-utdata sökväg: dist/ 
- namn: E2E-tester kör: npm kör test:e2e 
- namn: Ladda upp E2E-testresultat använder: actions/upload-artefakt@v3 med: namn: e2e-test-resultat sökväg: e2e-resultat/ deploy-staging: om: github.event_name == 'push' && github.ref == 'refs/heads/develop' behöver: e2e-tester körs-på: ubuntu-senaste miljö: staging steg: - använder: actions/checkout@v3 
- namn: Ladda ner byggartefakter använder: actions/download-artefakt@v3 med: namn: build-output sökväg: dist/ 
- namn: Distribuera till staging kör: | # Lägg till ditt distributionsskript här echo "Distribuerar till staging-miljö" 

deploy-production: 
if: github.event_name == 'push' && github.ref == 'refs/heads/main' needs: e2e-tests runs-on: ubuntu-latest environment: production steps: - uses: actions/checkout@v3 

- name: Ladda ner byggartefakter uses: actions/download-artifact@v3 with: name: build-output path: dist/ 

- name: Distribuera till produktion run: | 
# Lägg till ditt distributionsskript här 
echo "Distribuerar till produktionsmiljö" 
``` 

## GitLab CI/CD-pipeline 

```yaml 
stages: 
- validate 
- test 
- build 
- e2e-test 
- deploy 

variables: 
NODE_VERSION: "18" 

cache: 
key: ${CI_COMMIT_REF_SLUG} 
paths: 
- node_modules/ 

code-quality: 
stage: validate 
image: node:${NODE_VERSION} 
script: 
- npm ci 
- npm run lint 
- npm run type-check 
- npm run format:check 
- npm audit --production 

unit-tests: 
stage: test 
image: node:${NODE_VERSION} 
script: 
- npm ci 
- npm run test 
artefakter: sökvägar: - täckning/ expire_in: 1 vecka 

integrationstester: stage: test image: node:${NODE_VERSION} script: - npm ci - npm kör test:integration artefakter: sökvägar: - integration-täckning/ expire_in: 1 vecka 

build: stage: build image: node:${NODE_VERSION} script: - npm ci - npm kör build artefakter: sökvägar: - dist/ expire_in: 1 vecka 

e2e-tests: stage: e2e-test image: cypress/browsers:node${NODE_VERSION}-chrome script: - npm ci - npm kör test:e2e artefakter: sökvägar: - e2e-resultat/ 
expire_in: 1 vecka 

deploy-staging: 
stage: deploy 
image: node:${NODE_VERSION} 
script: 
- echo "Distribuerar till staging-miljö" 
# Lägg till ditt distributionsskript här 
environment: 
name: staging 
only: 
- develop 

deploy-production: 
stage: deploy 
image: node:${NODE_VERSION} 
script: 
- echo "Distribuerar till produktionsmiljö" 
# Lägg till ditt distributionsskript här 
environment: 
name: production 
only: 
- main 
when: manual 
``` 

## Jenkins Pipeline 

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
} stage('Kodkvalitet') { } } } } stage('Lint') { } steps { } 'sh 'npm kör lint' } } } } stage('Typkontroll') { } steps { } 'sh 'npm kör typkontroll' } } } } } stage('Formatkontroll') { } steps { } 'sh 'npm kör format:kontroll' } } } } } stage('Säkerhetsgranskning') { } steps { } 'sh 'npm granskning --produktion' } } } } } } } } } } } } } stage('Test') { } } } stage('Enhetstester') { } steps { } 'sh 'npm kör test' } } } post { } always { } junit 'junit-rapporter/*.xml' } publishHTML(target: [ } allowMissing: false, } alwaysLinkToSistaBygg: falskt, 
keepAll: sant, 
reportDir: 'täckning', 
reportFiles: 'index.html', 
reportName: 'Täckningsrapport' 
]) 
} 
} 
} stage('Integrationstester') { 
steps { 
sh 'npm kör test:integration' 
} 
} 
} 
} 
stage('Bygg') { 
steps { 
sh 'npm kör bygg' 
} post { 
success { 
archiveArtifacts artefakter: 'dist/**/*', fingeravtryck: sant 
} 
} 
} 
stage('E2E-tester') { 
steps { 
sh 'npm kör test:e2e' 
} post { 
always { 
publishHTML(mål: [ 
allowMissing: falskt, 
alwaysLinkToLastBuild: false, 
keepAll: true, 
reportDir: 'e2e-resultat', 
reportFiles: 'index.html', 
reportName: 'E2E-testrapport' 
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

stages: 
- stage: Validera 
jobs: 
- job: CodeQuality 
steps: 
- task: NodeTool@0 
inputs: 
versionSpec: $(nodeVersion) 
displayName: 'Installera Node.js' 
- script: npm ci displayName: 'Installera beroenden' 
- script: npm run lint displayName: 'Kör linting' 
- script: npm run type-check displayName: 'Kör typkontroll' 
- script: npm run format:check displayName: 'Kontrollera kodformatering' 
- task: npm@1 inputs: command: 'custom' customCommand: 'audit --production' displayName: 'Säkerhetsgranskning' 

- stage: Test dependsOn: Validera jobs: 
- job: UnitTests steps: 
- task: NodeTool@0 inputs: versionSpec: $(nodeVersion) displayName: 'Installera Node.js' 
- script: npm ci displayName: 'Installera beroenden' 

- skript: npm kör test displayName: 'Kör enhetstester' 

- uppgift: PublishTestResults@2 indata: testResultsFormat: 'JUnit' testResultsFiles: '**/junit-*.xml' mergeTestResults: true testRunTitle: 'Enhetstester' displayName: 'Publicera testresultat' 

- uppgift: PublishCodeCoverageResults@1 indata: codeCoverageTool: 'Täckning' summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/täckning-coverage.xml' reportDirectory: '$(System.DefaultWorkingDirectory)/coverage' displayName: 'Publicera kodtäckning' 

- steg: Bygg dependsOn: Test jobb: - jobb: BuildApp steg: - uppgift: NodeTool@0 indata: versionSpec: $(nodeVersion) displayName: 'Installera Node.js' 

- skript: npm ci displayName: 'Installera beroenden' 

- skript: npm run build displayName: 'Bygg applikation' 

- uppgift: CopyFiles@2 indata: sourceFolder: '$(System.DefaultWorkingDirectory)/dist' contents: '**' targetFolder: '$(Build.ArtifactStagingDirectory)' displayName: 'Kopiera byggfiler' 

- uppgift: PublishBuildArtifacts@1 indata: pathToPublicate: '$(Build.ArtifactStagingDirectory)' artifactName: 'drop' displayName: 'Publicera byggartefakter' 

- stage: E2ETest dependsOn: Bygg jobb: 
- jobb: E2ETests steg: - uppgift: NodeTool@0 indata: versionSpec: $(nodeVersion) displayName: 'Installera Node.js' 
- skript: npm ci displayName: 'Installera beroenden' 
- uppgift: DownloadBuildArtifacts@0 indata: buildType: 'current' downloadType: 'single' artifactName: 'drop' downloadPath: '$(System.DefaultWorkingDirectory)/dist' displayName: 'Ladda ner build-artefakter' 
- skript: npm run test:e2e displayName: 'Kör E2E-tester' 
- uppgift: PublishTestResults@2 indata: testResultsFormat: 'JUnit' testResultsFiles: '**/e2e-*.xml' mergeTestResults: true testRunTitle: 'E2E-tester' displayName: 'Publicera E2E-testresultat' 

- stage: DeployStaging 
dependsOn: E2ETest 
condition: and(succedeed(), eq(variables['Build.SourceBranch'], 'refs/heads/develop')) 
jobs: 
- deployment: DeployStaging 
environment: staging 
strategy: 
runOnce: 
deploy: 
steps: 
- script: echo "Distribuerar till staging-miljö" 
displayName: 'Distribuera till staging' 

- stage: DeployProduction 
dependsOn: E2ETest 
condition: and(succedeed(), eq(variables['Build.SourceBranch'], 'refs/heads/main')) 
jobs: 
- deployment: DeployProduction 
environment: production 
strategy: 
runOnce: 
deploy: 
steps: 
- script: echo "Distribuerar till produktion miljö" 
displayName: 'Distribuera till produktion' 
``` 

## Bästa praxis för CI/CD-pipeliner 

1. **Fail Fast**: Kör snabba kontroller som linting och typkontroll först för att ge snabb feedback 
2. **Parallell körning**: Kör oberoende jobb parallellt för att minska pipeline-längden 
3. **Cachelagring**: Cacheberoenden för att snabba upp byggen 
4. **Artefakter**: Dela byggartefakter mellan jobb för att undvika ombyggnad 
5. **Miljöseparation**: Använd olika miljöer för staging och produktion 
6. **Manuellt godkännande**: Kräv manuellt godkännande för produktionsdistributioner 
7. **Meddelanden**: Konfigurera meddelanden för pipeline-fel 
8. **Hemlighetshantering**: Använd säkra metoder för att hantera hemligheter och autentiseringsuppgifter 
9. **Versionshantering**: Inkludera versionsinformation i byggartefakter 
10. **Övervakning**: Övervaka pipeline-prestanda och optimera efter behov 

## Implementeringschecklista 

- [ ] Konfigurera versionskontroll repository
- [ ] Konfigurera valfri CI/CD-plattform
- [ ] Skapa grundläggande pipelinekonfiguration
- [ ] Lägg till kodkvalitetskontroller
- [ ] Konfigurera testkörningar
- [ ] Ställ in byggprocessen
- [ ] Konfigurera distributionsmiljöer
- [ ] Ställ in aviseringar
- [ ] Dokumentera pipelineanvändning och underhåll
- [ ] Utbilda teamet i CI/CD-arbetsflödet
