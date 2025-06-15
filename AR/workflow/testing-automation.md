# أتمتة الاختبار

يوفر هذا المستند تكوينات وسير عمل موحدة لأتمتة عمليات الاختبار وفقًا لمعايير تطوير الويب.

## اختبار الوحدة

### تهيئة Jest

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
مُحدِّد اسم الوحدة النمطية: {
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
statement: 80, 
}, 
setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],
watchPlugins: [
'jest-watch-typeahead/filename',
'jest-watch-typeahead/testname',
],
};
```

### إعداد مكتبة اختبار رياكت

```js
// src/setupTests.ts
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// تهيئة مكتبة اختبار رياكت
configure({ 
testIdAttribute: 'data-testid',
});

// محاكاة window.matchMedia
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

// محاكاة IntersectionObserver
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

## اختبار التكامل

### تهيئة Cypress

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

### ملف دعم Cypress

```js
// cypress/support/e2e.ts
import './commands';

// منع الاستثناءات غير الملتقطة من فشل الاختبارات
Cypress.on('uncaught:exception', (err) => {
// إرجاع قيمة false هنا يمنع Cypress من فشل الاختبار
return false;
});

// تسجيل أسماء الاختبارات في وحدة التحكم
beforeEach(() => {

const testName = Cypress.currentTest.title;
cy.log(`قيد التشغيل: ${testName}`);
});
```

### أوامر Cypress

```js
// cypress/support/commands.ts
import '@testing-library/cypress/add-commands';

// أمر مخصص لتسجيل الدخول
Cypress.Commands.add('login', (email, password) => {

cy.session([email, password], () => {

cy.visit('/login');

cy.get('[data-testid=email-input]').type(email);

cy.get('[data-testid=password-input]').type(password);

cy.get('[data-testid=login-button]').click();

cy.url().should('not.include', '/login');
});
});

// أمر مخصص لطلبات واجهة برمجة التطبيقات (API) مع المصادقة
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

## اختبار شامل

### تهيئة Playwright

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
لقطة شاشة: 'only-on-failure'،
}،
المشاريع: [

{

الاسم: 'chromium'،

الاستخدام: { ...devices['Desktop Chrome'] }،

}،

{

الاسم: 'firefox'،

الاستخدام: { ...devices['Desktop Firefox'] }،

}،

{

الاسم: 'webkit'،

الاستخدام: { ...devices['Desktop Safari'] }،

}،

{

الاسم: 'Mobile Chrome'،

الاستخدام: { ...devices['Pixel 5'] }،

}،

{
الاسم: 'Mobile Safari'،

الاستخدام: { ...devices['iPhone 12'] }،

}،

]،

خادم الويب: {

الأمر: 'npm run start'،

المنفذ: 3000،
    reuseExistingServer: !process.env.CI،
  },
});
```

## اختبار الانحدار البصري

### تهيئة Storybook

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

### اختبار مرئي لكتاب قصصي باستخدام كروماتيك

```yaml
الاسم: اختبارات الانحدار المرئي

تشغيل:
دفع:
فروع: [رئيسي، تطوير]
طلب سحب:
فروع: [رئيسي، تطوير]

وظائف:
انحدار مرئي:
تشغيل: أوبونتو-لاتيست
الخطوات:
- الاستخدامات: actions/checkout@v3

مع:
عمق الجلب: 0

- الاسم: إعداد Node.js
- الاستخدامات: actions/setup-node@v3

مع:
إصدار العقدة: '18'

ذاكرة التخزين المؤقت: 'npm'

- الاسم: تثبيت التبعيات
- التشغيل: npm ci

- الاسم: النشر إلى كروماتيك
- الاستخدامات: chromaui/action@v1
- مع:
رمز المشروع: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
exitZeroOnChanges: true
```

## اختبار الأداء

### تهيئة Lighthouse CI

