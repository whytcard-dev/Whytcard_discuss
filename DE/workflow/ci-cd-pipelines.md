# CI/CD-Pipeline-Automatisierung

Dieses Dokument bietet standardisierte CI/CD-Pipeline-Konfigurationen zur Automatisierung der Build-, Test- und Deployment-Prozesse gemäß den Webentwicklungsstandards.

## GitHub Actions Workflow

### Einfache CI-Pipeline (GitHub Actions)

```yaml
Name: CI-Pipeline

an:
Push:
Branches: [main, develop]
Pull_Request:
Branches: [main, develop]

Jobs:
Build-and-Test:
Läuft auf: Ubuntu-Latest

Schritte:
- Verwendet: actions/checkout@v3

- Name: Node.js einrichten

Verwendet: actions/setup-node@v3
Mit:
Knotenversion: '18'
Cache: 'npm'

- Name: Abhängigkeiten installieren
Ausführen: npm ci

- Name: Lint
Ausführen: npm run lint

- Name: Typprüfung
Ausführen: npm run type-check

- Name: Unit-Tests
Ausführen: npm run test


- Name: Build

Ausführen: npm run build


- Name: Build-Artefakte hochladen

Verwendet: actions/upload-artifact@v3

Mit:

Name: build-output

Pfad: dist/



### CI/CD-Pipeline abschließen (GitHub Actions)



YAML

Name: CI/CD-Pipeline

Auf:

Push:

Zweige: [main, develop]

Pull_Request:
Zweige: [main, develop]

Jobs:

Codequalität:

Läuft auf: Ubuntu-Latest
Schritte:

- Verwendet: actions/checkout@v3


- Name: Node.js einrichten

Verwendet: actions/setup-node@v3

Mit:
Knotenversion: '18'
Cache: 'npm'


- Name: Installieren Abhängigkeiten
Ausführen: npm ci


- Name: Lint
Ausführen: npm run lint

- Name: Typprüfung
Ausführen: npm run type-check

- Name: Codestilprüfung
Ausführen: npm run format:check

- Name: Sicherheitsaudit
Ausführen: npm audit --production

Test:
Benötigt: Codequalität
Läuft auf: Ubuntu-Latest
Schritte:
- Verwendet: actions/checkout@v3

- Name: Node.js einrichten

Verwendet: actions/setup-node@v3
Mit:
Knotenversion: '18'
Cache: 'npm'

- Name: Abhängigkeiten installieren
Ausführen: npm ci

- Name: Unit-Tests
Ausführen: npm run test

- Name: Integrationstests
Ausführen: npm run test:integration 

- Name: Testabdeckung hochladen 
Verwendet: actions/upload-artifact@v3 
Mit: 
Name: test-coverage 
Pfad: coverage/ 

Build: 
Benötigt: test 
Läuft auf: ubuntu-latest 
Schritte: 
- Verwendet: actions/checkout@v3 

- Name: Node.js einrichten 
Verwendet: actions/setup-node@v3 
Mit: 
node-version: '18' 
Cache: 'npm' 

- Name: Abhängigkeiten installieren 
Ausführen: npm ci 

- Name: Build 
Ausführen: npm run build 

- Name: Build-Artefakte hochladen 
Verwendet: actions/upload-artifact@v3 
Mit: 
Name: build-output 
Pfad: dist/ 

e2e-tests: 
Benötigt: build 
Läuft auf: ubuntu-latest
Schritte:
- Verwendet: actions/checkout@v3

- Name: Node.js einrichten
- Verwendet: actions/setup-node@v3
- Mit:
Knotenversion: '18'
Cache: 'npm'

- Name: Abhängigkeiten installieren
- Ausführen: npm ci

- Name: Build-Artefakte herunterladen
- Verwendet: actions/download-artifact@v3
- Mit:
- Name: build-output
- Pfad: dist/

- Name: E2E-Tests
- Ausführen: npm run test:e2e

- Name: E2E-Testergebnisse hochladen
- Verwendet: actions/upload-artifact@v3
- Mit:
- Name: e2e-test-results
- Pfad: e2e-results/

Bereitstellungs-Staging:
- Wenn: github.event_name == 'push' && github.ref == 'refs/heads/develop'
Benötigt: e2e-tests
Läuft auf: Ubuntu-Latest
Umgebung: Staging
Schritte:
- Verwendet: actions/checkout@v3

- Name: Build-Artefakte herunterladen

Verwendet: actions/download-artifact@v3
Mit:
Name: Build-Ausgabe
Pfad: dist/

- Name: In Staging bereitstellen
Ausführen: |
# Fügen Sie hier Ihr Deployment-Skript hinzu.

echo "Deployment in Staging-Umgebung"

deploy-production:

if: github.event_name == 'push' && github.ref == 'refs/heads/main'

benötigt: e2e-tests

läuft auf: ubuntu-latest

Umgebung: production

Schritte:
- verwendet: actions/checkout@v3

- Name: Build-Artefakte herunterladen

verwendet: actions/download-artifact@v3
mit:

name: build-output
pfad: dist/

- Name: Deployment in Production
Ausführen: |
# Fügen Sie hier Ihr Deployment-Skript hinzu.

echo "Deployment in Produktionsumgebung"
```

