# 코드 품질 자동화

이 문서는 웹 개발 표준에 따라 코드 품질 검사를 자동화하기 위한 표준화된 구성과 워크플로를 제공합니다.

## 린팅 구성

### ESLint 구성(JavaScript/TypeScript) 

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
"sourceType": "모듈" 
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
"no-console": ["경고", { "allow": ["경고", "오류"] }], 
"no-unused-vars": "끄기", 
"@typescript-eslint/no-unused-vars": ["오류", { "argsIgnorePattern": "^_" }], 
"react/prop-types": "꺼짐", 
"react/react-in-jsx-scope": "꺼짐", 
"react-hooks/rules-of-hooks": "오류", 
"react-hooks/exhaustive-deps": "경고", 
"import/order": [ 
"오류", 
{ 
"groups": ["내장", "외부", "내부", "부모", "형제", "색인"], 
"newlines-between": "항상", 
"alphabetize": { "order": "오류", "caseInsensitive": true } 
} 
], 
"jsx-a11y/anchor-is-valid": [ 
"오류", 
{ 
"components": ["링크"], 
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

### Stylelint 구성(CSS/SCSS) 

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

## 코드 서식 

### 더 보기 좋은 구성 

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

## 정적 코드 분석

### SonarQube 구성

```json 
{ 
"sonar.projectKey": "프로젝트 이름", 
"sonar.projectName": "프로젝트 이름", 
"sonar.projectVersion": "1.0.0", 
"sonar.sources": "소스", 
"sonar.tests": "소스", 
"sonar.test.inclusions": "**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx", 
"sonar.coverage.exclusions": "**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx", 
"sonar.javascript.lcov.reportPaths": "coverage/lcov.info", 
"sonar.typescript.lcov.reportPaths": "coverage/lcov.info", 
"sonar.exclusions": "node_modules/**,build/**,dist/**,coverage/**,public/**,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx" 
} 
``` 

## 타입 검사

### 타입스크립트 구성

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

### Husky 설정 

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

## 종속성 관리 

### Dependabot 구성 

```yaml 
버전: 2 
업데이트: 
- 패키지 생태계: "npm" 
디렉터리: "/" 
일정: 
간격: "주간" 
open-pull-requests-limit: 10 
버전 관리 전략: 증가 
무시: 
- 종속성 이름: "*" 
업데이트 유형: ["version-update:semver-major"] 
레이블: 
- "종속성" 
- "자동 병합" 
커밋 메시지: 
접두사: "chore" 
포함: "범위" 
``` 

## 코드 품질을 위한 GitHub Actions 워크플로

```yaml
이름: 코드 품질

on: 
push: 
branchs: [main, develop] 
pull_request: 
branchs: [main, develop] 

jobs: 
code-quality: 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 
with: 
fetch-depth: 0 

- name: Node.js 설치 
uses: actions/setup-node@v3 
with: 
node-version: '18' 
cache: 'npm' 

- name: 종속성 설치 
run: npm ci 

- name: Lint 
run: npm run lint

- 이름: 유형 검사
실행: npm run type-check

- 이름: 형식 검사
실행: npm run format:check

- 이름: 테스트 실행
실행: npm test -- --coverage

- 이름: SonarCloud Scan
사용: SonarSource/sonarcloud-github-action@master
환경: 
GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} 
SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }} 
다음과 함께: 
인수: > 
-Dsonar.projectKey=${{ github.repository_owner }}_${{ github.event.repository.name }} 
-Dsonar.organization=${{ github.repository_owner }} 
-Dsonar.sources=src
-Dsonar.tests=src
-Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx
-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
-Dsonar.typescript.lcov.reportPaths=coverage/lcov.info

- name: Codecov에 커버리지 업로드
uses: codecov/codecov-action@v3
with: 
token: ${{ secrets.CODECOV_TOKEN }}
files: ./coverage/lcov.info
flags: unittests
name: codecov-umbrella
fail_ci_if_error: true
```

## GitLab 코드용 CI/CD 파이프라인 품질

```yaml
코드 품질:
단계: 검증
이미지: 노드:18
스크립트:
- npm ci
- npm 실행 lint
- npm 실행 type-check
- npm 실행 format:check
- npm test -- --coverage
- npm install -g sonarqube-scanner
- sonar-scanner -Dsonar.projectKey=${CI_PROJECT_PATH_SLUG} -Dsonar.sources=src -Dsonar.tests=src -Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info
아티팩트:
경로: 
- coverage/ 
보고서: 
junit: junit.xml 
expire_in: 1 week 
캐시: 
키: ${CI_COMMIT_REF_SLUG} 
경로: 
- node_modules/ 
``` 

## 코드 품질 자동화 모범 사례

1. **빠른 실패**: 개발 프로세스 초기에 실행되도록 린터와 포매터를 구성합니다.
2. **일관된 표준**: 팀 전체에 일관된 코딩 표준을 적용합니다.
3. **자동화 적용**: Git 후크를 사용하여 표준을 충족하지 않는 코드의 커밋을 방지합니다.
4. **지속적인 모니터링**: CI/CD 파이프라인에 코드 품질 검사를 통합합니다.
5. **실행 가능한 피드백**: 명확하고 실행 가능한 피드백을 제공하는 도구를 구성합니다.
6. **정기 업데이트**: 린팅 규칙과 종속성을 최신 상태로 유지합니다.
7. **문서화**: 코드 품질 표준 및 프로세스를 문서화합니다.
8. **팀 참여**: 팀이 표준을 이해하고 동의하도록 합니다.
9. **점진적 구현**: 팀에 부담을 주지 않도록 표준을 점진적으로 구현합니다.
10. **개선 측정**: 개선 사항을 측정하기 위해 시간 경과에 따른 코드 품질 지표를 추적합니다.

## 구현 체크리스트

- [ ] JavaScript/TypeScript 린팅을 위한 ESLint 설정
- [ ] CSS/SCSS 린팅을 위한 Stylelint 설정
- [ ] 코드 서식 지정을 위한 Prettier 구성
- [ ] 유형 검사를 위한 TypeScript 설정
- [ ] 정적 코드 분석을 위한 SonarQube 또는 유사 도구 구성
- [ ] Husky 및 lint-staged를 사용하여 Git 후크 설정
- [ ] 종속성 관리를 위한 Dependabot 구성
- [ ] CI/CD 파이프라인에 코드 품질 검사 통합
- [ ] 코드 품질 표준 및 프로세스 문서화
- [ ] 팀원에게 코드 품질 표준 및 도구 교육