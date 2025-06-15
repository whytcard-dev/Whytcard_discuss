# Automatisation des tests

Ce document fournit des configurations et des workflows standardisés pour automatiser les processus de test conformément aux normes de développement web.

## Tests unitaires

### Configuration de Jest

```js 
// jest.config.js 
module.exports = { 
preset: 'ts-jest', 
testEnvironment: 'jsdom', 
roots: ['<rootDir>/src'], 
transform: { 
'^.+\\.tsx?$': 'ts-jest', 
'^.+\\.jsx?$': 'babel-jest', 
}, 
testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$', 
moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], 
moduleNameMapper : { 
'^@/(.*)$': '<répertoire_racine>/src/$1', 
'\\.(css|less|scss|sass)$': 'identity-obj-proxy', 
'\\.(jpg|jpeg|png|gif|webp|svg)$': '<répertoire_racine>/__mocks__/fileMock.js', 
}, 
collectCoverageFrom : [ 
'src/**/*.{js,jsx,ts,tsx}', 
'!src/**/*.d.ts', 
'!src/**/*.stories.{js,jsx,ts,tsx}', 
'!src/index.{js,jsx,ts,tsx}', 
'!src/serviceWorker.{js,jsx,ts,tsx}', 
'!src/reportWebVitals.{js,jsx,ts,tsx}', 
'!src/setupTests.{js,jsx,ts,tsx}', 
], 
coverageThreshold: { 
global: { 
branches: 80, 
fonctions: 80, 
lignes: 80, 
instructions: 80, 
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

### Configuration de la bibliothèque de tests React 

```js 
// src/setupTests.ts 
import '@testing-library/jest-dom'; 
import { configure } from '@testing-library/react'; 

// Configurer la bibliothèque de tests React 
configure({ 
testIdAttribute: 'data-testid', 
}); // Fenêtre fictive.matchMedia
Object.defineProperty(window, 'matchMedia', { 
writable: true, 
value: jest.fn().mockImplementation(query => ({ 
matches: false, 
media: query, 
onchange: null, 
addListener: jest.fn(), 
removeListener: jest.fn(), 
addEventListener: jest.fn(), 
removeEventListener: jest.fn(), 
dispatchEvent: jest.fn(), 
})), 
}); 

// IntersectionObserver fictif
class MockIntersectionObserver { 
observe = jest.fn(); 
unobserve = jest.fn(); 
disconnect = jest.fn(); } 

