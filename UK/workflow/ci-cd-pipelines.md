# Автоматизація конвеєра CI/CD

Цей документ містить стандартизовані конфігурації конвеєра CI/CD для автоматизації процесів збірки, тестування та розгортання відповідно до стандартів веб-розробки.

## Робочий процес дій GitHub

### Базовий конвеєр CI (Дії GitHub)

```yaml
назва: Конвеєр CI

увімкнено:
push:
branches: [main, develop]
pull_request:
branches: [main, develop]

завдання:
build-and-test:
runs-on: ubuntu-latest

steps:
-use: actions/checkout@v3

-use: actions/setup-node@v3
-use: actions/setup-node@v3
-with:
node-version: '18'
cache: 'npm'
-use: Встановлення залежностей
run: npm ci
-use: Lint
run: npm run lint
-use: Перевірка типу
run: npm run type-check
-use: Юніт-тести
run: npm run test 

- назва: Збірка 
run: npm run build 

- назва: Завантажити артефакти збірки 
uses: actions/upload-artifact@v3 
with: 
name: build-output 
path: dist/ 
``` 

### Завершений конвеєр CI/CD (дії GitHub) 

```yaml 
name: Конвеєр CI/CD 

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

- назва: Налаштування Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- назва: Встановити залежності 
run: npm ci 

- назва: Lint 
run: npm run lint 

- назва: Перевірка типу 
run: npm run type-check 

- назва: Перевірка стилю коду 
run: npm run format:check 

- назва: Аудит безпеки 
run: npm audit --production 

test: 
needs: якість коду 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 

- назва: Налаштування Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' cache: 'npm' 

- назва: Встановлення залежностей 
run: npm ci 

- назва: Модульні тести 
run: npm run test 

- назва: Інтеграційні тести 
run: npm run test:integration 

- назва: Завантажити тест покриття 
використовує: actions/upload-artifact@v3 
з: 
назва: test-coverage 
шлях: coverage/ 

збірка: 
потреби: test 
виконується: ubuntu-latest 
кроки: 
- використовує: actions/checkout@v3 

- назва: Налаштування Node.js 
використовує: actions/setup-node@v3 
з: 
версія вузла: '18' 
кеш: 'npm' 

- назва: Встановлення залежностей 
виконати: npm ci 

- назва: Збірка 
виконати: npm run build 

- назва: Завантажити артефакти збірки 
використовує: actions/upload-artifact@v3 
з: 
назва: build-output 
шлях: dist/ 

e2e-tests: 
потреби: збірка 
виконується: ubuntu-latest 
кроки: 
- використовує: actions/checkout@v3 

- назва: Налаштування Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- назва: Встановлення залежностей 
run: npm ci 

- назва: Завантаження артефактів збірки 
uses: actions/download-artifact@v3 
with: 
name: build-output 
path: dist/ 

- назва: Тести E2E 
run: npm run test:e2e 

- назва: Завантаження результатів тестування E2E 
uses: actions/upload-artifact@v3 
with: 
name: e2e-test-results 
path: e2e-results/ 

deploy-staging: 
if: github.event_name == 'push' && github.ref == 'refs/heads/develop' 
потреби: e2e-tests 
виконується: ubuntu-latest 
середовище: проміжна версія 
кроки: 
- використовує: actions/checkout@v3 

- назва: Завантажити артефакти збірки 
використовує: actions/download-artifact@v3 
з: 
назва: build-output 
шлях: dist/ 

- назва: Розгорнути в проміжну версію 
виконати: | 
# Додайте сюди ваш скрипт розгортання echo "Розгортання в проміжне середовище"

deploy-production: if: github.event_name == 'push' && github.ref == 'refs/heads/main' needs: e2e-tests runs-on: ubuntu-latest environment: production steps: - uses: actions/checkout@v3 
- name: Завантажити артефакти збірки uses: actions/download-artifact@v3 with: name: build-output path: dist/ 
- name: Розгорнути в продакшн run: | 
# Додайте сюди ваш скрипт розгортання 
echo "Розгортання у виробничому середовищі" 
``` 