```js
// lighthouserc.js
module.exports = {

ci: {

collect: {

startServerCommand: 'npm run start',

url: ['http://localhost:3000/', 'http://localhost:3000/about', 'http://localhost:3000/contact'],

numberOfRuns: 3,

sets: {

preset: 'desktop',

},

upload: {

target: 'temporary-public-storage',

},

assert: {

preset: 'منارة: مُوصى به'،
التأكيدات: {

'الفئات: الأداء': ['تحذير'، { الحد الأدنى للنتيجة: 0.9 }]،

'الفئات: إمكانية الوصول': ['خطأ'، { الحد الأدنى للنتيجة: 0.9 }]،

'الفئات: أفضل الممارسات': ['خطأ'، { الحد الأدنى للنتيجة: 0.9 }]،

'الفئات: تحسين محركات البحث': ['خطأ'، { الحد الأدنى للنتيجة: 0.9 }]،
}،
}،
}،
}؛

```

### إجراء Lighthouse CI على GitHub

```yaml
الاسم: اختبار الأداء

تشغيل:
دفع:
الفروع: [الرئيسية، التطوير]
طلب سحب:
الفروع: [الرئيسية، التطوير]

الوظائف:
lighthouse:
تشغيل: أحدث إصدار من ubuntu
الخطوات:
- الاستخدامات: actions/checkout@v3

- الاسم: إعداد Node.js
- الاستخدامات: actions/setup-node@v3

مع:
إصدار العقدة: '18'
- ذاكرة التخزين المؤقت: 'npm'

- الاسم: تثبيت التبعيات
- التشغيل: npm ci

- الاسم: إنشاء
- التشغيل: npm run build
- الاسم: تشغيل Lighthouse CI
- التشغيل: |
npm install -g @lhci/cli
lhci autorun
env:
LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

## اختبار التحميل

### تهيئة k6

```js
// load-test.js
استيراد http من 'k6/http';
استيراد { sleep, check } من 'k6';
استيراد { rate } من 'k6/metrics';

const failRate = new Rate('failed_requests');

export const options = { 
stages: [ 
{ duration: '1m', target: 50 }, // زيادة العدد إلى 50 مستخدمًا 
{ duration: '3m', target: 50 }, // البقاء عند 50 مستخدمًا لمدة 3 دقائق 
{ duration: '1m', target: 100 }, // زيادة العدد إلى 100 مستخدم 
{ duration: '3m', target: 100 }, // البقاء عند 100 مستخدم لمدة 3 دقائق 
{ duration: '1m', target: 0 }, // تقليل العدد إلى 0 مستخدم 
],
thresholds: { 
http_req_duration: ['p(95)<500'], // يجب أن تكتمل 95% من الطلبات في أقل من 500 مللي ثانية 
'failed_requests': ['rate<0.1'], // أقل من 10% من الطلبات يمكن فشل
},
};

تصدير دالة افتراضية () {

ثابتة res = http.get('https://example.com/');


ثابتة checkRes = check(res, {

'الحالة 200': (r) => r.status === 200,


زمن الاستجابة < 500 مللي ثانية': (r) => r.timings.duration < 500,


});


failRate.add(!checkRes);


sleep(1);

}
```

## سير عمل إجراءات GitHub للاختبار

```yaml
الاسم: مجموعة الاختبارات

على:
الدفع:
الفروع: [الرئيسية، التطوير]

طلب السحب:
الفروع: [الرئيسية، التطوير]

الوظائف:
اختبارات الوحدات:
تشغيل: أحدث إصدار من ubuntu
الخطوات:
- الاستخدامات: actions/checkout@v3

- الاسم: إعداد Node.js
- الاستخدامات: actions/setup-node@v3

مع:
إصدار العقدة: '18'
- ذاكرة التخزين المؤقت: 'npm'

- الاسم: تثبيت التبعيات
- التشغيل: npm ci

- الاسم: تشغيل اختبارات الوحدات
- التشغيل: npm test -- --coverage

