# Automatisierung der Codequalität

Dieses Dokument bietet standardisierte Konfigurationen und Workflows zur Automatisierung von Codequalitätsprüfungen gemäß den Webentwicklungsstandards.

## Linting-Konfiguration

### ESLint-Konfiguration (JavaScript/TypeScript)

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
"sourceType": "Modul" 
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
"react/react-in-jsx-scope": "Aus", 
"react-hooks/hookregeln": "Fehler", 
"react-hooks/exhaustive-deps": "Warnung", 
"import/order": [ 
"Fehler", 
{ 
"Gruppen": ["Eingebaut", "Extern", "Intern", "Übergeordnet", "Geschwister", "Index"], 
"Zeilenumbrüche zwischen": "Immer", 
"Alphabetisieren": { "Reihenfolge": "Aufsteigend", "Groß-/Kleinschreibung wird ignoriert": true } 
} 
], 
"jsx-a11y/anchor-ist-gültig": [ 
"Fehler", 
{ 
"Komponenten": ["Link"], 
"Speziallink": ["hrefLeft", "hrefRight"], 
"Aspekte": ["UngültigerHref", "BevorzugterButton"] 
} 
] 
}, 
"Einstellungen": { 
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

### Stylelint-Konfiguration (CSS/SCSS) 

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

## Codeformatierung 

### Prettier-Konfiguration 

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

## Statische Codeanalyse 

### SonarQube-Konfiguration 

```json 
{ 
"sonar.projectKey": "Projektname", 
"sonar.projectName": "Projektname", 
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

## Typ Überprüfung

### TypeScript-Konfiguration

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

## Git-Hooks 

### Husky-Konfiguration 

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

## Abhängigkeitsverwaltung 

### Dependabot-Konfiguration 

```yaml 
Version: 2 
Updates: 
- Paket-Ökosystem: "npm" 
Verzeichnis: "/" 
Zeitplan: 
Intervall: "wöchentlich" 
Open-Pull-Requests-Limit: 10 
Versionsstrategie: Erhöhen 
Ignorieren: 
- Abhängigkeitsname: "*" 
Update-Typen: ["version-update:semver-major"] 
Labels: 
- "Abhängigkeiten" 
- "Automerge" 
Commit-Nachricht: 
Präfix: "Arbeit" 
Include: "scope" 
``` 

## GitHub Actions Workflow für Codequalität 

```yaml 
Name: Codequalität 

auf: 
Push: 
Branches: [main, develop] 
Pull_Request: 
Branches: [main, develop] 

Jobs: 
Codequalität: 
Läuft auf: Ubuntu-Latest 
Schritte: 
- Verwendet: actions/checkout@v3 
mit: 
Fetch-Tiefe: 0 

- Name: Node.js einrichten 
Verwendet: actions/setup-node@v3 
mit: 
Node-Version: '18' 
Cache: 'npm' 

- Name: Abhängigkeiten installieren 
Ausführen: npm ci 

- Name: Lint 
Ausführen: npm run lint 

- Name: Typprüfung 
Ausführen: npm run type-check 

- Name: Format prüfen
Ausführen: npm run format: prüfen

- Name: Tests ausführen

Ausführen: npm test -- --coverage

- Name: SonarCloud Scan
Verwendet: SonarSource/sonarcloud-github-action@master
Umgebung:
GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
mit:
Argumente: >
-Dsonar.projectKey=${{ github.repository_owner }}_${{ github.event.repository.name }}
-Dsonar.organization=${{ github.repository_owner }}
-Dsonar.sources=src
-Dsonar.tests=src
-Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx 
-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info 
-Dsonar.typescript.lcov.reportPaths=coverage/lcov.info 

- Name: Coverage zu Codecov hochladen 
Verwendet: codecov/codecov-action@v3 
Mit: 
Token: ${{ secrets.CODECOV_TOKEN }} 
Dateien: ./coverage/lcov.info 
Flags: Unittests 
Name: codecov-umbrella 
fail_ci_if_error: true 
``` 

## GitLab CI/CD-Pipeline für Codequalität 

```yaml 
Codequalität: 
Stufe: Validieren 
Bild: Knoten:18
Skript:
- npm ci
- npm lint ausführen
- npm Typprüfung ausführen
- npm Formatprüfung ausführen
- npm Test -- --coverage
- npm install -g sonarqube-scanner
- sonar-scanner -Dsonar.projectKey=${CI_PROJECT_PATH_SLUG} -Dsonar.sources=src -Dsonar.tests=src -Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info
Artefakte:
Pfade:
- Coverage/
Berichte:
Junit: junit.xml
expire_in: 1 Woche
cache:
key: ${CI_COMMIT_REF_SLUG}
paths:
- node_modules/
```

## Best Practices für die Automatisierung der Codequalität

1. **Fail Fast**: Konfigurieren Sie Linter und Formatierer so, dass sie frühzeitig im Entwicklungsprozess ausgeführt werden.
2. **Konsistente Standards**: Setzen Sie konsistente Codestandards im gesamten Team durch.
3. **Automatisierte Durchsetzung**: Verwenden Sie Git-Hooks, um das Committen von Code zu verhindern, der den Standards nicht entspricht.
4. **Kontinuierliches Monitoring**: Integrieren Sie Codequalitätsprüfungen in CI/CD-Pipelines.
5. **Umsetzbares Feedback**: Konfigurieren Sie Tools, die klares, umsetzbares Feedback liefern.
6. **Regelmäßige Updates**: Halten Sie Linting-Regeln und Abhängigkeiten auf dem neuesten Stand.
7. **Dokumentation**: Dokumentieren Sie Standards und Prozesse für die Codequalität.
8. **Team-Akzeptanz**: Stellen Sie sicher, dass das Team die Standards versteht und ihnen zustimmt.
9. **Schrittweise Implementierung**: Standards schrittweise implementieren, um das Team nicht zu überfordern.
10. **Verbesserung messen**: Codequalitätsmetriken im Laufe der Zeit verfolgen, um Verbesserungen zu messen.

## Checkliste für die Implementierung

- [ ] ESLint für JavaScript/TypeScript-Linting einrichten
- [ ] Stylelint für CSS/SCSS-Linting einrichten
- [ ] Prettier für die Codeformatierung konfigurieren
- [ ] TypeScript für die Typprüfung einrichten
- [ ] SonarQube oder ein ähnliches Tool für die statische Codeanalyse konfigurieren
- [ ] Git-Hooks mit Husky und Lint-Staged einrichten
- [ ] Dependabot für das Abhängigkeitsmanagement konfigurieren
- [ ] Codequalitätsprüfungen in CI/CD-Pipelines integrieren
- [ ] Codequalitätsstandards und -prozesse dokumentieren
- [ ] Das Team in Codequalitätsstandards und -tools schulen