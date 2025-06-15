# Testautomatisering

Dit document biedt gestandaardiseerde configuraties en workflows voor het automatiseren van testprocessen volgens de webontwikkelingsnormen.

## Unittesten

### Jest-configuratie

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
'^@/(.*)$': '<rootDir>/src/$1', 
'\\.(css|less|scss|sass)$': 'identiteit-obj-proxy', 
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
dekkingsdrempel: { 
globaal: { 
takken: 80, 
functies: 80, 
regels: 80, 
instructies: 80, 
}, 
}, 
setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], 
testPadNegeerPatronen: ['/node_modules/', '/dist/', '/build/'], 
watchPlugins: [ 
'jest-watch-typeahead/bestandsnaam', 
'jest-watch-typeahead/testnaam', 
], 
}; 
``` 

### React-testbibliotheek instellen

```js 
// src/setupTests.ts 
import '@testing-library/jest-dom'; 
import { configure } from '@testing-library/react'; 

// React-testbibliotheek configureren 
configure({ 
testIdAttribute: 'data-testid', 
}); 


// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
schrijfbaar: true,
waarde: jest.fn().mockImplementation(query => ({
overeenkomsten: false,
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

}

Object.defineProperty(window, 'IntersectionObserver', { 
schrijfbaar: true, 
waarde: MockIntersectionObserver, 
}); 
``` 

## Integratietesten 

### Cypress-configuratie 

```js 
// cypress.config.js 
const { defineConfig } = require('cypress'); 

module.exports = defineConfig({ 
e2e: { 
baseUrl: 'http://localhost:3000', 
specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}', 
supportFile: 'cypress/support/e2e.ts', 
viewportBreedte: 1280, 
viewportHoogte: 720, 
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
pogingen: { 
runMode: 2, 
openMode: 0, 
}, 
}); 
``` 

### Cypress-ondersteuningsbestand

```js 
// cypress/support/e2e.ts 
importeer './commands'; 

// Voorkom dat niet-afgevangen uitzonderingen tests laten mislukken 
Cypress.on('uncaught:exception', (err) => { 
// door hier false te retourneren, voorkomt u dat Cypress de test laat mislukken 
return false; 
}); 


// Testnamen loggen naar console
beforeEach(() => { 
const testName = Cypress.currentTest.title; 
cy.log(`Running: ${testName}`); 
}); 
``` 

### Cypress-opdrachten 

```js 
// cypress/support/commands.ts 
import '@testing-library/cypress/add-commands'; 

// Aangepaste opdracht voor inloggen
Cypress.Commands.add('login', (e-mail, wachtwoord) => {
cy.session([e-mail, wachtwoord], () => {
cy.visit('/login');
cy.get('[data-testid=e-mail-invoer]').type(e-mail);
cy.get('[data-testid=wachtwoord-invoer]').type(wachtwoord);
cy.get('[data-testid=login-knop]').click();
cy.url().should('not.include', '/login');
});
});

// Aangepaste opdracht voor API-aanvragen met authenticatie
Cypress.Commands.add('apiLogin', (e-mail, wachtwoord) => {
cy.request({ 
methode: 'POST', 
url: `${Cypress.env('apiUrl')}/auth/login`, 
body: { e-mail, wachtwoord }, 
}).then((response) => { 
window.localStorage.setItem('authToken', response.body.token); 
}); 
}); 
``` 

## End-to-end testen

### Playwright-configuratie

```js
// playwright.config.js
const { defineConfig, apparaten } = require('@playwright/test'); module.exports = defineConfig({ 
testDir: './e2e', 
time-out: 30 * 1000, 
verwacht: { 
time-out: 5000, 
}, 
volledigParallel: waar, 
forbidOnly: !!process.env.CI, 
pogingen: process.env.CI ? 2 : 0, 
werkers: process.env.CI ? 1 : ongedefinieerd, 
reporter: [ 
['html'], 
['junit', { uitvoerbestand: 'testresultaten/e2e-junit.xml' }], 
], 
gebruik: { 
actieTime-out: 0, 
basis-URL: 'http://localhost:3000', 
tracering: 'bij-eerste-opnieuw-proberen', 
video: 'bij-eerste-opnieuw-proberen', 
screenshot: 'alleen-bij-falen', 
}, 
projecten: [ 
{ 
naam: 'chromium', 
gebruik: { ...apparaten['Desktop Chrome'] }, 
}, 
{ 
naam: 'firefox', 
gebruik: { ...apparaten['Desktop Firefox'] }, 
}, 
{ 
naam: 'webkit', 
gebruik: { ...apparaten['Desktop Safari'] }, 
}, 
{ 
naam: 'Mobiele Chrome', 
gebruik: { ...apparaten['Pixel 5'] }, 
}, 
{ 
naam: 'Mobiele Safari', 
gebruik: { ...apparaten['iPhone 12'] }, 
}, 
], 
webserver: { 
opdracht: 'npm run start', 
poort: 3000, 
    hergebruikBestaandeServer: !process.env.CI,
  },
});
``` 

## Visuele regressietesten

### Storybook-configuratie

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
statischeDirs: ['../publiek'], 
}; ``` 

### Storybook Visuele Testing met Chromatic

```yaml
naam: Visuele Regressietests

aan:
push:
branches: [ main, development ]
pull_request:
branches: [ main, development ]

taken:
visual-regression:
runs-on: ubuntu-latest
stappen:
- gebruikt: actions/checkout@v3
met:
fetch-depth: 0

- naam: Node.js instellen
gebruikt: actions/setup-node@v3
met:
node-version: '18'
cache: 'npm'

- naam: Afhankelijkheden installeren
run: npm ci

- naam: Publiceren naar Chromatic
gebruikt: chromaui/action@v1
met:
projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
exitZeroOnChanges: true
``` 

## Prestatietesten

### Lighthouse CI-configuratie

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
'categorieën:performance': ['waarschuwing', { minScore: 0,9 }], 
'categorieën:toegankelijkheid': ['fout', { minScore: 0,9 }], 
'categorieën:best practices': ['fout', { minScore: 0,9 }], 
'categorieën:seo': ['fout', { minScore: 0,9 }], 
}, 
}, 
}, 
}; ``` 

### Lighthouse CI GitHub-actie

```yaml
naam: Prestatietesten

