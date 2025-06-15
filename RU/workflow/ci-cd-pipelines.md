# Автоматизация конвейера CI/CD 

В этом документе представлены стандартизированные конфигурации конвейера CI/CD для автоматизации процессов сборки, тестирования и развертывания в соответствии со стандартами веб-разработки. 

## GitHub Actions Workflow

### Базовый конвейер CI (GitHub Actions)

```yaml
name: CI Pipeline

on: 
push: 
branchs: [ main, develop ] 
pull_request: 
branchs: [ main, develop ] 

jobs: 
build-and-test: 
running-on: ubuntu-latest 

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

- name: Type Check 
run: npm run type-check 

- имя: Unit tests
запуск: npm run test


- имя: Build
запуск: npm run build


- имя: Upload build artifacts
использование: actions/upload-artifact@v3
с: 
name: build-output
путь: dist/ 
``` 

### Полный конвейер CI/CD (действия GitHub) 

```yaml 
имя: CI/CD Pipeline

on: 
push: 
branchs: [ main, develop ] 
pull_request: 
branchs: [ main, develop ] 

jobs: 
code-quality: 
run-on: ubuntu-latest 
steps: 
- использование: actions/checkout@v3 

- имя: Setup Node.js 
использование: actions/setup-node@v3 
с: 
node-version: '18' 
cache: 'npm' 

- имя: Установить зависимости 
run: npm ci 

- имя: Lint 
run: npm run lint 

- имя: Проверка типа 
run: npm run type-check 

- имя: Проверка стиля кода 
run: npm run format:check 

- имя: Аудит безопасности 
run: npm audit --production 

тест: 
нужно: code-quality 
run-on: ubuntu-latest 
шаги: 
- использует: actions/checkout@v3 

- имя: Настройка Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- имя: Установить зависимости 
run: npm ci 

- имя: Модульные тесты 
run: npm run test 

- имя: Интеграция тесты 
запуск: npm run test:integration 

- имя: загрузить тестовое покрытие 
использует: actions/upload-artifact@v3 
с: 
имя: test-coverage 
путь: coverage/ 

сборка: 
нужно: test 
запускается на: ubuntu-latest 
шаги: 
- использование: actions/checkout@v3 

- имя: настройка Node.js 
использует: actions/setup-node@v3 
с: 
версия узла: '18' 
кэш: 'npm' 

- имя: установить зависимости 
запуск: npm ci 

- имя: сборка 
запуск: npm run build 

- имя: загрузить артефакты сборки 
использует: actions/upload-artifact@v3 
с: 
имя: build-output 
путь: dist/ 

e2e-tests: 
нужно: build 
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

- name: Download build artifacts 
uses: actions/download-artifact@v3 
with: 
name: build-output 
path: dist/ 

- name: E2E Tests 
run: npm run test:e2e 

- name: Upload E2E test results 
uses: actions/upload-artifact@v3 
with: 
name: e2e-test-results 
path: e2e-results/ 

deploy-staging: 
if: github.event_name == 'push' && github.ref == 'refs/heads/develop' 
потребности: e2e-tests 
запуск на: ubuntu-latest 
среда: staging 
шаги: 
- использует: actions/checkout@v3 

- имя: загрузить артефакты сборки 
использует: actions/download-artifact@v3 
с: 
имя: build-output 
путь: dist/ 

- имя: развернуть в Staging 
запуск: | 
# Добавьте сюда свой скрипт развертывания 
echo "Развертывание в тестовой среде" 

deploy-production: 
if: github.event_name == 'push' && github.ref == 'refs/heads/main' 
needs: e2e-tests 
running-on: ubuntu-latest 
environment: production 
steps: 
- uses: actions/checkout@v3 

- name: Download build artifacts 
uses: actions/download-artifact@v3 
with: 
name: build-output 
path: dist/ 

- name: Deploy to Production 
run: | 
# Добавьте сюда свой скрипт развертывания 
echo "Развертывание в производственной среде" 
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
- npm запустить тест 
артефакты: 
пути: 
- coverage/ 
истекать_в: 1 неделя 

интеграционные-тесты: 
этап: тест 
изображение: node:${NODE_VERSION} 
скрипт: 
- npm ci 
- npm запустить тест:интеграция 
артефакты: 
пути: 
- integration-coverage/ 
истекать_в: 1 неделя 

сборка: 
этап: сборка 
изображение: node:${NODE_VERSION} 
скрипт: 
- npm ci 
- npm запустить сборку 
артефакты: 
пути: 
- dist/ 
истекать_в: 1 неделя 

e2e-тесты: 
этап: e2e-тест 
изображение: cypress/browsers:node${NODE_VERSION}-chrome 
скрипт: 
- npm ci 
- npm запустить test:e2e 
artifacts: 
paths: 
- e2e-results/ 
expire_in: 1 week 

deploy-staging: 
stage: deploy 
image: node:${NODE_VERSION} 
script: 
- echo "Развертывание в тестовой среде" 
# Добавьте свой сценарий развертывания здесь 
environment: 
name: staging 
only: 
- develop 

deploy-production: 
stage: deploy 
image: node:${NODE_VERSION} 
script: 
- echo "Развертывание в тестовой среде" 
# Добавьте свой сценарий развертывания здесь 
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

этапы { 
stage('Install') { 
steps { 
sh 'npm ci' 
} 
} 

stage('Code Quality') { 
parallel { 
stage('Lint') { 
steps { 
sh 'npm run lint' 
} 
} 
stage('Type Check') { 
steps { 
sh 'npm run type-check' 
} 
} 
stage('Format Check') { 
steps { 
sh 'npm run format:check' 
} 
} 
stage('Security Audit') { 
steps { 
sh 'npm audit --production' 
} 
} 
} 
} 

stage('Test') { 
parallel { 
stage('Unit Tests') { 
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
reportName: 'Coverage Report' 
]) 
} 
} 
} 
stage('Интеграционные тесты') { 
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

stage('E2E Tests') { 
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
reportName: 'E2E Test Report' 
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
branchs: 
include: 
- main 
- develop 

pool: 
vmImage: 'ubuntu-latest' 

переменные: 
nodeVersion: '18.x' 

этапы: 
- этап: Проверка 
задания: 
- задание: CodeQuality 
шаги: 
- задача: NodeTool@0 
входные данные: 
versionSpec: $(nodeVersion) 
displayName: 'Установить Node.js' 

- скрипт: npm ci 
displayName: 'Установить зависимости' 

- скрипт: npm run lint 
displayName: 'Запустить linting' 

- скрипт: npm run type-check 
displayName: 'Запустить проверку типов' 

- скрипт: npm run format:check 
displayName: 'Проверить форматирование кода' 

- задача: npm@1 
входные данные: 
команда: 'custom' 
customCommand: 'audit --production' 
displayName: 'Аудит безопасности' 

- этап: Тест 
dependOn: Проверка 
jobs: 
- job: UnitTests 
steps: 
- task: NodeTool@0 
inputs: 
versionSpec: $(nodeVersion) 
displayName: 'Установить Node.js' 

- script: npm ci 
displayName: 'Установить зависимости' 

- script: npm run test 
displayName: 'Запустить модульные тесты' 

- task: PublishTestResults@2 
inputs: 
testResultsFormat: 'JUnit' 
testResultsFiles: '**/junit-*.xml' 
mergeTestResults: true 
testRunTitle: 'Модульные тесты' 
displayName: 'Опубликовать результаты теста' 

- task: PublishCodeCoverageResults@1 
inputs: 
codeCoverageTool: 'Cobertura' 
summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml' 
reportDirectory: '$(System.DefaultWorkingDirectory)/coverage' 
displayName: 'Publish code coverage' 

- stage: Build 
dependOn: Test 
jobs: 
- job: BuildApp 
steps: 
- task: NodeTool@0 
inputs: 
versionSpec: $(nodeVersion) 
displayName: 'Install Node.js' 

- script: npm ci 
displayName: 'Install dependencies' 

- script: npm run build 
displayName: 'Build application' 

- task: CopyFiles@2 
входные данные: 
sourceFolder: '$(System.DefaultWorkingDirectory)/dist' 
contents: '**' 
targetFolder: '$(Build.ArtifactStagingDirectory)' 
displayName: 'Копировать файлы сборки' 

- task: PublishBuildArtifacts@1 
входные данные: 
pathToPublish: '$(Build.ArtifactStagingDirectory)' 
artificateName: 'drop' 
displayName: 'Опубликовать артефакты сборки' 

- stage: E2ETest 
dependentOn: Build 
jobs: 
- job: E2ETests 
steps: 
- task: NodeTool@0 
входные данные: 
versionSpec: $(nodeVersion) 
displayName: 'Установить Node.js' 

- script: npm ci 
displayName: 'Установить зависимости' 

- task: DownloadBuildArtifacts@0 
входные данные: 
buildType: 'current' 
downloadType: 'single' 
artificateName: 'drop' 
downloadPath: '$(System.DefaultWorkingDirectory)/dist' 
displayName: 'Загрузить артефакты сборки' 

- script: npm run test:e2e 
displayName: 'Запустить тесты E2E' 

- task: PublishTestResults@2 
входные данные: 
testResultsFormat: 'JUnit' 
testResultsFiles: '**/e2e-*.xml' 
mergeTestResults: true 
testRunTitle: 'Тесты E2E' 
displayName: 'Опубликовать результаты теста E2E' 

- stage: DeployStaging 
dependentOn: E2ETest 
condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/develop')) 
jobs: 
- deployment: DeployStaging 
environment: staging 
strategy: 
runOnce: 
deploy: 
steps: 
- script: echo "Deploying to staging environment" 
displayName: 'Deploy to Staging' 

- stage: DeployProduction 
dependOn: E2ETest 
condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main')) 
jobs: 
- deployment: DeployProduction 
environment: production 
strategy: 
runOnce: 
deploy: 
steps: 
- script: echo "Deploying to production environment" 
displayName: 'Deploy to Production' 
``` 

