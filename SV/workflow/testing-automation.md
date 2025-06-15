# Automatisering av testning

Detta dokument tillhandahåller standardiserade konfigurationer och arbetsflöden för att automatisera testprocesser enligt webbutvecklingsstandarder.

## Enhetstestning 

### Jest-konfiguration 

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
moduleNameMapper: { 
'^@/(.*)$': '<rotkatalog>/källa/$1', 
'\\.(css|less|scss|sass)$': 'identitets-obj-proxy', 
'\\.(jpg|jpeg|png|gif|webp|svg)$': '<rotkatalog>/__mocks__/fileMock.js', 
}, 
samla inTäckningFrån: [ 
'källa/**/*.{js,jsx,ts,tsx}', 
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
'jest-watch-typeahead/filnamn', 
... 'jest-watch-typeahead/testnamn', 
], 
}; 
``` 

### Konfigurera React-testbibliotek 

```js 
// src/setupTests.ts 
import '@testing-library/jest-dom'; 
import { configure } from '@testing-library/react'; 

// Konfigurera React-testbibliotek 
configure({ 
testIdAttribute: 'data-testid', 
}); 

// Mock window.matchMedia 
Object.defineProperty(window, 'matchMedia', { 
writable: true, 
value: jest.fn().mockImplementation(query => ({ 
matchningar: false, 
media: query, 
onchange: null, 
addListener: jest.fn(), 
removeListener: jest.fn(), 
addEventListener: jest.fn(), 
removeEventListener: jest.fn(), 
dispatchEvent: jest.fn(), 
})), 
}); 

// Mock IntersectionObserver 
class MockIntersectionObserver { 
observe = jest.fn(); 
unobserve = jest.fn(); 
disconnect = jest.fn(); 






















Class MockIntersectionObserver { 
observe = jest.fn(); 
unobserve = jest.fn(); 

disconnect = jest.fn(); 
... } 

Object.defineProperty(window, 'IntersectionObserver', { writable: true, value: MockIntersectionObserver, 
}); 
``` 

## Integrationstestning 

### Cypress-konfiguration 

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

### Cypress supportfil 

```js 
// cypress/support/e2e.ts 
import './commands'; 

// Förhindra att oupptäckta undantag misslyckas med tester 
Cypress.on('uncaught:exception', (err) => { 
// returning av falskt här förhindrar att Cypress misslyckas med testet 
return false; 
}); 

// Logga testnamn till konsolen 
beforeEach(() => { 
const testnamn = Cypress.currentTest.title; 
cy.log(`Körs: ${testnamn}`); 
}); 
``` 

### Cypress-kommandon 

```js 
// cypress/support/commands.ts 
import '@testing-library/cypress/add-commands'; 

// Anpassat kommando för inloggning 
Cypress.Commands.add('login', (email, password) => { 
cy.session([email, password], () => { 
cy.visit('/login'); 
cy.get('[data-testid=email-input]').type(email); 
cy.get('[data-testid=password-input]').type(password); 
cy.get('[data-testid=login-button]').click(); 
cy.url().should('not.include', '/login'); 
}); 
}); 

// Anpassat kommando för API-förfrågningar med autentisering 
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

## End-to-End-testning 

### Konfiguration av dramatiker 

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
workers: process.env.CI ? 1 : odefinierad, 
reporter: [ 
['html'], 
['junit', { outputFile: 'test-results/e2e-junit.xml' }], 
], 
use: { 
actionTimeout: 0, 
baseURL: 'http://localhost:3000', 
trace: 'vid första försöket', 
video: 'vid första försöket', 
screenshot: 'endast-vid-fel', 
}, 
projekt: [ 
{ 
namn: 'chromium', 
användning: { ...enheter['Skrivbords-Chrome'] }, 
}, 
{ 
namn: 'firefox', 
användning: { ...enheter['Skrivbords-Firefox'] }, 
}, 
{ 
namn: 'webkit', 
användning: { ...enheter['Skrivbords-Safari'] }, 
}, 
{ 
namn: 'Mobil Chrome', 
användning: { ...enheter['Pixel 5'] }, 
}, 
{ 
namn: 'Mobil Safari', 
användning: { ...enheter['iPhone 12'] }, 
}, 
], 
webbserver: { 
kommando: 'npm run start', 
port: 3000, 
återanvändBefintligServer: !process.miljö.CI, }, }); 
} ``` 

## Visuell regressionstestning 

### Storybook-konfiguration 

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
autodocs: true, 
}, 
staticDirs: ['../public'], 
};
``` 