- الاسم: تحميل التغطية إلى Codecov
- الاستخدامات: codecov/codecov-action@v3
مع:
الرمز المميز: ${{ secrets.CODECOV_TOKEN }}
الملفات: ./coverage/lcov.info
العلامات: اختبارات الوحدات
الاسم: codecov-umbrella
fail_ci_if_error: صحيح

اختبارات التكامل:
التشغيل: ubuntu-latest
الاحتياجات: اختبارات الوحدات
الخطوات:
- الاستخدامات: actions/checkout@v3

- الاسم: إعداد Node.js
- الاستخدامات: actions/setup-node@v3

مع:
node-version: '18'

cache: 'npm'


- الاسم: تثبيت التبعيات
- التشغيل: npm ci


- الاسم: إنشاء
- التشغيل: npm run build
- الاسم: تشغيل اختبارات Cypress
- الاستخدامات: cypress-io/github-action@v5

مع:
- إنشاء: npm run build
البدء: بدء npm
الانتظار: 'http://localhost:3000'

- الاسم: تحميل لقطات شاشة Cypress
الاستخدامات: actions/upload-artifact@v3
إذا: فشل ()
مع:
الاسم: cypress-screenshots
المسار: cypress/screenshots

اختبارات e2e:
التشغيل: ubuntu-latest
الاحتياجات: اختبارات التكامل
الخطوات:
- الاستخدامات: actions/checkout@v3

- الاسم: إعداد Node.js
الاستخدامات: actions/setup-node@v3
مع:
إصدار العقدة: '18'
ذاكرة التخزين المؤقت: 'npm'

- الاسم: تثبيت التبعيات
التشغيل: npm ci

- الاسم: تثبيت متصفحات Playwright
التشغيل: npx playwright install --with-deps

- الاسم: بناء
التشغيل: npm run build

- الاسم: تشغيل اختبارات Playwright
تشغيل: اختبار Playwright npx

- الاسم: تحميل تقرير Playwright
الاستخدامات: actions/upload-artifact@v3
if: always()
with:
name: playwright-report
path: playwright-report/
```

## أفضل الممارسات لأتمتة الاختبار

1. **هرم الاختبار**: اتبع نهج هرم الاختبار مع المزيد من اختبارات الوحدات، واختبارات تكامل أقل، واختبارات E2E أقل.
2. **الاختبار المستمر**: تشغيل الاختبارات تلقائيًا عند كل عملية التزام.
3. **ملاحظات سريعة**: تحسين الاختبارات لتشغيلها بسرعة وتقديم ملاحظات فورية.
4. **الاختبارات المعزولة**: تأكد من استقلالية الاختبارات وعدم تأثيرها على بعضها البعض.
5. **بيانات واقعية**: استخدم بيانات اختبار واقعية تمثل سيناريوهات الإنتاج.
6. **اختبارات قابلة للصيانة**: اكتب شيفرة اختبار نظيفة وقابلة للصيانة مع... التجريدات
7. **الاختبار المرئي**: تضمين اختبار الانحدار المرئي لمكونات واجهة المستخدم
8. **اختبار الأداء**: اختبار الأداء بانتظام لاكتشاف الانحدارات
9. **اختبار إمكانية الوصول**: دمج اختبار إمكانية الوصول في عملية الأتمتة
10. **اختبار الأمان**: تضمين اختبار الأمان كجزء من مجموعة الاختبارات الآلية

## قائمة التحقق من التنفيذ

- [ ] إعداد Jest لاختبار الوحدات
- [ ] تكوين مكتبة اختبار React لاختبار المكونات
- [ ] إعداد Cypress لاختبار التكامل
- [ ] تكوين Playwright للاختبار الشامل
- [ ] إعداد Storybook مع Chromatic لاختبار الانحدار المرئي
- [ ] تكوين Lighthouse CI لاختبار الأداء
- [ ] إعداد k6 لاختبار التحميل
- [ ] دمج الاختبارات في خطوط أنابيب CI/CD
- [ ] تكوين تقارير تغطية الكود
- [ ] إعداد مراقبة لنتائج الاختبار والاتجاهات