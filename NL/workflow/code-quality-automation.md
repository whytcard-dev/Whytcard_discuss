# Automatisering van codekwaliteit

Dit document biedt gestandaardiseerde configuraties en workflows voor het automatiseren van codekwaliteitscontroles volgens de webontwikkelingsnormen.

## Linting-configuratie

### ESLint-configuratie (JavaScript/TypeScript)

```json
{ 
"root": true, 
"env": { 
"browser": true, 
"node": true, 
"es2021": true 
}, 
"extends": [ 
"eslint:aanbevolen", 
"plugin:@typescript-eslint/aanbevolen", 
"plugin:react/aanbevolen", 
"plugin:react-hooks/aanbevolen", 
"plugin:jsx-a11y/aanbevolen", 
"plugin:import/errors", 
"plugin:import/warnings", 
"plugin:import/typescript", 
"plugin:prettier/aanbevolen" 
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
"no-console": ["waarschuwing", { "toestaan": ["waarschuwing", "fout"] }], 
"no-unused-vars": "uit", 
"@typescript-eslint/no-unused-vars": ["fout", { "argsIgnorePattern": "^_" }], 
"react/prop-types": "uit", 
"react/react-in-jsx-scope": "uit", 
"react-hooks/rules-of-hooks": "fout", 
"react-hooks/exhaustive-deps": "waarschuwing", 
"import/order": [ 
"fout", 
{ 
"groepen": ["ingebouwd", "extern", "intern", "ouder", "broer/zus", "index"], 
"newlines-between": "altijd", 
"alphabetize": { "order": "asc", "caseInsensitive": true } 
} 
], 
"jsx-a11y/anker-is-geldig": [ 
"fout", 
{ 
"componenten": ["Link"], 
"specialeLink": ["hrefLeft", "hrefRight"],
"aspects": ["invalidHref", "preferButton"]
} 
] 
}, 
"settings": { 
"react": { 
"version": "detect" 
}, 
"import/resolver": { 
"typescript": { }, 
"node": { 
"extensions": [".js", ".jsx", ".ts", ".tsx"] 
} 
} 
} 
} 
``` 

### Stylelint-configuratie (CSS/SCSS)

```json 
{ 
"extends": [ 
"stylelint-config-standard", 
"stylelint-config-prettier" 
], 
"plugins": [ 
"stylelint-order" 
], 
"regels": { 
"volgorde/eigenschappen-alfabetische-volgorde": waar, 
"kleur-hex-hoofdlettergevoelig": "kleiner", 
"kleur-hex-lengte": "kort", 
"kleur-geen-ongeldige-hex": waar, 
"declaratie-dubbele-spatie-na": "altijd", 
"inspringing": 2, 
"maximaal-lege-regels": 1, 
"selector-pseudo-klasse-geen-onbekend": [ 
waar, 
{ 
"negeerPseudoKlassen": ["globaal"] 
} 
], 
"at-regel-geen-onbekend": [ 
waar, 
{ 
"negeerAtRegels": ["tailwind", "toepassen", "varianten", "responsief", "scherm"] 
} 
], 
"no-descending-specificity": null
} 
} 
``` 

## Codeopmaak

### Prettier-configuratie

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

## Statische codeanalyse

### SonarQube-configuratie

```json
{ 
"sonar.projectKey": "projectnaam", 
"sonar.projectName": "Project Naam", 
"sonar.projectVersie": "1.0.0", 
"sonar.bronnen": "bron", 
"sonar.tests": "bron", 
"sonar.test.inclusions": "**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx", 
"sonar.dekking.uitzonderingen": "**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx", 
"sonar.javascript.lcov.reportPaths": "dekking/lcov.info", 
"sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
"sonar.exclusions": "node_modules/**,build/**,dist/**,coverage/**,public/**,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx"
} 
``` 

## Typecontrole

### TypeScript-configuratie

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

## Git-hooks 

### Husky-configuratie 

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

## Afhankelijkheidsbeheer 

### Dependabot Configuratie

```yaml
versie: 2
updates:

- pakket-ecosysteem: "npm"
map: "/"
schema:
interval: "wekelijks"
limiet voor open-pull-requests: 10
versiestrategie: verhogen
negeren:
- afhankelijkheidsnaam: "*"
update-typen: ["versie-update:semver-major"]
labels:
- "afhankelijkheden"
- "automatisch samenvoegen"
commit-bericht:
voorvoegsel: "chore"
include: "scope"
```

