# أتمتة جودة الكود

يوفر هذا المستند تكوينات وسير عمل موحدة لأتمتة عمليات فحص جودة الكود وفقًا لمعايير تطوير الويب.

## تهيئة التدقيق اللغوي

### تهيئة ESLint (جافا سكريبت/تايب سكريبت)

```json
{
"root": true,
"env": {
"browser": true,
"node": true,
"es2021": true
},
"extends": [
"eslint:recommended",
"plugin:@typescript-eslint/recommended",
"plugin:react/recommended",
"plugin:react-hooks/recommended",
"plugin:jsx-a11y/recommended",
"plugin:import/errors",
"plugin:import/warnings",
"plugin:import/typescript",
"plugin:prettier/recommended"
],
"parser": "@typescript-eslint/parser"،
"parserOptions": {
"ecmaFeatures": {
"jsx": صحيح
}،
"ecmaVersion": 2021،
"sourceType": "module"
}،
"plugins": [
"react"،
"react-hooks"،
"@typescript-eslint"،
"jsx-a11y"،
"import"،
"prettier"
]،
"rules": {
"no-console": ["warn"، { "allow": ["warn"، "error"] }]،
"no-unused-vars": "off"،
"@typescript-eslint/no-unused-vars": ["error"، { "argsIgnorePattern": "^_" }]،
"react/prop-types": "إيقاف"،
"react/react-in-jsx-scope": "إيقاف"،
"react-hooks/rules-of-hooks": "خطأ"،
"react-hooks/exhaustive-deps": "تحذير"،
"استيراد/ترتيب": [
"خطأ"،
{
"مجموعات": ["مُضمن"، "خارجي"، "داخلي"، "أصل"، "شقيق"، "فهرس"]،
"أسطر جديدة بين": "دائمًا"،
"ترتيب أبجدي": { "ترتيب": "تصاعدي"، "حساس لحالة الأحرف": صحيح }
}

]،
"jsx-a11y/anchor-is-valid": [
"خطأ"،
{
"المكونات": ["رابط"]،
"رابط خاص": ["hrefيسار"، "hrefيمين"]،
"جوانب": ["href غير صالح"، "preferButton"]
}
]

},
"settings": {
"react": {
"version": "detect"
},
"import/resolver": {
"typescript": {},
"node": {
"extensions": [".js", ".jsx", ".ts", ".tsx"]
}

}

}

```

### تهيئة Stylelint (CSS/SCSS)

```json
{

"extends": [

"stylelint-config-standard",

"stylelint-config-prettier"
],

"plugins": [

"stylelint-order"
],

"rules": {

"order/properties-alphabetical-order": true,
"color-hex-case": "lower"،
"color-hex-length": "short"،
"color-no-invalid-hex": true،
"declaration-colon-space-after": "always"،
"indentation": 2،
"max-empty-lines": 1،
"selector-pseudo-class-no-unknown": [
true،
{
"ignorePseudoClasses": ["global"]
}

]،
"at-rule-no-unknown": [
true،
{
"ignoreAtRules": ["tailwind"، "apply"، "variants"، "responsive"، "screen"]
}

]،
"no-descending-specificity": null
}

}
```

## تنسيق الكود

### أجمل التهيئة

```json
{

"semi": true,
"singleQuote": true,
"trailingComma": "es5",
"printWidth": 100,
"tabWidth": 2,
"useTabs": false,
"bracketSpacing": true,
"jsxBracketSameLine": false,
"arrowParens": "avoid",
"endOfLine": "lf"
}
```

## تحليل الكود الثابت

### تهيئة SonarQube

```json
{

"sonar.projectKey": "project-name",

"sonar.projectName": "Project Name",

"sonar.projectVersion": "1.0.0",

"sonar.sources": "src",

"sonar.tests": "src"،
"sonar.test.inclusions": "**/*.test.js،**/*.test.jsx،**/*.test.ts،**/*.test.tsx"،
"sonar.coverage.exclusions": "**/*.test.js،**/*.test.jsx،**/*.test.ts،**/*.test.tsx،**/*.stories.js،**/*.stories.jsx،**/*.stories.ts،**/*.stories.tsx"،
"sonar.javascript.lcov.reportPaths": "coverage/lcov.info"،
"sonar.typescript.lcov.reportPaths": "coverage/lcov.info"،
"sonar.exclusions": "node_modules/**,build/**,dist/**,coverage/**,public/**,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx"
}
```

## التحقق من النوع

### تهيئة تايب سكريبت

```json
{

"compilerOptions": {

"target": "es2020",

"lib": ["dom", "dom.iterable", "esnext"],

"allowJs": true,

"skipLibCheck": true,

"esModuleInterop": true,

"allowSyntheticDefaultImports": true,

"strict": true,

"forceConsistentCasingInFileNames": true,
"noFallthroughCasesInSwitch": صحيح،
"module": "esnext"،
"moduleResolution": "node"،
"resolveJsonModule": صحيح،
"isolatedModules": صحيح،
"noEmit": صحيح،
"jsx": "react-jsx"،
"baseUrl": "src"
}،
"include": ["src"]،
"exclude": ["node_modules", "build", "dist", "coverage", "public"]
}
```

## خطافات جيت

### تهيئة هاسكي

