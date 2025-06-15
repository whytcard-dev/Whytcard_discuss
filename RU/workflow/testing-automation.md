# Автоматизация тестирования 

В этом документе представлены стандартизированные конфигурации и рабочие процессы для автоматизации процессов тестирования в соответствии со стандартами веб-разработки. 

## Модульное тестирование

### Конфигурация Jest

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
branchs: 80, 
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

### Настройка библиотеки тестирования React 

```js 
// src/setupTests.ts 
import '@testing-library/jest-dom'; 
import { configure } from '@testing-library/react'; 

// Настройка библиотеки тестирования React 
configure({ 
testIdAttribute: 'data-testid', 
}); 

// Имитация window.matchMedia 
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

// Имитация IntersectionObserver 
class MockIntersectionObserver { 
observa = jest.fn(); 
unobserve = jest.fn(); 
disconnect = jest.fn(); 
} 

Object.defineProperty(window, 'IntersectionObserver', { 
writable: true, 
value: MockIntersectionObserver, 
}); 
``` 

## Тестирование интеграции 

### Конфигурация Cypress 

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
screenOnRunFailure: true, 
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

### Файл поддержки Cypress 

```js 
// cypress/support/e2e.ts 
import './commands'; 

// Предотвращаем неперехваченные исключения из-за провала тестов 
Cypress.on('uncaught:exception', (err) => { 
// возврат false здесь предотвращает провал теста Cypress 
return false; 
}); 

// Запись названий тестов в консоль 
beforeEach(() => { 
const testName = Cypress.currentTest.title; 
cy.log(`Running: ${testName}`); 
}); 
``` 

### Команды Cypress 

```js 
// cypress/support/commands.ts 
import '@testing-library/cypress/add-commands'; 

// Пользовательская команда для входа 
Cypress.Commands.add('login', (email, password) => { 
cy.session([email, password], () => { 
cy.visit('/login'); 
cy.get('[data-testid=email-input]').type(email); 
cy.get('[data-testid=password-input]').type(password); 
cy.get('[data-testid=login-button]').click(); 
cy.url().should('not.include', '/login'); 
}); 
}); 

// Пользовательская команда для запросов API с аутентификацией 
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

## Сквозное тестирование 

#### Конфигурация Playwright 

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
снимок экрана: 'only-on-failure', 
}, 
проекты: [ 
{ 
имя: 'chromium', 
использование: { ...devices['Desktop Chrome'] }, 
}, 
{ 
имя: 'firefox', 
использование: { ...devices['Desktop Firefox'] }, 
}, 
{ 
имя: 'webkit', 
использование: { ...devices['Desktop Safari'] }, 
}, 
{ 
имя: 'Mobile Chrome', 
использование: { ...devices['Pixel 5'] }, 
}, 
{ 
имя: 'Mobile Safari', 
использование: { ...devices['iPhone 12'] }, 
}, 
], 
веб-сервер: { 
команда: 'npm run start', 
port: 3000, 
reuseExistingServer: !process.env.CI, 
}, 
}); 
``` 

## Визуальное регрессионное тестирование 

### Конфигурация Storybook 

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

### Визуальное тестирование Storybook с Chromatic 

```yaml 
name: Визуальные регрессионные тесты 

on: 
push: 
ветви: [ main, develop ] 
pull_request: 
ветви: [ main, develop ] 

jobs: 
visual-regression: 
running-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 
with: 
fetch-depth: 0 

- name: Настройка Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Установка зависимостей 
run: npm ci 

- name: Опубликовать в Chromatic 
uses: chromaui/action@v1 
with: 
projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }} 
exitZeroOnChanges: true 
``` 

## Тестирование производительности 

### Конфигурация Lighthouse CI 

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

### Действие Lighthouse CI GitHub 

```yaml 
name: Тестирование производительности 

on: 
push: 
ветви: [ main, develop ] 
pull_request: 
ветви: [ main, develop ] 

jobs: 
lighthouse: 
running-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 

- name: Настройка Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Установка зависимостей 
run: npm ci 

- name: Сборка 
run: npm run build 

- name: Запуск Lighthouse CI 
run: | 
npm install -g @lhci/cli 
lhci autorun 
env: 
LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }} 
``` 

## Нагрузочное тестирование 

### Конфигурация k6 

