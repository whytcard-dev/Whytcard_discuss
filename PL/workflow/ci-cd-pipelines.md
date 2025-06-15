# Automatyzacja potoku CI/CD

Ten dokument zawiera standardowe konfiguracje potoku CI/CD w celu zautomatyzowania procesów kompilacji, testowania i wdrażania zgodnie ze standardami tworzenia stron internetowych.

## GitHub Actions Workflow

### Podstawowy potok CI (GitHub Actions)

```yaml
name: Potok CI

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


- name: Skonfiguruj Node.js

uses: actions/setup-node@v3

with:
node-version: '18'
cache: 'npm'


- name: Zainstaluj zależności
run: npm ci


- name: Lint
run: npm run lint


- name: Sprawdzenie typu
run: npm run type-check


- name: Jednostka testy 
uruchom: npm uruchom test 

- nazwa: Kompilacja 
uruchom: npm uruchom kompilację 

- nazwa: Prześlij artefakty kompilacji 
używa: actions/upload-artifact@v3 
z: 
nazwa: build-output 
ścieżka: dist/ 
``` 

### Kompletny proces CI/CD (akcje GitHub) 

```yaml 
nazwa: Proces CI/CD 

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

- nazwa: Konfiguracja Node.js 
używa: actions/setup-node@v3 
z: 
node-version: '18' 
cache: 'npm' 

- name: Zainstaluj zależności 
run: npm ci 

- name: Lint 
run: npm run lint 

- name: Sprawdź typ 
run: npm run type-check 

- name: Sprawdź styl kodu 
run: npm run format:check 

- name: Audyt bezpieczeństwa 
run: npm audit --production 

test: 
needs: code-quality 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 

- name: Skonfiguruj Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Zainstaluj zależności 
run: npm ci 

- name: Testy jednostkowe 
run: npm run test 

- name: Testy integracyjne 
run: npm run test:integration 

- name: Prześlij pokrycie testowe 
używa: actions/upload-artifact@v3 
z: 
name: test-coverage 
ścieżka: coverage/ 

build: 
needs: test 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 

- name: Skonfiguruj Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Zainstaluj zależności 
run: npm ci 

- name: Kompilacja 
run: npm run build 

- name: Prześlij artefakty kompilacji 
używa: actions/upload-artifact@v3 
z: 
name: build-output 
ścieżka: dist/ 

e2e-tests: 
needs: build 
runs-on: ubuntu-latest 
kroki: 
- używa: actions/checkout@v3 

- nazwa: Konfiguracja Node.js 
używa: actions/setup-node@v3 
z: 
node-version: '18' 
cache: 'npm' 

- nazwa: Instalacja zależności 
uruchom: npm ci 

- nazwa: Pobierz artefakty kompilacji 
używa: actions/download-artifact@v3 
z: 
nazwa: build-output 
ścieżka: dist/ 

- nazwa: Testy E2E 
uruchom: npm run test:e2e 

- nazwa: Prześlij wyniki testów E2E 
używa: actions/upload-artifact@v3 
z: 
nazwa: e2e-test-results 
ścieżka: e2e-results/ 

wdrażanie-staging: 
jeśli: github.event_name == 'push' && github.ref == 'refs/heads/develop' 
needs: e2e-tests 
runs-on: ubuntu-latest 
environment: staging 
steps: 
- uses: actions/checkout@v3 

- name: Download build artifacts 
uses: actions/download-artifact@v3 
with: 
name: build-output 
path: dist/ 

- name: Deploy to Staging 
run: | # Dodaj tutaj swój skrypt wdrożenia 
echo "Wdrażanie w środowisku przejściowym" 

deploy-production: 
if: github.event_name == 'push' && github.ref == 'refs/heads/main' 
needs: e2e-tests 
runs-on: ubuntu-latest 
environment: production 
steps: 
- uses: actions/checkout@v3 

- name: Pobierz artefakty kompilacji 
uses: actions/download-artifact@v3 
with: 
name: build-output 
path: dist/ 

- name: Wdróż w środowisku produkcyjnym 
run: | # Dodaj tutaj swój skrypt wdrożenia 
echo "Wdrażanie w środowisku produkcyjnym" 
``` 

## GitLab CI/CD Pipeline 

