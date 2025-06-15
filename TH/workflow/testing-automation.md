# การทดสอบระบบอัตโนมัติ

เอกสารนี้ประกอบด้วยการกำหนดค่าและเวิร์กโฟลว์มาตรฐานสำหรับการทดสอบระบบอัตโนมัติตามมาตรฐานการพัฒนาเว็บ

## การทดสอบยูนิต 

### การกำหนดค่า Jest 

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
branches: 80, 
functions: 80, 
lines: 80, 
statement: 80, 
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

### การตั้งค่าไลบรารีการทดสอบ React 

```js 
// src/setupTests.ts 
import '@testing-library/jest-dom'; 

import { configure } from '@testing-library/react'; 

// กำหนดค่าไลบรารีการทดสอบ React 
configure({ 
testIdAttribute: 'data-testid', 
}); 
// จำลองหน้าต่าง matchMedia 
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

// จำลอง IntersectionObserver 
class MockIntersectionObserver { 
observe = jest.fn(); 
unobserve = jest.fn(); 
disconnect = jest.fn(); } 

Object.defineProperty(window, 'IntersectionObserver', { 
writable: true, 
value: MockIntersectionObserver, 
}); 
``` 

## การทดสอบการรวมระบบ 

### การกำหนดค่า Cypress 

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

### ไฟล์สนับสนุน Cypress 

```js 
// cypress/support/e2e.ts 
import './commands'; 

// ป้องกันข้อยกเว้นที่ไม่ถูกจับจากการทดสอบที่ล้มเหลว 
Cypress.on('uncaught:exception', (err) => { 
// การคืนค่า false ที่นี่จะป้องกันไม่ให้ Cypress ทดสอบที่ล้มเหลว 
return false; 
}); 

// บันทึกชื่อการทดสอบไปยังคอนโซล 
beforeEach(() => { 
const testName = Cypress.currentTest.title; 
cy.log(`Running: ${testName}`); 
}); 
``` 

### คำสั่ง Cypress 

```js 
// cypress/support/commands.ts 
import '@testing-library/cypress/add-commands'; 

// คำสั่งกำหนดเองสำหรับการเข้าสู่ระบบ 
Cypress.Commands.add('login', (email, password) => { 
cy.session([email, password], () => { 
cy.visit('/login'); 
cy.get('[data-testid=email-input]').type(email); 
cy.get('[data-testid=password-input]').type(password); 
cy.get('[data-testid=login-button]').click(); 
cy.url().should('not.include', '/login'); 
}); 
}); 

// คำสั่งกำหนดเองสำหรับคำขอ API พร้อมการรับรองความถูกต้อง 
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

## การทดสอบแบบครบวงจร 

### การกำหนดค่า Playwright 

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
screenshot: 'only-on-failure', 
}, 
โปรเจ็กต์: [ 
{ 
ชื่อ: 'chromium', 
ใช้: { ...devices['Desktop Chrome'] }, 
}, 
{ 
ชื่อ: 'firefox', 
ใช้: { ...devices['Desktop Firefox'] }, 
}, 
{ 
ชื่อ: 'webkit', 
ใช้: { ...devices['Desktop Safari'] }, 
}, 
{ 
ชื่อ: 'Mobile Chrome', 
ใช้: { ...devices['Pixel 5'] }, 
}, 
{ 
ชื่อ: 'Mobile Safari', 
ใช้: { ...devices['iPhone 12'] }, 
}, 
], 
เว็บเซิร์ฟเวอร์: { 
คำสั่ง: 'npm run start', 
พอร์ต: 3000,
    ใช้เซิร์ฟเวอร์ที่มีอยู่ซ้ำ: !process.env.CI,
  -
-
``` 

## การทดสอบการถดถอยทางภาพ 

### การกำหนดค่า Storybook 

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
staticDirs: ['../สาธารณะ'],
};
``` 

### การทดสอบภาพ Storybook ด้วย Chromatic 

```yaml 
name: การทดสอบการถดถอยของภาพ 

on: 
push: 
branches: [ main, develop ] 

pulse_request: 
branches: [ main, develop ] 

jobs: 
visual-regression: 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 
with: 
fetch-depth: 0 

- name: ตั้งค่า Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: ติดตั้งการอ้างอิง 
run: npm ci 

- name: เผยแพร่ไปยัง Chromatic 
uses: chromaui/action@v1 
with: 
projectToken: ${{ ความลับ.CHROMATIC_PROJECT_TOKEN }} 
exitZeroOnChanges: true 
``` 

## การทดสอบประสิทธิภาพ 

### การกำหนดค่า Lighthouse CI 

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
การยืนยัน: { 
'categories:performance': ['warn', { minScore: 0.9 }], 
'categories:accessibility': ['error', { minScore: 0.9 }], 
'categories:best-practices': ['error', { minScore: 0.9 }], 
'categories:seo': ['error', { minScore: 0.9 }], 
}, 
}, 
}; ``` 

