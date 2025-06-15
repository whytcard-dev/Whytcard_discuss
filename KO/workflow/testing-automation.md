# 테스트 자동화

이 문서는 웹 개발 표준에 따라 테스트 프로세스를 자동화하기 위한 표준화된 구성 및 워크플로를 제공합니다.

## 단위 테스트

### Jest 구성

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
branch: 80, 
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

### React 테스트 라이브러리 설정

```js 
// src/setupTests.ts 
import '@testing-library/jest-dom'; 
import { configure } from '@testing-library/react'; 

// React 테스트 라이브러리 구성
configure({ 
testIdAttribute: 'data-testid', 
}); 

// 모의 window.matchMedia 
Object.defineProperty(window, 'matchMedia', { 
쓰기 가능: true, 
값: jest.fn().mockImplementation(query => ({ 
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

// 모의 IntersectionObserver 
class MockIntersectionObserver { 
observe = jest.fn(); 
unobserve = jest.fn(); 
disconnect = jest.fn();
} 

Object.defineProperty(window, 'IntersectionObserver', { 
쓰기 가능: true, 
값: MockIntersectionObserver, 
}); 
``` 

## 통합 테스트

### Cypress 구성

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

### Cypress 지원 파일 

```js 
// cypress/support/e2e.ts 
import './commands'; 

// 포착되지 않은 예외로 인한 테스트 실패 방지 
Cypress.on('uncaught:exception', (err) => { 
// 여기서 false를 반환하면 Cypress가 테스트를 실패하지 않습니다.
return false; 
}); 

// 콘솔에 테스트 이름 기록 
beforeEach(() => { 
const testName = Cypress.currentTest.title; 
cy.log(`Running: ${testName}`); 
});
``` 

### Cypress 명령어 

```js 
// cypress/support/commands.ts 
import '@testing-library/cypress/add-commands'; 

// 로그인 사용자 지정 명령어 
Cypress.Commands.add('login', (email, password) => { 
cy.session([email, password], () => { 
cy.visit('/login'); 
cy.get('[data-testid=email-input]').type(email); 
cy.get('[data-testid=password-input]').type(password); 
cy.get('[data-testid=login-button]').click(); 
cy.url().should('not.include', '/login'); 
}); 
});

// 인증 기능이 있는 API 요청에 대한 사용자 지정 명령
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

## 종단 간 테스트 

### Playwright 구성 

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
스크린샷: 'only-on-failure', 
}, 
projects: [ 
{ 
name: 'chromium', 
use: { ...devices['데스크톱 Chrome'] }, 
}, 
{ 
name: 'firefox', 
use: { ...devices['데스크톱 Firefox'] }, 
}, 
{ 
name: 'webkit', 
use: { ...devices['데스크톱 Safari'] }, 
}, 
{ 
name: '모바일 Chrome', 
use: { ...devices['Pixel 5'] }, 
}, 
{ 
name: '모바일 Safari', 
use: { ...devices['iPhone 12'] }, 
}, 
], 
webServer: { 
command: 'npm run start', 
port: 3000,
    재사용기존서버: !process.env.CI,
  },
});
``` 

## 시각적 회귀 테스트

### Storybook 구성

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

### Chromatic을 사용한 Storybook 시각적 테스트

```yaml
name: 시각적 회귀 테스트

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

- name: Node.js 설정 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: 종속성 설치 
run: npm ci 

- name: Chromatic에 게시 
uses: chromaui/action@v1 
with: 
projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }} 
exitZeroOnChanges: true 
``` 

## 성능 테스트 

### Lighthouse CI 구성 

```js 
// lighthouserc.js 
module.exports = { 
ci: { 
collect: { 
startServerCommand: 'npm run start', 
url: ['http://localhost:3000/', 'http://localhost:3000/about', 'http://localhost:3000/contact'], 
numberOfRuns: 3, 
settings: { 
사전 설정: 'desktop', 
}, 
}, 
upload: { 
대상: 'temporary-public-storage', 
}, 
assert: { 
사전 설정: 'lighthouse:recommended', 
assertions: { 
'categories:performance': ['warn', { minScore: 0.9 }], 
'categories:accessibility': ['error', { minScore: 0.9 }], 
'categories:best-practices': ['error', { minScore: 0.9 }], 
'categories:seo': ['error', { minScore: 0.9 }], 
}, 
}, 
}, 
}, 
};
``` 

### Lighthouse CI GitHub 작업

```yaml
이름: 성능 테스트

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

- name: Node.js 설정 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: 종속성 설치 
run: npm ci 

- name: 빌드 
run: npm run build 

- name: Lighthouse CI 실행 
run: |
npm install -g @lhci/cli
lhci 자동 실행
env: 
LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }} 
``` 

## 부하 테스트

### k6 구성

