# 代码质量自动化

本文档提供了根据 Web 开发标准自动执行代码质量检查的标准化配置和工作流程。

## Linting 配置

### ESLint 配置 (JavaScript/TypeScript)

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
"no-console": ["warn", {"allow": ["warn", "error"]}],
"no-unused-vars": "off",
"@typescript-eslint/no-unused-vars": ["error", {"argsIgnorePattern": "^_"}],
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

### Stylelint 配置 (CSS/SCSS)

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

## 代码格式化

### Prettier 配置

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

## 静态代码分析

### SonarQube 配置

```json
{
"sonar.projectKey": "project-name",
"sonar.projectName": "项目名称",
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

## 类型检查

### TypeScript 配置

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

### Husky 配置

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

## 依赖管理

### Dependabot 配置

```yaml
版本：2
更新：
- 包生态系统："npm"
目录："/"
时间表：
间隔："每周"
开放拉取请求限制：10
版本控制策略：增加
忽略：
- 依赖项名称："*"
更新类型：["version-update:semver-major"]
标签：
- "依赖项"
- "自动合并"
提交消息：
前缀："chore"
包含："范围"
```

## GitHub Actions 代码质量工作流程

```yaml
名称：代码质量

开启：
推送：
分支： [main,develop]
pull_request:
分支:[main,develop]

作业:
代码质量:
运行于:ubuntu-latest
步骤:
- 使用:actions/checkout@v3
使用:
fetch-depth:0

- 名称:安装 Node.js
使用:actions/setup-node@v3
使用:
node-version:'18'
缓存:'npm'

- 名称:安装依赖项
运行:npm ci

- 名称:Lint
运行:npm run lint

- 名称:类型检查
运行:npm run type-check

- 名称:格式检查
运行:npm run format:check

- 名称:运行测试
运行:npm test -- --coverage

- 名称:SonarCloud Scan
使用: SonarSource/sonarcloud-github-action@master
环境变量：
GITHUB_TOKEN：${{ secrets.GITHUB_TOKEN }}
SONAR_TOKEN：${{ secrets.SONAR_TOKEN }}
参数：
参数：>
-Dsonar.projectKey=${{ github.repository_owner }}_${{ github.event.repository.name }}
-Dsonar.organization=${{ github.repository_owner }}
-Dsonar.sources=src
-Dsonar.tests=src
-Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx
-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
-Dsonar.typescript.lcov.reportPaths=coverage/lcov.info

- 名称：将覆盖率上传到 Codecov
使用：codecov/codecov-action@v3
使用：
令牌：${{ secrets.CODECOV_TOKEN }}
文件：./coverage/lcov.info
标志：unittests
名称：codecov-umbrella
fail_ci_if_error：true
```

## GitLab CI/CD 代码质量流水线

```yaml
code-quality：
阶段：validate
镜像：node:18
脚本：
- npm ci
- npm run lint
- npm run type-check
- npm run format:check
- npm test -- --coverage
- npm install -g sonarqube-scanner
- sonar-scanner -Dsonar.projectKey=${CI_PROJECT_PATH_SLUG} -Dsonar.sources=src -Dsonar.tests=src -Dsonar.test.inclusions=**/*.test.js,**/*.test.jsx,**/*.test.ts,**/*.test.tsx -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info
artifacts:
routes:
- coverage/
reports:
junit: junit.xml
expire_in: 1 week
cache:
key: ${CI_COMMIT_REF_SLUG}
routes:
- node_modules/
```

## 代码质量自动化的最佳实践

1. **快速失败**：配置linters和格式化程序以尽早运行在开发过程中
2. **一致的标准**：在整个团队中强制执行一致的编码标准
3. **自动执行**：使用 Git 钩子防止提交不符合标准的代码
4. **持续监控**：将代码质量检查集成到 CI/CD 流水线中
5. **可操作的反馈**：配置工具以提供清晰、可操作的反馈
6. **定期更新**：保持 linting 规则和依赖项的更新
7. **文档**：记录代码质量标准和流程
8. **团队认同**：确保团队理解并同意标准
9. **逐步实施**：逐步实施标准，避免团队负担过重
10. **衡量改进**：跟踪代码质量指标，并随着时间的推移衡量改进

## 实施清单

- [ ] 设置 ESLint 用于 JavaScript/TypeScript linting
- [ ] 设置 Stylelint 用于 CSS/SCSS linting
- [ ] 配置 Prettier 进行代码格式化
- [ ] 设置 TypeScript 进行类型检查
- [ ] 配置 SonarQube 或类似工具进行静态代码分析
- [ ] 使用 Husky 和 lint-staged 设置 Git hooks
- [ ] 配置 Dependabot 进行依赖管理
- [ ] 将代码质量检查集成到 CI/CD 流水线中
- [ ] 记录代码质量标准和流程
- [ ] 对团队进行代码质量标准和工具培训