### การดำเนินการ GitHub ของ Lighthouse CI 

```yaml 
ชื่อ: การทดสอบประสิทธิภาพ 

เมื่อ: 
ดัน: 
สาขา: [ หลัก, พัฒนา ] 
คำขอดึง: 
สาขา: [ หลัก, พัฒนา ] 

งาน: 
lighthouse: 

ทำงานเมื่อ: ubuntu-latest 

ขั้นตอน: 
- ใช้: actions/checkout@v3 

- ชื่อ: ตั้งค่า Node.js 

ใช้: actions/setup-node@v3 
ด้วย: 
node-version: '18' 
แคช: 'npm' 

- ชื่อ: ติดตั้งการอ้างอิง 
เรียกใช้: npm ci 

- ชื่อ: สร้าง 
เรียกใช้: npm เรียกใช้สร้าง 

- ชื่อ: เรียกใช้ Lighthouse CI 
เรียกใช้: | 
npm install -g @lhci/cli 
lhci autorun 
env: 
LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }} 
``` 

## การทดสอบโหลด 

### การกำหนดค่า k6 

```js 
// load-test.js 
นำเข้า http จาก 'k6/http'; 
นำเข้า { sleep, check } จาก 'k6'; 
นำเข้า { Rate } จาก 'k6/metrics'; 

const failRate = new Rate('failed_requests'); 

export const options = { 
stages: [ 
{ duration: '1m', target: 50 }, // เพิ่มผู้ใช้ได้สูงสุด 50 คน 
{ duration: '3m', target: 50 }, // อยู่ที่ 50 ผู้ใช้เป็นเวลา 3 นาที 
{ duration: '1m', target: 100 }, // เพิ่มผู้ใช้ได้สูงสุด 100 คน 
{ duration: '3m', target: 100 }, // อยู่ที่ 100 ผู้ใช้เป็นเวลา 3 นาที 
{ duration: '1m', target: 0 }, // ลดผู้ใช้ลงเหลือ 0 ผู้ใช้ 
], 
thresholds: { 
http_req_duration: ['p(95)<500'], // 95% ของคำขอต้องเสร็จสิ้นภายใน 500 มิลลิวินาที 
'failed_requests': ['rate<0.1'], // คำขอที่น้อยกว่า 10% สามารถทำได้ ล้มเหลว 
}, 
}; 

ส่งออกฟังก์ชันเริ่มต้น () { 
const res = http.get('https://example.com/'); 

const checkRes = check(res, { 
'สถานะคือ 200': (r) => r.status === 200, 
'เวลาตอบสนอง < 500ms': (r) => r.timings.duration < 500, 
}); 

failRate.add(!checkRes); 

sleep(1); } 
``` 

## เวิร์กโฟลว์ GitHub Actions สำหรับการทดสอบ 