### Visuell testning av storybook med Chromatic 

```yaml 
namn: Visuella regressionstester 

på: 
push: 
branches: [ main, develop ] 
pull_request: 
branches: [ main, develop ] 

jobs: 
visual-regression: 
runs-on: ubuntu-latest 
steg: 
- använder: actions/checkout@v3 
med: 
fetch-depth: 0 

- namn: Konfigurera Node.js 
använder: actions/setup-node@v3 
med: 
nodversion: '18' 
cache: 'npm' 

- namn: Installera beroenden 
run: npm ci 

- namn: Publicera till Chromatic 
använder: chromaui/action@v1 
med: 
projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }} 
exitZeroOnChanges: true 
``` 

## Prestandatestning 

### Lighthouse CI-konfiguration 

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
asserts: { 
'categories:performance': ['warn', { minScore: 0.9 }], 
'kategorier:tillgänglighet': ['fel', { minPoäng: 0.9 }], 
'kategorier:bästa-praxis': ['fel', { minPoäng: 0.9 }], 
'kategorier:seo': ['fel', { minPoäng: 0.9 }], 
}, 
}, 
}, 
}; 
``` 

### Lighthouse CI GitHub-åtgärd 

```yaml 
namn: Prestandatestning 

på: 
push: 
branches: [ main, develop ] 
pull_request: 
branches: [ main, develop ] 

jobb: 
lighthouse: 
runs-on: ubuntu-latest 
steg: 
- använder: actions/checkout@v3 

- namn: Konfigurera Node.js 
använder: actions/setup-node@v3 
med: 
nodversion: '18' 
cache: 'npm' 

- namn: Installera beroenden 
run: npm ci 

- namn: Bygg 
run: npm run build 

- namn: Kör Lighthouse CI 
run: | 
npm install -g @lhci/cli 
lhci autorun 
env: 
LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }} 
``` 

## Lasttestning 

### k6-konfiguration 

```js 
// load-test.js 
importera http från 'k6/http'; 
importera { sova, kontrollera } från 'k6'; 
importera { hastighet } från 'k6/metrik'; 

const failRate = new Rate('misslyckade_förfrågningar'); 

export const options = { } stages: [ } { duration: '1m', target: 50 }, // Öka antalet användare till 50 } 
{ duration: '3m', target: 50 }, // Håll 50 användare i 3 minuter 
{ duration: '1m', target: 100 }, // Öka antalet användare till 100 
{ duration: '3m', target: 100 }, // Håll 100 användare i 3 minuter 
{ duration: '1m', target: 0 }, // Minska antalet användare till 0 
], 
thresholds: { } http_req_duration: ['p(95)<500'], // 95 % av förfrågningarna måste slutföras under 500 ms 
'failed_requests': ['rate<0.1'], // Färre än 10 % av förfrågningarna kan misslyckas 
}, 
}; 