## Лучшие практики для конвейеров CI/CD 

1. **Fail Fast**: Run быстрые проверки, такие как линтинг и проверка типов, для обеспечения быстрой обратной связи 
2. **Параллельное выполнение**: параллельное выполнение независимых заданий для сокращения продолжительности конвейера 
3. **Кэширование**: кэширование зависимостей для ускорения сборок 
4. **Артефакты**: совместное использование артефактов сборки между заданиями для предотвращения повторной сборки 
5. **Разделение среды**: использование разных сред для подготовки и производства 
6. **Ручное утверждение**: требование ручного утверждения для развертывания в производстве 
7. **Уведомления**: настройка уведомлений об ошибках конвейера 
8. **Управление секретами**: использование безопасных методов для обработки секретов и учетных данных 
9. **Управление версиями**: включение информации о версии в артефакты сборки 
10. **Мониторинг**: мониторинг производительности конвейера и оптимизация по мере необходимости 

## Контрольный список реализации 

- [ ] Настройка репозитория управления версиями 
- [ ] Настройка платформы CI/CD выбор 
- [ ] Создание базовой конфигурации конвейера 
- [ ] Добавление проверок качества кода 
- [ ] Настройка тестовых исполнителей 
- [ ] Настройка процесса сборки 
- [ ] Настройка сред развертывания 
- [ ] Настройка уведомлений 
- [ ] Документирование использования и обслуживания конвейера 
- [ ] Обучение команды рабочему процессу CI/CD 
