# Automatyzacja testowania

Ten dokument zawiera standardowe konfiguracje i przepływy pracy do automatyzacji procesów testowania zgodnie ze standardami tworzenia stron internetowych.

## Testowanie jednostkowe

### Konfiguracja Jest

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
modulFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
moduleNameMapper: { 
'^@/(.*)$': '<rootDir>/src/$1', 
'\\.(css|less|scss|sass)$': 'tożsamość-obiekt-proxy', 
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
global: { 
branches: 80, 
functions: 80, 
lines: 80, 
statements: 80, 
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

### Konfiguracja biblioteki testowej React 

```js 
// src/setupTests.ts 
import '@testing-library/jest-dom'; 
import { configure } from '@testing-library/react'; 

// Konfigurowanie biblioteki testowej React 
configure({ 
testIdAttribute: 'data-testid', 
}); 

// Fałszywe okno.matchMedia 
Obiekt.defineProperty(window, 'matchMedia', { 
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

// Fałszywe IntersectionObserver 
class MockIntersectionObserver { 
observe = jest.fn(); 
unobserve = jest.fn(); 
disconnect = jest.fn(); } 

Object.defineProperty(window, 'IntersectionObserver', { 
writable: true, 
value: MockIntersectionObserver, 
}); 
``` 

## Testowanie integracyjne 

### Konfiguracja Cypress 

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

### Plik pomocy technicznej Cypress 

```js 
// cypress/support/e2e.ts 
import './commands'; 

// Zapobiegaj niepowodzeniu testów przez nieobsługiwane wyjątki 
Cypress.on('uncaught:exception', (err) => { 
// zwrócenie wartości false zapobiega niepowodzeniu testu przez Cypress 
return false; 
}); 

// Rejestruj nazwy testów w konsoli 
beforeEach(() => { 
const testName = Cypress.currentTest.title; 
cy.log(`Uruchomienie: ${testName}`); 
}); 
``` 

### Polecenia Cypress 

```js 
// cypress/support/commands.ts 
import '@testing-library/cypress/add-commands'; 

// Niestandardowe polecenie do logowania 
Cypress.Commands.add('login', (email, password) => { 
cy.session([email, password], () => { 
cy.visit('/login'); 
cy.get('[data-testid=email-input]').type(email); 
cy.get('[data-testid=password-input]').type(password); 
cy.get('[data-testid=login-button]').click(); 
cy.url().should('not.include', '/login'); 
}); 
}); 

// Niestandardowe polecenie dla żądań API z uwierzytelnianiem 
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

## Testowanie kompleksowe 

### Konfiguracja Playwright 

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
workers: process.env.CI ? 1 : niezdefiniowane, 
reporter: [ 
['html'], 
['junit', { outputFile: 'test-results/e2e-junit.xml' }], 
], 
use: { 
actionTimeout: 0, 
baseURL: 'http://localhost:3000', 
trace: 'on-first-retry', 
video: 'on-first-retry', 
zrzut ekranu: 'only-on-failure', 
}, 
projekty: [ 
{ 
nazwa: 'chromium', 
użycie: { ...urządzenia['Desktop Chrome'] }, 
}, 
{ 
nazwa: 'firefox', 
użycie: { ...urządzenia['Desktop Firefox'] }, 
}, 
{ 
nazwa: 'webkit', 
użycie: { ...urządzenia['Desktop Safari'] }, 
}, 
{ 
nazwa: 'Mobilny Chrome', 
użycie: { ...urządzenia['Pixel 5'] }, 
}, 
{ 
nazwa: 'Mobilny Safari', 
użycie: { ...urządzenia['iPhone 12'] }, 
}, 
], 
webSerwer: { 
polecenie: 'npm run start', 
port: 3000, 
reuseExistingServer: !process.env.CI, 
}, 
}); ``` 

## Wizualne testowanie regresyjne 

### Konfiguracja Storybook 

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
autodocs: prawda, 
}, 
staticDirs: ['../public'], 
}; 
``` 

### Wizualne testowanie Storybook z Chromatic 

```yaml 
name: Wizualne testy regresji 

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

- name: Skonfiguruj Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Zainstaluj zależności 
run: npm ci 

- name: Publikuj w Chromatic 
uses: chromaui/action@v1 
with: 
projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }} 
exitZeroOnChanges: true 
``` 

## Testowanie wydajności 

### Konfiguracja Lighthouse CI 

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
preset: 'latarnia morska:zalecane', 
afirmacje: { 
'kategorie:wydajność': ['ostrzeżenie', { minScore: 0,9 }], 
'kategorie:dostępność': ['błąd', { minScore: 0,9 }], 
'kategorie:najlepsze praktyki': ['błąd', { minScore: 0,9 }], 
'kategorie:seo': ['błąd', { minScore: 0,9 }], 
}, 
}, 
}, 
}; 
``` 

### Lighthouse CI GitHub Action 

```yaml 
name: Testowanie wydajności 

on: 
push: 
branches: [ main, develop ] 
pull_request: 
branches: [ main, develop ] 

jobs: 
lighthouse: 
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

- name: Uruchom Lighthouse CI 
run: | 
npm install -g @lhci/cli 
lhci autorun 
env: 
LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }} 
``` 

