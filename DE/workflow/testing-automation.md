# Testautomatisierung

Dieses Dokument bietet standardisierte Konfigurationen und Workflows zur Automatisierung von Testprozessen gemäß den Webentwicklungsstandards.

## Unit-Tests

### Jest-Konfiguration

```js
// jest.config.js
module.exports = {
Vorgabe: 'ts-jest'
Testumgebung: 'jsdom'
Roots: ['<rootDir>/src']
Transformation: {
'^.+\\.tsx?$': 'ts-jest'
'^.+\\.jsx?$': 'babel-jest'
}
TestRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$'
ModuleDateierweiterungen: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
ModuleNameMapper: {
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
global: { 
Branches: 80, 
Functions: 80, 
Lines: 80, 
Statements: 80, 
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

### React-Testbibliothek einrichten 

```js 
// src/setupTests.ts 
import '@testing-library/jest-dom'; 
import { configure } from '@testing-library/react'; 

// React-Testbibliothek konfigurieren 
configure({ 
testIdAttribute: 'data-testid', 
}); 

// Mock window.matchMedia
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

// Mock IntersectionObserver
class MockIntersectionObserver { 
observe = jest.fn(); 
unobserve = jest.fn(); 
disconnect = jest.fn(); 
} 

Object.defineProperty(window, 'IntersectionObserver', { 
writable: true, 
value: MockIntersectionObserver, 
}); 
``` 

## Integrationstest 

### Cypress-Konfiguration 

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

### Cypress-Supportdatei 

```js 
// cypress/support/e2e.ts 
import './commands'; 

// Nicht abgefangene Exceptions verhindern, dass Tests fehlschlagen 
Cypress.on('uncaught:exception', (err) => { 
// Die Rückgabe von false verhindert, dass Cypress den Test fehlschlägt 
return false; 
}); 

// Testnamen in der Konsole protokollieren 
beforeEach(() => { 
const testName = Cypress.currentTest.title; 
cy.log(`Running: ${testName}`); 
}); 
``` 

### Cypress-Befehle 

```js 
// cypress/support/commands.ts 
import '@testing-library/cypress/add-commands'; 

// Benutzerdefinierter Befehl für die Anmeldung 
Cypress.Commands.add('login', (E-Mail, Passwort) => { 
cy.session([E-Mail, Passwort], () => { 
cy.visit('/login'); 
cy.get('[data-testid=E-Mail-Eingabe]').type(E-Mail); 
cy.get('[data-testid=Passwort-Eingabe]').type(Passwort); 
cy.get('[data-testid=Anmeldeschaltfläche]').click(); 
cy.url().should('not.include', '/login'); 
}); 
});

// Benutzerdefinierter Befehl für API-Anfragen mit Authentifizierung
Cypress.Commands.add('apiLogin', (E-Mail, Passwort) => { 
cy.request({ 
Methode: 'POST', 
URL: `${Cypress.env('apiUrl')}/auth/login`, 
Body: { E-Mail, Passwort }, 
}).then((Antwort) => { 
window.localStorage.setItem('authToken', response.body.token); 
}); 
}); 
``` 

## End-to-End-Tests

### Playwright-Konfiguration

```js
// playwright.config.js
const { defineConfig, Geräte } = require('@playwright/test'); 

module.exports = defineConfig({ 
testDir: './e2e', 
timeout: 30 * 1000, 
expect: { 
timeout: 5000, 
}, 
fullyParallel: true, 
forbidOnly: !!process.env.CI, 
retries: process.env.CI ? 2 : 0, 
workers: process.env.CI ? 1 : undefiniert, 
reporter: [ 
['html'], 
['junit', { outputFile: 'test-results/e2e-junit.xml' }], 
], 
use: { 
actionTimeout: 0, 
baseURL: 'http://localhost:3000', 
trace: 'on-first-retry', 
video: 'on-first-retry', 
screenshot: 'Nur bei Fehler', 
}, 
Projekte: [ 
{ 
Name: 'Chromium', 
Verwendung: { ...Geräte['Desktop Chrome'] }, 
}, 
{ 
Name: 'Firefox', 
Verwendung: { ...Geräte['Desktop Firefox'] }, 
}, 
{ 
Name: 'WebKit', 
Verwendung: { ...Geräte['Desktop Safari'] }, 
}, 
{ 
Name: 'Mobile Chrome', 
Verwendung: { ...Geräte['Pixel 5'] }, 
}, 
{ 
Name: 'Mobile Safari', 
Verwendung: { ...Geräte['iPhone 12'] }, 
}, 
], 
Webserver: { 
Befehl: 'npm run start', 
Port: 3000, 
ReuseExistingServer: !process.env.CI, 
}, 
}); 
``` 

## Visuelle Regressionstests 

### Storybook-Konfiguration 

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
staticDirs: ['../öffentlich'],
};
``` 

