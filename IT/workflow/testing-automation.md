# Automazione dei test

Questo documento fornisce configurazioni e flussi di lavoro standardizzati per l'automazione dei processi di test in base agli standard di sviluppo web.

## Test unitari

### Configurazione Jest

```js
// jest.config.js
module.exports = {
preset: 'ts-jest',
testEnvironment: 'jsdom',
roots: ['<rootDir>/src'],
transformer: {
'^.+\\.tsx?$': 'ts-jest',
'^.+\\.jsx?$': 'babel-jest',
},
testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
moduleNameMapper: { 
'^@/(.*)$': '<rootDir>/src/$1', 
'\\.(css|less|scss|sass)$': 'identity-obj-proxy', 
'\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', 
}, 
collectCoverageFrom: [ 
'src/**/*.{js,jsx,ts,tsx}', 
'!src/**/*.d.ts', 
'!src/**/*.stories.{js,jsx,ts,tsx}', 
'!src/index.{js,jsx,ts,tsx}', 
'!src/serviceWorker.{js,jsx,ts,tsx}', 
'!src/reportWebVitals.{js,jsx,ts,tsx}', 
'!src/setupTests.{js,jsx,ts,tsx}', 
], 
coverageThreshold: { 
globale: { 
branch: 80, 
funzioni: 80, 
linee: 80, 
istruzioni: 80, 
}, 
}, 
setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], 
testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'], 
watchPlugins: [ 
'jest-watch-typeahead/filename', 
'jest-watch-typeahead/testname', 
], 
}; 
``` 

### Configurazione della libreria di test React

```js 
// src/setupTests.ts 
import '@testing-library/jest-dom'; 
import { configure } from '@testing-library/react'; 

// Configurazione della libreria di test React
configure({ 
testIdAttribute: 'data-testid', 
}); 

// Finestra fittizia.matchMedia
Object.defineProperty(window, 'matchMedia', {
scrivibile: true,
valore: jest.fn().mockImplementation(query => ({
corrispondenze: false,
media: query,
onchange: null,
addListener: jest.fn(),
removeListener: jest.fn(),
addEventListener: jest.fn(),
removeEventListener: jest.fn(),
dispatchEvent: jest.fn(),
})),
});

// IntersectionObserver fittizio
class MockIntersectionObserver {
observe = jest.fn();
unobserve = jest.fn();
disconnect = jest.fn();
} 

Object.defineProperty(window, 'IntersectionObserver', { 
scrivibile: true, 
valore: MockIntersectionObserver, 
}); 
``` 

## Test di integrazione

### Configurazione di Cypress

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

### File di supporto Cypress

```js 
// cypress/support/e2e.ts 
import './commands'; 

// Impedisce alle eccezioni non rilevate di fallire i test
Cypress.on('uncaught:exception', (err) => { 
// Restituire false qui impedisce a Cypress di fallire il test
return false; 
}); 

// Registra i nomi dei test sulla console
beforeEach(() => {
const testName = Cypress.currentTest.title;
cy.log(`In esecuzione: ${testName}`);
});
```

### Comandi Cypress

```js
// cypress/support/commands.ts
import '@testing-library/cypress/add-commands';

// Comando personalizzato per l'accesso
Cypress.Commands.add('login', (email, password) => {
cy.session([email, password], () => {
cy.visit('/login');
cy.get('[data-testid=email-input]').type(email);
cy.get('[data-testid=password-input]').type(password);
cy.get('[data-testid=login-button]').click();
cy.url().should('not.include', '/login');
});
});

// Comando personalizzato per richieste API con autenticazione
Cypress.Commands.add('apiLogin', (email, password) => {
cy.request({
metodo: 'POST',
url: `${Cypress.env('apiUrl')}/auth/login`,
corpo: { email, password },
}).then((response) => {
window.localStorage.setItem('authToken', response.body.token);
});
});
```

## Test end-to-end