```js 
// load-test.js 
import http from 'k6/http'; 
import { sleep, check } from 'k6'; 
import { Rate } from 'k6/metrics'; 

const failRate = new Rate('failed_requests'); 

export const options = { 
stages: [ 
{ duration: '1m', target: 50 }, // Ramp to 50 users 
{ duration: '3m', target: 50 }, // Stay with 50 users for 3 minutes 
{ duration: '1m', target: 100 }, // Ramp up to 100 users 
{ duration: '3m', target: 100 }, // Stay with 100 users for 3 minutes 
{ duration: '1m', target: 0 }, // Ramp down to 0 users 
], 
thresholds: { 
http_req_duration: ['p(95)<500'], // 95% запросов должны быть выполнены менее чем за 500 мс 
'failed_requests': ['rate<0.1'], // Менее 10% запросов могут быть выполнены неудачно 
}, 
}; 

функция экспорта по умолчанию () { 
const res = http.get('https://example.com/'); 

const checkRes = check(res, { 
'статус равен 200': (r) => r.status === 200, 
'время ответа < 500 мс': (r) => r.timings.duration < 500, 
}); 

failRate.add(!checkRes); 

sleep(1); 
} 
``` 

## GitHub Actions Workflow for Testing 

```yaml 
name: Test Suite 

on: 
push: 
branchs: [ main, develop ] 
pull_request: 
branchs: [ main, develop ] 

jobs: 
unit-tests: 
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

- name: Run unit tests 
run: npm test -- --coverage 

- name: Upload coverage to Codecov 
uses: codecov/codecov-action@v3 
с: 
токен: ${{ secrets.CODECOV_TOKEN }} 
файлы: ./coverage/lcov.info 
флаги: unittests 
имя: codecov-umbrella 
fail_ci_if_error: true 

интеграционные-тесты: 
запускается-на: ubuntu-latest 
нужно: unit-tests 
шаги: 
- использует: actions/checkout@v3 

- имя: Настройка Node.js 
использует: actions/setup-node@v3 
с: 
версия-узла: '18' 
кэш: 'npm' 

- имя: Установка зависимостей 
запуск: npm ci 

- имя: Сборка 
запуск: npm run build 

- имя: Запуск тестов Cypress 
использует: cypress-io/github-action@v5 
с: 
сборка: npm run build 
start: npm start 
wait-on: 'http://localhost:3000' 

- name: Загрузить скриншоты Cypress 
uses: actions/upload-artifact@v3 
if: failure() 
with: 
name: cypress-screenshots 
path: cypress/screenshots 

e2e-tests: 
run-on: ubuntu-latest 
needs: integration-tests 
steps: 
- uses: actions/checkout@v3 

- name: Настройка Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Установить зависимости 
run: npm ci 

- name: Установить браузеры Playwright 
run: npx playwright install --with-deps 

- name: Сборка 
запуск: npm запуск сборки 

- имя: Запуск тестов Playwright 
запуск: npx playwright test 

- имя: Загрузить отчет Playwright 
использование: actions/upload-artifact@v3 
если: always() 
с: 
имя: playwright-report 
путь: playwright-report/ 
``` 

## Лучшие практики для автоматизации тестирования 

1. **Тестовая пирамида**: следуйте подходу тестовой пирамиды с большим количеством модульных тестов, меньшим количеством интеграционных тестов и еще меньшим количеством тестов E2E 
2. **Непрерывное тестирование**: автоматически запускайте тесты при каждом коммите 
3. **Быстрая обратная связь**: Оптимизируйте тесты для быстрого запуска и предоставления немедленной обратной связи 
4. **Изолированные тесты**: убедитесь, что тесты независимы и не влияют друг на друга 
5. **Реалистичные данные**: используйте реалистичные тестовые данные, которые представляют производственные сценарии 
6. **Поддерживаемые тесты**: напишите чистый, поддерживаемый тестовый код с правильными абстракциями 
7. **Визуальное тестирование**: включите визуальное регрессионное тестирование для компонентов пользовательского интерфейса 
8. **Тестирование производительности**: регулярно проверяйте производительность для выявления регрессий 
9. **Тестирование доступности**: включите тестирование доступности в процесс автоматизации 
10. **Тестирование безопасности**: включите тестирование безопасности в автоматизированный набор тестов 

## Контрольный список реализации 

- [ ] Настройка Jest для модульного тестирования 
- [ ] Настройка библиотеки тестирования React для компонентного тестирования 
- [ ] Настройка Cypress для интеграционного тестирования 
- [ ] Настройка Playwright для сквозного тестирования 
- [ ] Настройка Storybook с Chromatic для визуального регрессионного тестирования 
- [ ] Настройка Lighthouse CI для тестирования производительности 
- [ ] Настройка k6 для нагрузочного тестирования 
- [ ] Интеграция Тесты в конвейерах CI/CD
- [ ] Настройка отчетов о покрытии кода
- [ ] Настройка мониторинга результатов и тенденций тестирования