export default function () { 
const res = http.get('https://example.com/'); 

const checkRes = check(res, { 
'status är 200': (r) => r.status === 200, 
'svarstid < 500ms': (r) => r.timings.duration < 500, 
}); 

failRate.add(!checkRes); 

sleep(1); 



FailRate.add(!checkRes); 


sleep(1); 



FailRate.add(!checkRes); 


sleep(1); 



FailRate.add("checkRes"); 


sleep(1); 



FailRate.add("checkRes"); 


sleep(1); 



FailRate.add("checkRes"); 


sleep(1); 



FailRate.add("checkRes"); 


sleep(1); 



FailRate.add("checkRes"); 


sleep(1); 



FailRate.add("checkRes"); 


Sle ..."); 


FailRate.add("); 


Sleep(1); 



FailRate.add(" } 
``` 

## GitHub Actions-arbetsflöde för testning 

```yaml 
namn: Testsvit 

på: 
push: 
branches: [ main, develop ] 
pull_request: 
branches: [ main, develop ] 

jobs: 
unit-tests: 
runs-on: ubuntu-latest 
steg: 
- använder: actions/checkout@v3 

- namn: Konfigurera Node.js 
använder: actions/setup-node@v3 
med: 
node-version: '18' 
cache: 'npm' 

- namn: Installera beroenden 
kör: npm ci 

- namn: Kör enhetstester 
kör: npm test -- --coverage 

- namn: Ladda upp coverage till Codecov 
använder: codecov/codecov-action@v3 
med: 
token: ${{ hemligheter.CODECOV_TOKEN }} filer: ./coverage/lcov.info flaggor: enhetstester namn: codecov-umbrella fail_ci_if_error: sant 

integration-tests: körs-på: ubuntu-senaste behöver: enhetstester steg: 
- använder: actions/checkout@v3 

- namn: Konfigurera Node.js använder: actions/setup-node@v3 med: nodversion: '18' cache: 'npm' 

- namn: Installera beroenden kör: npm ci 

- namn: Bygg kör: npm kör bygg 

- namn: Kör Cypress-tester använder: cypress-io/github-action@v5 med: bygg: npm kör bygg start: npm start vänta-på: 'http://localhost:3000' 

- namn: Ladda upp Cypress-skärmdumpar 
använder: actions/upload-artifact@v3 
if: failure() 
med: 
namn: cypress-screenshots 
sökväg: cypress/screenshots 

e2e-tests: 
körs-på: ubuntu-latest 
behöver: integration-tests 
steg: 
- använder: actions/checkout@v3 

- namn: Konfigurera Node.js 
använder: actions/setup-node@v3 
med: 
nodversion: '18' 
cache: 'npm' 

- namn: Installera beroenden 
kör: npm ci 

- namn: Installera Playwright-webbläsare 
kör: npx playwright install --with-deps 

- namn: Bygg 
kör: npm kör bygg 

- namn: Kör Playwright-tester 
kör: npx playwright test 

- namn: Ladda upp dramatikerrapport använder: actions/upload-artefakt@v3 
if: always() 
med: 
namn: dramatikerrapport 
sökväg: dramatikerrapport/ 
``` 

## Bästa praxis för testautomation 

1. **Testpyramid**: Följ testpyramidmetoden med fler enhetstester, färre integrationstester och ännu färre E2E-tester 
2. **Kontinuerlig testning**: Kör tester automatiskt vid varje commit 
3. **Snabb feedback**: Optimera tester för att köras snabbt och ge omedelbar feedback 
4. **Isolerade tester**: Säkerställ att tester är oberoende och inte påverkar varandra 
5. **Realistiska data**: Använd realistiska testdata som representerar produktionsscenarier 
6. **Underhållsbara tester**: Skriv ren, underhållbar testkod med korrekta abstraktioner 
7. **Visuell testning**: Inkludera visuell regressionstestning för UI-komponenter 
8. **Prestandatestning**: Testa regelbundet prestanda för att upptäcka regressioner 
9. **Tillgänglighet Testning**: Inkludera tillgänglighetstestning i automatiseringsprocessen
10. **Säkerhetstestning**: Inkludera säkerhetstestning som en del av den automatiserade testsviten

## Implementeringschecklista

- [ ] Konfigurera Jest för enhetstestning
- [ ] Konfigurera React Testing Library för komponenttestning
- [ ] Konfigurera Cypress för integrationstestning
- [ ] Konfigurera Playwright för end-to-end-testning
- [ ] Konfigurera Storybook med Chromatic för visuell regressionstestning
- [ ] Konfigurera Lighthouse CI för prestandatestning
- [ ] Konfigurera k6 för belastningstestning
- [ ] Integrera tester i CI/CD-pipelines
- [ ] Konfigurera kodtäckningsrapportering
- [ ] Konfigurera övervakning för testresultat och trender