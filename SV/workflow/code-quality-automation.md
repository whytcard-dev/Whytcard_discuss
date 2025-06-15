# Automatisering av kodkvalitet

Detta dokument tillhandahåller standardiserade konfigurationer och arbetsflöden för att automatisera kodkvalitetskontroller enligt webbutvecklingsstandarder.

## Linting-konfiguration 

### ESLint-konfiguration (JavaScript/TypeScript) 

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
"react/prop-types": "off", 
"react/react-in-jsx-scope": "av", 
"react-hooks/rules-of-hooks": "fel", 
"react-hooks/exhaustive-deps": "varna", 
"import/order": [ 
"fel", 
{ 
"groups": ["inbyggd", "extern", "intern", "förälder", "syskon", "index"], 
"newlines-between": "alltid", 
"alphabetize": { "order": "asc", "caseInsensitive": true } 
} 
], 
"jsx-a11y/anchor-is-valid": [ 
"fel", 
{ 
"components": ["Länk"], 
"specialLänk": ["hrefVänster", "hrefHöger"], 
"aspects": ["ogiltigHref", "preferButton"] 
} 
] 
}, 
"inställningar": { 
"react": { 
"version": "upptäcka" 
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

### Stylelint-konfiguration (CSS/SCSS) 

```json 
{ 
"extends": [ 
"stylelint-config-standard", 
"stylelint-config-prettier" 
], 
"plugins": [ 
"stylelint-order" 
], 
"regler": { 
"order/properties-alphabetical-order": true, 
"color-hex-case": "lower", 
"color-hex-length": "short", 
"color-no-invalid-hex": true, 
"declaration-colon-space-after": "always", 
"indrag": 2, 
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
} 
``` 

## Kodformatering 

### Snyggare konfiguration 

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

## Statisk kodanalys 

### SonarQube-konfiguration 

```json 
{ 
"sonar.projectKey": "projektnamn", 
"sonar.projectName": "Projektnamn", 
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

## Typkontroll 

### TypeScript-konfiguration 

```json 
{ 
"compilerOptions": { 
"target": "es2020", 
"lib": ["dom", "dom.iterable", "esnext"], 
"allowJs": sant, 
"skipLibCheck": sant, 
"esModuleInterop": sant, 
"allowSyntheticDefaultImports": sant, 
"strict": sant, 
"forceConsistentCasingInFileNames": sant, 
"noFallthroughCasesInSwitch": sant, 
"module": "esnext", 
"moduleResolution": "node", 
"resolveJsonModule": sant, 
"isolatedModules": sant, 
"noEmit": sant, 
"jsx": "react-jsx", 
"baseUrl": "src" 
}, 
"include": ["src"], 
"exclude": ["node_modules", "build", "dist", "coverage", "public"] 
} 
``` 

## Git Hooks 

### Husky-konfiguration 

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

## Beroendehantering 

### Dependabot-konfiguration 

```yaml 
version: 2 
uppdateringar: 
- paket-ekosystem: "npm" 
katalog: "/" 
schema: 
intervall: "veckovis" 
gräns för open-pull-requests: 10 
versionsstrategi: öka 
ignorera: 
- beroendenamn: "*" 
uppdateringstyper: ["versionsuppdatering:semver-stor"] 
etiketter: 
- "beroenden" 
- "automerge" 
commit-meddelande: 
prefix: "chore" 
include: "scope" 
``` 

## GitHub Åtgärdsarbetsflöde för kodkvalitet

```yaml
namn: Kodkvalitet

på:
push:
branches:[main,develop]
pull_request:
branches:[main,develop]

jobs:
code-quality:
runs-on:ubuntu-latest
steg:
-använder: actions/checkout@v3
med:
fetch-depth: 0
-namn:
-använder: actions/setup-node@v3
med:
node-version: '18'
cache: 'npm'
-namn:
Installera beroenden
run: npm ci
-namn:
Lint
run: npm run lint
-namn:
Typkontroll
run: npm run type-check
-namn:
Formatkontroll
run: npm run format:check
-namn:
Kör tester kör: npm-test -- --täckning 

- namn: SonarCloud Scan använder: SonarSource/sonarcloud-github-action@master miljö: GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }} med: argument: > -Dsonar.projectKey=${{ github.repository_owner }}_${{ github.event.repository.namn }} -Dsonar.organization=${{ github.repository_owner }} -Dsonar.sources=källa -Dsonar.tests=källa -Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx 
-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info 
-Dsonar.typescript.lcov.reportPaths=coverage/lcov.info 

- namn: Ladda upp täckning till Codecov 
använder: codecov/codecov-action@v3 
med: 
token: ${{ secrets.CODECOV_TOKEN }} 
filer: ./coverage/lcov.info 
flaggor: enhetstester 
namn: codecov-umbrella 
fail_ci_if_error: sant 
``` 

## GitLab CI/CD-pipeline för kodkvalitet 

```yaml 
kodkvalitet: 
stage: validera 
bild: nod:18 
skript: 
- npm ci 
- npm kör lint 
- npm kör typkontroll 
- npm kör format:kontroll 
- npm test -- --täckning 
- npm installation -g sonarqube-skanner 
- sonar-skanner -Dsonar.projectKey=${CI_PROJECT_PATH_SLUG} -Dsonar.sources=src -Dsonar.tests=src -Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx -Dsonar.javascript.lcov.reportPaths=täckning/lcov.info -Dsonar.typescript.lcov.reportPaths=täckning/lcov.info 
artefakter: 
sökvägar: 
- täckning/ 
rapporter: 
junit: junit.xml 
utgångsdatum: 1 vecka 
cache: 
nyckel: ${CI_COMMIT_REF_SLUG} 
sökvägar: 
- node_modules/ 
``` 

## Bästa praxis för automatisering av kodkvalitet 

1. **Fail Fast**: Konfigurera linters och formaterare för att köras tidigt i utvecklingsprocessen 
2. **Konsekventa standarder**: Tillämpa konsekventa kodstandarder i hela teamet 
3. **Automatiserad tillämpning**: Använd Git-hooks för att förhindra att kod som inte uppfyller standarder 
4. **Kontinuerlig övervakning**: Integrera kodkvalitetskontroller i CI/CD-pipelines 
5. **Actionable Feedback**: Konfigurera verktyg för att ge tydlig, handlingsbar feedback 
6. **Regelbundna uppdateringar**: Håll linting-regler och beroenden uppdaterade 
7. **Dokumentation**: Dokumentera kodkvalitetsstandarder och processer 
8. **Team Buy-in**: Se till att teamet förstår och godkänner standarderna 
9. **Gradvis implementering**: Implementera standarder gradvis för att undvika att överbelasta teamet 
10. **Mät Förbättring**: Spåra kodkvalitetsmått över tid för att mäta förbättring

## Implementeringschecklista

- [ ] Konfigurera ESLint för JavaScript/TypeScript-linting
- [ ] Konfigurera Stylelint för CSS/SCSS-linting
- [ ] Konfigurera Prettier för kodformatering
- [ ] Konfigurera TypeScript för typkontroll
- [ ] Konfigurera SonarQube eller liknande verktyg för statisk kodanalys
- [ ] Konfigurera Git-hooks med Husky och lint-staged
- [ ] Konfigurera Dependabot för beroendehantering
- [ ] Integrera kodkvalitetskontroller i CI/CD-pipelines
- [ ] Dokumentera kodkvalitetsstandarder och processer
- [ ] Utbilda teamet i kodkvalitetsstandarder och verktyg