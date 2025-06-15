# テストの自動化

このドキュメントでは、Web 開発標準に従ってテストプロセスを自動化するための標準化された構成とワークフローを提供します。

## ユニットテスト

### Jest の設定

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

### React テストライブラリのセットアップ

```js
// src/setupTests.ts
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// React テストライブラリの設定
configure({
testIdAttribute: 'data-testid',
});

// window.matchMedia をモックします
Object.defineProperty(window, 'matchMedia', {
writable: true,
value: jest.fn().mockImplementation(query => ({
matches: false,
media: query,
onchange: null,
addListener: jest.fn(),
RemoveListener: jest.fn(),
addEventListener: jest.fn(),
RemoveEventListener: jest.fn(),
dispatchEvent: jest.fn(),
})),
});

// IntersectionObserver をモックします
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

## 統合テスト

### Cypress の設定

```js
// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = definitionConfig({
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
components: {
devServer: {
framework: 'react',
bandler: 'webpack',
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

### Cypress サポートファイル

```js
// cypress/support/e2e.ts
import './commands';

// キャッチされない例外によるテスト失敗を防止
Cypress.on('uncaught:exception', (err) => {
// ここで false を返すことで、Cypress がテスト失敗を防止
return false;
});

// テスト名をコンソールに出力します
beforeEach(() => {
const testName = Cypress.currentTest.title;
cy.log(`Running: ${testName}`);
});
```

### Cypress コマンド

```js
// cypress/support/commands.ts
import '@testing-library/cypress/add-commands';

// ログイン用のカスタムコマンド
Cypress.Commands.add('login', (email, password) => {
cy.session([email, password], () => {
cy.visit('/login');
cy.get('[data-testid=email-input]').type(email);
cy.get('[data-testid=password-input]').type(password);
cy.get('[data-testid=login-button]').click();
cy.url().should('not.include', '/login');
});
});

// 認証付き API リクエスト用のカスタムコマンド
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

## エンドツーエンドテスト

### Playwright の設定

```js
// playwright.config.js
const { definitionConfig, devices } = require('@playwright/test');

module.exports = definitionConfig({
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
スクリーンショット: 'only-on-failure',
},
プロジェクト: [
{
名前: 'chromium',
使用: { ...devices['デスクトップ Chrome'] },
},
{
名前: 'firefox',
使用: { ...devices['デスクトップ Firefox'] },
},
{
名前: 'webkit',
使用: { ...devices['デスクトップ Safari'] },
},
{
名前: 'モバイル Chrome',
使用: { ...devices['Pixel 5'] },
},
{
名前: 'モバイル Safari',
使用: { ...devices['iPhone 12'] },
},
],
ウェブサーバー: {
コマンド: 'npm run start',
ポート: 3000、
    再利用既存サーバー: !process.env.CI、
  }、
});
```

## ビジュアル回帰テスト

### Storybook の設定

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

### Chromatic を使用した Storybook ビジュアルテスト

```yaml 
name: ビジュアル回帰テスト

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

- name: Node.js のセットアップ
uses: actions/setup-node@v3
with:
node-version: '18'
cache: 'npm'

- name: 依存関係のインストール
run: npm ci

- name: Chromatic へのパブリッシュ
uses: chromaui/action@v1
with:
projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
exitZeroOnChanges: true
```

## パフォーマンステスト

### Lighthouse CI 設定

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
name: パフォーマンステスト

on:
push:
branches: [ main, develop ]
pull_request:
branches: [ main, develop ]

jobs:
lighthouse:
runs-on: ubuntu-latest
steps:
- uses: actions/checkout@v3

- name: Node.js のセットアップ
uses: actions/setup-node@v3
with:
node-version: '18'
cache: 'npm'

- name: 依存関係のインストール
run: npm ci

- name: ビルド
run: npm run build

- name: Lighthouse CI の実行
run: |
npm install -g @lhci/cli
lhci autorun
env:
LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

## 負荷テスト

### k6 の設定

```js
// load-test.js
import http from 'k6/http';
import { sleep, check } from 'k6';
import { Rate } from 'k6/metrics';

const failRate = new Rate('failed_requests');

export const options = {
stages: [
{ duration: '1m', target: 50 }, // ユーザー数を 50 まで増加
{ duration: '3m', target: 50 }, // 3 分間 50 ユーザー数を維持
{ duration: '1m', target: 100 }, // ユーザー数を 100 まで増加
{ duration: '3m', target: 100 }, // 3 分間 100 ユーザー数を維持
{ duration: '1m', target: 0 }, // ユーザー数を 0 まで減少
],
thresholds: {
http_req_duration: ['p(95)<500'], // リクエストの 95% は 500 ミリ秒未満で完了する必要があります
'failed_requests': ['rate<0.1'], // リクエストの 10% 未満が失敗しても構いません
},
};

エクスポート default function () {
const res = http.get('https://example.com/');

const checkRes = check(res, {
'ステータスは200です': (r) => r.status === 200,
'応答時間 < 500ms': (r) => r.timings.duration < 500,
});

failRate.add(!checkRes);

sleep(1);
}
```

## テスト用 GitHub Actions ワークフロー

```yaml
name: テストスイート

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

- name: Node.js のセットアップ
uses: actions/setup-node@v3
with:
node-version: '18'
cache: 'npm'

- name: 依存関係のインストール
run: npm ci

- name: ユニットテストの実行
run: npm test -- --coverage

- name: カバレッジを Codecov にアップロード
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

- name: Node.js のセットアップ
uses: actions/setup-node@v3
with:
node-version: '18'
cache: 'npm'

- name: 依存関係のインストール
run: npm ci

- name: ビルド
run: npm run build

- name: Cypress テストの実行
uses: cypress-io/github-action@v5
with:
build: npm run build
start: npm start
wait-on: 'http://localhost:3000'

- name: Cypress スクリーンショットのアップロード
uses: actions/upload-artifact@v3
if: failure()
with:
name: cypress-screenshots
path: cypress/screenshots

e2e-tests:
runs-on: ubuntu-latest
needs: integration-tests
steps:
- uses: actions/checkout@v3

- name: Node.js のセットアップ
uses: actions/setup-node@v3
with:
node-version: '18'
cache: 'npm'

- name: 依存関係のインストール
run: npm ci

- name: Playwright ブラウザのインストール
run: npx playwright install --with-deps

- name: ビルド
run: npm run build

- name: 実行Playwright テスト
run: npx playwright test

- name: Playwright レポートのアップロード
uses: actions/upload-artifact@v3
if: always()
with:
name: playwright-report
path: playwright-report/
```

## テスト自動化のベストプラクティス

1. **テストピラミッド**: テストピラミッドアプローチに従い、単体テストを増やし、統合テストとE2Eテストをさらに減らします。
2. **継続的テスト**: コミットごとにテストを自動的に実行します。
3. **迅速なフィードバック**: テストを最適化して、迅速に実行し、即座にフィードバックを提供します。
4. **分離テスト**: テストが独立しており、互いに影響を与えないことを確認します。
5. **現実的なデータ**: 本番環境のシナリオを反映した現実的なテストデータを使用します。
6. **保守可能なテスト**: 適切な抽象化を施した、クリーンで保守可能なテストコードを記述します。
7. **ビジュアルテスト**: ビジュアルテストを含めるUIコンポーネントの回帰テスト
8. **パフォーマンステスト**: 定期的にパフォーマンステストを実施し、回帰エラーを検出します
9. **アクセシビリティテスト**: 自動化プロセスにアクセシビリティテストを組み込みます
10. **セキュリティテスト**: 自動化テストスイートにセキュリティテストを含めます

## 実装チェックリスト

- [ ] ユニットテスト用にJestをセットアップします
- [ ] コンポーネントテスト用にReactテストライブラリを設定します
- [ ] 統合テスト用にCypressをセットアップします
- [ ] エンドツーエンドテスト用にPlaywrightを設定します
- [ ] ビジュアル回帰テスト用にStorybookとChromaticをセットアップします
- [ ] パフォーマンステスト用にLighthouse CIを設定します
- [ ] 負荷テスト用にk6をセットアップします
- [ ] テストをCI/CDパイプラインに統合します
- [ ] コードカバレッジレポートを構成します
- [ ] テスト結果と傾向の監視を設定します