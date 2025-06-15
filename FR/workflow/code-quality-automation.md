# Automatisation de la qualité du code

Ce document fournit des configurations et des workflows standardisés pour automatiser les contrôles de qualité du code conformément aux normes de développement web.

## Configuration du linting

### Configuration ESLint (JavaScript/TypeScript) 

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
``` 

### Configuration de Stylelint (CSS/SCSS) 

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
"order/properties-alphabetical-order": true, "color-hex-case": "lower", 
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

## Formatage du code

### Plus joli Configuration

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

## Analyse de code statique

### Configuration de SonarQube

```json
{ 
"sonar.projectKey": "project-name", 
"sonar.projectName": "Project Name", 
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

## Vérification de type

### Configuration TypeScript

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

## Hooks Git 

### Configuration Husky 

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

## Gestion des dépendances 

### Configuration de Dependabot 

```yaml 
version : 2 
mises à jour : 
- écosystème de paquets : "npm" 
répertoire : "/" 
planification : 
intervalle : "hebdomadaire" 
limite de requêtes d'extraction : 10 
Stratégie de version : augmentation 
Ignorer :
- Nom de la dépendance : « * » 
Types de mise à jour : ["version-update:semver-major"] 
Étiquettes :
- "dépendances" 
- "fusion automatique" 
Message de validation :
Préfixe : « tâche » 
Inclure : « portée » 
``` 

## Flux de travail des actions GitHub pour la qualité du code

```yaml 
Nom : Qualité du code 

Activé :
Pousser :
Branches : [main, develop] 
Demande d'extraction :
Branches : [main, develop] 

Tâches :
Qualité du code :
Exécution sur : ubuntu-latest 
Étapes :
- Utilise : actions/checkout@v3 
Avec :
Profondeur de récupération : 0 

- Nom : Configuration de Node.js 
Utilise : actions/setup-node@v3 
avec : 
version-nœud : '18' 
cache : 'npm' 

- nom : Installer les dépendances 
exécuter : npm ci 

- nom : Lint 
exécuter : npm run lint 

- nom : Vérification du type 
exécuter : npm run type-check 

- nom : Vérification du format 
exécuter : npm run format:check 

- nom : Exécuter les tests 
exécuter : npm test -- --coverage 

- nom : SonarCloud Scan 
utilise : SonarSource/sonarcloud-github-action@master 
env : 
GITHUB_TOKEN : ${{ secrets.GITHUB_TOKEN }} 
SONAR_TOKEN : ${{ secrets.SONAR_TOKEN }} 
avec : 
args : > 
-Dsonar.projectKey=${{ github.repository_owner }}_${{ github.event.repository.name }} 
-Dsonar.organization=${{ github.repository_owner }} 
-Dsonar.sources=src 
-Dsonar.tests=src 
-Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx 
-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info 
-Dsonar.typescript.lcov.reportPaths=coverage/lcov.info 

- name : Charger la couverture vers Codecov 
uses : codecov/codecov-action@v3 
with : 
token : ${{ secrets.CODECOV_TOKEN }} 
files : ./coverage/lcov.info 
flags : Tests unitaires
nom : codecov-umbrella
échec_ci_si_erreur : true
```

## Pipeline CI/CD GitLab pour la qualité du code

```yaml
code-quality :
étape : validate
image : node:18
script :
- npm ci
- npm run lint
- npm run type-check
- npm run format:check
- npm test -- --coverage
- npm install -g sonarqube-scanner
- sonar-scanner -Dsonar.projectKey=${CI_PROJECT_PATH_SLUG} -Dsonar.sources=src -Dsonar.tests=src -Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info 
artefacts : 
chemins : 
- coverage/ 
rapports : 
junit : junit.xml 
expire_in : 1 semaine 
cache : 
clé : ${CI_COMMIT_REF_SLUG} 
chemins : 
- node_modules/ 
``` 

## Bonnes pratiques pour l'automatisation de la qualité du code

1. **Fail Fast** : Configurez les linters et les formateurs pour qu'ils s'exécutent tôt dans le processus de développement.
2. **Normes cohérentes** : Appliquez des normes de codage cohérentes au sein de l'équipe.
3. **Application automatisée** : Utilisez les hooks Git pour empêcher la validation de code non conforme aux normes.
4. **Surveillance continue** : Intégrez les contrôles de qualité du code aux pipelines CI/CD.
5. **Actionnable Commentaires** : Configurer les outils pour fournir des commentaires clairs et exploitables.
6. **Mises à jour régulières** : Maintenir à jour les règles et les dépendances de linting.
7. **Documentation** : Documenter les normes et processus de qualité du code.
8. **Adhésion de l'équipe** : S'assurer que l'équipe comprend et adhère aux normes.
9. **Mise en œuvre progressive** : Mettre en œuvre les normes progressivement pour éviter de submerger l'équipe.
10. **Mesurer l'amélioration** : Suivre les indicateurs de qualité du code au fil du temps pour mesurer l'amélioration.

## Liste de contrôle de mise en œuvre

- [ ] Configurer ESLint pour le linting JavaScript/TypeScript.
- [ ] Configurer Stylelint pour le linting CSS/SCSS.
- [ ] Configurer Prettier pour la mise en forme du code.
- [ ] Configurer TypeScript pour la vérification de type.
- [ ] Configurer SonarQube ou un outil similaire pour l'analyse statique du code.
- [ ] Configurer les hooks Git avec Husky et lint-staged.
- [ ] Configurer Dependabot pour la gestion des dépendances.
- [ ] Intégrer les contrôles de qualité du code aux pipelines CI/CD
- [ ] Documenter les normes et processus de qualité du code
- [ ] Former l'équipe aux normes et outils de qualité du code