# Pengujian Otomatis 

Dokumen ini menyediakan konfigurasi dan alur kerja standar untuk mengotomatiskan proses pengujian sesuai dengan standar pengembangan web. 

## Pengujian Unit 

### Konfigurasi Jest 

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
'\\.(css|less|scss|sass)$': 'identitas-obj-proxy', 
'\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', 
}, 
kumpulkanCoverageFrom: [ 
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
cabang: 80, 
fungsi: 80, 
baris: 80, 
pernyataan: 80, 
}, 
}, 
setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], 
testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'], 
watchPlugins: [ 
'jest-watch-typeahead/namafile', 'jest-watch-typeahead/testname', 
], 
}; 
``` 

### Pengaturan Pustaka Pengujian React 

```js 
// src/setupTests.ts 
import '@testing-library/jest-dom'; 
import { configure } from '@testing-library/react'; 

// Konfigurasikan Pustaka Pengujian React 
configure({ 
testIdAttribute: 'data-testid', 
}); 

// Jendela tiruan.matchMedia 
Object.defineProperty(window, 'matchMedia', { 
dapat ditulis: benar, 
nilai: jest.fn().mockImplementation(query => ({ 
cocok: salah, 
media: query, 
onchange: null, 
addListener: jest.fn(), 
removeListener: jest.fn(), 
addEventListener: jest.fn(), 
removeEventListener: jest.fn(), 
dispatchEvent: jest.fn(), 
})), 
}); 

// IntersectionObserver tiruan 
class MockIntersectionObserver { 
amati = jest.fn(); 
batalkan pengamatan = jest.fn(); 
putuskan sambungan = jest.fn(); } 

Object.defineProperty(window, 'IntersectionObserver', { 
writable: true, 
value: MockIntersectionObserver, 
}); 
``` 

## Pengujian Integrasi 

### Konfigurasi Cypress 

```js 
// cypress.config.js 
const { defineConfig } = require('cypress'); 

