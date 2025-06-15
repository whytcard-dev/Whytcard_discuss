# 测试自动化

本文档提供了根据 Web 开发标准实现测试流程自动化的标准化配置和工作流程。

## 单元测试

### Jest 配置

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
全局: {
分支: 80,
函数: 80,
行: 80,
语句: 80,
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

### React 测试库设置

```js
// src/setupTests.ts
导入'@testing-library/jest-dom';
从'@testing-library/react'导入{configure};

//配置 React 测试库
configure({
testIdAttribute: 'data-testid',
});

// 模拟 window.matchMedia
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

// 模拟 IntersectionObserver
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

## 集成测试

### Cypress 配置

```js
// cypress.config.js
const {defineConfig} = require('cypress');

module.exports = DefineConfig({
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

### Cypress 支持文件

```js
// cypress/support/e2e.ts
import './commands';

// 防止未捕获的异常导致测试失败
Cypress.on('uncaught:exception', (err) => {
// 在此处返回 false 可防止 Cypress 测试失败
return false;
});

// 将测试名称记录到控制台
beforeEach(() => {
const testName = Cypress.currentTest.title;
cy.log(`Running: ${testName}`);
});
```

### Cypress 命令

```js
// cypress/support/commands.ts
import '@testing-library/cypress/add-commands';

// 自定义登录命令
Cypress.Commands.add('login', (email, password) => {
cy.session([email, password], () => {
cy.visit('/login');
cy.get('[data-testid=email-input]').type(email);
cy.get('[data-testid=password-input]').type(password);
cy.get('[data-testid=login-button]').click();
cy.url().should('not.include', '/login');
});
});

// 自定义 API 请求命令（带身份验证）
Cypress.Commands.add('apiLogin', (email, password) => {
cy.request({
method: 'POST',
url: `${Cypress.env('apiUrl')}/auth/login`,
body: {email, password},
}).then((response) => {
window.localStorage.setItem('authToken',response.body.token);
});
});
```

## 端到端测试

### Playwright 配置

```js
// playwright.config.js
const {defineConfig, devices} = require('@playwright/test');

module.exports = DefineConfig({
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
['junit', {outputFile: 'test-results/e2e-junit.xml'}],
],
use: {
actionTimeout: 0,
baseURL: 'http://localhost:3000',
trace: 'on-first-retry',
video: 'on-first-retry',
screenshot: 'only-on-failure',
},
项目：[
{
名称：'chromium',
使用：{...devices['桌面版 Chrome']},
},
{
名称：'firefox',
使用：{...devices['桌面版 Firefox']},
},
{
名称：'webkit',
使用：{...devices['桌面版 Safari']},
},
{
名称：'移动版 Chrome',
使用：{...devices['Pixel 5']},
},
{
名称：'移动版 Safari',
使用：{...devices['iPhone 12']},
},
],
web 服务器：{
命令：'npm run start',
端口：3000,
    重用现有服务器：！process.env.CI，
  },
});
```

## 可视化回归测试

### Storybook 配置

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
staticDirs: ['../民众']，
};
```

### 使用 Chromatic 进行 Storybook 可视化测试

```yaml
名称：可视化回归测试

开启：
推送：
分支：[main,develop]
拉取请求：
分支：[main,develop]

作业：
可视化回归：
运行于：ubuntu-latest
步骤：
- 使用：actions/checkout@v3
使用：
获取深度：0

- 名称：设置 Node.js
使用：actions/setup-node@v3
使用：
node-version：'18'
缓存：'npm'

- 名称：安装依赖项
运行：npm ci

- 名称：发布到 Chromatic
使用：chromaui/action@v1
使用：
项目令牌：${{ secrets.CHROMATIC_PROJECT_TOKEN }}
exitZeroOnChanges: true
```

## 性能测试

### Lighthouse CI 配置

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

### Lighthouse CI GitHub Action

```yaml
名称：性能测试

开启：
推送：
分支：[main,develop]
拉取请求：
分支：[main,develop]

作业：
lighthouse：
运行于：ubuntu-latest
步骤：
- 使用：actions/checkout@v3

- 名称：安装 Node.js
使用：actions/setup-node@v3
使用：
node-version：'18'
缓存：'npm'

- 名称：安装依赖项
运行：npm ci

- 名称：构建
运行：npm run build

- 名称：运行 Lighthouse CI
运行：|
npm install -g @lhci/cli
lhci 自动运行
环境变量：
LHCI_GITHUB_APP_TOKEN：${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

## 负载测试

### k6 配置

```js
// load-test.js
从“k6/http”导入 http；
从“k6”导入 { sleep, check }；
从“k6/metrics”导入 { Rate }；

const failRate = new Rate('failed_requests');

导出 const options = {
stages: [
{duration: '1m', target: 50}, // 逐渐增加到 50 个用户
{duration: '3m', target: 50}, // 保持 50 个用户 3 分钟
{duration: '1m', target: 100}, // 逐渐增加到 100 个用户
{duration: '3m', target: 100}, // 保持 100 个用户 3 分钟
{duration: '1m', target: 0}, // 逐渐减少到 0 个用户
],
thresholds: {
http_req_duration: ['p(95)<500'], // 95% 的请求必须在 500 毫秒内完成
'failed_requests': ['rate<0.1'], // 少于 10% 的请求可以失败
}, 
};

export default function () {
const res = http.get('https://example.com/');


const checkRes = check(res, {
'状态为 200': (r) => r.status === 200,
'响应时间 < 500 毫秒': (r) => r.timings.duration < 500,
});

failRate.add(!checkRes);


sleep(1);
}
```

## GitHub Actions 测试工作流程

```yaml
名称：测试套件

on:
推送：
分支：[main,develop]
拉取请求：
分支：[main,develop]

作业：
单元测试：
运行于：ubuntu-latest
步骤：
- 使用：actions/checkout@v3

- 名称：设置 Node.js
使用：actions/setup-node@v3
使用：
node-version: '18'
缓存：'npm'

- 名称：安装依赖项
运行：npm ci

- 名称：运行单元测试
运行：npm test -- --coverage

- 名称：将覆盖率上传到 Codecov
使用：codecov/codecov-action@v3
使用：
令牌：${{ secrets.CODECOV_TOKEN }}
文件：./coverage/lcov.info
标志：unittests
名称：codecov-umbrella
fail_ci_if_error：true

集成测试：
运行于：ubuntu-latest
需求：unit-tests
步骤：
- 使用：actions/checkout@v3

- 名称：安装 Node.js
使用：actions/setup-node@v3
使用：
node-version：'18'
缓存：'npm'

- 名称：安装依赖项
运行：npm ci

- 名称：构建
运行：npm run build

- 名称：运行 Cypress 测试
使用：cypress-io/github-action@v5
使用：
构建：npm run build
启动：npm start
等待： 'http://localhost:3000'

- 名称：上传 Cypress 截图
使用：actions/upload-artifact@v3
if: Failure()
使用：
名称：cypress-screenshots
路径：cypress/screenshots

e2e-tests：
运行于：ubuntu-latest
需求：integration-tests
步骤：
- 名称：actions/checkout@v3

- 名称：设置 Node.js
使用：actions/setup-node@v3
使用：
node-version：'18'
缓存：'npm'

- 名称：安装依赖项
运行：npm ci

- 名称：安装 Playwright 浏览器
运行：npx playwright install --with-deps

- 名称：构建
运行：npm run build

- 名称：运行Playwright 测试
运行：npx playwright 测试

- 名称：上传 Playwright 报告
使用：actions/upload-artifact@v3
if: always()
with:
名称：playwright-report
路径：playwright-report/
```

## 测试自动化最佳实践

1. **测试金字塔**：遵循测试金字塔方法，增加单元测试、减少集成测试，甚至减少端到端测试
2. **持续测试**：每次提交时自动运行测试
3. **快速反馈**：优化测试以快速运行并提供即时反馈
4. **隔离测试**：确保测试独立且互不影响
5. **真实数据**：使用代表生产场景的真实测试数据
6. **可维护测试**：编写干净、可维护且具有适当抽象的测试代码
7. **可视化测试**：包含以下可视化回归测试UI 组件
8. **性能测试**：定期测试性能以捕捉回归问题
9. **可访问性测试**：将可访问性测试纳入自动化流程
10. **安全性测试**：将安全性测试纳入自动化测试套件

## 实施清单

- [ ] 设置 Jest 进行单元测试
- [ ] 配置 React 测试库进行组件测试
- [ ] 设置 Cypress 进行集成测试
- [ ] 配置 Playwright 进行端到端测试
- [ ] 使用 Chromatic 设置 Storybook 进行可视化回归测试
- [ ] 配置 Lighthouse CI 进行性能测试
- [ ] 设置 k6 进行负载测试
- [ ] 将测试集成到 CI/CD 流水线
- [ ] 配置代码覆盖率报告
- [ ] 设置测试结果和趋势监控