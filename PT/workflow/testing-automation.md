# Automação de Testes

Este documento fornece configurações e fluxos de trabalho padronizados para automatizar processos de teste de acordo com os padrões de desenvolvimento web.

## Teste Unitário

### Configuração do Jest

```js
// jest.config.js
module.exports = {
predefinição: 'ts-jest',
testEnvironment: 'jsdom',
roots: ['<rootDir>/src'],
transform: {
'^.+\\.tsx?$': 'ts-jest',
'^.+\\.jsx?$': 'babel-jest',
},
testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
moduleNameMapper: {
'^@/(.*)$': '<diretório_raiz>/origem/$1',
'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
'\\.(jpg|jpeg|png|gif|webp|svg)$': '<diretório_raiz>/__mocks__/fileMock.js',
},
collectCoverageFrom: [ 
'origem/**/*.{js,jsx,ts,tsx}',
'!origem/**/*.d.ts',
'!origem/**/*.stories.{js,jsx,ts,tsx}',
'!origem/index.{js,jsx,ts,tsx}',

'!src/serviceWorker.{js,jsx,ts,tsx}', 
'!src/reportWebVitals.{js,jsx,ts,tsx}', 
'!src/setupTests.{js,jsx,ts,tsx}', 
], 
coberturaLimite: { 
global: { 
ramificações: 80, 
funções: 80, 
linhas: 80, 
instruções: 80, 
}, 
}, 
setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], 
testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'], 
watchPlugins: [ 
'jest-watch-typeahead/nome do arquivo', 
'jest-watch-typeahead/testname', 
], 
}; 
``` 

### Configuração da Biblioteca de Testes React

```js 
// src/setupTests.ts 
import '@testing-library/jest-dom'; 
import { configure } from '@testing-library/react'; 

// Configurar a Biblioteca de Testes React
configure({ 
testIdAttribute: 'data-testid', 
}); 

// Janela simulada.matchMedia
Object.defineProperty(window, 'matchMedia', {
gravável: true,
valor: jest.fn().mockImplementation(consulta => ({
correspondências: false,
mídia: consulta,
onchange: null,
addListener: jest.fn(),
removeListener: jest.fn(),
addEventListener: jest.fn(),
removeEventListener: jest.fn(),
dispatcheEvent: jest.fn(),
})),
});

// IntersectionObserver simulado
class MockIntersectionObserver {
observe = jest.fn();
unobserve = jest.fn();
desconectar = jest.fn();
} 

Object.defineProperty(window, 'IntersectionObserver', { 
writable: true, 
value: MockIntersectionObserver, 
}); 
``` 

## Teste de Integração 

### Configuração do Cypress 

```js 
// cypress.config.js 
const { defineConfig } = require('cypress'); 

module.exports = defineConfig({ 
e2e: { 
baseUrl: 'http://localhost:3000', 
specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}', 
supportFile: 'cypress/support/e2e.ts', 
viewportWidth: 1280, 
viewportHeight: 720, 
video: false, 
screenshotOnRunFailure: true, 
chromeWebSecurity: false, 
experimentalStudio: true, 
}, 
component: { 
devServer: { 
framework: 'react', 
bundler: 'webpack', 
}, 
specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}', 
supportFile: 'cypress/support/component.ts', 
}, 
env: { 
apiUrl: 'http://localhost:3001/api', 
}, 
retries: { 
runMode: 2, 
openMode: 0, 
}, 
}); 
``` 

### Arquivo de Suporte do Cypress 

```js 
// cypress/support/e2e.ts 
import './commands'; 

// Impede que exceções não capturadas falhem nos testes 
Cypress.on('uncaught:exception', (err) => { 
// retornar falso aqui impede que o Cypress falhe no teste 
return false; 
}); 

// Registrar nomes de testes no console
beforeEach(() => {
const testName = Cypress.currentTest.title;
cy.log(`Running: ${testName}`);
});
```

### Comandos do Cypress

```js
// cypress/support/commands.ts
import '@testing-library/cypress/add-commands';

// Comando personalizado para login
Cypress.Commands.add('login', (e-mail, senha) => {
cy.session([e-mail, senha], () => {
cy.visit('/login');
cy.get('[data-testid=email-input]').type(e-mail);
cy.get('[data-testid=password-input]').type(password);
cy.get('[data-testid=login-button]').click();
cy.url().should('not.include', '/login');
});

// Comando personalizado para solicitações de API com autenticação
Cypress.Commands.add('apiLogin', (email, password) => { 
cy.request({ 
method: 'POST', 
url: `${Cypress.env('apiUrl')}/auth/login`, 
body: { email, password }, 
}).then((response) => { 
window.localStorage.setItem('authToken', response.body.token); 
}); 
}); 
``` 

## Teste de Ponta a Ponta

