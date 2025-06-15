# Automação da Qualidade do Código

Este documento fornece configurações e fluxos de trabalho padronizados para automatizar verificações de qualidade do código de acordo com os padrões de desenvolvimento web.

## Configuração do Linting

### Configuração do ESLint (JavaScript/TypeScript)

```json
{ 
"root": true, 
"env": { 
"browser": true, 
"node": true, 
"es2021": true 
}, 
"extends": [ 
"eslint:recomendado", 
"plugin:@typescript-eslint/recomendado", 
"plugin:react/recomendado", 
"plugin:react-hooks/recomendado", 
"plugin:jsx-a11y/recomendado", 
"plugin:import/errors", 
"plugin:import/warnings", 
"plugin:import/typescript", 
"plugin:prettier/recomendado" 
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
"react/prop-types": "desligado",
"react/react-in-jsx-scope": "desligado",
"react-hooks/rules-of-hooks": "erro",
"react-hooks/exhaustive-deps": "aviso",
"import/order": [ 
"erro",
{ 
"groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
"newlines-between": "sempre",
"alphabetize": { "order": "asc", "caseInsensitive": true } 
} 
],
"jsx-a11y/anchor-is-valid": [ 
"erro",
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
``` 

### Configuração do Stylelint (CSS/SCSS) 

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

## Formatação de Código

### Configuração Mais Bonita

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

## Análise de Código Estático

### Configuração do SonarQube

```json
{ 
"sonar.projectKey": "nome-do-projeto", 
"sonar.projectName": "Nome do Projeto", 
"sonar.projectVersion": "1.0.0", 
"sonar.sources": "fonte", 
"sonar.tests": "fonte", 
"sonar.test.inclusions": "**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx", 
"sonar.coverage.exclusions": "**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx", 
"sonar.javascript.lcov.reportPaths": "coverage/lcov.info", 
"sonar.typescript.lcov.reportPaths": "coverage/lcov.info", 
"sonar.exclusions": "node_modules/**,build/**,dist/**,coverage/**,public/**,**/*.stories.js,**/*.stories.jsx,**/*.stories.ts,**/*.stories.tsx" 
} 
``` 

## Verificação de Tipo 

### Configuração do TypeScript 

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

## Ganchos do Git

### Configuração do Husky

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

## Gerenciamento de Dependências

### Configuração do Dependabot

```yaml 
versão: 2 
atualizações: 
- pacote-ecossistema: "npm"
diretório: "/"
agenda:
intervalo: "semanal"
limite de solicitações de pull abertas: 10
estratégia de versionamento: aumentar
ignorar:
-nome da dependência: "*"
tipos de atualização: ["atualização-de-versão:semver-major"]
rótulos:
-"dependências"
-"mesclagem-automática"
mensagem-de-commit:
prefixo: "tarefa"
incluir: "escopo"
```

## Fluxo de trabalho do GitHub Actions para Qualidade de Código

```yaml
nome: Qualidade de Código

em:
push:
ramificações: [principal, desenvolver]
solicitação_de_pull:
ramificações: [principal, desenvolver]

tarefas:
qualidade-de-código:
execuções-em: ubuntu-mais-último
etapas:
-usos: actions/checkout@v3
com:
fetch-depth: 0

- nome: Configurar Node.js
usa: actions/setup-node@v3
com:
node-version: '18'
cache: 'npm'

- nome: Instalar dependências
executar: npm ci

- nome: Lint
executar: npm executar lint

- nome: Verificação de tipo
executar: npm executar verificação de tipo

- nome: Verificação de formato
executar: npm executar formato:verificação

- nome: Executar testes
executar: npm test -- --coverage

- nome: SonarCloud Scan
usa: SonarSource/sonarcloud-github-action@master
env:
GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} 
SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }} 
com:
args: >
-Dsonar.projectKey=${{ github.repository_owner }}_${{ github.event.repository.name }}
-Dsonar.organization=${{ github.repository_owner }}
-Dsonar.sources=src
-Dsonar.tests=src
-Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx
-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
-Dsonar.typescript.lcov.reportPaths=coverage/lcov.info

- name: Carregar cobertura para Codecov
uses: codecov/codecov-action@v3
com:

token: ${{ secrets.CODECOV_TOKEN }}
files: ./coverage/lcov.info
flags: unittests
name: codecov-umbrella
fail_ci_if_error: true
```

## Pipeline de CI/CD do GitLab para Qualidade de Código

```yaml
qualidade-do-código:
estágio: validar
imagem: nó:18
script:
- npm ci
- npm run lint
- npm run type-check
- npm run format:check
- npm test -- --coverage
- npm install -g sonarqube-scanner
- sonar-scanner -Dsonar.projectKey=${CI_PROJECT_PATH_SLUG} -Dsonar.sources=src -Dsonar.tests=src -Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info
artefatos:
caminhos:
-cobertura/
relatórios:
junit: junit.xml
expire_in: 1 semana
cache:
chave: ${CI_COMMIT_REF_SLUG}
caminhos:
-node_modules/
```

## Melhores Práticas para Automação da Qualidade do Código

1. **Falha Rápida**: Configurar linters e formatadores para execução no início do processo de desenvolvimento
2. **Padrões Consistentes**: Aplicar padrões de codificação consistentes em toda a equipe
3. **Automatizado Aplicação**: Use ganchos do Git para evitar o commit de código que não atenda aos padrões
4. **Monitoramento Contínuo**: Integre verificações de qualidade do código aos pipelines de CI/CD
5. **Feedback Acionável**: Configure ferramentas para fornecer feedback claro e acionável
6. **Atualizações Regulares**: Mantenha as regras e dependências de linting atualizadas
7. **Documentação**: Documente os padrões e processos de qualidade do código
8. **Adesão da Equipe**: Garanta que a equipe entenda e concorde com os padrões
9. **Implementação Gradual**: Implemente os padrões gradualmente para evitar sobrecarregar a equipe
10. **Mensure a Melhoria**: Acompanhe as métricas de qualidade do código ao longo do tempo para mensurar a melhoria

## Lista de Verificação de Implementação

- [ ] Configure o ESLint para linting de JavaScript/TypeScript
- [ ] Configure o Stylelint para linting de CSS/SCSS
- [ ] Configure o Prettier para formatação de código
- [ ] Configure o TypeScript para verificação de tipo
- [ ] Configurar o SonarQube ou ferramenta similar para análise estática de código
- [ ] Configurar ganchos do Git com Husky e lint-staged
- [ ] Configurar o Dependabot para gerenciamento de dependências
- [ ] Integrar verificações de qualidade de código em pipelines de CI/CD
- [ ] Documentar padrões e processos de qualidade de código
- [ ] Treinar a equipe sobre padrões e ferramentas de qualidade de código