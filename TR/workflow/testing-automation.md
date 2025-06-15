# Test Otomasyonu

Bu belge, web geliştirme standartlarına göre test süreçlerini otomatikleştirmek için standartlaştırılmış yapılandırmalar ve iş akışları sağlar.

## Birim Testi 

### Jest Yapılandırması 

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
'^@/(.*)$': '<kökDizini>/src/$1', 
'\\.(css|less|scss|sass)$': 'kimlik-obj-proxy', 
'\\.(jpg|jpeg|png|gif|webp|svg)$': '<kökDizini>/__mocks__/fileMock.js', 
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

### React Test Kütüphanesi Kurulumu 

```js 
// src/setupTests.ts 
import '@testing-library/jest-dom'; 
import { configure } from '@testing-library/react'; 

// React Test Kütüphanesini Yapılandır 
configure({ 
testIdAttribute: 'data-testid', 
}); 

// Sahte pencere.matchMedia 
Object.defineProperty(window, 'matchMedia', { 
yazılabilir: true, 
değer: jest.fn().mockImplementation(query => ({ 
eşleşmeler: false, 
medya: sorgu, 
onchange: null, 
addListener: jest.fn(), 
removeListener: jest.fn(), 
addEventListener: jest.fn(), 
removeEventListener: jest.fn(), 
dispatchEvent: jest.fn(), 
})), 
}); 

// Sahte Kesişim Gözlemcisi 
sınıf Sahte Kesişim Gözlemcisi { 
gözlemle = jest.fn(); 
gözlemleme = jest.fn(); 
bağlantıyı kes = jest.fn(); 
} 

Object.defineProperty(window, 'IntersectionObserver', { 
writable: true, 
value: MockIntersectionObserver, 
}); 
``` 

## Entegrasyon Testi 

### Cypress Yapılandırması 

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

### Cypress Destek Dosyası 

```js 
// cypress/support/e2e.ts 
import './commands'; 

// Yakalanmamış istisnaların testlerde başarısız olmasını önle 
Cypress.on('uncaught:exception', (err) => { 
// burada false döndürmek Cypress'in testte başarısız olmasını önler 
return false; 
}); 

// Test adlarını konsola kaydet 
beforeEach(() => { 
const testName = Cypress.currentTest.title; 
cy.log(`Çalışıyor: ${testName}`); 
}); 
``` 

### Cypress Komutları 

```js 
// cypress/support/commands.ts 
import '@testing-library/cypress/add-commands'; 

// Giriş için özel komut 
Cypress.Commands.add('login', (email, password) => { 
cy.session([email, password], () => { 
cy.visit('/login'); 
cy.get('[data-testid=email-input]').type(email); 
cy.get('[data-testid=password-input]').type(password); 
cy.get('[data-testid=login-button]').click(); 
cy.url().should('not.include', '/login'); 
}); 
}); 

// Kimlik doğrulamalı API istekleri için özel komut 
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

## Uçtan Uca Test 

### Playwright Yapılandırması 

```js 
// playwright.config.js 
const { defineConfig, devices } = require('@playwright/test'); 

module.exports = defineConfig({ 
testDir: './e2e', 
zaman aşımı: 30 * 1000, 
expect: { 
zaman aşımı: 5000, 
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
trace: 'ilk-denemede', 
video: 'ilk-denemede', 
ekran görüntüsü: 'sadece-hata-sonrası', 
}, 
projeler: [ 
{ 
name: 'chromium', 
use: { ...devices['Masaüstü Chrome'] }, 
}, 
{ 
name: 'firefox', 
use: { ...devices['Masaüstü Firefox'] }, 
}, 
{ 
name: 'webkit', 
use: { ...devices['Masaüstü Safari'] }, 
}, 
{ 
name: 'Mobil Chrome', 
use: { ...devices['Pixel 5'] }, 
}, 
{ 
name: 'Mobil Safari', 
use: { ...devices['iPhone 12'] }, 
}, 
], 
webSunucusu: { 
komut: 'npm run start', 
port: 3000, 
reuseExistingServer: !process.env.CI, 
}, 
}); 
``` 

## Görsel Gerileme Testi 

### Hikaye Kitabı Yapılandırması 

```js 
// .storybook/main.js 
module.exports = { 
hikayeler: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'], 
eklentiler: [ 
'@storybook/addon-links', 
'@storybook/addon-essentials', 
'@storybook/addon-interactions', 
'@storybook/addon-a11y', 
'storybook-addon-performance', 
], 
çerçeve: { 
ad: '@storybook/react-webpack5', 
seçenekler: {}, 
}, 
belgeler: { 
autodocs: doğru, 
}, 
staticDirs: ['../public'], 
}; 
``` 

### Chromatic ile Storybook Görsel Testi

```yaml 
name: Görsel Gerileme Testleri 

on: 
push: 
branches: [ main, development ] 
pull_request: 
branches: [ main, development ] 

jobs: 
visual-regression: 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 
with: 
fetch-depth: 0 

- name: Node.js Kurulumu 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Bağımlılıkları Kur 
run: npm ci 

- name: Chromatic'e Yayımla 
uses: chromaui/action@v1 
with: 
projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }} 
exitZeroOnChanges: true 
``` 

## Performans Testi 

### Lighthouse CI Yapılandırması 

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

### Lighthouse CI GitHub Eylemi 

```yaml 
name: Performans Testi 

on: 
push: 
branches: [ main, development ] 
pull_request: 
branches: [ main, development ] 

jobs: 
lighthouse: 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 

- name: Node.js Kurulumu 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Bağımlılıkları Kur 
run: npm ci 

- name: Derleme 
run: npm run build 