## Testowanie obciążenia 

### Konfiguracja k6 

```js 
// load-test.js 
import http z 'k6/http'; 
import { sleep, check } z 'k6'; 
import { Rate } z 'k6/metrics'; 

const failRate = new Rate('failed_requests'); 

export const options = { 
stages: [ 
{ duration: '1m', target: 50 }, // Zwiększ do 50 użytkowników 
{ duration: '3m', target: 50 }, // Pozostań przy 50 użytkownikach przez 3 minuty 
{ duration: '1m', target: 100 }, // Zwiększ do 100 użytkowników 
{ duration: '3m', target: 100 }, // Pozostań przy 100 użytkownikach przez 3 minuty 
{ duration: '1m', target: 0 }, // Zmniejsz do 0 użytkowników 
], 
thresholds: { 
http_req_duration: ['p(95)<500'], // 95% żądań musi zostać ukończonych w czasie krótszym niż 500 ms 
'failed_requests': ['rate<0.1'], // Mniej niż 10% żądań może się nie powieść 
}, 
}; 

export default function () { 
const res = http.get('https://example.com/'); 

const checkRes = check(res, { 
'status wynosi 200': (r) => r.status === 200, 
'czas odpowiedzi < 500ms': (r) => r.timings.duration < 500, 
}); 

failRate.add(!checkRes); 

sleep(1); } 
``` 

## Przepływ pracy akcji GitHub do testowania 

```yaml 
name: Zestaw testów 

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

- name: Skonfiguruj Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Zainstaluj zależności 
run: npm ci 

- name: Uruchom testy jednostkowe 
run: npm test -- --coverage 

- name: Prześlij pokrycie do Codecov 
uses: codecov/codecov-action@v3 
with: 
token: ${{ secrets.CODECOV_TOKEN }} 
pliki: ./coverage/lcov.info 
flagi: unittests 
nazwa: codecov-umbrella 
fail_ci_if_error: true 

integration-tests: 
runs-on: ubuntu-latest 
needs: unit-tests 
steps: 
- uses: actions/checkout@v3 

- name: Setup Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Install dependencies 
run: npm ci 

- name: Build 
run: npm run build 

- name: Run Cypress tests 
uses: cypress-io/github-action@v5 
with: 
build: npm run build 
start: npm start 
wait-on: 'http://localhost:3000' 

- name: Prześlij zrzuty ekranu Cypress 
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

- name: Skonfiguruj Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Zainstaluj zależności 
run: npm ci 

- name: Zainstaluj przeglądarki Playwright 
run: npx playwright install --with-deps 

- name: Kompilacja 
run: npm run build 

- name: Uruchom testy Playwright 
run: npx playwright test 

- name: Prześlij raport Playwright 
uses: actions/upload-artifact@v3 
if: always() 
with: 
name: playwright-report 
path: playwright-report/ 
``` 

## Najlepsze praktyki automatyzacji testowania 

1. **Piramida testów**: Postępuj zgodnie z podejściem piramidy testów, stosując więcej testów jednostkowych, mniej testów integracyjnych i jeszcze mniej testów E2E 
2. **Ciągłe testowanie**: Uruchom testy automatycznie przy każdym zatwierdzeniu 
3. **Szybkie sprzężenie zwrotne**: Optymalizuj testy, aby działały szybko i zapewniały natychmiastowe sprzężenie zwrotne 
4. **Izolowane testy**: Upewnij się, że testy są niezależne i nie wpływają na siebie 
5. **Realistyczne dane**: Używaj realistycznych danych testowych, które reprezentują scenariusze produkcyjne 
6. **Utrzymywalne testy**: Pisz czyste, łatwe w utrzymaniu testowanie kodu z odpowiednimi abstrakcjami 
7. **Testowanie wizualne**: uwzględnij wizualne testowanie regresji dla komponentów interfejsu użytkownika 
8. **Testowanie wydajności**: regularnie testuj wydajność, aby wychwycić regresje 
9. **Testowanie dostępności**: uwzględnij testowanie dostępności w procesie automatyzacji 
10. **Testowanie bezpieczeństwa**: uwzględnij testowanie bezpieczeństwa jako część zautomatyzowanego zestawu testów 

## Lista kontrolna implementacji 

- [ ] Skonfiguruj Jest do testowania jednostkowego 
- [ ] Skonfiguruj bibliotekę testowania React do testowania komponentów 
- [ ] Skonfiguruj Cypress do testowania integracyjnego 
- [ ] Skonfiguruj Playwright do testowania kompleksowego 
- [ ] Skonfiguruj Storybook z Chromatic do testowania regresji wizualnej 
- [ ] Skonfiguruj Lighthouse CI do testowania wydajności 
- [ ] Skonfiguruj k6 do testowania obciążenia 
- [ ] Zintegruj testy z potokami CI/CD 
- [ ] Skonfiguruj pokrycie kodu raportowanie
- [ ] Skonfiguruj monitorowanie wyników testów i trendów