aan:
push:
branches: [ main, development ]
pull_request:
branches: [ main, development ]

taken:
lighthouse:
runs-on: ubuntu-latest
stappen:
-gebruik: actions/checkout@v3

-naam: Node.js instellen
gebruik: actions/setup-node@v3
met:
node-versie: '18'
cache: 'npm'

-naam: Afhankelijkheden installeren
run: npm ci

-naam: Bouwen
run: npm run build

-naam: Lighthouse CI uitvoeren
run: |

npm install -g @lhci/cli
lhci autorun
env:
LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

## Loadtesten

### k6-configuratie

```js
// load-test.js
importeer http van 'k6/http';
importeer { sleep, check } van 'k6';
importeer { Rate } van 'k6/metrics';

const failRate = new Rate('failed_requests');

export const options = { 
stages: [ 
{ duration: '1m', target: 50 }, // Opvoeren tot 50 gebruikers
{ duration: '3m', target: 50 }, // 3 minuten op 50 gebruikers blijven
{ duration: '1m', target: 100 }, // Opvoeren tot 100 gebruikers
{ duration: '3m', target: 100 }, // 3 minuten op 100 gebruikers blijven
{ duration: '1m', target: 0 }, // Afvoeren tot 0 gebruikers
], 
thresholds: { 
http_req_duration: ['p(95)<500'], // 95% van de verzoeken moet binnen 500 ms worden voltooid
'failed_requests': ['rate<0.1'], // Minder dan 10% van de verzoeken kan mislukken
}, 
};

export standaardfunctie () {
const res = http.get('https://example.com/');

const checkRes = check(res, {
'status is 200': (r) => r.status === 200, 
'reactietijd < 500 ms': (r) => r.timings.duration < 500, 
});

failRate.add(!checkRes);

sleep(1); } 
``` 