## GitHub Actions Workflow voor codekwaliteit

```yaml
naam: Codekwaliteit

aan:
push:
branches: [ main, development ]
pull_request:
branches: [ main, development ]

taken:
codekwaliteit:
runs-on: ubuntu-nieuwste
stappen:

- gebruikt: acties/checkout@v3
met:

ophaaldiepte: 0

- naam: Node.js instellen
gebruikt: acties/setup-node@v3
met:

node-versie: '18'
cache: 'npm'

- naam: Afhankelijkheden installeren
uitvoeren: npm ci

- naam: Lint
uitvoeren: npm run lint

- naam: Typecontrole
uitvoeren: npm run typecontrole

- naam: Formaatcontrole
uitvoeren: npm run format:check

- naam: Tests uitvoeren
uitvoeren: npm test -- --coverage

- naam: SonarCloud Scan
gebruikt: SonarSource/sonarcloud-github-action@master
omgeving:

GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} 
SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }} 
met: 
argumenten: > 
-Dsonar.projectKey=${{ github.repository_owner }}_${{ github.event.repository.name }} 
-Dsonar.organization=${{ github.repository_owner }} 
-Dsonar.sources=src 
-Dsonar.tests=src 
-Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx 
-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info 
-Dsonar.typescript.lcov.reportPaths=coverage/lcov.info

- naam: Upload dekking naar Codecov
gebruik: codecov/codecov-action@v3
met:
token: ${{ secrets.CODECOV_TOKEN }}
bestanden: ./coverage/lcov.info
vlaggen: unittests
naam: codecov-umbrella
fail_ci_if_error: true
```

## GitLab CI/CD-pipeline voor codekwaliteit

```yaml
codekwaliteit:
fase: valideren
afbeelding: knooppunt:18
script:
- npm ci
- npm run lint
- npm run typecontrole
- npm run formaat:controle
- npm test -- --coverage
- npm install -g sonarqube-scanner
- sonar-scanner -Dsonar.projectKey=${CI_PROJECT_PATH_SLUG} -Dsonar.sources=src -Dsonar.tests=src -Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info
artefacten:
paden:
- coverage/
rapporten:
junit: junit.xml
verloopt over: 1 week
cache:
sleutel: ${CI_COMMIT_REF_SLUG}
paden:
- node_modules/
```

## Aanbevolen procedures voor automatisering van codekwaliteit

1. **Mislukt Snel**: Configureer linters en formatters om vroeg in het ontwikkelingsproces te draaien
2. **Consistente standaarden**: Handhaaf consistente coderingsstandaarden binnen het hele team
3. **Geautomatiseerde handhaving**: Gebruik Git-hooks om te voorkomen dat code wordt gecommit die niet aan de standaarden voldoet
4. **Continue monitoring**: Integreer codekwaliteitscontroles in CI/CD-pipelines
5. **Actieve feedback**: Configureer tools om duidelijke, actiegerichte feedback te geven
6. **Regelmatige updates**: Houd lintingregels en afhankelijkheden up-to-date
7. **Documentatie**: Documenteer codekwaliteitsstandaarden en -processen
8. **Team-inzet**: Zorg ervoor dat het team de standaarden begrijpt en ermee instemt
9. **Geleidelijke implementatie**: Implementeer standaarden geleidelijk om te voorkomen dat het team overbelast raakt
10. **Meet verbetering**: Volg codekwaliteitsstatistieken in de loop van de tijd om de verbetering te meten

## Implementatiechecklist

- [ ] Stel ESLint in voor JavaScript/TypeScript-linting
- [ ] Stel in Stylelint voor CSS/SCSS-linting
- [ ] Prettier configureren voor codeopmaak
- [ ] TypeScript instellen voor typecontrole
- [ ] SonarQube of een vergelijkbare tool configureren voor statische codeanalyse
- [ ] Git-hooks instellen met Husky en lint-staged
- [ ] Dependabot configureren voor afhankelijkheidsbeheer
- [ ] Codekwaliteitscontroles integreren in CI/CD-pipelines
- [ ] Codekwaliteitsnormen en -processen documenteren
- [ ] Het team trainen in codekwaliteitsnormen en -tools