- name: Lighthouse CI Çalıştır 
run: | 
npm install -g @lhci/cli 
lhci autorun 
env: 
LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }} 
``` 

## Yük Testi 

### k6 Yapılandırması 

```js 
// load-test.js 
import http from 'k6/http'; 
import { sleep, check } from 'k6'; 
import { Rate } from 'k6/metrics'; 

const failRate = new Rate('failed_requests'); 

export const options = { 
stage: [ 
{ duration: '1m', target: 50 }, // 50 kullanıcıya kadar artırın 
{ duration: '3m', target: 50 }, // 3 dakika boyunca 50 kullanıcıda kalın 
{ duration: '1m', target: 100 }, // 100 kullanıcıya kadar artırın 
{ duration: '3m', target: 100 }, // 3 dakika boyunca 100 kullanıcıda kalın 
{ duration: '1m', target: 0 }, // 0 kullanıcıya kadar azaltın 
], 
eşikler: { 
http_req_duration: ['p(95)<500'], // İsteklerin %95'i 500 ms'nin altında tamamlanmalıdır 
'failed_requests': ['rate<0.1'], // Daha az İsteklerin %10'u başarısız olabilir 
}, 
}; 

varsayılan işlevi dışa aktar () { 
const res = http.get('https://example.com/'); 

const checkRes = check(res, { 
'durum 200': (r) => r.status === 200, 
'yanıt süresi < 500ms': (r) => r.timings.duration < 500, 
}); 

failRate.add(!checkRes); 

sleep(1); 
} 
``` 

## Test için GitHub Actions İş Akışı 

```yaml 
name: Test Suite 

on: 
push: 
branches: [ main, development ] 
pull_request: 
branches: [ main, development ] 

jobs: 
unit-tests: 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 

- name: Node.js Kurulumu 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Bağımlılıkları Kur 
run: npm ci 

- name: Birim testlerini Çalıştır 
run: npm test -- --coverage 

- name: Kapsamı Codecov'a Yükle 
uses: codecov/codecov-action@v3 
ile: 
belirteç: ${{ secrets.CODECOV_TOKEN }} 
dosyalar: ./coverage/lcov.info 
işaretler: unittests 
ad: codecov-umbrella 
fail_ci_if_error: true 

entegrasyon testleri: 
üzerinde çalışır: ubuntu-latest 
ihtiyaçlar: unit-tests 
adımlar: 
- kullanır: actions/checkout@v3 

- ad: Node.js'yi kur 
kullanır: actions/setup-node@v3 
ile: 
node-version: '18' 
önbellek: 'npm' 

- ad: Bağımlılıkları kur 
çalıştır: npm ci 

- ad: Derle 
çalıştır: npm run build 

- ad: Cypress testlerini çalıştır 
kullanır: cypress-io/github-action@v5 
ile: 
derleme: npm build'i çalıştır 
başlat: npm başlat 
bekle: 'http://localhost:3000' 

- name: Cypress ekran görüntülerini yükle 
uses: actions/upload-artifact@v3 
if: Failure() 
with: 
name: cypress-screenshots 
path: cypress/screenshots 

e2e-tests: 
runs-on: ubuntu-latest 
needs: integration-tests 
steps: 
- uses: actions/checkout@v3 

- name: Node.js'yi kur 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Bağımlılıkları yükle 
run: npm ci 

- name: Playwright tarayıcılarını yükle 
run: npx playwright install --with-deps 

- name: Derleme 
çalıştır: npm run build 

- name: Playwright testlerini çalıştır 
çalıştır: npx playwright test 

- name: Playwright raporunu yükle 
uses: actions/upload-artifact@v3 
if: always() 
with: 
name: playwright-report 
path: playwright-report/ 
``` 

## Test Otomasyonu İçin En İyi Uygulamalar 

1. **Test Piramidi**: Daha fazla birim testi, daha az entegrasyon testi ve daha da az E2E testi ile test piramidi yaklaşımını izleyin 
2. **Sürekli Test**: Her commit'te testleri otomatik olarak çalıştırın 
3. **Hızlı Geri Bildirim**: Testleri hızlı çalışacak ve anında geri bildirim sağlayacak şekilde optimize edin 
4. **İzole Testler**: Testlerin bağımsız olduğundan ve birbirlerini etkilemediğinden emin olun 
5. **Gerçekçi Veriler**: Üretim senaryolarını temsil eden gerçekçi test verileri kullanın 
6. **Sürdürülebilir Testler**: Uygun soyutlamalarla temiz, sürdürülebilir test kodu yazın 
7. **Görsel Test**: UI bileşenleri için görsel regresyon testini ekleyin 
8. **Performans Testi**: Gerilemeleri yakalamak için performansı düzenli olarak test edin 
9. **Erişilebilirlik Testi**: Erişilebilirlik testini otomasyon sürecine dahil edin 
10. **Güvenlik Testi**: Güvenlik testini otomatik test takımının bir parçası olarak ekleyin 

## Uygulama Kontrol Listesi 

- [ ] Birim testi için Jest'i ayarlayın 
- [ ] Bileşen testi için React Testing Library'yi yapılandırın 
- [ ] Entegrasyon testi için Cypress'i ayarlayın 
- [ ] Uçtan uca test için Playwright'ı yapılandırın 
- [ ] Görsel regresyon testi için Storybook'u Chromatic ile ayarlayın 
- [ ] Performans testi için Lighthouse CI'ı yapılandırın 
- [ ] Yük testi için k6'yı ayarlayın 
- [ ] Testleri CI/CD'ye entegre edin boru hatları 
- [ ] Kod kapsamı raporlamasını yapılandırın 
- [ ] Test sonuçları ve trendler için izlemeyi ayarlayın