## GitLab CI/CD Pipeline 

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
артефакти: 
шляхи: 
- coverage/ 
термін дії expire_in: 1 тиждень 

integration-tests: 
stage: test 
image: node:${NODE_VERSION} 
script: 
- npm ci 
- npm run test:integration 
артефакти: 
шляхи: 
- integration-coverage/ 
термін дії expire_in: 1 тиждень 

build: 
stage: build 
image: node:${NODE_VERSION} 
script: 
- npm ci 
- npm run build 
артефакти: 
шляхи: 
- dist/ 
термін дії expire_in: 1 тиждень 

e2e-tests: 
stage: e2e-test 
image: cypress/browsers:node${NODE_VERSION}-chrome 
script: 
- npm ci 
- npm run test:e2e 
артефакти: 
шляхи: 
- e2e-results/ 
expire_in: 1 тиждень 

deploy-staging: 
stage: deploy 
image: node:${NODE_VERSION} 
script: 
- echo "Розгортання в проміжне середовище" 
# Додайте сюди свій скрипт розгортання 
environment: 
name: staging 
only: 
- develop 

deploy-production: 
stage: deploy 
image: node:${NODE_VERSION} 
script: 
- echo "Розгортання в виробниче середовище" 
# Додайте сюди свій скрипт розгортання 
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

stage('Якість коду') { 
parallel { 
stage('Lint') { 
steps { 
sh 'npm run lint' 
} 
} 
stage('Перевірка типу') { 
steps { 
sh 'npm run type-check' 
} 
} 
stage('Перевірка формату') { 
steps { 
sh 'npm run format:check' 
} 
} 
stage('Аудит безпеки') { 
steps { 
sh 'npm audit --production' 
} 
} 
} 


stage('Тест') { 
parallel { 
stage('Модульні тести') { 
steps { 
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
reportName: 'Звіт про покриття' 
]) 
} } 
} 
stage('Інтеграційні тести') { 
steps { 
sh 'npm run test:integration' 
} 
} 
} 

stage('Збірка') { 
steps { 
sh 'npm run build' 
} 
post { 
success { 
archiveArtifacts артефакти: 'dist/**/*', fingerprint: true 
} 
} 


stage('E2E тести') { 
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
reportName: 'Звіт про тестування E2E' 
]) 
} 
} 
} 

post { 
always { 
cleanWs() 
} 

} 

``` 

## Конвеєр Azure DevOps 

``` yaml 
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
- stage: Validate 
jobs: 
- job: CodeQuality 
steps: 
- task: NodeTool@0 вхідні дані: versionSpec: $(nodeVersion) displayName: 'Встановити Node.js' - скрипт: npm ci displayName: 'Встановити залежності' 
- скрипт: npm run lint displayName: 'Виконати linting' 
- скрипт: npm run type-check displayName: 'Виконати перевірку типів' 
- скрипт: npm run format:check displayName: 'Перевірити форматування коду' 
- задача: npm@1 вхідні дані: команда: 'custom' customCommand: 'audit --production' displayName: 'Аудит безпеки' 

- етап: Тест dependsOn: Перевірити завдання: - завдання: UnitTests кроки: - задача: NodeTool@0 вхідні дані: versionSpec: $(nodeVersion) displayName: 'Встановити Node.js' 

- скрипт: npm ci 
displayName: 'Встановити залежності' 

- скрипт: npm run test 
displayName: 'Запустити модульні тести' 

- task: PublishTestResults@2 inputs: testResultsFormat: 'JUnit' testResultsFiles: '**/junit-*.xml' mergeTestResults: true testRunTitle: 'Модульні тести' displayName: 'Опублікувати результати тестування' 

- task: PublishCodeCoverageResults@1 inputs: codeCoverageTool: 'Cobertura' summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml' 
reportDirectory: '$(System.DefaultWorkingDirectory)/coverage' 
displayName: 'Покриття коду публікації' 

