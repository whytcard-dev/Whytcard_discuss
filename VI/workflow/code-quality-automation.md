# Tự động hóa chất lượng mã 

Tài liệu này cung cấp các cấu hình và quy trình làm việc được chuẩn hóa để tự động hóa việc kiểm tra chất lượng mã theo các tiêu chuẩn phát triển web. 

## Cấu hình Linting

### Cấu hình ESLint (JavaScript/TypeScript)

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
"react/prop-types": "tắt", 
"react/react-in-jsx-scope": "tắt", 
"react-hooks/rules-of-hooks": "lỗi", 
"react-hooks/exhaustive-deps": "cảnh báo", 
"import/order": [ 
"lỗi", 
{ 
"groups": ["builtin", "external", "internal", "parent", "sibling", "index"], 
"newlines-between": "always", 
"alphabetize": { "order": "asc", "caseInsensitive": true } 
} 
], 
"jsx-a11y/anchor-is-valid": [ 
"lỗi", 
{ 
"components": ["Liên kết"], 
"specialLink": ["hrefLeft", "hrefRight"], 
"aspects": ["invalidHref", "preferButton"] 
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
} 

``` 

### Cấu hình Stylelint (CSS/SCSS) 

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

## Định dạng mã 

### Cấu hình đẹp hơn 

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

## Phân tích mã tĩnh 

### Cấu hình SonarQube 

```json
{ 
"sonar.projectKey": "project-name", 
"sonar.projectName": "Tên dự án", 
"sonar.projectVersion": "1.0.0", 
"sonar.sources": "src", 
"sonar.tests": "src", 
"sonar.test.inclusions": "**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx", 
"sonar.coverage.exclusions": "**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx", 
"sonar.javascript.lcov.reportPaths": "coverage/lcov.info", 
"sonar.typescript.lcov.reportPaths": "coverage/lcov.info", 
"sonar.exclusions": "node_modules/**,build/**,dist/**,coverage/**,public/**,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx"
}
```

## Kiểm tra kiểu

### Cấu hình TypeScript

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
"noFallthroughCasesInSwitch": true,
"module": "esnext",
"moduleResolution": "node",
"resolveJsonModule": true,
"isolatedModules": true,
"noEmit": true,
"jsx": "react-jsx",
"baseUrl": "src" 
},
"include": ["src"],
"exclude": ["node_modules", "build", "dist", "coverage", "public"]
}
``` 

## Git Hooks 

### Cấu hình Husky 

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

## Quản lý phụ thuộc 

## Cấu hình Dependabot 

```yaml 
phiên bản: 2 
cập nhật: 
- hệ sinh thái gói: "npm" 
thư mục: "/" 
lịch trình: 
khoảng thời gian: "hàng tuần" 
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

## GitHub Actions Workflow cho Code Quality 

```yaml 
name: Code Quality 

on: 
push: 
branches: [ main, development ] 
pull_request: 
branches: [ main, development ] 

jobs: 
code-quality: 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 
with: 
fetch-depth: 0 

- name: Thiết lập Node.js 
uses: actions/setup-node@v3 
với: 
node-version: '18' 
cache: 'npm' 

- name: Cài đặt các phụ thuộc 
run: npm ci 

- name: Lint 
run: npm run lint 

- name: Kiểm tra kiểu 
run: npm run type-check 

- name: Kiểm tra định dạng 
run: npm run format:check 

- name: Chạy thử nghiệm 
run: npm test -- --coverage 

- name: SonarCloud Scan 
uses: SonarSource/sonarcloud-github-action@master 
env: 
GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} 
SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }} 
với: 
args: > 
-Dsonar.projectKey=${{ github.repository_owner }}_${{ github.event.repository.name }} 
-Dsonar.organization=${{ github.repository_owner }} 
-Dsonar.sources=src 
-Dsonar.tests=src 
-Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx 
-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info 
-Dsonar.typescript.lcov.reportPaths=coverage/lcov.info 

- name: Tải phạm vi lên Codecov 
sử dụng: codecov/codecov-action@v3 
với: 
token: ${{ secrets.CODECOV_TOKEN }} 
tệp: ./coverage/lcov.info 
cờ: unittests 
tên: codecov-umbrella 
fail_ci_if_error: true 
``` 

## GitLab CI/CD Pipeline cho chất lượng mã 

```yaml 
code-quality: 
stage: validate 
image: node:18 
script: 
- npm ci 
- npm run lint 
- npm run type-check 
- npm run format:check 
- npm test -- --coverage 
- npm install -g sonarqube-scanner 
- sonar-scanner -Dsonar.projectKey=${CI_PROJECT_PATH_SLUG} -Dsonar.sources=src -Dsonar.tests=src -Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info 
artifact: 
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

## Các phương pháp hay nhất để tự động hóa chất lượng mã 

1. **Fail Fast**: Cấu hình các trình kiểm tra lỗi và trình định dạng để chạy sớm trong quá trình phát triển 
2. **Tiêu chuẩn nhất quán**: Thực thi các tiêu chuẩn mã hóa nhất quán trong toàn nhóm 
3. **Thực thi tự động**: Sử dụng Git hooks để ngăn chặn việc cam kết mã không đáp ứng các tiêu chuẩn 
4. **Giám sát liên tục**: Tích hợp các kiểm tra chất lượng mã vào các đường ống CI/CD 
5. **Phản hồi có thể thực hiện được**: Cấu hình các công cụ để cung cấp thông tin rõ ràng, phản hồi có thể thực hiện được
6. **Cập nhật thường xuyên**: Cập nhật các quy tắc và phụ thuộc của linting
7. **Tài liệu**: Tài liệu về các tiêu chuẩn và quy trình về chất lượng mã
8. **Sự đồng thuận của nhóm**: Đảm bảo nhóm hiểu và đồng ý với các tiêu chuẩn
9. **Triển khai dần dần**: Triển khai các tiêu chuẩn dần dần để tránh làm nhóm quá tải
10. **Đo lường sự cải thiện**: Theo dõi các số liệu về chất lượng mã theo thời gian để đo lường sự cải thiện

## Danh sách kiểm tra triển khai

- [ ] Thiết lập ESLint để kiểm tra linting JavaScript/TypeScript
- [ ] Thiết lập Stylelint để kiểm tra linting CSS/SCSS
- [ ] Cấu hình Prettier để định dạng mã
- [ ] Thiết lập TypeScript để kiểm tra kiểu
- [ ] Cấu hình SonarQube hoặc công cụ tương tự để phân tích mã tĩnh
- [ ] Thiết lập Git hooks với Husky và lint-staged
- [ ] Cấu hình Dependabot để quản lý phụ thuộc
- [ ] Tích hợp kiểm tra chất lượng mã vào CI/CD pipelines
- [ ] Tài liệu về tiêu chuẩn và quy trình chất lượng mã
- [ ] Đào tạo nhóm về tiêu chuẩn và công cụ chất lượng mã