modul.ekspor = defineConfig({ 
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
komponen: { 
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

### Berkas Dukungan Cypress 

```js 
// cypress/support/e2e.ts 
import './commands'; 

// Mencegah pengecualian yang tidak tertangkap gagal dalam pengujian 
Cypress.on('uncaught:exception', (err) => { 
// mengembalikan false di sini mencegah Cypress gagal dalam pengujian 
return false; 
}); 

// Catat nama pengujian ke konsol 
beforeEach(() => { 
const testName = Cypress.currentTest.title; 
cy.log(`Running: ${testName}`); 
}); 
``` 

### Perintah Cypress 

```js 
// cypress/support/commands.ts 
import '@testing-library/cypress/add-commands'; 

// Perintah khusus untuk login 
Cypress.Commands.add('login', (email, password) => { 
cy.session([email, password], () => { 
cy.visit('/login'); 
cy.get('[data-testid=email-input]').type(email); 
cy.get('[data-testid=password-input]').type(password); 
cy.get('[data-testid=login-button]').click(); 
cy.url().should('not.include', '/login'); 
}); 
}); 

// Perintah khusus untuk permintaan API dengan autentikasi 
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

## Pengujian End-to-End 

### Konfigurasi Playwright 

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
screenshot: 'hanya-saat-gagal', 
}, 
proyek: [ 
{ 
nama: 'chromium', 
penggunaan: { ...perangkat['Chrome Desktop'] }, 
}, 
{ 
nama: 'firefox', 
penggunaan: { ...perangkat['Firefox Desktop'] }, 
}, 
{ 
nama: 'webkit', 
penggunaan: { ...perangkat['Safari Desktop'] }, 
}, 
{ 
nama: 'Chrome Seluler', 
penggunaan: { ...perangkat['Pixel 5'] }, 
}, 
{ 
nama: 'Safari Seluler', 
penggunaan: { ...perangkat['iPhone 12'] }, 
}, 
], 
webServer: { 
perintah: 'npm run start', 
port: 3000, 
    gunakan kembaliServer yang Ada: !process.env.CI,
  },
});
``` 

## Pengujian Regresi Visual 

### Konfigurasi Buku Cerita 

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
staticDirs: ['../publik'], 
}; ``` 

### Pengujian Visual Storybook dengan Chromatic 

```yaml 
name: Pengujian Regresi Visual 

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

- name: Menyiapkan Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Menginstal dependensi 
run: npm ci 

- name: Mempublikasikan ke Chromatic 
uses: chromaui/action@v1 
with: 
projectToken: ${{ rahasia.TOKEN_PROYEK_KROMATIK }} 
exitZeroOnChanges: benar 
``` 

## Pengujian Kinerja 

### Konfigurasi Lighthouse CI 

```js 
// lighthouserc.js 
module.exports = { 
ci: { 
kumpulkan: { 
startServerCommand: 'npm run start', 
url: ['http://localhost:3000/', 'http://localhost:3000/tentang', 'http://localhost:3000/kontak'], 
numberOfRuns: 3, 
pengaturan: { 
prasetel: 'desktop', 
}, 
}, 
unggah: { 
target: 'penyimpanan-publik-sementara', 
}, 
tegaskan: { 
prasetel: 'lighthouse:disarankan', 
pernyataan: { 
'kategori:kinerja': ['peringatan', { skorMin: 0,9 }], 
'kategori:aksesibilitas': ['kesalahan', { skorMin: 0,9 }], 
'kategori:praktik-terbaik': ['kesalahan', { skorMin: 0,9 }], 
'kategori:seo': ['kesalahan', { skorMin: 0,9 }], 
}, 
}, 
}, 
}; ``` 

### Tindakan GitHub Lighthouse CI 

```yaml 
name: Pengujian Performa 

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

- name: Menyiapkan Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Menginstal dependensi 
run: npm ci 

- name: Membangun 
run: npm run build 

- name: Menjalankan Lighthouse CI 
run: | npm install -g @lhci/cli 
lhci autorun 
env: 
LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }} 
``` 

## Pengujian Beban 

### Konfigurasi k6 

```js 
// load-test.js 
import http dari 'k6/http'; 
import { sleep, check } dari 'k6'; 
import { Rate } dari 'k6/metrics'; 

const failRate = new Rate('failed_requests'); export const options = { 
stages: [ 
{ duration: '1m', target: 50 }, // Tingkatkan hingga 50 pengguna 
{ duration: '3m', target: 50 }, // Tetap pada 50 pengguna selama 3 menit 
{ duration: '1m', target: 100 }, // Tingkatkan hingga 100 pengguna 
{ duration: '3m', target: 100 }, // Tetap pada 100 pengguna selama 3 menit 
{ duration: '1m', target: 0 }, // Turunkan hingga 0 pengguna 
], 
thresholds: { 
http_req_duration: ['p(95)<500'], // 95% permintaan harus selesai di bawah 500 md 
'failed_requests': ['rate<0.1'], // Kurang dari 10% permintaan dapat gagal 
}, 
};

fungsi ekspor default () { 
const res = http.get('https://example.com/'); 

const checkRes = check(res, { 
'status adalah 200': (r) => r.status === 200, 
'waktu respons < 500 md': (r) => r.waktu.durasi < 500, 
}); 

failRate.add(!checkRes); 

sleep(1); } 
``` 

## Alur Kerja GitHub Actions untuk Pengujian 

```yaml 
name: Test Suite 

on: 
push: 
branch: [ main, develop ] 
pull_request: 
branch: [ main, develop ] 

jobs: 
unit-tests: 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 

- name: Menyiapkan Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Menginstal dependensi 
run: npm ci 

- name: Menjalankan pengujian unit 
run: npm test -- --coverage 

