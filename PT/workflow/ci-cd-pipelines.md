# Automação de Pipeline de CI/CD

Este documento fornece configurações padronizadas de pipeline de CI/CD para automatizar os processos de construção, teste e implantação de acordo com os padrões de desenvolvimento web.

## Fluxo de Trabalho do GitHub Actions

### Pipeline Básico de CI (Ações do GitHub)

```yaml
nome: Pipeline de CI

em:
push:
ramificações: [principal, desenvolver]

solicitação_de_requisição:
ramificações: [principal, desenvolver]

tarefas:
construir-e-testar:
execuções-em: ubuntu-latest

etapas:
- usos: actions/checkout@v3

- nome: Configurar Node.js
usos: actions/setup-node@v3
com:
versão-do-nó: '18'
cache: 'npm'

- nome: Instalar dependências
executar: npm ci

- nome: Lint
executar: npm executar lint

- nome: Verificação de tipo
executar: npm executar verificação-de-tipo

- nome: Testes unitários
executar: npm executar teste

- nome: Build
executar: npm executar build

- nome: Carregar artefatos de build
usa: actions/upload-artifact@v3
com:
nome: build-output
caminho: dist/
```

### Pipeline de CI/CD completo (Ações do GitHub)

```yaml
nome: Pipeline de CI/CD

em:
push:
branches: [ main, develop ]
pull_request:
branches: [ main, develop ]

jobs:
code-quality:
runs-on: ubuntu-latest
steps:
- usa: actions/checkout@v3

- nome: Configurar Node.js
usa: actions/setup-node@v3
com:
node-version: '18'
cache: 'npm'

- nome: Instalar dependências
executar: npm ci

- nome: Lint
executar: npm run lint

- nome: Verificação de tipo
executar: npm run type-check

- nome: Verificação de estilo de código
executar: npm run format:check

- nome: Auditoria de segurança
executar: npm audit --production

teste:
necessidades: qualidade-de-código
executa-em: ubuntu-latest
etapas:
- usa: actions/checkout@v3

- nome: Configurar Node.js
usa: actions/setup-node@v3
com:
node-version: '18'
cache: 'npm'

- nome: Instalar dependências
executar: npm ci

- nome: Testes unitários
executar: npm run test

- nome: Testes de integração
executar: npm run test:integration

- nome: Carregar cobertura de teste
usa: actions/upload-artifact@v3
com:
nome: test-coverage
caminho: coverage/

build:
precisa: test
executa em: ubuntu-latest
etapas:
- usa: actions/checkout@v3

- nome: Configurar Node.js
usa: actions/setup-node@v3
com:
versão do node: '18'
cache: 'npm'

- nome: Instalar dependências
executar: npm ci

- nome: Build
executar: npm run build

- nome: Carregar artefatos de build
usa: actions/upload-artifact@v3
com:
nome: build-output
caminho: dist/

e2e-tests:
precisa: build
executa em: ubuntu-latest
etapas:
- usa: actions/checkout@v3

- nome: Configurar Node.js
usa: actions/setup-node@v3
com:
node-version: '18'
cache: 'npm'

- nome: Instalar dependências
executar: npm ci

- nome: Baixar artefatos de compilação
usa: actions/download-artifact@v3
com:
nome: build-output
caminho: dist/

- nome: Testes E2E
executar: npm executar teste:e2e

- nome: Enviar resultados de testes E2E
usa: actions/upload-artifact@v3
com:
nome: e2e-test-results
caminho: e2e-results/

implementar-staging:
if: github.event_name == 'push' && github.ref == 'refs/heads/develop'
necessidades: e2e-tests
executa-em: ubuntu-latest
ambiente: staging
etapas:
- usos: actions/checkout@v3

- nome: Baixar artefatos de compilação
usos: actions/download-artifact@v3
com:
nome: build-output
caminho: dist/

- nome: Implantar no staging
execução: |
# Adicione seu script de implantação aqui
echo "Implantando no ambiente de preparação"

implantar-produção:
if: github.event_name == 'push' && github.ref == 'refs/heads/main'
needs: e2e-tests
runs-on: ubuntu-latest
environment: production
steps:
- uses: actions/checkout@v3

- name: Baixar artefatos de compilação
uses: actions/download-artifact@v3
with:
name: build-output
path: dist/

- name: Implantar na Produção
run: |
# Adicione seu script de implantação aqui
echo "Implantando no ambiente de produção"
```