### Configuração do Playwright

```js 
// playwright.config.js 
const { defineConfig, devices } = require('@playwright/test'); 

module.exports = defineConfig({ 
testDir: './e2e', 
timeout: 30 * 1000, 
expect: { 
timeout: 5000, 
}, 
fullyParallel: true, 
forbidOnly: !!process.env.CI, 
retries: process.env.CI ? 2 : 0, 
workers: process.env.CI ? 1 : indefinido, 
reporter: [ 
['html'], 
['junit', { outputFile: 'test-results/e2e-junit.xml' }], 
], 
use: { 
actionTimeout: 0, 
baseURL: 'http://localhost:3000', 
trace: 'na-primeira-tentativa', 
video: 'na-primeira-tentativa', 
captura de tela: 'somente-em-caso-de-falha',
},
projetos: [ 
{ 
nome: 'chromium', 
uso: { ...dispositivos['Chrome para Desktop'] },
},
{ 
nome: 'firefox', 
uso: { ...dispositivos['Firefox para Desktop'] },
},
{ 
nome: 'webkit', 
uso: { ...dispositivos['Safari para Desktop'] },
},
{ 
nome: 'Chrome para Mobile', 
uso: { ...dispositivos['Pixel 5'] },
},
{ 
nome: 'Safari para Mobile', 
uso: { ...dispositivos['iPhone 12'] },
},
],
Servidor web: { 
comando: 'npm run start', 
porta: 3000, 
    reuseExistingServer: !process.env.CI,
  },
});
``` 

## Teste de Regressão Visual

### Configuração do Storybook

```js 
// .storybook/main.js 
module.exports = { 
histórias: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'], 
addons: [ 
'@storybook/addon-links', 
'@storybook/addon-essentials', 
'@storybook/addon-interactions', 
'@storybook/addon-a11y', 
'storybook-addon-performance', 
], 
estrutura: { 
nome: '@storybook/react-webpack5', 
opções: {}, 
}, 
documentos: { 
autodocs: true, 
}, 
staticDirs: ['../público'], 
}; ``` 

### Testes Visuais de Storybook com Chromatic

```yaml
nome: Testes de Regressão Visual

em:
push:
ramificações: [principal, desenvolver]

solicitação_de_requisição:
ramificações: [principal, desenvolver]

tarefas:
regressão-visual:
execuções-em: ubuntu-latest
etapas:
- usos: actions/checkout@v3
com:
profundidade-de-busca: 0

- nome: Configurar Node.js
usos: actions/setup-node@v3
com:
versão-do-nó: '18'
cache: 'npm'

- nome: Instalar dependências
execução: npm ci

- nome: Publicar no Chromatic
usos: chromaui/action@v1
com:
token-do-projeto: ${{ secrets.CHROMATIC_PROJECT_TOKEN }} 
exitZeroOnChanges: true 
``` 

## Teste de Desempenho 

### Configuração do Lighthouse CI 

```js 
// lighthouserc.js 
module.exports = { 
ci: { 
collect: { 
startServerCommand: 'npm run start', 
url: ['http://localhost:3000/', 'http://localhost:3000/about', 'http://localhost:3000/contact'], 
numberOfRuns: 3, 
settings: { 
predefinição: 'desktop', 
}, 
}, 
upload: { 
target: 'temporary-public-storage', 
}, 
asserção: { 
predefinição: 'lighthouse:recommended', 
asserções: { 
'categorias:desempenho': ['aviso', { Pontuação mínima: 0,9 }],
'categorias:acessibilidade': ['erro', { Pontuação mínima: 0,9 }],
'categorias:melhores-práticas': ['erro', { Pontuação mínima: 0,9 }],
'categorias:seo': ['erro', { Pontuação mínima: 0,9 }],
}, 
}, 
}; ``` 

### Ação do Lighthouse CI no GitHub

```yaml
nome: Teste de Desempenho

em:
push:
ramificações: [principal, desenvolver]

solicitação_de_requisição:
ramificações: [principal, desenvolver]

tarefas:
lighthouse:
executa-em: ubuntu-latest
etapas:
- usos: actions/checkout@v3

- nome: Configurar Node.js
usos: actions/setup-node@v3
com:
versão-do-nó: '18'
cache: 'npm'

- nome: Instalar dependências
executar: npm ci

- nome: Compilar
executar: npm executar compilação

- nome: Executar Lighthouse CI
executar: |
npm install -g @lhci/cli
lhci autorun
env:
LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

## Teste de Carga

### Configuração do k6

```js
// load-test.js
importar http de 'k6/http';
importar { sleep, check } de 'k6';
importar { Taxa } de 'k6/metrics';

const failRate = new Rate('failed_requests');