### Storybook Visuelle Tests mit Chromatic

```yaml
Name: Visuelle Regressionstests

auf:
Push:
Branches: [main, develop]
Pull_Request:
Branches: [main, develop]

Jobs:
Visual-Regression:
Läuft auf: Ubuntu-Latest
Schritte:
- Verwendet: actions/checkout@v3
Mit:
Fetch-Tiefe: 0

- Name: Node.js einrichten
- Verwendet: actions/setup-node@v3
Mit:
Node-Version: '18'
Cache: 'npm'

- Name: Abhängigkeiten installieren
Ausführen: npm ci

- Name: In Chromatic veröffentlichen
- Verwendet: chromaui/action@v1
Mit:
Projekttoken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }} 
exitZeroOnChanges: true 
``` 

## Leistungstests 

### Lighthouse CI-Konfiguration 

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
'categories:performance': ['warn', { minScore: 0,9 }], 
'Kategorien: Barrierefreiheit': ['Fehler', { minScore: 0,9 }], 
'Kategorien: Best Practices': ['Fehler', { minScore: 0,9 }], 
'Kategorien: SEO': ['Fehler', { minScore: 0,9 }], 
}, 
}, 
}, 
}; 
``` 

### Lighthouse CI GitHub-Aktion

```yaml
Name: Leistungstest

an:
Push:
Zweige: [main, entwickeln]
Pull_Request:
Zweige: [main, entwickeln]

Jobs:
Lighthouse:
Läuft auf: Ubuntu-Latest
Schritte:
- Verwendet: actions/checkout@v3

- Name: Node.js einrichten
- Verwendet: actions/setup-node@v3
- Mit:
Knotenversion: '18'
Cache: 'npm'

- Name: Abhängigkeiten installieren
Ausführen: npm ci

- Name: Build
Ausführen: npm run build

- Name: Lighthouse CI ausführen
Ausführen: |
npm install -g @lhci/cli
lhci autorun
env:

LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

## Lasttest

### k6-Konfiguration

```js
// load-test.js
import http from 'k6/http';
import { sleep, check } from 'k6';
import { Rate } from 'k6/metrics';

const failRate = new Rate('failed_requests');

export const options = { 
stages: [ 
{ duration: '1m', target: 50 }, // Auf 50 Nutzer hochfahren 
{ duration: '3m', target: 50 }, // 3 Minuten bei 50 Nutzern bleiben 
{ duration: '1m', target: 100 }, // Auf 100 Nutzer hochfahren 
{ duration: '3m', target: 100 }, // 3 Minuten bei 100 Nutzern bleiben 
{ duration: '1m', target: 0 }, // Auf 0 Nutzer herunterfahren 
], 
thresholds: { 
http_req_duration: ['p(95)<500'], // 95 % der Anfragen müssen in weniger als 500 ms abgeschlossen sein 
'failed_requests': ['rate<0.1'], // Weniger als 10 % der Anfragen können fehlschlagen 
}, 
};

export default function () { 
const res = http.get('https://example.com/'); 

const checkRes = check(res, { 
'Status ist 200': (r) => r.status === 200, 
'Antwortzeit < 500 ms': (r) => r.timings.duration < 500, 
}); 

failRate.add(!checkRes); 

sleep(1); 
} 
``` 

## GitHub Actions Workflow für Tests