### Configurazione di Playwright

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
worker: process.env.CI ? 1 : indefinito, 
reporter: [ 
['html'], 
['junit', { outputFile: 'test-results/e2e-junit.xml' }], 
], 
use: { 
actionTimeout: 0, 
baseURL: 'http://localhost:3000', 
trace: 'on-first-retry', 
video: 'al primo tentativo', 
screenshot: 'solo in caso di errore', 
}, 
progetti: [ 
{ 
nome: 'chromium', 
uso: { ...devices['Desktop Chrome'] }, 
}, 
{ 
nome: 'firefox', 
uso: { ...devices['Desktop Firefox'] }, 
}, 
{ 
nome: 'webkit', 
uso: { ...devices['Desktop Safari'] }, 
}, 
{ 
nome: 'Mobile Chrome', 
uso: { ...devices['Pixel 5'] }, 
}, 
{ 
nome: 'Mobile Safari', 
uso: { ...devices['iPhone 12'] }, 
}, 
], 
webServer: { 
comando: 'npm run start',
porta: 3000,
reuseExistingServer: !process.env.CI,
},
}); 
``` 

## Test di regressione visiva

### Configurazione di Storybook

```js
// .storybook/main.js
module.exports = {
stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
componenti aggiuntivi: [
'@storybook/addon-links',
'@storybook/addon-essentials',
'@storybook/addon-interactions',
'@storybook/addon-a11y',
'storybook-addon-performance',
],
framework: {
nome: '@storybook/react-webpack5',
opzioni: {},
},
documentazione: {
autodocs: true,
}, 
staticDirs: ['../public'], 
}; 
``` 

### Test visivi di Storybook con Chromatic

```yaml
nome: Test di regressione visiva

on:
push:
branch: [ main, develop ]
pull_request:
branch: [ main, develop ]

jobs:
visual-regression:
runs-on: ubuntu-latest
steps:
- uses: actions/checkout@v3
with:
fetch-depth: 0

- name: Imposta Node.js
uses: actions/setup-node@v3
with:
node-version: '18'
cache: 'npm'

- name: Installa dipendenze
run: npm ci

- name: Pubblica su Chromatic
uses: chromaui/action@v1
with:
projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
exitZeroOnChanges: true
```

## Test delle prestazioni

### Configurazione CI di Lighthouse

```js
// lighthouserc.js
module.exports = {
ci: {
collect: {
startServerCommand: 'npm run start',
url: ['http://localhost:3000/', 'http://localhost:3000/about', 'http://localhost:3000/contact'],
numberOfRuns: 3,
settings: {
preset: 'desktop',
},
},
upload: {
target: 'temporary-public-storage',
},
assert: {
preset: 'lighthouse:recommended',
assertions: {
'categories:performance': ['warn', { minScore: 0.9 }], 
'categories:accessibility': ['error', { minScore: 0.9 }], 
'categories:best-practices': ['error', { minScore: 0.9 }], 
'categories:seo': ['error', { minScore: 0.9 }], 
}, 
}, 
}, 
}; 
``` 

### Azione GitHub di Lighthouse CI

```yaml
nome: Test delle prestazioni

on:
push:
branch: [ main, develop ]
pull_request:
branch: [ main, develop ]

jobs:
lighthouse:
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

- nome: Build
run: npm run build

- nome: Esegui Lighthouse CI
run: |
npm install -g @lhci/cli
lhci autorun
env:
LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

## Test di carico

### Configurazione k6

```js
// load-test.js
import http da 'k6/http';
import { sleep, check } da 'k6';
import { Rate } da 'k6/metrics';

const failRate = new Rate('failed_requests');

export const options = { 
stages: [ 
{ duration: '1m', target: 50 }, // Aumenta fino a 50 utenti 
{ duration: '3m', target: 50 }, // Rimani a 50 utenti per 3 minuti 
{ duration: '1m', target: 100 }, // Aumenta fino a 100 utenti 
{ duration: '3m', target: 100 }, // Rimani a 100 utenti per 3 minuti 
{ duration: '1m', target: 0 }, // Riduci a 0 utenti 
], 
thresholds: { 
http_req_duration: ['p(95)<500'], // Il 95% delle richieste deve essere completato entro 500 ms 
'failed_requests': ['rate<0.1'], // Meno di Il 10% delle richieste può fallire
}, 
}; 

export default function () { 
const res = http.get('https://example.com/'); 

const checkRes = check(res, { 
'lo stato è 200': (r) => r.status === 200, 
'tempo di risposta < 500 ms': (r) => r.timings.duration < 500, 
}); 

failRate.add(!checkRes); 

sleep(1); 
} 
``` 

