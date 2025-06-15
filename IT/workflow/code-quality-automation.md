# Automazione della qualità del codice

Questo documento fornisce configurazioni e flussi di lavoro standardizzati per automatizzare i controlli di qualità del codice secondo gli standard di sviluppo web.

## Configurazione del Linting

### Configurazione ESLint (JavaScript/TypeScript)

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
} 
``` 

### Configurazione Stylelint (CSS/SCSS) 

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

## Formattazione del codice

### Configurazione più elegante

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

## Analisi statica del codice

### Configurazione di SonarQube

```json 
{ 
"sonar.projectKey": "nome-progetto", 
"sonar.projectName": "Nome del progetto", 
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

## Controllo del tipo

### Configurazione TypeScript

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

### Configurazione Husky

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

## Gestione delle dipendenze

### Configurazione di Dependabot

```yaml
versione: 2
aggiornamenti:
- ecosistema-pacchetto: "npm"
directory: "/"
schedulazione:
intervallo: "settimanale"
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

## Flusso di lavoro di GitHub Actions per la qualità del codice

```yaml
name: Code Quality

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
con:
node-version: '18'
cache: 'npm'

- name: Installa dipendenze
run: npm ci

- name: Lint
run: npm run lint

- name: Controllo tipo
run: npm run type-check

- name: Controllo formato
run: npm run format:check

- name: Esegui test
run: npm test -- --coverage

- name: Scansione SonarCloud
uses: SonarSource/sonarcloud-github-action@master
env:
GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
con:
args: >
-Dsonar.projectKey=${{ github.repository_owner }}_${{ github.event.repository.name }}
-Dsonar.organization=${{ github.repository_owner }}
-Dsonar.sources=src
-Dsonar.tests=src
-Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx
-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
-Dsonar.typescript.lcov.reportPaths=coverage/lcov.info

- nome: Carica la copertura su Codecov
usa: codecov/codecov-action@v3
con:
token: ${{ secrets.CODECOV_TOKEN }}
file: ./coverage/lcov.info
flag: unittests
name: codecov-umbrella
fail_ci_if_error: true
```

## Pipeline CI/CD di GitLab per la qualità del codice

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
artefatti:
percorsi:
- coverage/
report:
junit: junit.xml
scadenza: 1 settimana
cache:
chiave: ${CI_COMMIT_REF_SLUG}
percorsi:
- node_modules/
```

## Best practice per l'automazione della qualità del codice

1. **Fail Fast**: configurare linter e formattatori per l'esecuzione nelle prime fasi del processo di sviluppo
2. **Standard coerenti**: applicare standard di codifica coerenti in tutto il team
3. **Applicazione automatizzata**: utilizzare Hook Git per impedire il commit di codice non conforme agli standard
4. **Monitoraggio continuo**: Integrare i controlli di qualità del codice nelle pipeline CI/CD
5. **Feedback fruibile**: Configurare gli strumenti per fornire un feedback chiaro e fruibile
6. **Aggiornamenti regolari**: Mantenere aggiornate le regole e le dipendenze di linting
7. **Documentazione**: Documentare gli standard e i processi di qualità del codice
8. **Consenso del team**: Assicurarsi che il team comprenda e concordi con gli standard
9. **Implementazione graduale**: Implementare gli standard gradualmente per evitare di sovraccaricare il team
10. **Misurare il miglioramento**: Monitorare le metriche di qualità del codice nel tempo per misurarne il miglioramento

## Checklist di implementazione

- [ ] Configurare ESLint per il linting JavaScript/TypeScript
- [ ] Configurare Stylelint per il linting CSS/SCSS
- [ ] Configurare Prettier per la formattazione del codice
- [ ] Configurare TypeScript per il tipo Controllo
- [ ] Configurare SonarQube o uno strumento simile per l'analisi statica del codice
- [ ] Impostare gli hook Git con Husky e lint-staged
- [ ] Configurare Dependabot per la gestione delle dipendenze
- [ ] Integrare i controlli di qualità del codice nelle pipeline CI/CD
- [ ] Documentare gli standard e i processi di qualità del codice
- [ ] Formare il team sugli standard e gli strumenti di qualità del codice