## Pipeline de CI/CD do GitLab

```yaml
estágios:
- validar
- testar
- construir
- e2e-teste
- implantar

variáveis:
VERSÃO_DO_NÓ: "18"

cache:
chave: ${CI_COMMIT_REF_SLUG}
caminhos:
- node_modules/

qualidade-do-código:
estágio: validar
imagem: nó:${VERSÃO_DO_NÓ}
script:
- npm ci
- npm run lint
- npm run type-check
- npm run format:check
- npm audit --production

testes-de-unidade:
estágio: teste
imagem: nó:${VERSÃO_DO_NÓ}
script:
- npm ci
- npm run teste
artefatos:
caminhos:
- cobertura/
expira em: 1 semana

testes-de-integração:
estágio: teste
imagem: nó:${VERSÃO_DO_NÓ}
script:
- npm ci
- npm run teste:integração
artefatos:
caminhos:
- cobertura-de-integração/
expira em: 1 semana

construção:
estágio: construção
imagem: nó:${VERSÃO_DO_NÓ}
script:
- npm ci
- npm run compilação
artefatos:
caminhos:
- dist/
expira em: 1 semana

testes-e2e:
estágio: teste-e2e
imagem: cypress/navegadores:node${VERSÃO_DO_NÓ}-chrome
script:
- npm ci
- npm run teste:e2e
artefatos:
caminhos:
- e2e-results/
expire_in: 1 semana

deploy-staging:
estágio: implantar
imagem: nó:${VERSÃO_DO_NÓ}
script:
- echo "Implantando no ambiente de preparo"
# Adicione seu script de implantação aqui
ambiente:
nome: preparo
somente:
-desenvolver

deploy-produção:
estágio: implantar
imagem: nó:${VERSÃO_DO_NÓ}
script:
- echo "Implantando no ambiente de produção"
# Adicione seu script de implantação aqui
ambiente:
nome: produção
somente:
-principal
quando: manual
```

## Pipeline do Jenkins

```groovy
pipeline {
agente {
docker {
imagem 'node:18'
} 
} 

estágios {
estágio('Instalar') {
etapas {
sh 'npm ci' 
} 
} 

stage('Qualidade do Código') { 
parallel { 
stage('Lint') { 
steps { 
sh 'npm run lint' 
} 
} 
stage('Verificação de Tipo') { 
steps { 
sh 'npm run type-check' 
} 
} 
stage('Verificação de Formato') { 
steps { 
sh 'npm run format:check' 
} 
} 
stage('Auditoria de Segurança') { 
steps { 
sh 'npm audit --production' 
} 
} 
} 
} 

stage('Teste') { 
parallel { 
stage('Testes Unitários') { 
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
stage('Testes de Integração') { 
steps { 
sh 'npm run test:integration' 
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

stage('Testes E2E') { 
steps { 
sh 'npm run test:e2e' 
} 
post { 
sempre { 
publiqueHTML(destino: [ 
permitirMissing: falso, 
sempreLinkParaÚltimoBuild: falso, 
manterTudo: verdadeiro, 
reportDir: 'e2e-results', 
reportFiles: 'index.html', 
reportName: 'Relatório de Teste E2E' 
]) 
} 
} 
} 
} 

post { 
sempre { 
limparWs() 
} 
} 
} 
``` 

## Pipeline do Azure DevOps 

