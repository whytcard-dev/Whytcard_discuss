# Автоматизація тестування

Цей документ містить стандартизовані конфігурації та робочі процеси для автоматизації процесів тестування відповідно до стандартів веб-розробки.

## Модульне тестування

### Конфігурація Jest

```js
// jest.config.js
module.exports = {
preset: 'ts-jest',
testEnvironment: 'jsdom',
roots: ['<кореневий_каталог>/src'],
transform: {
'^.+\\.tsx?$': 'ts-jest',
'^.+\\.jsx?$': 'babel-jest',

},
testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
moduleNameMapper: {
'^@/(.*)$': '<кореневий_каталог>/src/$1', 
'\\.(css|less|scss|sass)$': 'identity-obj-proxy', 
'\\.(jpg|jpeg|png|gif|webp|svg)$': '<кореневий_каталог>/__mocks__/fileMock.js', 
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
гілки: 80, 
функції: 80, 
рядки: 80, 
оператори: 80, 
}, 
}, 
setupFilesAfterEnv: ['<кореневий_каталог>/src/setupTests.ts'], 
testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'], 
watchPlugins: [ 
'jest-watch-typeahead/filename', 
'jest-watch-typeahead/testname', 
], 
}; 
``` 

### Налаштування бібліотеки тестування React 

```js 
// src/setupTests.ts 
import '@testing-library/jest-dom'; 
import { configure } from '@testing-library/react'; 

// Налаштування бібліотеки тестування React 
configure({ 
testIdAttribute: 'data-testid', 
}); 

// Імітація window.matchMedia 
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

// Імітація IntersectionObserver 
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

## Інтеграційне тестування 

### Конфігурація Cypress 

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

### Файл підтримки Cypress 

```js 
// cypress/support/e2e.ts 
import './commands'; 

// Запобігання невдалому проходження тестів через неперехоплені винятки 
Cypress.on('uncaught:exception', (err) => { 
// повернення false тут запобігає невдалому проходження тесту Cypress 
return false; 
}); 

// Запис назв тестів у консоль 
beforeEach(() => { 
const testName = Cypress.currentTest.title; 
cy.log(`Running: ${testName}`); 
}); 
``` 

### Команди Cypress 

```js 
// cypress/support/commands.ts 
import '@testing-library/cypress/add-commands'; 

// Спеціальна команда для входу 
Cypress.Commands.add('login', (email, password) => { 
cy.session([email, password], () => { 
cy.visit('/login'); 
cy.get('[data-testid=email-input]').type(email); 
cy.get('[data-testid=password-input]').type(password); 
cy.get('[data-testid=login-button]').click(); 
cy.url().should('not.include', '/login'); 
}); 
}); 

// Спеціальна команда для API-запитів з автентифікацією 
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

## Комплексне тестування 

### Конфігурація драматурга 

```js 
// dramaturg.config.js 
const { defineConfig, devices } = require('@playwright/test'); 

module.exports = defineConfig({ 
testDir: './e2e', 
timeout: 30 * 1000, 
expect: { 
timeout: 5000, 
}, 
fullyParallel: true, 
prohibidOnly: !!process.env.CI, 
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
screenshot: 'тільки-при-помилці', 
}, 
проєкти: [ 
{ 
назва: 'chromium', 
використовувати: { ...devices['Настільний Chrome'] }, 
}, 
{ 
назва: 'firefox', 
використовувати: { ...devices['Настільний Firefox'] }, 
}, 
{ 
назва: 'webkit', 
використовувати: { ...devices['Настільний Safari'] }, 
}, 
{ 
назва: 'Мобільний Chrome', 
використовувати: { ...devices['Pixel 5'] }, 
}, 
{ 
назва: 'Мобільний Safari', 
використовувати: { ...devices['iPhone 12'] }, 
}, 
], 
веб-сервер: { 
команда: 'npm run start', 
порт: 3000, 
    повторно використовувати існуючий сервер: !process.env.CI,
  },
});
``` 

## Тестування візуальної регресії 

### Конфігурація Storybook 

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
staticDirs: ['../публічний'], 
}; 
``` 

### Візуальне тестування Storybook за допомогою Chromatic 

```yaml 
name: Тести візуальної регресії 

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

- name: Налаштування Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Встановлення залежностей 
run: npm ci 

- name: Опублікувати в Chromatic 
uses: chromaui/action@v1 
with: 
projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }} 
exitZeroOnChanges: true 
``` 

## Тестування продуктивності 

### Конфігурація Lighthouse CI 

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
'categories:accessibility': ['error', { minScore: 0.9 }], 
'categories:best-practices': ['error', { minScore: 0.9 }], 
'categories:seo': ['error', { minScore: 0.9 }], 
}, 
}, 
}, 
}; 
``` 

### Дія Lighthouse CI на GitHub 

```yaml 
назва: Тестування продуктивності 

увімкнено: 
push: 
гілки: [main, develop ] 
pull_request: 
гілки: [main, develop ] 

завдання: 
lighthouse: 
запуски-на: ubuntu-latest 
кроки: 
- використання: actions/checkout@v3 

- ім'я: Налаштування Node.js 
використання: actions/setup-node@v3 
з: 
версія вузла: '18' 
кеш: 'npm' 

- ім'я: Встановлення залежностей 
запустити: npm ci 

- ім'я: Збірка 
запустити: npm run build 

- ім'я: Запустити Lighthouse CI 
запустити: | 
npm install -g @lhci/cli 
lhci autorun 
env: 
LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }} 
``` 

