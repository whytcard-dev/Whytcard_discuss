# CI/CD-pijplijnautomatisering

Dit document biedt gestandaardiseerde CI/CD-pijplijnconfiguraties om de bouw-, test- en implementatieprocessen te automatiseren volgens de webontwikkelingsnormen.

## GitHub Actions Workflow

### Basis CI-pijplijn (GitHub Actions)

```yaml
naam: CI-pijplijn

aan:
push:
branches: [ main, development ]
pull_request:
branches: [ main, development ]

taken:
build-and-test:
runs-on: ubuntu-latest

stappen:
- gebruikt: actions/checkout@v3

- naam: Node.js instellen
gebruik: actions/setup-node@v3
met:
node-versie: '18'
cache: 'npm'

- naam: Afhankelijkheden installeren
run: npm ci

- naam: Lint
run: npm run lint

- naam: Typecontrole
run: npm run type-check

- naam: Unit tests
run: npm run test

- naam: Build
run: npm run build

- naam: Upload build-artefacten
gebruikt: acties/upload-artefact@v3
met:
naam: build-output
pad: dist/
``` 

### Volledige CI/CD-pijplijn (GitHub Actions)

```yaml
naam: CI/CD-pijplijn

aan:
push:
branches: [ main, development ]
pull_request:
branches: [ main, development ]

taken:
codekwaliteit:
runs-on: ubuntu-latest
stappen:
- gebruikt: acties/checkout@v3

- naam: Node.js instellen
gebruikt: acties/setup-node@v3
met:

node-versie: '18'
cache: 'npm'


- naam: Afhankelijkheden installeren
uitvoeren: npm ci

- naam: Lint
uitvoeren: npm run lint

- naam: Typecontrole
uitvoeren: npm run typecontrole

- naam: Codestijlcontrole
uitvoeren: npm run format:controle

- naam: Beveiligingscontrole
uitvoeren: npm audit --productie

test: 
behoeften: codekwaliteit
runs-on: ubuntu-latest
stappen: 
- gebruik: actions/checkout@v3

- naam: Node.js instellen
gebruik: actions/setup-node@v3
met: 
node-versie: '18'
cache: 'npm'

- naam: Afhankelijkheden installeren
uitvoeren: npm ci

- naam: Unittests
uitvoeren: npm run test

- naam: Integratietests
uitvoeren: npm test:integratie uitvoeren

- naam: Testdekking uploaden
gebruik: acties/upload-artefact@v3
met:
naam: testdekking
pad: dekking/

build:
behoeften: test
runs-on: ubuntu-latest
stappen:
- gebruik: acties/checkout@v3

- naam: Node.js instellen
gebruik: acties/setup-node@v3
met:
node-versie: '18'
cache: 'npm'

- naam: Afhankelijkheden installeren
run: npm ci

- naam: Bouwen
run: npm run build

- naam: Bouwartefacten uploaden
gebruik: acties/upload-artefact@v3
met:
naam: build-output
pad: dist/

e2e-tests:
behoeften: build
runs-on: ubuntu-latest
stappen:
- gebruikt: actions/checkout@v3

- naam: Node.js instellen
gebruikt: actions/setup-node@v3
met:

node-versie: '18'
cache: 'npm'

- naam: Afhankelijkheden installeren
uitvoeren: npm ci

- naam: Bouwartefacten downloaden
gebruikt: actions/download-artifact@v3
met:
naam: build-output
pad: dist/

- naam: E2E-tests
uitvoeren: npm run test:e2e

- naam: E2E-testresultaten uploaden
gebruikt: actions/upload-artifact@v3
met:
naam: e2e-test-resultaten
pad: e2e-resultaten/

implementatiestaging:
als: github.event_name == 'push' && github.ref == 'refs/heads/develop'
behoeften: e2e-tests
draait-op: ubuntu-latest
omgeving: staging
stappen:
-gebruik: actions/checkout@v3

-naam: Download build-artefacten
gebruik: actions/download-artifact@v3
met:
naam: build-output
pad: dist/

-naam: Implementeren in staging
uitvoeren: |
# Voeg hier je implementatiescript toe
echo "Implementeren in stagingomgeving"

implementatie-productie:
if: github.event_name == 'push' && github.ref == 'refs/heads/main'
behoeften: e2e-tests
runs-on: ubuntu-latest
omgeving: productie
stappen:
-gebruik: actions/checkout@v3

-naam: Download build-artefacten
gebruik: actions/download-artifact@v3
with:
naam: build-output
pad: dist/

-naam: Implementeren in productie
run: |

# Voeg hier je implementatiescript toe
echo "Implementeren in productieomgeving"

```

