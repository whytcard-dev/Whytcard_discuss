# Автоматизація якості коду

Цей документ містить стандартизовані конфігурації та робочі процеси для автоматизації перевірок якості коду відповідно до стандартів веб-розробки.

## Конфігурація лінтингу 

### Конфігурація ESLint (JavaScript/TypeScript) 

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
"react/prop-types": "вимкнено", 
"react/react-in-jsx-scope": "вимкнено", 
"react-hooks/rules-of-hooks": "помилка", 
"react-hooks/exhaustive-deps": "попередження", 
"import/order": [ 
"помилка", 
{ 
"groups": ["вбудований", "зовнішній", "внутрішній", "батьківський", "сіблінг", "індекс"], 
"newlines-between": "завжди", 
"алфавітний порядок": { "order": "asc", "caseInsensitive": true } 
} 
], 
"jsx-a11y/anchor-is-valid": [ 
"помилка", 
{ 
"components": ["Посилання"], 
"specialLink": ["hrefLeft", "hrefRight"], 
"аспекти": ["invalidHref", "preferButton"] 
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

### Конфігурація Stylelint (CSS/SCSS) 

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

## Код Форматування

### Гарніша конфігурація

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

## Статичний аналіз коду

### Конфігурація SonarQube

```json
{ 
"sonar.projectKey": "назва проекту", 
"sonar.projectName": "Назва проекту", 
"sonar.projectVersion": "1.0.0", 
"sonar.sources": "src", 
"sonar.tests": "вихідний код", 
"sonar.test.inclusions": "**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx", 
"sonar.coverage.exclusions": "**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx", 
"sonar.javascript.lcov.reportPaths": "coverage/lcov.info", 
"sonar.typescript.lcov.reportPaths": "coverage/lcov.info", 
"sonar.exclusions": "node_modules/**,build/**,dist/**,coverage/**,public/**,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx" 
} 
``` 

## Перевірка типів 

### Конфігурація TypeScript 

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

## Git-хуки 

### Конфігурація Husky 

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

## Керування залежностями 

### Конфігурація Dependabot 

```yaml 
версія: 2 
оновлення: 
- екосистема пакета: "npm" 
каталог: "/" 
розклад: 
інтервал: "щотижня" 
open-pull-requests-limit: 10 
versioning-strategy: increase ignore: - dependencies-name: "*" update-types: ["version-update:semver-major"] labels: - "dependencies" - "automerge" commit-message: prefix: "chore" include: "scope" 
``` 

## Робочий процес дій GitHub для якості коду 

```yaml 
name: Якість коду 

on: push: 
branches: [ main, develop ] 
pull_request: 
branches: [ main, develop ] 

jobs: 
code-quality: 
runs-on: ubuntu-latest 
steps: 
- uses: actions/checkout@v3 
with: 
fetch-depth: 0 

- name: Налаштування Node.js 
uses: actions/setup-node@v3 
з: 
версія вузла: '18' 
кеш: 'npm' 

- назва: Встановити залежності 
run: npm ci 

- назва: Lint 
run: npm run lint 

- назва: Перевірка типу 
run: npm run type-check 

- назва: Перевірка формату 
run: npm run format:check 

- назва: Запустити тести 
run: npm test -- --coverage 

- назва: SonarCloud Scan 
використовує: SonarSource/sonarcloud-github-action@master середовище: GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }} з: аргументи: > 
-Dsonar.projectKey=${{ github.repository_owner }}_${{ github.event.repository.name }} 
-Dsonar.organization=${{ github.repository_owner }} 
-Dsonar.sources=src 
-Dsonar.tests=src 
-Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx 
-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info 
-Dsonar.typescript.lcov.reportPaths=coverage/lcov.info 

- назва: Завантажити покриття до Codecov 
використовує: codecov/codecov-action@v3 
з: 
токен: ${{ secrets.CODECOV_TOKEN }} 
файли: ./coverage/lcov.info 
прапорці: unittests 
назва: codecov-umbrella 
fail_ci_if_error: true 
``` 

## GitLab CI/CD конвеєр для якості коду 

```yaml 
якість коду: 
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
артефакти: 
шляхи: 
- coverage/ 
звіти: 
junit: junit.xml 
expire_in: 1 тиждень 
кеш: 
ключ: ${CI_COMMIT_REF_SLUG} 
шляхи: 
- node_modules/ 
``` 

## Найкращі практики для автоматизації якості коду 

1. **Швидкі збої**: налаштуйте лінтери та форматтери для запуску на ранніх етапах процесу розробки 
2. **Узгоджені стандарти**: забезпечте дотримання узгоджених стандартів кодування по всій команді 
3. **Автоматизоване застосування**: використовуйте перехоплювачі Git, щоб запобігти фіксації коду, який не відповідає стандартам стандарти
4. **Безперервний моніторинг**: Інтегруйте перевірки якості коду в конвеєри CI/CD
5. **Зворотній зв'язок, що використовується для дій**: Налаштуйте інструменти для надання чіткого та зрозумілого зворотного зв'язку
6. **Регулярні оновлення**: Підтримуйте правила лінтингу та залежності в актуальному стані
7. **Документація**: Документуйте стандарти та процеси якості коду
8. **Згода команди**: Переконайтеся, що команда розуміє та погоджується зі стандартами
9. **Поступове впровадження**: Впроваджуйте стандарти поступово, щоб уникнути перевантаження команди
10. **Вимірювання покращення**: Відстежуйте показники якості коду з часом, щоб вимірювати покращення

## Контрольний список впровадження

- [ ] Налаштуйте ESLint для лінтингу JavaScript/TypeScript
- [ ] Налаштуйте Stylelint для лінтингу CSS/SCSS
- [ ] Налаштуйте Prettier для форматування коду
- [ ] Налаштуйте TypeScript для перевірки типів
- [ ] Налаштуйте SonarQube або подібний інструмент для статичного аналізу коду
- [ ] Налаштуйте гачки Git за допомогою Husky та lint-staged
- [ ] Налаштування Dependabot для керування залежностями
- [ ] Інтеграція перевірок якості коду в конвеєри CI/CD
- [ ] Документування стандартів та процесів якості коду
- [ ] Навчання команди стандартам та інструментам якості коду