## Flusso di lavoro di GitHub Actions per i test

```yaml
name: Suite di test

on:
push:
branches: [ main, develop ]
pull_request:
branches: [ main, develop ]

jobs:
unit-tests:
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

- name: Esegui test unitari
run: npm test -- --coverage

- name: Carica coverage su Codecov
uses: codecov/codecov-action@v3
con: 
token: ${{ secrets.CODECOV_TOKEN }} 
file: ./coverage/lcov.info 
flag: unittests 
nome: codecov-umbrella 
fail_ci_if_error: true 

integration-tests: 
runs-on: ubuntu-latest 
needs: unit-tests 
steps: 
- uses: actions/checkout@v3 

- name: Setup Node.js 
uses: actions/setup-node@v3 
con: 
node-version: '18' 
cache: 'npm' 

- name: Install dependencies 
run: npm ci 

- name: Build 
run: npm run build 

- name: Run Cypress tests 
uses: cypress-io/github-action@v5 
con: 
build: npm run build 
start: npm start
wait-on: 'http://localhost:3000'

- name: Carica screenshot Cypress
uses: actions/upload-artifact@v3
if: failure()
with:
name: cypress-screenshots
path: cypress/screenshots

e2e-tests:
runs-on: ubuntu-latest
needs: integration-tests
steps:
- uses: actions/checkout@v3

- name: Installa Node.js
uses: actions/setup-node@v3
with:
node-version: '18'
cache: 'npm'

- name: Installa dipendenze
run: npm ci

- name: Installa i browser Playwright
run: npx playwright install --with-deps

- name: Build
run: npm run build

- name: Esegui test Playwright
run: npx playwright test

- name: Carica report Playwright
uses: actions/upload-artifact@v3
if: always()
with:
name: playwright-report
path: playwright-report/
```

## Best practice per l'automazione dei test

1. **Piramide di test**: Segui l'approccio della piramide di test con più test unitari, meno test di integrazione e ancora meno test E2E
2. **Test continui**: Esegui i test automaticamente a ogni commit
3. **Feedback rapido**: Ottimizza i test per un'esecuzione rapida e fornisci feedback immediato
4. **Test isolati**: Assicurati che i test siano indipendenti e non si influenzino a vicenda
5. **Dati realistici**: Utilizza dati di test realistici che rappresentano scenari di produzione
6. **Test manutenibili**: Scrivi codice di test pulito e manutenibile con astrazioni appropriate
7. **Visual Test**: includere test di regressione visiva per i componenti dell'interfaccia utente
8. **Test delle prestazioni**: testare regolarmente le prestazioni per individuare le regressioni
9. **Test di accessibilità**: integrare i test di accessibilità nel processo di automazione
10. **Test di sicurezza**: includere i test di sicurezza come parte della suite di test automatizzata

## Checklist di implementazione

- [ ] Configurare Jest per i test unitari
- [ ] Configurare la libreria di test React per i test dei componenti
- [ ] Configurare Cypress per i test di integrazione
- [ ] Configurare Playwright per i test end-to-end
- [ ] Configurare Storybook con Chromatic per i test di regressione visiva
- [ ] Configurare Lighthouse CI per i test delle prestazioni
- [ ] Configurare k6 per i test di carico
- [ ] Integrare i test nelle pipeline CI/CD
- [ ] Configurare il reporting sulla copertura del codice
- [ ] Configurare il monitoraggio per i risultati e le tendenze dei test