## GitLab CI/CD-Pipeline

```yaml
Phasen:
- Validieren
- Test
- Erstellen
- E2E-Test
- Bereitstellen

Variablen:

NODE_VERSION: "18"

Cache:
Schlüssel: ${CI_COMMIT_REF_SLUG}
Pfade:
- node_modules/

Codequalität:
Phase: Validieren
Image: node:${NODE_VERSION}
Skript:
- npm ci
- npm lint ausführen
- npm Typprüfung ausführen
- npm Formatprüfung ausführen
- npm Audit --Produktion

Unit-Tests:
Phase: Test
Image: node:${NODE_VERSION}
Skript:
- npm ci
- npm test ausführen
Artefakte:
Pfade:
- coverage/
Ablaufdatum: 1 Woche

Integrationstests:
Stufe: Test
Image: node:${NODE_VERSION}
Skript:
- npm ci
- npm test:integration ausführen
Artefakte:
Pfade:
- integration-coverage/
Ablaufdatum: 1 Woche

Build:
Stufe: Build
Image: node:${NODE_VERSION}
Skript:
- npm ci
- npm build ausführen
Artefakte:
Pfade:
- dist/
Ablaufdatum: 1 Woche

e2e-tests:
Stufe: e2e-test
Image: cypress/browsers:node${NODE_VERSION}-chrome
Skript:
- npm ci
- npm test:e2e ausführen
Artefakte:
Pfade:
- e2e-results/
Verfallsdatum: 1 Woche

Deployment-Staging:
Stufe: Bereitstellen
Image: Knoten: ${NODE_VERSION}
Skript:
- echo "Bereitstellung in Staging-Umgebung"
# Fügen Sie hier Ihr Deployment-Skript hinzu
Umgebung:
Name: Staging
Nur:
- Entwicklung

Deployment-Produktion:
Stufe: Bereitstellen
Image: Knoten: ${NODE_VERSION}
Skript:
- echo "Bereitstellung in Produktionsumgebung"
# Fügen Sie hier Ihr Deployment-Skript hinzu
Umgebung:
Name: Produktion
Nur:
- Haupt
Wenn: Manuell
```

## Jenkins Pipeline