```yaml 
ชื่อ: ชุดการทดสอบ 

เมื่อ: 
push: 
สาขา: [ main, develop ] 

คำขอ pull_request: 
สาขา: [ main, develop ] 

งาน: 
unit-tests: 

runs-on: ubuntu-latest 
ขั้นตอน: 
- ใช้: actions/checkout@v3 

- ชื่อ: ตั้งค่า Node.js 
ใช้: actions/setup-node@v3 
ด้วย: 
node-version: '18' 
แคช: 'npm' 

- ชื่อ: ติดตั้งการอ้างอิง 
เรียกใช้: npm ci 

- ชื่อ: เรียกใช้การทดสอบยูนิต 
เรียกใช้: npm test -- --coverage 

- ชื่อ: อัปโหลด coverage ไปยัง Codecov 
ใช้: codecov/codecov-action@v3 
ด้วย: 
โทเค็น: ${{ secrets.CODECOV_TOKEN }} 
ไฟล์: ./coverage/lcov.info 
แฟล็ก: unittests 
ชื่อ: codecov-umbrella 
fail_ci_if_error: true 

การทดสอบการรวม: 
รันบน: ubuntu-latest 
ความต้องการ: unit-tests 
ขั้นตอน: 
- ใช้: actions/checkout@v3 

- ชื่อ: ตั้งค่า Node.js 
ใช้: actions/setup-node@v3 
ด้วย: 
node-version: '18' 
แคช: 'npm' 

- ชื่อ: ติดตั้งการอ้างอิง 
รัน: npm ci 

- ชื่อ: สร้าง 
รัน: npm เรียกใช้ สร้าง 

- ชื่อ: เรียกใช้การทดสอบ Cypress 
ใช้: cypress-io/github-action@v5 
ด้วย: 
สร้าง: npm เรียกใช้ สร้าง 
เริ่มต้น: npm เริ่มต้น 
รอสักครู่: 'http://localhost:3000' 

- ชื่อ: อัปโหลดภาพหน้าจอ Cypress 
ใช้: actions/upload-artifact@v3 
ถ้า: ล้มเหลว() 
ด้วย: 
ชื่อ: cypress-screenshots 
เส้นทาง: cypress/screenshots 

e2e-tests: 
รันบน: ubuntu-latest 
ความต้องการ: การทดสอบการรวมระบบ 
ขั้นตอน: 
- ใช้: actions/checkout@v3 

- ชื่อ: ตั้งค่า Node.js 
ใช้: actions/setup-node@v3 
ด้วย: 
node-version: '18' 
แคช: 'npm' 

- ชื่อ: ติดตั้งส่วนที่ต้องพึ่งพา 
เรียกใช้: npm ci 

- ชื่อ: ติดตั้งเบราว์เซอร์ Playwright 
เรียกใช้: npx playwright install --with-deps 

- ชื่อ: สร้าง 
รัน: npm รันสร้าง 

- ชื่อ: รันการทดสอบ Playwright 
รัน: npx playwright test 

- ชื่อ: อัปโหลดรายงาน Playwright 
ใช้: actions/upload-artifact@v3 
ถ้า: always() 
ด้วย: 
ชื่อ: playwright-report 
เส้นทาง: playwright-report/ 
``` 

## แนวทางปฏิบัติที่ดีที่สุดสำหรับการทดสอบอัตโนมัติ 

1. **พีระมิดการทดสอบ**: ปฏิบัติตามแนวทางพีระมิดการทดสอบด้วยการทดสอบยูนิตที่มากขึ้น การทดสอบการรวมที่น้อยลง และการทดสอบ E2E ที่น้อยลง 
2. **การทดสอบอย่างต่อเนื่อง**: รันการทดสอบโดยอัตโนมัติในทุกการคอมมิต 
3. **ข้อเสนอแนะที่รวดเร็ว**: ปรับแต่งการทดสอบเพื่อให้ทำงานได้อย่างรวดเร็วและให้ข้อเสนอแนะทันที 
4. **การทดสอบแบบแยก**: ให้แน่ใจว่าการทดสอบเป็นอิสระและไม่ส่งผลกระทบต่อกัน 
5. **ข้อมูลที่สมจริง**: ใช้ข้อมูลการทดสอบที่สมจริงซึ่งแสดงถึงสถานการณ์การผลิต 
6. **การทดสอบที่บำรุงรักษาได้**: เขียนโค้ดการทดสอบที่สะอาดและบำรุงรักษาได้โดยใช้ การแยกส่วน 
7. **การทดสอบภาพ**: รวมการทดสอบการถดถอยภาพสำหรับส่วนประกอบ UI 
8. **การทดสอบประสิทธิภาพ**: ทดสอบประสิทธิภาพเป็นประจำเพื่อตรวจจับการถดถอย 
9. **การทดสอบการเข้าถึง**: รวมการทดสอบการเข้าถึงในกระบวนการอัตโนมัติ 
10. **การทดสอบความปลอดภัย**: รวมการทดสอบความปลอดภัยเป็นส่วนหนึ่งของชุดการทดสอบอัตโนมัติ 

## รายการตรวจสอบการใช้งาน 

- [ ] ตั้งค่า Jest สำหรับการทดสอบยูนิต 
- [ ] กำหนดค่าไลบรารีการทดสอบ React สำหรับการทดสอบส่วนประกอบ 
- [ ] ตั้งค่า Cypress สำหรับการทดสอบการรวมระบบ 
- [ ] กำหนดค่า Playwright สำหรับการทดสอบแบบครบวงจร 
- [ ] ตั้งค่า Storybook พร้อม Chromatic สำหรับการทดสอบการถดถอยภาพ 
- [ ] กำหนดค่า Lighthouse CI สำหรับการทดสอบประสิทธิภาพ 
- [ ] ตั้งค่า k6 สำหรับการทดสอบโหลด 
- [ ] รวมการทดสอบเข้ากับไปป์ไลน์ CI/CD 
- [ ] กำหนดค่าการรายงานการครอบคลุมโค้ด 
- [ ] ตั้งค่าการตรวจสอบผลการทดสอบและแนวโน้ม