## GitHub Actions Workflow voor testen

```yaml
naam: Testsuite

aan:
push:
branches: [ main, development ]
pull_request:
branches: [ main, development ]

taken:
unit-tests:
runs-on: ubuntu-latest
stappen:
-gebruik: actions/checkout@v3

-naam: Node.js instellen
gebruik: actions/setup-node@v3
met:
node-versie: '18'
cache: 'npm'

-naam: Afhankelijkheden installeren
run: npm ci

-naam: Unittests uitvoeren
run: npm test -- --coverage

-naam: Dekking uploaden naar Codecov
gebruik: codecov/codecov-action@v3
met:
token: ${{ secrets.CODECOV_TOKEN }}
bestanden: ./coverage/lcov.info
vlaggen: unittests
naam: codecov-umbrella
fail_ci_if_error: true

integratietests:
draait-op: ubuntu-latest
behoeften: unittests
stappen:
-gebruik: actions/checkout@v3

-naam: Node.js instellen
gebruik: actions/setup-node@v3
met:

node-versie: '18'
cache: 'npm'

-naam: Afhankelijkheden installeren
uitvoeren: npm ci

-naam: Bouwen
uitvoeren: npm run build

-naam: Cypress-tests uitvoeren
gebruik: cypress-io/github-action@v5
met:
bouw: npm run build
start: npm start
wait-on: 'http://localhost:3000'

- naam: Cypress screenshots uploaden
gebruikt: acties/upload-artefact@v3
als: failure()
met:

naam: cypress-screenshots
pad: cypress/screenshots

e2e-tests:
draait-op: ubuntu-nieuwste
nodig: integratietests
stappen:
- gebruikt: acties/checkout@v3

- naam: Node.js instellen
gebruikt: acties/setup-node@v3
met:
node-versie: '18'
cache: 'npm'

- naam: Afhankelijkheden installeren
uitvoeren: npm ci

- naam: Playwright browsers installeren
uitvoeren: npx playwright install --with-deps

- naam: Bouwen
uitvoeren: npm run build

- naam: Playwright-tests uitvoeren
run: npx playwright-test

- naam: Playwright-rapport uploaden
uses: actions/upload-artifact@v3
if: always()
with:

naam: playwright-report
pad: playwright-report/
```

## Best practices voor testautomatisering

1. **Testpiramide**: Volg de testpiramidebenadering met meer unittests, minder integratietests en nog minder E2E-tests
2. **Continue tests**: Voer automatisch tests uit bij elke commit
3. **Snelle feedback**: Optimaliseer tests om snel te draaien en directe feedback te geven
4. **Geïsoleerde tests**: Zorg ervoor dat tests onafhankelijk zijn en elkaar niet beïnvloeden
5. **Realistische data**: Gebruik realistische testdata die productiescenario's representeren
6. **Onderhoudbare tests**: Schrijf schone, onderhoudbare testcode met de juiste abstracties
7. **Visuele tests**: Inclusief visuele regressietests voor UI-componenten
8. **Prestatietests**: Test regelmatig de prestaties om regressies op te sporen
9. **Toegankelijkheidstesten**: Integreer toegankelijkheidstesten in het automatiseringsproces
10. **Beveiligingstests**: Inclusief beveiligingstests als onderdeel van de geautomatiseerde testsuite

## Implementatiechecklist

- [ ] Jest instellen voor unittests
- [ ] React-testbibliotheek configureren voor componenttests
- [ ] Cypress instellen voor integratietests
- [ ] Playwright configureren voor end-to-end-tests
- [ ] Storybook met Chromatic instellen voor visuele regressietests
- [ ] Lighthouse CI configureren voor prestatietests
- [ ] K6 instellen voor loadtests
- [ ] Tests integreren in CI/CD-pipelines
- [ ] Codedekkingsrapportage configureren
- [ ] Monitoring instellen voor testresultaten en trends