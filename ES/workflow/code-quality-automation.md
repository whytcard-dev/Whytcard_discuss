# Automatización de la Calidad del Código

Este documento proporciona configuraciones y flujos de trabajo estandarizados para automatizar las comprobaciones de calidad del código según los estándares de desarrollo web.

## Configuración de Linting

### Configuración de ESLint (JavaScript/TypeScript)

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
"react/react-in-jsx-scope": "desactivado", 
"react-hooks/rules-of-hooks": "error", 
"react-hooks/exhaustive-deps": "advertencia", 
"import/order": [ 
"error", 
{ 
"groups": ["integrado", "externo", "interno", "padre", "hermano", "índice"], 
"newlines-between": "siempre", 
"alphabetize": { "order": "asc", "caseInsensitive": verdadero } 
} 
], 
"jsx-a11y/anchor-is-valid": [ 
"error", 
{ 
"components": ["Enlace"], 
"specialLink": ["hrefIzquierda", "hrefDerecha"], 
"aspects": ["HrefInválido", "BotónPreferir"] 
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

### Configuración de Stylelint (CSS/SCSS) 

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
"color-no-invalid-hex": verdadero, 
"declaration-colon-space-after": "siempre", 
"indentation": 2, 
"max-empty-lines": 1, 
"selector-pseudo-class-no-unknown": [ 
verdadero, 
{ 
"ignorePseudoClasses": ["global"] 
} 
], 
"at-rule-no-unknown": [ 
verdadero, 
{ 
"ignoreAtRules": ["tailwind", "apply", "variants", "responsive", "screen"] 
} 
], 
"no-descending-specificity": nulo 
} 
} 
``` 

## Formato de código 

### Configuración de Prettier 

```json 
{ 
"semi": verdadero, 
"singleQuote": verdadero, 
"trailingComma": "es5", 
"printWidth": 100, 
"tabWidth": 2, 
"useTabs": falso, 
"bracketSpacing": verdadero, 
"jsxBracketSameLine": falso, 
"arrowParens": "avoid", 
"endOfLine": "lf" 
} 
``` 

## Análisis de código estático 

### Configuración de SonarQube 

```json 
{ 
"sonar.projectKey": "nombre-del-proyecto", 
"sonar.projectName": "Nombre del proyecto", 
"sonar.projectVersion": "1.0.0", 
"sonar.sources": "src", 
"sonar.tests": "src", 
"sonar.test.inclusions": "**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx", 
"sonar.cobertura.exclusiones": "**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx", 
"sonar.javascript.lcov.reportPaths": "cobertura/lcov.info", 
"sonar.typescript.lcov.reportPaths": "cobertura/lcov.info", 
"sonar.exclusiones": "node_modules/**,build/**,dist/**,coverage/**,public/**,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx" 
} 
``` 

## Comprobación de tipos 

### Configuración de TypeScript 

```json 
{ 
"compilerOptions": { 
"target": "es2020", 
"lib": ["dom", "dom.iterable", "esnext"], 
"allowJs": verdadero, 
"skipLibCheck": verdadero, 
"esModuleInterop": verdadero, 
"allowSyntheticDefaultImports": verdadero, 
"strict": verdadero, 
"forceConsistentCasingInFileNames": verdadero, 
"noFallthroughCasesInSwitch": verdadero, 
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

## Hooks de Git 

### Configuración de Husky 

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

## Gestión de Dependencias 

### Configuración del Dependabot 

```yaml 
versión: 2 
actualizaciones: 
- package-ecosystem: "npm" 
directorio: "/" 
programación: 
intervalo: "semanal" 
límite de solicitudes de extracción abiertas: 10 
Estrategia de versiones: aumentar
Ignorar:
- Nombre de la dependencia: "*"
Tipos de actualización: ["Actualización de la versión: semver-major"]
Etiquetas:
- "Dependencias"
- "Fusionar automáticamente"
Mensaje de confirmación:
Prefijo: "Tarea"
Incluir: "Alcance"
```

## Flujo de trabajo de Acciones de GitHub para la calidad del código

```yaml
Nombre: Calidad del código

En:
Insertar:
Branchs: [principal, desarrollo]
Pull_request:
Branchs: [principal, desarrollo]
Jobs:
Calidad del código:
Se ejecuta en: Ubuntu-latest
Pasos:
- Usos: acciones/checkout@v3
Con:
Profundidad de búsqueda: 0


Nombre: Configurar Node.js
Usos: acciones/setup-node@v3
con:
versión-nodo: '18'
caché: 'npm'
- nombre: Instalar dependencias
ejecutar: npm ci
- nombre: Lint
ejecutar: npm run lint
- nombre: Comprobación de tipo
ejecutar: npm run type-check
- nombre: Comprobación de formato
ejecutar: npm run format:check
- nombre: Ejecutar pruebas
ejecutar: npm test -- --coverage
- nombre: SonarCloud Scan
usos: SonarSource/sonarcloud-github-action@master
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

- name: Subir cobertura a Codecov 
uses: codecov/codecov-action@v3 
with: 
token: ${{ secretos.CODECOV_TOKEN }} 
archivos: ./coverage/lcov.info 
indicadores: unittests 
nombre: codecov-umbrella 
fail_ci_if_error: true 
``` 

## Canalización de CI/CD de GitLab para la calidad del código 

```yaml 
code-quality: 
etapa: validate 
imagen: node:18 
script: 
- npm ci 
- npm run lint 
- npm run type-check 
- npm run format:check 
- npm test -- --coverage 
- npm install -g sonarqube-scanner 
- sonar-scanner -Dsonar.projectKey=${CI_PROJECT_PATH_SLUG} -Dsonar.sources=src -Dsonar.tests=src -Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info 
artificiales: 
rutas: 
- cobertura/ 
informes: 
junit: junit.xml 
caduca: 1 semana 
caché: 
clave: ${CI_COMMIT_REF_SLUG} 
rutas: 
- módulos_de_nodo/ 
``` 

## Mejores prácticas para la automatización de la calidad del código 

1. **Fallar rápido**: Configurar linters y formateadores para que se ejecuten en las primeras etapas del proceso de desarrollo.
2. **Estándares consistentes**: Aplicar estándares de codificación consistentes en todo el equipo.
3. **Automatizado Cumplimiento**: Usar ganchos de Git para evitar la confirmación de código que no cumple con los estándares.
4. **Monitoreo continuo**: Integrar controles de calidad del código en los pipelines de CI/CD.
5. **Retroalimentación práctica**: Configurar herramientas para proporcionar retroalimentación clara y práctica.
6. **Actualizaciones periódicas**: Mantener las reglas y dependencias de linting actualizadas.
7. **Documentación**: Documentar los estándares y procesos de calidad del código.
8. **Aceptación del equipo**: Asegurarse de que el equipo comprenda y esté de acuerdo con los estándares.
9. **Implementación gradual**: Implementar los estándares gradualmente para evitar sobrecargar al equipo.
10. **Medir las mejoras**: Realizar un seguimiento de las métricas de calidad del código a lo largo del tiempo para medir las mejoras.

## Lista de verificación de implementación

- [ ] Configurar ESLint para el linting de JavaScript/TypeScript.
- [ ] Configurar Stylelint para el linting de CSS/SCSS.
- [ ] Configurar Prettier para el formato de código.
- [ ] Configurar TypeScript para la escritura. Comprobación
- [ ] Configurar SonarQube o una herramienta similar para el análisis estático de código
- [ ] Configurar ganchos de Git con Husky y lint-staged
- [ ] Configurar Dependabot para la gestión de dependencias
- [ ] Integrar comprobaciones de calidad del código en las canalizaciones de CI/CD
- [ ] Documentar los estándares y procesos de calidad del código
- [ ] Capacitar al equipo en los estándares y herramientas de calidad del código