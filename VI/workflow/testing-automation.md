# Tự động hóa thử nghiệm

Tài liệu này cung cấp các cấu hình và quy trình làm việc được chuẩn hóa để tự động hóa các quy trình thử nghiệm theo các tiêu chuẩn phát triển web.

## Kiểm thử đơn vị

### Cấu hình Jest

```js
// jest.config.js
module.exports = { 
cài đặt trước: 'ts-jest', 
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

### Thiết lập thư viện kiểm thử React

```js
// src/setupTests.ts
import '@testing-library/jest-dom'; 
import { configure } from '@testing-library/react'; 

// Cấu hình thư viện kiểm thử React
configure({ 
testIdAttribute: 'data-testid',
}); 

// Giả lập window.matchMedia
Object.defineProperty(window, 'matchMedia', {
có thể ghi: true,
giá trị: jest.fn().mockImplementation(query => ({
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

// Giả lập IntersectionObserver
lớp MockIntersectionObserver {
quan sát = jest.fn();
bỏ quan sát = jest.fn();
ngắt kết nối = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
writable: true,
value: MockIntersectionObserver,
}); 
```

## Kiểm tra tích hợp

### Cấu hình Cypress

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

### Tệp hỗ trợ Cypress

```js
// cypress/support/e2e.ts
import './commands'; 

// Ngăn chặn các ngoại lệ chưa được phát hiện không vượt qua được các bài kiểm tra
Cypress.on('uncaught:exception', (err) => { 
// trả về false ở đây ngăn Cypress không vượt qua được bài kiểm tra
return false; 
}); 

// Ghi tên bài kiểm tra vào bảng điều khiển
beforeEach(() => { 
const testName = Cypress.currentTest.title; 
cy.log(`Running: ${testName}`); 
}); 
```

### Lệnh Cypress

```js
// cypress/support/commands.ts
import '@testing-library/cypress/add-commands';

// Lệnh tùy chỉnh để đăng nhập
Cypress.Commands.add('login', (email, password) => { 
cy.session([email, password], () => { 
cy.visit('/login'); 
cy.get('[data-testid=email-input]').type(email); 
cy.get('[data-testid=password-input]').type(password); 
cy.get('[data-testid=login-button]').click(); 
cy.url().should('not.include', '/login'); 
}); 
}); 

// Lệnh tùy chỉnh cho các yêu cầu API có xác thực
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

## Kiểm tra đầu cuối

### Cấu hình Playwright

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
dự án: [ 
{ 
tên: 'chromium', 
sử dụng: { ... thiết bị ['Chrome dành cho máy tính để bàn'] }, 
}, 
{ 
tên: 'firefox', 
sử dụng: { ... thiết bị ['Firefox dành cho máy tính để bàn'] }, 
}, 
{ 
tên: 'webkit', 
sử dụng: { ... thiết bị ['Safari dành cho máy tính để bàn'] }, 
}, 
{ 
tên: 'Chrome dành cho thiết bị di động', 
sử dụng: { ... thiết bị ['Pixel 5'] }, 
}, 
{ 
tên: 'Safari dành cho thiết bị di động', 
sử dụng: { ... thiết bị ['iPhone 12'] }, 
}, 
], 
webServer: { 
lệnh: 'npm run start', 
cổng: 3000, 
tái sử dụngExistingServer: !process.env.CI, 
}, 
});
```

## Kiểm thử hồi quy trực quan

### Cấu hình Storybook

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

### Kiểm tra trực quan Storybook với Chromatic

```yaml
name: Kiểm tra hồi quy trực quan

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

- name: Thiết lập Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Cài đặt các phụ thuộc 
run: npm ci 

- name: Xuất bản lên Chromatic 
uses: chromaui/action@v1 
with: 
projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }} 
exitZeroOnChanges: true 
``` 

## Kiểm tra hiệu suất 

### Cấu hình Lighthouse CI 

```js 
// lighthouserc.js 
module.exports = { 
ci: { 
collect: { 
startServerCommand: 'npm run start', 
url: ['http://localhost:3000/', 'http://localhost:3000/about', 'http://localhost:3000/contact'], 
numberOfRuns: 3, 
settings: { 
cài đặt trước: 'desktop', 
}, 
}, 
upload: { 
mục tiêu: 'lưu trữ công cộng tạm thời', 
}, 
assert: { 
cài đặt trước: 'lighthouse: được đề xuất', 
assertions: { 
'categories: performance': ['warn', { minScore: 0.9 }], 
'categories:accessibility': ['lỗi', { minScore: 0.9 }], 
'categories:best-practices': ['lỗi', { minScore: 0.9 }], 
'categories:seo': ['lỗi', { minScore: 0.9 }], 
}, 
}, 
}, 
}; 
``` 

### Lighthouse CI GitHub Action 

```yaml 
name: Kiểm tra hiệu suất 

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

- name: Thiết lập Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Cài đặt các phụ thuộc 
run: npm ci 

- name: Xây dựng 
run: npm run build 

- name: Chạy Lighthouse CI 
run: |
npm install -g @lhci/cli 
lhci autorun 
env: 
LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }} 
``` 

## Kiểm tra tải 

### Cấu hình k6 

```js 
// load-test.js 
import http from 'k6/http'; 
import { sleep, check } from 'k6'; 
import { Rate } from 'k6/metrics'; 

const failRate = new Rate('failed_requests'); 