```groovy
Pipeline {
Agent {
Docker {
Image 'Knoten:18'
}
}

Phasen {
Phase('Installieren') {
Schritte {
sh 'npm ci' 
} 
} 

stage('Codequalität') { 
parallel { 
stage('Lint') { 
Schritte { 
sh 'npm run lint' 
} 
} 
stage('Typprüfung') { 
Schritte { 
sh 'npm run type-check' 
} 
} 
stage('Formatprüfung') { 
Schritte { 
sh 'npm run format:check' 
} 
} 
stage('Sicherheitsaudit') { 
Schritte { 
sh 'npm audit --production' 
} 
} 
} 
} 

stage('Test') { 
parallel { 
stage('Unit-Tests') { 
Schritte { 
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
reportName: 'Coverage-Bericht' 
]) 
} 
} 
} 
} 
stage('Integrationstests') { 
Schritte { 
sh 'npm run test:integration' 
} 
} 
} 
} 

stage('Build') { 
Schritte { 
sh 'npm run build' 
} 
post { 
success { 
archiveArtifacts artifacts: 'dist/**/*', fingerprint: true 
} 
} 
} 

stage('E2E-Tests') { 
Schritte { 
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
reportName: 'E2E-Testbericht' 
]) 
} 
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
Branches: 
include: 
- main 
- develop 

pool: 
vmImage: 'ubuntu-latest' 

variables: 
nodeVersion: '18.x' 

stages: 
- stage: Validate 
jobs: 
- job: CodeQuality 
steps: 
- task: NodeTool@0
Eingaben:
Versionsspezifikation: $(nodeVersion)
Anzeigename: 'Node.js installieren'

- Skript: npm ci
Anzeigename: 'Abhängigkeiten installieren'

- Skript: npm run lint
Anzeigename: 'Linting ausführen'

- Skript: npm run type-check
Anzeigename: 'Typprüfung ausführen'

- Skript: npm run format:check
Anzeigename: 'Codeformatierung prüfen'

- Aufgabe: npm@1
Eingaben:
Befehl: 'Benutzerdefiniert'
Benutzerdefinierter Befehl: 'audit --production'
Anzeigename: 'Sicherheitsaudit'

- Stufe: Test
Abhängig von: Validieren
Jobs:
- Job: UnitTests
Schritte:
- Aufgabe: NodeTool@0
Eingaben:
Versionsspezifikation: $(nodeVersion)
Anzeigename: 'Installieren Node.js'

- Skript: npm ci
Anzeigename: 'Abhängigkeiten installieren'

- Skript: npm run test
Anzeigename: 'Unit-Tests ausführen'

- Task: PublishTestResults@2
Eingaben:
testResultsFormat: 'JUnit'
testResultsFiles: '**/junit-*.xml'
mergeTestResults: true
testRunTitle: 'Unit-Tests'
Anzeigename: 'Testergebnisse veröffentlichen'

- Task: PublishCodeCoverageResults@1
Eingaben:
codeCoverageTool: 'Cobertura'
summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml'
reportDirectory: '$(System.DefaultWorkingDirectory)/coverage'
Anzeigename: 'Code veröffentlichen Abdeckung'

- Stufe: Erstellen 
hängt von: Test 
Jobs: 
- Job: BuildApp 
Schritte: 
- Aufgabe: NodeTool@0 
Eingaben: 
Versionsspezifikation: $(nodeVersion) 
Anzeigename: 'Node.js installieren' 

- Skript: npm ci 
Anzeigename: 'Abhängigkeiten installieren' 

- Skript: npm run build 
Anzeigename: 'Anwendung erstellen' 

- Aufgabe: Dateien kopieren@2 
Eingaben: 
Quellordner: '$(System.DefaultWorkingDirectory)/dist' 
Inhalt: '**' 
Zielordner: '$(Build.ArtifactStagingDirectory)' 
Anzeigename: 'Build-Dateien kopieren' 

- Aufgabe: Artefakte veröffentlichen@1 
Eingaben: 
Pfad zur Veröffentlichung: '$(Build.ArtifactStagingDirectory)' 
Artefaktname: 'drop'
Anzeigename: 'Build-Artefakte veröffentlichen'

- Stufe: E2ETest
hängt von: Build
Jobs:
- Job: E2ETests
Schritte:
- Task: NodeTool@0
Eingaben:
Versionsspezifikation: $(nodeVersion)
Anzeigename: 'Node.js installieren'

- Skript: npm ci
Anzeigename: 'Abhängigkeiten installieren'

- Task: DownloadBuildArtifacts@0
Eingaben:
Build-Typ: 'aktuell'
Download-Typ: 'einzeln'
Artefaktname: 'drop'
Download-Pfad: '$(System.DefaultWorkingDirectory)/dist'
Anzeigename: 'Build-Artefakte herunterladen'

- Skript: npm run test:e2e
Anzeigename: 'E2E-Tests ausführen'

- Task: PublishTestResults@2
Eingaben:
testResultsFormat: 'JUnit'
testResultsFiles: '**/e2e-*.xml'
mergeTestResults: true
testRunTitle: 'E2E-Tests'
displayName: 'E2E-Testergebnisse veröffentlichen'

- Stufe: DeployStaging
hängt ab von: E2ETest
bedingung: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/develop'))
jobs:
- Bereitstellung: DeployStaging
umgebung: Staging
strategie:
runOnce:
bereitstellen:
schritte:
- Skript: echo "Bereitstellung in Staging-Umgebung"
displayName: 'In Staging bereitstellen'

- Stufe: DeployProduction
hängt ab von: E2ETest
bedingung: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main')) 
Jobs: 
- Bereitstellung: DeployProduction 
Umgebung: Produktion 
Strategie: 
Einmal ausführen: 
Bereitstellung: 
Schritte: 
- Skript: echo "Bereitstellung in Produktionsumgebung" 
Anzeigename: "In Produktion bereitstellen" 
``` 

## Best Practices für CI/CD-Pipelines 

1. **Fail Fast**: Führen Sie zuerst Schnellprüfungen wie Linting und Typprüfung durch, um schnelles Feedback zu erhalten. 
2. **Parallele Ausführung**: Führen Sie unabhängige Jobs parallel aus, um die Pipeline-Dauer zu verkürzen. 
3. **Caching**: Cachen Sie Abhängigkeiten, um Builds zu beschleunigen. 
4. **Artefakte**: Teilen Sie Build-Artefakte zwischen Jobs, um einen erneuten Build zu vermeiden. 
5. **Umgebungstrennung**: Verwenden Sie unterschiedliche Umgebungen für Staging und Produktion. 
6. **Manuelle Genehmigung**: Manuelle Genehmigung für Produktionsbereitstellungen erforderlich. 
7. **Benachrichtigungen**: Benachrichtigungen für Pipeline-Fehler einrichten
8. **Secrets-Management**: Sichere Methoden für den Umgang mit Secrets und Anmeldeinformationen verwenden
9. **Versionierung**: Versionsinformationen in Build-Artefakte einbinden
10. **Monitoring**: Pipeline-Leistung überwachen und bei Bedarf optimieren

## Checkliste für die Implementierung

- [ ] Versionskontroll-Repository einrichten
- [ ] CI/CD-Plattform Ihrer Wahl konfigurieren
- [ ] Grundlegende Pipeline-Konfiguration erstellen
- [ ] Codequalitätsprüfungen hinzufügen
- [ ] Test-Runner konfigurieren
- [ ] Build-Prozess einrichten
- [ ] Deployment-Umgebungen konfigurieren
- [ ] Benachrichtigungen einrichten
- [ ] Pipeline-Nutzung und -Wartung dokumentieren
- [ ] Team im CI/CD-Workflow schulen