```yaml 
etapy: 
- validate 
- test 
- build 
- e2e-test 
- deploy 

zmienne: 
NODE_VERSION: "18" 

pamięć podręczna: 
klucz: ${CI_COMMIT_REF_SLUG} 
ścieżki: 
- node_modules/ 

jakość kodu: 
etap: validate 
obraz: node:${NODE_VERSION} 
skrypt: 
- npm ci 
- npm run lint 
- npm run type-check 
- npm run format:check 
- npm audit --production 

testy jednostkowe: 
etap: test 
obraz: node:${NODE_VERSION} 
skrypt: 
- npm ci 
- npm run test 
artefakty: 
ścieżki: 
- coverage/ 
expire_in: 1 tydzień 

integration-tests: 
etap: test 
obraz: node:${NODE_VERSION} 
skrypt: 
- npm ci 
- npm run test:integration 
artefakty: 
ścieżki: 
- integration-coverage/ 
expire_in: 1 tydzień 

build: 
etap: build 
obraz: node:${NODE_VERSION} 
skrypt: 
- npm ci 
- npm run build 
artefakty: 
ścieżki: 
- dist/ 
expire_in: 1 tydzień 

e2e-tests: 
etap: e2e-test 
obraz: cypress/browsers:node${NODE_VERSION}-chrome 
skrypt: 
- npm ci 
- npm run test:e2e 
artefakty: 
paths: 
- e2e-results/ 
expire_in: 1 week 

deploy-staging: 
stage: deploy 
image: node:${NODE_VERSION} 
script: 
- echo "Wdrażanie w środowisku przejściowym" 
# Dodaj tutaj swój skrypt wdrożeniowy 
environment: 
name: staging 
only: 
- develop 

deploy-production: 
stage: deploy 
image: node:${NODE_VERSION} 
script: 
- echo "Wdrażanie w środowisku produkcyjnym" 
# Dodaj tutaj swój skrypt wdrożeniowy 
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

stage { 
stage('Instalacja') { 
kroki { 
sh 'npm ci' 
} 
} 

stage('Jakość kodu') { 
równoległe { 
stage('Lint') { 
kroki { 
sh 'npm run lint' 
} 
} 
stage('Sprawdzanie typu') { 
kroki { 
sh 'npm run type-check' 
} 
} 
stage('Sprawdzanie formatu') { 
kroki { 
sh 'npm run format:check' 
} 
} 
stage('Audyt bezpieczeństwa') { 
kroki { 
sh 'npm audit --production' 
} 
} 
} 
} 

stage('Test') { 
równoległe { 
stage('Testy jednostkowe') { 
kroki { 
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
reportName: 'Raport pokrycia' 
]) 
} 
} 
} 
stage('Testy integracyjne') { 
steps { 
sh 'npm uruchom test:integration' 
} 
} 
} 
} 

stage('Build') { 
steps { 
sh 'npm uruchom kompilację' 
} 
post { 
success { 
archiveArtifacts artefakty: 'dist/**/*', odcisk palca: true 
} 
} 
} 

stage('Testy E2E') { 
kroki { 
sh 'npm uruchom test:e2e' 
} 
post { 
zawsze { 
publishHTML(target: [ 
allowMissing: false, 
alwaysLinkToLastBuild: false, 
keepAll: true, 
reportDir: 'e2e-results', 
reportFiles: 'index.html', 
reportName: 'Raport testu E2E' 
]) 
} 
} 
} 
} 

post { 
zawsze { 
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

zmienne: 
nodeVersion: '18.x' 

etapy: 
- etap: Walidacja 
zadania: 
- zadanie: CodeQuality 
kroki: 
- zadanie: NodeTool@0 
dane wejściowe: 
versionSpec: $(nodeVersion) 
displayName: 'Zainstaluj Node.js' 

- skrypt: npm ci 
displayName: 'Zainstaluj zależności' 

- skrypt: npm run lint 
displayName: 'Uruchom linting' 

- skrypt: npm run type-check 
displayName: 'Uruchom sprawdzanie typu' 

- skrypt: npm run format:check 
displayName: 'Sprawdź formatowanie kodu' 

- zadanie: npm@1 
dane wejściowe: 
polecenie: 'custom' 
customCommand: 'audit --production' 
displayName: 'Audyt bezpieczeństwa' 

- etap: Test 
dependsOn: Validate 
jobs: 
- zadanie: UnitTests 
kroki: 
- zadanie: NodeTool@0 
dane wejściowe: 
versionSpec: $(nodeVersion) 
displayName: 'Zainstaluj Node.js' 

- skrypt: npm ci 
displayName: 'Zainstaluj zależności' 

- skrypt: npm run test 
displayName: 'Uruchom testy jednostkowe' 

- zadanie: PublishTestResults@2 
dane wejściowe: 
testResultsFormat: 'JUnit' 
testResultsFiles: '**/junit-*.xml' 
mergeTestResults: true 
testRunTitle: 'Testy jednostkowe' 
displayName: 'Publikuj wyniki testów' 

- task: PublishCodeCoverageResults@1 
inputs: 
codeCoverageTool: 'Cobertura' 
summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml' 
reportDirectory: '$(System.DefaultWorkingDirectory)/coverage' 
displayName: 'Publikuj pokrycie kodu' 

- stage: Build 
dependsOn: Test 
jobs: 
- job: BuildApp 
steps: 
- task: NodeTool@0 
inputs: 
versionSpec: $(nodeVersion) 
displayName: 'Instaluj Node.js' 

- script: npm ci 
displayName: 'Instaluj zależności' 

- script: npm run build 
displayName: 'Buduj aplikację' 

- zadanie: CopyFiles@2 
dane wejściowe: 
sourceFolder: '$(System.DefaultWorkingDirectory)/dist' 
zawartość: '**' 
targetFolder: '$(Build.ArtifactStagingDirectory)' 
displayName: 'Kopiuj pliki kompilacji' 

- zadanie: PublishBuildArtifacts@1 
dane wejściowe: 
pathToPublish: '$(Build.ArtifactStagingDirectory)' 
artifactName: 'drop' 
displayName: 'Publikuj artefakty kompilacji' 

- etap: E2ETest 
zależy od: Kompilacja 
zadania: 
- zadanie: E2ETests 
kroki: 
- zadanie: NodeTool@0 
dane wejściowe: 
versionSpec: $(nodeVersion) 
displayName: 'Zainstaluj Node.js' 

- skrypt: npm ci 
displayName: 'Instaluj zależności' 

- zadanie: DownloadBuildArtifacts@0 
dane wejściowe: 
buildType: 'current' 
downloadType: 'single' 
artifactName: 'drop' 
downloadPath: '$(System.DefaultWorkingDirectory)/dist' 
displayName: 'Pobierz artefakty kompilacji' 

- skrypt: npm run test:e2e 
displayName: 'Uruchom testy E2E' 

- zadanie: PublishTestResults@2 
dane wejściowe: 
testResultsFormat: 'JUnit' 
testResultsFiles: '**/e2e-*.xml' 
mergeTestResults: true 
testRunTitle: 'Testy E2E' 
displayName: 'Publikuj test E2E wyniki'

- etap: DeployStaging
zależy od: E2ETest
warunek: i(powodzenie(), eq(zmienne['Build.SourceBranch'], 'refs/heads/develop'))
zadania:
- wdrożenie: DeployStaging
środowisko: staging
strategia:
runOnce:
wdrożenie:
kroki:
- skrypt: echo "Wdrażanie do środowiska staging"
displayName: 'Wdrażanie do środowiska staging'

- etap: DeployProduction
zależy od: E2ETest
warunek: i(powodzenie(), eq(zmienne['Build.SourceBranch'], 'refs/heads/main'))
zadania:
- wdrożenie: DeployProduction
środowisko: produkcja
strategia:
runOnce:
wdrożenie:
kroki: 
- skrypt: echo "Wdrażanie w środowisku produkcyjnym" 
displayName: 'Wdrażanie w środowisku produkcyjnym' 
``` 