- name: Mengunggah coverage ke Codecov 
uses: codecov/codecov-action@v3 
with: 
token: ${{ secrets.CODECOV_TOKEN }} 
file: ./coverage/lcov.info 
flags: unittests 
nama: codecov-umbrella 
fail_ci_if_error: true 

integration-tests: 
runs-on: ubuntu-latest 
needs: unit-tests 
langkah: 
- menggunakan: actions/checkout@v3 

- nama: Menyiapkan Node.js 
menggunakan: actions/setup-node@v3 
dengan: 
node-version: '18' 
cache: 'npm' 

- nama: Menginstal dependensi 
jalankan: npm ci 

- nama: Membangun 
jalankan: npm run build 

- nama: Menjalankan pengujian Cypress 
menggunakan: cypress-io/github-action@v5 
dengan: 
membangun: npm run build 
mulai: npm start 
tunggu: 'http://localhost:3000' 

- nama: Unggah tangkapan layar Cypress 
penggunaan: actions/upload-artifact@v3 
jika: failure() 
dengan: 
nama: cypress-screenshots 
jalur: cypress/screenshots 

e2e-tests: 
runs-on: ubuntu-latest 
kebutuhan: integration-tests 
langkah: 
- penggunaan: actions/checkout@v3 

- nama: Siapkan Node.js 
penggunaan: actions/setup-node@v3 
dengan: 
versi-simpul: '18' 
cache: 'npm' 

- nama: Instal dependensi 
jalankan: npm ci 

- nama: Instal peramban Playwright 
jalankan: npx playwright install --with-deps 

- nama: Bangun 
jalankan: npm run build 

- nama: Jalankan pengujian Playwright 
jalankan: npx playwright test 

- name: Upload Playwright report 
uses: actions/upload-artifact@v3 
if: always() 
with: 
name: playwright-report 
path: playwright-report/ 
``` 

## Praktik Terbaik untuk Menguji Otomatisasi 

1. **Piramida Pengujian**: Ikuti pendekatan piramida pengujian dengan lebih banyak pengujian unit, lebih sedikit pengujian integrasi, dan bahkan lebih sedikit pengujian E2E 
2. **Pengujian Berkelanjutan**: Jalankan pengujian secara otomatis pada setiap komit 
3. **Umpan Balik Cepat**: Optimalkan pengujian agar berjalan cepat dan berikan umpan balik segera 
4. **Pengujian Terisolasi**: Pastikan pengujian bersifat independen dan tidak saling memengaruhi 
5. **Data Realistis**: Gunakan data pengujian realistis yang mewakili skenario produksi 
6. **Pengujian yang Dapat Dipelihara**: Tulis kode pengujian yang bersih dan dapat dipelihara dengan abstraksi yang tepat 
7. **Pengujian Visual**: Sertakan pengujian regresi visual untuk komponen UI 
8. **Pengujian Performa**: Uji kinerja secara berkala untuk menemukan regresi 
9. **Pengujian Aksesibilitas**: Gabungkan pengujian aksesibilitas dalam proses otomatisasi 
10. **Pengujian Keamanan**: Sertakan pengujian keamanan sebagai bagian dari rangkaian pengujian otomatis 

## Daftar Periksa Implementasi 

- [ ] Siapkan Jest untuk pengujian unit 
- [ ] Konfigurasikan Pustaka Pengujian React untuk pengujian komponen 
- [ ] Siapkan Cypress untuk pengujian integrasi 
- [ ] Konfigurasikan Playwright untuk pengujian menyeluruh 
- [ ] Siapkan Storybook dengan Chromatic untuk pengujian regresi visual 
- [ ] Konfigurasikan Lighthouse CI untuk pengujian kinerja 
- [ ] Siapkan k6 untuk pengujian beban 
- [ ] Integrasikan pengujian ke dalam jalur CI/CD 
- [ ] Konfigurasikan pelaporan cakupan kode 
- [ ] Siapkan pemantauan untuk hasil dan tren pengujian