## GitLab CI/CD-pijplijn

```yaml
stages:

- validate
- test
- build
- e2e-test
- deploy

variabelen:

NODE_VERSION: "18"

cache:

key: ${CI_COMMIT_REF_SLUG}
paths:

- node_modules/

codekwaliteit:

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
artefacten:

paden:
- coverage/
verloopt over: 1 week

integratietests:
fase: test
afbeelding: knooppunt:${NODE_VERSION}
script:
- npm ci
- npm run test:integratie
artefacten:

paden:
- integration-coverage/
verloopt over: 1 week

bouw:
fase: bouw
afbeelding: knooppunt:${NODE_VERSION}
script:
- npm ci
- npm run build
artefacten:

paden:
- dist/
verloopt over: 1 week

e2e-tests:
fase: e2e-test
afbeelding: cypress/browsers:node${NODE_VERSION}-chrome
script:
- npm ci
- npm run test:e2e
artefacten:
paden:
- e2e-resultaten/
verloopt over: 1 week

implementatie-staging:
fase: implementeren
afbeelding: knooppunt:${NODE_VERSION}
script:
- echo "Implementeren in stagingomgeving"
# Voeg hier uw implementatiescript toe
omgeving:
naam: staging
alleen:
- ontwikkelen

implementatie-productie:
fase: implementeren
afbeelding: knooppunt:${NODE_VERSION}
script:
- echo "Implementeren in productieomgeving"
# Voeg hier uw implementatiescript toe
omgeving:
naam: productie
alleen:
- hoofd
wanneer: handmatig
```

## Jenkins-pijplijn

```groovy
pijplijn {
agent {
docker {
afbeelding 'knooppunt:18'
}
}

stages { 
stage('Installeren') { 
steps { 
sh 'npm ci' 
} 
} 

stage('Codekwaliteit') { 
parallel { 
stage('Lint') { 
steps { 
sh 'npm run lint' 
} 
} 
stage('Typecontrole') { 
steps { 
sh 'npm run type-check' 
} 
} 
stage('Opmaakcontrole') { 
steps { 
sh 'npm run format:check' 
} 
} 
stage('Beveiligingsaudit') { 
steps { 
sh 'npm audit --productie' 
} 
} 
} 
} 

stage('Test') { 
parallel { 
stage('Unittests') { 
steps { 
sh 'npm run test' 
} 
post { 
always { 
junit 'junit-reports/*.xml' 
publishHTML(target: [ 
toestaanOntbrekend: false, 
altijdLinkNaarLaatsteBuild: false, 
houdAlles: true, 
reportDir: 'dekking', 
reportFiles: 'index.html', 
reportName: 'Dekkingsrapport' 
]) 
} 
} 
} 
stage('Integratietests') { 
stappen { 
sh 'npm run test:integratie' 
} 
} 
} 
} 

stage('Bouw') { 
stappen { 
sh 'npm run build' 
} 
post { 
succes { 
archiveArtifacts artefacten: 'dist/**/*', vingerafdruk: true 
} 
} 
} 

stage('E2E Tests') { 
stappen { 
sh 'npm run test:e2e'
} 
post { 
altijd { 
publishHTML(doel: [ 
toestaanOntbrekend: false, 
altijdLinkNaarLaatsteBuild: false, 
houdAlles: true, 
reportDir: 'e2e-resultaten', 
reportFiles: 'index.html', 
reportName: 'E2E-testrapport'
]) 
} 
} 
} 
} 

post { 
altijd { 
cleanWs() 
} 
} 
} 
``` 

## Azure DevOps-pijplijn