## Najlepsze praktyki dla potoków CI/CD 

1. **Szybkie niepowodzenia**: Najpierw uruchom szybkie sprawdzenia, takie jak linting i sprawdzanie typów, aby zapewnić szybką informację zwrotną 
2. **Równoległe wykonywanie**: Uruchom niezależne zadania równolegle, aby skrócić czas trwania potoku 
3. **Buforowanie**: Buforowanie zależności w celu przyspieszenia kompilacji 
4. **Artefakty**: Udostępniaj artefakty kompilacji między zadaniami, aby uniknąć ponownego tworzenia 
5. **Separacja środowiskowa**: Używaj różnych środowisk do testowania i produkcji 
6. **Ręczne zatwierdzanie**: Wymagaj ręcznego zatwierdzania wdrożeń produkcyjnych 
7. **Powiadomienia**: Skonfiguruj powiadomienia o awariach potoku 
8. **Zarządzanie sekretami**: Używaj bezpiecznych metod obsługi sekretów i poświadczeń 
9. **Wersjonowanie**: Dołącz wersję informacje w artefaktach kompilacji 
10. **Monitorowanie**: Monitoruj wydajność potoku i optymalizuj w razie potrzeby 

## Lista kontrolna implementacji 

- [ ] Skonfiguruj repozytorium kontroli wersji 
- [ ] Skonfiguruj wybraną platformę CI/CD 
- [ ] Utwórz podstawową konfigurację potoku 
- [ ] Dodaj kontrole jakości kodu 
- [ ] Skonfiguruj programy uruchamiające testy 
- [ ] Skonfiguruj proces kompilacji 
- [ ] Skonfiguruj środowiska wdrożeniowe 
- [ ] Skonfiguruj powiadomienia 
- [ ] Udokumentuj wykorzystanie i konserwację potoku 
- [ ] Przeszkol zespół w zakresie przepływu pracy CI/CD 
