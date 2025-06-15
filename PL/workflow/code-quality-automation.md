# Automatyzacja jakości kodu

Ten dokument zawiera standardowe konfiguracje i przepływy pracy służące do automatyzacji kontroli jakości kodu zgodnie ze standardami tworzenia stron internetowych.

## Konfiguracja lintingu 

### Konfiguracja ESLint (JavaScript/TypeScript) 

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
„parser”: „@typescript-eslint/parser”, 
„parserOptions”: { 
„ecmaFeatures”: { 
„jsx”: true 
}, 
„ecmaVersion”: 2021, 
„sourceType”: „module” 
}, 
„plugins”: [ 
„react”, 
„react-hooks”, 
„@typescript-eslint”, 
„jsx-a11y”, 
„import”, 
„prettier” 
], 
„rules”: { 
„no-console”: [„warn”, { „allow”: [„warn”, „error”] }], 
„no-unused-vars”: „off”, 
„@typescript-eslint/no-unused-vars”: [„error”, { „argsIgnorePattern”: „^_” }], 
"react/prop-types": "off", 
"react/react-in-jsx-scope": "off", 
"react-hooks/rules-of-hooks": "error", 
"react-hooks/exhaustive-deps": "warn", 
"import/order": [ 
"error", 
{ 
"groups": ["builtin", "external", "internal", "parent", "sibling", "index"], 
"newlines-between": "always", 
"alphabetize": { "order": "asc", "caseInsensitive": true } 
} 
], 
"jsx-a11y/anchor-is-valid": [ 
"error", 
{ 
"components": ["Link"], 
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

### Konfiguracja Stylelint (CSS/SCSS) 

```json 
{ 
"extends": [ 
"stylelint-config-standard", 
"stylelint-config-prettier" 
], 
"plugins": [ 
„stylelint-order” 
], 
„rules”: { 
„order/properties-alphabetical-order”: true, 
„color-hex-case”: „lower”, 
„color-hex-length”: „short”, 
„color-no-invalid-hex”: true, 
„declaration-colon-space-after”: „always”, 
„indentation”: 2, 
„max-empty-lines”: 1, 
„selector-pseudo-class-no-unknown”: [ 
true, 
{ 
„ignorePseudoClasses”: [„global”] 
} 
], 
„at-rule-no-unknown”: [ 
true, 
{ 
„ignoreAtRules”: [„tailwind”, „apply”, „variants”, „responsive”, „screen”] 
} 
], 
"no-descending-specificity": null 
} 
} 
``` 

## Formatowanie kodu 

### Konfiguracja Prettier 

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

## Statyczna analiza kodu 

### Konfiguracja SonarQube 

```json 
{ 
"sonar.projectKey": „nazwa-projektu”, 
„sonar.projectName”: „Nazwa projektu”, 
„sonar.projectVersion”: „1.0.0”, 
„sonar.sources”: „źródło”, 
„sonar.tests”: „źródło”, 
„sonar.test.inclusions”: „**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx”, 
„sonar.coverage.exclusions”: „**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx”, 
„sonar.javascript.lcov.reportPaths”: „coverage/lcov.info”, 
„sonar.typescript.lcov.reportPaths”: „coverage/lcov.info”, 
„sonar.exclusions”: „node_modules/**,build/**,dist/**,coverage/**,public/**,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx” 
} 
``` 

## Sprawdzanie typu 

### Konfiguracja TypeScript 

```json 
{ 
„compilerOptions”: { 
„target”: „es2020”, 
„lib”: [„dom”, „dom.iterable”, „esnext”], 
„allowJs”: true, 
„skipLibCheck”: true, 
„esModuleInterop”: true, 
„allowSyntheticDefaultImports”: prawda, 
„strict”: prawda, 
„forceConsistentCasingInFileNames”: prawda, 
„noFallthroughCasesInSwitch”: prawda, 
„module”: „esnext”, 
„moduleResolution”: „node”, 
„resolveJsonModule”: prawda, 
„isolatedModules”: prawda, 
„noEmit”: prawda, 
„jsx”: „react-jsx”, 
„baseUrl”: „src” 
}, 
„include”: [„src”], 
„exclude”: [„node_modules”, „build”, „dist”, „coverage”, „public”] 
} 
``` 

## Haki Git 

### Husky Konfiguracja 

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
„@commitlint/config-conventional” 
] 
} 
} 
``` 

## Zarządzanie zależnościami 

### Konfiguracja Dependabot 

```yaml 
wersja: 2 
aktualizacje: 
- ekosystem-pakietu: "npm" 
katalog: "/" 
harmonogram: 
interwał: "tygodniowy" 
limit-otwartych-żądań-ściągnięcia: 10 
strategia-wersji: zwiększ 
ignoruj: 
- nazwa-zależności: "*" 
typy-aktualizacji: ["aktualizacja-wersji: semver-major"] 
etykiety: 
- "zależności" 
- "automerge" 
komunikat-zatwierdzenia: 
prefiks: "chore" 
include: "scope" 
``` 

## Przepływ pracy akcji GitHub dla jakości kodu 

```yaml 
nazwa: Jakość kodu 