```yaml 
trigger: 
branches: 
include: 
- main 
- development 

pool: 
vmImage: 'ubuntu-latest' 

variabelen: 
nodeVersion: '18.x' 

stages: 
- stage: Valideren
taken:
-taak: CodeQuality
stappen:
-taak: NodeTool@0
invoer:
versieSpec: $(nodeVersion)
Hieronder: 'Node.js installeren'

-script: npm ci
Hieronder: 'Afhankelijkheden installeren'

-script: npm run lint
Hieronder: 'Linting uitvoeren'

-script: npm run type-check
Hieronder: 'Typecontrole uitvoeren'

-script: npm run format:check
Hieronder: 'Codeopmaak controleren'

-taak: npm@1
invoer:
opdracht: 'custom'
customCommand: 'audit --production'
Hieronder: 'Beveiligingsaudit'

-fase: Test
dependsOn: Valideren
taken:
-taak: UnitTests
stappen:
-taak: NodeTool@0
invoer:
versieSpec: $(nodeVersion)
Hieronder: 'Node.js installeren'

- script: npm ci
Hieronder: 'Afhankelijkheden installeren'

- script: npm run test
Hieronder: 'Unittests uitvoeren'

- taak: PublishTestResults@2
invoer:
testResultsFormat: 'JUnit'
testResultsFiles: '**/junit-*.xml'
mergeTestResults: true
testRunTitle: 'Unittests'
Hieronder: 'Testresultaten publiceren'

- taak: PublishCodeCoverageResults@1
invoer:
codeCoverageTool: 'Cobertura'
summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml'
reportDirectory: '$(System.DefaultWorkingDirectory)/coverage'
Hieronder: 'Codedekking publiceren'

- fase: Build
dependsOn: Test
taken:
- taak: BuildApp
stappen:
- taak: NodeTool@0
invoer:

versieSpec: $(nodeVersion)
Hieronder: 'Node.js installeren'

- script: npm ci
Hieronder: 'Afhankelijkheden installeren'

- script: npm run build
Hieronder: 'Applicatie bouwen'

- taak: CopyFiles@2
invoer:
bronmap: '$(System.DefaultWorkingDirectory)/dist'
inhoud: '**'
doelmap: '$(Build.ArtifactStagingDirectory)'
Hieronder: 'Build-bestanden kopiëren'

- taak: PublishBuildArtifacts@1
Inputs:
pathToPublish: '$(Build.ArtifactStagingDirectory)'
artefactNaam: 'drop'
Hieronder: 'Build-artefacten publiceren'

- fase: E2ETest
dependsOn: Build
taken:
- taak: E2ETests
stappen:
- taak: NodeTool@0
Inputs:
versieSpec: $(nodeVersion)
Hieronder: 'Node.js installeren'

- script: npm ci
Hieronder: 'Afhankelijkheden installeren'

- taak: DownloadBuildArtifacts@0
Inputs:
buildType: 'huidig'
downloadType: 'enkel'
artefactNaam: 'drop'
downloadPad: '$(System.DefaultWorkingDirectory)/dist'
Hieronder: 'Build-artefacten downloaden'

- script: npm run test:e2e
Hieronder: 'E2E-tests uitvoeren'

- taak: PublishTestResults@2
invoer: 
testResultsFormat: 'JUnit'
testResultsFiles: '**/e2e-*.xml'
mergeTestResults: true
testRunTitle: 'E2E-tests'
displayName: 'E2E-testresultaten publiceren'

- fase: DeployStaging
dependsOn: E2ETest
voorwaarde: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/develop'))
taken: 
- implementatie: DeployStaging
omgeving: staging
strategie: 
runOnce: 
implementatie: 
stappen: 
- script: echo "Implementeren in stagingomgeving"
displayName: 'Implementeren in stagingomgeving'

- fase: DeployProduction
dependsOn: E2ETest
voorwaarde: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
taken:

- implementatie: DeployProduction
omgeving: productie
strategie:

runOnce:
implementatie:
stappen:
- script: echo "Implementeren in productieomgeving"
displayName: 'Implementeren in productie'
```

## Best practices voor CI/CD-pipelines

1. **Fail Fast**: Voer eerst snelle controles uit, zoals linting en typecontrole, voor snelle feedback.
2. **Parallelle uitvoering**: Voer onafhankelijke jobs parallel uit om de pipelineduur te verkorten.
3. **Caching**: Cache afhankelijkheden om builds te versnellen.
4. **Artefacten**: Deel build-artefacten tussen jobs om herbouw te voorkomen.
5. **Omgevingsscheiding**: Gebruik verschillende omgevingen voor staging en productie
6. **Handmatige goedkeuring**: Vereist handmatige goedkeuring voor productie-implementaties
7. **Meldingen**: Stel meldingen in voor pipeline-storingen
8. **Beheer van geheimen**: Gebruik veilige methoden om geheimen en inloggegevens te verwerken
9. **Versiebeheer**: Neem versie-informatie op in build-artefacten
10. **Monitoring**: Bewaak de pipeline-prestaties en optimaliseer indien nodig

## Implementatiechecklist

- [ ] Versiebeheerrepository instellen
- [ ] CI/CD-platform naar keuze configureren
- [ ] Basis pipeline-configuratie maken
- [ ] Codekwaliteitscontroles toevoegen
- [ ] Testrunners configureren
- [ ] Buildproces instellen
- [ ] Implementatieomgevingen configureren
- [ ] Meldingen instellen
- [ ] Pipeline-gebruik en -onderhoud documenteren
- [ ] Team trainen in CI/CD-workflow