```yaml
Name: Test Suite

auf:
Push:
Branches: [main, develop]
Pull_Request:
Branches: [main, develop]

Jobs:
Unit-Tests:
Läuft auf: Ubuntu-Latest
Schritte:
- Verwendet: actions/checkout@v3

- Name: Node.js einrichten

Verwendet: actions/setup-node@v3
Mit:
Node-Version: '18'
Cache: 'npm'

- Name: Abhängigkeiten installieren
Ausführen: npm ci

- Name: Unit-Tests ausführen
Ausführen: npm test -- --coverage

- Name: Coverage in Codecov hochladen
Verwendet: codecov/codecov-action@v3
Mit:
Token: ${{ secrets.CODECOV_TOKEN }}
Dateien: ./coverage/lcov.info
Flags: Unittests
Name: codecov-umbrella
fail_ci_if_error: true

Integrationstests:
Läuft auf: ubuntu-latest
Benötigt: Unittests
Schritte:
- Verwendet: actions/checkout@v3

- Name: Node.js einrichten
Verwendet: actions/setup-node@v3
Mit:
Knotenversion: '18'
Cache: 'npm'

- Name: Abhängigkeiten installieren
Ausführen: npm ci

- Name: Build
Ausführen: npm run build

- Name: Cypress-Tests ausführen
Verwendet: cypress-io/github-action@v5
Mit:
Build: npm run build
Start: npm start
Wait-on: 'http://localhost:3000'


- Name: Cypress-Screenshots hochladen

Verwendet: actions/upload-artifact@v3
Wenn: failure()
Mit:
Name: cypress-screenshots

Pfad: cypress/screenshots

e2e-tests:
Läuft auf: Ubuntu-Latest
Benötigt: Integrationstests
Schritte:
-Verwendet: actions/checkout@v3


- Name: Node.js einrichten

Verwendet: actions/setup-node@v3
Mit:
Knotenversion: '18'
Cache: 'npm'


- Name: Abhängigkeiten installieren
Ausführen: npm ci


- Name: Playwright-Browser installieren
Ausführen: npx playwright install --with-deps


- Name: Erstellen
Ausführen: npm run build


- Name: Ausführen Playwright-Tests

Ausführen: npx playwright test

- Name: Playwright-Bericht hochladen

Verwendet: actions/upload-artifact@v3
Wenn: immer()
Mit:
Name: playwright-bericht
Pfad: playwright-bericht/
```

## Best Practices für Testautomatisierung

1. **Testpyramide**: Folgen Sie dem Testpyramiden-Ansatz mit mehr Unit-Tests, weniger Integrationstests und noch weniger E2E-Tests.
2. **Kontinuierliches Testen**: Führen Sie Tests automatisch bei jedem Commit aus.
3. **Schnelles Feedback**: Optimieren Sie Tests für schnelle Ausführung und sofortiges Feedback.
4. **Isolierte Tests**: Stellen Sie sicher, dass die Tests unabhängig sind und sich nicht gegenseitig beeinflussen.
5. **Realistische Daten**: Verwenden Sie realistische Testdaten, die Produktionsszenarien repräsentieren.
6. **Wartungsfreundliche Tests**: Schreiben Sie sauberen, wartbaren Testcode mit angemessenen Abstraktionen.
7. **Visuelles Testen**: Integrieren Sie visuelle Regressionstests für UI-Komponenten.
8. **Leistungstests**: Regelmäßige Leistungstests, um Regressionen zu erkennen.
9. **Zugänglichkeitstests**: Integration von Zugänglichkeitstests in den Automatisierungsprozess.
10. **Sicherheitstests**: Integration von Sicherheitstests in die automatisierte Testsuite.

## Checkliste für die Implementierung

- [ ] Jest für Unit-Tests einrichten
- [ ] React Testing Library für Komponententests konfigurieren
- [ ] Cypress für Integrationstests einrichten
- [ ] Playwright für End-to-End-Tests konfigurieren
- [ ] Storybook mit Chromatic für visuelle Regressionstests einrichten
- [ ] Lighthouse CI für Leistungstests konfigurieren
- [ ] k6 für Lasttests einrichten
- [ ] Tests in CI/CD-Pipelines integrieren
- [ ] Code Coverage Reporting konfigurieren
- [ ] Monitoring für Testergebnisse und Trends einrichten