- етап: Збірка 
dependsOn: Тестування 
завдання: 
- завдання: BuildApp 
кроки: 
- завдання: NodeTool@0 
вхідні дані: 
versionSpec: $(nodeVersion) 
displayName: 'Встановити Node.js' 

- скрипт: npm ci 
displayName: 'Встановити залежності' 

- скрипт: npm run build 
displayName: 'Збірка програми' 

- завдання: CopyFiles@2 
вхідні дані: 
sourceFolder: '$(System.DefaultWorkingDirectory)/dist' 
вміст: '**' 
targetFolder: '$(Build.ArtifactStagingDirectory)' 
displayName: 'Копіювати файли збірки' 

- завдання: PublishBuildArtifacts@1 
вхідні дані: 
шляхДоПублікації: '$(Build.ArtifactStagingDirectory)' artifactName: 'drop' displayName: 'Опублікувати артефакти збірки' 

- stage: E2ETest dependsOn: Збірка jobs: - job: E2ETests steps: - task: NodeTool@0 inputs: versionSpec: $(nodeVersion) displayName: 'Встановити Node.js' - script: npm ci displayName: 'Встановити залежності' 
- task: DownloadBuildArtifacts@0 inputs: buildType: 'current' downloadType: 'single' artifactName: 'drop' downloadPath: '$(System.DefaultWorkingDirectory)/dist' displayName: 'Завантажити артефакти збірки' 

- script: npm run test:e2e displayName: 'Запустити E2E тести' 

- завдання: PublishTestResults@2 
вхідні дані: 
testResultsFormat: 'JUnit' 
testResultsFiles: '**/e2e-*.xml' 
mergeTestResults: true 
testRunTitle: 'Тести E2E' 
displayName: 'Опублікувати результати тестів E2E' 

- етап: DeployStaging 
dependsOn: E2ETest 
умова: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/develop')) 
завдання: 
- розгортання: DeployStaging 
середовище: проміжне 
стратегія: 
runOnce: 
розгортання: 
кроки: 
- скрипт: echo "Розгортання в проміжне середовище" 
displayName: 'Розгортання в проміжне середовище' 

- етап: DeployProduction 
dependsOn: E2ETest 
умова: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main')) 
jobs: 
- deployment: DeployProduction 
environment: production 
strategy: 
runOnce: 
deploy: 
steps: 
- script: echo "Розгортання у виробниче середовище" 
displayName: 'Розгортання у виробниче середовище' 
``` 

## Найкращі практики для конвеєрів CI/CD 

1. **Швидке завершення збоїв**: Спочатку виконуйте швидкі перевірки, такі як linting та перевірка типів, щоб забезпечити швидкий зворотний зв'язок 
2. **Паралельне виконання**: Паралельно запускайте незалежні завдання, щоб зменшити тривалість конвеєра 
3. **Кешування**: Кешуйте залежності для пришвидшення збірок 
4. **Артефакти**: Спільне використання артефактів збірки між завданнями, щоб уникнути перебудови 
5. **Розділення середовищ**: Використовуйте різні середовища для проміжної та виробничої розробки 
6. **Ручне схвалення**: Вимагайте ручного схвалення для розгортань у виробничому середовищі 
7. **Сповіщення**: Налаштування сповіщень про збої конвеєра

8. **Керування секретами**: Використовуйте безпечні методи для обробки секретів та облікових даних

9. **Версіонування**: Включіть інформацію про версію до артефактів збірки

10. **Моніторинг**: Моніторинг продуктивності конвеєра та оптимізація за потреби

## Контрольний список впровадження

- [ ] Налаштування репозиторію контролю версій
- [ ] Налаштування платформи CI/CD на вибір
- [ ] Створення базової конфігурації конвеєра
- [ ] Додавання перевірок якості коду
- [ ] Налаштування виконавців тестів
- [ ] Налаштування процесу збірки
- [ ] Налаштування середовищ розгортання
- [ ] Налаштування сповіщень
- [ ] Документування використання та обслуговування конвеєра
- [ ] Навчання команди робочому процесу CI/CD