on: 
push: 
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

- nazwa: SonarCloud Scan 
używa: SonarSource/sonarcloud-github-action@master 
środowisko: 
GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} 
SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }} 
z: 
args: > 
-Dsonar.projectKey=${{ github.repository_owner }}_${{ github.event.repository.name }} 
-Dsonar.organization=${{ github.repository_owner }} 
-Dsonar.sources=src 
-Dsonar.tests=src 
-Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx 
-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info 
-Dsonar.typescript.lcov.reportPaths=coverage/lcov.info 

- name: Prześlij pokrycie do Codecov 
używa: codecov/codecov-action@v3 
z: 
tokenem: ${{ secrets.CODECOV_TOKEN }} 
plikami: ./coverage/lcov.info 
flagami: unittests 
name: codecov-umbrella 
fail_ci_if_error: true 
``` 

## GitLab CI/CD Pipeline dla kodu Jakość 

```yaml 
jakość-kodu: 
etap: walidacja 
obraz: węzeł:18 
skrypt: 
- npm ci 
- npm run lint 
- npm run type-check 
- npm run format:check 
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

## Najlepsze praktyki automatyzacji jakości kodu 

1. **Fail Fast**: Skonfiguruj lintery i formatery, aby działały wcześnie w procesie rozwoju 
2. **Consistent Standards**: Wymuszaj spójne standardy kodowania w całym zespole 
3. **Automatyczne wymuszanie**: Używaj haków Git, aby zapobiec zatwierdzaniu kodu, który nie spełnia standardów 
4. **Ciągły monitoring**: Zintegruj kontrole jakości kodu z procesami CI/CD 
5. **Actionable Feedback**: Skonfiguruj narzędzia, aby zapewnić jasne, wykonalne feedback 
6. **Regularne aktualizacje**: aktualizuj reguły lintingu i zależności 
7. **Dokumentacja**: dokumentuj standardy i procesy jakości kodu 
8. **Zaangażowanie zespołu**: upewnij się, że zespół rozumie i akceptuje standardy 
9. **Stopniowa implementacja**: wdrażaj standardy stopniowo, aby nie przytłoczyć zespołu 
10. **Pomiar poprawy**: śledź metryki jakości kodu w czasie, aby mierzyć poprawę 

## Lista kontrolna implementacji 

- [ ] Skonfiguruj ESLint do lintingu JavaScript/TypeScript 
- [ ] Skonfiguruj Stylelint do lintingu CSS/SCSS 
- [ ] Skonfiguruj Prettier do formatowania kodu 
- [ ] Skonfiguruj TypeScript do sprawdzania typów 
- [ ] Skonfiguruj SonarQube lub podobne narzędzie do statycznej analizy kodu 
- [ ] Skonfiguruj haki Git z Husky i lint-staged 
- [ ] Skonfiguruj Dependabot do zależności zarządzanie
- [ ] Zintegruj kontrole jakości kodu z procesami CI/CD
- [ ] Udokumentuj standardy i procesy jakości kodu
- [ ] Przeszkol zespół w zakresie standardów i narzędzi jakości kodu