export const options = { 
các giai đoạn: [ 
{ thời lượng: '1 phút', mục tiêu: 50 }, // Tăng lên đến 50 người dùng 
{ thời lượng: '3 phút', mục tiêu: 50 }, // Duy trì ở mức 50 người dùng trong 3 phút 
{ thời lượng: '1 phút', mục tiêu: 100 }, // Tăng lên đến 100 người dùng 
{ thời lượng: '3 phút', mục tiêu: 100 }, // Duy trì ở mức 100 người dùng trong 3 phút 
{ thời lượng: '1 phút', mục tiêu: 0 }, // Giảm xuống còn 0 người dùng 
], 
ngưỡng: { 
http_req_duration: ['p(95)<500'], // 95% yêu cầu phải hoàn tất dưới 500ms 
'failed_requests': ['rate<0.1'], // Ít hơn 10% yêu cầu có thể không thành công 
},
};

export default function () { 
const res = http.get('https://example.com/'); 

const checkRes = check(res, { 
'trạng thái là 200': (r) => r.status === 200, 
'thời gian phản hồi < 500ms': (r) => r.timings.duration < 500, 
}); 

failRate.add(!checkRes); 

sleep(1); 
} 
``` 

## GitHub Actions Workflow để kiểm thử

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

- name: Thiết lập Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Cài đặt các phụ thuộc 
run: npm ci 

- name: Chạy các bài kiểm tra đơn vị 
run: npm test -- --coverage 

- name: Tải phạm vi phủ sóng lên Codecov 
uses: codecov/codecov-action@v3 
with: 
token: ${{ secrets.CODECOV_TOKEN }} 
files: ./coverage/lcov.info 
flags: unittests 
name: codecov-umbrella 
fail_ci_if_error: true 

integration-tests: 
runs-on: ubuntu-latest 
needs: unit-tests 
steps: 
- uses: actions/checkout@v3 

- name: Thiết lập Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Cài đặt các phụ thuộc 
run: npm ci 

- name: Build 
run: npm run build 

- name: Chạy thử nghiệm Cypress 
uses: cypress-io/github-action@v5 
with: 
build: npm run build 
start: npm start 
wait-on: 'http://localhost:3000' 

- name: Tải ảnh chụp màn hình Cypress lên
sử dụng: actions/upload-artifact@v3
nếu: failure()
với:
name: cypress-screenshots
đường dẫn: cypress/screenshots

e2e-tests:
chạy trên: ubuntu-latest
cần: integration-tests
các bước:
- uses: actions/checkout@v3

- name: Thiết lập Node.js
sử dụng: actions/setup-node@v3
với:
node-version: '18'
bộ nhớ đệm: 'npm'

- name: Cài đặt các phụ thuộc
chạy: npm ci

- name: Cài đặt trình duyệt Playwright
chạy: npx playwright install --with-deps

- name: Xây dựng
chạy: npm run build

- name: Chạy thử nghiệm Playwright
chạy: npx playwright test

- name: Tải lên Báo cáo của nhà viết kịch
sử dụng: actions/upload-artifact@v3
nếu: always()
với:
tên: playwright-report
đường dẫn: playwright-report/
```

## Các phương pháp hay nhất để tự động hóa thử nghiệm

1. **Kim tự tháp thử nghiệm**: Thực hiện theo phương pháp kim tự tháp thử nghiệm với nhiều thử nghiệm đơn vị hơn, ít thử nghiệm tích hợp hơn và thậm chí ít thử nghiệm E2E hơn
2. **Kiểm tra liên tục**: Tự động chạy thử nghiệm trên mọi lần xác nhận
3. **Phản hồi nhanh**: Tối ưu hóa thử nghiệm để chạy nhanh và cung cấp phản hồi ngay lập tức
4. **Thử nghiệm riêng biệt**: Đảm bảo các thử nghiệm độc lập và không ảnh hưởng lẫn nhau
5. **Dữ liệu thực tế**: Sử dụng dữ liệu thử nghiệm thực tế thể hiện các tình huống sản xuất
6. **Thử nghiệm có thể bảo trì**: Viết mã thử nghiệm sạch, có thể bảo trì với các phép trừu tượng thích hợp
7. **Kiểm tra trực quan**: Bao gồm thử nghiệm hồi quy trực quan cho các thành phần UI
8. **Kiểm tra hiệu suất**: Thường xuyên kiểm tra hiệu suất để phát hiện hồi quy
9. **Kiểm tra khả năng truy cập**: Kết hợp khả năng truy cập kiểm thử trong quy trình tự động hóa
10. **Kiểm thử bảo mật**: Bao gồm kiểm thử bảo mật như một phần của bộ kiểm thử tự động

## Danh sách kiểm tra triển khai

- [ ] Thiết lập Jest để kiểm thử đơn vị
- [ ] Cấu hình React Testing Library để kiểm thử thành phần
- [ ] Thiết lập Cypress để kiểm thử tích hợp
- [ ] Cấu hình Playwright để kiểm thử đầu cuối
- [ ] Thiết lập Storybook với Chromatic để kiểm thử hồi quy trực quan
- [ ] Cấu hình Lighthouse CI để kiểm thử hiệu suất
- [ ] Thiết lập k6 để kiểm thử tải
- [ ] Tích hợp các bài kiểm thử vào quy trình CI/CD
- [ ] Cấu hình báo cáo phạm vi mã
- [ ] Thiết lập giám sát kết quả và xu hướng kiểm thử