Object.defineProperty(window, 'IntersectionObserver', { 
writable: true, 
value: MockIntersectionObserver, 
}); 
``` 

## Tests d'intégration 

### Configuration Cypress 

```js 
// cypress.config.js 
const { defineConfig } = require('cypress'); module.exports = defineConfig({ 
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

### Fichier de support Cypress 

```js 
// cypress/support/e2e.ts 
import './commands'; 

// Empêcher les exceptions non interceptées d'échouer aux tests 
Cypress.on('uncaught:exception', (err) => { 
// Renvoyer false ici empêche Cypress d'échouer au test 
return false; 
}); // Enregistrer les noms des tests dans la console
beforeEach(() => { 
const testName = Cypress.currentTest.title; 
cy.log(`Running: ${testName}`); 
}); 
``` 

### Commandes Cypress 

```js 
// cypress/support/commands.ts 
import '@testing-library/cypress/add-commands'; // Commande personnalisée pour la connexion
Cypress.Commands.add('login', (email, mot de passe) => { 
cy.session([email, mot de passe], () => { 
cy.visit('/login'); 
cy.get('[data-testid=email-input]').type(email); 
cy.get('[data-testid=password-input]').type(password); 
cy.get('[data-testid=login-button]').click(); 
cy.url().should('not.include', '/login'); 
}); 
}); // Commande personnalisée pour les requêtes API avec authentification
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

## Tests de bout en bout

### Configuration Playwright 

```js 
// playwright.config.js 
const { defineConfig, devices } = require('@playwright/test'); module.exports = defineConfig({ 
testDir: './e2e', 
timeout: 30 * 1000, 
expect: { 
timeout: 5000, 
}, 
fullyParallel: true, 
forbidOnly: !!process.env.CI, 
retries: process.env.CI ? 2 : 0, 
workers: process.env.CI ? 1 : undefined, 
reporter: [ 
['html'], 
['junit', { outputFile: 'test-results/e2e-junit.xml' }], 
], 
use: { 
actionTimeout: 0, 
baseURL: 'http://localhost:3000', 
trace: 'on-first-retry', 
video: 'on-first-retry', 
screenshot: 'only-on-failure', 
}, 
projets : [ 
{ 
nom : 'chromium', 
utilisation : { ...devices['Desktop Chrome'] }, 
}, 
{ 
nom : 'firefox', 
utilisation : { ...devices['Desktop Firefox'] }, 
}, 
{ 
nom : 'webkit', 
utilisation : { ...devices['Desktop Safari'] }, 
}, 
{ 
nom : 'Mobile Chrome', 
utilisation : { ...devices['Pixel 5'] }, 
}, 
{ 
nom : 'Mobile Safari', 
utilisation : { ...devices['iPhone 12'] }, 
}, 
], 
serveur web : { 
commande : 'npm run start', 
port : 3000,
    réutiliser le serveur existant : !process.env.CI,
  },
});
``` 

## Tests de régression visuelle 

### Configuration de Storybook 

```js 
// .storybook/main.js 
module.exports = { 
stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'], 
addons: [ 
'@storybook/addon-links', 
'@storybook/addon-essentials', 
'@storybook/addon-interactions', 
'@storybook/addon-a11y', 
'storybook-addon-performance', 
], 
framework: { 
name: '@storybook/react-webpack5', 
options: {}, 
}, 
docs: { 
autodocs: true, }, 
staticDirs : ['../public'], 
}; ``` 

### Tests visuels Storybook avec Chromatic

```yaml 
name: Tests de régression visuelle 

on: 
push: 
branches: [ main, develop ] 
pull_request: 
branches: [ main, develop ] 

jobs: 
visual-regression: 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 
with: 
fetch-depth: 0 

- name: Setup Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Install dependencies 
run: npm ci 

- name: Publish to Chromatic 
uses: chromaui/action@v1 
with: 
projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }} 
exitZeroOnChanges: true 
``` 

## Tests de performances

### Configuration de Lighthouse CI 

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
}; ``` 

### Action GitHub Lighthouse CI 

```yaml 
nom : Tests de performance 

on : 
push : 
branches : [ main, develop ] 
pull_request : 
branches : [ main, develop ] 

jobs : 
lighthouse : 
runs-on : ubuntu-latest 
steps : 
- uses : actions/checkout@v3 

- name : Configurer Node.js 
uses : actions/setup-node@v3 
with : 
node-version : '18' 
cache : 'npm' 

- name : Installer les dépendances 
run : npm ci 

- name : Build 
run : npm run build 

- name : Exécuter Lighthouse CI 
run : | npm install -g @lhci/cli 
lhci autorun 
env: 
LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }} 
``` 

## Test de charge

### Configuration de k6 

```js 
// load-test.js 
import http depuis 'k6/http'; 
import { sleep, check } depuis 'k6'; 
import { Rate } depuis 'k6/metrics'; 

const failRate = new Rate('failed_requests'); export const options = { 
stages: [ 
{ duration: '1m', target: 50 }, // Montée à 50 utilisateurs 
{ duration: '3m', target: 50 }, // Maintien à 50 utilisateurs pendant 3 minutes 
{ duration: '1m', target: 100 }, // Montée à 100 utilisateurs 
{ duration: '3m', target: 100 }, // Maintien à 100 utilisateurs pendant 3 minutes 
{ duration: '1m', target: 0 }, // Réduction à 0 utilisateur 
], 
thresholds: { 
http_req_duration: ['p(95)<500'], // 95 % des requêtes doivent être traitées en moins de 500 ms 
'failed_requests': ['rate<0.1'], // Moins de 10 % des requêtes peuvent échec 
}, 
}; 

export default function () { 
const res = http.get('https://example.com/'); 

const checkRes = check(res, { 
'status is 200': (r) => r.status === 200, 
'temps de réponse < 500 ms': (r) => r.timings.duration < 500, 
}); 

failRate.add(!checkRes); 

sleep(1); } 
``` 

