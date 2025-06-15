# การตรวจสอบคุณภาพโค้ดอัตโนมัติ

เอกสารนี้จัดทำการกำหนดค่าและเวิร์กโฟลว์มาตรฐานสำหรับการตรวจสอบคุณภาพโค้ดอัตโนมัติตามมาตรฐานการพัฒนาเว็บ
## การกำหนดค่า Linting 

### การกำหนดค่า ESLint (JavaScript/TypeScript) 

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
"parser": "@typescript-eslint/parser", 
"parserOptions": { 
"ecmaFeatures": { 
"jsx": true 
}, 
"ecmaVersion": 2021, 
"sourceType": "module" 
}, 
"plugins": [ 
"react", 
"react-hooks", 
"@typescript-eslint", 
"jsx-a11y", 
"import", 
"prettier" 
], 
"rules": { 
"no-console": ["warn", { "allow": ["warn", "error"] }], 
"no-unused-vars": "off", 
"@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }], 
"react/prop-types": "ปิด", 
"react/react-in-jsx-scope": "ปิด", 
"react-hooks/rules-of-hooks": "ข้อผิดพลาด", 
"react-hooks/exhaustive-deps": "เตือน", 
"นำเข้า/สั่งซื้อ": [ 
"ข้อผิดพลาด", 
{ 
"กลุ่ม": ["ในตัว", "ภายนอก", "ภายใน", "ผู้ปกครอง", "พี่น้อง", "ดัชนี"], 
"บรรทัดใหม่ระหว่างบรรทัด": "เสมอ", 
"เรียงตามตัวอักษร": { "สั่งซื้อ": "เรียงตามลำดับ", "ไม่คำนึงถึงตัวพิมพ์เล็กและตัวพิมพ์ใหญ่": จริง } 
} 
], 
"jsx-a11y/anchor-is-valid": [ 
"ข้อผิดพลาด", 
{ 
"ส่วนประกอบ": ["ลิงก์"], 
"ลิงก์พิเศษ": ["hrefLeft", "hrefRight"], 
"aspects": ["invalidHref", "preferButton"] 
} 
] 
}, 
"การตั้งค่า": { 
"react": { 
"version": "detect" 
}, 
"นำเข้า/ตัวแก้ปัญหา": { 
"typescript": {}, 
"node": { 
"ส่วนขยาย": [".js", ".jsx", ".ts", ".tsx"] 
} 
} 
} 
} 
``` 

### การกำหนดค่า Stylelint (CSS/SCSS) 

```json 
{ 
"extends": [ 
"stylelint-config-standard", 
"stylelint-config-prettier" 
], 
"ปลั๊กอิน": [ 
"stylelint-order" 
], 
"กฎ": { 
"order/properties-alphabetical-order": true, 
"color-hex-case": "lower", 
"color-hex-length": "short", 
"color-no-invalid-hex": true, 
"declaration-colon-space-after": "always", 
"indentation": 2, 
"max-empty-lines": 1, 
"selector-pseudo-class-no-unknown": [ 
true, 
{ 
"ignorePseudoClasses": ["global"] 
} 
], 
"at-rule-no-unknown": [ 
true, 
{ 
"ignoreAtRules": ["tailwind", "apply", "variants", "responsive", "screen"] 
} 
], 
"no-descending-specificity": null 
} 
} 
``` 

## การจัดรูปแบบโค้ด 

### การกำหนดค่าที่สวยงามกว่า 

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

## การวิเคราะห์โค้ดแบบคงที่ 

### การกำหนดค่า SonarQube 

```json 
{ 
"sonar.projectKey": "ชื่อโครงการ", 
"sonar.projectName": "ชื่อโครงการ", 
"sonar.projectVersion": "1.0.0", 
"sonar.sources": "src", 
"sonar.tests": "src", 
"sonar.test.inclusions": "**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx", 
"sonar.coverage.exclusions": "**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx", "sonar.javascript.lcov.reportPaths": "coverage/lcov.info", 
"sonar.typescript.lcov.reportPaths": "coverage/lcov.info", 
"sonar.exclusions": "node_modules/**,build/**,dist/**,coverage/**,public/**,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx" 
} 
``` 

## การตรวจสอบประเภท 

### การกำหนดค่า TypeScript 

```json 
{ 
"compilerOptions": { 
"target": "es2020", 
"lib": ["dom", "dom.iterable", "esnext"], 
"allowJs": true, 
"skipLibCheck": จริง, 
"esModuleInterop": จริง, 
"allowSyntheticDefaultImports": จริง, 
"strict": จริง, 
"forceConsistentCasingInFileNames": จริง, 
"noFallthroughCasesInSwitch": จริง, 
"module": "esnext", 
"moduleResolution": "node", 
"resolveJsonModule": จริง, 
"isolation": จริง, 
"noEmit": จริง, 
"jsx": "react-jsx", 
"baseUrl": "src" 
}, 
"include": ["src"], 
"exclude": ["node_modules", "build", "dist", "coverage", "public"] 
} 
``` 

## Git Hooks 

### Husky การกำหนดค่า 

```json 
{ 
"husky": { 
"hooks": { 
"pre-commit": "lint-staged", 
"commit-msg": "commitlint -E HUSKY_GIT_PARAMS" 
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

## การจัดการการอ้างอิง 

### การกำหนดค่า Dependabot 

```yaml 
version: 2 
updates: 
- package-ecosystem: "npm" 
directory: "/" 
schedule: 
interval: "weekly" 
open-pull-requests-limit: 10 
versioning-strategy: increase 
ignore: 
- dependency-name: "*" 
update-types: ["version-update:semver-major"] 
labels: 
- "dependencies" 
- "automerge" 
commit-message: 
prefix: "chore" 
include: "scope" 
``` 

## เวิร์กโฟลว์ GitHub Actions สำหรับคุณภาพของโค้ด 

```yaml 
name: โค้ด คุณภาพ 

on: 
push: 
branches: [ main, develop ] 
pull_request: 
branches: [ main, develop ] 

jobs: 
code-quality: 
run-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 
with: 
fetch-depth: 0 

- name: Setup Node.js 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: Install dependencies 
run: npm ci 

- name: Lint 
run: npm run lint 

- name: Type check 
run: npm run type-check 

- name: Format check 
run: npm run format:check 

- name: Run tests 
run: npm test -- --coverage 

- name: SonarCloud Scan 
uses: SonarSource/sonarcloud-github-action@master 
env: 
GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} 
SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }} 
with: 
args: > 
-Dsonar.projectKey=${{ github.repository_owner }}_${{ github.event.repository.name }} 
-Dsonar.organization=${{ github.repository_owner }} 
-Dsonar.sources=src 
-Dsonar.tests=src 
-Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx 
-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info 
-Dsonar.typescript.lcov.reportPaths=coverage/lcov.info 

- name: อัปโหลด coverage ไปยัง Codecov 
ใช้: codecov/codecov-action@v3 
ด้วย: 
โทเค็น: ${{ secrets.CODECOV_TOKEN }} 
ไฟล์: ./coverage/lcov.info 
แฟล็ก: unittests 
ชื่อ: codecov-umbrella 
fail_ci_if_error: true 
``` 

## ไพพ์ไลน์ GitLab CI/CD สำหรับคุณภาพโค้ด 

```yaml 
code-quality: 
stage: ตรวจสอบ 
image: node:18 
script: 
- npm ci 
- npm run lint 
- npm run type-check 
- npm run รูปแบบ: ตรวจสอบ 
- npm test -- --coverage 
- npm install -g sonarqube-scanner 
- sonar-scanner -Dsonar.projectKey=${CI_PROJECT_PATH_SLUG} -Dsonar.sources=src -Dsonar.tests=src -Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info 
artifacts: 
paths: 
- coverage/ 
reports: 
junit: junit.xml 
expire_in: 1 สัปดาห์ 
cache: 
key: ${CI_COMMIT_REF_SLUG} 
paths: 
- node_modules/ 
``` 

## แนวทางปฏิบัติที่ดีที่สุดสำหรับการควบคุมคุณภาพโค้ดอัตโนมัติ 

1. **ล้มเหลวเร็ว**: กำหนดค่าตัวตรวจสอบและตัวจัดรูปแบบให้ทำงานในช่วงเริ่มต้นของกระบวนการพัฒนา 
2. **มาตรฐานที่สอดคล้องกัน**: บังคับใช้มาตรฐานการเขียนโค้ดที่สอดคล้องกันทั่วทั้งทีม 
3. **การบังคับใช้อัตโนมัติ**: ใช้ Git hooks เพื่อป้องกันไม่ให้คอมมิตโค้ดที่ไม่ตรงตามมาตรฐาน 
4. **การตรวจสอบอย่างต่อเนื่อง**: รวมการตรวจสอบคุณภาพโค้ดเข้ากับไปป์ไลน์ CI/CD 
5. **ข้อเสนอแนะที่ดำเนินการได้**: กำหนดค่าเครื่องมือเพื่อให้ข้อเสนอแนะที่ชัดเจนและดำเนินการได้ 
6. **การอัปเดตเป็นประจำ**: อัปเดตกฎการตรวจสอบและการอ้างอิงให้ทันสมัยอยู่เสมอ 
7. **การจัดทำเอกสาร**: จัดทำเอกสารมาตรฐานและกระบวนการด้านคุณภาพโค้ด 
8. **ทีมเห็นด้วย**: ให้แน่ใจว่าทีมเข้าใจและเห็นด้วยกับมาตรฐาน 
9. **การนำไปใช้แบบค่อยเป็นค่อยไป**: ค่อยๆ นำมาตรฐานมาใช้เพื่อหลีกเลี่ยงไม่ให้ทีมทำงานหนักเกินไป 
10. **วัดผลการปรับปรุง**: ติดตามเมตริกคุณภาพของโค้ดในช่วงเวลาหนึ่งเพื่อวัดการปรับปรุง

## รายการตรวจสอบการใช้งาน

- [ ] ตั้งค่า ESLint สำหรับการลินต์ JavaScript/TypeScript
- [ ] ตั้งค่า Stylelint สำหรับการลินต์ CSS/SCSS
- [ ] กำหนดค่า Prettier สำหรับการจัดรูปแบบโค้ด
- [ ] ตั้งค่า TypeScript สำหรับการตรวจสอบประเภท
- [ ] กำหนดค่า SonarQube หรือเครื่องมือที่คล้ายกันสำหรับการวิเคราะห์โค้ดแบบคงที่
- [ ] ตั้งค่า Git hooks ด้วย Husky และ lint-staged
- [ ] กำหนดค่า Dependabot สำหรับการจัดการการอ้างอิง
- [ ] รวมการตรวจสอบคุณภาพของโค้ดเข้ากับไปป์ไลน์ CI/CD
- [ ] จัดทำเอกสารมาตรฐานและกระบวนการคุณภาพของโค้ด
- [ ] ฝึกอบรมทีมงานเกี่ยวกับมาตรฐานและเครื่องมือคุณภาพของโค้ด