```json
{

"husky": {

"hooks": {

"pre-commit": "lint-staged"،

"commit-msg": "commitlint -E" HUSKY_GIT_PARAMS"
} 
},
"lint-staged": {
"*.{js,jsx,ts,tsx}": [
"eslint --fix",
"prettier --write"
],
"*.{css,scss}": [
"stylelint --fix",
"prettier --write"
],
"*.{json,md}": [
"prettier --write"
]

},
"commitlint": {
"extends": [
"@commitlint/config-conventional"
]

}
}

```

## إدارة التبعيات

### تهيئة Dependabot

```yaml
الإصدار: 2
التحديثات:
- نظام الحزمة: "npm"
الدليل: "/"
الجدول الزمني:
الفاصل الزمني: "أسبوعيًا"
حد طلبات السحب المفتوحة: 10
استراتيجية إدارة الإصدارات: زيادة
التجاهل:
- اسم التبعية: "*"
أنواع التحديث: ["version-update:semver-major"]
الوسوم:
- "التبعيات"
- "الدمج التلقائي"
رسالة الالتزام:
البادئة: "chore"
التضمين: "scope"
```

## سير عمل إجراءات GitHub لجودة الكود

```yaml
الاسم: جودة الكود

على:
الدفع:
الفروع: [الرئيسية، التطوير]
طلب السحب:
الفروع: [الرئيسية، التطوير]

الوظائف:
جودة الكود:
يعمل على: أحدث إصدار من أوبونتو
الخطوات:
- الاستخدامات: الإجراءات/التحقق@الإصدار 3
مع:
عمق الجلب: 0


- الاسم: إعداد Node.js
الاستخدامات: الإجراءات/الإعداد-node@الإصدار 3
مع:
إصدار العقدة: '18'
ذاكرة التخزين المؤقت: 'npm'


- الاسم: تثبيت التبعيات
التشغيل: npm ci


- الاسم: فحص الوبر
التشغيل: فحص نوع npm


- الاسم: فحص التنسيق
التشغيل: تنسيق تشغيل npm: فحص


- الاسم: تشغيل الاختبارات
التشغيل: اختبار npm -- --تغطية


- الاسم: فحص SonarCloud
الاستخدامات: SonarSource/sonarcloud-github-action@master
البيئة:
GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
رمز SONAR: ${{ secrets.SONAR_TOKEN }}
مع:
الوسيطات: >
-Dsonar.projectKey=${{ github.repository_owner }}_${{ github.event.repository.name }}
-Dsonar.organization=${{ github.repository_owner }}
-Dsonar.sources=src
-Dsonar.tests=src
-Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx
-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
-Dsonar.typescript.lcov.reportPaths=coverage/lcov.info


- name: تحميل التغطية إلى Codecov
الاستخدامات: codecov/codecov-action@v3
مع:
الرمز: ${{ secrets.CODECOV_TOKEN }}
الملفات: ./coverage/lcov.info
العلامات: اختبارات الوحدات
الاسم: codecov-umbrella
fail_ci_if_error: صحيح
```

## خط أنابيب GitLab CI/CD لجودة الكود

```yaml
جودة الكود:
المرحلة: التحقق
الصورة: node:18
النص البرمجي:
- npm ci
- npm run lint
- npm run type-check
- npm run format: check
- npm test -- --coverage
- npm install -g sonarqube-scanner
- sonar-scanner -Dsonar.projectKey=${CI_PROJECT_PATH_SLUG} -Dsonar.sources=src -Dsonar.tests=src -Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info
artifacts:
paths:
- coverage/
reports:
junit: junit.xml
expire_in: 1 week
cache:
key: ${CI_COMMIT_REF_SLUG}
paths:
- node_modules/
```

## أفضل الممارسات لأتمتة جودة الكود

1. **الفشل السريع**: قم بتكوين أدوات التدقيق اللغوي والتنسيق للعمل في بداية عملية التطوير
2. **معايير متسقة**: فرض معايير ترميز متسقة عبر الفريق
3. **التنفيذ الآلي**: استخدم أدوات Git لمنع إرسال أكواد لا تفي بالمعايير
4. **المراقبة المستمرة**: دمج عمليات فحص جودة الكود في خطوط أنابيب CI/CD
5. **ملاحظات عملية**: تكوين أدوات لتقديم ملاحظات واضحة وعملية
6. **تحديثات منتظمة**: حافظ على تحديث قواعد التدقيق والتبعيات
7. **التوثيق**: توثيق معايير وعمليات جودة الكود
8. **موافقة الفريق**: تأكد من فهم الفريق للمعايير وموافقته عليها
9. **التنفيذ التدريجي**: تطبيق المعايير تدريجيًا لتجنب إرهاق الفريق
10. **قياس التحسين**: تتبع مقاييس جودة الكود بمرور الوقت لقياس التحسين

## قائمة التحقق من التنفيذ

- [ ] إعداد ESLint لتدقيق JavaScript/TypeScript
- [ ] إعداد Stylelint لتدقيق CSS/SCSS
- [ ] تكوين Prettier لـ تنسيق الكود
- [ ] إعداد TypeScript للتحقق من النوع
- [ ] تكوين SonarQube أو أداة مشابهة لتحليل الكود الثابت
- [ ] إعداد أدوات Git مع Husky وlint-staged
- [ ] تكوين Dependabot لإدارة التبعيات
- [ ] دمج عمليات التحقق من جودة الكود في أنابيب CI/CD
- [ ] توثيق معايير وعمليات جودة الكود
- [ ] تدريب الفريق على معايير وأدوات جودة الكود