## Workflow d'actions GitHub pour les tests

```yaml 
name: Suite de tests 

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

- name: Configurer Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Installer les dépendances 
run: npm ci 

- name: Exécuter les tests unitaires 
run: npm test -- --coverage 

- name: Charger la couverture dans Codecov 
uses: codecov/codecov-action@v3 
with: 
Jeton : ${{ secrets.CODECOV_TOKEN }}
Fichiers : ./coverage/lcov.info
Indicateurs : tests unitaires
Nom : codecov-umbrella
Fail_ci_si_erreur : true

Tests d'intégration :
Exécution sur : ubuntu-latest
Besoins : tests unitaires
Étapes :
- Utilisations : actions/checkout@v3


- Nom : Configuration de Node.js

Utilisations : actions/setup-node@v3
Avec :
Version du nœud : '18'
Cache : 'npm'


- Nom : Installation des dépendances
Exécution : npm ci


- Nom : Build
Exécution : npm run build



- Nom : Exécution des tests Cypress
Utilisations : cypress-io/github-action@v5
Avec :
Construction : npm run build
Démarrage : npm Démarrer
wait-on: 'http://localhost:3000'

- nom: Télécharger les captures d'écran Cypress

Utilisations: actions/upload-artifact@v3

Si: failure()

Avec:

Nom: cypress-screenshots

Chemin: cypress/screenshots

E2E-tests:

Exécutions: ubuntu-latest

Besoins: tests-d'intégration

Étapes:

- Utilisations: actions/checkout@v3

- nom: Configurer Node.js

Utilisations: actions/setup-node@v3

Avec:

Version-du-nœud: '18'
Cache: 'npm'

- nom: Installer les dépendances

Exécuter: npm ci

- nom: Installer les navigateurs Playwright

Exécuter: npx playwright install --with-deps

- nom: Build

Exécuter: npm run build 

- nom : Exécuter les tests Playwright 
exécuter : npx playwright test 

- nom : Télécharger le rapport Playwright 
utilise : actions/upload-artifact@v3 
si : always() 
avec : 
nom : playwright-report 
chemin : playwright-report/ 
``` 

## Bonnes pratiques pour l'automatisation des tests

1. **Pyramide de tests** : Adoptez l'approche pyramidale de tests avec plus de tests unitaires, moins de tests d'intégration et encore moins de tests E2E.
2. **Tests continus** : Exécutez les tests automatiquement à chaque validation.
3. **Retour d'information rapide** : Optimisez les tests pour une exécution rapide et un retour d'information immédiat.
4. **Tests isolés** : Assurez-vous que les tests sont indépendants et n'interfèrent pas entre eux.
5. **Données réalistes** : Utilisez des données de test réalistes qui représentent des scénarios de production.
6. **Tests maintenables** : Écrivez du code de test propre et maintenable avec des abstractions appropriées.
7. **Visuel Tests** : Inclure des tests de régression visuels pour les composants de l'interface utilisateur.
8. **Tests de performance** : Tester régulièrement les performances pour détecter les régressions.
9. **Tests d'accessibilité** : Intégrer les tests d'accessibilité au processus d'automatisation.
10. **Tests de sécurité** : Inclure les tests de sécurité dans la suite de tests automatisés.

## Liste de contrôle d'implémentation

- [ ] Configurer Jest pour les tests unitaires.
- [ ] Configurer la bibliothèque de tests React pour les tests de composants.
- [ ] Configurer Cypress pour les tests d'intégration.
- [ ] Configurer Playwright pour les tests de bout en bout.
- [ ] Configurer Storybook avec Chromatic pour les tests de régression visuels.
- [ ] Configurer Lighthouse CI pour les tests de performance.
- [ ] Configurer k6 pour les tests de charge.
- [ ] Intégrer les tests aux pipelines CI/CD.
- [ ] Configurer les rapports de couverture de code.
- [ ] Configurer la surveillance des résultats et des tendances des tests.