## Тестування навантаження 

### Конфігурація k6 

```js 
// load-test.js 
import http from 'k6/http'; 
import { sleep, check } from 'k6'; 
import { Rate } from 'k6/metrics'; 

const failRate = new Rate('failed_requests'); 

export const options = { 
stages: [ 
{ duration: '1m', target: 50 }, // Збільшити кількість користувачів до 50 
{ duration: '3m', target: 50 }, // Залишатися на рівні 50 користувачів протягом 3 хвилин 
{ duration: '1m', target: 100 }, // Збільшити кількість користувачів до 100 
{ duration: '3m', target: 100 }, // Залишатися на рівні 100 користувачів протягом 3 хвилин 
{ duration: '1m', target: 0 }, // Зменшити кількість користувачів до 0 
], 
thresholds: { 
http_req_duration: ['p(95)<500'], // 95% запитів мають бути виконані за менш ніж 500 мс 
'failed_requests': ['rate<0.1'], // Менше 10% запитів можуть завершитися невдачею 
}, 
}; 

експортувати функцію за замовчуванням () { 
const res = http.get('https://example.com/'); 

const checkRes = check(res, { 
'статус 200': (r) => r.status === 200, 
'час відповіді < 500 мс': (r) => r.timings.duration < 500, 
}); 

failRate.add(!checkRes); 

sleep(1); 
} 
``` 

## Робочий процес GitHub Actions для тестування 

```yaml 
name: Набір тестів 

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

- name: Налаштування Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Встановлення залежностей 
run: npm ci 

- name: Запуск модульних тестів 
run: npm test -- --coverage 

- name: Завантаження покриття до Codecov 
uses: codecov/codecov-action@v3 
with: 
token: ${{ secrets.CODECOV_TOKEN }} 
файли: ./coverage/lcov.info 
прапорці: unittests 
назва: codecov-umbrella 
fail_ci_if_error: true 

integration-tests: 
runs-on: ubuntu-latest 
needs: unit-tests 
steps: 
- uses: actions/checkout@v3 

- name: Налаштування Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Встановити залежності 
run: npm ci 

- name: Збірка 
run: npm run build 

- name: Запустити тести Cypress 
uses: cypress-io/github-action@v5 
with: 
build: npm run build 
start: npm start 
wait-on: 'http://localhost:3000' 

- назва: Завантажити скріншоти Cypress 
використовує: actions/upload-artifact@v3 
if: failure() 
with: 
name: cypress-screenshots 
path: cypress/screenshots 

e2e-tests: 
runs-on: ubuntu-latest 
needs: integration-tests 
steps: 
- використовує: actions/checkout@v3 

- назва: Налаштувати Node.js 
використовує: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- назва: Встановити залежності 
run: npm ci 

- назва: Встановити браузери Playwright 
run: npx dramaturg install --with-deps 

- назва: Збірка 
run: npm run build 

- назва: Запустити тести Playwright 
запустити: npx dramwright test 

- назва: Завантажити звіт про драматургів 
використовує: actions/upload-artifact@v3 
якщо: always() 
з: 
назва: dramwright-report 
шлях: dramwright-report/ 
``` 

## Найкращі практики автоматизації тестування 

1. **Тестова піраміда**: Дотримуйтесь підходу тестової піраміди з більшою кількістю модульних тестів, меншою кількістю інтеграційних тестів та ще меншою кількістю E2E-тестів 
2. **Безперервне тестування**: Автоматично запускайте тести на кожному коміті 
3. **Швидкий зворотний зв'язок**: Оптимізуйте тести для швидкого виконання та надання негайного зворотного зв'язку 
4. **Ізольовані тести**: Переконайтеся, що тести незалежні та не впливають один на одного 
5. **Реалістичні дані**: Використовуйте реалістичні тестові дані, що відображають виробничі сценарії 
6. **Тести, що підтримуються**: Пишіть чистий, зручний тестовий код з належними абстракціями 
7. **Візуальне тестування**: Включіть візуальне регресійне тестування для компонентів інтерфейсу 
8. **Тестування продуктивності**: Регулярно тестуйте продуктивність, щоб відстежувати регресії
9. **Тестування доступності**: Включіть тестування доступності в процес автоматизації
10. **Тестування безпеки**: Включіть тестування безпеки як частину автоматизованого набору тестів

## Контрольний список впровадження

- [ ] Налаштуйте Jest для модульного тестування
- [ ] Налаштуйте бібліотеку тестування React для тестування компонентів
- [ ] Налаштуйте Cypress для інтеграційного тестування
- [ ] Налаштуйте Playwright для наскрізного тестування
- [ ] Налаштуйте Storybook з Chromatic для візуального регресійного тестування
- [ ] Налаштуйте Lighthouse CI для тестування продуктивності
- [ ] Налаштуйте k6 для навантажувального тестування
- [ ] Інтегруйте тести в конвеєри CI/CD
- [ ] Налаштуйте звітність про покриття коду
- [ ] Налаштуйте моніторинг результатів тестування та тенденцій