```yaml 
gatilho: 
ramos: 
incluir: 
- principal 
- desenvolver 

pool: 
vmImage: 'ubuntu-latest' 

variáveis: 
versão do nó: '18.x' 

estágios: 
- estágio: Validar 
tarefas: 
- tarefa: Qualidade do Código 
etapas:
- tarefa: NodeTool@0
entradas:
versionSpec: $(nodeVersion)
Exibição: 'Instalar Node.js'


- script: npm ci
Exibição: 'Instalar dependências'


- script: npm run lint
Exibição: 'Executar linting'


- script: npm run type-check
Exibição: 'Executar verificação de tipo'


- script: npm run format:check
Exibição: 'Verificar formatação do código'


- tarefa: npm@1
entradas:
comando: 'custom'
comandocustom: 'auditoria --produção'
Exibição: 'Auditoria de segurança'

- estágio: Teste
depende de: Validar
tarefas:

- tarefa: Testes Unitários
etapas:
- tarefa: NodeTool@0
entradas:
versionSpec: $(nodeVersion)
Exibição: 'Instalar Node.js'

- script: npm ci
displayName: 'Instalar dependências'

- script: npm run test
displayName: 'Executar testes unitários'

- task: PublishTestResults@2
inputs:
testResultsFormat: 'JUnit'
testResultsFiles: '**/junit-*.xml'
mergeTestResults: true
testRunTitle: 'Testes Unitários'
displayName: 'Publicar resultados dos testes'

- task: PublishCodeCoverageResults@1
inputs:
codeCoverageTool: 'Cobertura'
summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml'
reportDirectory: '$(System.DefaultWorkingDirectory)/coverage'
displayName: 'Publicar cobertura de código'

- stage: Build
dependsOn: Teste
jobs:
- job: BuildApp
steps:
- task: NodeTool@0
inputs:
versionSpec: $(nodeVersion)
Exibir exibição: 'Instalar Node.js'


- script: npm ci
Exibir exibição: 'Instalar dependências'


- script: npm run build
Exibir exibição: 'Construir aplicativo'


- task: CopyFiles@2
inputs:
sourceFolder: '$(System.DefaultWorkingDirectory)/dist'
contents: '**'
targetFolder: '$(Build.ArtifactStagingDirectory)'
Exibir exibição: 'Copiar arquivos de compilação'


- task: PublishBuildArtifacts@1
inputs:
pathToPublish: '$(Build.ArtifactStagingDirectory)'

artefatoName: 'drop'
Exibir exibição: 'Publicar artefatos de compilação'

- stage: E2ETest
dependsOn: Build
jobs:
- job: E2ETests
steps:
- task: NodeTool@0
inputs:
versionSpec: $(nodeVersion)
displayName: 'Instalar Node.js'

- script: npm ci
displayName: 'Instalar dependências'

- task: DownloadBuildArtifacts@0
inputs:
buildType: 'current'
downloadType: 'single'
artifactName: 'drop'
downloadPath: '$(System.DefaultWorkingDirectory)/dist'
displayName: 'Baixar artefatos de build'

- script: npm run test:e2e
displayName: 'Executar testes E2E'

- task: PublishTestResults@2
inputs:
testResultsFormat: 'JUnit'
testResultsFiles: '**/e2e-*.xml'
mergeTestResults: true
testRunTitle: 'Testes E2E'
Exibir: 'Publicar resultados de testes E2E'

- estágio: DeployStaging
dependeOn: E2ETest
condição: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/develop'))
tarefas:
- implantação: DeployStaging
ambiente: staging
estratégia:
runOnce:
implantação:
etapas:
- script: echo "Implantando no ambiente de staging"
Exibir: 'Implantar no staging'

- estágio: DeployProduction
dependeOn: E2ETest
condição: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
tarefas:
- implantação: DeployProduction
ambiente: Produção
Estratégia:
RunOnce:
Implantar:
Etapas:
- script: echo "Implantando no ambiente de produção"
displayName: 'Implantar na Produção'
``` 

## Melhores Práticas para Pipelines de CI/CD

1. **Falha Rápida**: Execute verificações rápidas, como linting e verificação de tipos, primeiro para fornecer feedback rápido.
2. **Execução Paralela**: Execute jobs independentes em paralelo para reduzir a duração do pipeline.
3. **Cache**: Armazene dependências em cache para acelerar as compilações.
4. **Artefatos**: Compartilhe artefatos de compilação entre os jobs para evitar a reconstrução.
5. **Separação de Ambientes**: Use ambientes diferentes para preparação e produção.
6. **Aprovação Manual**: Exija aprovação manual para implantações de produção.
7. **Notificações**: Configure notificações para falhas no pipeline.
8. **Gerenciamento de Segredos**: Use métodos seguros para lidar com segredos e credenciais.
9. **Versionamento**: Inclua informações de versão na compilação. Artefatos
10. **Monitoramento**: Monitore o desempenho do pipeline e otimize conforme necessário

## Lista de Verificação de Implementação

- [ ] Configurar o repositório de controle de versão
- [ ] Configurar a plataforma de CI/CD de sua escolha
- [ ] Criar a configuração básica do pipeline
- [ ] Adicionar verificações de qualidade do código
- [ ] Configurar os executores de teste
- [ ] Configurar o processo de build
- [ ] Configurar os ambientes de implantação
- [ ] Configurar notificações
- [ ] Documentar o uso e a manutenção do pipeline
- [ ] Treinar a equipe no fluxo de trabalho de CI/CD