```js 
// load-test.js
import http from 'k6/http'; 
import { sleep, check } from 'k6'; 
import { Rate } from 'k6/metrics'; 

const failRate = new Rate('failed_requests');

export const options = { 
stages: [ 
{ duration: '1m', target: 50 }, // 사용자 수를 50명으로 늘립니다.
{ duration: '3m', target: 50 }, // 사용자 수를 3분간 50명으로 유지합니다.
{ duration: '1m', target: 100 }, // 사용자 수를 100명으로 늘립니다.
{ duration: '3m', target: 100 }, // 사용자 수를 3분간 100명으로 유지합니다.
{ duration: '1m', target: 0 }, // 사용자 수를 0명으로 줄입니다.
], 
thresholds: { 
http_req_duration: ['p(95)<500'], // 요청의 95%는 500ms 이내에 완료되어야 합니다.
'failed_requests': ['rate<0.1'], // 요청의 10% 미만이 실패할 수 있습니다.
}, 
};

export default function () { 
const res = http.get('https://example.com/'); 

const checkRes = check(res, { 
'상태는 200입니다.': (r) => r.status === 200, 
'응답 시간 < 500ms': (r) => r.timings.duration < 500, 
}); 

failRate.add(!checkRes); 

sleep(1);
} 
``` 

## 테스트를 위한 GitHub Actions 워크플로

```yaml
name: 테스트 스위트

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

- name: Node.js 설정
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: 종속성 설치
run: npm ci 

- name: 단위 테스트 실행
run: npm test -- --coverage 

- name: Codecov에 커버리지 업로드
uses: codecov/codecov-action@v3 
with: 
token: ${{ secrets.CODECOV_TOKEN }} 
파일: ./coverage/lcov.info 
플래그: 단위 테스트 
이름: codecov-umbrella 
fail_ci_if_error: true 

통합 테스트: 
실행: ubuntu-latest 
필요: 단위 테스트 
단계: 
- 사용: actions/checkout@v3 

- 이름: Node.js 설치 
사용: actions/setup-node@v3 
다음과 함께: 
노드 버전: '18' 
캐시: 'npm' 

- 이름: 종속성 설치 
실행: npm ci 

- 이름: 빌드 
실행: npm run build 

- 이름: Cypress 테스트 실행 
사용: cypress-io/github-action@v5 
다음과 함께: 
빌드: npm run build 
시작: npm start 
대기: 'http://localhost:3000'

- name: Cypress 스크린샷 업로드
사용: actions/upload-artifact@v3
if: failure()
with: 
name: cypress-screenshots
경로: cypress/screenshots

e2e-tests: 
실행 환경: ubuntu-latest
needs: integration-tests
steps: 
- 사용: actions/checkout@v3

- name: Node.js 설정
사용: actions/setup-node@v3
with: 
노드 버전: '18'
캐시: 'npm'

- name: 종속성 설치
실행: npm ci

- name: Playwright 브라우저 설치
실행: npx playwright install --with-deps

- name: 빌드
실행: npm run build

- name: Playwright 테스트 실행
run: npx playwright test

- name: Playwright report 업로드
uses: actions/upload-artifact@v3
if: always()
with: 
name: playwright-report
path: playwright-report/ 
``` 

## 테스트 자동화 모범 사례

1. **테스트 피라미드**: 단위 테스트는 늘리고, 통합 테스트는 줄이며, E2E 테스트는 더욱 줄이는 테스트 피라미드 방식을 따릅니다.
2. **지속적인 테스트**: 모든 커밋에서 테스트를 자동으로 실행합니다.
3. **빠른 피드백**: 테스트를 최적화하여 빠르게 실행하고 즉각적인 피드백을 제공합니다.
4. **격리된 테스트**: 테스트가 독립적이며 서로 영향을 미치지 않도록 합니다.
5. **현실적인 데이터**: 프로덕션 시나리오를 나타내는 현실적인 테스트 데이터를 사용합니다.
6. **유지보수 가능한 테스트**: 적절한 추상화를 사용하여 깔끔하고 유지 관리 가능한 테스트 코드를 작성합니다.
7. **시각적 테스트**: UI 구성 요소에 대한 시각적 회귀 테스트를 포함합니다.
8. **성능 테스트**: 회귀를 포착하기 위해 정기적으로 성능을 테스트합니다.
9. **접근성 테스트**: 자동화 프로세스에 접근성 테스트를 통합합니다.
10. **보안 테스트**: 자동화된 테스트 모음의 일부로 보안 테스트를 포함합니다.

## 구현 체크리스트

- [ ] 단위 테스트를 위한 Jest 설정
- [ ] 컴포넌트 테스트를 위한 React 테스트 라이브러리 구성
- [ ] 통합 테스트를 위한 Cypress 설정
- [ ] 엔드투엔드 테스트를 위한 Playwright 구성
- [ ] 시각적 회귀 테스트를 위한 Chromatic을 사용한 Storybook 설정
- [ ] 성능 테스트를 위한 Lighthouse CI 구성
- [ ] 부하 테스트를 위한 k6 설정
- [ ] CI/CD 파이프라인에 테스트 통합
- [ ] 코드 커버리지 보고 구성
- [ ] 테스트 결과 및 추세 모니터링 설정