export const options = { 
stage: [ 
{ duration: '1m', target: 50 }, // Aumentar para 50 usuários
{ duration: '3m', target: 50 }, // Permanecer em 50 usuários por 3 minutos
{ duration: '1m', target: 100 }, // Aumentar para 100 usuários
{ duration: '3m', target: 100 }, // Permanecer em 100 usuários por 3 minutos
{ duration: '1m', target: 0 }, // Diminuir para 0 usuários
], 
thresholds: { 
http_req_duration: ['p(95)<500'], // 95% das solicitações devem ser concluídas em menos de 500 ms
'failed_requests': ['rate<0.1'], // Menos de 10% das solicitações podem falhar
}, 
};

exportar função padrão () { 
const res = http.get('https://example.com/'); 

const checkRes = check(res, { 
'status é 200': (r) => r.status === 200, 
'tempo de resposta < 500ms': (r) => r.timings.duration < 500, 
}); 

failRate.add(!checkRes); 

sleep(1); } 
``` 

## Fluxo de Trabalho do GitHub Actions para Testes

```yaml
nome: Conjunto de Testes

em:
push:
ramificações: [principal, desenvolver]

solicitação_de_requisição:
ramificações: [principal, desenvolver]

tarefas:
testes-de-unidade:
execuções-em: ubuntu-latest
etapas:
- usos: actions/checkout@v3

- nome: Configurar Node.js
usos: actions/setup-node@v3
com:
versão-do-nó: '18'
cache: 'npm'

- nome: Instalar dependências
execução: npm ci

- nome: Executar testes de unidade
execução: npm test -- --coverage

- nome: Enviar cobertura para o Codecov
usos: codecov/codecov-action@v3
com:
token: ${{ secrets.CODECOV_TOKEN }} 
files: ./coverage/lcov.info 
flags: unittests 
name: codecov-umbrella 
fail_ci_if_error: true 

integration-tests: 
runs-on: ubuntu-latest 
necessities: unit-tests 
steps: 
- uses: actions/checkout@v3 

- name: Configurar Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Instalar dependências 
run: npm ci 

- name: Compilar 
run: npm executar compilação 

- name: Executar testes do Cypress 
uses: cypress-io/github-action@v5 
with: 
build: npm executar compilação 
start: npm iniciar 
wait-on: 'http://localhost:3000'

- nome: Carregar capturas de tela do Cypress
usa: actions/upload-artifact@v3
if: failure()
com:
nome: cypress-screenshots
caminho: cypress/screenshots

e2e-tests:
executa-em: ubuntu-latest
precisa: testes-de-integração
etapas:
- usa: actions/checkout@v3

- nome: Configurar Node.js
usa: actions/setup-node@v3
com:
node-version: '18'
cache: 'npm'

- nome: Instalar dependências
executar: npm ci

- nome: Instalar navegadores do Playwright
executar: npx playwright install --with-deps

- nome: Compilar
executar: npm executar compilação

- nome: Executar o Playwright testes
execução: npx playwright test

- nome: Carregar relatório do Playwright
usos: ações/upload-artifact@v3
se: sempre()
com:
nome: playwright-report
caminho: playwright-report/
```

## Melhores Práticas para Automação de Testes

1. **Pirâmide de Testes**: Siga a abordagem da pirâmide de testes com mais testes unitários, menos testes de integração e ainda menos testes E2E
2. **Testes Contínuos**: Execute testes automaticamente a cada commit
3. **Feedback Rápido**: Otimize os testes para que sejam executados rapidamente e forneça feedback imediato
4. **Testes Isolados**: Garanta que os testes sejam independentes e não afetem uns aos outros
5. **Dados Realistas**: Use dados de teste realistas que representem cenários de produção
6. **Testes Sustentáveis**: Escreva código de teste limpo e sustentável com abstrações adequadas
7. **Testes Visuais**: Inclua testes de regressão visual para componentes de UI
8. **Testes de Desempenho**: Teste o desempenho regularmente para detectar regressões
9. **Testes de Acessibilidade**: Incorpore testes de acessibilidade ao processo de automação
10. **Testes de Segurança**: Inclua testes de segurança como parte do conjunto de testes automatizados

## Lista de Verificação de Implementação

- [ ] Configurar o Jest para testes unitários
- [ ] Configurar a Biblioteca de Testes React para testes de componentes
- [ ] Configurar o Cypress para testes de integração
- [ ] Configurar o Playwright para testes de ponta a ponta
- [ ] Configurar o Storybook com Chromatic para testes de regressão visual
- [ ] Configurar o Lighthouse CI para testes de desempenho
- [ ] Configurar o k6 para testes de carga
- [ ] Integrar testes em pipelines de CI/CD
- [ ] Configurar relatórios de cobertura de código
- [ ] Configurar o monitoramento para resultados e tendências de testes